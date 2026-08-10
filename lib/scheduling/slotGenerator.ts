import {
  businessHours,
  weekendDays,
  slotDurationMinutes,
  daysAheadToShow,
  bufferHoursFromNow,
} from "./schedulingConfig";

export interface DaySlots {
  dateKey: string;
  label: string;
  times: string[];
}

/** Local Y-M-D, not date.toISOString().slice(0, 10) — the UTC form drifts a
 * calendar day near midnight in any timezone ahead of UTC. */
function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDayLabel(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function formatTime(hour: number, minute: number): string {
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  const displayMinute = String(minute).padStart(2, "0");
  return `${displayHour}:${displayMinute} ${period}`;
}

/**
 * Business days (Sun-Thu, matching siteConfig.hours) with time slots inside
 * business hours, skipping anything closer than bufferHoursFromNow to the
 * reference time. Pure function of its input, so it's fully unit-testable
 * and the UI just renders whatever it returns.
 */
export function generateAvailableSlots(referenceDate: Date = new Date()): DaySlots[] {
  const days: DaySlots[] = [];
  const cursor = new Date(referenceDate);
  cursor.setHours(0, 0, 0, 0);

  const earliestBookable = new Date(referenceDate.getTime() + bufferHoursFromNow * 60 * 60 * 1000);

  // Weekends are skipped without counting toward daysAheadToShow, and a day
  // whose every slot falls before earliestBookable is dropped rather than
  // included empty, so this can run longer than daysAheadToShow iterations.
  let safety = 0;
  while (days.length < daysAheadToShow && safety < daysAheadToShow * 4) {
    safety += 1;
    if (!weekendDays.includes(cursor.getDay())) {
      const times: string[] = [];
      for (
        let minutes = businessHours.startHour * 60;
        minutes < businessHours.endHour * 60;
        minutes += slotDurationMinutes
      ) {
        const hour = Math.floor(minutes / 60);
        const minute = minutes % 60;
        const slotDateTime = new Date(cursor);
        slotDateTime.setHours(hour, minute, 0, 0);
        if (slotDateTime.getTime() >= earliestBookable.getTime()) {
          times.push(formatTime(hour, minute));
        }
      }
      if (times.length > 0) {
        days.push({ dateKey: toDateKey(cursor), label: formatDayLabel(cursor), times });
      }
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
}
