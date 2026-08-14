import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getClasses, getClassLessons } from '../services/classService';
import { getUserSummary } from '../services/progressService';
import Loader from '../components/Loader';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [classData, setClassData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // Get all classes to find current user's class
        const { classes } = await getClasses();
        const userClass = classes.find(c => c.name === user?.className);

        if (!userClass) {
          setError('Please select your class first.');
          navigate('/class-selection');
          return;
        }

        // Get lessons for the class
        const lessonsData = await getClassLessons(userClass.id);
        setClassData(lessonsData);

        // Get user summary
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

  if (loading) {
    return <Loader text="Loading your dashboard... 🚀" />;
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
    { name: 'Speaking', key: 'Spoken English', icon: '🗣', total: 2 },
    { name: 'Reading', key: 'Reading', icon: '📖', total: 1 },
    { name: 'Listening', key: 'Listening', icon: '🎧', total: 1 },
    { name: 'Grammar', key: 'Grammar', icon: '✍', total: 2 }
  ];

  const continueLesson = classData?.areas?.[0]?.lessons?.[0];

  return (
    <div className="dashboard-page">
      {/* Welcome Section */}
      <section className="welcome-section">
        <div>
          <h1 className="page-title">Hi {user.name?.split(' ')[0]}! 👋</h1>
          <p className="page-subtitle">
            Ready to improve your English? You're learning <strong>{user.className}</strong>!
          </p>
        </div>
        <div className="stats-badges">
          <div className="stat-badge">
            <span className="stat-badge-icon">🔥</span>
            <div>
              <strong>{summary?.summary?.streak || user.streak || 0}</strong>
              <small>Day Streak</small>
            </div>
          </div>
          <div className="stat-badge">
            <span className="stat-badge-icon">⭐</span>
            <div>
              <strong>{summary?.summary?.totalXp || user.xp || 0}</strong>
              <small>XP</small>
            </div>
          </div>
        </div>
      </section>

      {/* Continue Learning */}
      {continueLesson && (
        <section className="continue-learning">
          <div className="continue-card">
            <div className="continue-icon">{continueLesson.icon}</div>
            <div className="continue-info">
              <span className="continue-label">Continue Learning</span>
              <h2>{continueLesson.area}</h2>
              <p>"{continueLesson.title}"</p>
            </div>
            <Link to={`/lesson/${continueLesson._id}`} className="btn btn-primary">
              Continue →
            </Link>
          </div>
        </section>
      )}

      {/* Skills Section */}
      <section className="skills-section">
        <h2 className="section-heading">Your English Skills</h2>
        <div className="skills-grid">
          {skillsDisplay.map((skill) => {
            const pct = skillPercentages[skill.key] || 0;
            return (
              <div key={skill.key} className="skill-card">
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

      {/* Today's Challenge */}
      <section className="challenge-section">
        <div className="challenge-card">
          <div className="challenge-title">Today's Challenge 🎯</div>
          <p className="challenge-text">{continueLesson ? `Speak about "${continueLesson.title}"` : 'Complete your first lesson to start earning XP!'}</p>
          {continueLesson && (
            <Link to={`/lesson/${continueLesson._id}`} className="btn btn-white">
              Start Challenge
            </Link>
          )}
        </div>
      </section>

      {/* Learning Areas */}
      <section className="areas-section">
        <h2 className="section-heading">Explore Learning Areas</h2>
        <div className="areas-grid">
          {classData?.areas?.map((area) => (
            <div key={area.name} className="area-card">
              <div className="area-card-header">
                <span className="area-icon">{area.icon}</span>
                <h3>{area.name}</h3>
              </div>
              <p className="area-description">{area.description}</p>
              <div className="area-lessons">
                {area.lessons.slice(0, 3).map((lesson) => (
                  <Link
                    to={`/lesson/${lesson._id}`}
                    key={lesson._id}
                    className="area-lesson-item"
                  >
                    <span className="lesson-item-icon">{lesson.icon}</span>
                    <div className="lesson-item-info">
                      <strong>{lesson.title}</strong>
                      <small>{lesson.duration}</small>
                    </div>
                    <span className="lesson-item-arrow">→</span>
                  </Link>
                ))}
              </div>
              {area.lessons.length > 3 && (
                <button
                  className="btn btn-ghost btn-small"
                  onClick={() => {
                    const lessons = document.getElementById(`area-more-${area.name}`);
                    if (lessons) {
                      lessons.style.display = lessons.style.display === 'none' ? 'block' : 'none';
                    }
                  }}
                >
                  Show all {area.lessons.length} lessons ▾
                </button>
              )}
              <div id={`area-more-${area.name}`} className="area-lessons area-lessons-more" style={{ display: 'none' }}>
                {area.lessons.slice(3).map((lesson) => (
                  <Link
                    to={`/lesson/${lesson._id}`}
                    key={lesson._id}
                    className="area-lesson-item"
                  >
                    <span className="lesson-item-icon">{lesson.icon}</span>
                    <div className="lesson-item-info">
                      <strong>{lesson.title}</strong>
                      <small>{lesson.duration}</small>
                    </div>
                    <span className="lesson-item-arrow">→</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}