import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/admin';

function Subscribers() {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/subscribers`)
      .then(res => setSubscribers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Movement Supporters</h1>
        <p>People who have joined the movement through the website.</p>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map(sub => (
              <tr key={sub.id}>
                <td>{sub.firstName} {sub.lastName}</td>
                <td>{sub.email}</td>
                <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '2rem' }}>No supporters found yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Subscribers;
