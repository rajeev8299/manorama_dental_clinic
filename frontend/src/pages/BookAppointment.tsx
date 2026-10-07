import { useState } from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { supabase } from '../lib/supabase';

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    
    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      const { error } = await supabase
        .from('appointments')
        .insert([
          {
            name: formData.name,
            phone: formData.phone,
            email: formData.email || null,
            preferred_date: formData.date,
            preferred_time: formData.time,
            message: formData.message || null
          }
        ]);
      
      if (error) {
        throw error;
      }
      
      setStatus('success');
      setFormData({ name: '', phone: '', email: '', date: '', time: '', message: '' });
    } catch (err) {
      console.error('Error submitting appointment:', err);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '0', backgroundColor: '#fafafa' }}>
      
      <section style={{ padding: 'var(--spacing-2xl) 0 var(--spacing-xl)', backgroundColor: 'var(--color-sage)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <h1 style={{ fontSize: '4rem', marginBottom: 'var(--spacing-sm)', color: 'var(--color-primary)' }}>Contact & <span style={{ color: 'var(--color-accent)' }}>Appointments</span></h1>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.25rem', lineHeight: 1.6 }}>
              Schedule your visit with Dr. Amit Kumar Dubey. We look forward to providing you with premium dental care.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-box" style={{ padding: 'var(--spacing-3xl) 0' }}>
        <div className="container">

          <ScrollReveal>
            <div className="contact-grid">
              
              {/* Appointment Form */}
              <div style={{ padding: 'var(--spacing-2xl)', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, rgba(224, 242, 254, 0.95) 0%, rgba(240, 249, 255, 0.8) 100%)', backdropFilter: 'blur(10px)', borderRadius: '24px', boxShadow: '0 25px 50px rgba(14, 165, 233, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.8)', border: '1px solid rgba(14, 165, 233, 0.3)' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-xl)', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', textAlign: 'center' }}>
                  Book an Appointment
                </h2>
                
                {status === 'success' ? (
                  <div style={{ padding: 'var(--spacing-xl)', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', color: '#166534', border: '1px solid #bbf7d0', borderRadius: '16px', textAlign: 'center', boxShadow: '0 10px 25px rgba(22, 101, 52, 0.1)' }}>
                    <div style={{ display: 'inline-flex', background: '#166534', color: 'white', borderRadius: '50%', padding: '12px', marginBottom: '1rem' }}>
                      <MapPin size={32} />
                    </div>
                    <h3 style={{ marginBottom: 'var(--spacing-sm)', fontSize: '1.5rem' }}>Request Sent Successfully!</h3>
                    <p style={{ fontSize: '1.05rem', opacity: 0.9 }}>Your appointment request has been submitted. Our team will contact you shortly to confirm your timing.</p>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="btn-primary"
                      style={{ marginTop: 'var(--spacing-xl)' }}
                    >
                      Book Another Appointment
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', flexGrow: 1 }}>
                    {status === 'error' && (
                      <div style={{ padding: 'var(--spacing-md)', backgroundColor: '#fef2f2', color: '#991b1b', borderRadius: '12px', border: '1px solid #fecaca' }}>
                        {errorMessage}
                      </div>
                    )}
                    
                    <div className="form-row">
                      <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Full Name *</label>
                        <input 
                          type="text" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleChange} 
                          required 
                          style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#f1f5f9', transition: 'all 0.3s ease', fontSize: '1rem', outline: 'none' }}
                        />
                      </div>
                      <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone Number *</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleChange} 
                          required 
                          style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#f1f5f9', transition: 'all 0.3s ease', fontSize: '1rem', outline: 'none' }}
                        />
                      </div>
                    </div>

                    <div className="input-group">
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#f1f5f9', transition: 'all 0.3s ease', fontSize: '1rem', outline: 'none' }}
                      />
                    </div>

                    <div className="form-row">
                      <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Preferred Date *</label>
                        <input 
                          type="date" 
                          name="date" 
                          value={formData.date} 
                          onChange={handleChange} 
                          required 
                          style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#f1f5f9', transition: 'all 0.3s ease', fontSize: '1rem', outline: 'none', fontFamily: 'inherit' }}
                        />
                      </div>
                      <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Preferred Time *</label>
                        <select 
                          name="time" 
                          value={formData.time} 
                          onChange={handleChange} 
                          required 
                          style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#f1f5f9', transition: 'all 0.3s ease', fontSize: '1rem', outline: 'none', fontFamily: 'inherit' }}
                        >
                          <option value="">Select a time</option>
                          <option value="Morning">Morning (9 AM - 12 PM)</option>
                          <option value="Afternoon">Afternoon (12 PM - 4 PM)</option>
                          <option value="Evening">Evening (4 PM - 8 PM)</option>
                        </select>
                      </div>
                    </div>

                    <div className="input-group">
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Message / Reason for Visit</label>
                      <textarea 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        rows={4}
                        style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#f1f5f9', transition: 'all 0.3s ease', fontSize: '1rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={status === 'submitting'}
                      style={{ 
                        marginTop: '1rem',
                        opacity: status === 'submitting' ? 0.7 : 1,
                        width: '100%',
                        padding: '1.25rem',
                        background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-light) 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: '0 10px 20px rgba(14, 165, 233, 0.2)',
                        transition: 'all 0.3s ease',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}
                    >
                      {status === 'submitting' ? 'Submitting...' : 'Request Appointment'}
                    </button>
                  </form>
                )}
              </div>
            
              {/* Contact Information */}
              <div className="clinic-info-premium" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%', borderRadius: '24px', background: 'linear-gradient(135deg, rgba(224, 242, 254, 0.95) 0%, rgba(240, 249, 255, 0.8) 100%)', backdropFilter: 'blur(10px)', border: '1px solid rgba(14, 165, 233, 0.3)', boxShadow: '0 25px 50px rgba(14, 165, 233, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.8)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }}></div>
                <div style={{ padding: 'var(--spacing-xl)', flexGrow: 1, position: 'relative', zIndex: 1 }}>
                  <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.75rem', textShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <span style={{ width: '30px', height: '3px', background: 'linear-gradient(90deg, var(--color-accent) 0%, transparent 100%)', borderRadius: '2px' }}></span>
                    Clinic Info
                  </h2>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div className="clinic-info-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', borderRadius: '16px', transition: 'all 0.3s ease', cursor: 'default', background: 'rgba(255, 255, 255, 0.4)', border: '1px solid rgba(255, 255, 255, 0.5)' }}>
                      <div style={{ background: '#ffffff', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px rgba(14, 165, 233, 0.1)', color: 'var(--color-accent)' }}>
                        <MapPin size={22} style={{ strokeWidth: 2 }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>Location</h3>
                        <p style={{ color: 'var(--color-primary)', fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>Manorama Multispeciality Dental Clinic</p>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', lineHeight: '1.4', margin: 0 }}>Lohta, Varanasi<br/>Uttar Pradesh, India</p>
                      </div>
                    </div>
                    
                    <div className="clinic-info-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', borderRadius: '16px', transition: 'all 0.3s ease', cursor: 'default', background: 'rgba(255, 255, 255, 0.4)', border: '1px solid rgba(255, 255, 255, 0.5)' }}>
                      <div style={{ background: '#ffffff', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px rgba(14, 165, 233, 0.1)', color: 'var(--color-accent)' }}>
                        <Phone size={22} style={{ strokeWidth: 2 }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>Contact</h3>
                        <p style={{ color: 'var(--color-primary)', fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>+91 81277 66794</p>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', lineHeight: '1.4', margin: 0 }}>Call or WhatsApp for appointments</p>
                      </div>
                    </div>

                    <div className="clinic-info-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', borderRadius: '16px', transition: 'all 0.3s ease', cursor: 'default', background: 'rgba(255, 255, 255, 0.4)', border: '1px solid rgba(255, 255, 255, 0.5)' }}>
                      <div style={{ background: '#ffffff', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px rgba(14, 165, 233, 0.1)', color: 'var(--color-accent)' }}>
                        <Clock size={22} style={{ strokeWidth: 2 }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>Timings</h3>
                        <p style={{ color: 'var(--color-primary)', fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>Mon - Sat: 10:00 AM - 8:00 PM</p>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', lineHeight: '1.4', margin: 0 }}>Sunday Closed</p>
                      </div>
                    </div>

                    <div className="clinic-quote" style={{ marginTop: '0.5rem', padding: 'var(--spacing-lg)', background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%)', borderRadius: '0 20px 20px 20px', borderLeft: '4px solid var(--color-accent)', boxShadow: '0 10px 20px rgba(0,0,0,0.03)', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: '10px', right: '15px', opacity: 0.1, color: 'var(--color-accent)', fontSize: '4rem', fontFamily: 'serif', lineHeight: 1 }}>"</div>
                      <p style={{ fontStyle: 'italic', color: 'var(--color-primary)', fontSize: '1.05rem', lineHeight: 1.5, position: 'relative', zIndex: 1, margin: 0 }}>
                        "Dedicated to your smile and overall well-being."
                      </p>
                      <p style={{ marginTop: '0.75rem', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', margin: 0 }}>— Dr. Amit Kumar Dubey, BDS</p>
                    </div>
                    
                    {/* Social Media Links */}
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <a href="https://www.facebook.com/Dr.AmitkumarDubey01/" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '16px', flexShrink: 0, backgroundColor: '#ffffff', color: '#1877F2', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', transition: 'all 0.3s ease' }}>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      </a>
                      <a href="https://www.instagram.com/dr_amitkumardubey/" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '16px', flexShrink: 0, backgroundColor: '#ffffff', color: '#E4405F', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', transition: 'all 0.3s ease' }}>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="url(#ig-grad)"><defs><linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#f09433"/><stop offset="25%" stopColor="#e6683c"/><stop offset="50%" stopColor="#dc2743"/><stop offset="75%" stopColor="#cc2366"/><stop offset="100%" stopColor="#bc1888"/></linearGradient></defs><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.07M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                      </a>
                      <a href="https://youtube.com/@dramitkrdubey?si=uKIot9YFR4fDN2kU" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '16px', flexShrink: 0, backgroundColor: '#ffffff', color: '#FF0000', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', transition: 'all 0.3s ease' }}>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                      </a>
                      <a href="https://wa.me/918127766794?text=Hello%20Dr.%20Amit%2C%20I%20would%20like%20to%20book%20an%20appointment." target="_blank" rel="noopener noreferrer" className="social-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '16px', flexShrink: 0, backgroundColor: '#ffffff', color: '#25D366', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', transition: 'all 0.3s ease' }}>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.8 5.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Full-width Google Map (Outside Container) */}
      <section style={{ width: '100%', height: '500px', margin: '0' }}>
        <iframe 
          src="https://maps.google.com/maps?q=25.308149242080678,82.93501186065595&t=&z=16&ie=UTF8&iwloc=&output=embed" 
          width="100%" 
          height="100%" 
          style={{ border: 0, display: 'block' }} 
          allowFullScreen={true} 
          loading="lazy"
          title="Clinic Location"
        ></iframe>
      </section>
      
      {/* FAQ Section */}
      <section className="section-box" style={{ padding: 'var(--spacing-3xl) 0' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '2.5rem', textAlign: 'center', color: 'var(--color-primary)', marginBottom: '2rem' }}>Frequently Asked Questions</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Do I need to book an appointment beforehand?</h4>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>While we accept walk-ins, we highly recommend booking an appointment to minimize your waiting time and ensure Dr. Dubey is available.</p>
                </div>
                <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>What payment methods do you accept?</h4>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>We accept Cash, UPI (Google Pay, PhonePe, Paytm), and all major Credit/Debit cards for your convenience.</p>
                </div>
                <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Are your treatments painless?</h4>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>Yes! Dr. Dubey uses advanced rotary and anesthetic techniques to ensure procedures like Root Canals and Extractions are virtually painless and comfortable.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <style>{`
        .clinic-info-item:hover {
          background: rgba(255, 255, 255, 0.7);
          transform: translateX(8px);
        }
        .clinic-quote {
          transition: all 0.3s ease;
        }
        .clinic-quote:hover {
          box-shadow: 0 20px 40px rgba(0,0,0,0.06) !important;
          transform: translateY(-2px);
        }
        .social-icon:hover {
          transform: translateY(-3px) scale(1.1);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1) !important;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 450px), 1fr));
          max-width: 1200px;
          margin: 0 auto;
          gap: var(--spacing-2xl);
          align-items: start;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-lg);
        }
        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default BookAppointment;
