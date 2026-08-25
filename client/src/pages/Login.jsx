import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, GraduationCap, Users } from 'lucide-react';
import TiltCard from '../components/TiltCard';
import Login3DVisual from '../components/Login3DVisual';

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('student'); // 'student' or 'teacher'
  
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
      const loggedInUser = await login(formData.loginId, formData.password);
      if (loggedInUser.className) {
        navigate('/dashboard');
      } else {
        navigate('/class-selection');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-portal-wrapper">
      <div className="login-portal-container">
        {/* Left Presentation Side */}
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
            Where English Learning Comes to Life.
          </h1>
          <p className="presentation-subtext">
            Experience our joyful, structured spoken English curriculum crafted for young learners, educators, and schools.
          </p>

          <div className="presentation-feature-list">
            <motion.div 
              className="presentation-feature-item"
              whileHover={{ x: 6 }}
              transition={{ duration: 0.2 }}
            >
              <span className="feature-icon-badge">🗣️</span>
              <div>
                <strong>Spoken Fluency First</strong>
                <p>Guided pronunciation and real-time interactive practice.</p>
              </div>
            </motion.div>
            <motion.div 
              className="presentation-feature-item"
              whileHover={{ x: 6 }}
              transition={{ duration: 0.2 }}
            >
              <span className="feature-icon-badge">✨</span>
              <div>
                <strong>Gamified Milestones</strong>
                <p>Track streaks, collect XP rewards, and master skills step-by-step.</p>
              </div>
            </motion.div>
          </div>

          <div className="login-presentation-3d-showcase">
            <Login3DVisual isAdmin={false} />
          </div>
        </motion.div>

        {/* Right Form Card Side with 3D Tilt */}
        <motion.div 
          className="login-card-side"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <TiltCard
            maxAngle={7}
            scale={1.01}
            borderRadius="24px"
            className="auth-tilt-card"
          >
            <div className="auth-card-inner">
              <div className="auth-card-header">
                <h2 className="auth-card-title">
                  {activeTab === 'student' ? 'Student Portal' : 'Teacher Portal'}
                </h2>
                <p className="auth-card-subtitle">
                  Enter your credentials to enter your learning journey.
                </p>
              </div>

              {/* Role Toggle Tabs */}
              <div className="auth-role-tabs">
                <button 
                  className={`auth-role-tab ${activeTab === 'student' ? 'active' : ''}`}
                  onClick={() => setActiveTab('student')}
                  type="button"
                >
                  <GraduationCap size={18} />
                  <span>Student</span>
                </button>
                <button 
                  className={`auth-role-tab ${activeTab === 'teacher' ? 'active' : ''}`}
                  onClick={() => setActiveTab('teacher')}
                  type="button"
                >
                  <Users size={18} />
                  <span>Teacher</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="loginId">User Identifier</label>
                  <div className="input-wrapper">
                    <input
                      id="loginId"
                      type="text"
                      name="loginId"
                      value={formData.loginId}
                      onChange={handleChange}
                      placeholder={activeTab === 'student' ? "e.g., vx-1024" : "e.g., vx-t402"}
                      autoComplete="username"
                      required
                      className="no-icon-left"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Security Password</label>
                  <div className="input-wrapper">
                    <input
                      id="password"
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
                  {loading ? 'Authenticating...' : 'Sign In Now →'}
                </motion.button>
              </form>

              <div className="auth-card-footer">
                <Link to="/" className="auth-back-link">← Return to Homepage</Link>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </div>
  );
}