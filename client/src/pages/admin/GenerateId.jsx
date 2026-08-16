import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserPlus, Copy, CheckCircle2, ShieldCheck, GraduationCap, Briefcase } from 'lucide-react';

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

  return (
    <div className="admin-generate-id">
      <div className="admin-page-header">
        <div>
          <h2>Generate Credentials</h2>
          <p>Create new, secure login accounts for students and teachers.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Form Column */}
        <div className="admin-card" style={{ flex: '1 1 500px' }}>
          
          {/* Segmented Control for Role Selection */}
          <div style={{ 
            display: 'flex', 
            background: 'var(--admin-bg)', 
            padding: '0.35rem', 
            borderRadius: 'var(--admin-radius-md)', 
            marginBottom: '2rem',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
          }}>
            <button 
              onClick={() => setRoleType('STUDENT')}
              style={{
                flex: 1, padding: '0.75rem', borderRadius: 'var(--admin-radius-sm)', border: 'none',
                background: roleType === 'STUDENT' ? 'var(--admin-surface)' : 'transparent',
                color: roleType === 'STUDENT' ? 'var(--admin-text)' : 'var(--admin-text-light)',
                boxShadow: roleType === 'STUDENT' ? 'var(--admin-shadow-sm)' : 'none',
                fontWeight: 600, cursor: 'pointer', transition: 'var(--admin-transition)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
              }}
            >
              <GraduationCap size={18} color={roleType === 'STUDENT' ? 'var(--admin-primary)' : 'currentColor'} />
              Student ID
            </button>
            <button 
              onClick={() => setRoleType('TEACHER')}
              style={{
                flex: 1, padding: '0.75rem', borderRadius: 'var(--admin-radius-sm)', border: 'none',
                background: roleType === 'TEACHER' ? 'var(--admin-surface)' : 'transparent',
                color: roleType === 'TEACHER' ? 'var(--admin-text)' : 'var(--admin-text-light)',
                boxShadow: roleType === 'TEACHER' ? 'var(--admin-shadow-sm)' : 'none',
                fontWeight: 600, cursor: 'pointer', transition: 'var(--admin-transition)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
              }}
            >
              <Briefcase size={18} color={roleType === 'TEACHER' ? 'var(--admin-primary)' : 'currentColor'} />
              Teacher ID
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label>Full Name *</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g. John Doe" />
              </div>
              <div className="admin-form-group">
                <label>School Name *</label>
                <input type="text" name="schoolName" required value={formData.schoolName} onChange={handleChange} placeholder="e.g. VisionX Academy" />
              </div>
            </div>

            {roleType === 'STUDENT' ? (
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Class *</label>
                  <select name="className" required value={formData.className} onChange={handleChange}>
                    <option value="">Select Class</option>
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
                <div className="admin-form-group">
                  <label>Section</label>
                  <input type="text" name="section" value={formData.section} onChange={handleChange} placeholder="e.g. A" />
                </div>
                <div className="admin-form-group">
                  <label>Admission Number</label>
                  <input type="text" name="admissionNumber" value={formData.admissionNumber} onChange={handleChange} placeholder="e.g. ADM1029" />
                </div>
              </div>
            ) : (
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Subject *</label>
                  <input type="text" name="subject" required value={formData.subject} onChange={handleChange} placeholder="e.g. English" />
                </div>
                <div className="admin-form-group">
                  <label>Employee ID</label>
                  <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} placeholder="e.g. EMP405" />
                </div>
              </div>
            )}

            <div className="admin-form-group" style={{ marginBottom: '2.5rem', maxWidth: '300px' }}>
              <label>Validity Duration</label>
              <select name="validityMonths" value={formData.validityMonths} onChange={handleChange}>
                <option value="3">3 Months (Trial)</option>
                <option value="6">6 Months (Half Year)</option>
                <option value="12">1 Year (Full Session)</option>
              </select>
            </div>

            <button type="submit" className="admin-btn admin-btn-primary" disabled={loading} style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}>
              <UserPlus size={20} />
              {loading ? 'Generating...' : `Generate ${roleType === 'STUDENT' ? 'Student' : 'Teacher'} ID`}
            </button>
          </form>
        </div>

        {/* Premium Result Column */}
        {successData && (
          <div className="admin-card" style={{ flex: '1 1 350px', background: 'linear-gradient(135deg, #EEF2FF 0%, #FFFFFF 100%)', border: '1px solid #C7D2FE', boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid #E0E7FF', paddingBottom: '1rem' }}>
              <div style={{ width: '40px', height: '40px', background: 'var(--admin-primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 style={{ margin: 0, color: 'var(--admin-text)', fontSize: '1.25rem' }}>Access Granted</h3>
                <p style={{ margin: 0, color: 'var(--admin-primary)', fontSize: '0.85rem', fontWeight: 600 }}>Credentials Generated Successfully</p>
              </div>
            </div>
            
            <div style={{ background: '#FFF', padding: '1.5rem', borderRadius: 'var(--admin-radius-md)', border: '1px dashed #A5B4FC', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#EEF2FF', padding: '0 0.5rem', color: '#4F46E5', fontSize: '0.75rem', fontWeight: 700, borderRadius: '12px' }}>
                CONFIDENTIAL
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-lighter)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Login ID</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--admin-text)', letterSpacing: '0.02em', background: 'var(--admin-bg)', padding: '0.5rem', borderRadius: 'var(--admin-radius-sm)', marginTop: '0.25rem', userSelect: 'all' }}>
                  {successData.loginId}
                </div>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-lighter)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Temporary Password</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--admin-text)', letterSpacing: '0.02em', background: 'var(--admin-bg)', padding: '0.5rem', borderRadius: 'var(--admin-radius-sm)', marginTop: '0.25rem', userSelect: 'all' }}>
                  {successData.password}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid var(--admin-border)', paddingTop: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--admin-text-lighter)', fontWeight: 600, textTransform: 'uppercase' }}>Role</span>
                  <div style={{ fontWeight: 600, color: 'var(--admin-text)' }}>{successData.role}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--admin-text-lighter)', fontWeight: 600, textTransform: 'uppercase' }}>Valid Until</span>
                  <div style={{ fontWeight: 600, color: 'var(--admin-danger)' }}>{new Date(successData.expiryDate).toLocaleDateString()}</div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleCopy}
              className="admin-btn"
              style={{ 
                width: '100%', marginTop: '1.5rem', 
                background: copied ? 'var(--admin-success)' : 'white', 
                color: copied ? 'white' : 'var(--admin-primary)',
                border: copied ? 'none' : '1px solid var(--admin-primary)',
                boxShadow: 'var(--admin-shadow-sm)'
              }}
            >
              {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
              {copied ? 'Copied to Clipboard!' : 'Copy Credentials'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateId;
