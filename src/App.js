import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import ManagerDashboard from './components/Dashboard/ManagerDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import HomePage from './components/HomePage';
import { decodeToken } from 'react-jwt';  
function App() {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = decodeToken(token);
            setUserRole(decoded.role);
        }
    }, []);

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage userRole={userRole} setUserRole={setUserRole} />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login setUserRole={setUserRole} />} />
                    {userRole === 'Employee' && (
                        <Route path="/employee" element={<EmployeeDashboard />} />
                    )}
                    {userRole === 'Manager' && (
                        <Route path="/manager" element={<ManagerDashboard />} />
                    )}
                    {userRole === 'Admin' && (
                        <Route path="/admin" element={<AdminDashboard />} />
                    )}
                    <Route
                        path="*"
                        element={<Navigate to={userRole ? `/${userRole.toLowerCase()}` : "/login"} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
