import { useState, useEffect } from 'react';
import styles from './AdminDashboard.module.css'; // Reusing some basic styles

interface Appointment {
  _id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  status: string;
}

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const fetchAppointments = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch('http://localhost:5000/api/appointments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setAppointments(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);


  const updateStatus = async (id: string, status: string) => {
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`http://localhost:5000/api/appointments/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      fetchAppointments(); // refresh
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className={styles.pageTitle}>Appointments</h1>
      <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', background: 'white' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
            <th style={{ padding: '1rem' }}>Name</th>
            <th style={{ padding: '1rem' }}>Phone</th>
            <th style={{ padding: '1rem' }}>Date & Time</th>
            <th style={{ padding: '1rem' }}>Status</th>
            <th style={{ padding: '1rem' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(app => (
            <tr key={app._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '1rem' }}>{app.name}</td>
              <td style={{ padding: '1rem' }}>{app.phone}</td>
              <td style={{ padding: '1rem' }}>{app.date} at {app.time}</td>
              <td style={{ padding: '1rem' }}>
                <span style={{ 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '999px', 
                  fontSize: '0.85rem',
                  background: app.status === 'Confirmed' ? '#dcfce7' : '#fef3c7',
                  color: app.status === 'Confirmed' ? '#166534' : '#92400e'
                }}>
                  {app.status}
                </span>
              </td>
              <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => updateStatus(app._id, 'Confirmed')} style={{ background: '#22c55e', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}>Confirm</button>
                <button onClick={() => updateStatus(app._id, 'Cancelled')} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAppointments;
