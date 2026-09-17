
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Sectors from './pages/Sectors';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import News from './pages/News';
import Post from './pages/Post';
import PrivacyDisclaimer from './pages/PrivacyDisclaimer';
import Admin from './pages/Admin';
import { LanguageProvider } from './contexts/LanguageContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/sectors" element={<Sectors />} />
            <Route path="/team" element={<Team />} />
            <Route path="/blog" element={<News />} />
            <Route path="/blog/:id" element={<Post />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/privacy-disclaimer" element={<PrivacyDisclaimer />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </Router>
    </LanguageProvider>
  );
};

export default App;
