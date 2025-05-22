import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/resume', label: 'Resume' },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-sm border-b border-gray-200 hover:border-red-600 sticky top-0 z-50 transition-colors duration-300"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-gray-900 hover:text-red-600 transition-colors duration-200"
          >
            Vihaan Dutta
          </Link>

          <nav className="flex items-center space-x-8">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`nav-link relative ${
                  location.pathname === path
                    ? 'text-red-600'
                    : ''
                }`}
              >
                {label}
                {location.pathname === path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}; 