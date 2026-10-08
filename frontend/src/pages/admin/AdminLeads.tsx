import { useState, useEffect } from 'react';
import { Search, Filter, RefreshCw, X, MapPin, Phone, Mail, Calendar as CalendarIcon, MessageSquare } from 'lucide-react';
import styles from './AdminDashboard.module.css';
import { supabase } from '../../lib/supabase';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  address: string;
  city: string;
  state: string;
  pincode: string;
  message: string | null;
  status: string;
  created_at: string;
}

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Modal
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    setError('');
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (err) {
      console.error('Error fetching leads:', err);
      setError('Unable to load leads. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      // Update local state
      setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
      
      // Update modal state if open
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead({ ...selectedLead, status: newStatus });
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status. Please try again.');
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status: string) => {
    switch(status?.toLowerCase()) {
      case 'new': return styles.badgeAccent;
      case 'contacted': return styles.badgeWarning;
      case 'converted': return styles.badgeSuccess;
      case 'closed': return styles.badgeNeutral;
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
              placeholder="Search leads by name, phone, or email..." 
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
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
        <button 
          onClick={fetchLeads}
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
                <th>Name</th>
                <th>Contact</th>
                <th>Location</th>
                <th>Message</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className={styles.loadingState}>Loading leads...</td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className={styles.emptyState}>
                    <div className={styles.emptyStateIcon}><MessageSquare size={48} /></div>
                    <p>No leads found matching your criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredLeads.map(lead => (
                  <tr key={lead.id}>
                    <td style={{ fontWeight: 500 }}>{lead.name}</td>
                    <td>
                      <div style={{ fontSize: '0.85rem' }}>{lead.phone}</div>
                      {lead.email && <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{lead.email}</div>}
                    </td>
                    <td>
                      <div style={{ fontSize: '0.85rem' }}>{lead.city}, {lead.state}</div>
                    </td>
                    <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>
                      {lead.message || '-'}
                    </td>
                    <td>
                      <span className={`${styles.badge} ${getStatusBadgeClass(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td>
                      <button 
                        onClick={() => setSelectedLead(lead)}
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

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(2px)' }}>
          <div style={{ backgroundColor: 'var(--admin-surface)', width: '100%', maxWidth: '600px', borderRadius: '16px', border: '1px solid var(--admin-border)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
            
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, color: 'var(--admin-primary)' }}>Lead Details</h2>
              <button onClick={() => setSelectedLead(null)} style={{ background: 'none', border: 'none', color: 'var(--admin-text-muted)', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Header Info */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.5rem', color: 'var(--admin-primary)' }}>{selectedLead.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>
                    <CalendarIcon size={14} /> Submitted on {new Date(selectedLead.created_at).toLocaleString()}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--admin-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Status</span>
                  <select 
                    value={selectedLead.status}
                    onChange={(e) => updateStatus(selectedLead.id, e.target.value)}
                    style={{ padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text)', outline: 'none', fontWeight: 500, fontSize: '0.85rem' }}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              {/* Contact Info */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', padding: '1.25rem', backgroundColor: 'var(--admin-bg)', borderRadius: '12px', border: '1px solid var(--admin-border)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--admin-text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>
                    <Phone size={12} /> Phone Number
                  </div>
                  <a href={`tel:${selectedLead.phone}`} style={{ color: 'var(--admin-accent)', textDecoration: 'none', fontWeight: 500 }}>{selectedLead.phone}</a>
                </div>
                {selectedLead.email && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--admin-text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>
                      <Mail size={12} /> Email Address
                    </div>
                    <a href={`mailto:${selectedLead.email}`} style={{ color: 'var(--admin-accent)', textDecoration: 'none', fontWeight: 500 }}>{selectedLead.email}</a>
                  </div>
                )}
              </div>

              {/* Location Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--admin-text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>
                  <MapPin size={12} /> Location Details
                </div>
                <div style={{ padding: '1rem', backgroundColor: 'var(--admin-bg)', borderRadius: '12px', border: '1px solid var(--admin-border)', color: 'var(--admin-text)', fontSize: '0.95rem' }}>
                  {selectedLead.address}<br />
                  {selectedLead.city}, {selectedLead.state} {selectedLead.pincode}
                </div>
              </div>

              {/* Message */}
              {selectedLead.message && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--admin-text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>
                    <MessageSquare size={12} /> Message
                  </div>
                  <div style={{ padding: '1rem', backgroundColor: 'var(--admin-bg)', borderRadius: '12px', border: '1px solid var(--admin-border)', color: 'var(--admin-text)', fontSize: '0.95rem', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                    {selectedLead.message}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLeads;
