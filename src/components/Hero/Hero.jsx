/**
 * Hero — TD Nutrition
 * Banner principal con animaciones, CTA y diseño de alto impacto visual
 */

import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './Hero.module.css';

const STATS = [
  { value: '500+', label: 'Productos' },
  { value: '50K+', label: 'Clientes' },
  { value: '10+',  label: 'Años' },
  { value: '4.9★', label: 'Valoración' },
];

const FEATURES = [
  { text: 'Energía máxima' },
  { text: 'Recuperación rápida' },
  { text: 'Resultados reales' },
];

export default function Hero() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section className={styles.hero} ref={ref}>
      {/* Animated background blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />

      {/* Grid pattern overlay */}
      <div className={styles.grid} />

      <div className={`container ${styles.inner}`}>

        {/* ── Left Content ── */}
        <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Tienda #1 en Argentina
          </div>

          <h1 className={styles.title}>
            Supera Tus
            <span className={styles.titleAccent}> Límites</span>
            <br />Con TD Nutrition
          </h1>

          <p className={styles.subtitle}>
            Suplementos deportivos de calidad premium respaldados por ciencia.
            Proteínas, creatina, pre-entrenos y mucho más para que alcances
            tu máximo potencial.
          </p>

          {/* Feature pills */}
          <div className={styles.features}>
            {FEATURES.map(({ text }) => (
              <div key={text} className={styles.featurePill}>
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className={styles.ctas}>
            <Link to="/products" className={`btn btn-primary ${styles.ctaPrimary}`} id="hero-cta-products">
              <span>Ver Productos</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link to="/about" className={`btn btn-outline ${styles.ctaSecondary}`} id="hero-cta-about">
              Conoce TD Nutrition
            </Link>
          </div>

          {/* Stats row */}
          <div className={styles.stats}>
            {STATS.map(({ value, label }) => (
              <div key={label} className={styles.stat}>
                <span className={styles.statValue}>{value}</span>
                <span className={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Visual ── */}
        <div className={`${styles.visual} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.visualCard}>
            <div className={styles.productShowcase}>
              <div className={styles.productRing} />
              <div className={styles.productCircle}>
                <span className={styles.productEmoji}>🥤</span>
              </div>
              {/* Floating tags */}
              <div className={`${styles.floatTag} ${styles.floatTag1}`}>
                Suplementos
              </div>
              <div className={`${styles.floatTag} ${styles.floatTag2}`}>
                Pre-Entreno
              </div>
              <div className={`${styles.floatTag} ${styles.floatTag3}`}>
                Proteínas
              </div>
            </div>

            {/* Card: Oferta del día */}
            <div className={styles.dealCard}>
              <div className={styles.dealBadge}>Oferta del Día</div>
              <div className={styles.dealName}>Whey Protein Premium</div>
              <div className={styles.dealPrice}>
                <span className={styles.dealOld}>$89.99</span>
                <span className={styles.dealNew}>$59.99</span>
              </div>
              <div className={styles.dealDiscount}>-33% OFF</div>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel} />
        </div>
        <span>Desliza</span>
      </div>
    </section>
  );
}
