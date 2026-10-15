import { type ThemeProviderProps, ThemeProvider as NextThemesProvider } from "next-themes";

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider {...props} scriptProps={{ type: "application/json" }}>
      {children}
    </NextThemesProvider>
  );
};

export default ThemeProvider;
