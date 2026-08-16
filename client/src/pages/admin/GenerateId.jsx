import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserPlus, Copy, CheckCircle2 } from 'lucide-react';

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
          <p>Create new login accounts for students and teachers.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Form Column */}
        <div className="admin-card" style={{ flex: '1 1 500px' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <button 
              className={`admin-btn ${roleType === 'STUDENT' ? 'admin-btn-primary' : ''}`}
              style={roleType !== 'STUDENT' ? { border: '1px solid var(--admin-border)' } : {}}
              onClick={() => setRoleType('STUDENT')}
            >
              Student ID
            </button>
            <button 
              className={`admin-btn ${roleType === 'TEACHER' ? 'admin-btn-primary' : ''}`}
              style={roleType !== 'TEACHER' ? { border: '1px solid var(--admin-border)' } : {}}
              onClick={() => setRoleType('TEACHER')}
            >
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
                <input type="text" name="schoolName" required value={formData.schoolName} onChange={handleChange} placeholder="VisionX Academy" />
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

            <div className="admin-form-group" style={{ marginBottom: '2rem', maxWidth: '240px' }}>
              <label>Validity Duration</label>
              <select name="validityMonths" value={formData.validityMonths} onChange={handleChange}>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="12">1 Year</option>
              </select>
            </div>

            <button type="submit" className="admin-btn admin-btn-primary" disabled={loading} style={{ width: '100%', padding: '0.8rem' }}>
              <UserPlus size={18} />
              {loading ? 'Generating...' : `Generate ${roleType === 'STUDENT' ? 'Student' : 'Teacher'} ID`}
            </button>
          </form>
        </div>

        {/* Result Column */}
        {successData && (
          <div className="admin-card" style={{ flex: '1 1 350px', background: 'var(--admin-primary-light)', borderColor: '#BFDBFE' }}>
            <h3 style={{ marginTop: 0, color: 'var(--admin-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={24} />
              Credentials Generated!
            </h3>
            
            <div style={{ background: '#FFF', padding: '1.5rem', borderRadius: 'var(--admin-radius-sm)', border: '1px solid #BFDBFE', marginTop: '1.5rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--admin-text-light)', fontWeight: 600, textTransform: 'uppercase' }}>Username</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--admin-text)', letterSpacing: '0.05em' }}>
                  {successData.loginId}
                </div>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--admin-text-light)', fontWeight: 600, textTransform: 'uppercase' }}>Password</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--admin-text)', letterSpacing: '0.05em' }}>
                  {successData.password}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '2rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)', fontWeight: 600, textTransform: 'uppercase' }}>Role</span>
                  <div style={{ fontWeight: 600 }}>{successData.role}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)', fontWeight: 600, textTransform: 'uppercase' }}>Valid Until</span>
                  <div style={{ fontWeight: 600 }}>{new Date(successData.expiryDate).toLocaleDateString()}</div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleCopy}
              className="admin-btn"
              style={{ width: '100%', marginTop: '1rem', background: '#FFF', border: '1px solid #BFDBFE', color: 'var(--admin-primary)' }}
            >
              {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
              {copied ? 'Copied to Clipboard' : 'Copy Credentials'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateId;
