"use client";

import { Product } from '@/app/models/product';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Você tem certeza que deseja deletar este produto?')) {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900">{product.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900">{product.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900">{product.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link href={`/products/${product.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                  Editar
                </Link>
                <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
