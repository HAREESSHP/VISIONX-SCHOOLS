import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getClasses } from '../services/classService';
import { updateUserClass } from '../services/authService';
import Loader from '../components/Loader';

const GROUP_COLORS = {
  'Early Learners': 'group-early',
  'Foundation': 'group-foundation',
  'Intermediate': 'group-intermediate',
  'Advanced': 'group-advanced'
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
  }, []);

  const handleSelect = (cls) => {
    setSelectedClass(cls.name);
  };

  const handleContinue = async () => {
    if (!selectedClass) {
      setError('Please select your class first!');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      // Find the group for the selected class
      const cls = classesData.classes.find(c => c.name === selectedClass);
      const data = await updateUserClass(selectedClass, cls?.group);
      updateUser(data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to save your class. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader text="Loading classes... 🎒" />;
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
    <div className="class-selection-page">
      <div className="page-header">
        <h1 className="page-title">What are you learning today? 🎯</h1>
        <p className="page-subtitle">Choose your class to get started</p>
      </div>

      {Object.entries(groups).map(([group, classes]) => (
        <div key={group} className="class-group-section">
          <div className="class-group-header">
            <span className={`group-tag ${GROUP_COLORS[group] || ''}`}>{group}</span>
          </div>
          <div className="class-grid">
            {classes.map((cls) => (
              <button
                key={cls.id}
                className={`class-card ${selectedClass === cls.name ? 'selected' : ''}`}
                onClick={() => handleSelect(cls)}
              >
                <div className="class-card-icon">
                  {group === 'Early Learners' ? '🧸' :
                   group === 'Foundation' ? '📘' :
                   group === 'Intermediate' ? '📗' : '📙'}
                </div>
                <div className="class-card-name">{cls.name}</div>
                <div className="class-card-age">Age {cls.minAge}-{cls.maxAge}</div>
                {selectedClass === cls.name && (
                  <div className="class-check">✓</div>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}

      {error && (
        <div className="alert alert-error">{error}</div>
      )}

      <div className="fixed-action-bar">
        <button
          className="btn btn-primary btn-large"
          onClick={handleContinue}
          disabled={saving || !selectedClass}
        >
          {saving ? 'Saving...' : 'Continue →'}
        </button>
      </div>
    </div>
  );
}