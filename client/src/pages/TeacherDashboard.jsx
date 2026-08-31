import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, ArrowRight, Sparkles, BookOpen, 
  Users, Layers, Compass 
} from 'lucide-react';

const TEACHER_CLASSES = [
  {
    id: 'nursery',
    name: 'NURSERY',
    slug: 'nursery',
    icon: '🧸',
    tag: 'Early Learners',
    ageRange: 'Ages 3 – 4',
    color: '#E5A93C'
  },
  {
    id: 'lkg',
    name: 'LKG',
    slug: 'lkg',
    icon: '📚',
    tag: 'Early Learners',
    ageRange: 'Ages 4 – 5',
    color: '#D97736'
  },
  {
    id: 'ukg',
    name: 'UKG',
    slug: 'ukg',
    icon: '🌟',
    tag: 'Early Learners',
    ageRange: 'Ages 5 – 6',
    color: '#34D399'
  },
  {
    id: 'class-1',
    name: 'CLASS 1',
    slug: 'class-1',
    icon: '🌱',
    tag: 'Foundation',
    ageRange: 'Ages 6 – 7',
    color: '#60A5FA'
  },
  {
    id: 'class-2',
    name: 'CLASS 2',
    slug: 'class-2',
    icon: '🌿',
    tag: 'Foundation',
    ageRange: 'Ages 7 – 8',
    color: '#A78BFA'
  },
  {
    id: 'class-3',
    name: 'CLASS 3',
    slug: 'class-3',
    icon: '🌸',
    tag: 'Foundation',
    ageRange: 'Ages 8 – 9',
    color: '#F472B6'
  },
  {
    id: 'class-4',
    name: 'CLASS 4',
    slug: 'class-4',
    icon: '🍀',
    tag: 'Intermediate',
    ageRange: 'Ages 9 – 10',
    color: '#34D399'
  },
  {
    id: 'class-5',
    name: 'CLASS 5',
    slug: 'class-5',
    icon: '🚀',
    tag: 'Intermediate',
    ageRange: 'Ages 10 – 11',
    color: '#FB923C'
  },
  {
    id: 'class-6',
    name: 'CLASS 6',
    slug: 'class-6',
    icon: '⚡',
    tag: 'Intermediate',
    ageRange: 'Ages 11 – 12',
    color: '#FBBF24'
  },
  {
    id: 'class-7',
    name: 'CLASS 7',
    slug: 'class-7',
    icon: '🏆',
    tag: 'Advanced',
    ageRange: 'Ages 12 – 13',
    color: '#C084FC'
  },
  {
    id: 'class-8',
    name: 'CLASS 8',
    slug: 'class-8',
    icon: '🏛️',
    tag: 'Advanced',
    ageRange: 'Ages 13 – 14',
    color: '#38BDF8'
  },
  {
    id: 'class-9',
    name: 'CLASS 9',
    slug: 'class-9',
    icon: '👑',
    tag: 'Advanced',
    ageRange: 'Ages 14 – 15',
    color: '#F43F5E'
  },
  {
    id: 'class-10',
    name: 'CLASS 10',
    slug: 'class-10',
    icon: '🎓',
    tag: 'Advanced',
    ageRange: 'Ages 15 – 16',
    color: '#EAB308'
  }
];

export default function TeacherDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const displayName = user?.name ? user.name.split(' ')[0] : 'Teacher';

  return (
    <div className="teacher-portal-layout">
      {/* 1. Header Greeting Section */}
      <motion.div 
        className="teacher-greeting-header"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="teacher-greeting-text">
          <h1 className="teacher-hello-title">
            {getGreeting()}, <span className="teacher-name-highlight">{displayName}</span>
          </h1>
          <p className="teacher-hello-sub">
            Manage your classes and help students grow.
          </p>
        </div>

        <div className="teacher-header-badge">
          <Sparkles size={16} />
          <span>Teacher Command Center</span>
        </div>
      </motion.div>

      {/* 2. Banner: YOUR CLASSES */}
      <motion.div 
        className="your-classes-banner"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
      >
        <div className="banner-left">
          <h2 className="banner-title">YOUR CLASSES</h2>
          <p className="banner-subtitle">Select a class to continue</p>
        </div>
        <div className="banner-right">
          <span className="classes-total-count">13 Classes Available</span>
        </div>
      </motion.div>

      {/* 3. Class Cards Grid */}
      <div className="teacher-classes-grid">
        {TEACHER_CLASSES.map((cls, index) => (
          <motion.div
            key={cls.id}
            className="teacher-class-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 * index }}
            whileHover={{ y: -4 }}
            onClick={() => navigate(`/class/${cls.slug}`)}
          >
            <div className="class-card-top-row">
              <span className="card-class-tag">{cls.tag}</span>
              <span className="card-age-badge">{cls.ageRange}</span>
            </div>

            <div className="class-card-body">
              <h3 className="card-class-name">{cls.name}</h3>
            </div>

            <div className="class-card-action-row">
              <button className="view-class-link">
                <span>View Class</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
