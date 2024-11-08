import axios from 'axios';

const API_URL = 'http://localhost:5000/api/requests';

export const submitRequest = (data, token) =>
    axios.post(API_URL, data, { headers: { Authorization: `Bearer ${token}` } });

export const approveRequest = (id, token) =>
    axios.put(`${API_URL}/${id}/approve`, {}, { headers: { Authorization: `Bearer ${token}` } });

export const rejectRequest = (id, token) =>
    axios.put(`${API_URL}/${id}/reject`, {}, { headers: { Authorization: `Bearer ${token}` } });
