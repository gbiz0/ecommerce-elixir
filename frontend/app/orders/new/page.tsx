import OrderForm from '@/app/components/orders/OrderForm';

export default function NewOrderPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">New Order</h1>
      <OrderForm />
    </div>
  );
}
