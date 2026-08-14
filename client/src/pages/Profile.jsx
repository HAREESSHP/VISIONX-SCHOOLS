import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserProgress } from '../services/progressService';
import { getClasses } from '../services/classService';
import { updateUserClass } from '../services/authService';
import Loader from '../components/Loader';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [progressData, setProgressData] = useState(null);
  const [classesData, setClassesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const [progress, classes] = await Promise.all([
          getUserProgress(user.id),
          getClasses()
        ]);
        setProgressData(progress);
        setClassesData(classes);
      } catch (err) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user.id]);

  const handleClassChange = async (e) => {
    const className = e.target.value;
    if (!className) return;

    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      const cls = classesData.classes.find(c => c.name === className);
      const data = await updateUserClass(className, cls?.group);
      updateUser(data.user);
      setMessage(`Class updated to ${className}!`);
    } catch (err) {
      setError(err.message || 'Failed to update class');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader text="Loading profile... 👤" />;
  }

  const skillLevels = progressData?.skillLevels || {};
  const completedLessons = progressData?.progress?.filter(p => p.status === 'completed') || [];
  const inProgressLessons = progressData?.progress?.filter(p => p.status === 'started') || [];

  const skillsDisplay = [
    { name: 'Spoken English', icon: '🗣', key: 'Spoken English' },
    { name: 'Vocabulary', icon: '📚', key: 'Vocabulary' },
    { name: 'Grammar', icon: '✍', key: 'Grammar' },
    { name: 'Listening', icon: '🎧', key: 'Listening' },
    { name: 'Reading', icon: '📖', key: 'Reading' }
  ];

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1 className="page-title">My Profile 👤</h1>
        <p className="page-subtitle">Track your learning journey</p>
      </div>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      {/* Profile Card */}
      <section className="profile-card-section">
        <div className="profile-card">
          <div className="profile-avatar-large">
            {user.name?.charAt(0) || 'U'}
          </div>
          <div className="profile-info">
            <h2>{user.name}</h2>
            <div className="profile-meta">
              <span className="profile-meta-item">🆔 {user.loginId}</span>
              <span className="profile-meta-item">📚 {user.className || 'No class selected'}</span>
              <span className="profile-meta-item">🎯 {user.group || '—'}</span>
            </div>
            <div className="profile-stats">
              <div className="profile-stat">
                <span className="profile-stat-icon">🔥</span>
                <strong>{user.streak || 0}</strong>
                <small>Day Streak</small>
              </div>
              <div className="profile-stat">
                <span className="profile-stat-icon">⭐</span>
                <strong>{user.xp || 0}</strong>
                <small>Total XP</small>
              </div>
              <div className="profile-stat">
                <span className="profile-stat-icon">✅</span>
                <strong>{completedLessons.length}</strong>
                <small>Completed</small>
              </div>
              <div className="profile-stat">
                <span className="profile-stat-icon">🔄</span>
                <strong>{inProgressLessons.length}</strong>
                <small>In Progress</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Change Class */}
      <section className="profile-section">
        <h2 className="section-heading">Change Class</h2>
        <div className="change-class-card">
          <p>Select your class to update your learning level:</p>
          <select
            className="form-select"
            value={user.className || ''}
            onChange={handleClassChange}
            disabled={saving}
          >
            <option value="">Select your class...</option>
            {classesData?.classes?.map((cls) => (
              <option key={cls.id} value={cls.name}>
                {cls.name} — {cls.group}
              </option>
            ))}
          </select>
          {saving && <p className="saving-text">Saving...</p>}
        </div>
      </section>

      {/* Skills */}
      <section className="profile-section">
        <h2 className="section-heading">Skill Levels</h2>
        <div className="profile-skills">
          {skillsDisplay.map((skill) => {
            const pct = skillLevels[skill.key]?.percentage || 0;
            return (
              <div key={skill.key} className="profile-skill">
                <div className="skill-header">
                  <span className="skill-icon">{skill.icon}</span>
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{pct}%</span>
                </div>
                <div className="skill-bar">
                  <div
                    className={`skill-bar-fill ${pct >= 70 ? 'fill-green' : pct >= 40 ? 'fill-yellow' : 'fill-red'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Completed Lessons */}
      <section className="profile-section">
        <h2 className="section-heading">Completed Lessons</h2>
        {completedLessons.length === 0 ? (
          <div className="empty-mini">
            <p>No lessons completed yet. Start learning today!</p>
            <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
          </div>
        ) : (
          <div className="completed-lessons-list">
            {completedLessons.map((p) => (
              <div key={p._id} className="completed-lesson-item">
                <span className="lesson-item-icon">{p.lessonId?.icon || '📘'}</span>
                <div className="lesson-item-info">
                  <strong>{p.lessonId?.title || 'Lesson'}</strong>
                  <small>{p.area} • Score: {p.score}%</small>
                </div>
                <span className="completed-badge">✓ Completed</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* In Progress Lessons */}
      {inProgressLessons.length > 0 && (
        <section className="profile-section">
          <h2 className="section-heading">In Progress</h2>
          <div className="completed-lessons-list">
            {inProgressLessons.map((p) => (
              <div key={p._id} className="completed-lesson-item">
                <span className="lesson-item-icon">{p.lessonId?.icon || '📘'}</span>
                <div className="lesson-item-info">
                  <strong>{p.lessonId?.title || 'Lesson'}</strong>
                  <small>{p.area}</small>
                </div>
                <Link to={`/lesson/${p.lessonId?._id}`} className="btn btn-small btn-primary">
                  Continue
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Account Info */}
      <section className="profile-section">
        <h2 className="section-heading">Account Information</h2>
        <div className="account-info-card">
          <div className="account-info-row">
            <span>Account Type</span>
            <strong>{user.role === 'ADMIN' ? 'Administrator' : 'Student'}</strong>
          </div>
          <div className="account-info-row">
            <span>Login ID</span>
            <strong>{user.loginId}</strong>
          </div>
          <div className="account-info-row">
            <span>Member Since</span>
            <strong>{new Date(user.createdAt || Date.now()).toLocaleDateString()}</strong>
          </div>
        </div>
      </section>
    </div>
  );
}