/**
 * SearchBar — TD Nutrition
 * Barra de búsqueda en tiempo real con icono y botón de limpiar
 */

import styles from './SearchBar.module.css';

export default function SearchBar({ value, onChange, placeholder = 'Buscar productos...', resultCount }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        {/* Search icon */}
        <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>

        <input
          type="search"
          className={styles.input}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label="Buscar productos"
          id="product-search"
          autoComplete="off"
        />

        {/* Clear button */}
        {value && (
          <button
            className={styles.clearBtn}
            onClick={() => onChange('')}
            aria-label="Limpiar búsqueda"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        )}
      </div>

      {/* Result count */}
      {value && (
        <p className={styles.resultCount}>
          {resultCount === 0
            ? 'Sin resultados para "' + value + '"'
            : `${resultCount} producto${resultCount !== 1 ? 's' : ''} encontrado${resultCount !== 1 ? 's' : ''}`}
        </p>
      )}
    </div>
  );
}
