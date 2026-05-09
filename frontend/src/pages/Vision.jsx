import React from 'react';
import { useModal } from '../ModalContext';

function Vision() {
  const { openJoinModal } = useModal();
  return (
    <main className="vision-page">
      <section className="hero-internal" style={{ background: 'var(--primary-green)', color: 'white' }}>
        <div className="hero-content">
          <h1 className="hero-title" style={{ color: 'white' }}>My Vision for Caledon</h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto' }}>
            Protect what makes Caledon special while building a better future for all residents.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="content-block">
            <div className="content-text">
              <h2>Growth Must Be Responsible — Not Reckless</h2>
              <p>
                I believe Caledon should grow responsibly — not recklessly. We must preserve our farmland, 
                rural character, and small-town charm for future generations.
              </p>
              <p>
                At the same time, we need smart, controlled development that doesn’t put extra tax 
                pressure on existing homeowners.
              </p>
            </div>
          </div>

          <div className="content-block reverse">
            <div className="content-text">
              <h2>Honest, Transparent Leadership</h2>
              <p>
                I will bring honest and transparent leadership to the Mayor’s office. No more backroom deals. 
                No more favouring developers over local families.
              </p>
              <p>
                Every major decision will be made openly with full input from the people who actually live here.
              </p>
            </div>
          </div>

          <div className="content-block">
            <div className="content-text">
              <h2>A Caledon That Thrives</h2>
              <p>
                I see a Caledon where our roads are safer, our seniors are properly supported, and 
                young families can afford to live and thrive without watching their taxes skyrocket.
              </p>
              <p>
                A town that respects its past while carefully planning for its future. 
                This is not about politics as usual. This is about putting Caledon first.
              </p>
              <button className="btn btn-primary" onClick={openJoinModal} style={{ marginTop: '2rem' }}>
                SUPPORT THIS VISION
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Vision;
