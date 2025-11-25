"use client";

import { Order } from "@/app/models/order";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      fetch("/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.ok) return res.json();
          return [];
        })
        .then(setOrders)
        .catch(console.error);
    }
  }, [token]);

  const handleDelete = async (id: number) => {
    if (confirm("Você tem certeza que deseja deletar este pedido?")) {
      await fetch(`/api/orders/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(orders.filter((o) => o.id !== id));
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descrição
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Produtos
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                {order.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                {order.description || "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                {order.products?.map((p) => p.title).join(", ") || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  href={`/orders/${order.id}/edit`}
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(order.id)}
                  className="text-red-600 hover:text-red-900"
                >
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
