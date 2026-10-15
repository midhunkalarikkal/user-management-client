import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import ThemeProvider from "./components/theme/ThemeProvider";
import { useTheme } from "next-themes";

function AppContent() {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        newestOnTop
        closeOnClick={false}
        pauseOnHover
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
