/**
 * Loader — TD Nutrition
 * Componente de carga con spinner y skeleton loading
 */

import styles from './Loader.module.css';

/* ── Full-page spinner ── */
export function Loader({ message = 'Cargando...' }) {
  return (
    <div className={styles.loaderWrapper} role="status" aria-label={message}>
      <div className={styles.spinnerRing}>
        <div className={styles.spinnerInner} />
      </div>
      <div className={styles.loaderText}>{message}</div>
    </div>
  );
}

/* ── Skeleton card (for product grids) ── */
export function SkeletonCard() {
  return (
    <div className={styles.skeletonCard} aria-hidden="true">
      <div className={`${styles.skeleton} ${styles.skeletonImage}`} />
      <div className={styles.skeletonContent}>
        <div className={`${styles.skeleton} ${styles.skeletonBrand}`} />
        <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
        <div className={`${styles.skeleton} ${styles.skeletonTitleShort}`} />
        <div className={`${styles.skeleton} ${styles.skeletonStars}`} />
        <div className={`${styles.skeleton} ${styles.skeletonPrice}`} />
      </div>
      <div className={`${styles.skeleton} ${styles.skeletonBtn}`} />
    </div>
  );
}

/* ── Skeleton grid (multiple cards) ── */
export function SkeletonGrid({ count = 8 }) {
  return (
    <div className={styles.skeletonGrid}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
