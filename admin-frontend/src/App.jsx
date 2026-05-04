import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CreditCard, Camera, Search } from 'lucide-react';

import Dashboard from './pages/Dashboard';
import Subscribers from './pages/Subscribers';
import Donations from './pages/Donations';
import CommunityPhotos from './pages/CommunityPhotos';
import SEOManager from './pages/SEOManager';

function App() {
  return (
    <Router>
      <div className="admin-layout">
        <aside className="sidebar">
          <div className="sidebar-logo">JAGDEEP ADMIN</div>
          <nav className="sidebar-nav">
            <NavLink to="/" className="nav-link">
              <LayoutDashboard size={20} /> Dashboard
            </NavLink>
            <NavLink to="/subscribers" className="nav-link">
              <Users size={20} /> Subscribers
            </NavLink>
            <NavLink to="/donations" className="nav-link">
              <CreditCard size={20} /> Donations
            </NavLink>
            <NavLink to="/photos" className="nav-link">
              <Camera size={20} /> Community Photos
            </NavLink>
            <NavLink to="/seo" className="nav-link">
              <Search size={20} /> SEO Management
            </NavLink>
          </nav>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/subscribers" element={<Subscribers />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/photos" element={<CommunityPhotos />} />
            <Route path="/seo" element={<SEOManager />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
