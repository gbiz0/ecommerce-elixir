import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ user: { email, password } }),
    });

    if (!res.ok) {
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const errorData = await res.json();
        return new Response(JSON.stringify(errorData), { status: res.status });
      } else {
        const text = await res.text();
        console.error('Non-JSON response from backend:', text);
        return new Response(JSON.stringify({ errors: { detail: "Backend returned non-JSON error" } }), { status: res.status });
      }
    }

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
