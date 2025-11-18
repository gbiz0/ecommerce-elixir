import { NextResponse } from 'next/server';
import { User } from '../../../models/user';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // In a real application, you would validate the credentials against a database
  if (email === 'test@example.com' && password === 'password') {
    const user: User = {
      id: 1,
      username: 'Test User',
      email: 'test@example.com',
      bio_info: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // In a real application, you would generate a real JWT
    const token = 'fake-jwt-token';

    return NextResponse.json({ user, token });
  }

  return new Response('Invalid credentials', { status: 401 });
}
