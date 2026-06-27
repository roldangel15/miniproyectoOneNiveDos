import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProducts(response.data);
    } catch (err) {
      setError('Error al cargar los productos. Intente nuevamente.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductById = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      return response.data;
    } catch (err) {
      setError('Producto no encontrado.');
      console.error('Error fetching product:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsByCategory = async (category) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/products/category/${category}`);
      setProducts(response.data);
    } catch (err) {
      setError('Error al cargar productos de esta categoría.');
      console.error('Error fetching products by category:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    fetchProductsByCategory,
  };
};

export default useFetchProducts;