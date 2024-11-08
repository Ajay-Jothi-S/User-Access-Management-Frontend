import React, { useState } from 'react';
import { createSoftware } from '../../api/softwareApi';
import './AdminDashboard.css'; // Import the CSS file

function AdminDashboard() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [accessLevels, setAccessLevels] = useState([]);

    const handleCreateSoftware = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await createSoftware({ name, description, accessLevels }, token);
        alert('Software added');
    };

    const toggleAccessLevel = (level) => {
        setAccessLevels((prev) =>
            prev.includes(level) ? prev.filter((item) => item !== level) : [...prev, level]
        );
    };

    return (
        <div className="admin-dashboard">
            <h2 className="dashboard-heading">Admin Dashboard - Create Software</h2>
            <form className="software-form" onSubmit={handleCreateSoftware}>
                <input
                    className="form-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Software Name"
                    required
                />
                <textarea
                    className="form-textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <div className="access-levels">
                    <label>
                        <input
                            type="checkbox"
                            onChange={() => toggleAccessLevel('Read')}
                            checked={accessLevels.includes('Read')}
                        />
                        Read
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            onChange={() => toggleAccessLevel('Write')}
                            checked={accessLevels.includes('Write')}
                        />
                        Write
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            onChange={() => toggleAccessLevel('Admin')}
                            checked={accessLevels.includes('Admin')}
                        />
                        Admin
                    </label>
                </div>
                <button className="submit-button" type="submit">Create Software</button>
            </form>
        </div>
    );
}

export default AdminDashboard;
