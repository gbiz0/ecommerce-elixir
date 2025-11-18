"use client";

import ProductList from '@/app/components/products/ProductList';
import Link from 'next/link';
import withAuth from '../components/withAuth';

function ProductsPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Produtos</h1>
        <Link href="/products/new" className="bg-blue-500 text-white px-4 py-2 rounded">
          Novo Produto
        </Link>
      </div>
      <ProductList />
    </div>
  );
}

export default withAuth(ProductsPage);
