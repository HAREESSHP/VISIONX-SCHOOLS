import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getUserProgress } from '../services/progressService';
import { getClasses } from '../services/classService';
import { updateUserClass } from '../services/authService';
import Loader from '../components/Loader';
import TiltCard from '../components/TiltCard';
import { User, Flame, Star, CheckCircle, Clock, BookOpen, Sparkles, ShieldCheck } from 'lucide-react';

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
      setMessage(`Class successfully switched to ${className}!`);
    } catch (err) {
      setError(err.message || 'Failed to update class');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader text="Loading your learner profile... 👤" />;
  }

  const skillLevels = progressData?.skillLevels || {};
  const completedLessons = progressData?.progress?.filter(p => p.status === 'completed') || [];
  const inProgressLessons = progressData?.progress?.filter(p => p.status === 'started') || [];

  const skillsDisplay = [
    { name: 'Spoken English', icon: '🗣️', key: 'Spoken English', color: 'var(--terracotta)' },
    { name: 'Vocabulary', icon: '📚', key: 'Vocabulary', color: 'var(--espresso)' },
    { name: 'Grammar', icon: '✍️', key: 'Grammar', color: 'var(--sage-green)' },
    { name: 'Listening', icon: '🎧', key: 'Listening', color: 'var(--golden-tan)' },
    { name: 'Reading', icon: '📖', key: 'Reading', color: '#4F46E5' }
  ];

  return (
    <div className="profile-page-wrapper">
      {/* Header */}
      <div className="page-header-center">
        <div className="class-select-badge">
          <User size={16} />
          <span>Learner Dossier</span>
        </div>
        <h1 className="page-title mt-2">Student Profile 👤</h1>
        <p className="page-subtitle">Track your achievements, skill competencies, and lesson history.</p>
      </div>

      {message && (
        <motion.div 
          className="alert alert-success max-w-md mx-auto mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {message}
        </motion.div>
      )}
      {error && (
        <motion.div 
          className="alert alert-error max-w-md mx-auto mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}

      {/* Main Profile Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <TiltCard maxAngle={5} scale={1.01} borderRadius="26px" className="profile-hero-card-3d">
          <div className="profile-hero-inner">
            <div className="profile-avatar-giant">
              {user.name?.charAt(0) || 'U'}
            </div>

            <div className="profile-hero-meta">
              <h2 className="profile-hero-name">{user.name}</h2>
              <div className="profile-tag-list">
                <span className="profile-pill-tag">🆔 {user.loginId}</span>
                <span className="profile-pill-tag">🏫 {user.className || 'Unassigned Grade'}</span>
                <span className="profile-pill-tag">🎯 {user.group || 'General'}</span>
              </div>
            </div>

            <div className="profile-stats-quad">
              <div className="quad-stat-item">
                <Flame size={20} className="text-terracotta" />
                <strong>{user.streak || 0}</strong>
                <span>Day Streak</span>
              </div>
              <div className="quad-stat-item">
                <Star size={20} className="text-gold" />
                <strong>{user.xp || 0}</strong>
                <span>XP Earned</span>
              </div>
              <div className="quad-stat-item">
                <CheckCircle size={20} className="text-sage" />
                <strong>{completedLessons.length}</strong>
                <span>Mastered</span>
              </div>
              <div className="quad-stat-item">
                <Clock size={20} className="text-espresso" />
                <strong>{inProgressLessons.length}</strong>
                <span>In Progress</span>
              </div>
            </div>
          </div>
        </TiltCard>
      </motion.div>

      {/* Grade Switcher Section */}
      <section className="profile-block-section">
        <TiltCard maxAngle={4} scale={1.01} borderRadius="20px" className="profile-action-card">
          <div className="block-header-row">
            <BookOpen size={20} className="text-terracotta" />
            <div>
              <h3 className="block-card-title">Adjust Assigned Grade</h3>
              <p className="block-card-subtitle">Select your active classroom level to switch syllabus tracks.</p>
            </div>
          </div>

          <div className="change-class-row mt-3">
            <select
              className="form-select profile-class-dropdown"
              value={user.className || ''}
              onChange={handleClassChange}
              disabled={saving}
            >
              <option value="">Choose a class...</option>
              {classesData?.classes?.map((cls) => (
                <option key={cls.id} value={cls.name}>
                  {cls.name} — {cls.group} (Ages {cls.minAge}-{cls.maxAge})
                </option>
              ))}
            </select>
            {saving && <span className="saving-text">Updating...</span>}
          </div>
        </TiltCard>
      </section>

      {/* Skill Levels Breakdown */}
      <section className="profile-block-section">
        <h3 className="profile-section-title">Verified Skill Proficiency</h3>
        <div className="profile-skills-grid">
          {skillsDisplay.map((skill) => {
            const pct = skillLevels[skill.key]?.percentage || 0;
            return (
              <TiltCard key={skill.key} maxAngle={8} scale={1.03} borderRadius="20px" className="skill-level-card">
                <div className="skill-level-top">
                  <span className="skill-level-emoji">{skill.icon}</span>
                  <span className="skill-level-pct">{pct}%</span>
                </div>
                <strong className="skill-level-name">{skill.name}</strong>
                <div className="skill-3d-track mt-2">
                  <div
                    className="skill-3d-fill"
                    style={{ width: `${pct}%`, background: skill.color }}
                  />
                </div>
              </TiltCard>
            );
          })}
        </div>
      </section>

      {/* Completed History */}
      <section className="profile-block-section">
        <h3 className="profile-section-title">Completed Modules</h3>
        {completedLessons.length === 0 ? (
          <TiltCard maxAngle={4} scale={1.01} borderRadius="20px" className="empty-history-card">
            <p>No modules completed yet. Explore your learning dashboard to begin!</p>
            <Link to="/dashboard" className="btn btn-primary mt-2">Go to Dashboard →</Link>
          </TiltCard>
        ) : (
          <div className="completed-cards-grid">
            {completedLessons.map((p) => (
              <TiltCard key={p._id} maxAngle={6} scale={1.02} borderRadius="16px" className="completed-lesson-card">
                <span className="completed-lesson-icon">{p.lessonId?.icon || '📘'}</span>
                <div className="completed-lesson-meta">
                  <strong>{p.lessonId?.title || 'Lesson'}</strong>
                  <small>{p.area} • Score: {p.score}%</small>
                </div>
                <span className="completed-status-pill">✓ Done</span>
              </TiltCard>
            ))}
          </div>
        )}
      </section>

      {/* Account Info Card */}
      <section className="profile-block-section">
        <h3 className="profile-section-title">Security & Account Summary</h3>
        <TiltCard maxAngle={4} scale={1.01} borderRadius="20px" className="account-summary-card">
          <div className="summary-row">
            <span>Account Role:</span>
            <strong>{user.role === 'ADMIN' ? 'Authorized Administrator' : 'Enrolled Student'}</strong>
          </div>
          <div className="summary-row">
            <span>Student Login ID:</span>
            <strong>{user.loginId}</strong>
          </div>
          <div className="summary-row">
            <span>Registration Date:</span>
            <strong>{new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
          </div>
        </TiltCard>
      </section>
    </div>
  );
}