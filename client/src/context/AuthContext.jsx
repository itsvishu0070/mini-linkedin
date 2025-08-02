
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  
  useEffect(() => {
    try {
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        setUser(JSON.parse(userInfo));
      }
    } catch (error) {
      console.error("Failed to parse userInfo from localStorage:", error);
      localStorage.removeItem("userInfo"); 
    } finally {
      setLoading(false); 
    }
  }, []);

  
  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(data)); 
      setUser(data);
      return { success: true, data }; 
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

  
  const register = async (name, email, password, bio) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
        bio,
      });
      localStorage.setItem("userInfo", JSON.stringify(data)); 
      setUser(data); 
      return { success: true, data }; 
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

 
  const logout = () => {
    localStorage.removeItem("userInfo"); 
    setUser(null); 
  };

  
  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export const useAuth = () => useContext(AuthContext);
