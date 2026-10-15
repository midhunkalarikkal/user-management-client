import { Button } from "../ui/button";
import { CircleAlert } from "lucide-react";
import type { ErrorAlertProps } from "@/types/components";

const ErrorAlert = ({ heading, errorMessage, error, refetch }: ErrorAlertProps) => {
  return (
    <div className="mx-auto w-full h-full rounded-xl border p-10 text-center flex justify-center items-center flex-col">
      <CircleAlert className="mx-auto mb-3 size-8 text-destructive" />
      <h2 className="font-semibold">{heading}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{error?.message ?? errorMessage}</p>
      <Button variant="outline" className="mt-5 cursor-pointer" onClick={() => void refetch()}>
        Try again
      </Button>
    </div>
  );
};

export default ErrorAlert;
