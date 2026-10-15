import type { DetailsSectionProps } from "@/types/components";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const DetailsSection = ({ title, description, icon, children }: DetailsSectionProps) => {
  return (
    <Card className="gap-0 overflow-hidden py-0 shadow-none">
      <CardHeader className="border-b py-5">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            {icon}
          </div>

          <div className="space-y-1">
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="py-6">
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">{children}</div>
      </CardContent>
    </Card>
  );
};

export default DetailsSection;
