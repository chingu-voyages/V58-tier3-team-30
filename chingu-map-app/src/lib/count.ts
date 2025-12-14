export function countBy<T, K extends keyof T>(
  arr: T[],
  key: K
): Record<string, number> {
  return arr.reduce(
    (acc, item) => {
      const raw = item[key];

      if (raw == null) return acc;

      const val = String(raw);
      acc[val] = (acc[val] ?? 0) + 1;

      return acc;
    },
    {} as Record<string, number>
  );
}
