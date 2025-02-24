import React from 'react';
import Navbar from '../components/Navbar';  // Assuming you have a Navbar component
import Sidebar from '../components/Sidebar';  // Assuming you have a Sidebar component
import AuditList from '../audit/AuditList';  // Import the AuditList component
import PendingAuditList from '../audit/PendingAuditList';

const Dashboard = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <div className="dashboard-container">
          {/* Add AuditList to the dashboard */}
          <PendingAuditList/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
