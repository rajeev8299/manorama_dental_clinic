import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },

    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>
          <Link to="/" className={styles.logo}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
              <img src="/logo.png" alt="Manorama Multispeciality Dental Clinic Logo" className={styles.logoImg} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className={styles.clinicName}>Manorama Multispeciality Dental Clinic</span>
                <span className={styles.doctorName}>Dr. Amit Kumar Dubey</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className={styles.navLinks}>
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={styles.navLink}
                style={{ color: location.pathname === link.path ? 'var(--color-primary)' : '' }}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact" className={styles.btnPrimary}>
              Book Appointment
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={styles.mobileMenuBtn} 
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className={styles.mobileMenu}>
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={styles.navLink}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/contact" 
              className={styles.btnPrimary}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Appointment
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
