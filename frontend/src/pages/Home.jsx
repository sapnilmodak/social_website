import React, { useState } from 'react';

function PlatformItem({ title, content, id }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`accordion-item ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="accordion-header">
        <span className="accordion-title">{title}</span>
        <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
      </div>
      <div className="accordion-content">
        <p>{content}</p>
      </div>
    </div>
  );
}

function Toast({ show, title, message, onClose }) {
  React.useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div className={`toast ${show ? 'show' : ''}`}>
      <div className="toast-icon">✓</div>
      <div className="toast-content">
        <h4>{title}</h4>
        <p>{message}</p>
      </div>
    </div>
  );
}

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

function Home() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [seo, setSeo] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [toast, setToast] = useState({ show: false, title: '', message: '' });

  const showNotification = (title, message) => {
    setToast({ show: true, title, message });
  };

  React.useEffect(() => {
    // 1. Track Visit
    fetch(`${API_BASE}/admin/track-visit`, { method: 'POST' })
      .catch(err => console.error("Tracking error:", err));

    // 2. Fetch Photos
    fetch(`${API_BASE}/admin/photos`)
      .then(res => res.json())
      .then(data => setPhotos(data))
      .catch(err => console.error("Photos fetch error:", err));

    // 3. Fetch SEO
    fetch(`${API_BASE}/admin/seo`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setSeo(data);
          if (data.title) document.title = data.title;
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc && data.description) metaDesc.setAttribute('content', data.description);
          const metaKey = document.querySelector('meta[name="keywords"]');
          if (metaKey && data.keywords) metaKey.setAttribute('content', data.keywords);
        }
      })
      .catch(err => console.error("SEO fetch error:", err));
  }, []);

  // Slider Logic
  React.useEffect(() => {
    if (photos.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % photos.length);
      }, 5000); // Change slide every 5 seconds
      return () => clearInterval(timer);
    }
  }, [photos]);

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
        showNotification("WELCOME ABORD!", "Thank you for joining the movement for Caledon.");
        setFormData({ firstName: '', lastName: '', email: '' });
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

  return (
    <>
      <div className="toast-container">
        <Toast 
          show={toast.show} 
          title={toast.title} 
          message={toast.message} 
          onClose={() => setToast({ ...toast, show: false })} 
        />
      </div>

      <main>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-subtitle">FOR CALEDON. FOR THE COMMUNITY.</span>
          <h1 className="hero-title">JAGDEEP<br />SACHA</h1>
          <div className="join-card-hero">
            <h3>JOIN THE MOVEMENT</h3>
            <form className="hero-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input 
                  type="text" 
                  placeholder="First Name" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required 
                />
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required 
                />
              </div>
              <input 
                type="email" 
                placeholder="Email Address" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required 
              />
              <button 
                type="submit" 
                className="btn btn-primary btn-submit"
                disabled={loading}
              >
                {loading ? 'JOINING...' : 'COUNT ME IN'}
              </button>
            </form>
          </div>
        </div>
        <div className="hero-image-wrap">
          <img src="/js_canada.jpeg" alt="Jagdeep Sacha" className="hero-image" />
        </div>
      </section>

      <section className="section about" id="about">
        <div className="about-image">
          <img src="/image.png" alt="Jagdeep helping the community" style={{ width: '100%', borderRadius: '8px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
        </div>
        <div className="about-info">
          <h2>MEET JAGDEEP</h2>
          <p>Jagdeep Sacha is a dedicated community leader with deep roots in Caledon. He believes in a community where everyone has a voice and where growth is balanced with the preservation of our unique heritage.</p>
          <p>From local volunteering to advocacy for better infrastructure, Jagdeep has always put Caledon first. He is committed to transparency, fiscal responsibility, and building a future we can all be proud of.</p>
          <a href="#involved" className="btn btn-outline">GET INVOLVED</a>
        </div>
      </section>

      <section className="section platform" id="vision">
        <div className="section-header">
          <span className="section-subtitle">OUR PLATFORM</span>
          <h2 className="section-title">THE VISION FOR CALEDON</h2>
        </div>
        
        <div className="platform-accordion">
          <PlatformItem 
            title="INFRASTRUCTURE" 
            content="We will prioritize the modernization of Caledon's infrastructure, ensuring our roads are safe and our public transit is accessible, all while maintaining the unique rural charm that defines our community."
            id="infra"
          />
          <PlatformItem 
            title="LOCAL ECONOMY" 
            content="Supporting our small business owners is at the heart of our economic plan. We will create incentives for local entrepreneurship and ensure that Caledon remains a land of opportunity for everyone."
            id="economy"
          />
          <PlatformItem 
            title="SUSTAINABILITY" 
            content="Our green spaces are our greatest legacy. Jagdeep is committed to protecting the greenbelt, promoting sustainable development practices, and investing in renewable energy for a cleaner future."
            id="environment"
          />
          <PlatformItem 
            title="COMMUNITY SAFETY" 
            content="Safety is the foundation of a thriving community. We will work closely with local services to enhance emergency response times and build programs that keep our neighborhoods safe and inclusive."
            id="safety"
          />
        </div>
      </section>

      <section className="section community" id="community" style={{ background: 'var(--bg-offwhite)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
          <h2 style={{ fontSize: '3.5rem', color: 'var(--primary-navy)' }}>COMMUNITY IN ACTION</h2>
          <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '700px', margin: '0 auto' }}>See how Jagdeep has been working for you across Caledon.</p>
        </div>

        <div className="community-slider-container">
          {photos.length > 0 ? (
            <>
              {photos.map((photo, index) => (
                <div 
                  key={photo.id} 
                  className={`community-slide ${index === currentSlide ? 'active' : ''}`}
                >
                  <img src={`${BACKEND_URL}${photo.url}`} alt={photo.caption} />
                  {photo.caption && (
                    <div className="community-slide-caption">
                      <h3>{photo.caption}</h3>
                    </div>
                  )}
                </div>
              ))}
              <div className="slider-controls">
                {photos.map((_, index) => (
                  <div 
                    key={index} 
                    className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="community-slide active">
              <img src="/social_work/image3.png" alt="Community Placeholder" />
              <div className="community-slide-caption">
                <h3>Working with the community</h3>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section involved" id="involved" style={{ textAlign: 'center', background: 'var(--primary-red)', color: 'white' }}>
        <h2 style={{ fontSize: '4rem' }}>BE PART OF THE CHANGE</h2>
        <p style={{ fontSize: '1.5rem', margin: 'var(--space-md) auto', maxWidth: '700px' }}>Whether you can volunteer your time, host a lawn sign, or make a donation, your support makes a difference.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-sm)', marginTop: 'var(--space-md)' }}>
          <a href="#involved" className="btn" style={{ background: 'white', color: 'var(--primary-red)' }}>VOLUNTEER</a>
          <button className="btn" style={{ background: '#ccc', color: 'white', cursor: 'not-allowed' }} disabled>DONATE NOW</button>
        </div>
      </section>
    </main>
    </>
  );
}

export default Home;
