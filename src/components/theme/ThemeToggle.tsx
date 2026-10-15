import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Monitor, Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Change theme"
            className="size-9 cursor-pointer"
          />
        }
      >
        <Sun className="size-4 dark:hidden" />
        <Moon className="hidden size-4 dark:block" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
            <Sun className="size-4" />
            Light
            {theme === "light" && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
            <Moon className="size-4" />
            Dark
            {theme === "dark" && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
            <Monitor className="size-4" />
            System
            {theme === "system" && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
