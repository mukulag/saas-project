import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar";
import Sidebar from '../components/Sidebar';

const EmployeeIndex = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');

  // Fetch employees data from the backend
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:3000/employee');
      setEmployees(response.data);
    } catch (err) {
      setError('Error fetching employee data.');
    }
  };

  // Update employee status to 1 (mark as deleted)
  const updateStatus = (id) => {
    axios.put(`http://localhost:3000/employee/${id}`, { status: 1 })
      .then(response => {
        // Update the local employee list to reflect the change
        setEmployees(employees.map(employee => 
          employee._id === id ? { ...employee, status: 1 } : employee

        ));
        window.location.reload();

      })
      .catch(err => console.error(err));
  };

  // Fetch employees when the component mounts
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <div className="container mt-5">
          <h2>Employee List</h2>
          <a href='/employeescreate'>
            <button className='btn btn-md btn-primary'>Create New Employee</button>
          </a>
          <br />
          <br />
          {error && <p className="text-danger">{error}</p>}

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>HOD NAME</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">No employees found</td>
                </tr>
              ) : (
                employees.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.user_id?.name}</td>
                    <td>
                      {/* Only show the "Mark as Deleted" button if status is null */}
                      {employee.status === null && (
                        <button onClick={() => updateStatus(employee._id)}>
                     Delete
                        </button>
                      )}
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

export default EmployeeIndex;
