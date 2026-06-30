import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetchProducts  from '../hooks/useFetchProducts';
import ProductDetail from '../components/ProductDetail';

export default function ProductPage() {
  const { id } = useParams();
  const { fetchProductById } = useFetchProducts();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    fetchProductById(id).then((data) => {
      if (!active) return;
      if (data) setProduct(data);
      else setError('Producto no encontrado.');
      setLoading(false);
    });
    return () => { active = false; };
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-[60vh] bg-background py-8">
      <ProductDetail product={product} loading={loading} error={error} />
    </div>
  );
}
