import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './components';
import { Home } from './pages/Home';
import { pageVariants, pageTransition } from './constants/animations';

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
