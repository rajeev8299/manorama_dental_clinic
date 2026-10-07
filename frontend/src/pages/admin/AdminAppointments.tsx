import { useState, useEffect } from 'react';
import styles from './AdminDashboard.module.css';
import { supabase } from '../../lib/supabase';

interface Appointment {
  id: number;
  name: string;
  phone: string;
  preferred_date: string;
  preferred_time: string;
  status: string;
}

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAppointments(data || []);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      fetchAppointments(); // refresh
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <div>
      <h1 className={styles.pageTitle}>Appointments</h1>
      {loading ? (
        <p>Loading appointments...</p>
      ) : (
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
              <tr key={app.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1rem' }}>{app.name}</td>
                <td style={{ padding: '1rem' }}>{app.phone}</td>
                <td style={{ padding: '1rem' }}>{app.preferred_date} at {app.preferred_time}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '999px', 
                    fontSize: '0.85rem',
                    background: app.status === 'Confirmed' ? '#dcfce7' : (app.status === 'Cancelled' ? '#fee2e2' : '#fef3c7'),
                    color: app.status === 'Confirmed' ? '#166534' : (app.status === 'Cancelled' ? '#991b1b' : '#92400e')
                  }}>
                    {app.status || 'Pending'}
                  </span>
                </td>
                <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => updateStatus(app.id, 'Confirmed')} style={{ background: '#22c55e', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}>Confirm</button>
                  <button onClick={() => updateStatus(app.id, 'Cancelled')} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: '1rem', textAlign: 'center' }}>No appointments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminAppointments;
