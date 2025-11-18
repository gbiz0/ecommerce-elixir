import { NextResponse } from 'next/server';
import { Order } from '../../../models/order';
import { Product } from '../../../models/product';

const products: Product[] = [
    { id: 1, title: 'Product 1', description: 'Description 1', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 2, title: 'Product 2', description: 'Description 2', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

let orders: Order[] = [
  { id: 1, user_id: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), order_items: [products[0]] },
  { id: 2, user_id: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), order_items: [products[1]] },
];

export async function GET() {
  return NextResponse.json(orders.filter(o => !o.removed));
}

export async function POST(request: Request) {
  const { user_id, product_ids } = await request.json();
  const order_items = products.filter(p => product_ids.includes(p.id));
  const newOrder: Order = {
    id: orders.length + 1,
    user_id,
    order_items,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  orders.push(newOrder);
  return NextResponse.json(newOrder, { status: 201 });
}
