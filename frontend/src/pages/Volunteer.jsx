import React from 'react';
import { useModal } from '../ModalContext';

function Volunteer() {
  const { openJoinModal } = useModal();
  return (
    <main className="volunteer-page">
      <section className="hero-internal" style={{ background: 'var(--primary-navy)', color: 'white' }}>
        <div className="hero-content">
          <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'white' }}>
            This Campaign Lives in Your Streets
          </h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto' }}>
            I started at Best Buy. I went door to door at RBC. I knocked on Caledon doors as a realtor. 
            Now I need you to knock with me.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center mb-8">
            <span className="section-subtitle">Get Involved</span>
            <h2 className="section-title" style={{ margin: '0 auto' }}>How You Can Help</h2>
          </div>

          <div className="feature-grid">
            <div className="feature-card text-center">
              <div className="icon-box" style={{ margin: '0 auto 1.5rem' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h3>Knock on Doors</h3>
              <p>Join Jagdeep in meeting neighbours and hearing their concerns firsthand. This is where the real change happens.</p>
            </div>
            <div className="feature-card text-center">
              <div className="icon-box" style={{ margin: '0 auto 1.5rem' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" />
                </svg>
              </div>
              <h3>Host a Lawn Sign</h3>
              <p>Show your support in your neighbourhood. A sign on your lawn is a silent but powerful vote of confidence.</p>
            </div>
            <div className="feature-card text-center">
              <div className="icon-box" style={{ margin: '0 auto 1.5rem' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3>Office Support</h3>
              <p>Help with administrative tasks, organizing community events, and making sure the campaign runs smoothly.</p>
            </div>
          </div>
          
          <div className="text-center" style={{ marginTop: '4rem' }}>
            <button 
              className="btn btn-primary" 
              style={{ padding: '1.2rem 3.5rem', fontSize: '1.1rem', background: 'var(--primary-red)' }}
              onClick={openJoinModal}
            >
              Sign Me Up to Volunteer
            </button>
          </div>
        </div>
      </section>

      <section className="section bg-light" style={{ background: 'var(--bg-offwhite)' }}>
        <div className="container">
          <div className="content-block reverse">
            <div className="content-text">
              <h2>Why Your Help Matters</h2>
              <p>
                This campaign isn't funded by big corporations or special interest groups. It is powered by 
                people like you who want a better Caledon for their families and their future.
              </p>
              <p>
                Every door knocked, every sign placed, and every hour volunteered brings us closer to a 
                community-led victory. Together, we can ensure Caledon stays Caledon.
              </p>
            </div>
            <div className="content-image" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <img src="/js_home_3.png" alt="Volunteer Spirit" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Volunteer;

