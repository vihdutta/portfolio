import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Resume } from './pages/Resume';

const AnimatedRoutes = () => {
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

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
          path="/resume"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Resume />
            </motion.div>
          }
        />

      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const basename = import.meta.env.DEV ? '' : '/vihdutta.com';
  
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
