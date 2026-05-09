import React from 'react';

function Contact() {
  return (
    <main className="contact-page">
      <section className="hero-internal" style={{ background: 'var(--primary-green)', color: 'white' }}>
        <div className="hero-content">
          <h1 className="hero-title" style={{ color: 'white' }}>Contact Jagdeep</h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto' }}>
            I want to hear from you. Whether you have a question, a concern, or just want to share your thoughts 
            on the future of Caledon, my door is always open.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-xl)', alignItems: 'start' }}>
            <div className="contact-info">
              <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-navy)' }}>Get in Touch</h2>
              <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '2rem' }}>
                For media inquiries, volunteering, or general questions, please use the form or reach out directly.
              </p>
              
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ color: 'var(--primary-green)', marginBottom: '0.5rem' }}>EMAIL</h4>
                <a href="mailto:connect@jagdeep4caledon.com" style={{ fontSize: '1.25rem', color: 'var(--primary-navy)', textDecoration: 'none', fontWeight: 'bold' }}>
                  connect@jagdeep4caledon.com
                </a>
              </div>

              <div>
                <h4 style={{ color: 'var(--primary-green)', marginBottom: '0.5rem' }}>FOLLOW THE CAMPAIGN</h4>
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
                  <a href="https://www.facebook.com/profile.php?id=61588854293674" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-navy)', fontSize: '1.2rem', textDecoration: 'none' }}>Facebook</a>
                  <a href="https://www.instagram.com/jagdeep_sacha?igsh=ZDQ5bmM3ZG03ZDRw" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-navy)', fontSize: '1.2rem', textDecoration: 'none' }}>Instagram</a>
                  <a href="https://x.com/jagdeep_sacha" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-navy)', fontSize: '1.2rem', textDecoration: 'none' }}>Twitter / X</a>
                </div>
              </div>
            </div>

            <div className="contact-form-wrap" style={{ background: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 20px 50px rgba(0,0,0,0.08)' }}>
              <form className="hero-form" onSubmit={(e) => { e.preventDefault(); alert("Thank you for your message! We will get back to you soon."); }}>
                <div className="form-row">
                  <input type="text" placeholder="First Name" required style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }} />
                  <input type="text" placeholder="Last Name" required style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>
                <input type="email" placeholder="Email Address" required style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '4px', width: '100%', marginTop: '1rem' }} />
                <textarea 
                  placeholder="Your Message" 
                  required 
                  style={{ 
                    padding: '1rem', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px', 
                    width: '100%', 
                    marginTop: '1rem', 
                    minHeight: '150px',
                    fontFamily: 'inherit'
                  }} 
                ></textarea>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem', padding: '1rem' }}>
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
