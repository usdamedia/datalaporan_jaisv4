const MALAYSIA_TIMEZONE = 'Asia/Kuala_Lumpur';

const formatParts = (date: Date, format: Intl.DateTimeFormatOptions) => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: MALAYSIA_TIMEZONE,
    ...format,
  }).formatToParts(date);

  const find = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value || '';

  return {
    day: find('day'),
    month: find('month'),
    year: find('year'),
  };
};

export const getTodayIsoMY = () => {
  const now = new Date();
  const { day, month, year } = formatParts(now, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return `${year}-${month}-${day}`;
};

export const formatDateDDMMYYYYMY = (value?: string | null) => {
  if (!value) return '-';

  const trimmed = String(value).trim();
  if (!trimmed) return '-';

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(trimmed)) {
    return trimmed;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const [year, month, day] = trimmed.split('-');
    return `${day}/${month}/${year}`;
  }

  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) {
    return trimmed;
  }

  const { day, month, year } = formatParts(parsed, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return `${day}/${month}/${year}`;
};

export const formatNowDDMMYYYYMY = () => formatDateDDMMYYYYMY(getTodayIsoMY());
