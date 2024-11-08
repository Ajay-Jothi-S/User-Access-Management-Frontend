import React, { useState } from 'react';
import { signUp } from '../../api/authApi';
import './SignUp.css'; // Import the CSS file

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await signUp({ username, password });
            alert('Sign-up successful! Please login.');
        } catch (error) {
            console.error('Sign-up failed', error);
        }
    };

    return (
        <form className="signup-form" onSubmit={handleSignUp}>
            <h2 className="signup-heading">Sign Up</h2>
            <input
                type="text"
                className="signup-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                type="password"
                className="signup-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button className="signup-button" type="submit">Sign Up</button>
        </form>
    );
}

export default SignUp;
