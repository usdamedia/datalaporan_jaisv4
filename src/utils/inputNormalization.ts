const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  Object.prototype.toString.call(value) === '[object Object]';

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
