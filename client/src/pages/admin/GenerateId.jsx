import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Check, Copy, AlertCircle } from 'lucide-react';

const GenerateId = () => {
  const { token } = useAuth();
  const [roleType, setRoleType] = useState('STUDENT'); // 'STUDENT' or 'TEACHER'
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    schoolName: '',
    className: 'Class 1',
    section: '',
    admissionNumber: '',
    subject: '',
    employeeId: '',
    validityMonths: '6'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessData(null);
    setErrorMessage(null);
    setCopied(false);

    try {
      const response = await fetch('/api/admin/generate-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          role: roleType,
          ...formData
        })
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessData(data.credentials);
        setFormData({
          name: '', schoolName: '', className: 'Class 1', section: '',
          admissionNumber: '', subject: '', employeeId: '', validityMonths: '6'
        });
      } else {
        setErrorMessage(data.message || 'Failed to generate ID. Please verify the details.');
      }
    } catch (error) {
      console.error('ID Generation error:', error);
      setErrorMessage('Network error while generating ID. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (successData) {
      const text = `Role: ${successData.role}\nUsername: ${successData.loginId}\nPassword: ${successData.password}\nValid Until: ${new Date(successData.expiryDate).toLocaleDateString()}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Luxury Dark Admin Theme Styles
  const styles = {
    container: {
      maxWidth: '920px',
      margin: '0 auto',
      padding: '1rem 0'
    },
    header: {
      marginBottom: '1.5rem',
      textAlign: 'center'
    },
    title: {
      fontSize: '2.2rem',
      fontWeight: '800',
      fontFamily: 'var(--font-serif)',
      color: '#FFFFFF',
      margin: '0.4rem 0 0.25rem 0'
    },
    subtitle: {
      fontSize: '1rem',
      color: 'var(--admin-text-light)',
      margin: 0
    },
    segmentedControl: {
      display: 'flex',
      background: '#241810',
      border: '1px solid rgba(222, 203, 181, 0.18)',
      borderRadius: '9999px',
      padding: '4px',
      width: 'fit-content',
      margin: '0 auto 1.75rem auto'
    },
    segmentButton: (isActive) => ({
      padding: '0.55rem 2rem',
      border: 'none',
      background: isActive ? 'linear-gradient(135deg, #B5602E 0%, #8A431B 100%)' : 'transparent',
      color: isActive ? '#FFFFFF' : 'var(--admin-text-light)',
      borderRadius: '9999px',
      fontWeight: '700',
      fontSize: '0.92rem',
      cursor: 'pointer',
      boxShadow: isActive ? '0 4px 14px rgba(181, 96, 46, 0.35)' : 'none',
      transition: 'all 0.25s ease'
    }),
    formSection: {
      background: '#271A12',
      border: '1.5px solid rgba(222, 203, 181, 0.14)',
      borderRadius: '20px',
      padding: '2.25rem',
      boxShadow: '0 16px 36px rgba(0,0,0,0.4)'
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
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.25rem'
    },
    submitButton: {
      background: 'linear-gradient(135deg, #B5602E 0%, #8A431B 100%)',
      color: '#FFFFFF',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      padding: '0.95rem 1.75rem',
      borderRadius: '9999px',
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'pointer',
      width: '100%',
      marginTop: '1.25rem',
      boxShadow: '0 6px 18px rgba(181, 96, 46, 0.4)',
      transition: 'all 0.2s ease'
    },
    successCard: {
      marginTop: '1.75rem',
      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(5, 150, 105, 0.18) 100%)',
      border: '1.5px solid rgba(16, 185, 129, 0.35)',
      borderRadius: '16px',
      padding: '1.75rem',
      textAlign: 'center'
    },
    dataRow: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0.75rem 0',
      borderBottom: '1px solid rgba(222, 203, 181, 0.1)'
    },
    dataLabel: {
      fontSize: '0.88rem',
      color: 'var(--admin-text-light)',
      fontWeight: '500'
    },
    dataValue: {
      fontSize: '1.05rem',
      color: '#FFFFFF',
      fontWeight: '700',
      fontFamily: 'monospace'
    },
    copyBtn: (isCopied) => ({
      marginTop: '1.25rem',
      background: isCopied ? '#10B981' : 'linear-gradient(135deg, #B5602E 0%, #8A431B 100%)',
      color: '#FFFFFF',
      border: 'none',
      padding: '0.75rem 1.75rem',
      borderRadius: '9999px',
      fontSize: '0.92rem',
      fontWeight: '700',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
      transition: 'all 0.2s ease'
    })
  };

  return (
    <div style={styles.container}>
      
      <div style={styles.header}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
          <img src="/visionx-logo.png" alt="VisionX" style={{ height: '36px', width: '36px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.04em' }}>VISIONX</span>
        </div>
        <h2 style={styles.title}>Provision Identity</h2>
        <p style={styles.subtitle}>Create secure access credentials for the platform.</p>
      </div>

      <div style={styles.segmentedControl}>
        <button 
          style={styles.segmentButton(roleType === 'STUDENT')} 
          onClick={() => { setRoleType('STUDENT'); setSuccessData(null); }}
        >
          Student
        </button>
        <button 
          style={styles.segmentButton(roleType === 'TEACHER')} 
          onClick={() => { setRoleType('TEACHER'); setSuccessData(null); }}
        >
          Teacher
        </button>
      </div>

      <div style={styles.formSection}>
        <form onSubmit={handleSubmit}>
          
          <div style={styles.grid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <input 
                type="text" name="name" required 
                value={formData.name} onChange={handleChange} 
                style={styles.input} 
                placeholder="e.g. Jane Doe"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Institution / School Name</label>
              <input 
                type="text" name="schoolName" required 
                value={formData.schoolName} onChange={handleChange} 
                style={styles.input} 
                placeholder="e.g. VisionX Public School"
              />
            </div>
          </div>

          {roleType === 'STUDENT' ? (
            <div style={styles.grid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Class / Grade</label>
                <select 
                  name="className" required 
                  value={formData.className} onChange={handleChange} 
                  style={styles.input}
                >
                  <option value="Nursery">Nursery</option>
                  <option value="LKG">LKG</option>
                  <option value="UKG">UKG</option>
                  <option value="Class 1">Class 1</option>
                  <option value="Class 2">Class 2</option>
                  <option value="Class 3">Class 3</option>
                  <option value="Class 4">Class 4</option>
                  <option value="Class 5">Class 5</option>
                  <option value="Class 6">Class 6</option>
                  <option value="Class 7">Class 7</option>
                  <option value="Class 8">Class 8</option>
                  <option value="Class 9">Class 9</option>
                  <option value="Class 10">Class 10</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Section (Optional)</label>
                <input 
                  type="text" name="section" 
                  value={formData.section} onChange={handleChange} 
                  style={styles.input} placeholder="e.g. A"
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Admission Number <span style={{ color: '#F87171' }}>*</span></label>
                <input 
                  type="text" name="admissionNumber" required
                  value={formData.admissionNumber} onChange={handleChange} 
                  style={styles.input} placeholder="e.g. 1029"
                />
              </div>
            </div>
          ) : (
            <div style={styles.grid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Subject</label>
                <input 
                  type="text" name="subject" required 
                  value={formData.subject} onChange={handleChange} 
                  style={styles.input} placeholder="e.g. Spoken English"
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Employee ID <span style={{ color: '#F87171' }}>*</span></label>
                <input 
                  type="text" name="employeeId" required
                  value={formData.employeeId} onChange={handleChange} 
                  style={styles.input} placeholder="e.g. EMP405"
                />
              </div>
            </div>
          )}

          <div style={{...styles.inputGroup, maxWidth: '280px'}}>
            <label style={styles.label}>Validity Duration</label>
            <select 
              name="validityMonths" 
              value={formData.validityMonths} onChange={handleChange} 
              style={styles.input}
            >
              <option value="3">3 Months</option>
              <option value="6">6 Months</option>
              <option value="12">12 Months</option>
            </select>
          </div>

          {errorMessage && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              background: 'rgba(239, 68, 68, 0.14)',
              border: '1.5px solid rgba(239, 68, 68, 0.35)',
              color: '#F87171',
              padding: '0.85rem 1.15rem',
              borderRadius: '10px',
              marginTop: '1rem',
              fontSize: '0.9rem',
              fontWeight: 600
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          <button type="submit" style={styles.submitButton} disabled={loading}>
            {loading ? 'Processing...' : 'Generate Credentials'}
          </button>
        </form>
      </div>

      {successData && (
        <div style={styles.successCard}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '800', fontFamily: 'var(--font-serif)', color: '#34D399', margin: '0 0 0.25rem 0' }}>
              Credentials Generated Successfully!
            </h3>
            <p style={{ color: 'var(--admin-text-light)', margin: 0, fontSize: '0.92rem' }}>
              Access details are ready for {successData.role.toLowerCase()}.
            </p>
          </div>

          <div style={{ maxWidth: '420px', margin: '0 auto', textAlign: 'left' }}>
            <div style={styles.dataRow}>
              <span style={styles.dataLabel}>Login ID</span>
              <span style={{ ...styles.dataValue, color: 'var(--admin-gold)' }}>{successData.loginId}</span>
            </div>
            <div style={styles.dataRow}>
              <span style={styles.dataLabel}>Password</span>
              <span style={styles.dataValue}>{successData.password}</span>
            </div>
            <div style={{...styles.dataRow, borderBottom: 'none'}}>
              <span style={styles.dataLabel}>Valid Until</span>
              <span style={{...styles.dataValue, color: '#34D399'}}>{new Date(successData.expiryDate).toLocaleDateString()}</span>
            </div>
          </div>

          <button onClick={handleCopy} style={styles.copyBtn(copied)}>
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? 'Copied to Clipboard' : 'Copy Credentials'}
          </button>
        </div>
      )}

    </div>
  );
};

export default GenerateId;
