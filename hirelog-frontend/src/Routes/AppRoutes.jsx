// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "../Pages/Login";
// import Jobs from "../Pages/Jobs";
// import AddJob from "../Pages/AddJob";
// import PrivateRoute from "./PrivateRoute";
// import Register from "../Pages/Register";

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />

//       <Route path="/register" element={<Register />} />

//       <Route
//         path="/jobs"
//         element={
//           <PrivateRoute>
//             <Jobs />
//           </PrivateRoute>
//         }
//       />

//       <Route
//         path="/jobs"
//         element={
//           <PrivateRoute>
//             <AddJob />
//           </PrivateRoute>
//         }
//       />

//       <Route path="/" element={<Navigate to="/jobs" replace />} />
//       <Route path="*" element={<Navigate to="/login" replace />} />
//     </Routes>
//   );
// };

// export default AppRoutes;
// In AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Jobs from "../pages/Jobs";
import AddJob from "../pages/AddJob";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/add-job" element={<AddJob />} /> {/* This should match your navigation */}
      <Route path="/" element={<Jobs />} /> {/* Default to Jobs */}
    </Routes>
  );
};

export default AppRoutes;