import { useState } from 'react';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const [stats] = useState({ appointments: 142, newPatients: 38, revenue: 84500, rating: 4.8 });

  return (
    <div>
      <h1 className={styles.pageTitle}>Analytics & Revenue Dashboard</h1>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Revenue (This Month)</h3>
          <p className={styles.statNumber}>₹{stats.revenue.toLocaleString()}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Total Appointments</h3>
          <p className={styles.statNumber}>{stats.appointments}</p>
        </div>
        <div className={styles.statCard}>
          <h3>New Patients</h3>
          <p className={styles.statNumber}>+{stats.newPatients}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Average Rating</h3>
          <p className={styles.statNumber}>{stats.rating} ⭐️</p>
        </div>
      </div>
      
      <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '1rem', color: '#0F2A4A' }}>Top Services (This Month)</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
              <span>Root Canal Treatment</span> <strong>45 patients</strong>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
              <span>Teeth Whitening</span> <strong>32 patients</strong>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
              <span>Dental Implants</span> <strong>12 patients</strong>
            </li>
          </ul>
        </div>
        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '1rem', color: '#0F2A4A' }}>Recent Activity</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ color: '#64748b' }}>✅ Rahul Verma's appointment completed</li>
            <li style={{ color: '#64748b' }}>⭐ New 5-star review from Sneha Sharma</li>
            <li style={{ color: '#64748b' }}>📅 3 new appointments booked for tomorrow</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
