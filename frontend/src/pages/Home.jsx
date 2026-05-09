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
      <section className="hero" style={{ background: 'linear-gradient(rgba(10, 25, 10, 0.7), rgba(10, 25, 10, 0.8)), url("/jsgreen.jpeg") center/cover' }}>
        <div className="hero-content">
          <span className="hero-subtitle" style={{ color: 'var(--accent-gold)' }}>FOR MAYOR OF CALEDON</span>
          <h1 className="hero-title" style={{ color: 'white' }}>Jagdeep Sacha<br />for Mayor</h1>
          <p className="hero-tagline" style={{ color: 'var(--accent-gold)', fontSize: '1.2rem' }}>
            Fresh Eyes. Honest Leadership. Protecting Our Rural Roots.
          </p>
          <p className="hero-description" style={{ color: 'white', maxWidth: '700px' }}>
            Caledon deserves better than the same old insiders. I’m running for Mayor because it’s time for 
            real transparency, controlled growth that respects our farmland, safer roads, and putting 
            residents first — not developers.
          </p>
          <div className="hero-actions">
            <button className="btn btn-gold" onClick={openJoinModal}>DONATE NOW</button>
            <button className="btn btn-outline" onClick={openJoinModal} style={{ borderColor: 'white', color: 'white' }}>VOLUNTEER</button>
          </div>
        </div>
      </section>

      <section className="section bg-light" id="why-running">
        <div className="container">
          <div className="content-block">
            <div className="content-text">
              <span className="section-subtitle">Why I Am Running</span>
              <h2>Caledon Deserves Better</h2>
              <p>
                For too long, decisions have been made by the same insiders who have failed to control 
                runaway development, protect our farmland, and keep taxes affordable for hardworking families.
              </p>
              <p>
                I am running for Mayor because it’s time for fresh eyes and honest leadership. 
                I will protect our rural character, demand fiscal responsibility, and put the needs of 
                Caledon residents ahead of developers and special interests.
              </p>
              <p style={{ fontWeight: 'bold' }}>
                Our town is at a crossroads — we can either continue down the same path or choose real change. 
                I am running to give you that choice.
              </p>
            </div>
            <div className="content-image">
              <img src="/js_home_1.jpeg" alt="Jagdeep Sacha" style={{ borderRadius: '12px', width: '100%' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="section about" id="about">
        <div className="about-image">
          <img src="/js_home_1.jpeg" alt="Jagdeep Sacha for Mayor" style={{ width: '100%', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
        </div>
        <div className="about-info">
          <span className="section-subtitle">A Candidate with Heart</span>
          <h2>MEET JAGDEEP SACHA</h2>
          <p>
            Born and raised with deep roots in the Caledon community, Jagdeep Sacha has spent years 
            listening to residents and working to make our community better. As a local real estate 
            professional and dedicated community volunteer, he understands the unique challenges we face.
          </p>
          <p>
            Now, he is bringing his passion and fresh perspective to lead Caledon as your Mayor. 
            Jagdeep is committed to transparency, fiscal responsibility, and building a future we can all be proud of.
          </p>
          <Link to="/about" className="btn btn-primary">LEARN MORE ABOUT JAGDEEP</Link>
        </div>
      </section>

      <section className="section platform" id="issues">
        <div className="section-header">
          <span className="section-subtitle">The Plan for Caledon</span>
          <h2 className="section-title">KEY ISSUES</h2>
        </div>
        
        <div className="platform-accordion">
          <PlatformItem 
            title="PROTECTING RURAL CALEDON" 
            content="Stop uncontrolled development. Preserve our farms and green spaces. We must preserve our rural character for future generations."
            id="rural"
          />
          <PlatformItem 
            title="LOWER TAXES & FISCAL RESPONSIBILITY" 
            content="Fight against tax increases. Make sure growth actually pays for itself instead of burdening existing residents."
            id="taxes"
          />
          <PlatformItem 
            title="SAFER ROADS" 
            content="Fix dangerous intersections and make our streets safe for children. We need better infrastructure that works for residents."
            id="roads"
          />
          <PlatformItem 
            title="SUPPORTING SENIORS" 
            content="Better programs and services for our aging population. Every senior in Caledon deserves to age with dignity."
            id="seniors"
          />
          <PlatformItem 
            title="TRANSPARENCY & ACCOUNTABILITY" 
            content="A city belongs to its people. Jagdeep will ensure that community decisions are made in the open, with real public consultation. We will prioritize transparency in municipal spending and ensure every voice in Caledon is heard before major projects move forward."
            id="transparency"
          />
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/platform" className="btn btn-outline">VIEW ALL ISSUES</Link>
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

      <section className="section involved" id="involved" style={{ textAlign: 'center', background: 'var(--primary-green)', color: 'white' }}>
        <h2 style={{ fontSize: '4rem' }}>BE PART OF THE CHANGE</h2>
        <p style={{ fontSize: '1.5rem', margin: 'var(--space-md) auto', maxWidth: '700px' }}>Whether you can volunteer your time, host a lawn sign, or make a donation, your support makes a difference.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-md)', marginTop: 'var(--space-md)', flexWrap: 'wrap' }}>
          <button 
            className="btn" 
            style={{ background: 'white', color: 'var(--primary-green)', padding: '1rem 3rem' }}
            onClick={openJoinModal}
          >
            VOLUNTEER
          </button>
          <button 
            className="btn btn-gold" 
            style={{ padding: '1rem 3rem' }}
            onClick={openJoinModal}
          >
            DONATE NOW
          </button>
        </div>
      </section>
    </main>
    </>
  );
}

export default Home;

