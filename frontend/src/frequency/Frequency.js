import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar";
import Sidebar from '../components/Sidebar';
// import FrequencyForm from './FrequencyForm';

const FrequencyIndex = () => {
  const [frequencies, setFrequencies] = useState([]);
  const [error, setError] = useState('');

  // Fetch frequencies from the backend
  const fetchFrequencies = async () => {
    try {
      const response = await axios.get('http://localhost:3000/frequency');
      setFrequencies(response.data);
    } catch (err) {
      setError('Error fetching frequencies.');
    }
  };

  useEffect(() => {
    fetchFrequencies();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <div className="container mt-5">
       
          <h2>Frequencies</h2>
          <a href='/create_frequency'>
            <button  className='btn btn-md btn-primary'>Create New Frequency</button>
          </a>
          {error && <p className="text-danger">{error}</p>}
         
        
          {frequencies.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Frequency Name</th>
                  <th>Interval (Days)</th>
                  <th>Trigger Days</th>
                  <th className='d-none'>Status</th>
                </tr>
              </thead>
              <tbody>
                {frequencies.map((frequency) => (
                  <tr key={frequency.id}>
                    <td>{frequency.name}</td>
                    <td>{frequency.interval_days}</td>
                    <td>{frequency.trigger_days}</td>
                    <td className='d-none'>{frequency.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No frequencies found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FrequencyIndex;
