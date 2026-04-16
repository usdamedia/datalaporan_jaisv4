const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  Object.prototype.toString.call(value) === '[object Object]';

export const keepNumericInputDraft = (value: string) => (value === '' ? '' : value);

export const toNonNegativeInt = (value: unknown) => {
  const parsed = parseInt(String(value ?? ''), 10);
  return Number.isNaN(parsed) ? 0 : Math.max(0, parsed);
};

export const toNonNegativeFloat = (value: unknown) => {
  const parsed = parseFloat(String(value ?? ''));
  return Number.isNaN(parsed) ? 0 : Math.max(0, parsed);
};

const normalizeLeafValue = (value: unknown): unknown => {
  if (typeof value === 'number' && value === 0) {
    return '';
  }

  if (value === '0') {
    return '';
  }

  return value;
};

export const normalizeZeroValuesForInputs = <T>(input: T): T => {
  if (Array.isArray(input)) {
    return input.map((item) => normalizeZeroValuesForInputs(item)) as T;
  }

  if (isPlainObject(input)) {
    return Object.entries(input).reduce((acc, [key, value]) => {
      acc[key] = normalizeZeroValuesForInputs(value);
      return acc;
    }, {} as Record<string, unknown>) as T;
  }

  return normalizeLeafValue(input) as T;
};
