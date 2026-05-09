import React, { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${API_BASE}/contact/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
      } else {
        const data = await response.json();
        setStatus({ type: 'error', message: data.message || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      console.error("Contact error:", error);
      setStatus({ type: 'error', message: 'Failed to connect to the server.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-page">
      <section className="hero-internal" style={{ background: 'var(--primary-green)', color: 'white' }}>
        <div className="hero-content">
          <h1 className="hero-title" style={{ color: 'white' }}>Contact Jagdeep</h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto' }}>
            I want to hear from you. Whether you have a question, a concern, or just want to share your thoughts 
            on the future of Caledon, my door is always open.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-xl)', alignItems: 'start' }}>
            <div className="contact-info">
              <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-navy)' }}>Get in Touch</h2>
              <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '2rem' }}>
                For media inquiries, volunteering, or general questions, please use the form or reach out directly.
              </p>
              
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ color: 'var(--primary-green)', marginBottom: '0.5rem' }}>EMAIL</h4>
                <a href="mailto:connect@jagdeep4caledon.com" style={{ fontSize: '1.25rem', color: 'var(--primary-navy)', textDecoration: 'none', fontWeight: 'bold' }}>
                  connect@jagdeep4caledon.com
                </a>
              </div>

              <div>
                <h4 style={{ color: 'var(--primary-green)', marginBottom: '0.5rem' }}>FOLLOW THE CAMPAIGN</h4>
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
                  <a href="https://www.facebook.com/profile.php?id=61588854293674" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-navy)', fontSize: '1.2rem', textDecoration: 'none' }}>Facebook</a>
                  <a href="https://www.instagram.com/jagdeep_sacha?igsh=ZDQ5bmM3ZG03ZDRw" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-navy)', fontSize: '1.2rem', textDecoration: 'none' }}>Instagram</a>
                  <a href="https://x.com/jagdeep_sacha" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-navy)', fontSize: '1.2rem', textDecoration: 'none' }}>Twitter / X</a>
                </div>
              </div>
            </div>

            <div className="contact-form-wrap" style={{ background: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 20px 50px rgba(0,0,0,0.08)' }}>
              {status.message && (
                <div style={{ 
                  padding: '1rem', 
                  marginBottom: '1.5rem', 
                  borderRadius: '8px', 
                  background: status.type === 'success' ? '#E6F4EA' : '#FCE8E6',
                  color: status.type === 'success' ? '#1E8E3E' : '#D93025',
                  fontWeight: '600'
                }}>
                  {status.message}
                </div>
              )}
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
                <textarea 
                  placeholder="Your Message" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required 
                  style={{ 
                    padding: '1rem', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px', 
                    width: '100%', 
                    marginTop: '1rem', 
                    minHeight: '150px',
                    fontFamily: 'inherit'
                  }} 
                ></textarea>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={loading}
                  style={{ width: '100%', marginTop: '1.5rem', padding: '1rem' }}
                >
                  {loading ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
