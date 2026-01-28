import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import Jobs from "../Pages/Jobs";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/jobs"
        element={
          <PrivateRoute>
            <Jobs />
          </PrivateRoute>
        }
      />
      {/* Redirect unknown routes to /login */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
