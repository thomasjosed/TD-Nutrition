/**
 * Cart — TD Nutrition
 * Drawer lateral del carrito de compras con gestión de items y totales
 */

import { useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import styles from './Cart.module.css';

export default function Cart({ isOpen, onClose }) {
  const { items, removeItem, updateQuantity, clearCart, subtotal, discount, total, totalItems } = useCart();

  // Bloquear scroll cuando está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [isOpen]);

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
        aria-label="Carrito de compras"
        role="dialog"
        aria-modal="true"
      >
        {/* ── Header ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <h2 className={styles.title}>Mi Carrito</h2>
            {totalItems > 0 && (
              <span className={styles.count}>{totalItems}</span>
            )}
          </div>
          <div className={styles.headerRight}>
            {items.length > 0 && (
              <button className={styles.clearBtn} onClick={clearCart} title="Vaciar carrito">
                🗑️ Vaciar
              </button>
            )}
            <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar carrito">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── Items ── */}
        <div className={styles.itemsWrapper}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🛒</div>
              <h3>Tu carrito está vacío</h3>
              <p>Agrega productos para comenzar tu compra</p>
              <button className="btn btn-primary" onClick={onClose}>
                Ver Productos
              </button>
            </div>
          ) : (
            <ul className={styles.itemsList}>
              {items.map(({ product, quantity }) => (
                <CartItem
                  key={product.id}
                  product={product}
                  quantity={quantity}
                  onRemove={() => removeItem(product.id)}
                  onQtyChange={(qty) => updateQuantity(product.id, qty)}
                />
              ))}
            </ul>
          )}
        </div>

        {/* ── Footer: Totals + Checkout ── */}
        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totals}>
              <div className={styles.totalRow}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className={`${styles.totalRow} ${styles.discountRow}`}>
                  <span>🎉 Descuentos</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className={styles.totalRow}>
                <span>Envío</span>
                <span className={styles.free}>
                  {total >= 50 ? '¡GRATIS!' : `$9.99`}
                </span>
              </div>
              <div className={`${styles.totalRow} ${styles.totalFinal}`}>
                <span>Total</span>
                <span>${(total >= 50 ? total : total + 9.99).toFixed(2)}</span>
              </div>
            </div>

            {total < 50 && (
              <div className={styles.freeShippingBar}>
                <span>Agrega ${(50 - total).toFixed(2)} más para envío gratis 🚚</span>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${Math.min((total / 50) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            <button
              className={`btn btn-primary ${styles.checkoutBtn}`}
              id="checkout-button"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
              Finalizar Compra
            </button>

            <p className={styles.secureNote}>🔒 Pago seguro con SSL</p>
          </div>
        )}
      </aside>
    </>
  );
}

/* ── Sub-component: CartItem ── */
function CartItem({ product, quantity, onRemove, onQtyChange }) {
  const linePrice = product.price * quantity *
    (1 - (product.discountPercentage ?? 0) / 100);

  return (
    <li className={styles.item}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className={styles.itemImg}
        onError={e => { e.target.src = 'https://placehold.co/80x80/1e1e1e/FF7A00?text=TD'; }}
      />
      <div className={styles.itemInfo}>
        <p className={styles.itemName}>{product.title}</p>
        {product.brand && <p className={styles.itemBrand}>{product.brand}</p>}
        <p className={styles.itemLinePrice}>${linePrice.toFixed(2)}</p>
      </div>
      <div className={styles.itemControls}>
        <div className={styles.qty}>
          <button
            className={styles.qtyBtn}
            onClick={() => onQtyChange(quantity - 1)}
            aria-label="Reducir cantidad"
          >−</button>
          <span className={styles.qtyNum}>{quantity}</span>
          <button
            className={styles.qtyBtn}
            onClick={() => onQtyChange(quantity + 1)}
            aria-label="Aumentar cantidad"
          >+</button>
        </div>
        <button
          className={styles.removeBtn}
          onClick={onRemove}
          aria-label={`Eliminar ${product.title}`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14H6L5 6"/>
            <path d="M10 11v6M14 11v6"/>
            <path d="M9 6V4h6v2"/>
          </svg>
        </button>
      </div>
    </li>
  );
}
