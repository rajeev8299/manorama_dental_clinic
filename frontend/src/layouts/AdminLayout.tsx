import { useEffect, useState } from 'react';
import { Outlet, Navigate, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, LogOut, Star, Bell, Settings, Mail } from 'lucide-react';
import styles from './AdminLayout.module.css';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

const AdminLayout = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className={styles.adminContainer}>Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Clinic Admin</h2>
        </div>
        <nav className={styles.sidebarNav}>
          <Link to="/admin" className={styles.navLink}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/admin/appointments" className={styles.navLink}>
            <Calendar size={20} /> Appointments
          </Link>
          <Link to="/admin/messages" className={styles.navLink}>
            <Mail size={20} /> Messages
          </Link>
          <Link to="/admin/patients" className={styles.navLink}>
            <Users size={20} /> Patient Records
          </Link>
          <Link to="/admin/services" className={styles.navLink}>
            <Settings size={20} /> Services & Pricing
          </Link>
          <Link to="/admin/reviews" className={styles.navLink}>
            <Star size={20} /> Reviews
          </Link>
          <Link to="/admin/reminders" className={styles.navLink}>
            <Bell size={20} /> Reminders
          </Link>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </aside>
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
