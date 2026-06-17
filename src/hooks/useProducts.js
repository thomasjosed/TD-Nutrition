/**
 * useProducts — Custom Hook
 * Gestiona la carga, filtrado y búsqueda de productos desde la API
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchProducts, fetchCategories } from '../services/api';

export function useProducts() {
  const [products, setProducts]       = useState([]);
  const [categories, setCategories]   = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [searchTerm, setSearchTerm]   = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Carga inicial de productos y categorías
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(100),
          fetchCategories(),
        ]);
        setProducts(productsData.products);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message || 'Error al cargar los productos.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Reintentar carga en caso de error
  const retry = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts(100);
      setProducts(data.products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Filtrado computado: categoría + búsqueda en tiempo real
  const filteredProducts = useMemo(() => {
    let result = products;

    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.brand?.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
      );
    }

    return result;
  }, [products, activeCategory, searchTerm]);

  return {
    products,
    filteredProducts,
    categories,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    retry,
  };
}
