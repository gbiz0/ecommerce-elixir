import { NextResponse } from 'next/server';
import { Product } from '../../../models/product';

let products: Product[] = [
  { id: 1, title: 'Product 1', description: 'Description 1', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 2, title: 'Product 2', description: 'Description 2', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 3, title: 'Product 3', description: 'Description 3', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const product = products.find(p => p.id === parseInt(params.id));
  if (product && !product.removed) {
    return NextResponse.json(product);
  }
  return new Response('Product not found', { status: 404 });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { title, description } = await request.json();
  const productIndex = products.findIndex(p => p.id === parseInt(params.id));
  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], title, description, updated_at: new Date().toISOString() };
    return NextResponse.json(products[productIndex]);
  }
  return new Response('Product not found', { status: 404 });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const productIndex = products.findIndex(p => p.id === parseInt(params.id));
    if (productIndex !== -1) {
        products[productIndex].removed = true;
        products[productIndex].updated_at = new Date().toISOString();
        return new Response(null, { status: 204 });
    }
    return new Response('Product not found', { status: 404 });
}
