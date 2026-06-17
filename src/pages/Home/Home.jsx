/**
 * Home Page — TD Nutrition
 * Página principal con Hero, sección de destacados y beneficios
 */

import { useState } from 'react';
import Hero from '../../components/Hero/Hero';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductModal from '../../components/ProductModal/ProductModal';
import { SkeletonGrid } from '../../components/Loader/Loader';
import { useProducts } from '../../hooks/useProducts';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './Home.module.css';

/* ── Íconos SVG para Benefits (sin emojis) ── */
const BenefitIcon = ({ type }) => {
  const icons = {
    quality: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="32" height="32">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    shipping: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="32" height="32">
        <rect x="1" y="3" width="15" height="13" rx="1"/>
        <path d="M16 8h4l3 3v5h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    science: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="32" height="32">
        <path d="M9 3h6M10 3v7L5.5 17A2 2 0 007 21h10a2 2 0 001.5-3.37L14 10V3"/>
        <path d="M7 17h10"/>
      </svg>
    ),
    price: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="32" height="32">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
  };
  return icons[type] || null;
};

/* ── Benefits data ── */
const BENEFITS = [
  {
    icon: 'quality',
    title: 'Calidad Garantizada',
    desc: 'Todos nuestros suplementos son certificados y testeados en laboratorios de primer nivel.',
  },
  {
    icon: 'shipping',
    title: 'Envío Express',
    desc: 'Recibí tus productos en 24-48 hs con seguimiento en tiempo real sin costo adicional.',
  },
  {
    icon: 'science',
    title: 'Respaldo Científico',
    desc: 'Fórmulas desarrolladas por nutricionistas y expertos en rendimiento deportivo.',
  },
  {
    icon: 'price',
    title: 'Mejor Precio',
    desc: 'Garantía de precio: si encontrás más barato, te igualamos y además te damos un 10% off.',
  },
];

/* ── Brands ── */
const BRANDS = ['Optimum Nutrition', 'MuscleTech', 'BSN', 'Dymatize', 'Cellucor', 'Ghost'];

export default function Home() {
  const { products, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Mostrar solo los primeros 8 productos en el home
  const featured = products.slice(0, 8);

  const { ref: benefitsRef, isVisible: benefitsVisible } = useIntersectionObserver();
  const { ref: brandsRef, isVisible: brandsVisible } = useIntersectionObserver();

  return (
    <main>
      {/* ── Hero ── */}
      <Hero />

      {/* ── Benefits ── */}
      <section className={`section ${styles.benefitsSection}`} ref={benefitsRef}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-xl)' }}>
            <span className="badge badge-orange">¿Por qué elegir TD?</span>
            <h2
              className={`section-title ${benefitsVisible ? 'animate-slideUp' : ''}`}
              style={{ marginTop: 'var(--space-md)' }}
            >
              Lo que nos hace <span className="text-orange">diferentes</span>
            </h2>
            <div className="accent-line" />
          </div>
          <div className={styles.benefitsGrid}>
            {BENEFITS.map((b, i) => (
              <div
                key={b.title}
                className={`${styles.benefitCard} ${benefitsVisible ? styles.visible : ''}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={styles.benefitIconWrap}>
                  <BenefitIcon type={b.icon} />
                </div>
                <h3 className={styles.benefitTitle}>{b.title}</h3>
                <p className={styles.benefitDesc}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className={`section ${styles.featuredSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <span className="badge badge-orange">Más vendidos</span>
              <h2 className="section-title" style={{ marginTop: 'var(--space-md)' }}>
                Productos <span className="text-orange">Destacados</span>
              </h2>
            </div>
            <a href="/products" className="btn btn-outline" id="home-view-all">
              Ver todos →
            </a>
          </div>

          {loading ? (
            <SkeletonGrid count={8} />
          ) : error ? (
            <div className={styles.errorState}>
              <p>{error}</p>
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {featured.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenModal={setSelectedProduct}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <section className={styles.statsBanner}>
        <div className="container">
          <div className={styles.statsGrid}>
            {[
              { value: '500+',    label: 'Productos disponibles' },
              { value: '50.000+', label: 'Clientes satisfechos' },
              { value: '98%',     label: 'Satisfacción garantizada' },
              { value: '10+',     label: 'Años en el mercado' },
            ].map(({ value, label }) => (
              <div key={label} className={styles.statItem}>
                <span className={styles.statValue}>{value}</span>
                <span className={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brands ── */}
      <section className={`section-sm ${styles.brandsSection}`} ref={brandsRef}>
        <div className="container">
          <p className={styles.brandsTitle}>Marcas que trabajamos</p>
          <div className={`${styles.brandsRow} ${brandsVisible ? styles.visible : ''}`}>
            {BRANDS.map(brand => (
              <div key={brand} className={styles.brandItem}>{brand}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Modal ── */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </main>
  );
}
