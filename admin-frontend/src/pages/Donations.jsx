import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/admin';

function Donations() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/donations`)
      .then(res => setDonations(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Transaction History</h1>
        <p>A list of all successful donations made through Stripe.</p>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Donor</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Payment Intent ID</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.map(dn => (
              <tr key={dn.id}>
                <td>{dn.donorName}</td>
                <td>{dn.donorEmail}</td>
                <td>${(dn.amount / 100).toLocaleString()}</td>
                <td>{dn.stripePaymentIntentId}</td>
                <td>{new Date(dn.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {donations.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No donations found yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Donations;
