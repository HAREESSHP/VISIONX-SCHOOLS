import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="app-layout">
      {!isHome && user && (
        <motion.nav
          className="top-nav"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            className="nav-brand"
            onClick={() => navigate(user.role === 'ADMIN' ? '/admin' : '/dashboard')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <img src="/visionx-logo.png" alt="VISIONX Logo" className="nav-logo" />
            <span className="nav-brand-text">VISIONX</span>
          </motion.div>

          <div className="nav-links">
            {user.role === 'ADMIN' ? (
              <>
                <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}>
                  Dashboard
                </Link>
                <motion.button
                  className="btn btn-small btn-outline"
                  onClick={handleLogout}
                  whileHover={{ y: -2, boxShadow: 'var(--shadow-sm)' }}
                  whileTap={{ y: 0 }}
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                {user.className && (
                  <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                    My Learning
                  </Link>
                )}
                {!user.className && (
                  <Link to="/class-selection" className={`nav-link ${location.pathname === '/class-selection' ? 'active' : ''}`}>
                    Choose Class
                  </Link>
                )}
                <Link to="/profile" className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}>
                  My Profile
                </Link>
                <motion.div
                  className="nav-user"
                  whileHover={{ y: -1, boxShadow: 'var(--shadow-sm)' }}
                >
                  <span className="nav-avatar">{user.name?.charAt(0) || 'U'}</span>
                  <span className="nav-username">{user.name?.split(' ')[0]}</span>
                </motion.div>
                <motion.button
                  className="btn btn-small btn-outline"
                  onClick={handleLogout}
                  whileHover={{ y: -2, boxShadow: 'var(--shadow-sm)' }}
                  whileTap={{ y: 0 }}
                >
                  Logout
                </motion.button>
              </>
            )}
          </div>
        </motion.nav>
      )}

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className={`main-content ${!user || isHome ? 'main-content-center' : ''}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {!isHome && (
        <footer className="app-footer">
          <p>© 2026 VISIONX English Learning Platform. Crafted for empowered young learners.</p>
        </footer>
      )}
    </div>
  );
}