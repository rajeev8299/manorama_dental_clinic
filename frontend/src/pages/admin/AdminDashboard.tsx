import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, MessageSquare, Clock } from 'lucide-react';
import styles from './AdminDashboard.module.css';
import { supabase } from '../../lib/supabase';

interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  totalAppointments: number;
  pendingAppointments: number;
  confirmedAppointments: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    newLeads: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
    confirmedAppointments: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      // Fetch Leads (Contact Messages)
      const { data: leads, error: leadsError } = await supabase
        .from('contact_messages')
        .select('status', { count: 'exact' });
        
      if (leadsError) throw leadsError;

      // Fetch Appointments
      const { data: appointments, error: apptError } = await supabase
        .from('appointments')
        .select('status', { count: 'exact' });

      if (apptError) throw apptError;

      // Calculate stats
      const totalLeads = leads?.length || 0;
      const newLeads = leads?.filter(l => (l.status || 'new').toLowerCase() === 'new').length || 0;
      
      const totalAppointments = appointments?.length || 0;
      const pendingAppointments = appointments?.filter(a => !a.status || a.status.toLowerCase() === 'pending').length || 0;
      const confirmedAppointments = appointments?.filter(a => a.status?.toLowerCase() === 'confirmed').length || 0;

      setStats({
        totalLeads,
        newLeads,
        totalAppointments,
        pendingAppointments,
        confirmedAppointments
      });
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Unable to load dashboard statistics. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingState}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '20px', height: '20px', border: '2px solid var(--admin-border)', borderTopColor: 'var(--admin-accent)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <span>Loading dashboard statistics...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '1.5rem', backgroundColor: 'var(--admin-danger-bg)', color: 'var(--admin-danger)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className={styles.dashboardGrid}>
        {/* Appointments Stats */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <h3 className={styles.statTitle}>Pending Appointments</h3>
            <div className={styles.statIcon} style={{ backgroundColor: 'var(--admin-warning-bg)', color: 'var(--admin-warning)' }}>
              <Clock size={20} />
            </div>
          </div>
          <p className={styles.statValue}>{stats.pendingAppointments}</p>
          <p className={styles.statSubtext}>Out of {stats.totalAppointments} total</p>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <h3 className={styles.statTitle}>Confirmed Appts</h3>
            <div className={styles.statIcon} style={{ backgroundColor: 'var(--admin-success-bg)', color: 'var(--admin-success)' }}>
              <Calendar size={20} />
            </div>
          </div>
          <p className={styles.statValue}>{stats.confirmedAppointments}</p>
          <p className={styles.statSubtext}>Confirmed & Scheduled</p>
        </div>

        {/* Leads Stats */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <h3 className={styles.statTitle}>New Leads</h3>
            <div className={styles.statIcon} style={{ backgroundColor: 'var(--admin-active-bg)', color: 'var(--admin-accent)' }}>
              <MessageSquare size={20} />
            </div>
          </div>
          <p className={styles.statValue}>{stats.newLeads}</p>
          <p className={styles.statSubtext}>Require attention</p>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <h3 className={styles.statTitle}>Total Leads</h3>
            <div className={styles.statIcon} style={{ backgroundColor: 'var(--admin-hover)', color: 'var(--admin-text-muted)' }}>
              <Users size={20} />
            </div>
          </div>
          <p className={styles.statValue}>{stats.totalLeads}</p>
          <p className={styles.statSubtext}>All time messages</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div className={styles.recentSection}>
          <div className={styles.sectionHeader}>
            <h2>Quick Actions</h2>
          </div>
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link to="/admin/appointments" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: 'var(--admin-hover)', borderRadius: '8px', textDecoration: 'none', color: 'var(--admin-text)', fontWeight: 500 }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--admin-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--admin-accent)' }}>
                <Calendar size={20} />
              </div>
              <div>
                <div style={{ fontSize: '1rem' }}>Manage Appointments</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)', fontWeight: 400 }}>Review and update schedules</div>
              </div>
            </Link>
            
            <Link to="/admin/leads" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: 'var(--admin-hover)', borderRadius: '8px', textDecoration: 'none', color: 'var(--admin-text)', fontWeight: 500 }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--admin-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--admin-success)' }}>
                <MessageSquare size={20} />
              </div>
              <div>
                <div style={{ fontSize: '1rem' }}>Review Leads</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)', fontWeight: 400 }}>Respond to patient inquiries</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
