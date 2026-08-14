import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUsers, createUser, deleteUser, toggleUserStatus, resetPassword } from '../services/userService';
import { getClasses } from '../services/classService';
import Loader from '../components/Loader';

const CLASS_GROUPS = {
  'Nursery': 'Early Learners',
  'LKG': 'Early Learners',
  'UKG': 'Early Learners',
  'Class 1': 'Foundation',
  'Class 2': 'Foundation',
  'Class 3': 'Foundation',
  'Class 4': 'Intermediate',
  'Class 5': 'Intermediate',
  'Class 6': 'Intermediate',
  'Class 7': 'Advanced',
  'Class 8': 'Advanced',
  'Class 9': 'Advanced',
  'Class 10': 'Advanced'
};

export default function Admin() {
  const { user } = useAuth();

  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Create form state
  const [formData, setFormData] = useState({
    name: '',
    loginId: '',
    password: '',
    className: '',
    group: ''
  });

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    disabled: 0
  });

  useEffect(() => {
    fetchUsers();
    fetchClasses();
  }, []);

  const fetchUsers = async (searchTerm = '') => {
    try {
      const data = await getUsers({ search: searchTerm, limit: 100 });
      setUsers(data.users);
      setStats({
        total: data.pagination.total,
        active: data.users.filter(u => u.isActive).length,
        disabled: data.users.filter(u => !u.isActive).length
      });
    } catch (err) {
      setError(err.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      const data = await getClasses();
      setClasses(data.classes);
    } catch (err) {
      console.error('Failed to load classes:', err);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length >= 2 || value.length === 0) {
      fetchUsers(value);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      ...(name === 'className' ? { group: CLASS_GROUPS[value] || '' } : {})
    });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setMessage(null);
    setError(null);

    try {
      await createUser(formData);
      setMessage(`Account created successfully for ${formData.name}!`);
      setFormData({
        name: '',
        loginId: '',
        password: '',
        className: '',
        group: ''
      });
      setShowCreate(false);
      fetchUsers(search);
    } catch (err) {
      setError(err.message || 'Failed to create user');
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleStatus = async (userId, userName) => {
    setActionLoading(true);
    setMessage(null);
    setError(null);

    try {
      const data = await toggleUserStatus(userId);
      setMessage(data.message);
      fetchUsers(search);
    } catch (err) {
      setError(err.message || 'Failed to update user status');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete ${userName}? This cannot be undone.`)) {
      return;
    }

    setActionLoading(true);
    setMessage(null);
    setError(null);

    try {
      const data = await deleteUser(userId);
      setMessage(data.message);
      fetchUsers(search);
    } catch (err) {
      setError(err.message || 'Failed to delete user');
    } finally {
      setActionLoading(false);
    }
  };

  const handleResetPassword = async (userId, userName) => {
    const newPassword = window.prompt(`Enter new password for ${userName} (min 6 characters):`);
    if (!newPassword) return;

    setActionLoading(true);
    setMessage(null);
    setError(null);

    try {
      const data = await resetPassword(userId, newPassword);
      setMessage(data.message);
    } catch (err) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <Loader text="Loading admin dashboard... ⚙️" />;
  }

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1 className="page-title">Admin Dashboard ⚙️</h1>
        <p className="page-subtitle">Welcome back, {user.name}!</p>
      </div>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      {/* Stats Cards */}
      <section className="admin-stats">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">👥</div>
          <div className="admin-stat-info">
            <strong>{stats.total}</strong>
            <span>Total Users</span>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon">✅</div>
          <div className="admin-stat-info">
            <strong>{stats.active}</strong>
            <span>Active Users</span>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon">🚫</div>
          <div className="admin-stat-info">
            <strong>{stats.disabled}</strong>
            <span>Disabled Users</span>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon">📚</div>
          <div className="admin-stat-info">
            <strong>{classes.length}</strong>
            <span>Classes</span>
          </div>
        </div>
      </section>

      {/* User Management */}
      <section className="admin-section">
        <div className="admin-section-header">
          <h2 className="section-heading">User Management</h2>
          <button className="btn btn-primary" onClick={() => setShowCreate(!showCreate)}>
            {showCreate ? 'Cancel' : '+ Create Student'}
          </button>
        </div>

        {/* Create User Form */}
        {showCreate && (
          <div className="create-user-form">
            <h3>Create Student Account</h3>
            <form onSubmit={handleCreateUser}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="create-name">Student Name</label>
                  <input
                    id="create-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="e.g. Rahul Kumar"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="create-login">Login ID</label>
                  <input
                    id="create-login"
                    type="text"
                    name="loginId"
                    value={formData.loginId}
                    onChange={handleFormChange}
                    placeholder="e.g. RAHUL001"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="create-password">Password</label>
                  <input
                    id="create-password"
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    placeholder="Min 6 characters"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="create-class">Class</label>
                  <select
                    id="create-class"
                    name="className"
                    value={formData.className}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Select class...</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.name}>
                        {cls.name} — {cls.group}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Age Group</label>
                <input
                  type="text"
                  value={formData.group}
                  placeholder="Auto-filled from class"
                  disabled
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={actionLoading}>
                {actionLoading ? 'Creating...' : 'Create Account'}
              </button>
            </form>
          </div>
        )}

        {/* Search */}
        <div className="admin-search">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="🔍 Search by name, login ID, or class..."
            className="search-input"
          />
        </div>

        {/* Users Table */}
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Login ID</th>
                <th>Class</th>
                <th>Group</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="table-empty">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u._id} className={!u.isActive ? 'row-disabled' : ''}>
                    <td>
                      <div className="user-cell">
                        <span className="user-avatar">{u.name?.charAt(0) || 'U'}</span>
                        <div>
                          <strong>{u.name}</strong>
                          {u.role === 'ADMIN' && <span className="admin-badge">Admin</span>}
                        </div>
                      </div>
                    </td>
                    <td className="mono-text">{u.loginId}</td>
                    <td>{u.className || '—'}</td>
                    <td>{u.group || '—'}</td>
                    <td>
                      <span className={`status-badge ${u.isActive ? 'status-active' : 'status-disabled'}`}>
                        {u.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        {u.role !== 'ADMIN' && (
                          <>
                            <button
                              className="btn btn-small btn-outline"
                              onClick={() => handleToggleStatus(u._id, u.name)}
                              disabled={actionLoading}
                            >
                              {u.isActive ? 'Disable' : 'Enable'}
                            </button>
                            <button
                              className="btn btn-small btn-outline"
                              onClick={() => handleResetPassword(u._id, u.name)}
                              disabled={actionLoading}
                            >
                              Reset PW
                            </button>
                            <button
                              className="btn btn-small btn-danger"
                              onClick={() => handleDeleteUser(u._id, u.name)}
                              disabled={actionLoading}
                            >
                              Delete
                            </button>
                          </>
                        )}
                        {u.role === 'ADMIN' && <span className="admin-only">—</span>}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Quick Info */}
      <section className="admin-section">
        <h2 className="section-heading">Quick Guide</h2>
        <div className="quick-guide">
          <div className="guide-item">
            <span className="guide-icon">👤</span>
            <div>
              <strong>Create Students</strong>
              <p>Click "+ Create Student" to generate login credentials for new students.</p>
            </div>
          </div>
          <div className="guide-item">
            <span className="guide-icon">🔍</span>
            <div>
              <strong>Search Users</strong>
              <p>Search by name, login ID, or class to quickly find any student.</p>
            </div>
          </div>
          <div className="guide-item">
            <span className="guide-icon">🔄</span>
            <div>
              <strong>Manage Access</strong>
              <p>Disable or enable accounts, reset passwords, or delete users as needed.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}