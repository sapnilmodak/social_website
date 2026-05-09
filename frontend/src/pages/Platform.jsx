import React from 'react';
import { useModal } from '../ModalContext';

function Platform() {
  const { openJoinModal } = useModal();
  const commitments = [
    {
      id: 1,
      title: "Protecting Rural Caledon",
      description: "Stop uncontrolled development. Preserve our farms and green spaces. We must preserve our rural character for future generations.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18" /><path d="M5 21V7l7-4 7 4v14" /><path d="M9 21v-6h6v6" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Lower Taxes & Fiscal Responsibility",
      description: "Fight against tax increases. Make sure growth actually pays for itself instead of burdening existing residents.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Safer Roads",
      description: "Fix dangerous intersections and make our streets safe for children. We need better infrastructure that works for residents, not just through-traffic.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Supporting Seniors",
      description: "Better programs and services for our aging population. Every senior in Caledon deserves to age with dignity and access to local care.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      )
    },
    {
      id: 5,
      title: "Healthcare Access",
      description: "Push for more local healthcare services. The land is donated, the need is urgent — we need a hospital and faster emergency response.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      )
    },
    {
      id: 6,
      title: "Transparency",
      description: "Open government. No more backroom deals. Every decision will be made in the open with full input from the people.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    }
  ];

  return (
    <main className="platform-page">
      <section className="hero-internal" style={{ background: 'var(--primary-green)', color: 'white' }}>
        <div className="hero-content">
          <h1 className="hero-title" style={{ color: 'white' }}>Key Issues</h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', maxWidth: '800px', margin: '0 auto' }}>
            Caledon is at a crossroads. We need a leader who puts residents ahead of developers.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center mb-8">
            <span className="section-subtitle">Our Vision</span>
            <h2 className="section-title" style={{ margin: '0 auto' }}>The Community We Deserve</h2>
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

