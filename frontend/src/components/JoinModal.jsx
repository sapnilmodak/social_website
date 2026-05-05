import React, { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function JoinModal({ isOpen, onClose, showNotification }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/subscriber/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        showNotification("WELCOME ABOARD!", "Thank you for joining the movement for Caledon.");
        setFormData({ firstName: '', lastName: '', email: '' });
        setTimeout(onClose, 2000);
      } else {
        showNotification("OOH NO!", data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      showNotification("ERROR", "Failed to connect to the server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="status-modal" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'left', padding: '2rem' }}>
        <button 
          onClick={onClose}
          style={{ 
            position: 'absolute', 
            top: '1rem', 
            right: '1rem', 
            background: 'none', 
            border: 'none', 
            fontSize: '1.5rem', 
            cursor: 'pointer',
            color: 'var(--primary-navy)'
          }}
        >
          ✕
        </button>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '2rem', color: 'var(--primary-navy)' }}>JOIN THE MOVEMENT</h3>
        <form className="hero-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input 
              type="text" 
              placeholder="First Name" 
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required 
              style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input 
              type="text" 
              placeholder="Last Name" 
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required 
              style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <input 
            type="email" 
            placeholder="Email Address" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required 
            style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '4px', width: '100%', marginTop: '1rem' }}
          />
          <button 
            type="submit" 
            className="btn btn-primary btn-submit"
            disabled={loading}
            style={{ 
              background: 'var(--primary-red)', 
              color: 'white', 
              width: '100%', 
              marginTop: '1.5rem',
              padding: '1rem',
              fontSize: '1rem'
            }}
          >
            {loading ? 'JOINING...' : 'COUNT ME IN'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default JoinModal;
