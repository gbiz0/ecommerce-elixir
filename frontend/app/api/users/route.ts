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

    const res = await fetch(`${BACKEND_URL}/api/users`, {
        headers
    });

    if (!res.ok) {
       return new Response(res.statusText, { status: res.status });
    }
    const json = await res.json();
    return NextResponse.json(json.data);
  } catch (error) {
    console.error('Users GET error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
