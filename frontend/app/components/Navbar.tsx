"use client";

import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          E-Commerce
        </Link>
        <div>
          {isAuthenticated && (
            <>
              <Link href="/products" className="mr-4">
                Produtos
              </Link>
              <Link href="/orders" className="mr-4">
                Pedidos
              </Link>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Sair
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
