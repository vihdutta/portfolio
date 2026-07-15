import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Header = () => {
  const location = useLocation();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 transition-colors duration-300"
      style={{ 
        '--hover-border-color': '#29353c'
      } as React.CSSProperties}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderBottomColor = '#29353c';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderBottomColor = '';
      }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-center">
          <nav className="flex items-center space-x-8">
            <Link
              to="/"
              className="nav-link relative"
              style={{
                color: location.pathname === '/' ? '#29353c' : undefined
              }}
            >
              Home
              {location.pathname === '/' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-1 left-0 right-0 h-0.5"
                  style={{ backgroundColor: '#29353c' }}
                  initial={false}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}; 