/**
 * Navbar — TD Nutrition
 * Barra de navegación con logo, links, carrito, modo oscuro y usuario autenticado
 */

import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useCart }  from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth }  from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Cart from '../Cart/Cart';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { totalItems }   = useCart();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const { addToast }     = useToast();
  const navigate         = useNavigate();

  const [menuOpen,  setMenuOpen]  = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [cartOpen,  setCartOpen]  = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  /* Scroll listener */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* Cerrar user menu al hacer click fuera */
  useEffect(() => {
    const fn = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    addToast('Sesión cerrada. ¡Hasta pronto!', 'info');
    navigate('/');
  };

  return (
    <>
      <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.inner}`}>

          {/* ── Logo ── */}
          <Link to="/" className={styles.logo} onClick={closeMenu}>
            <span className={styles.logoIcon}>TD</span>
            <span className={styles.logoText}>
              Nutrition<span className={styles.logoDot}>.</span>
            </span>
          </Link>

          {/* ── Nav Links (desktop) ── */}
          <nav className={`${styles.navLinks} ${menuOpen ? styles.navOpen : ''}`}>
            {[
              { to: '/',         label: 'Inicio' },
              { to: '/products', label: 'Productos' },
              { to: '/about',    label: 'Nosotros' },
              { to: '/contact',  label: 'Contacto' },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                }
                onClick={closeMenu}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* ── Actions ── */}
          <div className={styles.actions}>

            {/* Theme toggle */}
            <button
              className={styles.iconBtn}
              onClick={toggleTheme}
              aria-label="Cambiar tema"
              title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* Cart button */}
            <button
              className={styles.cartBtn}
              onClick={() => setCartOpen(true)}
              aria-label="Abrir carrito"
              id="cart-button"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {totalItems > 0 && (
                <span className={styles.badge} aria-label={`${totalItems} productos`}>
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            {/* ── Auth area ── */}
            {isAuthenticated ? (
              /* User dropdown */
              <div className={styles.userMenu} ref={userMenuRef}>
                <button
                  className={styles.userBtn}
                  onClick={() => setUserMenuOpen(o => !o)}
                  aria-label="Menú de usuario"
                  id="user-menu-btn"
                >
                  <span className={styles.avatar}>{user.avatar}</span>
                  <span className={styles.userName}>{user.name.split(' ')[0]}</span>
                  <svg
                    className={`${styles.chevron} ${userMenuOpen ? styles.chevronUp : ''}`}
                    width="12" height="12" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2.5"
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>

                {userMenuOpen && (
                  <div className={styles.userDropdown}>
                    <div className={styles.userDropdownHeader}>
                      <span className={styles.avatarLg}>{user.avatar}</span>
                      <div>
                        <p className={styles.ddName}>{user.name}</p>
                        <p className={styles.ddEmail}>{user.email}</p>
                        {user.role === 'admin' && (
                          <span className={styles.adminBadge}>Admin</span>
                        )}
                      </div>
                    </div>
                    <div className={styles.ddDivider} />
                    <button
                      className={styles.ddItem}
                      onClick={handleLogout}
                      id="logout-btn"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                      </svg>
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Login button */
              <Link
                to="/login"
                className={styles.loginBtn}
                id="navbar-login"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Ingresar
              </Link>
            )}

            {/* Hamburger (mobile) */}
            <button
              className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Menú"
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className={styles.mobileOverlay} onClick={closeMenu} />
      )}

      {/* Cart Drawer */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
