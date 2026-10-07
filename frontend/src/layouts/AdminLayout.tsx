import { Outlet, Navigate, Link } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, LogOut, Star, Bell, Settings } from 'lucide-react';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {
  const token = localStorage.getItem('adminToken');

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
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
