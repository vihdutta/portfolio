import { useEffect } from 'react';
import { site } from './content/site';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components';
import { Home } from './pages/Home';
import { Project } from './pages/Project';
import { Contribution } from './pages/Contribution';

// Navigate to section anchors, or reset the scroll position for a new page.
const ScrollToTop = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [pathname, hash, key]);

  return null;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/projects/:projectName" element={<Project />} />
    <Route path="/contributions/:contributionId" element={<Contribution />} />
  </Routes>
);

function App() {
  useEffect(() => {
    document.title = site.pageTitle;
    document.querySelector('meta[name="description"]')?.setAttribute('content', site.description);
  }, []);
  // Match the same logic as vite.config.ts
  const isCustomDomain = import.meta.env.VITE_CUSTOM_DOMAIN === 'true';
  const basename = import.meta.env.DEV ? '' : (isCustomDomain ? '/' : '/portfolio');
  
  return (
    <Router basename={basename}>
      <ScrollToTop />
      <div className="min-h-screen bg-[#dfebf6] transition-colors duration-300">
        <Header />
        <main>
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;
