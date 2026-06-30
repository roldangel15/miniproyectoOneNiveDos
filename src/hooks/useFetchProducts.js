import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const API_BASE = 'https://fakestoreapi.com';

/**
 * Hook central de datos.
 * Gestiona: fetch inicial, filtro por categoría (URL),
 * filtro por texto (búsqueda) y orden (BanerSortBar).
 *
 * @param {string} searchText  - texto del input del Header
 * @param {string} category    - categoría activa (desde useParams o "")
 * @param {string} sortOption  - opción de orden seleccionada en BanerSortBar
 */
export const useFetchProducts = ({ searchText = '', category = '', sortOption = 'Newest' } = {}) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

  // Fetch cuando cambia la categoría
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const url = category
          ? `${API_BASE}/products/category/${encodeURIComponent(category)}`
          : `${API_BASE}/products`;
        const { data } = await axios.get(url);
        setAllProducts(data);
      } catch (err) {
        setError('Error al cargar los productos. Intente nuevamente.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category]);

  // Función para reintentar
  const retry = () => {
    setAllProducts([]);
    setError(null);
    setLoading(true);
  };

  // Filtro por texto + orden (se recalcula sin nueva petición HTTP)
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // 1. Filtrar por texto
    const term = searchText.trim().toLowerCase();
    if (term) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    // 2. Ordenar
    switch (sortOption) {
      case 'Price: Low to High':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Best Rating':
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default: // 'Newest' → mantener orden original de la API (id ascendente)
        result.sort((a, b) => b.id - a.id);
        break;
    }

    return result;
  }, [allProducts, searchText, sortOption]);

  // Fetch individual por id (para ProductPage)
  const fetchProductById = async (id) => {
    try {
      const { data } = await axios.get(`${API_BASE}/products/${id}`);
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return { filteredProducts, loading, error, retry, fetchProductById };
};

export default useFetchProducts;
