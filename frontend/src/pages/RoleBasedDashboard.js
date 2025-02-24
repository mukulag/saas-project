import { useAuth } from "../auth/AuthContext";
import Dashboard from "./Dashboard";
import Reviewer from "../reviewer_dashboard/Dashboard";
import React from 'react';


const RoleBasedDashboard = () => {
  const { user } = useAuth();

  if (!user) return <h2>Loading...</h2>;

  return user.role === "admin" ? <Dashboard /> : <Reviewer />;
};

export default RoleBasedDashboard;