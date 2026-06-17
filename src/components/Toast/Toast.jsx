/**
 * ToastContainer — TD Nutrition
 * Contenedor de notificaciones toast en esquina superior derecha
 */

import { useToast } from '../../context/ToastContext';
import styles from './Toast.module.css';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className={styles.container} role="region" aria-live="polite" aria-label="Notificaciones">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`${styles.toast} ${styles[toast.type]}`}
          role="alert"
        >
          <div className={styles.toastIcon}>
            {toast.type === 'success' && '✅'}
            {toast.type === 'error'   && '❌'}
            {toast.type === 'info'    && 'ℹ️'}
            {toast.type === 'warning' && '⚠️'}
          </div>
          <span className={styles.toastMsg}>{toast.message}</span>
          <button
            className={styles.toastClose}
            onClick={() => removeToast(toast.id)}
            aria-label="Cerrar notificación"
          >×</button>
        </div>
      ))}
    </div>
  );
}
