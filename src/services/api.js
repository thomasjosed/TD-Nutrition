/**
 * API Service — TD Nutrition
 * Sirve el catálogo local de productos fitness.
 * Simula llamadas asíncronas (con delay mínimo) para mantener
 * la misma interfaz de Fetch API que si fuera un servidor real.
 */

import {
  getAllProducts,
  getAllCategories,
  searchProducts as localSearch,
  getByCategory,
  getProductById,
} from '../data/products';

/** Simula latencia de red para mostrar el skeleton loader */
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Obtiene todos los productos del catálogo local
 * @param {number} limit - máximo de productos a retornar
 * @param {number} skip  - cuántos omitir (paginación)
 */
export const fetchProducts = async (limit = 100, skip = 0) => {
  await delay(400);
  const all = getAllProducts();
  const sliced = all.slice(skip, skip + limit);
  return { products: sliced, total: all.length, skip, limit };
};

/**
 * Obtiene un producto por su ID
 * @param {number|string} id
 */
export const fetchProductById = async (id) => {
  await delay(200);
  const product = getProductById(id);
  if (!product) throw new Error(`Producto ${id} no encontrado.`);
  return product;
};

/**
 * Obtiene todas las categorías disponibles
 */
export const fetchCategories = async () => {
  await delay(200);
  return getAllCategories();
};

/**
 * Busca productos por término de búsqueda
 * @param {string} query
 */
export const searchProducts = async (query) => {
  await delay(200);
  const results = localSearch(query);
  return { products: results, total: results.length };
};

/**
 * Obtiene productos filtrados por categoría
 * @param {string} category - slug de la categoría
 */
export const fetchProductsByCategory = async (category) => {
  await delay(200);
  const results = getByCategory(category);
  return { products: results, total: results.length };
};
