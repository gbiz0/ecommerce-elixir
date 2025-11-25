"use client";

import OrderForm from "@/app/components/orders/OrderForm";
import withAuth from "../../components/withAuth";

function NewOrderPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Novo Pedido</h1>
      <OrderForm />
    </div>
  );
}

export default withAuth(NewOrderPage);
