import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getClasses } from '../services/classService';
import { updateUserClass } from '../services/authService';
import Loader from '../components/Loader';
import TiltCard from '../components/TiltCard';
import { CheckCircle2, Sparkles, BookOpen, Layers } from 'lucide-react';

const GROUP_META = {
  'Early Learners': { icon: '🧸', color: '#B5602E', bg: 'rgba(181, 96, 46, 0.12)' },
  'Foundation': { icon: '📘', color: '#4A6B3D', bg: 'rgba(74, 107, 61, 0.15)' },
  'Intermediate': { icon: '📗', color: '#C4A369', bg: 'rgba(196, 163, 105, 0.2)' },
  'Advanced': { icon: '📙', color: '#3D2B1F', bg: 'rgba(61, 43, 31, 0.12)' }
};

export default function ClassSelection() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [classesData, setClassesData] = useState(null);
  const [selectedClass, setSelectedClass] = useState(user?.className || null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If user is a student and already has an assigned grade, bypass selection and go straight to their dashboard
    if (user?.role === 'STUDENT' && user?.className) {
      navigate('/dashboard', { replace: true });
      return;
    }

    const fetchClasses = async () => {
      try {
        const data = await getClasses();
        setClassesData(data);
      } catch (err) {
        setError(err.message || 'Failed to load classes');
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [user, navigate]);

  const handleSelect = (cls) => {
    setSelectedClass(cls.name);
  };

  const handleContinue = async () => {
    if (!selectedClass) {
      setError('Please choose a class to continue.');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const cls = classesData.classes.find(c => c.name === selectedClass);
      const data = await updateUserClass(selectedClass, cls?.group);
      updateUser(data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to save your class choice. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader text="Preparing your curriculum stages... 🎒" />;
  }

  if (error && !classesData) {
    return (
      <div className="empty-state">
        <div className="empty-icon">😕</div>
        <h2>Couldn't load classes</h2>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  const groups = classesData?.grouped || {};

  return (
    <div className="class-selection-page-pro">
      {/* Header */}
      <motion.div 
        className="page-header-center"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="class-select-badge">
          <Sparkles size={16} />
          <span>Curriculum Pathway</span>
        </div>
        <h1 className="page-title mt-2">Select Your Academic Grade 🎯</h1>
        <p className="page-subtitle">
          Pick your assigned class level to enter customized speaking modules, vocabulary lists, and practice quizzes.
        </p>
      </motion.div>

      {/* Grade Groups Grid */}
      <div className="class-selection-groups">
        {Object.entries(groups).map(([group, classes], groupIndex) => {
          const meta = GROUP_META[group] || { icon: '📚', color: '#3D2B1F', bg: 'rgba(61, 43, 31, 0.1)' };

          return (
            <motion.div 
              key={group} 
              className="class-group-box"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: groupIndex * 0.1 }}
            >
              <div className="class-group-header-row">
                <span className="group-pill-badge" style={{ color: meta.color, background: meta.bg, borderColor: meta.color }}>
                  <span style={{ marginRight: '6px' }}>{meta.icon}</span>
                  {group}
                </span>
                <span className="group-count-text">{classes.length} Levels Available</span>
              </div>

              <div className="class-cards-3d-grid">
                {classes.map((cls) => {
                  const isSelected = selectedClass === cls.name;

                  return (
                    <TiltCard
                      key={cls.id}
                      maxAngle={8}
                      scale={1.03}
                      borderRadius="20px"
                      className={`class-selection-card-3d ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => handleSelect(cls)}
                    >
                      <div className="card-top-icon-row">
                        <span className="class-card-emoji">{meta.icon}</span>
                        {isSelected && (
                          <motion.div 
                            className="selected-check-pill"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          >
                            <CheckCircle2 size={18} />
                          </motion.div>
                        )}
                      </div>

                      <h3 className="class-card-heading">{cls.name}</h3>
                      <p className="class-card-age-tag">Ages {cls.minAge} – {cls.maxAge}</p>
                      
                      <div className="class-card-footer-indicator">
                        <span className={`status-dot ${isSelected ? 'active' : ''}`} />
                        <span>{isSelected ? 'Selected Grade' : 'Click to Select'}</span>
                      </div>
                    </TiltCard>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {error && (
        <motion.div 
          className="alert alert-error max-w-md mx-auto mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}

      {/* Floating Action Bar */}
      <motion.div 
        className="fixed-3d-action-bar"
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="action-bar-inner">
          <div className="action-bar-info">
            <Layers size={20} className="action-bar-icon" />
            <div>
              <strong>{selectedClass ? `Selected: ${selectedClass}` : 'No Class Selected'}</strong>
              <span>{selectedClass ? 'Ready to load your personalized syllabus' : 'Select a card above to continue'}</span>
            </div>
          </div>

          <motion.button
            className="btn btn-primary btn-large action-continue-btn"
            onClick={handleContinue}
            disabled={saving || !selectedClass}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {saving ? 'Loading Dashboard...' : 'Continue to Learning →'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}