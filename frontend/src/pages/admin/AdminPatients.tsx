import { useState, useEffect } from 'react';
import styles from './AdminDashboard.module.css';

interface Patient {
  _id: string;
  name: string;
  phone: string;
  age?: number;
  gender?: string;
  lastVisit?: string;
  treatmentHistory?: string;
}

const AdminPatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    gender: '',
    lastVisit: '',
    treatmentHistory: ''
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/patients');
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowAddForm(false);
        setFormData({ name: '', phone: '', age: '', gender: '', lastVisit: '', treatmentHistory: '' });
        fetchPatients();
      } else {
        alert('Failed to add patient');
      }
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 className={styles.pageTitle} style={{ margin: 0 }}>Patient Records (EMR)</h1>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          style={{ background: '#0EA5E9', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {showAddForm ? 'Cancel' : '+ Add New Patient'}
        </button>
      </div>

      {showAddForm && (
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #e2e8f0' }}>
          <h2 style={{ marginTop: 0, marginBottom: '1rem', color: '#1e293b' }}>Add New Patient</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569' }}>Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569' }}>Phone *</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569' }}>Age</label>
              <input type="number" name="age" value={formData.age} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569' }}>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569' }}>Last Visit Date</label>
              <input type="date" name="lastVisit" value={formData.lastVisit} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569' }}>Treatment History</label>
              <input type="text" name="treatmentHistory" value={formData.treatmentHistory} onChange={handleInputChange} placeholder="e.g. Root Canal, Teeth Whitening" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
            </div>
            <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
              <button type="submit" style={{ background: '#0EA5E9', color: 'white', padding: '0.75rem 2rem', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                Save Patient Record
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ overflowX: 'auto', background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', minWidth: '600px' }}>
          <thead>
          <tr style={{ borderBottom: '2px solid #e2e8f0', background: '#f8fafc' }}>
            <th style={{ padding: '1rem' }}>Patient Name</th>
            <th style={{ padding: '1rem' }}>Contact</th>
            <th style={{ padding: '1rem' }}>Last Visit</th>
            <th style={{ padding: '1rem' }}>Treatment History</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center' }}>Loading patients...</td></tr>
          ) : patients.length === 0 ? (
            <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center' }}>No patient records found.</td></tr>
          ) : (
            patients.map((patient) => (
              <tr key={patient._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1rem' }}>
                  <strong>{patient.name}</strong><br/>
                  <small style={{ color: '#64748b' }}>{patient.age ? `${patient.age} Yrs` : 'N/A'} • {patient.gender || 'N/A'}</small>
                </td>
                <td style={{ padding: '1rem' }}>{patient.phone}</td>
                <td style={{ padding: '1rem' }}>{patient.lastVisit || 'N/A'}</td>
                <td style={{ padding: '1rem' }}>{patient.treatmentHistory || 'N/A'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default AdminPatients;
