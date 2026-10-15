import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        newestOnTop
        closeOnClick={false}
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
