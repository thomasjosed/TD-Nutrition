/**
 * ProductModal — TD Nutrition
 * Modal de detalle de producto con imagen ampliada, descripción completa y CTA
 */

import { useEffect, useCallback } from 'react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import StarRating from '../StarRating/StarRating';
import styles from './ProductModal.module.css';

export default function ProductModal({ product, onClose }) {
  const { addItem, items, updateQuantity } = useCart();
  const { addToast } = useToast();

  const cartItem = items.find(i => i.product.id === product.id);
  const discountedPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : null;

  // Cerrar con ESC
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  // Bloquear scroll del body
  useEffect(() => {
    document.body.classList.add('no-scroll');
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('no-scroll');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleAdd = () => {
    addItem(product);
    addToast(`✅ ${product.title} agregado al carrito`, 'success');
  };

  const handleQtyChange = (delta) => {
    const newQty = (cartItem?.quantity ?? 0) + delta;
    if (newQty <= 0) return;
    if (cartItem) updateQuantity(product.id, newQty);
    else if (delta > 0) { addItem(product); addToast(`✅ ${product.title} agregado`, 'success'); }
  };

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalle de ${product.title}`}
    >
      <div className={styles.modal}>
        {/* Close button */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <div className={styles.inner}>
          {/* ── Left: Image ── */}
          <div className={styles.imageSection}>
            <div className={styles.imageWrapper}>
              <img
                src={product.images?.[0] ?? product.thumbnail}
                alt={product.title}
                className={styles.image}
              />
              {product.discountPercentage >= 5 && (
                <span className={styles.discountBadge}>
                  -{Math.round(product.discountPercentage)}% OFF
                </span>
              )}
            </div>

            {/* Thumbnail strip */}
            {product.images?.length > 1 && (
              <div className={styles.thumbnails}>
                {product.images.slice(0, 4).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${product.title} vista ${idx + 1}`}
                    className={styles.thumb}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Details ── */}
          <div className={styles.details}>
            {/* Category & Brand */}
            <div className={styles.meta}>
              <span className={styles.category}>{product.category}</span>
              {product.brand && <span className={styles.brand}>— {product.brand}</span>}
            </div>

            {/* Title */}
            <h2 className={styles.title}>{product.title}</h2>

            {/* Rating */}
            <div className={styles.rating}>
              <StarRating rating={product.rating} size="md" />
              <span className={styles.ratingText}>
                {product.rating?.toFixed(1)} — Excelente valoración
              </span>
            </div>

            {/* Description */}
            <p className={styles.description}>{product.description}</p>

            {/* Pricing */}
            <div className={styles.pricing}>
              {discountedPrice ? (
                <>
                  <span className={styles.priceOld}>${product.price.toFixed(2)}</span>
                  <span className={styles.priceCurrent}>${discountedPrice.toFixed(2)}</span>
                  <span className={styles.savingsTag}>
                    Ahorras ${(product.price - discountedPrice).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className={styles.priceCurrent}>${product.price.toFixed(2)}</span>
              )}
            </div>

            {/* Stock */}
            <div className={styles.stockInfo}>
              <div className={`${styles.stockDot} ${product.stock > 10 ? styles.inStock : styles.lowStock}`} />
              <span>
                {product.stock > 10
                  ? `En stock (${product.stock} disponibles)`
                  : `⚠️ Solo quedan ${product.stock} unidades`}
              </span>
            </div>

            {/* Quantity + Add button */}
            <div className={styles.cartActions}>
              {cartItem ? (
                <div className={styles.qtyControl}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => handleQtyChange(-1)}
                    aria-label="Reducir cantidad"
                  >−</button>
                  <span className={styles.qtyValue}>{cartItem.quantity}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => handleQtyChange(1)}
                    aria-label="Aumentar cantidad"
                  >+</button>
                </div>
              ) : null}

              <button
                className={`btn btn-primary ${styles.addBtn}`}
                onClick={handleAdd}
                id={`modal-add-cart-${product.id}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                {cartItem ? `Agregar más (${cartItem.quantity} en carrito)` : 'Agregar al carrito'}
              </button>
            </div>

            {/* Shipping notice */}
            <div className={styles.shipping}>
              <span>🚚 Envío gratis en compras +$50</span>
              <span>🔒 Pago 100% seguro</span>
              <span>↩️ Devoluciones en 30 días</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
