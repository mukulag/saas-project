import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function UploadExcel() {
    const [fileData, setFileData] = useState([]);
    const [report, setReport] = useState([]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (evt) => {
            const binaryString = evt.target.result;
            const wb = XLSX.read(binaryString, { type: 'binary' });

            // Get the first sheet data
            const ws = wb.Sheets[wb.SheetNames[0]];
            const data = XLSX.utils.sheet_to_json(ws);
            setFileData(data);

            // Send JSON data to the backend
            sendJsonToBackend(data);
        };

        reader.readAsBinaryString(file);
    };

    const sendJsonToBackend = async (jsonData) => {
        try {
            const response = await axios.post('http://localhost:3000/excelUpload', jsonData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            console.log(response.data);
            setReport(response.data);

        } catch (error) {
            console.error('Error sending data to backend:', error);
        }
    };

    return (
        <div className="app">
            <Navbar />
            <div className="content-wrapper">
                <Sidebar />
                <div className="dashboard-container">
                    <div className="container mt-5">
                        <h2>Upload Excel For Reviews</h2>
                        <div>
                            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

                        </div>
                        {report && report.succesData?.length > 0 && (
                        <div className="container mt-4">
                        <h3>Response Data:</h3>
                        <h4>Successfuly Created Following Enteries:</h4>
                        <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Employee Name</th>
                                        <th>Employee Email</th>
                                        <th>Application</th>
                                        <th>Initial Rights</th>
                                        <th>Audit Date</th>
                                        <th>HOD</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {report.succesData.map((item) => (
                                        <tr key={item._id}>
                                            <td>{item.emp_id?.name || "N/A"}</td>
                                            <td>{item.emp_id?.email || "N/A"}</td>
                                            <td>{item.application_id?.appName || "N/A"}</td>
                                            <td>{item.initialRights || "N/A"}</td>
                                            <td>{new Date(item.audit_date).toLocaleDateString()}</td>
                                            <td>{item.hodName || "N/A"}</td> 

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    )}
                    <hr></hr>
                    {report && report.updateData?.length > 0 && (
                        <div className="container mt-4">
                        <h4>Reviews Inital Rights Updated While Importing:</h4>
                        <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Employee Name</th>
                                        <th>Employee Email</th>
                                        <th>Application</th>
                                        <th>Updated Initial Rights</th>
                                        <th>Audit Date</th>
                                        <th>HOD</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {report.updateData.map((item) => (
                                        <tr key={item._id}>
                                            <td>{item.emp_id?.name || "N/A"}</td>
                                            <td>{item.emp_id?.email || "N/A"}</td>
                                            <td>{item.application_id?.appName || "N/A"}</td>
                                            <td>{item.initialRights || "N/A"}</td>
                                            <td>{new Date(item.audit_date).toLocaleDateString()}</td>
                                            <td>{item.hodName || "N/A"}</td> 

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    )}
                    <hr></hr>
                    {report && report.errors?.length > 0 && (
                        <div className="container mt-4">
                        <h4>Issues Reported While Importing:</h4>
                        <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Row Index</th>
                                        <th>Issue Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {report.errors.map((item) => (
                                        <tr>
                                            <td>{++item.row || "N/A"}</td>
                                            <td>{item.Error || "N/A"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadExcel;
