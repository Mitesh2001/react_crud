import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import PublicRoutes from "./routes/PublicRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <PublicRoutes />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
