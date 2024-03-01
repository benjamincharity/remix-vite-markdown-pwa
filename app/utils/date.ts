export function formatDate(date: string | Date | undefined): {
  short: string;
  full: string;
} {
  if (!date) {
    return { short: '', full: '' };
  }
  const dateObj = new Date(date);
  const yearMonthDay = dateObj.toISOString().split('T')[0];
  const optionsFull = {
    weekday: 'long' as const,
    year: 'numeric' as const,
    month: 'long' as const,
    day: 'numeric' as const,
    hour: 'numeric' as const,
    minute: 'numeric' as const,
    second: 'numeric' as const,
    timeZoneName: 'short' as const,
  };

  const formatterFull = new Intl.DateTimeFormat('en', optionsFull);

  return {
    short: yearMonthDay,
    full: formatterFull.format(dateObj),
  };
}
