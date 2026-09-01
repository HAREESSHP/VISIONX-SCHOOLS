import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../services/api';
import { 
  Search, 
  MoreVertical, 
  Trash2, 
  KeyRound, 
  Ban,
  AlertTriangle,
  ChevronDown,
  Download
} from 'lucide-react';

const UserList = ({ role }) => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterClass, setFilterClass] = useState('');
  
  const [schools, setSchools] = useState([]);
  const [filterSchool, setFilterSchool] = useState('');
  
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: '', user: null });

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ role });
      if (filterStatus) params.append('status', filterStatus);
      if (filterClass) params.append('className', filterClass);
      if (filterSchool) params.append('schoolName', filterSchool);
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`${API_URL}/admin/users?${params}`, {
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
  }, [role, filterStatus, filterClass, filterSchool, searchTerm, token]);

  useEffect(() => {
    // Fetch unique schools for filter dropdown
    const fetchSchools = async () => {
      try {
        const response = await fetch(`${API_URL}/admin/schools`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok) {
          setSchools(data);
        }
      } catch (err) {
        console.error('Error fetching schools:', err);
      }
    };
    fetchSchools();
  }, [token]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUsers();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, filterStatus, filterClass, filterSchool, fetchUsers]);

  const handleAction = async (type, userId) => {
    setActionMenuOpen(null);
    let url = '';
    let method = 'PUT';

    if (type === 'revoke') url = `/admin/users/${userId}/revoke`;
    if (type === 'reset') url = `/admin/users/${userId}/reset-password`;
    if (type === 'delete') {
      url = `/admin/users/${userId}`;
      method = 'DELETE';
    }

    try {
      const response = await fetch(`${API_URL}${url}`, {
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

  const handleExport = () => {
    if (users.length === 0) {
      alert('No users to export');
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Header Row
    if (role === 'STUDENT') {
      csvContent += "Name,School,Class,Section,Admission Number,Login ID,Password\n";
    } else {
      csvContent += "Name,School,Subject,Employee ID,Login ID,Password\n";
    }

    // Data Rows
    users.forEach(user => {
      const name = `"${user.name || ''}"`;
      const school = `"${user.schoolName || ''}"`;
      const loginId = `"${user.loginId || ''}"`;
      
      let password = '';
      if (role === 'STUDENT') {
        const cls = `"${user.className || ''}"`;
        const sec = `"${user.section || ''}"`;
        const adm = `"${user.admissionNumber || ''}"`;
        password = user.admissionNumber ? `"vx@${user.admissionNumber}"` : '""';
        csvContent += `${name},${school},${cls},${sec},${adm},${loginId},${password}\n`;
      } else {
        const sub = `"${user.subject || ''}"`;
        const emp = `"${user.employeeId || ''}"`;
        password = user.employeeId ? `"vx@${user.employeeId}"` : '""';
        csvContent += `${name},${school},${sub},${emp},${loginId},${password}\n`;
      }
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${role.toLowerCase()}s_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Ultra-Minimalist Styles
  // Luxury Dark Admin Theme Styles
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '1rem 0'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: '2.5rem',
      flexWrap: 'wrap',
      gap: '1rem'
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
    exportBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'linear-gradient(135deg, #B5602E 0%, #8A431B 100%)',
      color: '#FFFFFF',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      padding: '0.75rem 1.4rem',
      borderRadius: '9999px',
      fontSize: '0.92rem',
      fontWeight: '700',
      cursor: 'pointer',
      boxShadow: '0 4px 14px rgba(181, 96, 46, 0.35)',
      transition: 'all 0.2s ease'
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
      background: '#241810',
      border: '1.5px solid rgba(222, 203, 181, 0.18)',
      borderRadius: '12px'
    },
    searchInput: {
      width: '100%',
      padding: '0.75rem 1rem 0.75rem 2.65rem',
      border: 'none',
      background: 'transparent',
      fontSize: '0.95rem',
      color: '#FFFFFF',
      outline: 'none',
      boxSizing: 'border-box'
    },
    searchIcon: {
      position: 'absolute',
      left: '0.9rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'var(--admin-gold)'
    },
    selectWrapper: {
      position: 'relative',
      background: '#241810',
      border: '1.5px solid rgba(222, 203, 181, 0.18)',
      borderRadius: '12px',
      padding: '0 1rem'
    },
    select: {
      padding: '0.75rem 1.5rem 0.75rem 0',
      border: 'none',
      background: 'transparent',
      fontSize: '0.92rem',
      color: '#FFFFFF',
      fontWeight: '600',
      outline: 'none',
      appearance: 'none',
      cursor: 'pointer'
    },
    selectIcon: {
      position: 'absolute',
      right: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'var(--admin-gold)',
      pointerEvents: 'none'
    },
    tableWrapper: {
      background: '#271A12',
      border: '1px solid rgba(222, 203, 181, 0.14)',
      borderRadius: '18px',
      padding: '1.5rem',
      boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
      overflowX: 'auto'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      textAlign: 'left'
    },
    th: {
      padding: '1rem',
      borderBottom: '1px solid rgba(222, 203, 181, 0.18)',
      color: 'var(--admin-gold)',
      fontSize: '0.8rem',
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    td: {
      padding: '1.25rem 1rem',
      borderBottom: '1px solid rgba(222, 203, 181, 0.08)',
      color: '#FFFFFF'
    },
    name: {
      fontWeight: '700',
      fontSize: '1.02rem',
      color: '#FFFFFF'
    },
    subtext: {
      color: 'var(--admin-text-light)',
      fontSize: '0.86rem',
      marginTop: '0.2rem'
    },
    loginId: {
      fontFamily: 'monospace',
      fontSize: '0.95rem',
      fontWeight: '600',
      color: 'var(--admin-gold)',
      background: 'rgba(196, 163, 105, 0.12)',
      padding: '0.2rem 0.6rem',
      borderRadius: '6px',
      display: 'inline-block'
    },
    statusBadge: (status) => ({
      display: 'inline-block',
      padding: '0.3rem 0.8rem',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: '700',
      background: status === 'Active' ? 'rgba(16, 185, 129, 0.16)' : 'rgba(239, 68, 68, 0.16)',
      color: status === 'Active' ? '#34D399' : '#F87171',
      border: `1px solid ${status === 'Active' ? 'rgba(16, 185, 129, 0.35)' : 'rgba(239, 68, 68, 0.35)'}`
    }),
    actionBtn: {
      background: 'rgba(245, 237, 224, 0.06)',
      border: '1px solid rgba(222, 203, 181, 0.12)',
      cursor: 'pointer',
      color: 'var(--admin-text-light)',
      padding: '0.5rem',
      borderRadius: '50%',
      transition: 'all 0.2s ease'
    },
    dropdownMenu: {
      position: 'absolute',
      right: '2.5rem',
      top: '1rem',
      background: '#2B1E16',
      border: '1.5px solid rgba(222, 203, 181, 0.2)',
      borderRadius: '14px',
      boxShadow: '0 12px 36px rgba(0,0,0,0.6)',
      zIndex: 10,
      width: '190px',
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
      borderBottom: '1px solid rgba(222, 203, 181, 0.08)',
      textAlign: 'left',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
      color: isDanger ? '#F87171' : '#FFFFFF',
      transition: 'background 0.2s ease'
    }),
    modalOverlay: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.65)',
      backdropFilter: 'blur(8px)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalContent: {
      background: '#271A12',
      border: '1.5px solid rgba(222, 203, 181, 0.2)',
      borderRadius: '20px',
      padding: '2.5rem',
      maxWidth: '420px',
      width: '90%',
      textAlign: 'center',
      boxShadow: '0 24px 60px rgba(0,0,0,0.7)',
      color: '#FFFFFF'
    },
    modalBtn: (isPrimary) => ({
      flex: 1,
      padding: '0.85rem',
      border: 'none',
      borderRadius: '10px',
      fontSize: '0.95rem',
      fontWeight: '700',
      cursor: 'pointer',
      background: isPrimary ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)' : 'rgba(245, 237, 224, 0.1)',
      color: '#FFFFFF',
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
        <button 
          style={styles.exportBtn}
          onClick={handleExport}
          onMouseOver={(e) => e.currentTarget.style.background = '#333333'}
          onMouseOut={(e) => e.currentTarget.style.background = '#000000'}
        >
          <Download size={16} /> Export to CSV
        </button>
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
          <select value={filterSchool} onChange={(e) => setFilterSchool(e.target.value)} style={styles.select}>
            <option value="">All Schools</option>
            {schools.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <ChevronDown size={14} style={styles.selectIcon} />
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

      <div style={styles.tableWrapper}>
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
