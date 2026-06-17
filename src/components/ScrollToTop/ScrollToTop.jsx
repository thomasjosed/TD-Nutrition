/**
 * ScrollToTop — TD Nutrition
 * Botón flotante para volver al inicio de la página
 */

import { useScrollToTop } from '../../hooks/useScrollToTop';
import styles from './ScrollToTop.module.css';

export default function ScrollToTop() {
  const { visible, scrollToTop } = useScrollToTop(400);

  return (
    <button
      className={`${styles.btn} ${visible ? styles.visible : ''}`}
      onClick={scrollToTop}
      aria-label="Volver al inicio"
      title="Volver arriba"
      id="scroll-to-top"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </button>
  );
}
