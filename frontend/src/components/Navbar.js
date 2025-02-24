import React from 'react';
import '../styles.css';
import { useAuth } from '../auth/AuthContext';
const Navbar = () => {
    const { user } = useAuth();
  
    if (!user) {
      return <h2>Loading...</h2>;
    }
  return (
    <div className="navbar">
      <h1>Dashboard</h1>
      <div className="user-info">
        <span>Welcome, {user.name}!</span>
      </div>
      <div className="user-info">
        <a href='/logout'>
          <span>Logout</span>
        </a>
      </div>

    </div>
  );
};

export default Navbar;