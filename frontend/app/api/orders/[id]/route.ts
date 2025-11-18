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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const order = orders.find(o => o.id === parseInt(params.id));
  if (order && !order.removed) {
    return NextResponse.json(order);
  }
  return new Response('Order not found', { status: 404 });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { product_ids } = await request.json();
    const orderIndex = orders.findIndex(o => o.id === parseInt(params.id));
    if (orderIndex !== -1) {
        const order_items = products.filter(p => product_ids.includes(p.id));
        orders[orderIndex].order_items = order_items;
        orders[orderIndex].updated_at = new Date().toISOString();
        return NextResponse.json(orders[orderIndex]);
    }
    return new Response('Order not found', { status: 404 });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const orderIndex = orders.findIndex(o => o.id === parseInt(params.id));
    if (orderIndex !== -1) {
        orders[orderIndex].removed = true;
        orders[orderIndex].updated_at = new Date().toISOString();
        return new Response(null, { status: 204 });
    }
    return new Response('Order not found', { status: 404 });
}
