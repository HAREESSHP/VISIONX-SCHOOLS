import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, ShieldCheck, Lock, ArrowLeft } from 'lucide-react';
import TiltCard from '../components/TiltCard';
import Login3DVisual from '../components/Login3DVisual';

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
    <div className="login-portal-wrapper admin-portal-bg">
      <div className="admin-portal-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="admin-login-tilt-wrapper"
        >
          <TiltCard
            maxAngle={6}
            scale={1.01}
            borderRadius="26px"
            className="auth-tilt-card admin-auth-card"
          >
            <div className="auth-card-inner">
              <div className="auth-card-header text-center">
                <Link to="/" className="inline-block mb-3">
                  <img src="/visionx-logo.png" alt="VISIONX Logo" className="admin-logo-badge" />
                </Link>
                <div className="admin-3d-visual-embed">
                  <Login3DVisual isAdmin={true} />
                </div>
                <div className="admin-access-badge">
                  <ShieldCheck size={16} />
                  <span>Secure Administrator Portal</span>
                </div>
                <h1 className="auth-card-title mt-2">Executive Access</h1>
                <p className="auth-card-subtitle">
                  Sign in with authorized administrative credentials to manage schools, students, and curriculum.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="auth-form mt-4">
                <div className="form-group">
                  <label htmlFor="adminLoginId">Administrator ID</label>
                  <div className="input-wrapper">
                    <input
                      id="adminLoginId"
                      type="text"
                      name="loginId"
                      value={formData.loginId}
                      onChange={handleChange}
                      placeholder="Enter Admin ID"
                      autoComplete="username"
                      required
                      className="no-icon-left"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="adminPassword">Security Key / Password</label>
                  <div className="input-wrapper">
                    <input
                      id="adminPassword"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      required
                      className="no-icon-left"
                    />
                    <button 
                      type="button" 
                      className="input-icon-right" 
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

                <motion.button
                  type="submit"
                  className="btn btn-primary btn-block btn-large auth-submit-btn"
                  disabled={loading}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {loading ? 'Verifying Access...' : 'Authenticate & Enter →'}
                </motion.button>
              </form>

              <div className="auth-card-footer">
                <Link to="/" className="auth-back-link">
                  <ArrowLeft size={16} style={{ display: 'inline', marginRight: '6px' }} />
                  Return to Home
                </Link>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </div>
  );
}
