import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  Eye, 
  EyeOff, 
  GraduationCap, 
  User, 
  Lock, 
  Sparkles, 
  Mic, 
  Flame, 
  Volume2, 
  ArrowRight,
  School,
  CheckCircle2
} from 'lucide-react';
import InteractiveTeddy from '../components/InteractiveTeddy';

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  
  const [role, setRole] = useState('STUDENT'); // 'STUDENT' or 'TEACHER'
  const [formData, setFormData] = useState({
    loginId: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isLoginIdFocused, setIsLoginIdFocused] = useState(false);

  // If already logged in, redirect
  useEffect(() => {
    if (user) {
      if (user.role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else if (user.role === 'TEACHER') {
        navigate('/dashboard', { replace: true });
      } else if (user.className) {
        navigate(`/class/${user.className.toLowerCase().replace(' ', '-')}`, { replace: true });
      } else {
        navigate('/class/class-1', { replace: true });
      }
    }
  }, [user, navigate]);

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
      if (loggedInUser.role === 'TEACHER') {
        navigate('/dashboard');
      } else if (loggedInUser.className) {
        navigate(`/class/${loggedInUser.className.toLowerCase().replace(' ', '-')}`);
      } else {
        navigate('/class/class-1');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const isTyping = formData.loginId.length > 0 || formData.password.length > 0;

  return (
    <div className="login-portal-wrapper">
      <div className="login-portal-container">
        
        {/* Section 1 (Left Half): Gamified Speaking Lab & Interactive Teddy */}
        <motion.div 
          className="login-presentation-side"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo Header */}
          <Link to="/" className="presentation-brand-header">
            <img src="/secound%20logo.png" alt="VisionX Logo" className="presentation-brand-logo" />
          </Link>

          <div className="presentation-matter-wrap">
            {/* Live Lab Indicator Badge */}
            <div className="lab-indicator-badge">
              <span className="status-pulse-dot"></span>
              <Mic size={15} />
              <span>VisionX Speaking Lab • Grade 1 to 10</span>
            </div>

            <h1 className="presentation-headline">
              Speak Loud. Speak Proud.<br />
              <span className="text-orange-glow">Every Single Day.</span>
            </h1>

            <p className="presentation-subtext">
              Enter your classroom portal to record speech exercises, practice native accent phonics, and earn daily fluency badges with instant AI feedback.
            </p>

            {/* Interactive Live Voice Soundwave Frequency Monitor */}
            <div className={`speech-frequency-widget ${isTyping ? 'active' : ''}`}>
              <div className="frequency-info">
                <div className="frequency-title">
                  <Volume2 size={16} className="freq-icon" />
                  <span>Speech Frequency Monitor</span>
                </div>
                <p className="frequency-desc">
                  {isTyping ? 'Active Student Input Detected • Ready to Speak!' : 'Voice diagnostic engine initialized'}
                </p>
              </div>

              {/* Animated Equalizer Soundwave Bars */}
              <div className={`soundwave-bars ${isTyping ? 'active' : ''}`}>
                <span className="soundwave-bar"></span>
                <span className="soundwave-bar"></span>
                <span className="soundwave-bar"></span>
                <span className="soundwave-bar"></span>
                <span className="soundwave-bar"></span>
                <span className="soundwave-bar"></span>
                <span className="soundwave-bar"></span>
                <span className="soundwave-bar"></span>
              </div>
            </div>
          </div>

          {/* Interactive Teddy Companion Stage with Gamified Badges */}
          <div className="login-teddy-stage-container">
            {/* Floating Daily Streak Chip */}
            <motion.div 
              className="teddy-streak-tag"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Flame size={18} className="streak-fire-icon" />
              <span className="streak-text-bold">5-Day Streak!</span>
              <span className="streak-xp-chip">+120 XP</span>
            </motion.div>

            {/* Interactive Cursor-Tracking Teddy */}
            <InteractiveTeddy
              isPasswordFocused={isPasswordFocused}
              isLoginIdFocused={isLoginIdFocused}
              showPassword={showPassword}
              isSubmitting={loading}
            />
          </div>
        </motion.div>

        {/* Section 2 (Right Half): Sleek Student/Teacher Login Card */}
        <motion.div 
          className="login-card-side"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="auth-tablet-card">
            <div className="auth-card-inner">
              
              {/* Role Switcher Tabs (Student vs Teacher) */}
              <div className="auth-role-tabs">
                <button
                  type="button"
                  className={`auth-role-tab ${role === 'STUDENT' ? 'active' : ''}`}
                  onClick={() => setRole('STUDENT')}
                >
                  <GraduationCap size={17} />
                  <span>Student Portal</span>
                </button>
                <button
                  type="button"
                  className={`auth-role-tab ${role === 'TEACHER' ? 'active' : ''}`}
                  onClick={() => setRole('TEACHER')}
                >
                  <School size={17} />
                  <span>Teacher Portal</span>
                </button>
              </div>

              <div className="auth-card-header">
                <h2 className="auth-card-title">
                  {role === 'STUDENT' ? 'Welcome Back, Explorer! 🚀' : 'Educator Dashboard 📚'}
                </h2>
                <p className="auth-card-subtitle">
                  {role === 'STUDENT' 
                    ? 'Enter your school student credentials to access today’s lessons.' 
                    : 'Sign in with your faculty ID to monitor classroom speech progress.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="loginId">
                    {role === 'STUDENT' ? 'Student ID / Learner Identifier' : 'Teacher ID / Faculty Username'}
                  </label>
                  <div className="input-icon-wrapper">
                    <User size={18} className="input-lead-icon" />
                    <input
                      id="loginId"
                      type="text"
                      name="loginId"
                      value={formData.loginId}
                      onChange={handleChange}
                      onFocus={() => setIsLoginIdFocused(true)}
                      onBlur={() => setIsLoginIdFocused(false)}
                      placeholder={role === 'STUDENT' ? 'e.g. STU-CLASS-04' : 'e.g. TEACHER-ENG-12'}
                      autoComplete="username"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Security Password</label>
                  <div className="input-icon-wrapper">
                    <Lock size={18} className="input-lead-icon" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
                      placeholder="Enter your confidential password"
                      autoComplete="current-password"
                      required
                    />
                    <button 
                      type="button" 
                      className="input-eye-btn" 
                      onMouseDown={(e) => e.preventDefault()}
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
                  {loading ? (
                    'Connecting to Lab...'
                  ) : (
                    <>
                      <span>{role === 'STUDENT' ? 'Enter Speaking Lab' : 'Access Teacher Portal'}</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

              <div className="auth-card-footer">
                <p className="auth-help-note">
                  Need help finding your credentials? Ask your school English coordinator.
                </p>
                <Link to="/" className="auth-back-link">← Return to VisionX Homepage</Link>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}