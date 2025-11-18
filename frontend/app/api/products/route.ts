import { NextResponse } from 'next/server';
import { Product } from '../../../models/product';

let products: Product[] = [
  { id: 1, title: 'Product 1', description: 'Description for product 1', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 2, title: 'Product 2', description: 'Description for product 2', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 3, title: 'Product 3', description: 'Description for product 3', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const { title, description } = await request.json();
  const newProduct: Product = {
    id: products.length + 1,
    title,
    description,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  products.push(newProduct);
  return NextResponse.json(newProduct, { status: 201 });
}