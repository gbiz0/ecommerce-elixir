import { NextResponse } from 'next/server';
import { User } from '../../../models/user';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ user: { email, password } }),
    });

    if (!res.ok) {
      return new Response('Invalid credentials', { status: res.status });
    }

    const data = await res.json();
    const token = data.token;

    // Since the backend only returns the token, we construct a user object from the email.
    // In a real app, we might fetch the user profile here or decode the token if it was a JWT with claims.
    const user: User = {
      id: '0', // Placeholder ID as backend doesn't return it on login
      name: email.split('@')[0],
      email: email,
    };

    return NextResponse.json({ user, token });
  } catch (error) {
    console.error('Login error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}