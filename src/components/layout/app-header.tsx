
import { useMatches } from "react-router";
import type { RouteMetadata } from "@/types/components";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AppHeader() {

  const matches = useMatches();

  const currentRoute = [...matches]
    .reverse()
    .find(
      (match) =>
        match.handle &&
        typeof match.handle === "object" &&
        "title" in match.handle
    );

  const metadata = currentRoute?.handle as RouteMetadata | undefined;

  const title = metadata?.title ?? "User Management";
  const description = metadata?.description;

  return (
    <header className="sticky top-0 z-30 grid min-h-16 grid-cols-[auto_1fr_auto] items-center gap-3 border-b bg-background px-4 md:px-6">
      <SidebarTrigger className="shrink-0" />

      <div className="min-w-0 text-center">
        <h1 className="truncate text-sm font-semibold tracking-tight sm:text-base">
          {title}
        </h1>

        {description && (
          <p className="hidden truncate text-xs text-muted-foreground sm:block">
            {description}
          </p>
        )}
      </div>

      <div className="text-xs text-muted-foreground">
        Guest
      </div>
    </header>
  );
}
