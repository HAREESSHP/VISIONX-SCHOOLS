import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getClasses, getClassLessons } from '../services/classService';
import Loader from '../components/Loader';
import { 
  GraduationCap, BookOpen, Mic, FileText, Sparkles, 
  Lock, CheckCircle2, ArrowRight, Shield, Layers, 
  Volume2, Compass, Award, AlertTriangle, ChevronRight, Grid
} from 'lucide-react';

const CLASS_METADATA = {
  'Class 1': {
    number: 1,
    slug: 'class-1',
    icon: '🌱',
    level: 'Foundational Phonics & Spoken English',
    ageRange: 'Ages 5 – 6',
    desc: 'Foundational phonetics, daily greetings, naming words, and interactive spoken prompts.'
  },
  'Class 2': {
    number: 2,
    slug: 'class-2',
    icon: '🌿',
    level: 'Sentence Builder & Vocabulary',
    ageRange: 'Ages 6 – 7',
    desc: 'Daily routines, descriptive words, motion action verbs, and expressive conversational dialogue.'
  },
  'Class 3': {
    number: 3,
    slug: 'class-3',
    icon: '🌸',
    level: 'Conversational English & Grammar',
    ageRange: 'Ages 7 – 8',
    desc: 'Inquisitive question forms (5 Ws & 1 H), present tenses, and expressive community stories.'
  },
  'Class 4': {
    number: 4,
    slug: 'class-4',
    icon: '🍀',
    level: 'Narrative & Functional Communication',
    ageRange: 'Ages 8 – 9',
    desc: 'Past and future narrative tenses, environmental ecosystems, and roleplaying scenarios.'
  },
  'Class 5': {
    number: 5,
    slug: 'class-5',
    icon: '🚀',
    level: 'Intermediate Articulation & Discourse',
    ageRange: 'Ages 9 – 10',
    desc: 'Impromptu speeches, complex prepositions, connective conjunctions, and science comprehension.'
  },
  'Class 6': {
    number: 6,
    slug: 'class-6',
    icon: '⚡',
    level: 'Fluent Conversationalist & Idioms',
    ageRange: 'Ages 10 – 11',
    desc: 'Group discussions, conversational turn-taking, idioms, and situational conditionals.'
  },
  'Class 7': {
    number: 7,
    slug: 'class-7',
    icon: '🏆',
    level: 'Debate, Rhetoric & Synthesis',
    ageRange: 'Ages 11 – 12',
    desc: 'Persuasive speeches (Ethos/Pathos/Logos), tier-2 academic lexicon, and active/passive syntax.'
  },
  'Class 8': {
    number: 8,
    slug: 'class-8',
    icon: '🏛️',
    level: 'Critical Oratory & Analysis',
    ageRange: 'Ages 12 – 13',
    desc: 'Model UN addresses, reported speech backshifting, and critical reading analysis.'
  },
  'Class 9': {
    number: 9,
    slug: 'class-9',
    icon: '👑',
    level: 'Advanced Academic Rhetoric',
    ageRange: 'Ages 13 – 14',
    desc: 'Panel moderating, grammatical inversion, subjunctive mood, and analytical prose.'
  },
  'Class 10': {
    number: 10,
    slug: 'class-10',
    icon: '🎓',
    level: 'Global Diplomat & Executive Articulation',
    ageRange: 'Ages 14 – 16',
    desc: 'Executive STAR-method interviews, diplomatic & legal lexicon, and rhetorical cadence.'
  }
};

const ALL_CLASSES = Object.keys(CLASS_METADATA);

