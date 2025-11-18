"use client";

import ProductForm from '@/app/components/products/ProductForm';
import { Product } from '@/app/models/product';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import withAuth from '@/app/components/withAuth';

function EditProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      fetch(`/api/products/${id}`)
        .then((res) => res.json())
        .then(setProduct);
    }
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Editar Produto</h1>
      {product ? <ProductForm product={product} /> : <p>Carregando...</p>}
    </div>
  );
}

export default withAuth(EditProductPage);
