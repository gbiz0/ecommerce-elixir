"use client";

import { Order } from "@/app/models/order";
import { Product } from "@/app/models/product";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

interface OrderFormProps {
  order?: Order;
}

export default function OrderForm({ order }: OrderFormProps) {
  const router = useRouter();
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>(
    order?.products?.map((p) => p.id) || [],
  );
  const [description, setDescription] = useState(order?.description || "");

  useEffect(() => {
    if (token) {
      fetch("/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setProducts(data.filter((p: Product) => p));
          }

          console.log(data);
        })
        .catch(console.error);
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = order ? "PUT" : "POST";
    const url = order ? `/api/orders/${order.id}` : "/api/orders";

    console.log(selectedProductIds);

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ description, items: selectedProductIds }),
    });

    router.push("/orders");
    router.refresh();
  };

  const handleProductSelection = (productId: number) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Descrição
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
          rows={3}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Produtos
        </label>
        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductSelection(product.id)}
              className={`cursor-pointer relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400 ${
                selectedProductIds.includes(product.id)
                  ? "border-indigo-500"
                  : ""
              }`}
            >
              <div className="min-w-0 flex-1">
                <span className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">
                    {product.title}
                  </p>
                  <p className="truncate text-sm text-gray-500">
                    {product.description}
                  </p>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {order ? "Atualizar Pedido" : "Criar Pedido"}
      </button>
    </form>
  );
}
