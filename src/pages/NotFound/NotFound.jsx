/**
 * NotFound Page — TD Nutrition
 * Página 404 con diseño premium y navegación de vuelta
 */

import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <div className={styles.glow} />
        <h1 className={styles.code}>404</h1>
        <div className={styles.emoji}>🥤</div>
        <h2 className={styles.title}>Página no encontrada</h2>
        <p className={styles.desc}>
          Parece que te perdiste en el camino. La página que buscás no existe
          o fue movida a otra ubicación.
        </p>
        <div className={styles.actions}>
          <Link to="/" className="btn btn-primary" id="notfound-home">
            ← Volver al inicio
          </Link>
          <Link to="/products" className="btn btn-outline" id="notfound-products">
            Ver productos
          </Link>
        </div>
      </div>
    </main>
  );
}
