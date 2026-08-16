import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Trash2, 
  KeyRound, 
  Ban,
  AlertTriangle
} from 'lucide-react';

const UserList = ({ role }) => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterClass, setFilterClass] = useState('');
  
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: '', user: null });

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      // Build query string
      const params = new URLSearchParams({ role });
      if (filterStatus) params.append('status', filterStatus);
      if (filterClass) params.append('className', filterClass);
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`http://localhost:5000/api/admin/users?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, [role, filterStatus, filterClass, searchTerm, token]);

  // Debounce search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUsers();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, filterStatus, filterClass, fetchUsers]);

  const handleAction = async (type, userId) => {
    setActionMenuOpen(null);
    let url = '';
    let method = 'PUT';

    if (type === 'revoke') url = `/api/admin/users/${userId}/revoke`;
    if (type === 'reset') url = `/api/admin/users/${userId}/reset-password`;
    if (type === 'delete') {
      url = `/api/admin/users/${userId}`;
      method = 'DELETE';
    }

    try {
      const response = await fetch(`http://localhost:5000${url}`, {
        method,
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (response.ok) {
        if (type === 'reset') {
          alert(`Password reset successfully!\nNew Password: ${data.newPassword}`);
        } else {
          // Success (Revoke or Delete)
        }
        fetchUsers();
      } else {
        alert(data.message || 'Error performing action');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  const executeModalAction = () => {
    handleAction(confirmModal.type, confirmModal.user._id);
    setConfirmModal({ isOpen: false, type: '', user: null });
  };

  const renderModal = () => {
    if (!confirmModal.isOpen) return null;

    return (
      <div style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)'
      }}>
        <div className="admin-card" style={{ maxWidth: '400px', width: '90%', position: 'relative' }}>
          <div style={{ color: 'var(--admin-danger)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
            <AlertTriangle size={48} />
          </div>
          <h3 style={{ textAlign: 'center', marginTop: 0 }}>
            {confirmModal.type === 'delete' ? 'Delete Account?' : 'Revoke Access?'}
          </h3>
          <p style={{ textAlign: 'center', color: 'var(--admin-text-light)', marginBottom: '2rem' }}>
            Are you sure you want to {confirmModal.type} <strong>{confirmModal.user.name}</strong>?
            {confirmModal.type === 'delete' ? ' This action cannot be undone.' : ' They will no longer be able to log in.'}
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              className="admin-btn" 
              style={{ flex: 1, background: '#F1F5F9', color: 'var(--admin-text)' }}
              onClick={() => setConfirmModal({ isOpen: false, type: '', user: null })}
            >
              Cancel
            </button>
            <button 
              className="admin-btn" 
              style={{ flex: 1, background: 'var(--admin-danger)', color: 'white' }}
              onClick={executeModalAction}
            >
              {confirmModal.type === 'delete' ? 'Delete' : 'Revoke'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-user-list">
      {renderModal()}
      
      <div className="admin-page-header">
        <div>
          <h2>{role === 'STUDENT' ? 'Student' : 'Teacher'} Management</h2>
          <p>Manage {role.toLowerCase()} accounts, access, and settings.</p>
        </div>
      </div>

      <div className="admin-card" style={{ marginBottom: '1.5rem', padding: '1rem 1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-light)' }} />
            <input 
              type="text" 
              placeholder="Search by name, ID, or school..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem', border: '1px solid var(--admin-border)', borderRadius: 'var(--admin-radius-sm)' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ padding: '0.6rem 1rem', border: '1px solid var(--admin-border)', borderRadius: 'var(--admin-radius-sm)', background: '#FFF' }}
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
              <option value="Revoked">Revoked</option>
            </select>
            {role === 'STUDENT' && (
              <select 
                value={filterClass} 
                onChange={(e) => setFilterClass(e.target.value)}
                style={{ padding: '0.6rem 1rem', border: '1px solid var(--admin-border)', borderRadius: 'var(--admin-radius-sm)', background: '#FFF' }}
              >
                <option value="">All Classes</option>
                <option value="Nursery">Nursery</option>
                <option value="LKG">LKG</option>
                <option value="UKG">UKG</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 5">Class 5</option>
                <option value="Class 10">Class 10</option>
              </select>
            )}
          </div>
        </div>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'var(--admin-bg)', borderBottom: '1px solid var(--admin-border)' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--admin-text-light)', fontSize: '0.85rem', textTransform: 'uppercase' }}>User details</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--admin-text-light)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Login Info</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--admin-text-light)', fontSize: '0.85rem', textTransform: 'uppercase' }}>{role === 'STUDENT' ? 'Class/Section' : 'Subject'}</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--admin-text-light)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--admin-text-light)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Valid Until</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--admin-text-light)', fontSize: '0.85rem', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'var(--admin-text-light)' }}>
                    Loading records...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: 'var(--admin-text-light)' }}>
                    No records found matching your criteria.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} style={{ borderBottom: '1px solid var(--admin-border)', transition: 'background 0.2s', ':hover': { background: 'var(--admin-bg)' } }}>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ fontWeight: 600 }}>{user.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-light)' }}>
                        {user.schoolName || 'N/A'} {user.admissionNumber ? `• ${user.admissionNumber}` : ''}
                      </div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ fontFamily: 'monospace', background: 'var(--admin-bg)', padding: '0.2rem 0.5rem', borderRadius: '4px', display: 'inline-block' }}>
                        {user.loginId}
                      </div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      {role === 'STUDENT' ? (
                        <div>
                          <div>{user.className || 'N/A'}</div>
                          {user.section && <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-light)' }}>Sec: {user.section}</div>}
                        </div>
                      ) : (
                        user.subject || 'N/A'
                      )}
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span className={`admin-badge ${user.status}`}>
                        {user.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem' }}>
                      {user.expiryDate ? new Date(user.expiryDate).toLocaleDateString() : 'Lifetime'}
                    </td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right', position: 'relative' }}>
                      <button 
                        onClick={() => setActionMenuOpen(actionMenuOpen === user._id ? null : user._id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--admin-text-light)' }}
                      >
                        <MoreVertical size={18} />
                      </button>
                      
                      {actionMenuOpen === user._id && (
                        <div style={{ 
                          position: 'absolute', right: '2.5rem', top: '1rem', 
                          background: '#FFF', border: '1px solid var(--admin-border)', 
                          borderRadius: 'var(--admin-radius-sm)', boxShadow: 'var(--admin-shadow-md)',
                          zIndex: 10, width: '160px', overflow: 'hidden'
                        }}>
                          <button 
                            onClick={() => handleAction('reset', user._id)}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '0.75rem 1rem', background: 'none', border: 'none', borderBottom: '1px solid var(--admin-border)', textAlign: 'left', cursor: 'pointer', fontSize: '0.85rem' }}
                          >
                            <KeyRound size={14} /> Reset Password
                          </button>
                          {user.status !== 'Revoked' && (
                            <button 
                              onClick={() => setConfirmModal({ isOpen: true, type: 'revoke', user })}
                              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '0.75rem 1rem', background: 'none', border: 'none', borderBottom: '1px solid var(--admin-border)', textAlign: 'left', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--admin-warning)' }}
                            >
                              <Ban size={14} /> Revoke Access
                            </button>
                          )}
                          <button 
                            onClick={() => setConfirmModal({ isOpen: true, type: 'delete', user })}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '0.75rem 1rem', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--admin-danger)' }}
                          >
                            <Trash2 size={14} /> Delete User
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
