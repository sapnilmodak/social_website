import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Donate from './pages/Donate';
import About from './pages/About';
import Vision from './pages/Vision';
import Platform from './pages/Platform';
import Volunteer from './pages/Volunteer';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import JoinModal from './components/JoinModal';
import Toast from './components/Toast';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

import { ModalProvider, useModal } from './ModalContext';

function Layout({ children }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { showJoinModal, openJoinModal, closeJoinModal } = useModal();
  const [toast, setToast] = useState({ show: false, title: '', message: '' });

  const showNotification = (title, message) => {
    setToast({ show: true, title, message });
  };

  return (
    <div className="app-container">
      <div className="toast-container">
        <Toast 
          show={toast.show} 
          title={toast.title} 
          message={toast.message} 
          onClose={() => setToast({ ...toast, show: false })} 
        />
      </div>

      <JoinModal 
        isOpen={showJoinModal} 
        onClose={closeJoinModal} 
        showNotification={showNotification}
      />

      <header className="header">
        <Link to="/" className="logo">JAGDEEP <span>SACHA</span> FOR MAYOR</Link>
        
        <button className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>HOME</Link>
          <Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>ABOUT ME</Link>
          <Link to="/vision" className="nav-link" onClick={() => setMenuOpen(false)}>MY VISION</Link>
          <Link to="/platform" className="nav-link" onClick={() => setMenuOpen(false)}>ISSUES</Link>
          <Link to="/volunteer" className="nav-link" onClick={() => setMenuOpen(false)}>GET INVOLVED</Link>
          <Link to="/blogs" className="nav-link" onClick={() => setMenuOpen(false)}>BLOGS</Link>
          <Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>CONTACT</Link>
          <button 
            className="nav-link" 
            onClick={() => { openJoinModal(); setMenuOpen(false); }}
            style={{ background: 'none', border: 'none', textAlign: 'left', padding: 0, cursor: 'pointer' }}
          >
            VOLUNTEER
          </button>
          <button 
            className="nav-link mobile-only" 
            onClick={() => { openJoinModal(); setMenuOpen(false); }}
            style={{ background: 'none', border: 'none', textAlign: 'left', padding: 0, cursor: 'pointer' }}
          >
            JOIN ME
          </button>
        </nav>

        <div className="header-actions desktop-only">
          <button className="btn btn-primary" onClick={openJoinModal}>JOIN ME</button>
        </div>
      </header>

      {children}

      <footer className="footer">
        <div className="footer-brand">JAGDEEP SACHA FOR MAYOR</div>
        <div className="footer-grid">
          <div>
            <h4>CONTACT</h4>
            <p><a href="mailto:connect@jagdeep4caledon.com" style={{ color: 'white', opacity: 0.8 }}>connect@jagdeep4caledon.com</a></p>
          </div>
          <div>
            <h4>RESOURCES</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">Meet Jagdeep</Link></li>
              <li><Link to="/platform">Our Platform</Link></li>
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
        <p style={{ marginTop: '2rem', textAlign: 'center', opacity: 0.8, fontWeight: 'bold' }}>A Caledon That Feels Like Home Again</p>
        <p style={{ marginTop: '1rem', opacity: 0.6, fontSize: '0.8rem', textAlign: 'center' }}>Paid for by the Jagdeep Sacha Campaign for Caledon. &copy; 2026.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ModalProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/vision" element={<Vision />} />
            <Route path="/platform" element={<Platform />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
          </Routes>
        </Layout>
      </Router>
    </ModalProvider>
  );
}


export default App;

