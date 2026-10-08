import { useState, useEffect } from 'react';
import { Search, Filter, RefreshCw, X, Calendar as CalendarIcon, Clock, Phone, User, MessageSquare } from 'lucide-react';
import styles from './AdminDashboard.module.css';
import { supabase } from '../../lib/supabase';

interface Appointment {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  preferred_date: string;
  preferred_time: string;
  message: string | null;
  status: string;
  created_at: string;
}

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Modal
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  
  // Confirmation state
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const fetchAppointments = async () => {
    setLoading(true);
    setError('');
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('preferred_date', { ascending: false })
        .order('preferred_time', { ascending: false });

      if (error) throw error;
      setAppointments(data || []);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Unable to load appointments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    if (newStatus === 'Confirmed') {
      setConfirmingId(id);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) throw new Error("Not authenticated");

        const response = await supabase.functions.invoke('confirm-appointment', {
          body: { appointmentId: id }
        });

        if (response.error) {
          throw new Error(response.error.message || 'Error invoking function');
        }
        
        const result = response.data;
        if (result && result.success) {
          // Update local state
          setAppointments(appointments.map(app => app.id === id ? { ...app, status: 'Confirmed' } : app));
          if (selectedAppointment && selectedAppointment.id === id) {
            setSelectedAppointment({ ...selectedAppointment, status: 'Confirmed' });
          }
          
          if (!result.emailSent && result.message === 'Already confirmed') {
            // Silently ignore or show already confirmed
          } else if (result.emailSent) {
            alert('Appointment confirmed and confirmation email sent.');
          } else if (!result.emailSent && result.emailMessage === 'No email address provided.') {
            alert('Appointment confirmed, but no email address was provided.');
          } else {
            alert('Appointment confirmed, but confirmation email could not be sent.');
          }
        } else {
          throw new Error(result?.error || 'Failed to confirm');
        }
      } catch (err) {
        console.error('Error confirming appointment:', err);
        alert('Failed to confirm appointment. Please check console for details.');
      } finally {
        setConfirmingId(null);
      }
      return;
    }

    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      // Update local state
      setAppointments(appointments.map(app => app.id === id ? { ...app, status: newStatus } : app));
      
      // Update modal state if open
      if (selectedAppointment && selectedAppointment.id === id) {
        setSelectedAppointment({ ...selectedAppointment, status: newStatus });
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status. Please try again.');
    }
  };

  const filteredAppointments = appointments.filter(app => {
    const matchesSearch = 
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone.includes(searchTerm) ||
      (app.email && app.email.toLowerCase().includes(searchTerm.toLowerCase()));
      
    // default to pending if status is null
    const appStatus = (app.status || 'pending').toLowerCase();
    const filterStatus = statusFilter.toLowerCase();
    
    const matchesStatus = statusFilter === 'all' || appStatus === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status: string) => {
    switch((status || 'pending').toLowerCase()) {
      case 'pending': return styles.badgeWarning;
      case 'confirmed': return styles.badgeSuccess;
      case 'completed': return styles.badgeNeutral;
      case 'cancelled': return styles.badgeDanger;
      default: return styles.badgeNeutral;
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flex: 1, minWidth: '300px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search by patient, phone, or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem', borderRadius: '8px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-surface)', color: 'var(--admin-text)', outline: 'none' }}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Filter size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ padding: '0.6rem 1rem 0.6rem 2.5rem', borderRadius: '8px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-surface)', color: 'var(--admin-text)', outline: 'none', appearance: 'none', paddingRight: '2rem' }}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        <button 
          onClick={fetchAppointments}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', backgroundColor: 'var(--admin-surface)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: 'var(--admin-text)', cursor: 'pointer' }}
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      <div className={styles.recentSection}>
        {error && (
          <div style={{ padding: '1.5rem', backgroundColor: 'var(--admin-danger-bg)', color: 'var(--admin-danger)', borderBottom: '1px solid rgba(239, 68, 68, 0.3)' }}>
            {error}
          </div>
        )}

        <div style={{ overflowX: 'auto' }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Phone</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className={styles.loadingState}>Loading appointments...</td>
                </tr>
              ) : filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.emptyState}>
                    <div className={styles.emptyStateIcon}><CalendarIcon size={48} /></div>
                    <p>No appointments found matching your criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredAppointments.map(app => (
                  <tr key={app.id}>
                    <td style={{ fontWeight: 500 }}>{app.name}</td>
                    <td style={{ fontSize: '0.85rem' }}>{app.phone}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', fontWeight: 500 }}>
                        <CalendarIcon size={12} style={{ color: 'var(--admin-text-muted)' }} /> {new Date(app.preferred_date).toLocaleDateString()}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', color: 'var(--admin-text-muted)', marginTop: '0.125rem' }}>
                        <Clock size={12} /> {app.preferred_time}
                      </div>
                    </td>
                    <td>
                      <span className={`${styles.badge} ${getStatusBadgeClass(app.status)}`}>
                        {app.status || 'Pending'}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => setSelectedAppointment(app)}
                        style={{ padding: '0.4rem 0.75rem', backgroundColor: 'var(--admin-hover)', border: '1px solid var(--admin-border)', borderRadius: '6px', color: 'var(--admin-text)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500 }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(2px)' }}>
          <div style={{ backgroundColor: 'var(--admin-surface)', width: '100%', maxWidth: '600px', borderRadius: '16px', border: '1px solid var(--admin-border)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
            
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, color: 'var(--admin-primary)' }}>Appointment Details</h2>
              <button onClick={() => setSelectedAppointment(null)} style={{ background: 'none', border: 'none', color: 'var(--admin-text-muted)', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Header Info */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.5rem', color: 'var(--admin-primary)' }}>{selectedAppointment.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>
                    <CalendarIcon size={14} /> Booked on {new Date(selectedAppointment.created_at).toLocaleString()}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--admin-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Status</span>
                  <select 
                    value={confirmingId === selectedAppointment.id ? 'Confirming...' : (selectedAppointment.status || 'Pending')}
                    onChange={(e) => updateStatus(selectedAppointment.id, e.target.value)}
                    disabled={confirmingId === selectedAppointment.id}
                    style={{ padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text)', outline: 'none', fontWeight: 500, fontSize: '0.85rem' }}
                  >
                    {confirmingId === selectedAppointment.id && <option value="Confirming...">Confirming...</option>}
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', padding: '1.25rem', backgroundColor: 'var(--admin-bg)', borderRadius: '12px', border: '1px solid var(--admin-border)' }}>
                {/* Schedule Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--admin-text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>
                    <CalendarIcon size={12} /> Date & Time
                  </div>
                  <div style={{ color: 'var(--admin-text)', fontWeight: 500 }}>
                    {new Date(selectedAppointment.preferred_date).toLocaleDateString()}
                  </div>
                  <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem' }}>
                    {selectedAppointment.preferred_time}
                  </div>
                </div>

                {/* Patient Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--admin-text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>
                    <Phone size={12} /> Contact Number
                  </div>
                  <a href={`tel:${selectedAppointment.phone}`} style={{ color: 'var(--admin-accent)', textDecoration: 'none', fontWeight: 500 }}>{selectedAppointment.phone}</a>
                </div>
              </div>

              {/* Medical Info */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', padding: '1.25rem', backgroundColor: 'var(--admin-bg)', borderRadius: '12px', border: '1px solid var(--admin-border)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--admin-text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>
                    <User size={12} /> Email
                  </div>
                  <div style={{ color: 'var(--admin-text)', fontWeight: 500 }}>
                    {selectedAppointment.email || 'N/A'}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--admin-text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>
                    <MessageSquare size={12} /> Reason for Visit
                  </div>
                  <div style={{ color: 'var(--admin-text)', fontWeight: 500 }}>
                    {selectedAppointment.message || 'No message provided'}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAppointments;
