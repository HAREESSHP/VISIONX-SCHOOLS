import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BarChart, PieChart, Activity, Download } from 'lucide-react';

const Analytics = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/analytics', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok) {
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch analytics', error);
      }
    };
    fetchAnalytics();
  }, [token]);

  return (
    <div className="admin-analytics">
      <div className="admin-page-header">
        <div>
          <h2>Analytics & Reports</h2>
          <p>Detailed statistics of the platform usage and ID distribution.</p>
        </div>
        <button className="admin-btn admin-btn-primary">
          <Download size={18} />
          Export Report
        </button>
      </div>

      {!stats ? (
        <div className="admin-loading">Loading analytics...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          
          <div className="admin-card">
            <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <PieChart size={20} color="var(--admin-primary)" />
              User Distribution
            </h3>
            <div style={{ padding: '2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 500 }}>Students</span>
                <span className="admin-badge STUDENT">{stats.totalStudents}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 500 }}>Teachers</span>
                <span className="admin-badge TEACHER">{stats.totalTeachers}</span>
              </div>
            </div>
          </div>

          <div className="admin-card">
            <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={20} color="var(--admin-success)" />
              Account Status
            </h3>
            <div style={{ padding: '2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 500 }}>Active</span>
                <span className="admin-badge Active">{stats.activeUsers}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 500 }}>Expired</span>
                <span className="admin-badge Expired">{stats.expiredUsers}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 500 }}>Revoked</span>
                <span className="admin-badge Revoked">{stats.revokedUsers}</span>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Analytics;
