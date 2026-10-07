
import styles from './AdminDashboard.module.css';

const AdminReminders = () => {
  return (
    <div>
      <h1 className={styles.pageTitle}>WhatsApp & SMS Reminders</h1>
      
      <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: '#0F2A4A' }}>Quick Send Notification</h3>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <select style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}>
            <option>Select Patient...</option>
            <option>Rahul Verma (+91 9876543210)</option>
            <option>Sneha Sharma (+91 9123456789)</option>
          </select>
          <select style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}>
            <option>Select Template...</option>
            <option>Appointment Reminder (1 Day Before)</option>
            <option>Follow-up Checkup Reminder</option>
            <option>Payment Pending Alert</option>
          </select>
        </div>
        <button style={{ background: '#25D366', color: 'white', padding: '0.75rem 2rem', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Send via WhatsApp</button>
      </div>

      <h3 style={{ marginBottom: '1rem', color: '#0F2A4A' }}>Automated Reminders History</h3>
      <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', background: 'white', minWidth: '600px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
            <th style={{ padding: '1rem' }}>Patient Name</th>
            <th style={{ padding: '1rem' }}>Message Type</th>
            <th style={{ padding: '1rem' }}>Sent At</th>
            <th style={{ padding: '1rem' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
            <td style={{ padding: '1rem' }}>Amit Singh</td>
            <td style={{ padding: '1rem' }}>Appointment Reminder</td>
            <td style={{ padding: '1rem' }}>Today, 09:00 AM</td>
            <td style={{ padding: '1rem', color: '#10B981', fontWeight: 'bold' }}>✓ Delivered</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
            <td style={{ padding: '1rem' }}>Priya Patel</td>
            <td style={{ padding: '1rem' }}>Follow-up Checkup</td>
            <td style={{ padding: '1rem' }}>Yesterday, 05:30 PM</td>
            <td style={{ padding: '1rem', color: '#10B981', fontWeight: 'bold' }}>✓ Read</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default AdminReminders;
