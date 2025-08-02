// client/src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import AuthProvider and useAuth

// Placeholders for your pages and components - will be created in next steps
import Navbar from "./components/Navbar.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// A simple component to protect routes
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Get user and loading state from AuthContext

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Loading application...
      </div>
    ); // Show a loading message while checking auth status
  }

  // If user is not logged in, redirect to login page
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      {/* AuthProvider wraps the entire application to make user state available everywhere */}
      <AuthProvider>
        <Navbar /> {/* Navbar will be visible on all pages */}
        <div
          className="container"
          style={{
            padding: "20px",
            maxWidth: "960px",
            margin: "20px auto",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:userId"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Catch-all for unknown routes */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
