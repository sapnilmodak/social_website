import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const DEFAULT_PHOTOS = [
  { id: 'def1', url: '/social_work/image4.jpeg', caption: 'Jagdeep in the community' },
  { id: 'def2', url: '/social_work/image3.jpeg', caption: 'Supporting Caledon' }
];

function Home() {
  const [photos, setPhotos] = useState(DEFAULT_PHOTOS);
  const [seo, setSeo] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  React.useEffect(() => {
    // 1. Track Visit
    fetch(`${API_BASE}/admin/track-visit`, { method: 'POST' })
      .catch(err => console.error("Tracking error:", err));

    // 2. Fetch Photos
    fetch(`${API_BASE}/admin/photos`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setPhotos(data);
        } else {
          setPhotos(DEFAULT_PHOTOS);
        }
      })
      .catch(err => {
        console.error("Photos fetch error:", err);
        setPhotos(DEFAULT_PHOTOS);
      });

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

  return (
    <>
      <main>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-subtitle" style={{ color: '#D4AF37', fontSize: '0.9rem', letterSpacing: '2px' }}>CALEDON MUNICIPAL ELECTION · OCTOBER 26, 2026</span>
          <h1 className="hero-title">Caledon<br />That<br />Feels Like<br />Home<br />Again</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--primary-navy)', opacity: 0.9, maxWidth: '600px', marginBottom: '1.5rem' }}>
            For 20 years I have helped hundreds of Caledon families find their home. Now I want to protect it — for all of us.
          </p>
          <p style={{ color: '#D4AF37', fontWeight: '700', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Jagdeep Sacha · Certified Mortgage Broker · Realtor · Father · Your Neighbour
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/about" className="btn" style={{ background: '#D4AF37', color: 'white' }}>MEET JAGDEEP</Link>
            <Link to="/platform" className="btn btn-outline">SEE OUR PLATFORM</Link>
          </div>
        </div>
        <div className="hero-image-wrap" style={{ background: '#7a828a', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <img 
            src="/js_home.jpeg" 
            alt="Jagdeep Sacha" 
            className="hero-image" 
            style={{ width: 'auto', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply', filter: 'contrast(1.1) brightness(1.1)' }} 
          />
        </div>
      </section>

      <section className="section about" id="about">
        <div className="about-image">
          <img src="/js_home_1.jpeg" alt="Jagdeep helping the community" style={{ width: '100%', borderRadius: '8px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
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
          {photos.map((photo, index) => (
            <div 
              key={photo.id} 
              className={`community-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img src={photo.url.startsWith('/') ? photo.url : `${BACKEND_URL}${photo.url}`} alt={photo.caption} />
              {photo.caption && (
                <div className="community-slide-caption">
                  <h3>{photo.caption}</h3>
                </div>
              )}
            </div>
          ))}
          {photos.length > 1 && (
            <div className="slider-controls">
              {photos.map((_, index) => (
                <div 
                  key={index} 
                  className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
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

