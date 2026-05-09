import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../ModalContext';

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
  const { openJoinModal } = useModal();
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
          <span className="hero-subtitle">CALEDON MUNICIPAL ELECTION · OCTOBER 26, 2026</span>
          <h1 className="hero-title">Caledon My home,<br />the most beautiful<br />place in Ontario</h1>
          <p className="hero-description">
            For yrs I have helped people find their home. Now I want to protect it — for all of us.
          </p>
          <p className="hero-tagline">Jagdeep Sacha · Son of a Farmer · Devoted Father · Your Trusted Neighbour</p>
          <div className="hero-actions">
            <Link to="/about" className="btn btn-gold">MEET JAGDEEP</Link>
            <Link to="/platform" className="btn btn-outline">SEE OUR PLATFORM</Link>
          </div>
        </div>
        <div className="hero-image-wrap" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <img 
            src="/jsgreen.jpeg" 
            alt="Jagdeep Sacha" 
            className="hero-image" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
          />
        </div>
      </section>

      <section className="section about" id="about">
        <div className="about-image">
          <img src="/js_home_1.jpeg" alt="Jagdeep helping the community" style={{ width: '100%', borderRadius: '8px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
        </div>
        <div className="about-info">
          <h2>MEET JAGDEEP</h2>
          <p>Jagdeep Sacha is a dedicated community leader with deep roots in the community. He believes in a community where everyone has a voice and where growth is balanced with the preservation of our unique heritage.</p>
          <p>From local volunteering to advocacy for better public services, Jagdeep has always put the community first. He is committed to transparency, fiscal responsibility, and building a future we can all be proud of.</p>
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
            title="GREEN CALEDON & RURAL BEAUTY" 
            content="Our green spaces are our greatest legacy. Jagdeep is committed to protecting the greenbelt, promoting sustainable development practices, and investing in renewable energy for a cleaner future."
            id="environment"
          />
          <PlatformItem 
            title="ROAD SAFETY & SERVICES" 
            content="We will prioritize the modernization of local services, ensuring our roads are safe and our community remains well-connected, all while maintaining the unique rural charm that defines our community."
            id="services"
          />
          <PlatformItem 
            title="SAFEGUARDING FARMLAND, WATER & ENVIRONMENT" 
            content="Our natural resources are precious. We are committed to protecting prime agricultural land, securing our water sources, and preserving the environmental integrity of our region for future generations."
            id="environment-safeguard"
          />
          <PlatformItem 
            title="COMMUNITY SAFETY" 
            content="Safety is the foundation of a thriving community. We will work closely with local services to enhance emergency response times and build programs that keep our neighborhoods safe and inclusive."
            id="safety"
          />
          <PlatformItem 
            title="TRANSPARENCY & ACCOUNTABILITY" 
            content="A city belongs to its people. Jagdeep will ensure that community decisions are made in the open, with real public consultation. We will prioritize transparency in municipal spending and ensure every voice in Caledon is heard before major projects move forward."
            id="transparency"
          />
        </div>
      </section>

      <section className="section community" id="community" style={{ background: 'var(--bg-offwhite)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
          <h2 style={{ fontSize: '3.5rem', color: 'var(--primary-navy)' }}>COMMUNITY IN ACTION</h2>
          <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '700px', margin: '0 auto' }}>See how Jagdeep has been working for you across the community.</p>
        </div>

        <div className="community-slider-container">
          {photos.map((photo, index) => (
            <div 
              key={photo.id} 
              className={`community-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img src={photo.url.startsWith('/uploads') ? `${BACKEND_URL}${photo.url}` : photo.url} alt={photo.caption} />
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
          <button 
            className="btn" 
            style={{ background: 'white', color: 'var(--primary-red)' }}
            onClick={openJoinModal}
          >
            VOLUNTEER
          </button>
          <button className="btn" style={{ background: '#ccc', color: 'white', cursor: 'not-allowed' }} disabled>DONATE NOW</button>
        </div>
      </section>
    </main>
    </>
  );
}

export default Home;

