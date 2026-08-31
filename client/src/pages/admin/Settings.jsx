import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Lock, Building, Save } from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();

  // Luxury Dark Admin Theme Styles
  const styles = {
    container: {
      maxWidth: '920px',
      margin: '0 auto',
      padding: '1rem 0'
    },
    header: {
      marginBottom: '2.5rem'
    },
    title: {
      fontSize: '2.2rem',
      fontWeight: '800',
      fontFamily: 'var(--font-serif)',
      color: '#FFFFFF',
      margin: '0 0 0.4rem 0'
    },
    subtitle: {
      fontSize: '1rem',
      color: 'var(--admin-text-light)',
      margin: 0
    },
    section: {
      background: '#271A12',
      border: '1.5px solid rgba(222, 203, 181, 0.14)',
      borderRadius: '20px',
      padding: '2.25rem',
      boxShadow: '0 16px 36px rgba(0,0,0,0.4)',
      marginBottom: '2rem'
    },
    sectionTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      fontSize: '1.3rem',
      fontWeight: '800',
      fontFamily: 'var(--font-serif)',
      color: '#FFFFFF',
      margin: '0 0 1.5rem 0',
      paddingBottom: '1rem',
      borderBottom: '1px solid rgba(222, 203, 181, 0.12)'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem'
    },
    inputGroup: {
      marginBottom: '1.15rem'
    },
    label: {
      display: 'block',
      fontSize: '0.86rem',
      fontWeight: '700',
      color: 'var(--admin-gold)',
      marginBottom: '0.4rem',
      letterSpacing: '0.01em'
    },
    input: {
      width: '100%',
      padding: '0.85rem 1rem',
      fontSize: '0.95rem',
      color: '#FFFFFF',
      background: '#1A120C',
      border: '1.5px solid rgba(222, 203, 181, 0.18)',
      borderRadius: '10px',
      outline: 'none',
      transition: 'all 0.2s ease',
      boxSizing: 'border-box'
    },
    disabledInput: {
      width: '100%',
      padding: '0.85rem 1rem',
      fontSize: '0.95rem',
      color: 'var(--admin-text-lighter)',
      background: 'rgba(0,0,0,0.25)',
      border: '1.5px solid rgba(222, 203, 181, 0.08)',
      borderRadius: '10px',
      outline: 'none',
      boxSizing: 'border-box',
      cursor: 'not-allowed'
    },
    submitButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.6rem',
      background: 'linear-gradient(135deg, #B5602E 0%, #8A431B 100%)',
      color: '#FFFFFF',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      padding: '0.85rem 1.75rem',
      borderRadius: '9999px',
      fontSize: '0.95rem',
      fontWeight: '700',
      cursor: 'pointer',
      marginTop: '1rem',
      boxShadow: '0 4px 14px rgba(181, 96, 46, 0.35)',
      transition: 'all 0.2s ease'
    }
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = 'var(--admin-primary)';
    e.target.style.boxShadow = '0 0 0 3px rgba(217, 119, 54, 0.2)';
  };
  
  const handleBlur = (e) => {
    e.target.style.borderColor = 'rgba(222, 203, 181, 0.18)';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div style={styles.container}>
      
      <div style={styles.header}>
        <h2 style={styles.title}>Settings</h2>
        <p style={styles.subtitle}>Manage administrator profile and global preferences.</p>
      </div>

      <div style={{ maxWidth: '800px' }}>
        
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            <User size={22} color="#000000" />
            Admin Profile
          </h3>
          
          <div style={styles.grid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Administrator Name</label>
              <input 
                type="text" 
                defaultValue={user?.name || 'Administrator'} 
                style={styles.input}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Username</label>
              <input 
                type="text" 
                defaultValue={user?.loginId} 
                disabled 
                style={styles.disabledInput}
              />
            </div>
          </div>
          
          <button 
            style={styles.submitButton}
            onMouseOver={(e) => e.currentTarget.style.background = '#333333'}
            onMouseOut={(e) => e.currentTarget.style.background = '#000000'}
          >
            <Save size={16} /> Save Profile
          </button>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            <Lock size={22} color="#000000" />
            Change Password
          </h3>
          
          <div style={{ ...styles.grid, gridTemplateColumns: '1fr' }}>
            <div style={{ ...styles.inputGroup, maxWidth: '400px' }}>
              <label style={styles.label}>Current Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                style={styles.input}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div style={{ ...styles.inputGroup, maxWidth: '400px' }}>
              <label style={styles.label}>New Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                style={styles.input}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>
          
          <button 
            style={styles.submitButton}
            onMouseOver={(e) => e.currentTarget.style.background = '#333333'}
            onMouseOut={(e) => e.currentTarget.style.background = '#000000'}
          >
            <Save size={16} /> Update Password
          </button>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            <Building size={22} color="#000000" />
            Platform Details
          </h3>
          
          <div style={styles.grid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Platform Name</label>
              <input 
                type="text" 
                defaultValue="VisionX Spoken English" 
                style={styles.input}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>
          
          <button 
            style={styles.submitButton}
            onMouseOver={(e) => e.currentTarget.style.background = '#333333'}
            onMouseOut={(e) => e.currentTarget.style.background = '#000000'}
          >
            <Save size={16} /> Save Settings
          </button>
        </div>

      </div>
    </div>
  );
};

export default Settings;
