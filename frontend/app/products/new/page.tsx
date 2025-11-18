"use client";

import ProductForm from '@/app/components/products/ProductForm';
import withAuth from '../../components/withAuth';

function NewProductPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Novo Produto</h1>
      <ProductForm />
    </div>
  );
}

export default withAuth(NewProductPage);
