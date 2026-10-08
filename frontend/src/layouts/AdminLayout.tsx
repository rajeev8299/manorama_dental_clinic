import { useEffect, useState } from 'react';
import { Outlet, Navigate, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  LogOut, 
  Moon, 
  Sun, 
  Menu,
  MessageSquare
} from 'lucide-react';
import styles from './AdminLayout.module.css';
import { supabase } from '../lib/supabase';
import type { Session } from '@supabase/supabase-js';

const AdminLayout = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('admin-theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.body.classList.add('admin-theme-dark');
    } else {
      document.body.classList.add('admin-theme-light');
    }
    
    return () => {
      document.body.classList.remove('admin-theme-dark', 'admin-theme-light');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('admin-theme', newMode ? 'dark' : 'light');
    if (newMode) {
      document.body.classList.remove('admin-theme-light');
      document.body.classList.add('admin-theme-dark');
    } else {
      document.body.classList.remove('admin-theme-dark');
      document.body.classList.add('admin-theme-light');
    }
  };

  useEffect(() => {
    const checkAdminStatus = async (currentSession: Session | null) => {
      if (!currentSession) {
        setSession(null);
        setLoading(false);
        return;
      }

      // Verify if the authenticated user is an authorized admin
      const { data, error } = await supabase
        .from('admin_users')
        .select('id')
        .eq('id', currentSession.user.id)
        .single();

      if (error || !data) {
        // Not authorized as admin
        await supabase.auth.signOut();
        setSession(null);
      } else {
        setSession(currentSession);
      }
      setLoading(false);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      checkAdminStatus(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (_event === 'SIGNED_IN') {
        setLoading(true);
        checkAdminStatus(newSession);
      } else if (_event === 'SIGNED_OUT') {
        setSession(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid var(--admin-border)', borderTopColor: 'var(--admin-accent)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <p style={{ fontWeight: 500 }}>Loading workspace...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const adminEmail = session.user.email || 'Admin';
  const initial = adminEmail.charAt(0).toUpperCase();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin') return 'Dashboard Overview';
    if (path.includes('appointments')) return 'Appointments';
    if (path.includes('leads')) return 'Leads Management';
    return 'Admin Panel';
  };

  return (
    <div className={styles.adminContainer}>
      {/* Mobile Overlay */}
      <div 
        className={`${styles.overlay} ${sidebarOpen ? styles.overlayOpen : ''}`} 
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div style={{ width: '32px', height: '32px', background: 'var(--admin-accent)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
            M
          </div>
          <h2>Manorama Dental</h2>
        </div>
        
        <nav className={styles.sidebarNav}>
          <div className={styles.navSectionLabel}>Overview</div>
          <NavLink 
            to="/admin" 
            end
            className={({isActive}) => isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
          >
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          
          <div className={styles.navSectionLabel}>Management</div>
          <NavLink 
            to="/admin/leads" 
            className={({isActive}) => isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
          >
            <MessageSquare size={18} /> Leads
          </NavLink>
          <NavLink 
            to="/admin/appointments" 
            className={({isActive}) => isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
          >
            <Calendar size={18} /> Appointments
          </NavLink>
        </nav>

        <div className={styles.sidebarFooter}>
          <button onClick={toggleTheme} className={styles.themeToggleBtn}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />} 
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.topbar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className={styles.mobileMenuBtn} onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <h1 className={styles.topbarTitle}>{getPageTitle()}</h1>
          </div>
          <div className={styles.topbarRight}>
            <div className={styles.adminProfile}>
              <div className={styles.adminAvatar}>{initial}</div>
              <span style={{ display: 'none' }} className="sm:inline-block">{adminEmail}</span>
            </div>
          </div>
        </header>
        
        <div className={styles.contentScroll}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
