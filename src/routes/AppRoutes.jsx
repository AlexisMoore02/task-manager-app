import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Register from "../pages/Register";
import Tasks from "../pages/Tasks";
import ProtectedRoute from "../components/ProtectedRoute";
import Body from "../components/Body";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Body>
              <Tasks />
            </Body>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
