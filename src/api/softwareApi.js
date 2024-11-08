import axios from 'axios';

const API_URL = 'http://localhost:5000/api/software';

export const createSoftware = (data, token) =>
    axios.post(API_URL, data, { headers: { Authorization: `Bearer ${token}` } });
