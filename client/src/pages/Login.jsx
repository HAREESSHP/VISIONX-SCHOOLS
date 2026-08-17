import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Building, Users } from 'lucide-react';

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
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pro-login-layout">
      <div className="pro-login-side presentation-side">
        <div className="presentation-content animate-slide-up">
          <Link to="/" className="presentation-logo-link">
            <img src="/visionx-logo.png" alt="VISIONX Logo" className="presentation-logo" />
            <span className="presentation-brand">VISIONX</span>
          </Link>
          <h2 className="presentation-title">Empowering Next-Generation Education</h2>
          <p className="presentation-subtitle">
            Welcome to the VisionX platform. Access your personalized learning environment and manage your academic progress with advanced tools.
          </p>
          <div className="presentation-features">
            <div className="pro-feature">
              <div className="pro-feature-icon">✨</div>
              <span>Interactive Learning</span>
            </div>
            <div className="pro-feature">
              <div className="pro-feature-icon">📊</div>
              <span>Real-time Progress</span>
            </div>
          </div>
        </div>
        <div className="presentation-overlay"></div>
      </div>

      <div className="pro-login-side form-side">
        <div className="pro-login-card animate-fade-in">
          <div className="pro-login-header">
            <h1 className="pro-login-title">
              {activeTab === 'student' ? 'Student Portal' : 'Educator Portal'}
            </h1>
            <p className="pro-login-subtitle">
              Please enter your credentials to proceed
            </p>
          </div>

          <div className="pro-login-tabs-container">
            <div className="pro-login-tabs">
              <button 
                className={`pro-login-tab ${activeTab === 'student' ? 'active' : ''}`}
                onClick={() => setActiveTab('student')}
                type="button"
              >
                <Users size={18} />
                Student
              </button>
              <button 
                className={`pro-login-tab ${activeTab === 'teacher' ? 'active' : ''}`}
                onClick={() => setActiveTab('teacher')}
                type="button"
              >
                <Building size={18} />
                Teacher
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="pro-login-form">
            <div className="pro-form-group">
              <label htmlFor="loginId">Identifier</label>
              <div className="pro-input-wrapper">
                <input
                  id="loginId"
                  type="text"
                  name="loginId"
                  value={formData.loginId}
                  onChange={handleChange}
                  placeholder={activeTab === 'student' ? "e.g., vx-1234" : "e.g., vx-t987"}
                  autoComplete="username"
                  required
                  className="pro-input"
                />
              </div>
            </div>

            <div className="pro-form-group">
              <label htmlFor="password">Security Key</label>
              <div className="pro-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="pro-input"
                />
                <button 
                  type="button" 
                  className="pro-input-icon-right" 
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="pro-btn-submit"
              disabled={loading}
            >
              {loading ? 'Authenticating...' : 'Secure Sign In'}
            </button>
          </form>

          <div className="pro-login-footer">
            <Link to="/" className="pro-back-link">← Return to Homepage</Link>
          </div>
        </div>
      </div>
    </div>
  );
}