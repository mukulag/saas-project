import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const UploadHod = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [errorD, seterrorD] = useState("");
    const [previewData, setPreviewData] = useState([]);

    // Handle file selection
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setFile(selectedFile);

        // Read and preview Excel data
        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryStr = event.target.result;
            const wb = XLSX.read(binaryStr, { type: "binary" });
            const ws = wb.Sheets[wb.SheetNames[0]];
            const data = XLSX.utils.sheet_to_json(ws);
            setPreviewData(data);  // Store preview data
        };
        reader.readAsBinaryString(selectedFile);
    };

    // Upload the file
    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a file!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:3000/uploadHods", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setMessage(response.data.successData);
            seterrorD(response.data.errorData)
            setPreviewData([]); // Clear preview after upload
        } catch (error) {
            console.error("Upload Error:", error);
            setMessage("Error uploading file");
        }
    };

    return (
        <div className="app">
            <Navbar />
            <div className="content-wrapper">
                <Sidebar />
                <div className="dashboard-container">
                    <div className="container mt-5">
                        <h2 className="mb-3">Upload HODs from Excel</h2>
                        <div className="mb-3">
                            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="form-control" />
                        </div>
                        <button onClick={handleUpload} className="btn btn-primary mb-3">Upload</button>
                        
                        {message.length > 0 && (
                            <div className="table-responsive">
                                <h4>Data Submitted Successfully:</h4>
                                <table className="table table-bordered">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Password</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {message.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.Name || "N/A"}</td>
                                                <td>{item.Email || "N/A"}</td>
                                                <td>123456</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {errorD.length > 0 && (
                            <div className="table-responsive">
                                <h4>ERRORs while Data Submission:</h4>
                                <table className="table table-bordered">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Email</th>
                                            <th>Error</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {errorD.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.email || "N/A"}</td>
                                                <td>{item.error || "N/A"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadHod;
