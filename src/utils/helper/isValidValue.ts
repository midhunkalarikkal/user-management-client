export function isValidValue<T extends string>(
  value: string | null,
  allowedValues: readonly T[],
): value is T {
  return value !== null && allowedValues.some((allowed) => allowed === value);
}
