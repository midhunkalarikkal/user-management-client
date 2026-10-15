export const toDateInputValue = (value?: string): string => {
    if (!value) return "";

    const match = /^(\d{4})-(\d{1,2})-(\d{1,2})(?:$|T)/.exec(value.trim());

    if (!match) return "";

    const [, year, month, day] = match;
    const monthNumber = Number(month);
    const dayNumber = Number(day);
    const daysInMonth = [
        31,
        Number(year) % 4 === 0 &&
        (Number(year) % 100 !== 0 || Number(year) % 400 === 0)
            ? 29
            : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ][monthNumber - 1];

    if (!daysInMonth || dayNumber < 1 || dayNumber > daysInMonth) {
        return "";
    }

    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};