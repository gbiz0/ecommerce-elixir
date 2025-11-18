'use client';

import { Product } from '@/app/models/product';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ProductFormProps {
  product?: Product;
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price || 0);
  const [description, setDescription] = useState(product?.description || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = product ? 'PUT' : 'POST';
    const url = product ? `/api/products/${product.id}` : '/api/products';

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, price, description }),
    });

    router.push('/products');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {product ? 'Update' : 'Create'}
      </button>
    </form>
  );
}
