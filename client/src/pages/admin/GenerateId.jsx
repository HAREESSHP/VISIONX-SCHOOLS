import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Check, Copy } from 'lucide-react';

const GenerateId = () => {
  const { token } = useAuth();
  const [roleType, setRoleType] = useState('STUDENT'); // 'STUDENT' or 'TEACHER'
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    schoolName: '',
    className: '',
    section: '',
    admissionNumber: '',
    subject: '',
    employeeId: '',
    validityMonths: '6'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessData(null);
    setCopied(false);

    try {
      const response = await fetch('http://localhost:5000/api/admin/generate-id', {
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
          name: '', schoolName: '', className: '', section: '',
          admissionNumber: '', subject: '', employeeId: '', validityMonths: '6'
        });
      } else {
        alert(data.message || 'Error generating ID');
      }
    } catch (error) {
      alert('Network error while generating ID');
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

  // Minimalist Styles
  const styles = {
    container: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    },
    header: {
      marginBottom: '0.75rem',
      textAlign: 'center'
    },
    title: {
      fontSize: '2rem',
      fontWeight: '600',
      letterSpacing: '-0.03em',
      color: '#000000',
      margin: '0'
    },
    subtitle: {
      fontSize: '1rem',
      color: '#86868B',
      fontWeight: '400',
      margin: 0
    },
    segmentedControl: {
      display: 'flex',
      background: '#F5F5F7',
      borderRadius: '8px',
      padding: '4px',
      width: 'fit-content',
      margin: '0 auto 1rem auto'
    },
    segmentButton: (isActive) => ({
      padding: '0.4rem 1.5rem',
      border: 'none',
      background: isActive ? '#FFFFFF' : 'transparent',
      color: isActive ? '#000000' : '#86868B',
      borderRadius: '6px',
      fontWeight: isActive ? '600' : '400',
      fontSize: '0.9rem',
      cursor: 'pointer',
      boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
      transition: 'all 0.2s ease'
    }),
    formSection: {
      background: '#FFFFFF',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
    },
    inputGroup: {
      marginBottom: '0.75rem'
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
      padding: '0.5rem 0',
      fontSize: '0.95rem',
      color: '#1D1D1F',
      background: 'transparent',
      border: 'none',
      borderBottom: '1px solid #D2D2D7',
      outline: 'none',
      transition: 'border-color 0.2s ease',
      boxSizing: 'border-box'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '0.75rem'
    },
    submitButton: {
      background: '#000000',
      color: '#FFFFFF',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '6px',
      fontSize: '0.95rem',
      fontWeight: '500',
      cursor: 'pointer',
      width: '100%',
      marginTop: '1rem',
      transition: 'background 0.2s ease'
    },
    successCard: {
      marginTop: '1.5rem',
      background: '#FAFAFC',
      border: '1px solid #E5E5EA',
      borderRadius: '12px',
      padding: '1.5rem',
      textAlign: 'center'
    },
    dataRow: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0.5rem 0',
      borderBottom: '1px solid #E5E5EA'
    },
    dataLabel: {
      fontSize: '0.85rem',
      color: '#86868B',
      fontWeight: '400'
    },
    dataValue: {
      fontSize: '1rem',
      color: '#1D1D1F',
      fontWeight: '500',
      fontFamily: 'monospace'
    },
    copyBtn: (isCopied) => ({
      marginTop: '1.25rem',
      background: isCopied ? '#34C759' : 'transparent',
      color: isCopied ? '#FFFFFF' : '#007AFF',
      border: isCopied ? 'none' : '1px solid #007AFF',
      padding: '0.6rem 1.5rem',
      borderRadius: '6px',
      fontSize: '0.9rem',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.4rem',
      transition: 'all 0.2s ease'
    })
  };

  return (
    <div style={styles.container}>
      
      <div style={styles.header}>
        <img src="/visionx-logo.png" alt="VisionX" style={{ height: '32px', marginBottom: '0.25rem' }} />
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
                onFocus={(e) => e.target.style.borderColor = '#007AFF'}
                onBlur={(e) => e.target.style.borderColor = '#D2D2D7'}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Institution</label>
              <input 
                type="text" name="schoolName" required 
                value={formData.schoolName} onChange={handleChange} 
                style={styles.input} 
                placeholder="VisionX Academy"
                onFocus={(e) => e.target.style.borderColor = '#007AFF'}
                onBlur={(e) => e.target.style.borderColor = '#D2D2D7'}
              />
            </div>
          </div>

          {roleType === 'STUDENT' ? (
            <div style={styles.grid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Class</label>
                <select 
                  name="className" required 
                  value={formData.className} onChange={handleChange} 
                  style={{...styles.input, appearance: 'none', background: 'transparent'}}
                  onFocus={(e) => e.target.style.borderColor = '#007AFF'}
                  onBlur={(e) => e.target.style.borderColor = '#D2D2D7'}
                >
                  <option value="" disabled>Select Grade Level</option>
                  <option value="Nursery">Nursery</option>
                  <option value="LKG">LKG</option>
                  <option value="UKG">UKG</option>
                  <option value="Class 1">Class 1</option>
                  <option value="Class 5">Class 5</option>
                  <option value="Class 10">Class 10</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Section (Optional)</label>
                <input 
                  type="text" name="section" 
                  value={formData.section} onChange={handleChange} 
                  style={styles.input} placeholder="e.g. A"
                  onFocus={(e) => e.target.style.borderColor = '#007AFF'}
                  onBlur={(e) => e.target.style.borderColor = '#D2D2D7'}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Admission Number <span style={{ color: '#FF3B30' }}>*</span></label>
                <input 
                  type="text" name="admissionNumber" required
                  value={formData.admissionNumber} onChange={handleChange} 
                  style={styles.input} placeholder="e.g. 1029"
                  onFocus={(e) => e.target.style.borderColor = '#007AFF'}
                  onBlur={(e) => e.target.style.borderColor = '#D2D2D7'}
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
                  style={styles.input} placeholder="e.g. Mathematics"
                  onFocus={(e) => e.target.style.borderColor = '#007AFF'}
                  onBlur={(e) => e.target.style.borderColor = '#D2D2D7'}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Employee ID <span style={{ color: '#FF3B30' }}>*</span></label>
                <input 
                  type="text" name="employeeId" required
                  value={formData.employeeId} onChange={handleChange} 
                  style={styles.input} placeholder="e.g. EMP405"
                  onFocus={(e) => e.target.style.borderColor = '#007AFF'}
                  onBlur={(e) => e.target.style.borderColor = '#D2D2D7'}
                />
              </div>
            </div>
          )}

          <div style={{...styles.inputGroup, maxWidth: '280px'}}>
            <label style={styles.label}>Validity Duration</label>
            <select 
              name="validityMonths" 
              value={formData.validityMonths} onChange={handleChange} 
              style={{...styles.input, appearance: 'none', background: 'transparent'}}
              onFocus={(e) => e.target.style.borderColor = '#007AFF'}
              onBlur={(e) => e.target.style.borderColor = '#D2D2D7'}
            >
              <option value="3">3 Months</option>
              <option value="6">6 Months</option>
              <option value="12">12 Months</option>
            </select>
          </div>

          <button type="submit" style={styles.submitButton} disabled={loading}>
            {loading ? 'Processing...' : 'Generate Credentials'}
          </button>
        </form>
      </div>

      {successData && (
        <div style={styles.successCard}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '500', color: '#1D1D1F', margin: '0 0 0.25rem 0' }}>Success</h3>
            <p style={{ color: '#86868B', margin: 0, fontSize: '0.9rem' }}>Credentials are ready for {successData.role.toLowerCase()}.</p>
          </div>

          <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'left' }}>
            <div style={styles.dataRow}>
              <span style={styles.dataLabel}>Login ID</span>
              <span style={styles.dataValue}>{successData.loginId}</span>
            </div>
            <div style={styles.dataRow}>
              <span style={styles.dataLabel}>Password</span>
              <span style={styles.dataValue}>{successData.password}</span>
            </div>
            <div style={{...styles.dataRow, borderBottom: 'none'}}>
              <span style={styles.dataLabel}>Valid Until</span>
              <span style={{...styles.dataValue, color: '#FF3B30'}}>{new Date(successData.expiryDate).toLocaleDateString()}</span>
            </div>
          </div>

          <button onClick={handleCopy} style={styles.copyBtn(copied)}>
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}

    </div>
  );
};

export default GenerateId;
