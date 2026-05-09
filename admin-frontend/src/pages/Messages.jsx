import React, { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_BASE}/admin/contact`);
      const data = await response.json();
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        const response = await fetch(`${API_BASE}/admin/contact/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setMessages(messages.filter(m => m.id !== id));
        }
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Contact Messages</h1>
        <p>View and manage messages from your supporters.</p>
      </div>

      <div className="admin-content">
        {loading ? (
          <div className="loading">Loading messages...</div>
        ) : messages.length > 0 ? (
          <div className="message-list">
            {messages.map((message) => (
              <div key={message.id} className="message-card" style={{ 
                background: 'white', 
                padding: '1.5rem', 
                borderRadius: '12px', 
                marginBottom: '1rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                borderLeft: '4px solid #1B4332'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ margin: 0, color: '#0A1128' }}>{message.firstName} {message.lastName}</h3>
                    <a href={`mailto:${message.email}`} style={{ color: '#1B4332', fontWeight: '600', textDecoration: 'none' }}>{message.email}</a>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.85rem', color: '#888' }}>
                      {new Date(message.createdAt).toLocaleString()}
                    </span>
                    <button 
                      onClick={() => handleDelete(message.id)}
                      style={{ 
                        display: 'block', 
                        marginTop: '0.5rem', 
                        color: '#dc3545', 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div style={{ 
                  background: '#f8f9fa', 
                  padding: '1rem', 
                  borderRadius: '8px', 
                  lineHeight: '1.6',
                  color: '#444',
                  whiteSpace: 'pre-wrap'
                }}>
                  {message.message}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No messages yet.</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