export default function ClassPortal() {
  const { grade } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Normalize grade param (e.g. "1", "class-1", "Class 1")
  const normalizeGrade = (input) => {
    if (!input) return user?.className || 'Class 1';
    const clean = input.replace('class-', '').replace('Class ', '').trim();
    if (!isNaN(clean) && parseInt(clean) >= 1 && parseInt(clean) <= 10) {
      return `Class ${clean}`;
    }
    return input.startsWith('Class ') ? input : `Class ${input}`;
  };

  const currentClass = normalizeGrade(grade);
  const isTeacher = user?.role === 'TEACHER';
  const isStudent = user?.role === 'STUDENT';

  const [activeAreaTab, setActiveAreaTab] = useState('All');
  const [classesList, setClassesList] = useState([]);
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accessDeniedMessage, setAccessDeniedMessage] = useState(null);
  const [showAllClassesGrid, setShowAllClassesGrid] = useState(false);

  // 1. Strict Student Access Enforcement
  useEffect(() => {
    if (isStudent && user?.className) {
      if (currentClass !== user.className) {
        const studentSlug = user.className.toLowerCase().replace(' ', '-');
        setAccessDeniedMessage(
          `🔒 Access Restricted: You are enrolled in ${user.className}. You can only access ${user.className} resources.`
        );
        const timer = setTimeout(() => {
          navigate(`/class/${studentSlug}`, { replace: true });
        }, 1800);
        return () => clearTimeout(timer);
      } else {
        setAccessDeniedMessage(null);
      }
    }
  }, [currentClass, user, isStudent, navigate]);

  // 2. Fetch Classes and Current Class Lessons
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { classes } = await getClasses();
        const standardClasses = classes.filter(c => c.name.startsWith('Class '));
        setClassesList(standardClasses);

        const targetObj = standardClasses.find(c => c.name === currentClass) || standardClasses[0];
        if (targetObj) {
          const lessonsData = await getClassLessons(targetObj.id || targetObj._id);
          setClassData(lessonsData);
        }
      } catch (err) {
        console.error('Error fetching class data:', err);
        setError('Failed to load class resources.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentClass]);

  const classInfo = CLASS_METADATA[currentClass] || {
    number: currentClass.replace('Class ', ''),
    slug: currentClass.toLowerCase().replace(' ', '-'),
    icon: '📘',
    level: 'English Curriculum',
    ageRange: 'Academic Standard',
    desc: 'Class-specific learning materials and resources.'
  };

  const areas = classData?.areas || [];
  const filteredAreas = activeAreaTab === 'All' 
    ? areas 
    : areas.filter(a => a.name === activeAreaTab);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="class-portal-page">
      {/* 1. Student Access Restriction Toast */}
      <AnimatePresence>
        {accessDeniedMessage && (
          <motion.div 
            className="access-denied-toast"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <AlertTriangle size={20} className="text-amber-400" />
            <span>{accessDeniedMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Back to All Classes Link (Teacher Only) */}
      {isTeacher && (
        <div className="class-back-nav-row">
          <button 
            className="btn-back-classes"
            onClick={() => navigate('/classes')}
          >
            <span>← All Classes</span>
          </button>
        </div>
      )}

      {/* 4. Class Header Banner */}
      <motion.div 
        className="class-portal-hero"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="class-hero-left">
          <div className="class-grade-pill">
            <GraduationCap size={16} />
            <span>Grade {classInfo.number} • {classInfo.ageRange}</span>
            {isStudent && (
              <span className="student-locked-tag">
                <Lock size={12} /> Assigned Grade (Exclusive Access)
              </span>
            )}
          </div>

          <h1 className="class-portal-title">{currentClass} Learning Portal</h1>
          <p className="class-portal-level">{classInfo.level}</p>
          <p className="class-portal-desc">{classInfo.desc}</p>
        </div>

        <div className="class-hero-right">
          <div className="class-year-badge">
            <Sparkles size={14} />
            <span>Academic Year 2026</span>
          </div>
          <div className="resources-count-badge">
            <BookOpen size={14} />
            <span>{areas.reduce((acc, a) => acc + (a.lessons?.length || 0), 0)} Available Lessons</span>
          </div>
        </div>
      </motion.div>

      {/* 5. Learning Area Category Filter Tabs */}
      <div className="resource-tabs-nav">
        {['All', 'Spoken English', 'Vocabulary', 'Grammar', 'Listening', 'Reading'].map((tab) => (
          <button
            key={tab}
            className={`resource-tab-btn ${activeAreaTab === tab ? 'active' : ''}`}
            onClick={() => setActiveAreaTab(tab)}
          >
            {tab === 'All' ? '🌟 All Learning Strands' : tab}
          </button>
        ))}
      </div>

      {/* 6. Clean Curated Class Resources */}
      <div className="class-resources-area">
        {filteredAreas.length === 0 ? (
          <div className="empty-class-state-card">
            <div className="empty-state-icon-orb">
              <BookOpen size={48} className="text-golden" />
            </div>
            <h2 className="empty-state-title">{currentClass} Portal is Ready</h2>
            <p className="empty-state-desc">This classroom is active and ready for learning. No lessons or resources are currently published for this class.</p>
          </div>
        ) : (
          <div className="curriculum-areas-list">
            {filteredAreas.map((area) => (
              <div key={area.name} className="learning-strand-block">
                <div className="strand-header-row">
                  <div className="strand-icon-box">{area.icon}</div>
                  <div>
                    <h2 className="strand-title">{area.name}</h2>
                    <p className="strand-desc">{area.description}</p>
                  </div>
                  <span className="strand-lessons-pill">
                    {area.lessons.length} {area.lessons.length === 1 ? 'Lesson' : 'Lessons'}
                  </span>
                </div>

                <div className="strand-lessons-grid">
                  {area.lessons.map((lesson) => (
                    <motion.div 
                      key={lesson._id}
                      className="curriculum-lesson-card"
                      whileHover={{ y: -3 }}
                    >
                      <div className="lesson-card-top">
                        <span className="lesson-icon-circle">{lesson.icon || area.icon}</span>
                        <span className="lesson-duration-tag">{lesson.duration || '10 min'}</span>
                      </div>

                      <h3 className="lesson-card-title">{lesson.title}</h3>
                      <p className="lesson-card-desc">{lesson.description}</p>

                      {lesson.objectives?.length > 0 && (
                        <div className="lesson-card-topics">
                          <span className="topic-bullet">🎯</span>
                          <span>{lesson.objectives[0]}</span>
                        </div>
                      )}

                      <div className="lesson-card-footer">
                        <Link 
                          to={`/lesson/${lesson._id}`}
                          className="btn btn-primary btn-block open-lesson-btn"
                        >
                          <span>Open Lesson</span>
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
