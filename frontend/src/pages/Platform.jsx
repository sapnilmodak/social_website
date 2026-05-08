import React from 'react';
import { useModal } from '../ModalContext';

function Platform() {
  const { openJoinModal } = useModal();
  const commitments = [
    {
      id: 1,
      title: "Protecting Our Farmland",
      description: "Every farm protected. Every family heard. Jagdeep is committed to ensuring that our agricultural roots remain the backbone of Caledon, with no conflicts of interest in development.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18" /><path d="M5 21V7l7-4 7 4v14" /><path d="M9 21v-6h6v6" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Road Safety For Everyone",
      description: "Roads that are safe. Streets that are ours. We will tackle the issue of illegal trucking and improve public safety measures to prevent more tragedies on our roads.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Healthcare & Emergency",
      description: "The land is donated. The need is urgent. The time is now. We need a hospital and faster emergency response times for seniors in areas like Valleywood.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Balanced Development",
      description: "Protect what we love. Build what we need. We will prioritize community facilities — parks, schools, and local services — over backroom deals.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        </svg>
      )
    },
    {
      id: 5,
      title: "Supporting Local Economy",
      description: "From small businesses to local entrepreneurs, we will create an environment where Caledon's economy thrives without losing its character.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )
    },
    {
      id: 6,
      title: "Transparency & Trust",
      description: "No more fine print. Every decision will be made in the open, with the trust of the community as the only priority.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    }
  ];

  return (
    <main className="platform-page">
      <section className="hero-internal" style={{ background: 'linear-gradient(rgba(223, 46, 31, 0.9), rgba(223, 46, 31, 1))' }}>
        <div className="hero-content">
          <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'white' }}>
            Six Commitments. No Fine Print.
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', maxWidth: '800px', margin: '0 auto' }}>
            These are not promises made at election time. These are commitments built from years of listening to you.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center mb-8">
            <span className="section-subtitle">Our Vision</span>
            <h2 className="section-title" style={{ margin: '0 auto' }}>The Caledon We Deserve</h2>
          </div>

          <div className="feature-grid">
            {commitments.map((item) => (
              <div key={item.id} className="feature-card">
                <div className="icon-box">
                  {item.icon}
                </div>
                <h3>{item.id}. {item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-light" style={{ background: 'var(--bg-offwhite)' }}>
        <div className="container">
          <div className="content-block">
            <div className="content-text">
              <h2>A Contract with the Community</h2>
              <p>
                Politics often feels like a series of backroom deals and broken promises. I am running to change that. 
                These six pillars are the foundation of my administration.
              </p>
              <p>
                If elected, my office will be one of transparency. You won't have to guess where I stand 
                on development, on the environment, or on the safety of our children.
              </p>
              <button className="btn btn-primary" onClick={openJoinModal}>Support this Vision</button>
            </div>
            <div className="content-image" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <img src="/js_home_3.png" alt="Community Vision" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Platform;

