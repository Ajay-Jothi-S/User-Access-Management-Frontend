import React, { useState, useEffect } from 'react';
import { approveRequest, rejectRequest } from '../../api/requestApi';
import axios from 'axios';
import './ManagerDashboard.css'; // Import the CSS file

function ManagerDashboard() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        // Fetch pending requests from the backend
        const fetchRequests = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5000/api/requests/pending', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setRequests(response.data);
            } catch (error) {
                console.error('Error fetching requests', error);
            }
        };

        fetchRequests();
    }, []);

    const handleApprove = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await approveRequest(id, token);
            alert('Request approved');
            setRequests(requests.filter(request => request._id !== id)); // Remove approved request from the list
        } catch (error) {
            console.error('Error approving request', error);
        }
    };

    const handleReject = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await rejectRequest(id, token);
            alert('Request rejected');
            setRequests(requests.filter(request => request._id !== id)); // Remove rejected request from the list
        } catch (error) {
            console.error('Error rejecting request', error);
        }
    };

    return (
        <div className="manager-dashboard-container">
            <h2 className="manager-dashboard-heading">Manager Dashboard - Pending Requests</h2>
            <ul className="request-list">
                {requests.length > 0 ? (
                    requests.map((request) => (
                        <li key={request._id} className="request-item">
                            <p><strong>Employee:</strong> {request.employeeName}</p>
                            <p><strong>Software:</strong> {request.softwareName}</p>
                            <p><strong>Access Type:</strong> {request.accessType}</p>
                            <p><strong>Reason:</strong> {request.reason}</p>
                            <button className="approve-button" onClick={() => handleApprove(request._id)}>Approve</button>
                            <button className="reject-button" onClick={() => handleReject(request._id)}>Reject</button>
                        </li>
                    ))
                ) : (
                    <p>No pending requests</p>
                )}
            </ul>
        </div>
    );
}

export default ManagerDashboard;
