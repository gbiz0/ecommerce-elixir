"use client";

import OrderList from '@/app/components/orders/OrderList';
import Link from 'next/link';
import withAuth from '../components/withAuth';

function OrdersPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Pedidos</h1>
        <Link href="/orders/new" className="bg-blue-500 text-white px-4 py-2 rounded">
          Novo Pedido
        </Link>
      </div>
      <OrderList />
    </div>
  );
}

export default withAuth(OrdersPage);
