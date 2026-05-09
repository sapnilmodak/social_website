import React from 'react';
import { useModal } from '../ModalContext';

function Platform() {
  const { openJoinModal } = useModal();
  const commitments = [
    {
      id: 1,
      title: "Vision for Caledon",
      description: "Preserving our unique rural charm while ensuring development is resident-led and transparent. Our character is our strength, and putting families first is our priority.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Roads and Safety",
      description: "Reliable infrastructure is a right, not a luxury. We will prioritize fixing potholes, improving road maintenance, and implementing safety measures to protect all road users.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Stronger By-Law Enforcement",
      description: "A clean and peaceful community starts with accountability. We will strengthen by-law enforcement to maintain property standards, manage noise levels, and ensure neighbourhoods remain beautiful.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Protecting Swan Lake",
      description: "Environmental preservation is non-negotiable. We will fight to protect Swan Lake from being used as a dump site, ensuring its rehabilitation is respected for future generations.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 0 0-10 10c0 5.52 4.48 10 10 10s10-4.48 10-10A10 10 0 0 0 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          <path d="M12 6v6l4 2" />
        </svg>
      )
    },
    {
      id: 5,
      title: "Safeguarding Farmland & Water",
      description: "Our natural resources are precious. We are committed to protecting prime agricultural land, securing our water sources, and preserving the environmental integrity of our region.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      )
    },
    {
      id: 6,
      title: "Community Livability",
      description: "Building a safer, more vibrant community for everyone. From enhanced public safety to better local facilities, we will focus on improving the quality of life for every resident.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      )
    },
    {
      id: 7,
      title: "My Background",
      description: "Driven by a lifetime of service and deep roots in the community. Learn why Jagdeep is running and the professional experience and dedication he brings to the job.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
      )
    }
  ];

  return (
    <main className="platform-page">
      <section className="hero-internal" style={{ background: 'linear-gradient(rgba(223, 46, 31, 0.9), rgba(223, 46, 31, 1))' }}>
        <div className="hero-content">
          <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'white' }}>
            Seven Commitments. No Fine Print.
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
                These seven pillars are the foundation of my administration.
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

