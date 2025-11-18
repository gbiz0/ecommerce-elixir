'use client';

import { Order } from '@/app/models/order';
import { useEffect, useState } from 'react';

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then(setOrders);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order #{order.id} - Total: ${order.total}
          </li>
        ))}
      </ul>
    </div>
  );
}
