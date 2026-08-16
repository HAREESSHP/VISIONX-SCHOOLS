import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Lock, Building, Save } from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();

  return (
    <div className="admin-settings">
      <div className="admin-page-header">
        <div>
          <h2>Platform Settings</h2>
          <p>Manage administrator profile and global preferences.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', maxWidth: '800px' }}>
        
        <div className="admin-card">
          <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--admin-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            <User size={20} color="var(--admin-primary)" />
            Admin Profile
          </h3>
          
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Administrator Name</label>
              <input type="text" defaultValue={user?.name || 'Administrator'} />
            </div>
            <div className="admin-form-group">
              <label>Username</label>
              <input type="text" defaultValue={user?.loginId} disabled style={{ background: '#F1F5F9', cursor: 'not-allowed' }} />
            </div>
          </div>
          
          <button className="admin-btn admin-btn-primary">
            <Save size={18} /> Save Profile
          </button>
        </div>

        <div className="admin-card">
          <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--admin-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            <Lock size={20} color="var(--admin-primary)" />
            Change Password
          </h3>
          
          <div className="admin-form-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="admin-form-group" style={{ maxWidth: '400px' }}>
              <label>Current Password</label>
              <input type="password" placeholder="••••••••" />
            </div>
            <div className="admin-form-group" style={{ maxWidth: '400px' }}>
              <label>New Password</label>
              <input type="password" placeholder="••••••••" />
            </div>
          </div>
          
          <button className="admin-btn admin-btn-primary" style={{ marginTop: '1rem' }}>
            <Save size={18} /> Update Password
          </button>
        </div>

        <div className="admin-card">
          <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--admin-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            <Building size={20} color="var(--admin-primary)" />
            Platform Details
          </h3>
          
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Platform Name</label>
              <input type="text" defaultValue="VisionX Spoken English" />
            </div>
          </div>
          
          <button className="admin-btn admin-btn-primary">
            <Save size={18} /> Save Settings
          </button>
        </div>

      </div>
    </div>
  );
};

export default Settings;
