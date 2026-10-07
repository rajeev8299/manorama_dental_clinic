import { useState, useEffect } from 'react';
import styles from './AdminDashboard.module.css';
import { supabase } from '../../lib/supabase';

interface ContactMessage {
  id: number;
  full_name: string;
  phone_number: string;
  email_address: string;
  address: string;
  city: string;
  state: string;
  pin_code: string;
  message: string;
  created_at: string;
  status: string;
}

const AdminMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      fetchMessages(); // refresh
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <div>
      <h1 className={styles.pageTitle}>Contact Messages</h1>
      {loading ? (
        <p>Loading messages...</p>
      ) : (
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', background: 'white' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '1rem' }}>Name</th>
              <th style={{ padding: '1rem' }}>Contact</th>
              <th style={{ padding: '1rem' }}>Location</th>
              <th style={{ padding: '1rem' }}>Message</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map(msg => (
              <tr key={msg.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1rem' }}>{msg.full_name}</td>
                <td style={{ padding: '1rem' }}>
                  <div>{msg.phone_number}</div>
                  {msg.email_address && <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{msg.email_address}</div>}
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontSize: '0.9rem' }}>{msg.city}, {msg.state}</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{msg.pin_code}</div>
                </td>
                <td style={{ padding: '1rem', maxWidth: '300px', whiteSpace: 'pre-wrap' }}>
                  {msg.message || <em style={{ color: '#94a3b8' }}>No message</em>}
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '999px', 
                    fontSize: '0.85rem',
                    background: msg.status === 'Resolved' ? '#dcfce7' : '#fef3c7',
                    color: msg.status === 'Resolved' ? '#166534' : '#92400e'
                  }}>
                    {msg.status || 'New'}
                  </span>
                </td>
                <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                  {msg.status !== 'Resolved' && (
                    <button onClick={() => updateStatus(msg.id, 'Resolved')} style={{ background: '#22c55e', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}>Mark Resolved</button>
                  )}
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '1rem', textAlign: 'center' }}>No contact messages found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminMessages;
