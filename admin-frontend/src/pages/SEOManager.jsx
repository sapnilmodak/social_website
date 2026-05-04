import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/admin';

function SEOManager() {
  const [seo, setSeo] = useState({
    title: '',
    description: '',
    keywords: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE}/seo`)
      .then(res => {
        if (res.data) setSeo(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/seo`, seo);
      alert('SEO settings updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update SEO');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">SEO Management</h1>
        <p>Control how your website appears in search engines like Google.</p>
      </div>

      <div className="admin-form" style={{ maxWidth: '800px' }}>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Site Title</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Jagdeep Sacha - Leading Caledon to a Brighter Future"
              value={seo.title || ''}
              onChange={(e) => setSeo({ ...seo, title: e.target.value })}
            />
          </div>
          
          <div className="form-group">
            <label>Meta Description</label>
            <textarea 
              className="form-input" 
              rows="4"
              placeholder="A brief summary of your site for search results..."
              value={seo.description || ''}
              onChange={(e) => setSeo({ ...seo, description: e.target.value })}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Keywords (comma separated)</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Caledon, Politics, Jagdeep Sacha, Community, Election"
              value={seo.keywords || ''}
              onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
            />
          </div>

          <button className="btn-admin" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} disabled={loading}>
            <Save size={18} /> {loading ? 'Saving...' : 'Save SEO Settings'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SEOManager;
