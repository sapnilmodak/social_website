import React, { useState, useEffect } from 'react';
import { FileText, Trash2, Plus, Image as ImageIcon } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_BASE}/blog`);
      const data = await res.json();
      setBlogs(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title || !description) return alert('Please fill all fields and select an image');

    setUploading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', file);

    try {
      const res = await fetch(`${API_BASE}/blog`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setTitle('');
        setDescription('');
        setFile(null);
        e.target.reset();
        fetchBlogs();
      } else {
        alert('Failed to upload blog');
      }
    } catch (err) {
      console.error("Error uploading blog:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      await fetch(`${API_BASE}/blog/${id}`, { method: 'DELETE' });
      fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Blog Management</h1>
        <p>Post updates and news to the campaign website</p>
      </div>

      <div className="card mb-8">
        <h2 className="section-title"><Plus size={20} /> Create New Blog Post</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Blog Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Enter catchy title..." 
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Write the blog content here..." 
              rows="4"
              required
            />
          </div>
          <div className="form-group">
            <label>Cover Photo</label>
            <div className="file-upload-wrapper">
              <input type="file" onChange={handleFileChange} accept="image/*" required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={uploading}>
            {uploading ? 'Posting...' : 'Post Blog'}
          </button>
        </form>
      </div>

      <div className="card">
        <h2 className="section-title"><FileText size={20} /> Published Blogs</h2>
        {loading ? (
          <p>Loading blogs...</p>
        ) : (
          <div className="admin-grid">
            {blogs.map((blog) => (
              <div key={blog.id} className="admin-photo-card">
                <img src={`${BACKEND_URL}${blog.imageUrl}`} alt={blog.title} />
                <div className="admin-photo-info">
                  <h3>{blog.title}</h3>
                  <p>{blog.description.substring(0, 100)}...</p>
                  <button onClick={() => handleDelete(blog.id)} className="btn-delete">
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogManager;
