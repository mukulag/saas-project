import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar";
import Sidebar from '../components/Sidebar';

const HodIndex = () => {
  const [hods, sethod] = useState([]);
  const [error, setError] = useState('');

  const fetchHods = async () => {
    try {
      const response = await axios.get('http://localhost:3000/hods');
      sethod(response.data);
    } catch (err) {
      setError('Error fetching HOD data.');
    }
  };

  useEffect(() => {
    fetchHods();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <div className="container mt-5">
          <h2>HOD/Reviewer List</h2>
          <a href='/hodcreate'>
            <button  className='btn btn-md btn-primary'>Create New HOD/Reviewer</button>
          </a>
          <br/>
          <br/>
          {error && <p className="text-danger">{error}</p>}

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Employees</th>

              </tr>
            </thead>
            <tbody>
            
              {hods.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center">No employees found</td>
                </tr>
              ) : (
                hods.map((hod) => (
                  <tr key={hod.id}>
                    <td>
                      {hod.name}
                    </td>
                    <td>
                      {hod.email}
                    </td>
                    <td>
                    {hod.employees.length > 0
                          ? hod.employees.map((emp) => emp.name).join(", ") // Join names with a comma
                          : "No Employees Assigned"}
                    </td>
                    

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HodIndex;
