// Helper function to calculate next dose time
export function calculateNextDoseTime(medication) {
  if (!medication.schedule) return null;

  const now = new Date();
  const { pattern, customDays } = medication.schedule;

  switch (pattern) {
    case "daily":
      return new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();

    case "weekly":
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();

    case "custom":
      if (customDays?.length) {
        const today = now.getDay();
        const nextDay = customDays.find((d) => d > today) || customDays[0];
        const daysToAdd =
          nextDay > today ? nextDay - today : 7 - today + nextDay;
        return new Date(
          now.getTime() + daysToAdd * 24 * 60 * 60 * 1000
        ).toISOString();
      }
      return null;

    default:
      return null;
  }
}
