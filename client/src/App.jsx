
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext"; 


import Navbar from "./components/Navbar.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";


const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); 
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Loading application...
      </div>
    );
  }

  
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
     
      <AuthProvider>
        <Navbar />
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
          
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

         
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

            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
