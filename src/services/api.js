/**
 * API Service — TD Nutrition
 * Hace una petición real a internet usando Fetch API.
 * Se conecta al JSON público hosteado en GitHub Raw.
 */

const API_URL = 'https://raw.githubusercontent.com/thomasjosed/TD-Nutrition/main/public/data/products.json';

// Caché en memoria para no saturar la red con llamadas repetidas
let cacheData = null;

/** Función base que hace el fetch real a la URL externa */
const fetchExternalData = async () => {
  if (cacheData) return cacheData;
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error de red al obtener los productos');
    const data = await res.json();
    cacheData = data; // Guarda en caché
    return data;
  } catch (error) {
    console.error("Falló la conexión a la API externa:", error);
    // Retorna datos vacíos si no hay internet o falla el fetch
    return { products: [], categories: [] };
  }
};

/**
 * Obtiene todos los productos desde la API
 * @param {number} limit - máximo de productos a retornar
 * @param {number} skip  - cuántos omitir (paginación)
 */
export const fetchProducts = async (limit = 100, skip = 0) => {
  const data = await fetchExternalData();
  const all = data.products || [];
  const sliced = all.slice(skip, skip + limit);
  return { products: sliced, total: all.length, skip, limit };
};

/**
 * Obtiene un producto por su ID
 * @param {number|string} id
 */
export const fetchProductById = async (id) => {
  const data = await fetchExternalData();
  const product = (data.products || []).find(p => String(p.id) === String(id));
  if (!product) throw new Error(`Producto ${id} no encontrado en la API.`);
  return product;
};

/**
 * Obtiene todas las categorías disponibles desde la API
 */
export const fetchCategories = async () => {
  const data = await fetchExternalData();
  return data.categories || [];
};

/**
 * Busca productos por término de búsqueda en los datos obtenidos de la API
 * @param {string} query
 */
export const searchProducts = async (query) => {
  const data = await fetchExternalData();
  const q = query.toLowerCase().trim();
  const results = (data.products || []).filter(p => 
    p.title.toLowerCase().includes(q) || 
    p.category.toLowerCase().includes(q) ||
    (p.brand && p.brand.toLowerCase().includes(q))
  );
  return { products: results, total: results.length };
};

/**
 * Obtiene productos filtrados por categoría desde la API
 * @param {string} category - slug de la categoría
 */
export const fetchProductsByCategory = async (category) => {
  const data = await fetchExternalData();
  const results = (data.products || []).filter(p => p.category === category);
  return { products: results, total: results.length };
};
