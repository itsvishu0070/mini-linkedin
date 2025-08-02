// client/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios"; // Use plain axios for login/register as axiosInstance adds token after login

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user info if logged in
  const [loading, setLoading] = useState(true); // To manage initial loading state

  // Get API_URL from Vite's environment variables
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  // Effect to load user info from localStorage on initial render
  useEffect(() => {
    try {
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        setUser(JSON.parse(userInfo));
      }
    } catch (error) {
      console.error("Failed to parse userInfo from localStorage:", error);
      localStorage.removeItem("userInfo"); // Clear corrupted data if any
    } finally {
      setLoading(false); // Set loading to false once check is complete
    }
  }, []);

  // Function to handle user login
  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(data)); // Store user info (including token)
      setUser(data); // Set user state
      return { success: true, data }; // Indicate success
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
      return {
        success: false,
        message: error.response
          ? error.response.data.message
          : "An unexpected error occurred during login.",
      };
    }
  };

  // Function to handle user registration
  const register = async (name, email, password, bio) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
        bio,
      });
      localStorage.setItem("userInfo", JSON.stringify(data)); // Store user info (including token)
      setUser(data); // Set user state
      return { success: true, data }; // Indicate success
    } catch (error) {
      console.error(
        "Register error:",
        error.response ? error.response.data : error.message
      );
      return {
        success: false,
        message: error.response
          ? error.response.data.message
          : "An unexpected error occurred during registration.",
      };
    }
  };

  // Function to handle user logout
  const logout = () => {
    localStorage.removeItem("userInfo"); // Remove user info from local storage
    setUser(null); // Clear user state
  };

  // The value provided to consumers of this context
  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to easily consume the AuthContext
export const useAuth = () => useContext(AuthContext);
