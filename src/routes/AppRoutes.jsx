import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import Tasks from "../pages/Tasks";
import ProtectedRoute from "../components/ProtectedRoute";
import Body from "../components/Body";

export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/auth" element={<AuthPage />} />
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
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}
