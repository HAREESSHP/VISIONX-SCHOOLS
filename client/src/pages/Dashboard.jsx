import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getClasses, getClassLessons } from '../services/classService';
import { getUserSummary } from '../services/progressService';
import Loader from '../components/Loader';
import TiltCard from '../components/TiltCard';
import Dashboard3DVisual from '../components/Dashboard3DVisual';
import { 
  Flame, Star, Award, ArrowRight, Play, Compass, 
  CheckCircle, BookOpen, Layers, Sparkles, GraduationCap, 
  Users, CheckCircle2, ChevronRight, Mic, Volume2
} from 'lucide-react';

const GRADE_PILLARS = {
  'Class 1': { badge: 'Grade 01 • Spoken Phonics', desc: 'Foundational speech, alphabet phonetics, daily greetings, and first sight words.' },
  'Class 2': { badge: 'Grade 02 • Sentence Builder', desc: 'Daily routines, action verbs, describing words, and expressive family dialogue.' },
  'Class 3': { badge: 'Grade 03 • Conversationalist', desc: 'Asking inquisitive questions, present tenses, family trees, and expressive storytelling.' },
  'Class 4': { badge: 'Grade 04 • Narrative Communicator', desc: 'Past & future tenses, environmental themes, descriptive paragraphs, and roleplay.' },
  'Class 5': { badge: 'Grade 05 • Intermediate Articulator', desc: 'Paragraph construction, prepositions & conjunctions, public speaking, and critical debate.' },
  'Class 6': { badge: 'Grade 06 • Fluent Conversationalist', desc: 'Modal auxiliaries, formal dialogues, conditional hypotheses, and literary exposition.' },
  'Class 7': { badge: 'Grade 07 • Debate & Rhetoric', desc: 'Active vs passive voice, persuasive speeches, formal debate arguments, and synthesis.' },
  'Class 8': { badge: 'Grade 08 • Critical Orator', desc: 'Reported speech, formal essays, public discourse, nuanced listening, and thematic debate.' },
  'Class 9': { badge: 'Grade 09 • Academic Rhetorician', desc: 'Subjunctive mood, literary critique, panel moderating, and research discourse.' },
  'Class 10': { badge: 'Grade 10 • Global Master Diplomat', desc: 'Executive articulation, interview mastery, complex literary dissection, and competitive oratory.' }
};

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isTeacher = user?.role === 'TEACHER';
  const [allClasses, setAllClasses] = useState([]);
  const [activeClassName, setActiveClassName] = useState(
    isTeacher ? (user?.className || 'Class 1') : (user?.className || 'Class 1')
  );
  
  const [classData, setClassData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lessonsLoading, setLessonsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedAreas, setExpandedAreas] = useState({});

  // 1. Initial Load: Fetch All Classes
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const { classes } = await getClasses();
        // Filter out classes to ensure standard Class 1-10 sequence
        const standardClasses = classes.filter(c => c.name.startsWith('Class ') || ['Nursery', 'LKG', 'UKG'].includes(c.name));
        setAllClasses(standardClasses);

        const targetClassName = isTeacher 
          ? (activeClassName || 'Class 1') 
          : (user?.className || 'Class 1');

        const initialClassObj = standardClasses.find(c => c.name === targetClassName) || standardClasses[0];

        if (initialClassObj) {
          setActiveClassName(initialClassObj.name);
          const lessonsData = await getClassLessons(initialClassObj.id);
          setClassData(lessonsData);
        }

        if (!isTeacher && user?.id) {
          try {
            const summaryData = await getUserSummary(user.id);
            setSummary(summaryData);
          } catch (e) {
            console.error('Failed to load user summary:', e);
          }
        }
      } catch (err) {
        setError(err.message || 'Failed to load curriculum dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [user, isTeacher]);

  // 2. Teacher or Student Class Switch
  const handleSelectClass = async (className) => {
    if (!isTeacher && className !== user?.className) {
      return; // Students are locked to their assigned grade
    }

    setActiveClassName(className);
    setLessonsLoading(true);

    try {
      const classObj = allClasses.find(c => c.name === className);
      if (classObj) {
        const lessonsData = await getClassLessons(classObj.id);
        setClassData(lessonsData);
      }
    } catch (err) {
      console.error('Failed to switch class lessons:', err);
    } finally {
      setLessonsLoading(false);
    }
  };

  const toggleAreaExpand = (areaName) => {
    setExpandedAreas(prev => ({
      ...prev,
      [areaName]: !prev[areaName]
    }));
  };

  if (loading) {
    return <Loader text="Assembling your personalized academic curriculum... 🎒" />;
  }

  if (error && !classData) {
    return (
      <div className="empty-state">
        <div className="empty-icon">😕</div>
        <h2>Unable to load grade resources</h2>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          Reload Portal
        </button>
      </div>
    );
  }

  const currentGradeMeta = GRADE_PILLARS[activeClassName] || {
    badge: `Curriculum • ${activeClassName}`,
    desc: 'Spoken English, Vocabulary, Grammar, Listening Comprehension, and Reading Stories.'
  };

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
      
      {/* ===== TEACHER COMMAND BAR (Only for Teachers) ===== */}
      {isTeacher && (
        <motion.div 
          className="teacher-command-hub"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="teacher-hub-header">
            <div className="teacher-hub-title">
              <div className="teacher-badge-icon">
                <GraduationCap size={20} />
              </div>
              <div>
                <h3 className="teacher-hub-heading">Teacher Command Center</h3>
                <p className="teacher-hub-sub">Select any grade (Class 1 to Class 10) to inspect and teach its dedicated curriculum</p>
              </div>
            </div>
            <div className="teacher-active-pill">
              <span>Active Classroom: </span>
              <strong>{activeClassName}</strong>
            </div>
          </div>

          <div className="teacher-class-scroll-bar">
            {allClasses.map((cls) => {
              const isSelected = cls.name === activeClassName;
              return (
                <button
                  key={cls.name}
                  type="button"
                  className={`teacher-class-tab-btn ${isSelected ? 'active-tab' : ''}`}
                  onClick={() => handleSelectClass(cls.name)}
                >
                  <span className="tab-grade-num">{cls.name.replace('Class ', 'C-')}</span>
                  <span className="tab-grade-label">{cls.name}</span>
                  {isSelected && <span className="tab-active-dot" />}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* ===== 1. Hero & Header Section ===== */}
      <section className="dashboard-hero-header">
        <motion.div 
          className="dashboard-welcome-info"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="dashboard-class-badge">
            <Sparkles size={16} />
            <span>{currentGradeMeta.badge}</span>
          </div>

          <h1 className="dashboard-title">
            {isTeacher 
              ? `Curriculum Portal: ${activeClassName}`
              : `Welcome back, ${user.name?.split(' ')[0]}! 👋`}
          </h1>

          <p className="dashboard-subtitle">
            {currentGradeMeta.desc}
          </p>

          {!isTeacher && (
            <div className="student-locked-tag">
              <CheckCircle2 size={15} />
              <span>Assigned Grade: <strong>{user?.className || activeClassName}</strong> (Exclusive Access)</span>
            </div>
          )}
        </motion.div>

        {!isTeacher && (
          <div className="dashboard-3d-header-crest">
            <Dashboard3DVisual 
              streak={summary?.summary?.streak || user.streak || 0} 
              xp={summary?.summary?.totalXp || user.xp || 0} 
            />
          </div>
        )}

        {!isTeacher && (
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
        )}

        {isTeacher && (
          <motion.div 
            className="dashboard-stats-row"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <TiltCard maxAngle={10} scale={1.04} borderRadius="20px" className="dashboard-stat-chip">
              <div className="stat-icon-wrapper streak-bg">
                <BookOpen size={24} />
              </div>
              <div>
                <strong className="stat-value">{classData?.areas?.length || 5}</strong>
                <span className="stat-label">Learning Strands</span>
              </div>
            </TiltCard>

            <TiltCard maxAngle={10} scale={1.04} borderRadius="20px" className="dashboard-stat-chip">
              <div className="stat-icon-wrapper xp-bg">
                <Award size={24} />
              </div>
              <div>
                <strong className="stat-value">
                  {classData?.areas?.reduce((acc, a) => acc + (a.lessons?.length || 0), 0) || 0}
                </strong>
                <span className="stat-label">Active Modules</span>
              </div>
            </TiltCard>
          </motion.div>
        )}
      </section>

      {/* ===== 2. Continue Learning Spotlight Card (For Students) ===== */}
      {!isTeacher && continueLesson && (
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
                <span>Next Milestone • {activeClassName}</span>
              </div>
              <h2 className="continue-heading">{continueLesson.title}</h2>
              <p className="continue-subinfo">Area: {continueLesson.area} • Estimated time: {continueLesson.duration || '10 mins'}</p>
            </div>

            <Link to={`/lesson/${continueLesson._id}`} className="continue-play-btn">
              <span>Launch Lesson</span>
              <div className="play-icon-circle">
                <Play size={18} fill="currentColor" />
              </div>
            </Link>
          </TiltCard>
        </motion.section>
      )}

      {/* ===== 3. Skills Progress Section (For Students) ===== */}
      {!isTeacher && (
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
      )}

      {/* ===== 4. Explore Grade Curriculum & Modules ===== */}
      <section className="learning-areas-section">
        <div className="section-title-row">
          <div>
            <h2 className="dashboard-section-heading">
              {activeClassName} Curriculum & Resources
            </h2>
            <p style={{ color: 'var(--espresso-light)', margin: '0.2rem 0 0 0', fontSize: '0.95rem' }}>
              Tailored learning strands designed for {activeClassName} mastery.
            </p>
          </div>
          <span className="sub-tag">{classData?.areas?.length || 0} Core Strands</span>
        </div>

        {lessonsLoading ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--espresso-light)' }}>
            <Loader text={`Loading ${activeClassName} modules...`} />
          </div>
        ) : (
          <div className="areas-3d-grid">
            {classData?.areas?.map((area, areaIdx) => {
              const isExpanded = expandedAreas[area.name];
              const visibleLessons = isExpanded ? area.lessons : area.lessons.slice(0, 4);

              return (
                <motion.div
                  key={area.name}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.15 + areaIdx * 0.07 }}
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
                            <small className="lesson-row-time">
                              {lesson.topic ? `${lesson.topic} • ` : ''}{lesson.duration || '8 mins'}
                            </small>
                          </div>
                          <div className="lesson-arrow-pill">
                            <ArrowRight size={16} />
                          </div>
                        </Link>
                      ))}
                    </div>

                    {area.lessons.length > 4 && (
                      <button
                        className="area-expand-btn"
                        onClick={() => toggleAreaExpand(area.name)}
                        type="button"
                      >
                        {isExpanded 
                          ? 'Collapse List ▲' 
                          : `View All ${area.lessons.length} Modules (${area.lessons.length - 4} more) ▼`}
                      </button>
                    )}
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}