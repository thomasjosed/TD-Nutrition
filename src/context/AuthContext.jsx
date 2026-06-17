/**
 * AuthContext — TD Nutrition
 * Sistema de autenticación con localStorage.
 * Para el trabajo universitario incluye usuarios demo predefinidos.
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);
const LS_KEY = 'td_nutrition_auth';

/* ── Usuarios demo ─────────────────────────────────────────
   Credenciales para la presentación del trabajo.
   En producción real esto vendría de un backend.
──────────────────────────────────────────────────────────── */
const DEMO_USERS = [
  {
    id: 1,
    name: 'Thomas Jose Daruich',
    email: 'thomas@tdnutrition.com',
    password: 'td2025',
    role: 'admin',
    avatar: 'TD',
  },
  {
    id: 2,
    name: 'David Medina',
    email: 'david@tdnutrition.com',
    password: 'td2025',
    role: 'admin',
    avatar: 'DM',
  },
  {
    id: 3,
    name: 'Usuario Demo',
    email: 'demo@tdnutrition.com',
    password: 'demo123',
    role: 'user',
    avatar: 'UD',
  },
];

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true); // inicia en true para hidratar desde LS

  /* Hidratar sesión desde localStorage al montar */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) setUser(JSON.parse(saved));
    } catch {
      localStorage.removeItem(LS_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Iniciar sesión
   * @returns {{ ok: boolean, error?: string }}
   */
  const login = useCallback(async (email, password) => {
    // Simular latencia de red
    await new Promise(r => setTimeout(r, 700));

    const found = DEMO_USERS.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase()
        && u.password === password
    );

    if (!found) {
      return { ok: false, error: 'Email o contraseña incorrectos.' };
    }

    // No guardar la contraseña en el estado
    const { password: _pwd, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem(LS_KEY, JSON.stringify(safeUser));
    return { ok: true };
  }, []);

  /**
   * Registrar usuario nuevo (simulado)
   */
  const register = useCallback(async (name, email, password) => {
    await new Promise(r => setTimeout(r, 700));

    const exists = DEMO_USERS.some(
      u => u.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (exists) {
      return { ok: false, error: 'Ya existe una cuenta con ese email.' };
    }

    const newUser = {
      id:     DEMO_USERS.length + 1,
      name:   name.trim(),
      email:  email.trim().toLowerCase(),
      role:   'user',
      avatar: name.trim().slice(0, 2).toUpperCase(),
    };

    setUser(newUser);
    localStorage.setItem(LS_KEY, JSON.stringify(newUser));
    return { ok: true };
  }, []);

  /** Cerrar sesión */
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(LS_KEY);
  }, []);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated,
      isAdmin,
      login,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
