import { NextResponse } from 'next/server';
import { Order } from '@/app/models/order';

let orders: Order[] = [
  { id: '1', products: [], total: 0, date: new Date() },
  { id: '2', products: [], total: 0, date: new Date() },
];

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const order = orders.find((o) => o.id === params.id);
  return NextResponse.json(order);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const order = await request.json();
  const index = orders.findIndex((o) => o.id === params.id);
  orders[index] = order;
  return NextResponse.json(order);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  orders = orders.filter((o) => o.id !== params.id);
  return new Response(null, { status: 204 });
}
