import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import { useAuth } from '../auth/AuthContext';
const Sidebar = () => {
  const { user } = useAuth();

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="sidebar">
      <ul>
      <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        {user.role == "admin" && (
          <li>
            <Link to="/app">Applications</Link>
          </li>
        )}
        {user.role == "admin" && (
          <li>
            <Link to="/employees">Employees</Link>
          </li>
        )}
          {user.role == "admin" && (
          <li>
            <Link to="/frequency">Frequency</Link>
          </li>
        )}
        {user.role == "admin" && (
          <li>
            <Link to="/hods">HODs</Link>
          </li>
        )}
        {user.role == "admin" && (
          <li>
            <Link to="/create_audit">Create Review</Link>
          </li>
        )}
          <li>
            <Link to="/pastReviews">Reviews Given</Link>
          </li>
        {user.role == "admin" && (
          <li>
            <Link to="/uploadExcel">Upload Audit Excel</Link>
          </li>
        )}
         {user.role == "admin" && (
          <li>
            <Link to="/uploademployee">Upload Employee </Link>
          </li>
        )}
         {user.role == "admin" && (
          <li>
            <Link to="/uploadhod">Upload HODs </Link>
          </li>
        )}
        {user.role == "admin" && (
          <li>
            <Link to="/hods">Change Password</Link>
          </li>
        )}
        {user.role == "hod" && (
          <li>
            <Link  className='text-muted'>My Employees</Link>
          </li>
        )}
        {user.role == "hod" && (
          <li>
            <Link to="/change-password">Change Password</Link>
          </li>
        )}
        
      </ul>
    </div>
  );
};

export default Sidebar;