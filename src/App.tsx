import { useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import UtilityBar from './components/UtilityBar';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import JewelryPage from './pages/JewelryPage';
import EcoGlassPage from './pages/EcoGlassPage';
import DiademePage from './pages/DiademePage';
import DecorPage from './pages/DecorPage';
import WorkshopsPage from './pages/WorkshopsPage';
import ExhibitionsPage from './pages/ExhibitionsPage';
import ExhibitionDetailPage from './pages/ExhibitionDetailPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const location = useLocation();

  // Without this a navigation keeps the previous page's scroll offset, which on
  // a phone lands you in the middle of the new page. Skipped for in-page
  // anchors (the catalog category chips) so those still jump to their section.
  useLayoutEffect(() => {
    if (location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-paper font-grotesk text-ink">
      <UtilityBar />
      <Header />
      {/* Keyed by pathname so the wrapper remounts and replays the enter
          animation on every route change. */}
      <main key={location.pathname} className="page-enter">
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/jewelry" element={<JewelryPage />} />
          <Route path="/eco-glass" element={<EcoGlassPage />} />
          <Route path="/diademe" element={<DiademePage />} />
          <Route path="/decor" element={<DecorPage />} />
          <Route path="/workshops" element={<WorkshopsPage />} />
          <Route path="/exhibitions" element={<ExhibitionsPage />} />
          <Route path="/exhibitions/:slug" element={<ExhibitionDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
