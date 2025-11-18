import { NextResponse } from 'next/server';
import { Product } from '@/app/models/product';

const products: Product[] = [
  { id: '1', name: 'Product 1', price: 10, description: 'Description 1' },
  { id: '2', name: 'Product 2', price: 20, description: 'Description 2' },
];

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const product = await request.json();
  products.push(product);
  return NextResponse.json(product);
}
