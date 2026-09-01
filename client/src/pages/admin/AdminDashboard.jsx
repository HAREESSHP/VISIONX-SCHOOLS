import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../services/api';
import { 
  Users, 
  GraduationCap, 
  KeyRound, 
  AlertCircle,
  Activity,
  ArrowUpRight,
  Clock,
  UserPlus,
  CheckCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    activeUsers: 0,
    expiredUsers: 0,
    revokedUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`${API_URL}/admin/analytics`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch analytics', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [token]);

  const statCards = [
    { 
      title: 'Total Students', 
      value: stats.totalStudents, 
      icon: <GraduationCap size={28} />, 
      color: '#C4A369', // Golden Tan
      bg: 'linear-gradient(135deg, rgba(196, 163, 105, 0.2) 0%, rgba(181, 96, 46, 0.25) 100%)',
      border: '1px solid rgba(196, 163, 105, 0.35)'
    },
    { 
      title: 'Total Teachers', 
      value: stats.totalTeachers, 
      icon: <Users size={28} />, 
      color: '#A78BFA', // Purple
      bg: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(109, 40, 217, 0.25) 100%)',
      border: '1px solid rgba(139, 92, 246, 0.35)'
    },
    { 
      title: 'Active IDs', 
      value: stats.activeUsers, 
      icon: <KeyRound size={28} />, 
      color: '#34D399', // Emerald
      bg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.25) 100%)',
      border: '1px solid rgba(16, 185, 129, 0.35)'
    },
    { 
      title: 'Revoked IDs', 
      value: stats.revokedUsers, 
      icon: <AlertCircle size={28} />, 
      color: '#F87171', // Red
      bg: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.25) 100%)',
      border: '1px solid rgba(239, 68, 68, 0.35)'
    },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', color: 'var(--admin-text-light)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <Activity size={32} className="animate-spin" style={{ color: 'var(--admin-primary)' }} />
          <p style={{ fontWeight: 600, color: 'var(--admin-text-light)' }}>Loading Dashboard Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-page-header">
        <div>
          <h2>Dashboard Overview</h2>
          <p>Welcome back! Here's a quick summary of your platform's activity.</p>
        </div>
        <Link to="/admin/generate" className="admin-btn admin-btn-primary" style={{ textDecoration: 'none' }}>
          <UserPlus size={18} />
          Generate New ID
        </Link>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
        gap: '1.5rem', 
        marginBottom: '2.5rem' 
      }}>
        {statCards.map((stat, index) => (
          <div key={index} className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ 
                width: '56px', height: '56px', borderRadius: '16px', 
                background: stat.bg, color: stat.color, 
                border: stat.border,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
              }}>
                {stat.icon}
              </div>
              <div style={{ background: 'rgba(245, 237, 224, 0.08)', padding: '0.3rem 0.65rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.78rem', fontWeight: 700, color: '#34D399', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                <ArrowUpRight size={14} /> +12%
              </div>
            </div>
            <div>
              <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#FFFFFF' }}>
                {stat.value}
              </h3>
              <p style={{ margin: 0, color: 'var(--admin-text-light)', fontSize: '0.95rem', fontWeight: 600 }}>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', color: '#FFFFFF' }}>
              <Activity size={20} color="var(--admin-primary)" />
              Recent Activity
            </h3>
            <button className="admin-btn" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', background: 'rgba(245, 237, 224, 0.08)', color: '#FFFFFF', border: '1px solid var(--admin-border)' }}>View All</button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Mock Activity Items */}
            {[1, 2, 3].map((_, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', paddingBottom: '1rem', borderBottom: i !== 2 ? '1px solid var(--admin-border)' : 'none' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--admin-primary-light)', color: 'var(--admin-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <UserPlus size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem', fontWeight: 500, color: 'var(--admin-text)' }}>New student ID generated for <strong>Rahul Sharma</strong></p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: 'var(--admin-text-lighter)' }}>
                    <Clock size={12} /> {i + 1} hour{i > 0 ? 's' : ''} ago
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>System Alerts</h3>
            <span className="admin-badge Active">All Systems Operational</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {stats.expiredUsers > 0 ? (
              <div style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'var(--admin-warning-light)', border: '1px solid #FDE68A', borderRadius: 'var(--admin-radius-md)' }}>
                <AlertCircle color="#D97706" size={24} style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', color: '#92400E', fontSize: '0.95rem' }}>Action Required</h4>
                  <p style={{ margin: 0, color: '#B45309', fontSize: '0.85rem' }}>{stats.expiredUsers} user accounts have expired and require renewal or deletion.</p>
                </div>
              </div>
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--admin-text-light)', background: 'var(--admin-bg)', borderRadius: 'var(--admin-radius-md)' }}>
                <CheckCircle size={32} style={{ color: 'var(--admin-success)', opacity: 0.5, marginBottom: '0.5rem', display: 'inline-block' }} />
                <p style={{ margin: 0, fontWeight: 500 }}>No pending alerts</p>
                <p style={{ margin: 0, fontSize: '0.85rem' }}>Everything is running smoothly.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
