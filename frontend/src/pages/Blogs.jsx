import React, { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/blog`)
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="blogs-page">
      <section className="hero-internal" style={{ background: 'var(--primary-green)', color: 'white' }}>
        <div className="hero-content">
          <h1 className="hero-title" style={{ color: 'white' }}>Latest from the Campaign</h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto' }}>
            Stay updated with our progress, community events, and vision for Caledon.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading ? (
            <div className="text-center">Loading blogs...</div>
          ) : blogs.length > 0 ? (
            <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 'var(--space-lg)' }}>
              {blogs.map((blog) => (
                <article key={blog.id} className="blog-card" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                  <div style={{ height: '250px', overflow: 'hidden' }}>
                    <img 
                      src={`${BACKEND_URL}${blog.imageUrl}`} 
                      alt={blog.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  <div style={{ padding: 'var(--space-md)' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--primary-green)', fontWeight: '700' }}>
                      {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)', marginTop: '0.5rem', marginBottom: '1rem' }}>{blog.title}</h3>
                    <p style={{ color: '#555', lineHeight: '1.6', fontSize: '1rem' }}>
                      {blog.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <h3>No blog posts yet.</h3>
              <p>Check back soon for updates!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Blogs;
