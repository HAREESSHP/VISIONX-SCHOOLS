import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getClasses, getClassLessons } from '../services/classService';
import { getUserSummary } from '../services/progressService';
import Loader from '../components/Loader';
import TiltCard from '../components/TiltCard';
import { Flame, Star, Award, ArrowRight, Play, Compass, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [classData, setClassData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedAreas, setExpandedAreas] = useState({});

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { classes } = await getClasses();
        const userClass = classes.find(c => c.name === user?.className);

        if (!userClass) {
          setError('Please select your class first.');
          navigate('/class-selection');
          return;
        }

        const lessonsData = await getClassLessons(userClass.id);
        setClassData(lessonsData);

        try {
          const summaryData = await getUserSummary(user.id);
          setSummary(summaryData);
        } catch (e) {
          console.error('Failed to load summary:', e);
        }
      } catch (err) {
        setError(err.message || 'Failed to load your dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [user, navigate]);

  const toggleAreaExpand = (areaName) => {
    setExpandedAreas(prev => ({
      ...prev,
      [areaName]: !prev[areaName]
    }));
  };

  if (loading) {
    return <Loader text="Assembling your personalized learning desk... 🚀" />;
  }

  if (error) {
    return (
      <div className="empty-state">
        <div className="empty-icon">😕</div>
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={() => navigate('/class-selection')}>
          Choose Class
        </button>
      </div>
    );
  }

  const skillPercentages = summary?.summary?.skillPercentages || {};
  const skillsDisplay = [
    { name: 'Speaking', key: 'Spoken English', icon: '🗣️', color: 'var(--terracotta)' },
    { name: 'Reading', key: 'Reading', icon: '📖', color: 'var(--espresso)' },
    { name: 'Listening', key: 'Listening', icon: '🎧', color: 'var(--golden-tan)' },
    { name: 'Grammar', key: 'Grammar', icon: '✍️', color: 'var(--sage-green)' }
  ];

  const continueLesson = classData?.areas?.[0]?.lessons?.[0];

  return (
    <div className="student-dashboard-wrapper">
      {/* 1. Welcome & 3D Stats Header */}
      <section className="dashboard-hero-header">
        <motion.div 
          className="dashboard-welcome-info"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="dashboard-class-badge">
            <Compass size={16} />
            <span>Enrolled in {user.className || 'Standard Grade'}</span>
          </div>
          <h1 className="dashboard-title">Welcome back, {user.name?.split(' ')[0]}! 👋</h1>
          <p className="dashboard-subtitle">
            Ready to speak with confidence today? Let's pick up your spoken English milestones.
          </p>
        </motion.div>

        <motion.div 
          className="dashboard-stats-row"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <TiltCard maxAngle={10} scale={1.04} borderRadius="20px" className="dashboard-stat-chip">
            <div className="stat-icon-wrapper streak-bg">
              <Flame size={24} />
            </div>
            <div>
              <strong className="stat-value">{summary?.summary?.streak || user.streak || 0}</strong>
              <span className="stat-label">Day Streak</span>
            </div>
          </TiltCard>

          <TiltCard maxAngle={10} scale={1.04} borderRadius="20px" className="dashboard-stat-chip">
            <div className="stat-icon-wrapper xp-bg">
              <Star size={24} />
            </div>
            <div>
              <strong className="stat-value">{summary?.summary?.totalXp || user.xp || 0}</strong>
              <span className="stat-label">Total XP</span>
            </div>
          </TiltCard>
        </motion.div>
      </section>

      {/* 2. Continue Learning Spotlight Card */}
      {continueLesson && (
        <motion.section 
          className="continue-spotlight-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <TiltCard maxAngle={6} scale={1.01} borderRadius="24px" className="continue-3d-banner">
            <div className="continue-banner-content">
              <div className="continue-tag">
                <span className="live-pulse-dot" />
                <span>Next Milestone</span>
              </div>
              <h2 className="continue-heading">{continueLesson.title}</h2>
              <p className="continue-subinfo">Area: {continueLesson.area} • Estimated time: {continueLesson.duration || '10 mins'}</p>
            </div>

            <Link to={`/lesson/${continueLesson._id}`} className="continue-play-btn">
              <span>Resume Lesson</span>
              <div className="play-icon-circle">
                <Play size={18} fill="currentColor" />
              </div>
            </Link>
          </TiltCard>
        </motion.section>
      )}

      {/* 3. Skills Progress Section (4 3D Cards) */}
      <section className="skills-dashboard-section">
        <div className="section-title-row">
          <h2 className="dashboard-section-heading">Your English Competency Profile</h2>
          <span className="sub-tag">Automated CEFR Evaluation</span>
        </div>

        <div className="skills-3d-grid">
          {skillsDisplay.map((skill, index) => {
            const pct = skillPercentages[skill.key] || 0;
            return (
              <motion.div
                key={skill.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
              >
                <TiltCard maxAngle={8} scale={1.03} borderRadius="20px" className="skill-3d-card">
                  <div className="skill-card-top">
                    <span className="skill-emoji">{skill.icon}</span>
                    <span className="skill-pct-badge">{pct}%</span>
                  </div>
                  <h3 className="skill-title">{skill.name}</h3>
                  <div className="skill-3d-track">
                    <motion.div
                      className="skill-3d-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                      style={{ background: skill.color }}
                    />
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. Explore Learning Modules */}
      <section className="learning-areas-section">
        <div className="section-title-row">
          <h2 className="dashboard-section-heading">Grade Curriculum & Modules</h2>
          <span className="sub-tag">{classData?.areas?.length || 0} Core Strands</span>
        </div>

        <div className="areas-3d-grid">
          {classData?.areas?.map((area, areaIdx) => {
            const isExpanded = expandedAreas[area.name];
            const visibleLessons = isExpanded ? area.lessons : area.lessons.slice(0, 3);

            return (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 + areaIdx * 0.08 }}
              >
                <TiltCard maxAngle={6} scale={1.02} borderRadius="24px" className="area-3d-card">
                  <div className="area-header-block">
                    <div className="area-icon-badge">{area.icon || '📚'}</div>
                    <div>
                      <h3 className="area-name-text">{area.name}</h3>
                      <p className="area-desc-text">{area.description}</p>
                    </div>
                  </div>

                  <div className="area-lessons-list">
                    {visibleLessons.map((lesson) => (
                      <Link
                        to={`/lesson/${lesson._id}`}
                        key={lesson._id}
                        className="area-lesson-row-3d"
                      >
                        <span className="lesson-badge-emoji">{lesson.icon || '📝'}</span>
                        <div className="lesson-row-meta">
                          <strong className="lesson-row-title">{lesson.title}</strong>
                          <small className="lesson-row-time">{lesson.duration || '8 mins'}</small>
                        </div>
                        <div className="lesson-arrow-pill">
                          <ArrowRight size={16} />
                        </div>
                      </Link>
                    ))}
                  </div>

                  {area.lessons.length > 3 && (
                    <button
                      className="area-expand-btn"
                      onClick={() => toggleAreaExpand(area.name)}
                      type="button"
                    >
                      {isExpanded ? 'Collapse List ▲' : `View All ${area.lessons.length} Lessons (${area.lessons.length - 3} more) ▼`}
                    </button>
                  )}
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}