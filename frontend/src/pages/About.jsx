import React from 'react';
import { useModal } from '../ModalContext';

function About() {
  const { openJoinModal } = useModal();
  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="hero-internal" style={{ background: 'linear-gradient(rgba(10, 17, 40, 0.8), rgba(10, 17, 40, 0.9)), url("/js_home_3.png") center/cover' }}>
        <div className="hero-content">
          <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'white', marginBottom: '1.5rem' }}>
            A Farmer's Son Who Never Forgot Where He Came From
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
            Jagdeep's journey from a farmer's field to the heart of the community is a story of resilience, 
            responsibility, and an unwavering commitment to the community he calls home.
          </p>
        </div>
      </section>

      {/* The Origin Story */}
      <section className="section bg-light">
        <div className="container">
          <div className="content-block">
            <div className="content-text">
              <span className="section-subtitle">The Foundation</span>
              <h2>Before Canada, There Was a Test</h2>
              <p>In 2002, I lost my father. I was young, and our family needed someone to step forward. I did.</p>
              <p>I did not know it then, but that moment shaped every decision I have made since. The weight of responsibility. The discipline of showing up even when it is hard. The understanding that the people who depend on you deserve your best — not your excuses.</p>
              <p style={{ fontWeight: 'bold', color: 'var(--primary-navy)' }}>That lesson is why I am standing here today.</p>
            </div>
            <div className="content-image" style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
              <img src="/js_home_3.png" alt="Early years" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Career & Values */}
      <section className="section">
        <div className="container">
          <div className="content-block reverse">
            <div className="content-text">
              <span className="section-subtitle">The Journey</span>
              <h2>I Came to Canada to Contribute</h2>
              <p>In 2005, I arrived in Canada with no shortcuts—just a belief that this country gives you an opportunity you are responsible to honour.</p>
              <p>I started at Best Buy, learning how to truly serve people. Later, at RBC as an Account Manager, I sat with families at their kitchen tables, helping them make life-shaping financial decisions based on honesty and trust.</p>
              <p>In 2014, I built my own practice. I’ve helped people find their homes. Every degree and certification I earned wasn't for the paper—it was because I owed the people I served my absolute best.</p>
            </div>
            <div className="content-image" style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
              <img src="/image1.png" alt="Professional Journey" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Family & Community */}
      <section className="section bg-light" style={{ background: 'var(--bg-offwhite)' }}>
        <div className="container">
          <div className="text-center mb-8">
            <span className="section-subtitle">My Why</span>
            <h2 className="section-title" style={{ margin: '0 auto' }}>Roots in the Community</h2>
          </div>
          
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)', alignItems: 'start' }}>
            <div>
              <h3 style={{ color: 'var(--primary-green)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>A Proud Resident</h3>
              <p>
                I am a proud resident of Caledon with deep roots in the community. Having lived in Canada 
                for over 20 years and right on the border of Brampton and Caledon for the past 20 years, 
                I understand the unique challenges and opportunities our town faces.
              </p>
              <p>
                As a local real estate professional and dedicated community volunteer, I have spent years 
                listening to residents and working to make our community better.
              </p>
            </div>
            <div>
              <h3 style={{ color: 'var(--primary-green)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>Service is Identity</h3>
              <p>
                As President of the IOC Canada, I’ve fought for fairness and representation. 
                I’ve sat in Gurdwaras, walked the Credit River trails, and shared coffee with seniors who feel forgotten.
              </p>
              <p>
                Now I’m bringing that same passion and fresh perspective to lead Caledon as your Mayor. 
                I am asking for your trust to continue that service with more responsibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Call to Action */}
      <section className="section" style={{ background: 'var(--primary-navy)', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'white', fontSize: '3rem', marginBottom: '2rem' }}>If Not Now, When?</h2>
          <p style={{ fontSize: '1.3rem', maxWidth: '800px', margin: '0 auto 3rem', opacity: 0.9 }}>
            Our community is at a crossroads. From healthcare gaps to road safety, the challenges are real. 
            I am not a career politician—I am your neighbor. A fresh face with rural roots.
          </p>
          <div style={{ fontWeight: 'bold', fontSize: '2rem', color: 'var(--primary-green)', marginBottom: '2rem' }}>
            I am here for your trust.
          </div>
          <div className="flex-center" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <button 
              className="btn btn-primary" 
              style={{ background: 'var(--primary-green)' }}
              onClick={openJoinModal}
            >
              Join the Campaign
            </button>
            <a href="/platform" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>Read the Platform</a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;

