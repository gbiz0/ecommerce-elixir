"use client";

import OrderForm from '@/app/components/orders/OrderForm';
import { Order } from '@/app/models/order';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import withAuth from '@/app/components/withAuth';

function EditOrderPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      fetch(`/api/orders/${id}`)
        .then((res) => res.json())
        .then(setOrder);
    }
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Editar Pedido</h1>
      {order ? <OrderForm order={order} /> : <p>Carregando...</p>}
    </div>
  );
}

export default withAuth(EditOrderPage);
