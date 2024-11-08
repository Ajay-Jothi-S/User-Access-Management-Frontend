import React, { useState } from 'react';
import { login } from '../../api/authApi';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login({ setUserRole }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login({ username, password });
            localStorage.setItem('token', data.token);
            setUserRole(data.role);
            navigate('/');
        } catch (error) {
            console.error('Login failed', error);
            alert('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2 className="login-heading">Login</h2>
                <input
                    className="login-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    className="login-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button className="login-button" type="submit">Login</button>
                <div className="signup-link">
                    <Link to="/signup">Create New Account</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
