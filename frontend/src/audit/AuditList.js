import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const AuditList = () => {
  const { user } = useAuth();

  const [audits, setAudits] = useState([]);
  const [error, setError] = useState('');
  const [rights_about_to_give, setrights_about_to_give] = useState('');

  useEffect(() => {
    // Fetch all audits
    const fetchAudits = async () => {
      try {
        console.log(user.role);
        let param = { user: user._id }; 
        if(user.role == "admin"){ 
          param = {user: "admin"};
        }
        
        const response = await axios.get('http://localhost:3000/pastAudits', {
          params: param
        });

        setAudits(response.data);
      } catch (err) {
        setError('Failed to fetch audits');
        console.error('Error fetching audits:', err);
      }
    };

    fetchAudits();
  }, []);



  return (
    <div className="app">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <div className="dashboard-container">
          <div className="container mt-5">
            <h2>My Past Reviews</h2>

            {error && <p className="text-danger">{error}</p>}

            <table className="table">
              <thead>
                <tr>
                  <th>HOD/Reviewer</th>
                  <th>Employee</th>
                  <th>Application</th>
                  <th>Rights Given</th>
                  {/* <th>Rights</th> */}
                  <th>Reviewer Remarks</th>
                </tr>
              </thead>
              <tbody>
                {audits.length > 0 ? (
                  audits.map((audit) => (
                    <React.Fragment>
                      <tr key={audit._id} style={{ borderBottomColor: 'transparent' }}>
                        <td>{audit.user_id?.name}</td>
                        <td>{audit.emp_id?.name}</td>
                        <td>{audit.application_id.appName}</td>
                        <td>
                          {audit.application_id?.appName
                            ? Object.entries(audit.application_id.app_rights).map(([key, value]) => {
                              
                              const givenRight = JSON.parse(audit.reviewer_rightsGiven || "{}");
                              const isChecked = givenRight.rights?.[value]?.checked ?? false;
                              console.log(givenRight);
                              console.log(value);

                              return (
                                <div key={key}>
                                  {value}:
                                  <input
                                    type="checkbox"
                                    data-name={"right" + "-" + value + "-" + audit._id}
                                    checked={isChecked}
                                    disabled
                                  />
                                </div>
                              );
                            })
                            : "No rights"}

                        </td>
                        {/* <td>{audit.audit_date}</td> */}
                        {/* <td>{audit.rights}</td> */}
                        <td>
                          <textarea placeholder='Comments' readOnly className='form-control'
                            value={audit.reviewer_remarks || "None Given"}></textarea>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={4}>
                          <small>Audit Given At: <b>{new Date(audit.reviewer_reviewAt).toLocaleDateString('en-US', {
                            weekday: 'long', // e.g. 'Monday'
                            year: 'numeric', // e.g. '2025'
                            month: 'long', // e.g. 'February'
                            day: 'numeric' // e.g. '17'
                          })}</b>
                          </small>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">No audits found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditList;
