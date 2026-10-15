export const toDateInputValue = (value?: string): string => {
    if (!value) return "";

    const date = value.split("T")[0];

    return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : "";
};