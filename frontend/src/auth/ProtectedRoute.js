import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import React, { Component }  from 'react';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;

// isAuthenticated = falseuseAuth();

