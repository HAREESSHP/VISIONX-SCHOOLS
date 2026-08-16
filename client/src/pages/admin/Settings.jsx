import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Lock, Building, Save } from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();

  // Ultra-Minimalist Styles
  const styles = {
    container: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '2rem 1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    },
    header: {
      marginBottom: '3rem'
    },
    title: {
      fontSize: '2rem',
      fontWeight: '600',
      letterSpacing: '-0.03em',
      color: '#000000',
      margin: '0 0 0.25rem 0'
    },
    subtitle: {
      fontSize: '1rem',
      color: '#86868B',
      fontWeight: '400',
      margin: 0
    },
    section: {
      background: '#FFFFFF',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
      marginBottom: '2rem'
    },
    sectionTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1D1D1F',
      margin: '0 0 1.5rem 0',
      paddingBottom: '1rem',
      borderBottom: '1px solid #F5F5F7'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem'
    },
    inputGroup: {
      marginBottom: '1rem'
    },
    label: {
      display: 'block',
      fontSize: '0.85rem',
      fontWeight: '500',
      color: '#1D1D1F',
      marginBottom: '0.25rem'
    },
    input: {
      width: '100%',
      padding: '0.65rem 0',
      fontSize: '0.95rem',
      color: '#1D1D1F',
      background: 'transparent',
      border: 'none',
      borderBottom: '1px solid #D2D2D7',
      outline: 'none',
      transition: 'border-color 0.2s ease',
      boxSizing: 'border-box'
    },
    disabledInput: {
      width: '100%',
      padding: '0.65rem 0',
      fontSize: '0.95rem',
      color: '#86868B',
      background: 'transparent',
      border: 'none',
      borderBottom: '1px solid #F5F5F7',
      outline: 'none',
      boxSizing: 'border-box',
      cursor: 'not-allowed'
    },
    submitButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: '#000000',
      color: '#FFFFFF',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      fontSize: '0.95rem',
      fontWeight: '500',
      cursor: 'pointer',
      marginTop: '1rem',
      transition: 'background 0.2s ease'
    }
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = '#007AFF';
  };
  
  const handleBlur = (e) => {
    e.target.style.borderColor = '#D2D2D7';
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
