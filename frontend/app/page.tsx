"use client";

import withAuth from './components/withAuth';
import { useAuth } from './contexts/AuthContext';

function HomePage() {
  const { user } = useAuth();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold">Bem-vindo ao nosso E-Commerce</h1>
      {user && <p className="mt-4 text-lg">Você está logado como {user.username}.</p>}
    </div>
  );
}

export default withAuth(HomePage);
