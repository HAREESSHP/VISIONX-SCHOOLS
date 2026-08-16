import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Search, 
  MoreVertical, 
  Trash2, 
  KeyRound, 
  Ban,
  AlertTriangle,
  ChevronDown
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

  // Ultra-Minimalist Styles
  const styles = {
    container: {
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '2rem 1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: '2.5rem'
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
    filtersContainer: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
      marginBottom: '2rem',
      flexWrap: 'wrap'
    },
    searchWrapper: {
      position: 'relative',
      flex: '1 1 300px',
      background: '#F5F5F7',
      borderRadius: '8px'
    },
    searchInput: {
      width: '100%',
      padding: '0.65rem 1rem 0.65rem 2.5rem',
      border: 'none',
      background: 'transparent',
      fontSize: '0.95rem',
      color: '#1D1D1F',
      outline: 'none',
      boxSizing: 'border-box'
    },
    searchIcon: {
      position: 'absolute',
      left: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#86868B'
    },
    selectWrapper: {
      position: 'relative',
      background: '#F5F5F7',
      borderRadius: '8px',
      padding: '0 1rem'
    },
    select: {
      padding: '0.65rem 1.5rem 0.65rem 0',
      border: 'none',
      background: 'transparent',
      fontSize: '0.9rem',
      color: '#1D1D1F',
      fontWeight: '500',
      outline: 'none',
      appearance: 'none',
      cursor: 'pointer'
    },
    selectIcon: {
      position: 'absolute',
      right: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#86868B',
      pointerEvents: 'none'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      textAlign: 'left'
    },
    th: {
      padding: '1rem 0',
      borderBottom: '1px solid #E5E5EA',
      color: '#86868B',
      fontSize: '0.8rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    td: {
      padding: '1.25rem 0',
      borderBottom: '1px solid #F5F5F7',
      color: '#1D1D1F'
    },
    name: {
      fontWeight: '600',
      fontSize: '1rem'
    },
    subtext: {
      color: '#86868B',
      fontSize: '0.85rem',
      marginTop: '0.2rem'
    },
    loginId: {
      fontFamily: 'monospace',
      fontSize: '0.95rem',
      fontWeight: '500'
    },
    statusBadge: (status) => ({
      display: 'inline-block',
      padding: '0.25rem 0.75rem',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: '600',
      background: status === 'Active' ? '#E3F8E9' : status === 'Revoked' ? '#FEE7E6' : '#F5F5F7',
      color: status === 'Active' ? '#248A3D' : status === 'Revoked' ? '#D93025' : '#86868B'
    }),
    actionBtn: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: '#86868B',
      padding: '0.5rem',
      borderRadius: '50%',
      transition: 'background 0.2s ease'
    },
    dropdownMenu: {
      position: 'absolute',
      right: '2.5rem',
      top: '1rem',
      background: '#FFFFFF',
      border: '1px solid #E5E5EA',
      borderRadius: '12px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
      zIndex: 10,
      width: '180px',
      overflow: 'hidden'
    },
    dropdownItem: (isDanger) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      width: '100%',
      padding: '0.85rem 1.25rem',
      background: 'transparent',
      border: 'none',
      borderBottom: '1px solid #F5F5F7',
      textAlign: 'left',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '500',
      color: isDanger ? '#FF3B30' : '#1D1D1F',
      transition: 'background 0.2s ease'
    }),
    modalOverlay: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.4)',
      backdropFilter: 'blur(8px)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalContent: {
      background: '#FFFFFF',
      borderRadius: '16px',
      padding: '2.5rem',
      maxWidth: '400px',
      width: '90%',
      textAlign: 'center',
      boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
    },
    modalBtn: (isPrimary) => ({
      flex: 1,
      padding: '0.85rem',
      border: 'none',
      borderRadius: '8px',
      fontSize: '0.95rem',
      fontWeight: '600',
      cursor: 'pointer',
      background: isPrimary ? '#FF3B30' : '#F5F5F7',
      color: isPrimary ? '#FFFFFF' : '#1D1D1F',
      transition: 'opacity 0.2s ease'
    })
  };

  const renderModal = () => {
    if (!confirmModal.isOpen) return null;

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modalContent}>
          <AlertTriangle size={48} color="#FF3B30" style={{ marginBottom: '1.5rem' }} />
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', fontWeight: '600' }}>
            {confirmModal.type === 'delete' ? 'Delete Account?' : 'Revoke Access?'}
          </h3>
          <p style={{ margin: '0 0 2rem 0', color: '#86868B', fontSize: '0.95rem', lineHeight: '1.5' }}>
            Are you sure you want to {confirmModal.type} <strong>{confirmModal.user.name}</strong>?
            {confirmModal.type === 'delete' ? ' This action cannot be undone.' : ' They will no longer be able to log in.'}
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button style={styles.modalBtn(false)} onClick={() => setConfirmModal({ isOpen: false, type: '', user: null })}>
              Cancel
            </button>
            <button style={styles.modalBtn(true)} onClick={executeModalAction}>
              {confirmModal.type === 'delete' ? 'Delete' : 'Revoke'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {renderModal()}
      
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>{role === 'STUDENT' ? 'Students' : 'Teachers'} Directory</h2>
          <p style={styles.subtitle}>Manage accounts, access, and security settings.</p>
        </div>
      </div>

      <div style={styles.filtersContainer}>
        <div style={styles.searchWrapper}>
          <Search size={16} style={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search by name, ID, or school..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        
        <div style={styles.selectWrapper}>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={styles.select}>
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            <option value="Revoked">Revoked</option>
          </select>
          <ChevronDown size={14} style={styles.selectIcon} />
        </div>

        {role === 'STUDENT' && (
          <div style={styles.selectWrapper}>
            <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)} style={styles.select}>
              <option value="">All Classes</option>
              <option value="Nursery">Nursery</option>
              <option value="LKG">LKG</option>
              <option value="UKG">UKG</option>
              <option value="Class 1">Class 1</option>
              <option value="Class 5">Class 5</option>
              <option value="Class 10">Class 10</option>
            </select>
            <ChevronDown size={14} style={styles.selectIcon} />
          </div>
        )}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Identity</th>
              <th style={styles.th}>Credentials</th>
              <th style={styles.th}>{role === 'STUDENT' ? 'Grade' : 'Department'}</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Valid Until</th>
              <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ padding: '4rem 0', textAlign: 'center', color: '#86868B' }}>
                  Loading records...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '4rem 0', textAlign: 'center', color: '#86868B' }}>
                  No records found matching your criteria.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  <td style={styles.td}>
                    <div style={styles.name}>{user.name}</div>
                    <div style={styles.subtext}>
                      {user.schoolName || 'N/A'} {user.admissionNumber ? `• ${user.admissionNumber}` : ''}
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.loginId}>{user.loginId}</div>
                  </td>
                  <td style={styles.td}>
                    {role === 'STUDENT' ? (
                      <div>
                        <div style={styles.name}>{user.className || 'N/A'}</div>
                        {user.section && <div style={styles.subtext}>Sec: {user.section}</div>}
                      </div>
                    ) : (
                      <div style={styles.name}>{user.subject || 'N/A'}</div>
                    )}
                  </td>
                  <td style={styles.td}>
                    <span style={styles.statusBadge(user.status)}>
                      {user.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.name}>
                      {user.expiryDate ? new Date(user.expiryDate).toLocaleDateString() : 'Lifetime'}
                    </div>
                  </td>
                  <td style={{ ...styles.td, textAlign: 'right', position: 'relative' }}>
                    <button 
                      onClick={() => setActionMenuOpen(actionMenuOpen === user._id ? null : user._id)}
                      style={styles.actionBtn}
                      onMouseOver={(e) => e.currentTarget.style.background = '#F5F5F7'}
                      onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <MoreVertical size={20} />
                    </button>
                    
                    {actionMenuOpen === user._id && (
                      <div style={styles.dropdownMenu}>
                        <button 
                          onClick={() => handleAction('reset', user._id)}
                          style={styles.dropdownItem(false)}
                          onMouseOver={(e) => e.currentTarget.style.background = '#F5F5F7'}
                          onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <KeyRound size={16} /> Reset Password
                        </button>
                        {user.status !== 'Revoked' && (
                          <button 
                            onClick={() => setConfirmModal({ isOpen: true, type: 'revoke', user })}
                            style={styles.dropdownItem(true)}
                            onMouseOver={(e) => e.currentTarget.style.background = '#FEE7E6'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                          >
                            <Ban size={16} /> Revoke Access
                          </button>
                        )}
                        <button 
                          onClick={() => setConfirmModal({ isOpen: true, type: 'delete', user })}
                          style={styles.dropdownItem(true)}
                          onMouseOver={(e) => e.currentTarget.style.background = '#FEE7E6'}
                          onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <Trash2 size={16} /> Delete User
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
  );
};

export default UserList;
