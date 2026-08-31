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
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2.5rem'
    },
    metricCard: {
      background: '#271A12',
      border: '1px solid rgba(222, 203, 181, 0.14)',
      borderRadius: '18px',
      padding: '1.75rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      boxShadow: '0 10px 28px rgba(0,0,0,0.35)'
    },
    metricValue: {
      fontSize: '2.5rem',
      fontWeight: '800',
      letterSpacing: '-0.03em',
      color: '#FFFFFF',
      lineHeight: '1'
    },
    metricLabel: {
      fontSize: '0.85rem',
      fontWeight: '700',
      color: 'var(--admin-gold)',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    sectionWrapper: {
      background: '#271A12',
      border: '1px solid rgba(222, 203, 181, 0.14)',
      borderRadius: '20px',
      padding: '2rem',
      marginBottom: '2rem',
      boxShadow: '0 12px 32px rgba(0,0,0,0.35)'
    },
    sectionTitle: {
      fontSize: '1.3rem',
      fontWeight: '800',
      fontFamily: 'var(--font-serif)',
      color: '#FFFFFF',
      marginBottom: '1.5rem',
      letterSpacing: '-0.01em'
    },
    barChartContainer: {
      marginBottom: '1.5rem'
    },
    barRow: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1.15rem'
    },
    barLabel: {
      width: '180px',
      fontSize: '0.92rem',
      color: '#FFFFFF',
      fontWeight: '600',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      paddingRight: '1rem'
    },
    barTrack: {
      flex: 1,
      height: '10px',
      background: 'rgba(245, 237, 224, 0.08)',
      border: '1px solid rgba(222, 203, 181, 0.12)',
      borderRadius: '6px',
      overflow: 'hidden',
      position: 'relative'
    },
    barFill: (percentage, color = '#D97736') => ({
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: `${percentage}%`,
      background: color === '#000000' ? 'linear-gradient(90deg, #B5602E, #D97736)' : color,
      borderRadius: '6px',
      transition: 'width 1s ease-out'
    }),
    barValue: {
      width: '50px',
      textAlign: 'right',
      fontSize: '0.95rem',
      fontWeight: '700',
      color: 'var(--admin-gold)',
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
          <div style={{ ...styles.metricValue, color: '#34D399' }}>{stats.activeUsers}</div>
        </div>
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>Revoked / Expired</div>
          <div style={{ ...styles.metricValue, color: '#F87171' }}>{stats.revokedUsers + stats.expiredUsers}</div>
        </div>
      </div>

      {stats.usersBySchool && stats.usersBySchool.length > 0 && (
        <div style={styles.sectionWrapper}>
          <h3 style={styles.sectionTitle}>Distribution by School</h3>
          <div style={styles.barChartContainer}>
            {stats.usersBySchool.map(school => {
              const percentage = (school.count / totalUsersInSchools) * 100;
              return (
                <div key={school.name} style={styles.barRow}>
                  <div style={styles.barLabel} title={school.name}>{school.name}</div>
                  <div style={styles.barTrack}>
                    <div style={styles.barFill(percentage, 'linear-gradient(90deg, #B5602E, #D97736)')}></div>
                  </div>
                  <div style={styles.barValue}>{school.count}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {stats.usersByClass && stats.usersByClass.length > 0 && (
        <div style={styles.sectionWrapper}>
          <h3 style={styles.sectionTitle}>Student Demographics (By Grade)</h3>
          <div style={styles.barChartContainer}>
            {stats.usersByClass.map(cls => {
              const percentage = (cls.count / totalStudentsInClasses) * 100;
              return (
                <div key={cls.name} style={styles.barRow}>
                  <div style={styles.barLabel}>{cls.name}</div>
                  <div style={styles.barTrack}>
                    <div style={styles.barFill(percentage, 'linear-gradient(90deg, #C4A369, #E5C388)')}></div>
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
