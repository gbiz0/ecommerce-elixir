import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';

export async function GET(request: Request) {
  try {
    const authorization = request.headers.get('Authorization');
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };
    if (authorization) {
        headers['Authorization'] = authorization;
    }

    const res = await fetch(`${BACKEND_URL}/api/orders`, {
        headers
    });

    if (!res.ok) {
       return new Response(res.statusText, { status: res.status });
    }
    const json = await res.json();
    return NextResponse.json(json.data);
  } catch (error) {
    console.error('Orders GET error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authorization = request.headers.get('Authorization');
    if (!authorization) {
        return new Response('Unauthorized', { status: 401 });
    }
    const body = await request.json();
    
    const payload = {
        description: body.description || "Order created via API",
    };

    const res = await fetch(`${BACKEND_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': authorization,
      },
      body: JSON.stringify({ order: payload }),
    });

    if (!res.ok) {
        return new Response(res.statusText, { status: res.status });
    }
    const json = await res.json();
    return NextResponse.json(json.data, { status: 201 });
  } catch (error) {
    console.error('Orders POST error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}