import { NextResponse } from 'next/server';
import { Product } from '@/app/models/product';

let products: Product[] = [
  { id: '1', name: 'Product 1', price: 10, description: 'Description 1' },
  { id: '2', name: 'Product 2', price: 20, description: 'Description 2' },
];

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  return NextResponse.json(product);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const product = await request.json();
  const index = products.findIndex((p) => p.id === params.id);
  products[index] = product;
  return NextResponse.json(product);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  products = products.filter((p) => p.id !== params.id);
  return new Response(null, { status: 204 });
}
