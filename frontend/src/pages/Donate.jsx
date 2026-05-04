import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function StatusModal({ show, type, title, message, onClose }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className={`status-modal ${type}`}>
        <div className="modal-icon">
          {type === 'success' && '✓'}
          {type === 'error' && '✕'}
          {type === 'info' && 'i'}
        </div>
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>
        <button className="btn btn-primary modal-btn" onClick={onClose}>
          CONTINUE
        </button>
      </div>
    </div>
  );
}

function Donate() {
  const [amount, setAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState('one-time');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ show: false, type: '', title: '', message: '' });

  const presets = [25, 50, 100, 250, 500, 1000];

  const showStatus = (type, title, message) => {
    setStatus({ show: true, type, title, message });
  };

  const closeStatus = () => {
    setStatus({ ...status, show: false });
    // Clean up URL after closing success modal
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      const sessionId = query.get('session_id');
      verifyPayment(sessionId);
    }
    if (query.get('canceled')) {
      showStatus('info', 'PAYMENT CANCELED', "Your donation was canceled. No charges were made. You can try again whenever you're ready.");
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const verifyPayment = async (sessionId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/donation/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId }),
      });
      const result = await response.json();
      if (response.ok) {
        showStatus('success', 'THANK YOU FOR YOUR SUPPORT!', "Your donation has been successfully processed. A receipt has been sent to your email address.");
      } else {
        showStatus('error', 'VERIFICATION FAILED', result.message || "We couldn't verify your payment. Please contact support.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      showStatus('error', 'CONNECTION ERROR', "Something went wrong while verifying your payment. Please check your inbox for a receipt.");
    } finally {
      setLoading(false);
    }
  };

  const handleDonate = async () => {
    const donationAmount = customAmount || amount;
    if (!donationAmount || donationAmount <= 0) {
      showStatus('error', 'INVALID AMOUNT', "Please enter a valid donation amount.");
      return;
    }

    if (!donorName || !donorEmail) {
      showStatus('error', 'MISSING INFO', "Please enter your name and email so we can send your receipt.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/donation/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: donationAmount,
          donorName,
          donorEmail
        }),
      });

      const session = await response.json();

      if (!session.url) {
        throw new Error("Failed to create Stripe session");
      }

      window.location.href = session.url;
    } catch (error) {
      console.error("Donation error:", error);
      showStatus('error', 'PAYMENT ERROR', "Could not initiate payment. Please try again or use a different card.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StatusModal 
        show={status.show} 
        type={status.type} 
        title={status.title} 
        message={status.message} 
        onClose={closeStatus}
      />
      
      <main className="donate-page animate-fade-in">
        <section className="section donate-hero">
          <div className="donate-container">
            <div className="donate-info">
              <span className="section-subtitle">INVEST IN OUR FUTURE</span>
              <h1 className="section-title">YOUR SUPPORT<br />DRIVES REAL CHANGE</h1>
              <p className="donate-text">
                Every dollar you contribute goes directly towards building a better Caledon. Your donation empowers Jagdeep to fight for the community we all deserve.
              </p>
              <div className="impact-box">
                <h4>WHERE YOUR MONEY GOES</h4>
                <ul>
                  <li><strong>$25</strong> helps us print 10 yard signs</li>
                  <li><strong>$100</strong> funds a targeted community mailer</li>
                  <li><strong>$500</strong> supports a local town hall event</li>
                </ul>
              </div>
            </div>

            <div className="donate-card">
              <div className="frequency-toggle">
                <button 
                  className={`toggle-btn ${frequency === 'one-time' ? 'active' : ''}`}
                  onClick={() => setFrequency('one-time')}
                >
                  ONE-TIME
                </button>
                <button 
                  className={`toggle-btn ${frequency === 'monthly' ? 'active' : ''}`}
                  onClick={() => setFrequency('monthly')}
                >
                  MONTHLY
                </button>
              </div>

              <div className="donor-fields">
                <div className="input-group">
                  <label>YOUR NAME</label>
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="custom-input donor-input"
                  />
                </div>
                <div className="input-group">
                  <label>EMAIL ADDRESS</label>
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="custom-input donor-input"
                  />
                </div>
              </div>

              <div className="amount-grid">
                {presets.map((p) => (
                  <button 
                    key={p}
                    className={`amount-btn ${amount === p && !customAmount ? 'active' : ''}`}
                    onClick={() => {
                      setAmount(p);
                      setCustomAmount('');
                    }}
                  >
                    ${p}
                  </button>
                ))}
                <div className="custom-amount-wrap">
                  <span className="currency">$</span>
                  <input 
                    type="number" 
                    placeholder="Custom" 
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setAmount(0);
                    }}
                    className="custom-input"
                  />
                </div>
              </div>

              <button 
                className={`btn btn-primary btn-donate-submit ${loading ? 'loading' : ''}`}
                onClick={handleDonate}
                disabled={loading}
              >
                {loading ? (
                  <span className="loader"></span>
                ) : (
                  `DONATE $${customAmount || amount} ${frequency === 'monthly' ? '/ MONTH' : ''}`
                )}
              </button>
              
              <p className="legal-notice">
                Maximum individual contribution is $1,200. Contributions are not tax deductible for federal income tax purposes.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Donate;
