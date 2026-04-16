export const buildDraftKey = (deptName: string) =>
  `jais_2025_${deptName
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'DEPARTMENT'}`;
