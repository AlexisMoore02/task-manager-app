import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import Tasks from "../pages/Tasks";
import ProtectedRoute from "../components/ProtectedRoute";
import Body from "../components/Body";

import Boards from "../pages/Boards";
import Projects from "../pages/Projects";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";

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

      <Route
        path="/boards"
        element={
          <ProtectedRoute>
            <Body>
              <Boards />
            </Body>
          </ProtectedRoute>
        }
      />

      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <Body>
              <Projects />
            </Body>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Body>
              <Profile />
            </Body>
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Body>
              <Settings />
            </Body>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}
