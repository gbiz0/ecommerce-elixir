"use client";

import ProductForm from '@/app/components/products/ProductForm';
import { Product } from '@/app/models/product';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import withAuth from '@/app/components/withAuth';
import { useAuth } from '@/app/contexts/AuthContext';

function EditProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const params = useParams();
  const { id } = params;
  const { token } = useAuth();

  useEffect(() => {
    if (id && token) {
      fetch(`/api/products/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((res) => {
          if (res.ok) return res.json();
          return null;
        })
        .then((data) => {
          if (data) setProduct(data);
        })
        .catch(console.error);
    }
  }, [id, token]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Editar Produto</h1>
      {product ? <ProductForm product={product} /> : <p>Carregando...</p>}
    </div>
  );
}

export default withAuth(EditProductPage);
