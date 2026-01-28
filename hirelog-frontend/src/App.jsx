import { useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AppRoutes from "./Routes/AppRoutes";
import "./App.css";
import "./index.css";

function App() {
  const location = useLocation();
  const hideLayout = location.pathname === "/login";

  return (
    <>
      {!hideLayout && <Navbar />}

      <main className="min-h-screen px-6 py-4">
        <AppRoutes />
      </main>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
