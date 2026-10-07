
import styles from './AdminDashboard.module.css';

const AdminServices = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className={styles.pageTitle}>Services & Pricing</h1>
        <button style={{ background: '#0EA5E9', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>+ Add New Service</button>
      </div>
      <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', background: 'white', minWidth: '600px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
            <th style={{ padding: '1rem' }}>Service Name</th>
            <th style={{ padding: '1rem' }}>Category</th>
            <th style={{ padding: '1rem' }}>Base Price (₹)</th>
            <th style={{ padding: '1rem' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
            <td style={{ padding: '1rem' }}>Root Canal Treatment</td>
            <td style={{ padding: '1rem' }}>Endodontics</td>
            <td style={{ padding: '1rem' }}>₹3,500</td>
            <td style={{ padding: '1rem' }}><button style={{ cursor: 'pointer' }}>Edit</button></td>
          </tr>
          <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
            <td style={{ padding: '1rem' }}>Dental Implants</td>
            <td style={{ padding: '1rem' }}>Surgery</td>
            <td style={{ padding: '1rem' }}>₹20,000</td>
            <td style={{ padding: '1rem' }}><button style={{ cursor: 'pointer' }}>Edit</button></td>
          </tr>
          <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
            <td style={{ padding: '1rem' }}>Teeth Whitening</td>
            <td style={{ padding: '1rem' }}>Cosmetic</td>
            <td style={{ padding: '1rem' }}>₹4,000</td>
            <td style={{ padding: '1rem' }}><button style={{ cursor: 'pointer' }}>Edit</button></td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default AdminServices;
