import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileQuestion } from "lucide-react";

const NotFoundPage = () => {
  return (
    <section className="flex min-h-[calc(100dvh-9rem)] flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-8 flex size-16 items-center justify-center rounded-2xl border border-border">
        <FileQuestion className="size-8 stroke-[1.5]" />
      </div>

      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        Error 404
      </p>

      <h1 className="text-7xl font-semibold tracking-tighter sm:text-8xl">404</h1>

      <h2 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">Page not found</h2>

      <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
        The page you're looking for doesn't exist or may have been moved. Check the URL or return to
        the users page.
      </p>

      <Button nativeButton={false} render={<Link to="/users" />} className="mt-8">
        <ArrowLeft className="size-4" />
        Return to Users
      </Button>
    </section>
  );
};
export default NotFoundPage;
