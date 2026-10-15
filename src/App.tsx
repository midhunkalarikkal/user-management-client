import { useTheme } from "next-themes";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import ThemeProvider from "./components/theme/ThemeProvider";

function App() {
  const { resolvedTheme } = useTheme();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        newestOnTop
        closeOnClick={false}
        pauseOnHover
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </ThemeProvider>
  );
}

export default App;
