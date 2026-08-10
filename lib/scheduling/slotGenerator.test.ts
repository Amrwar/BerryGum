import { describe, it, expect, afterEach } from "vitest";
import { generateAvailableSlots } from "./slotGenerator";
import { daysAheadToShow, bufferHoursFromNow } from "./schedulingConfig";

const originalTZ = process.env.TZ;

afterEach(() => {
  process.env.TZ = originalTZ;
});

// Monday, well clear of any buffer/weekend edge case unless a test says otherwise.
const aWeekdayMorning = new Date(2026, 7, 10, 9, 0, 0, 0);

describe("generateAvailableSlots", () => {
  it("returns exactly daysAheadToShow working days", () => {
    const days = generateAvailableSlots(aWeekdayMorning);
    expect(days).toHaveLength(daysAheadToShow);
  });

  it("Trap: skips Friday and Saturday (the Egypt weekend), not Saturday/Sunday", () => {
    const days = generateAvailableSlots(aWeekdayMorning);
    for (const day of days) {
      const dayOfWeek = new Date(`${day.dateKey}T00:00:00`).getDay();
      expect(dayOfWeek).not.toBe(5);
      expect(dayOfWeek).not.toBe(6);
    }
    // Sunday (0), a working day in Egypt, must appear within a week's lookahead.
    const weekdays = days.map((d) => new Date(`${d.dateKey}T00:00:00`).getDay());
    expect(weekdays).toContain(0);
  });

  it("each day's times span business hours in half-hour increments, formatted as h:mm AM/PM", () => {
    // Two days out, so the buffer window can't clip the start of the day.
    const farEnough = new Date(2026, 7, 12, 8, 0, 0, 0);
    const days = generateAvailableSlots(farEnough);
    const untouchedDay = days.find((d) => d.dateKey !== "2026-08-12");
    expect(untouchedDay).toBeDefined();
    expect(untouchedDay!.times[0]).toBe("9:00 AM");
    expect(untouchedDay!.times[untouchedDay!.times.length - 1]).toBe("5:30 PM");
    expect(untouchedDay!.times).not.toContain("6:00 PM");
  });

  it("Trap: excludes a slot closer than bufferHoursFromNow, but includes one exactly at the boundary", () => {
    const referenceDate = new Date(2026, 7, 10, 10, 0, 0, 0); // 10:00 AM, buffer 4h -> 2:00 PM
    const days = generateAvailableSlots(referenceDate);
    const today = days.find((d) => d.dateKey === "2026-08-10")!;
    expect(today.times).not.toContain("1:30 PM");
    expect(today.times[0]).toBe("2:00 PM");
  });

  it("drops today entirely once every slot falls inside the buffer window, without leaving an empty day", () => {
    const lateInTheDay = new Date(2026, 7, 10, 22, 0, 0, 0);
    const days = generateAvailableSlots(lateInTheDay);
    expect(days.find((d) => d.dateKey === "2026-08-10")).toBeUndefined();
    expect(days.every((d) => d.times.length > 0)).toBe(true);
  });

  it("Trap: dateKey reflects the local calendar day even in a timezone ahead of UTC, not the UTC day", () => {
    process.env.TZ = "Africa/Cairo";
    const referenceDate = new Date(2026, 7, 10, 9, 0, 0, 0);
    const days = generateAvailableSlots(referenceDate);
    expect(days[0].dateKey).toBe("2026-08-10");
  });

  it("uses the current time when no reference date is given", () => {
    const days = generateAvailableSlots();
    expect(days.length).toBeGreaterThan(0);
    expect(days.length).toBeLessThanOrEqual(daysAheadToShow);
  });

  it("bufferHoursFromNow is configured to be strictly positive, so a booking always needs real lead time", () => {
    expect(bufferHoursFromNow).toBeGreaterThan(0);
  });
});
