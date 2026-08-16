import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Download } from 'lucide-react';

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
      marginBottom: '3rem'
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
    exportBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: '#000000',
      color: '#FFFFFF',
      border: 'none',
      padding: '0.65rem 1.25rem',
      borderRadius: '8px',
      fontSize: '0.9rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background 0.2s ease'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '1.5rem',
      marginBottom: '3rem'
    },
    metricCard: {
      background: '#F5F5F7',
      borderRadius: '12px',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    metricValue: {
      fontSize: '2.5rem',
      fontWeight: '600',
      letterSpacing: '-0.04em',
      color: '#1D1D1F',
      lineHeight: '1'
    },
    metricLabel: {
      fontSize: '0.9rem',
      fontWeight: '500',
      color: '#86868B',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1D1D1F',
      marginBottom: '1.5rem',
      letterSpacing: '-0.01em'
    },
    barChartContainer: {
      marginBottom: '3rem'
    },
    barRow: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1rem'
    },
    barLabel: {
      width: '180px',
      fontSize: '0.95rem',
      color: '#1D1D1F',
      fontWeight: '500',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      paddingRight: '1rem'
    },
    barTrack: {
      flex: 1,
      height: '8px',
      background: '#F5F5F7',
      borderRadius: '4px',
      overflow: 'hidden',
      position: 'relative'
    },
    barFill: (percentage, color = '#000000') => ({
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: `${percentage}%`,
      background: color,
      borderRadius: '4px',
      transition: 'width 1s ease-out'
    }),
    barValue: {
      width: '50px',
      textAlign: 'right',
      fontSize: '0.95rem',
      fontWeight: '600',
      color: '#1D1D1F',
      paddingLeft: '1rem'
    }
  };

  if (!stats) {
    return (
      <div style={{ ...styles.container, textAlign: 'center', color: '#86868B', paddingTop: '4rem' }}>
        Loading analytics...
      </div>
    );
  }

  // Calculate percentages for bars
  const totalUsersInSchools = stats.usersBySchool?.reduce((acc, curr) => acc + curr.count, 0) || 1;
  const totalStudentsInClasses = stats.usersByClass?.reduce((acc, curr) => acc + curr.count, 0) || 1;

  const handleExport = () => {
    // Basic export for analytics snapshot
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Metric,Value\n";
    csvContent += `Total Students,${stats.totalStudents}\n`;
    csvContent += `Total Teachers,${stats.totalTeachers}\n`;
    csvContent += `Active Users,${stats.activeUsers}\n`;
    csvContent += `Expired Users,${stats.expiredUsers}\n`;
    csvContent += `Revoked Users,${stats.revokedUsers}\n\n`;
    
    csvContent += "School Distribution,Count\n";
    stats.usersBySchool?.forEach(s => {
      csvContent += `"${s.name}",${s.count}\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `analytics_snapshot_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Analytics</h2>
          <p style={styles.subtitle}>Platform usage and credential distribution.</p>
        </div>
        <button 
          style={styles.exportBtn}
          onClick={handleExport}
          onMouseOver={(e) => e.currentTarget.style.background = '#333333'}
          onMouseOut={(e) => e.currentTarget.style.background = '#000000'}
        >
          <Download size={16} /> Export Report
        </button>
      </div>

      <div style={styles.grid}>
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>Total Students</div>
          <div style={styles.metricValue}>{stats.totalStudents}</div>
        </div>
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>Total Teachers</div>
          <div style={styles.metricValue}>{stats.totalTeachers}</div>
        </div>
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>Active Accounts</div>
          <div style={{ ...styles.metricValue, color: '#248A3D' }}>{stats.activeUsers}</div>
        </div>
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>Revoked / Expired</div>
          <div style={{ ...styles.metricValue, color: '#FF3B30' }}>{stats.revokedUsers + stats.expiredUsers}</div>
        </div>
      </div>

      {stats.usersBySchool && stats.usersBySchool.length > 0 && (
        <div style={styles.barChartContainer}>
          <h3 style={styles.sectionTitle}>Distribution by School</h3>
          <div>
            {stats.usersBySchool.map(school => {
              const percentage = (school.count / totalUsersInSchools) * 100;
              return (
                <div key={school.name} style={styles.barRow}>
                  <div style={styles.barLabel} title={school.name}>{school.name}</div>
                  <div style={styles.barTrack}>
                    <div style={styles.barFill(percentage, '#000000')}></div>
                  </div>
                  <div style={styles.barValue}>{school.count}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {stats.usersByClass && stats.usersByClass.length > 0 && (
        <div style={styles.barChartContainer}>
          <h3 style={styles.sectionTitle}>Student Demographics (By Grade)</h3>
          <div>
            {stats.usersByClass.map(cls => {
              const percentage = (cls.count / totalStudentsInClasses) * 100;
              return (
                <div key={cls.name} style={styles.barRow}>
                  <div style={styles.barLabel}>{cls.name}</div>
                  <div style={styles.barTrack}>
                    <div style={styles.barFill(percentage, '#86868B')}></div>
                  </div>
                  <div style={styles.barValue}>{cls.count}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};

export default Analytics;
