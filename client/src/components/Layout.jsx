import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

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
            <div className="nav-logo-badge">
              <img src="/visionx-logo.png" alt="VISIONX Logo" className="nav-logo" />
            </div>
            <span className="nav-brand-text">VISIONX</span>
          </motion.div>

          <div className="nav-links">
            {user.role === 'ADMIN' ? (
              <>
                <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}>
                  Dashboard
                </Link>
                <motion.button 
                  className="btn-nav-logout" 
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut size={14} className="logout-icon" />
                  <span>Logout</span>
                </motion.button>
              </>
            ) : user.role === 'TEACHER' ? (
              <>
                <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' || location.pathname === '/classes' ? 'active' : ''}`}>
                  Dashboard
                </Link>
                <motion.div 
                  className="nav-user-pill"
                  whileHover={{ y: -1 }}
                >
                  <span className="nav-user-avatar-circle">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'T'}
                  </span>
                  <div className="nav-user-details-col">
                    <span className="nav-user-fullname">
                      {user.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : 'Teacher'}
                    </span>
                    <span className="nav-user-role-label">Teacher</span>
                  </div>
                </motion.div>
                <motion.button 
                  className="btn-nav-logout" 
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut size={14} className="logout-icon" />
                  <span>Logout</span>
                </motion.button>
              </>
            ) : (
              <>
                <Link 
                  to={`/class/${user.className ? user.className.toLowerCase().replace(' ', '-') : 'class-1'}`} 
                  className={`nav-link ${location.pathname.startsWith('/class/') ? 'active' : ''}`}
                >
                  My Learning
                </Link>
                <motion.div 
                  className="nav-user-pill"
                  whileHover={{ y: -1 }}
                >
                  <span className="nav-user-avatar-circle">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'S'}
                  </span>
                  <div className="nav-user-details-col">
                    <span className="nav-user-fullname">
                      {user.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : 'Student'}
                    </span>
                    <span className="nav-user-role-label">{user.className || 'Student'}</span>
                  </div>
                </motion.div>
                <motion.button 
                  className="btn-nav-logout" 
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut size={14} className="logout-icon" />
                  <span>Logout</span>
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