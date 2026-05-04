import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Donate from './pages/Donate';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout({ children }) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className="app-container">
      <header className="header">
        <Link to="/" className="logo">JAGDEEP <span>SACHA</span></Link>
        
        <button className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>HOME</Link>
          <a href="/#about" className="nav-link" onClick={() => setMenuOpen(false)}>ABOUT</a>
          <a href="/#vision" className="nav-link" onClick={() => setMenuOpen(false)}>VISION</a>
          <a href="/#community" className="nav-link" onClick={() => setMenuOpen(false)}>COMMUNITY</a>
        </nav>

        <div className="header-actions desktop-only">
          {/* <Link to="/donate" className="btn btn-primary">DONATE NOW</Link> */}
        </div>
      </header>

      {children}

      <footer className="footer">
        <div className="footer-brand">JAGDEEP SACHA</div>
        <div className="footer-grid">
          <div>
            <h4>CONTACT</h4>
            <p>Official Campaign HQ</p>
            <p>Caledon, Ontario</p>
            <p><a href="mailto:info@jagdeepsacha.ca" style={{ color: 'white', opacity: 0.8 }}>info@jagdeepsacha.ca</a></p>
          </div>
          <div>
            <h4>RESOURCES</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="footer-social-links">
            <h4>STAY CONNECTED</h4>
            <ul>
              <li><a href="https://www.facebook.com/profile.php?id=61588854293674" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://www.instagram.com/jagdeep_sacha?igsh=ZDQ5bmM3ZG03ZDRw" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://x.com/jagdeep_sacha" target="_blank" rel="noopener noreferrer">X / Twitter</a></li>
              <li><a href="https://www.youtube.com/@JagdeepSacha" target="_blank" rel="noopener noreferrer">YouTube</a></li>
            </ul>
          </div>
          <div>
            <h4>NEWSLETTER</h4>
            <form className="footer-newsletter" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email Address" />
              <button className="btn btn-primary">GO</button>
            </form>
          </div>
        </div>
        <p style={{ marginTop: '4rem', opacity: 0.6, fontSize: '0.8rem', textAlign: 'center' }}>Paid for by the Jagdeep Sacha Campaign for Caledon. &copy; 2026.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donate" element={<Donate />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
