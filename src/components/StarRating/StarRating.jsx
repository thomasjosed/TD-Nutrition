/**
 * StarRating — TD Nutrition
 * Componente reutilizable para mostrar valoraciones con estrellas
 */

import styles from './StarRating.module.css';

export default function StarRating({ rating = 0, maxStars = 5, size = 'sm' }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className={`${styles.stars} ${styles[size]}`} aria-label={`Valoración: ${rating} de ${maxStars}`}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={`full-${i}`} className={styles.star}>★</span>
      ))}
      {hasHalf && <span className={styles.starHalf}>★</span>}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <span key={`empty-${i}`} className={styles.starEmpty}>★</span>
      ))}
    </div>
  );
}
