import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, User, Lock, GraduationCap, BookOpen } from 'lucide-react';

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
    <div className="login-page">
      <div className="login-background">
        <div className="login-blob blob-1"></div>
        <div className="login-blob blob-2"></div>
        <div className="login-blob blob-3"></div>
      </div>

      <div className="login-card glass-panel">
        <div className="login-header">
          <img src="/visionx-logo.png" alt="VISIONX Logo" className="login-logo" />
          <h1 className="login-title animate-slide-up">
            {activeTab === 'student' ? 'Welcome to VisionX' : 'Educator Portal'}
          </h1>
          <p className="login-subtitle animate-slide-up delay-1">
            {activeTab === 'student' 
              ? 'Sign in to access your personalized learning journey.' 
              : 'Sign in to manage your classes and student progress.'}
          </p>
        </div>

        <div className="login-tabs-container animate-slide-up delay-1">
          <div className="login-tabs">
            <button 
              className={`login-tab ${activeTab === 'student' ? 'active' : ''}`}
              onClick={() => setActiveTab('student')}
              type="button"
            >
              Student
            </button>
            <button 
              className={`login-tab ${activeTab === 'teacher' ? 'active' : ''}`}
              onClick={() => setActiveTab('teacher')}
              type="button"
            >
              Teacher
            </button>
            <div className={`login-tab-indicator ${activeTab === 'teacher' ? 'right' : 'left'}`}></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="animate-slide-up delay-2">
          <div className="form-group">
            <label htmlFor="loginId">{activeTab === 'student' ? 'Student ID' : 'Teacher ID'}</label>
            <div className="input-wrapper">
              <input
                id="loginId"
                type="text"
                name="loginId"
                value={formData.loginId}
                onChange={handleChange}
                placeholder={activeTab === 'student' ? "e.g., vx-1234" : "e.g., vx-t987"}
                autoComplete="username"
                required
                className="glass-input no-icon-left"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="glass-input no-icon-left"
              />
              <button 
                type="button" 
                className="input-icon-right" 
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="alert alert-error animate-fade-in">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-block btn-large login-submit-btn"
            disabled={loading}
          >
            {loading ? 'Authenticating...' : (activeTab === 'student' ? 'Access Account' : 'Sign In')}
          </button>
        </form>

        <div className="login-footer animate-slide-up delay-3">
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}