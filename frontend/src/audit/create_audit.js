import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Swal from "sweetalert2";

const CreateAuditForm = () => {
  const [empId, setEmpId] = useState('');
  const [selectedemp, setSelectedEmp] = useState('');

  const [frequencyId, setFrequencyId] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState('');
  const [userId, setUserId] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(''); // Added state for selected user
  const [applicationId, setApplicationId] = useState('');
  const [selectedApplicationId, setSelectedApplicationId] = useState('');
  const [next_audit_date, setNextAuditDate] = useState('');
  const [auditDate, setAuditDate] = useState('');
  const [inactive, setInactive] = useState(false);
  const [rights, setRights] = useState('');
  const [reviewerRemarks, setReviewerRemarks] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [appRights, setAppRights] = useState([]);
  const [frequencies, setFrequencies] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedRights, setSelectedRights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // fetch employees
    fetch('http://localhost:3000/employee')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch frequencies');
        }
        return response.json();
      })
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => {
        console.error('Error fetching frequencies:', error);
      });

    // Fetch frequencies
    fetch('http://localhost:3000/frequency')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch frequencies');
        }
        return response.json();
      })
      .then((data) => {
        setFrequencies(data);
      })
      .catch((error) => {
        console.error('Error fetching frequencies:', error);
      });

    // Fetch users
    fetch('http://localhost:3000/register')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });

    // Fetch applications
    fetch('http://localhost:3000/creating')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }
        return response.json();
      })
      .then((data) => {
        setApplications(data);
      })
      .catch((error) => {
        console.error('Error fetching applications:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAudit = {
      emp_id: empId,
      user_id: userId,
      application_id: applicationId,
      initialRights: selectedRights.join(","),
    };

    try {
      const response = await axios.post('http://localhost:3000/audit', newAudit);
      Swal.fire({
        title: "Review Created Successfully",
        // text: "Do you want to proceed with adding this review?",
        icon: "success",
      }).then((result) => {
        window.location.href = "/create_audit";
      });

      setError('');
    } catch (err) {
      setError('Failed to create  Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplicationChange = async (e) => {

    const applicationId = e.target.value;
    setApplicationId(applicationId);
    setSelectedRights("");
    setAppRights("");
    try {
      const response = await axios.get('http://localhost:3000/getApplicationDataForReview', {
        params: { application_id: applicationId }  // Send frequency_id in the query parameters
      });
      setAppRights(response.data.message.app_rights);
      setNextAuditDate(response.data.nextAuditDate);
      setError('');  // Clear any previous error
    } catch (err) {
      setError('Failed to fetch the next audit date' + err);
      // setNextAuditDate(null);
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedRights((prevRights) =>
      checked ? [...prevRights, value] : prevRights.filter((right) => right !== value)
    );
  };

  return (
    <div className="app">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <div className="container mt-5">
          <h2>Create New Review</h2>

          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Select Application:</label>
              <select value={applicationId} onChange={handleApplicationChange} className='form-control' required>
                <option value="" selected disabled>Select</option>
                {applications.map((application) => (
                  <option key={application._id} value={application._id}>
                    {application.appName}
                  </option>
                ))}
              </select>
              {next_audit_date && (
                <small>
                  Next Review Date: <b>{new Date(next_audit_date).toLocaleDateString('en-US', {
                    weekday: 'long', // e.g. 'Monday'
                    year: 'numeric', // e.g. '2025'
                    month: 'long', // e.g. 'February'
                    day: 'numeric' // e.g. '17'
                  })}</b>
                </small>
              )}

            </div>
            <div className="mb-3">
              <label>Select Employee:</label>
              <select value={empId} onChange={(e) => setEmpId(e.target.value)} className='form-control' required>
                <option value="" selected disabled>Select</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label>Select HOD/Reviewer:</label>
              <select value={userId} onChange={(e) => setUserId(e.target.value)} className='form-control'>
                <option value="" selected disabled>Select</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>



            <div className="mb-3">
              <label htmlFor="rights" className="form-label">Inital Rights:</label><br></br>
              {/*
          <textarea
            id="rights"
            className="form-control"
            value={rights}
            onChange={(e) => setRights(e.target.value)}
          />
    
         */}
              {appRights.length > 0 ? (
                appRights.map((right, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      id={`right-${index}`}
                      name={`right-${right}`}
                      value={right}
                      onChange={handleCheckboxChange}
                    />
                    &nbsp;
                    <label htmlFor={`right-${index}`}>{right}</label>
                  </div>
                ))
              ) : (
                <small className='text-muted'>Select Application First</small>
              )}
            </div>

            <button type="submit" className="btn btn-primary">Create Audit</button>
          </form>
        </div>
      </div>
    </div>
    // TODO
  );
};

export default CreateAuditForm;
