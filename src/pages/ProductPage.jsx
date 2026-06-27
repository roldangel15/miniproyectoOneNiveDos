import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductDetail from '../components/ProductDetail';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Para evitar actualizaciones en componente desmontado
    
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        
        if (isMounted) {
          setProduct(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError('Producto no encontrado');
          console.error('Error:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [id]); // Solo se ejecuta cuando cambia el ID

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ProductDetail 
        product={product} 
        loading={loading} 
        error={error} 
      />
    </div>
  );
};

export default ProductPage;