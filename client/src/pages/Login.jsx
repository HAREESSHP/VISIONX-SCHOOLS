import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, adminLogin, user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    loginId: '',
    password: ''
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
      if (isAdmin) {
        const adminUser = await adminLogin(formData.loginId, formData.password);
        navigate('/admin');
      } else {
        const loggedInUser = await login(formData.loginId, formData.password);
        if (loggedInUser.className) {
          navigate('/dashboard');
        } else {
          navigate('/class-selection');
        }
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

      <div className="login-card">
        <div className="login-header">
          <img src="/visionx-logo.png" alt="VISIONX Logo" className="login-logo" />
          <h1 className="login-title">Welcome! 👋</h1>
          <p className="login-subtitle">
            {isAdmin ? 'Admin Login' : 'Enter your Login ID to start learning'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="loginId">Login ID</label>
            <input
              id="loginId"
              type="text"
              name="loginId"
              value={formData.loginId}
              onChange={handleChange}
              placeholder="Enter your Login ID"
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-block btn-large"
            disabled={loading}
          >
            {loading ? 'Logging in...' : isAdmin ? 'Login as Admin' : 'Start Learning 🚀'}
          </button>
        </form>

        <div className="login-divider">
          <span>or</span>
        </div>

        <button
          className="btn btn-ghost btn-block"
          onClick={() => {
            setIsAdmin(!isAdmin);
            setError(null);
            setFormData({ loginId: '', password: '' });
          }}
        >
          {isAdmin ? '← Back to Student Login' : 'Admin Login'}
        </button>

        <div className="login-footer">
          <Link to="/">← Back to Home</Link>
          {!isAdmin && (
            <div className="demo-accounts">
              <small>Demo: RAHUL001 / student123</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}