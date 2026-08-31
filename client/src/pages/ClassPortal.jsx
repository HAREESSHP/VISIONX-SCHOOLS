import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getClasses } from '../services/classService';
import Loader from '../components/Loader';
import { 
  GraduationCap, BookOpen, Mic, FileText, Sparkles, 
  Lock, ArrowRight, Layers, Volume2, Award, 
  AlertTriangle, ArrowLeft, Download, CheckCircle, Clock, Compass
} from 'lucide-react';

const CLASS_METADATA = {
  'nursery': {
    number: 'Nursery',
    slug: 'nursery',
    name: 'Nursery',
    level: 'Early Phonemic Awareness & Sensory Sounds',
    ageRange: 'Ages 3 – 4',
    desc: 'Fun rhyming, basic animal & object sounds, greetings, and visual word associations.'
  },
  'lkg': {
    number: 'LKG',
    slug: 'lkg',
    name: 'LKG',
    level: 'Letter-Sound Blends & Picture Stories',
    ageRange: 'Ages 4 – 5',
    desc: 'Alphabet phonics, daily action words, simple two-word phrases, and guided listening.'
  },
  'ukg': {
    number: 'UKG',
    slug: 'ukg',
    name: 'UKG',
    level: 'Sight Words, Phonics & Everyday Phrases',
    ageRange: 'Ages 5 – 6',
    desc: 'Sight words mastery, simple sentence building, basic questions, and spoken storytelling.'
  },
  'Class 1': {
    number: 1,
    slug: 'class-1',
    name: 'Class 1',
    level: 'Foundational Phonics & Spoken English',
    ageRange: 'Ages 6 – 7',
    desc: 'Foundational phonetics, daily greetings, naming words, and interactive spoken prompts.'
  },
  'Class 2': {
    number: 2,
    slug: 'class-2',
    name: 'Class 2',
    level: 'Sentence Builder & Daily Vocabulary',
    ageRange: 'Ages 7 – 8',
    desc: 'Daily routines, descriptive words, motion action verbs, and expressive conversational dialogue.'
  },
  'Class 3': {
    number: 3,
    slug: 'class-3',
    name: 'Class 3',
    level: 'Conversational English & Grammar',
    ageRange: 'Ages 8 – 9',
    desc: 'Inquisitive question forms (5 Ws & 1 H), present tenses, and expressive community stories.'
  },
  'Class 4': {
    number: 4,
    slug: 'class-4',
    name: 'Class 4',
    level: 'Narrative & Functional Communication',
    ageRange: 'Ages 9 – 10',
    desc: 'Past and future narrative tenses, environmental ecosystems, and roleplaying scenarios.'
  },
  'Class 5': {
    number: 5,
    slug: 'class-5',
    name: 'Class 5',
    level: 'Intermediate Articulation & Discourse',
    ageRange: 'Ages 10 – 11',
    desc: 'Impromptu speeches, complex prepositions, connective conjunctions, and science comprehension.'
  },
  'Class 6': {
    number: 6,
    slug: 'class-6',
    name: 'Class 6',
    level: 'Fluent Conversationalist & Idioms',
    ageRange: 'Ages 11 – 12',
    desc: 'Group discussions, conversational turn-taking, idioms, and situational conditionals.'
  },
  'Class 7': {
    number: 7,
    slug: 'class-7',
    name: 'Class 7',
    level: 'Debate, Rhetoric & Synthesis',
    ageRange: 'Ages 12 – 13',
    desc: 'Persuasive speeches (Ethos/Pathos/Logos), tier-2 academic lexicon, and active/passive syntax.'
  },
  'Class 8': {
    number: 8,
    slug: 'class-8',
    name: 'Class 8',
    level: 'Critical Oratory & Analysis',
    ageRange: 'Ages 13 – 14',
    desc: 'Model UN addresses, reported speech backshifting, and critical reading analysis.'
  },
  'Class 9': {
    number: 9,
    slug: 'class-9',
    name: 'Class 9',
    level: 'Advanced Academic Rhetoric',
    ageRange: 'Ages 14 – 15',
    desc: 'Panel moderating, grammatical inversion, subjunctive mood, and analytical prose.'
  },
  'Class 10': {
    number: 10,
    slug: 'class-10',
    name: 'Class 10',
    level: 'Global Diplomat & Executive Articulation',
    ageRange: 'Ages 15 – 16',
    desc: 'Executive STAR-method interviews, diplomatic & legal lexicon, and rhetorical cadence.'
  }
};

const STRAND_TABS = [
  'All Modules',
  'Spoken English',
  'Vocabulary Builder',
  'Grammar & Syntax',
  'Listening Comprehension',
  'Reading Passages'
];

