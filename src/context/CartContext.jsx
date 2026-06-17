/**
 * CartContext — TD Nutrition
 * Gestión global del carrito de compras con Context API y persistencia en localStorage
 */

import { createContext, useContext, useReducer, useEffect } from 'react';

// ── Tipos de acción del reducer ─────────────────────────────
const CART_ACTIONS = {
  ADD_ITEM:      'ADD_ITEM',
  REMOVE_ITEM:   'REMOVE_ITEM',
  UPDATE_QTY:    'UPDATE_QTY',
  CLEAR_CART:    'CLEAR_CART',
  LOAD_FROM_LS:  'LOAD_FROM_LS',
};

// ── Estado inicial ──────────────────────────────────────────
const initialState = {
  items: [],    // Array de { product, quantity }
  isOpen: false, // Si el drawer del carrito está visible
};

// ── Reducer ─────────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {

    case CART_ACTIONS.LOAD_FROM_LS:
      return { ...state, items: action.payload };

    case CART_ACTIONS.ADD_ITEM: {
      const existing = state.items.find(i => i.product.id === action.payload.id);
      if (existing) {
        // Si ya existe, incrementa la cantidad
        return {
          ...state,
          items: state.items.map(i =>
            i.product.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      // Si no existe, agrega nuevo ítem
      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }],
      };
    }

    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(i => i.product.id !== action.payload),
      };

    case CART_ACTIONS.UPDATE_QTY: {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(i => i.product.id !== id),
        };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.product.id === id ? { ...i, quantity } : i
        ),
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return { ...state, items: [] };

    default:
      return state;
  }
}

// ── Creación del contexto ───────────────────────────────────
const CartContext = createContext(null);

const LS_KEY = 'td_nutrition_cart';

// ── Provider ────────────────────────────────────────────────
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Cargar carrito desde localStorage al montar
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: CART_ACTIONS.LOAD_FROM_LS, payload: parsed });
      }
    } catch {
      console.warn('No se pudo leer el carrito de localStorage.');
    }
  }, []);

  // Persistir carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(state.items));
  }, [state.items]);

  // ── Acciones expuestas ──────────────────────────────────
  const addItem = (product) =>
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product });

  const removeItem = (id) =>
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: id });

  const updateQuantity = (id, quantity) =>
    dispatch({ type: CART_ACTIONS.UPDATE_QTY, payload: { id, quantity } });

  const clearCart = () =>
    dispatch({ type: CART_ACTIONS.CLEAR_CART });

  // ── Valores calculados ──────────────────────────────────
  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);

  const subtotal = state.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  const discount = state.items.reduce(
    (sum, i) => sum + (i.product.price * (i.product.discountPercentage ?? 0) / 100) * i.quantity,
    0
  );

  const total = subtotal - discount;

  const contextValue = {
    items: state.items,
    totalItems,
    subtotal,
    discount,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

// ── Hook personalizado ──────────────────────────────────────
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return ctx;
}
