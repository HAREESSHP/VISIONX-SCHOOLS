import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
        <nav className="top-nav">
          <div className="nav-brand" onClick={() => navigate(user.role === 'ADMIN' ? '/admin' : '/dashboard')}>
            <img src="/visionx-logo.png" alt="VISIONX Logo" className="nav-logo" />
          </div>

          <div className="nav-links">
            {user.role === 'ADMIN' ? (
              <>
                <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}>
                  Dashboard
                </Link>
                <button className="btn btn-small btn-outline" onClick={handleLogout}>
                  Logout
                </button>
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
                <div className="nav-user">
                  <span className="nav-avatar">{user.name?.charAt(0) || 'U'}</span>
                  <span className="nav-username">{user.name?.split(' ')[0]}</span>
                </div>
                <button className="btn btn-small btn-outline" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>
      )}

      <main className={`main-content ${!user || isHome ? 'main-content-center' : ''}`}>
        {children}
      </main>

      {!isHome && (
        <footer className="app-footer">
          <p>© 2026 VISIONX English Learning Platform. Made with 💜 for young learners.</p>
        </footer>
      )}
    </div>
  );
}