export default function ClassPortal() {
  const { grade } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Normalize grade param
  const normalizeGrade = (input) => {
    if (!input) return user?.className || 'Class 1';
    const lower = input.toLowerCase().trim();
    if (lower === 'nursery') return 'nursery';
    if (lower === 'lkg') return 'lkg';
    if (lower === 'ukg') return 'ukg';
    const clean = input.replace('class-', '').replace('Class ', '').trim();
    if (!isNaN(clean) && parseInt(clean) >= 1 && parseInt(clean) <= 10) {
      return `Class ${clean}`;
    }
    return input.startsWith('Class ') ? input : `Class ${input}`;
  };

  const currentGradeKey = normalizeGrade(grade);
  const isTeacher = user?.role === 'TEACHER';
  const isStudent = user?.role === 'STUDENT';

  const [activeStrand, setActiveStrand] = useState('All Modules');
  const [accessDeniedMessage, setAccessDeniedMessage] = useState(null);

  // Class Info lookup
  const classInfo = CLASS_METADATA[currentGradeKey] || {
    number: currentGradeKey,
    slug: grade,
    name: currentGradeKey,
    level: 'Curriculum Learning Framework',
    ageRange: 'Academic Standard',
    desc: 'Comprehensive English language and speech curriculum portal.'
  };

  // 1. Strict Student Access Enforcement
  useEffect(() => {
    if (isStudent && user?.className) {
      const studentClass = normalizeGrade(user.className);
      if (currentGradeKey !== studentClass) {
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
  }, [currentGradeKey, user, isStudent, navigate]);

  // Curriculum Blueprint / Layout Framework Structure
  const curriculumUnits = [
    {
      unitNumber: 'UNIT 01',
      unitTitle: 'Core Foundations & Everyday Expressions',
      unitDescription: 'Foundational speech drills, conversational greetings, and vocabulary building.',
      chapters: [
        {
          id: 'ch-1',
          strand: 'Spoken English',
          title: 'Speech Warmup & Introductions',
          duration: '10 Mins',
          level: 'Core Milestone',
          status: 'Structure Ready',
          objectives: ['Guided speech pronunciation', 'Self-introductions & greetings']
        },
        {
          id: 'ch-2',
          strand: 'Vocabulary Builder',
          title: 'Contextual Word Power & Meanings',
          duration: '15 Mins',
          level: 'Tier-1 Vocabulary',
          status: 'Structure Ready',
          objectives: ['Core descriptive words', 'Visual word associations']
        },
        {
          id: 'ch-3',
          strand: 'Grammar & Syntax',
          title: 'Sentence Patterns & Action Words',
          duration: '12 Mins',
          level: 'Grammar Pillar',
          status: 'Structure Ready',
          objectives: ['Basic sentence formulation', 'Correct verb usage']
        }
      ]
    },
    {
      unitNumber: 'UNIT 02',
      unitTitle: 'Expressive Communication & Dialogue',
      unitDescription: 'Real-world conversational turn-taking, roleplays, and listening mastery.',
      chapters: [
        {
          id: 'ch-4',
          strand: 'Listening Comprehension',
          title: 'Guided Audio Listening & Recall',
          duration: '15 Mins',
          level: 'Listening Strand',
          status: 'Structure Ready',
          objectives: ['Active audio comprehension', 'Recall & response questions']
        },
        {
          id: 'ch-5',
          strand: 'Reading Passages',
          title: 'Short Story Reading & Articulation',
          duration: '15 Mins',
          level: 'Reading Strand',
          status: 'Structure Ready',
          objectives: ['Pacing & intonation practice', 'Moral story comprehension']
        },
        {
          id: 'ch-6',
          strand: 'Spoken English',
          title: 'Interactive Dialogues & Roleplay',
          duration: '20 Mins',
          level: 'Applied Speaking',
          status: 'Structure Ready',
          objectives: ['Two-way situational conversation', 'Expressive delivery']
        }
      ]
    }
  ];

  return (
    <div className="class-portal-page">
      {/* 1. Student Access Restriction Alert */}
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

      {/* 2. Top Breadcrumb & Return Bar */}
      <div className="portal-top-bar">
        {isTeacher ? (
          <button 
            className="btn-back-classes"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft size={16} />
            <span>All Classes</span>
          </button>
        ) : (
          <div className="student-badge-pill">
            <Lock size={14} />
            <span>Enrolled in {classInfo.name}</span>
          </div>
        )}

        <div className="academic-session-pill">
          <Sparkles size={14} />
          <span>Academic Year 2026 – 2027</span>
        </div>
      </div>

      {/* 3. Class Hero Banner */}
      <motion.div 
        className="class-portal-hero"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="class-hero-left">
          <div className="class-grade-pill">
            <GraduationCap size={16} />
            <span>{classInfo.name} • {classInfo.ageRange}</span>
          </div>

          <h1 className="class-portal-title">{classInfo.name} Learning Portal</h1>
          <p className="class-portal-level">{classInfo.level}</p>
          <p className="class-portal-desc">{classInfo.desc}</p>
        </div>

        <div className="class-hero-highlights">
          <div className="highlight-mini-card">
            <Layers size={18} className="mini-icon" />
            <div className="mini-text">
              <strong>5 Learning Strands</strong>
              <span>Speaking, Vocab, Grammar, Listening, Reading</span>
            </div>
          </div>

          <div className="highlight-mini-card">
            <Clock size={18} className="mini-icon" />
            <div className="mini-text">
              <strong>15–20 Mins / Session</strong>
              <span>Daily Interactive Speech Practice</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4. Learning Strand Navigation Filter */}
      <div className="resource-tabs-nav">
        {STRAND_TABS.map((tab) => (
          <button
            key={tab}
            className={`resource-tab-btn ${activeStrand === tab ? 'active' : ''}`}
            onClick={() => setActiveStrand(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 5. Curriculum Units & Chapters Blueprint */}
      <div className="curriculum-units-container">
        {curriculumUnits.map((unit, uIdx) => {
          const matchingChapters = activeStrand === 'All Modules'
            ? unit.chapters
            : unit.chapters.filter(ch => ch.strand === activeStrand);

          if (matchingChapters.length === 0) return null;

          return (
            <div key={unit.unitNumber} className="curriculum-unit-section">
              <div className="unit-section-header">
                <div className="unit-header-meta">
                  <span className="unit-badge-tag">{unit.unitNumber}</span>
                  <h2 className="unit-main-title">{unit.unitTitle}</h2>
                  <p className="unit-sub-desc">{unit.unitDescription}</p>
                </div>
                <span className="unit-lessons-count">
                  {matchingChapters.length} {matchingChapters.length === 1 ? 'Module' : 'Modules'}
                </span>
              </div>

              <div className="unit-chapters-grid">
                {matchingChapters.map((ch, chIdx) => (
                  <motion.div 
                    key={ch.id}
                    className="chapter-blueprint-card"
                    whileHover={{ y: -3 }}
                  >
                    <div className="chapter-top-bar">
                      <span className="chapter-strand-badge">{ch.strand}</span>
                      <span className="chapter-time-pill">{ch.duration}</span>
                    </div>

                    <h3 className="chapter-title">{ch.title}</h3>
                    <p className="chapter-level-text">{ch.level}</p>

                    <div className="chapter-objectives-box">
                      <div className="obj-header">Core Competencies:</div>
                      <ul className="obj-list">
                        {ch.objectives.map((obj, i) => (
                          <li key={i}>
                            <CheckCircle size={13} className="obj-check-icon" />
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="chapter-card-action">
                      <button className="btn-module-preview">
                        <span>{ch.status}</span>
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 6. Class Materials & Supplementary Resource Hub */}
      <div className="supplementary-resources-block">
        <div className="supp-header-row">
          <div>
            <h2 className="supp-title">Classroom Learning Materials</h2>
            <p className="supp-desc">Downloadable student activity worksheets, audio tracks, and educator rubrics.</p>
          </div>
        </div>

        <div className="supp-cards-grid">
          <div className="supp-resource-item">
            <div className="supp-icon-circle">
              <FileText size={22} />
            </div>
            <div className="supp-item-content">
              <h4>Printable Activity Worksheets</h4>
              <p>Practice exercises, handwriting, and word searches for {classInfo.name}.</p>
            </div>
            <span className="supp-status-tag">Worksheets Area</span>
          </div>

          <div className="supp-resource-item">
            <div className="supp-icon-circle">
              <Volume2 size={22} />
            </div>
            <div className="supp-item-content">
              <h4>Audio Pronunciation Tracks</h4>
              <p>Native accent pronunciation references and dialogues.</p>
            </div>
            <span className="supp-status-tag">Audio Library</span>
          </div>

          <div className="supp-resource-item">
            <div className="supp-icon-circle">
              <Compass size={22} />
            </div>
            <div className="supp-item-content">
              <h4>Teacher Guidance Notes</h4>
              <p>Classroom activity prompts, rubrics, and facilitation cues.</p>
            </div>
            <span className="supp-status-tag">Educator Notes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
