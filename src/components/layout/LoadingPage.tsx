import { LoaderCircle } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-background">
      <LoaderCircle className="size-10 animate-spin text-primary" />

      <p className="text-sm font-medium text-muted-foreground">Loading...</p>
    </div>
  );
};

export default LoadingPage;
