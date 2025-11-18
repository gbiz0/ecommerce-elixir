import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (email === 'admin@example.com' && password === 'password') {
    return NextResponse.json({
      token: 'fake-jwt-token',
      user: {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
      },
    });
  }

  return new Response('Unauthorized', { status: 401 });
}
