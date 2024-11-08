import React, { useState, useEffect } from 'react';
import { submitRequest } from '../../api/requestApi';
import axios from 'axios';
import './EmployeeDashboard.css'; // Import the CSS file

function EmployeeDashboard() {
    const [softwareList, setSoftwareList] = useState([]);
    const [softwareId, setSoftwareId] = useState('');
    const [accessType, setAccessType] = useState('');
    const [reason, setReason] = useState('');

    useEffect(() => {
        // Fetch software options from the backend
        const fetchSoftware = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/software');
                setSoftwareList(response.data);
            } catch (error) {
                console.error('Error fetching software list', error);
            }
        };
        fetchSoftware();
    }, []);

    const handleSubmitRequest = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await submitRequest({ softwareId, accessType, reason }, token);
            alert('Request submitted');
        } catch (error) {
            console.error('Request submission failed', error);
        }
    };

    return (
        <div className="employee-dashboard">
            <h2 className="dashboard-heading">Employee Dashboard - Request Access</h2>
            <form className="request-form" onSubmit={handleSubmitRequest}>
                <select
                    className="request-select"
                    value={softwareId}
                    onChange={(e) => setSoftwareId(e.target.value)}
                    required
                >
                    <option value="">Select Software</option>
                    {softwareList.map((software) => (
                        <option key={software._id} value={software._id}>
                            {software.name}
                        </option>
                    ))}
                </select>
                <select
                    className="request-select"
                    value={accessType}
                    onChange={(e) => setAccessType(e.target.value)}
                    required
                >
                    <option value="">Select Access Type</option>
                    <option value="Read">Read</option>
                    <option value="Write">Write</option>
                </select>
                <textarea
                    className="request-textarea"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Reason"
                    required
                />
                <button className="request-button" type="submit">Submit Request</button>
            </form>
        </div>
    );
}

export default EmployeeDashboard;
