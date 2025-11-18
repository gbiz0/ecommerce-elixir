import OrderList from '@/app/components/orders/OrderList';
import Link from 'next/link';

export default function OrdersPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Orders</h1>
        <Link href="/orders/new" className="bg-blue-500 text-white px-4 py-2 rounded">
          New Order
        </Link>
      </div>
      <OrderList />
    </div>
  );
}
