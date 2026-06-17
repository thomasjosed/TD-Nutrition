/**
 * CategoryFilter — TD Nutrition
 * Filtro de categorías fitness con scroll horizontal y chips activos
 */

import styles from './CategoryFilter.module.css';

/* Íconos SVG inline para categorías fitness (sin emojis de comida/belleza) */
const CATEGORY_ICONS = {
  'proteinas':    '🥛',
  'creatina':     '⚗️',
  'pre-entreno':  '⚡',
  'aminoacidos':  '🔬',
  'vitaminas':    '💊',
  'fat-burners':  '🔥',
  'mass-gainers': '📈',
  'mancuernas':   '🏋️',
  'barras':       '🔩',
  'equipamiento': '🎽',
};

function getIcon(slug) {
  return CATEGORY_ICONS[slug] || '📦';
}

export default function CategoryFilter({ categories, activeCategory, onSelect }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.scroll}>
        {/* "Todos" button */}
        <button
          className={`${styles.chip} ${activeCategory === 'all' ? styles.chipActive : ''}`}
          onClick={() => onSelect('all')}
          id="filter-all"
          aria-pressed={activeCategory === 'all'}
        >
          <span>🏪</span>
          Todos
        </button>

        {/* Category chips — admite { slug, label } u objetos simples string */}
        {categories.map(cat => {
          const slug  = typeof cat === 'string' ? cat : cat.slug;
          const label = typeof cat === 'string' ? cat : cat.label;

          return (
            <button
              key={slug}
              className={`${styles.chip} ${activeCategory === slug ? styles.chipActive : ''}`}
              onClick={() => onSelect(slug)}
              id={`filter-${slug}`}
              aria-pressed={activeCategory === slug}
            >
              <span>{getIcon(slug)}</span>
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
