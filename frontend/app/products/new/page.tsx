import ProductForm from '@/app/components/products/ProductForm';

export default function NewProductPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">New Product</h1>
      <ProductForm />
    </div>
  );
}
