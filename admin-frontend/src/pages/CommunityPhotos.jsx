import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Upload } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/admin';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

function CommunityPhotos() {
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = () => {
    axios.get(`${API_BASE}/photos`)
      .then(res => setPhotos(res.data))
      .catch(err => console.error(err));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);
    formData.append('caption', caption);

    setUploading(true);
    try {
      await axios.post(`${API_BASE}/photos`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFile(null);
      setCaption('');
      fetchPhotos();
      alert('Photo uploaded successfully!');
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) return;
    try {
      await axios.delete(`${API_BASE}/photos/${id}`);
      fetchPhotos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Community Photos</h1>
        <p>Manage images displayed in the "Community in Action" section.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <div className="admin-form">
          <h2 style={{ marginBottom: '1.5rem' }}>Upload New Photo</h2>
          <form onSubmit={handleUpload}>
            <div className="form-group">
              <label>Select Image</label>
              <input 
                type="file" 
                className="form-input" 
                onChange={(e) => setFile(e.target.files[0])} 
                accept="image/*"
                required
              />
            </div>
            <div className="form-group">
              <label>Caption (Optional)</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Brief description..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
            <button className="btn-admin" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} disabled={uploading}>
              <Upload size={18} /> {uploading ? 'Uploading...' : 'Upload Photo'}
            </button>
          </form>
        </div>

        <div className="photo-grid">
          {photos.map(photo => (
            <div key={photo.id} className="photo-card">
              <img src={`${BACKEND_URL}${photo.url}`} alt={photo.caption} />
              <button className="photo-delete" onClick={() => handleDelete(photo.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommunityPhotos;
