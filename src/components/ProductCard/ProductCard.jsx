/**
 * ProductCard — TD Nutrition
 * Tarjeta de producto con imagen, info, rating y botón de agregar al carrito
 */

import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import StarRating from '../StarRating/StarRating';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, onOpenModal }) {
  const { addItem, items } = useCart();
  const { addToast } = useToast();
  const [imgError, setImgError] = useState(false);
  const [adding, setAdding] = useState(false);

  const inCart = items.some(i => i.product.id === product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setAdding(true);
    addItem(product);
    addToast(`✅ ${product.title} agregado al carrito`, 'success');
    setTimeout(() => setAdding(false), 600);
  };

  const discountedPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : null;

  return (
    <article
      className={styles.card}
      onClick={() => onOpenModal(product)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onOpenModal(product)}
      aria-label={`Ver detalles de ${product.title}`}
    >
      {/* ── Image ── */}
      <div className={styles.imageWrapper}>
        <img
          src={imgError ? 'https://placehold.co/400x300/1e1e1e/FF7A00?text=TD+Nutrition' : product.thumbnail}
          alt={product.title}
          className={styles.image}
          onError={() => setImgError(true)}
          loading="lazy"
        />

        {/* Discount badge */}
        {product.discountPercentage >= 5 && (
          <span className={styles.discountBadge}>
            -{Math.round(product.discountPercentage)}%
          </span>
        )}

        {/* Quick-view overlay */}
        <div className={styles.overlay}>
          <span className={styles.viewLabel}>👁 Ver detalle</span>
        </div>

        {/* Category pill */}
        <span className={styles.category}>
          {product.category}
        </span>
      </div>

      {/* ── Content ── */}
      <div className={styles.content}>
        {product.brand && (
          <span className={styles.brand}>{product.brand}</span>
        )}

        <h3 className={styles.title}>{product.title}</h3>

        <div className={styles.rating}>
          <StarRating rating={product.rating} />
          <span className={styles.ratingValue}>({product.rating?.toFixed(1)})</span>
        </div>

        <div className={styles.pricing}>
          {discountedPrice ? (
            <>
              <span className={styles.priceOld}>${product.price.toFixed(2)}</span>
              <span className={styles.priceCurrent}>${discountedPrice.toFixed(2)}</span>
            </>
          ) : (
            <span className={styles.priceCurrent}>${product.price.toFixed(2)}</span>
          )}
        </div>

        {/* Stock indicator */}
        <div className={styles.stock}>
          <div
            className={`${styles.stockDot} ${product.stock > 10 ? styles.inStock : styles.lowStock}`}
          />
          <span className={styles.stockText}>
            {product.stock > 10 ? 'En stock' : `Solo ${product.stock} disponibles`}
          </span>
        </div>
      </div>

      {/* ── Add to Cart ── */}
      <button
        className={`${styles.addBtn} ${inCart ? styles.addBtnInCart : ''} ${adding ? styles.addBtnAdding : ''}`}
        onClick={handleAddToCart}
        aria-label={`Agregar ${product.title} al carrito`}
        id={`add-cart-${product.id}`}
      >
        {adding ? (
          <>
            <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            Agregado
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {inCart ? 'Agregar más' : 'Agregar al carrito'}
          </>
        )}
      </button>
    </article>
  );
}
