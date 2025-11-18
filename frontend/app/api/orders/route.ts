import { NextResponse } from 'next/server';
import { Order } from '@/app/models/order';

const orders: Order[] = [
  { id: '1', products: [], total: 0, date: new Date() },
  { id: '2', products: [], total: 0, date: new Date() },
];

export async function GET() {
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  const order = await request.json();
  orders.push(order);
  return NextResponse.json(order);
}
