"use client";

import OrderForm from "@/app/components/orders/OrderForm";
import { Order } from "@/app/models/order";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import withAuth from "@/app/components/withAuth";
import { useAuth } from "@/app/contexts/AuthContext";

function EditOrderPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const params = useParams();

  const { id } = params;
  const { token } = useAuth();

  useEffect(() => {
    if (id && token) {
      fetch(`/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.ok) return res.json();
          return null;
        })
        .then((data) => {
          if (data) setOrder(data);
        })
        .catch(console.error);
    }
  }, [id, token]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Editar Pedido</h1>
      {order ? <OrderForm order={order} /> : <p>Carregando...</p>}
    </div>
  );
}

export default withAuth(EditOrderPage);
