import React, { useState } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar";
import Sidebar from '../components/Sidebar';
import Swal from "sweetalert2";


const FrequencyForm = () => {
  const [name, setName] = useState('');
  const [interval_days, setIntervalDays] = useState('');
  const [trigger_days, setTriggerDays] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newFrequency = { name, interval_days, trigger_days};
      const response = await axios.post('http://localhost:3000/frequency', newFrequency);
      Swal.fire({
        title: "Frequency Created Successfully",
        // text: "Do you want to proceed with adding this frequency?",
        icon: "success",
      }).then((result) => {
        window.location.href = "/frequency";
      });

      setError('');
    } catch (err) {
      setError('Failed to create  Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <div className="container mt-5">
          <h2>Add New Frequency</h2>
          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Frequency Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="interval_days" className="form-label">Interval (in days)</label>
              <input
                type="number"
                id="interval_days"
                className="form-control"
                value={interval_days}
                onChange={(e) => setIntervalDays(e.target.value)}
                required                
              />
            </div>

            <div className="mb-3">
              <label htmlFor="trigger_days" className="form-label">Trigger Days</label>
              <input
                type="number"
                id="trigger_days"
                className="form-control"
                value={trigger_days}
                onChange={(e) => setTriggerDays(e.target.value)}
                required
              />
            </div>

           

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FrequencyForm;
