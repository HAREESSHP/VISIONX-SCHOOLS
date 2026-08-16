import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  GraduationCap, 
  KeyRound, 
  AlertCircle,
  Activity
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
        const response = await fetch('http://localhost:5000/api/admin/analytics', {
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
    { title: 'Total Students', value: stats.totalStudents, icon: <GraduationCap size={24} />, color: 'var(--admin-primary)' },
    { title: 'Total Teachers', value: stats.totalTeachers, icon: <Users size={24} />, color: '#8B5CF6' },
    { title: 'Active IDs', value: stats.activeUsers, icon: <KeyRound size={24} />, color: 'var(--admin-success)' },
    { title: 'Revoked IDs', value: stats.revokedUsers, icon: <AlertCircle size={24} />, color: 'var(--admin-danger)' },
  ];

  if (loading) {
    return <div className="admin-loading">Loading dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-page-header">
        <div>
          <h2>Dashboard Overview</h2>
          <p>Welcome back! Here's what's happening today.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {statCards.map((stat, index) => (
          <div key={index} className="admin-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ 
              width: '50px', height: '50px', borderRadius: 'var(--admin-radius-md)', 
              background: `${stat.color}15`, color: stat.color, 
              display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}>
              {stat.icon}
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800 }}>{stat.value}</h3>
              <p style={{ margin: 0, color: 'var(--admin-text-light)', fontSize: '0.9rem', fontWeight: 500 }}>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div className="admin-card">
          <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={20} color="var(--admin-primary)" />
            Recent Activity
          </h3>
          <div style={{ color: 'var(--admin-text-light)', fontStyle: 'italic', padding: '2rem', textAlign: 'center' }}>
            Activity tracking will appear here as users log in.
          </div>
        </div>

        <div className="admin-card">
          <h3 style={{ marginTop: 0 }}>System Alerts</h3>
          {stats.expiredUsers > 0 ? (
            <div style={{ padding: '1rem', background: 'var(--admin-warning-light)', color: 'var(--admin-warning)', borderRadius: 'var(--admin-radius-sm)', fontWeight: 500 }}>
              {stats.expiredUsers} accounts have expired.
            </div>
          ) : (
            <p style={{ color: 'var(--admin-text-light)' }}>All systems normal. No pending alerts.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
