import type { DetailItemProps } from "@/types/components";

const DetailItem = ({
  label,
  value,
  sensitive = false,
}: DetailItemProps) => {
  const displayValue =
    value === null ||
    value === undefined ||
    String(value).trim() === ""
      ? "Not provided"
      : sensitive
        ? "••••••••"
        : String(value);

  const isEmpty =
    value === null ||
    value === undefined ||
    String(value).trim() === "";

  return (
    <div className="min-w-0 space-y-1.5">
      <p className="text-xs font-medium text-muted-foreground">
        {label}
      </p>
      <p
        className={`break-words text-sm font-medium ${
          isEmpty ? "text-muted-foreground" : "text-foreground"
        }`}
      >
        {displayValue}
      </p>
    </div>
  );
}
export default DetailItem;