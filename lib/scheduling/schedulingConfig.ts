// Mirrors siteConfig.hours (lib/config.ts): weekdays 9:00 AM - 6:00 PM,
// weekend closed. Keep these two in sync if business hours ever change —
// siteConfig.hours is the human-readable copy, this is the structured form
// the slot generator needs.
export const businessHours = {
  startHour: 9,
  endHour: 18,
};

// Egypt's work week runs Sunday-Thursday, so Friday (5) and Saturday (6)
// are the weekend, not Saturday/Sunday.
export const weekendDays = [5, 6];

export const slotDurationMinutes = 30;

// How many working days ahead to offer, not counting the weekend days
// skipped along the way.
export const daysAheadToShow = 8;

// Don't offer a slot less than this many hours from "now", so nobody can
// book a call starting in five minutes.
export const bufferHoursFromNow = 4;
