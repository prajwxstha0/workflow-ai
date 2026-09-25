import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import PublicLayout from "../layouts/PublicLayout";
import AuthPages from "../pages/AuthPages";
import DashBoard from "../pages/DashBoard";
import Landing from "../pages/Landing";
import Notifications from "../pages/Notifications";
import Projects from "../pages/Projects";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<AuthPages />} />
        <Route path="/register" element={<AuthPages />} />
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/project" element={<Projects />} />
        <Route path="/notification" element={<Notifications />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
