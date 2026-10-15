// Reads a positive integer from URL parameters.
export const getPositiveInteger = (value: string | null, fallback: number): number => {
    if (!value || !/^\d+$/.test(value)) {
        return fallback;
    }

    const parsed = Number(value);

    return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}