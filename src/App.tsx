import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './components';
import { Home } from './pages/Home';
import { Project } from './pages/Project';
import { Contribution } from './pages/Contribution';
import { pageVariants, pageTransition } from './constants/animations';

// Reset to the top of the page on every route change, so navigating to a new
// page (e.g. a project) starts at the top instead of inheriting the prior scroll.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/projects/:projectName"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Project />
            </motion.div>
          }
        />
        <Route
          path="/contributions/:contributionId"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Contribution />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  // Match the same logic as vite.config.ts
  const isCustomDomain = import.meta.env.VITE_CUSTOM_DOMAIN === 'true';
  const basename = import.meta.env.DEV ? '' : (isCustomDomain ? '/' : '/portfolio');
  
  return (
    <Router basename={basename}>
      <ScrollToTop />
      <div className="min-h-screen bg-white transition-colors duration-300">
        <Header />
        <main>
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;
