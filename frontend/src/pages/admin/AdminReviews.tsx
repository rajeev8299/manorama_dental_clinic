
import styles from './AdminDashboard.module.css';

const AdminReviews = () => {
  return (
    <div>
      <h1 className={styles.pageTitle}>Reviews & Testimonials Manager</h1>
      <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', background: 'white', minWidth: '800px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
            <th style={{ padding: '1rem' }}>Patient Name</th>
            <th style={{ padding: '1rem' }}>Rating</th>
            <th style={{ padding: '1rem' }}>Review Text</th>
            <th style={{ padding: '1rem' }}>Status</th>
            <th style={{ padding: '1rem' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
            <td style={{ padding: '1rem' }}><strong>Sneha Sharma</strong></td>
            <td style={{ padding: '1rem' }}>⭐⭐⭐⭐⭐</td>
            <td style={{ padding: '1rem', maxWidth: '300px' }}>"Dr. Amit is amazing! Best painless root canal ever."</td>
            <td style={{ padding: '1rem' }}><span style={{ background: '#DEF7EC', color: '#03543F', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>Published</span></td>
            <td style={{ padding: '1rem' }}>
              <button style={{ background: '#EF4444', color: 'white', padding: '0.5rem', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Hide</button>
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
            <td style={{ padding: '1rem' }}><strong>Rahul Verma</strong></td>
            <td style={{ padding: '1rem' }}>⭐⭐⭐⭐</td>
            <td style={{ padding: '1rem', maxWidth: '300px' }}>"Good clinic, neat and clean. Waiting time was a bit long."</td>
            <td style={{ padding: '1rem' }}><span style={{ background: '#FEF3C7', color: '#92400E', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>Pending Approval</span></td>
            <td style={{ padding: '1rem' }}>
              <button style={{ background: '#10B981', color: 'white', padding: '0.5rem', borderRadius: '4px', border: 'none', cursor: 'pointer', marginRight: '0.5rem' }}>Approve</button>
              <button style={{ background: '#EF4444', color: 'white', padding: '0.5rem', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Reject</button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default AdminReviews;
