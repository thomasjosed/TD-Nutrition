/**
 * Products Page — TD Nutrition
 * Catálogo completo con búsqueda, filtros y modal de producto
 */

import { useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductModal from '../../components/ProductModal/ProductModal';
import SearchBar from '../../components/SearchBar/SearchBar';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import { SkeletonGrid } from '../../components/Loader/Loader';
import { useProducts } from '../../hooks/useProducts';
import styles from './Products.module.css';

/* ── Sort options ── */
const SORT_OPTIONS = [
  { value: 'default',       label: 'Predeterminado' },
  { value: 'price-asc',     label: 'Precio: Menor a mayor' },
  { value: 'price-desc',    label: 'Precio: Mayor a menor' },
  { value: 'rating-desc',   label: 'Mejor valorados' },
  { value: 'name-asc',      label: 'Nombre: A-Z' },
];

function sortProducts(products, sortBy) {
  const arr = [...products];
  switch (sortBy) {
    case 'price-asc':   return arr.sort((a, b) => a.price - b.price);
    case 'price-desc':  return arr.sort((a, b) => b.price - a.price);
    case 'rating-desc': return arr.sort((a, b) => b.rating - a.rating);
    case 'name-asc':    return arr.sort((a, b) => a.title.localeCompare(b.title));
    default:            return arr;
  }
}

export default function Products() {
  const {
    filteredProducts,
    categories,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    retry,
  } = useProducts();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const sorted = sortProducts(filteredProducts, sortBy);

  return (
    <main className={styles.page}>
      {/* ── Page Header ── */}
      <div className={styles.pageHeader}>
        <div className="container">
          <div className={styles.headerContent}>
            <div>
              <span className="badge badge-orange">Catálogo</span>
              <h1 className={styles.pageTitle}>
                Todos los <span className="text-orange">Productos</span>
              </h1>
              <p className={styles.pageSubtitle}>
                {loading
                  ? 'Cargando productos...'
                  : `${sorted.length} productos disponibles`}
              </p>
            </div>
            {/* Breadcrumb */}
            <nav className={styles.breadcrumb} aria-label="Navegación">
              <a href="/">Inicio</a>
              <span>/</span>
              <span>Productos</span>
            </nav>
          </div>
        </div>
      </div>

      {/* ── Filters Bar ── */}
      <div className={styles.filtersBar}>
        <div className="container">
          <div className={styles.filtersTop}>
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              resultCount={sorted.length}
            />
            <div className={styles.controls}>
              {/* Sort */}
              <select
                className={styles.sortSelect}
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                aria-label="Ordenar productos"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>

              {/* View mode toggle */}
              <div className={styles.viewToggle}>
                <button
                  className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.viewBtnActive : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Vista cuadrícula"
                  title="Cuadrícula"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="3" y="3" width="7" height="7" rx="1"/>
                    <rect x="14" y="3" width="7" height="7" rx="1"/>
                    <rect x="3" y="14" width="7" height="7" rx="1"/>
                    <rect x="14" y="14" width="7" height="7" rx="1"/>
                  </svg>
                </button>
                <button
                  className={`${styles.viewBtn} ${viewMode === 'list' ? styles.viewBtnActive : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="Vista lista"
                  title="Lista"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6"/>
                    <line x1="8" y1="12" x2="21" y2="12"/>
                    <line x1="8" y1="18" x2="21" y2="18"/>
                    <line x1="3" y1="6" x2="3.01" y2="6"/>
                    <line x1="3" y1="12" x2="3.01" y2="12"/>
                    <line x1="3" y1="18" x2="3.01" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Category chips */}
          {!loading && categories.length > 0 && (
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onSelect={setActiveCategory}
            />
          )}
        </div>
      </div>

      {/* ── Products Grid ── */}
      <section className={styles.productsSection}>
        <div className="container">

          {/* Active filter indicator */}
          {(activeCategory !== 'all' || searchTerm) && (
            <div className={styles.activeFilters}>
              {activeCategory !== 'all' && (
                <span className={styles.filterTag}>
                  Categoría: {activeCategory}
                  <button onClick={() => setActiveCategory('all')}>×</button>
                </span>
              )}
              {searchTerm && (
                <span className={styles.filterTag}>
                  Búsqueda: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')}>×</button>
                </span>
              )}
              <button
                className={styles.clearFilters}
                onClick={() => { setActiveCategory('all'); setSearchTerm(''); }}
              >
                Limpiar todos
              </button>
            </div>
          )}

          {/* Loading state */}
          {loading && <SkeletonGrid count={12} />}

          {/* Error state */}
          {!loading && error && (
            <div className={styles.errorState}>
              <div className={styles.errorIcon}>⚠️</div>
              <h3>Error al cargar los productos</h3>
              <p>{error}</p>
              <button className="btn btn-primary" onClick={retry}>
                Reintentar
              </button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && sorted.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🔍</div>
              <h3>Sin resultados</h3>
              <p>No encontramos productos que coincidan con tu búsqueda.</p>
              <button
                className="btn btn-outline"
                onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
              >
                Ver todos los productos
              </button>
            </div>
          )}

          {/* Products */}
          {!loading && !error && sorted.length > 0 && (
            <div className={`${styles.productsGrid} ${viewMode === 'list' ? styles.listView : ''}`}>
              {sorted.map(product => (
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

      {/* ── Modal ── */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </main>
  );
}
