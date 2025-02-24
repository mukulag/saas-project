import { useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import React, { Component }  from 'react';


const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/"); // Redirect to login page after logout
    // window.location.reload();

  }, [logout, navigate]);

  return <p>Logging out...</p>;
};

export default Logout;
