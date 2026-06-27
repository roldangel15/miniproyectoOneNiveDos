import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const ProductDetail = ({ product, loading, error }) => {
  const navigate = useNavigate();
 const { addToCart } = useCart();

  // Skeleton loading
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Volver
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl p-6 md:p-8 shadow-sm">
          {/* Skeleton Image */}
          <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
          
          {/* Skeleton Content */}
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            <div className="h-24 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-8 text-center">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Volver
          </button>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Producto no encontrado
          </h2>
          <p className="text-gray-600 mb-6">
            Lo sentimos, el producto que buscas no existe o fue eliminado.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  // No product and not loading
  if (!product && !loading) {
    return (
      <div className="max-w-6xl mx-auto p-8 text-center">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Volver
          </button>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Sin datos del producto
          </h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-4"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  // Success - render product
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          ← Volver
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl p-6 md:p-8 shadow-sm">
        {/* Product Image */}
        <div className="flex items-center justify-center bg-gray-50 rounded-xl p-8">
          <img 
            src={product?.image} 
            alt={product?.title} 
            className="max-w-full max-h-96 object-contain"
          />
        </div>
        
        {/* Product Info */}
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 uppercase tracking-wide mb-2">
            {product?.category}
          </span>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
            {product?.title}
          </h1>
          
          <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
            ${product?.price?.toFixed(2)}
          </p>
          
          <p className="text-base text-gray-600 leading-relaxed mb-8">
            {product?.description}
          </p>
          
          <div className="mt-auto">
            <button
              onClick={handleAddToCart}
              className="w-full md:w-auto px-8 py-4 bg-blue-600 text-white rounded-lg text-base font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <span>🛒</span>
              <span>Añadir al carrito</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;