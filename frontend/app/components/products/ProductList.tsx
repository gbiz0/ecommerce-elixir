'use client';

import { Product } from '@/app/models/product';
import { useEffect, useState } from 'react';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
