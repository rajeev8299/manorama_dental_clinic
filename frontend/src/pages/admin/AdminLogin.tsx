import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminLogin.module.css';
import { supabase } from '../../lib/supabase';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Manual validation to match requested exact error message
    if (!email.includes('@')) {
      setError('Please enter a valid admin email address.');
      setLoading(false);
      return;
    }
    
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError('Invalid admin email or password.');
      } else if (data.session) {
        // Check if the user is authorized as an admin
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('id')
          .eq('id', data.session.user.id)
          .single();

        if (adminError || !adminData) {
          await supabase.auth.signOut();
          setError('Access denied: You are not authorized as an administrator. Please make sure your UID is added to the admin_users table.');
        } else {
          navigate('/admin');
        }
      }
    } catch (err: any) {
      setError('Invalid admin email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2>Admin Login</h2>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input 
              type="text" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              disabled={loading}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              disabled={loading}
            />
          </div>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
