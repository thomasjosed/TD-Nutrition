/**
 * Footer — TD Nutrition
 * Footer completo con redes sociales, links, contacto y copyright
 */

import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const SOCIAL_LINKS = [
  { label: 'Instagram', href: '#', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )},
  { label: 'Facebook', href: '#', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
    </svg>
  )},
  { label: 'Twitter', href: '#', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
    </svg>
  )},
  { label: 'YouTube', href: '#', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  )},
];

const NAV_LINKS = [
  { to: '/',         label: 'Inicio' },
  { to: '/products', label: 'Productos' },
  { to: '/about',    label: 'Nosotros' },
  { to: '/contact',  label: 'Contacto' },
];

const PRODUCT_LINKS = [
  'Proteínas Whey',
  'Creatina',
  'Pre-Entreno',
  'Aminoácidos',
  'Vitaminas',
  'Fat Burners',
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* ── Newsletter Banner ── */}
      <div className={styles.newsletter}>
        <div className="container">
          <div className={styles.newsletterInner}>
            <div className={styles.newsletterText}>
              <h3>🔥 ¿Listo para el siguiente nivel?</h3>
              <p>Suscríbete y recibe un <strong>15% OFF</strong> en tu primer pedido</p>
            </div>
            <form className={styles.newsletterForm} onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="tu@email.com"
                className={styles.newsletterInput}
                aria-label="Correo electrónico"
              />
              <button type="submit" className="btn btn-primary" id="newsletter-submit">
                Suscribirse
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className={styles.main}>
        <div className="container">
          <div className={styles.grid}>

            {/* Brand column */}
            <div className={styles.brand}>
              <Link to="/" className={styles.logo}>
                <span className={styles.logoIcon}>TD</span>
                <span className={styles.logoText}>Nutrition<span className={styles.dot}>.</span></span>
              </Link>
              <p className={styles.brandDesc}>
                Tu aliado en el mundo del fitness y la nutrición deportiva.
                Calidad premium respaldada por ciencia para que alcances tus metas.
              </p>
              <div className={styles.social}>
                {SOCIAL_LINKS.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    className={styles.socialLink}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className={styles.column}>
              <h4 className={styles.colTitle}>Navegación</h4>
              <ul className={styles.colLinks}>
                {NAV_LINKS.map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className={styles.colLink}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div className={styles.column}>
              <h4 className={styles.colTitle}>Productos</h4>
              <ul className={styles.colLinks}>
                {PRODUCT_LINKS.map(p => (
                  <li key={p}>
                    <Link to="/products" className={styles.colLink}>{p}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className={styles.column}>
              <h4 className={styles.colTitle}>Contacto</h4>
              <ul className={styles.colLinks}>
                <li className={styles.contactItem}>
                  <span>📍</span>
                  <span>Buenos Aires, Argentina</span>
                </li>
                <li className={styles.contactItem}>
                  <span>📧</span>
                  <span>hola@tdnutrition.com</span>
                </li>
                <li className={styles.contactItem}>
                  <span>📞</span>
                  <span>+54 11 4444-5555</span>
                </li>
                <li className={styles.contactItem}>
                  <span>⏰</span>
                  <span>Lun-Vie 9:00 - 18:00</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <p>© {year} TD Nutrition. Todos los derechos reservados.</p>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.bottomLink}>Política de Privacidad</a>
            <a href="#" className={styles.bottomLink}>Términos de Uso</a>
            <a href="#" className={styles.bottomLink}>Cookies</a>
          </div>
          <div className={styles.paymentBadges}>
            <span title="Visa">💳</span>
            <span title="Mastercard">💳</span>
            <span title="PayPal">🅿️</span>
            <span title="Mercado Pago">💚</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
