import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Pages/Login";
import Jobs from "../Pages/Jobs";
import AddJob from "../Pages/AddJob";
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

      <Route
        path="/jobs/add"
        element={
          <PrivateRoute>
            <AddJob />
          </PrivateRoute>
        }
      />

      <Route path="/" element={<Navigate to="/jobs" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
