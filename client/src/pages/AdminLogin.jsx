import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, ShieldCheck, Lock, User, BarChart3, KeyRound, Sparkles, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const { adminLogin, user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    loginId: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // If already logged in, redirect
  if (user) {
    navigate(user.role === 'ADMIN' ? '/admin' : user.className ? '/dashboard' : '/class-selection');
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await adminLogin(formData.loginId, formData.password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify your administrative credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-portal-wrapper">
      <div className="login-portal-container">
        
        {/* Left Presentation Side with 3D Visual & Feature Cards */}
        <motion.div 
          className="login-presentation-side"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Link to="/" className="presentation-brand-header">
            <img src="/visionx-logo.png" alt="VISIONX Logo" className="presentation-brand-logo" />
            <span className="presentation-brand-text">VISIONX</span>
          </Link>

          <h1 className="presentation-headline">
            Executive Platform<br />Management &<br />
            <span className="highlight-caramel">Control.</span>
          </h1>

          <p className="presentation-subtext">
            Centralized administrative command to manage partner schools, curriculum delivery, license keys, and enterprise speech diagnostics.
          </p>

          <div className="presentation-visual-row">
            {/* Floating Glassmorphic Feature Cards */}
            <div className="presentation-feature-list">
              <motion.div 
                className="presentation-feature-item"
                whileHover={{ x: 6, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="feature-icon-clay purple-clay">
                  <KeyRound size={22} className="clay-svg-icon" />
                </div>
                <div className="feature-item-text">
                  <strong>Role-Based Governance</strong>
                  <p>Strict cryptographic authentication & permission management.</p>
                </div>
              </motion.div>

              <motion.div 
                className="presentation-feature-item"
                whileHover={{ x: 6, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="feature-icon-clay gold-clay">
                  <BarChart3 size={22} className="clay-svg-icon" />
                </div>
                <div className="feature-item-text">
                  <strong>Global Analytics</strong>
                  <p>Real-time student progress & institution speech analytics.</p>
                </div>
              </motion.div>
            </div>

            {/* 3D Character Illustration Backdrop */}
            <div className="login-character-showcase">
              <div className="character-arch-glow"></div>
              <img 
                src="/admin-character.jpg" 
                alt="Academic Director Managing Platform" 
                className="login-character-img" 
              />
            </div>
          </div>
        </motion.div>

        {/* Right Form Card Side with 3D Claymorphism Tablet */}
        <motion.div 
          className="login-card-side"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="auth-tablet-card">
            <div className="auth-card-inner">
              <div className="auth-card-header">
                <div className="admin-access-badge-pro">
                  <ShieldCheck size={15} />
                  <span>Authorized Personnel Only</span>
                </div>
                <h2 className="auth-card-title mt-1">Admin Portal</h2>
                <p className="auth-card-subtitle">
                  Enter authorized executive credentials to access platform controls.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="adminLoginId">Administrator ID</label>
                  <div className="input-icon-wrapper">
                    <User size={18} className="input-lead-icon" />
                    <input
                      id="adminLoginId"
                      type="text"
                      name="loginId"
                      value={formData.loginId}
                      onChange={handleChange}
                      placeholder="Enter Admin ID"
                      autoComplete="username"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="adminPassword">Security Key / Password</label>
                  <div className="input-icon-wrapper">
                    <Lock size={18} className="input-lead-icon" />
                    <input
                      id="adminPassword"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      required
                    />
                    <button 
                      type="button" 
                      className="input-eye-btn" 
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <motion.div 
                    className="alert alert-error"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {error}
                  </motion.div>
                )}

                <button
                  type="submit"
                  className="auth-submit-btn-pro"
                  disabled={loading}
                >
                  {loading ? 'Authenticating...' : 'Authenticate & Enter →'}
                </button>
              </form>

              <div className="auth-card-footer">
                <Link to="/" className="auth-back-link">← Return to Homepage</Link>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
