import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file

function HomePage({ userRole, setUserRole }) {
    const navigate = useNavigate();

    // Handle logout by clearing the token and resetting the role
    const handleLogout = () => {
        localStorage.removeItem('token');
        setUserRole(null);
        navigate('/login');
    };

    return (
        <div className="home-container">
            <h1 className="home-title">User Access Management System</h1>
            <nav className="home-nav">
                {userRole ? (
                    <>
                        <p className="user-role">
                            Logged in as: <strong>{userRole}</strong>
                        </p>

                        {userRole === 'Employee' && (
                            <Link to="/employee" className="nav-button">Employee Dashboard</Link>
                        )}
                        {userRole === 'Manager' && (
                            <Link to="/manager" className="nav-button">Manager Dashboard</Link>
                        )}
                        {userRole === 'Admin' && (
                            <Link to="/admin" className="nav-button">Admin Dashboard</Link>
                        )}

                        <button onClick={handleLogout} className="nav-button logout-button">
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="nav-button login-button">Login</Link>
                )}
            </nav>
        </div>
    );
}

export default HomePage;
