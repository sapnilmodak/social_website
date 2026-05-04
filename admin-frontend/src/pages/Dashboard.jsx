import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, CreditCard, Eye } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/admin';

function Dashboard() {
  const [stats, setStats] = useState({
    visitorCount: 0,
    subscriberCount: 0,
    totalDonations: 0
  });

  useEffect(() => {
    axios.get(`${API_BASE}/stats`)
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
        <p>Real-time performance of the Jagdeep Sacha Campaign website.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="stat-label">Total Visitors</span>
            <Eye size={20} color="#666" />
          </div>
          <span className="stat-value">{stats.visitorCount}</span>
        </div>

        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="stat-label">Total Subscribers</span>
            <Users size={20} color="#666" />
          </div>
          <span className="stat-value">{stats.subscriberCount}</span>
        </div>

        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="stat-label">Total Donations</span>
            <CreditCard size={20} color="#666" />
          </div>
          <span className="stat-value">${stats.totalDonations.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
