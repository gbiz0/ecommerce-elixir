"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import withAuth from '../components/withAuth';

interface User {
  id: number;
  email: string;
  confirmed_at: string | null;
}

function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      fetch('/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.ok) return res.json();
        return [];
      })
      .then(setUsers)
      .catch(console.error);
    }
  }, [token]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Usuários</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confirmado em</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {user.confirmed_at ? new Date(user.confirmed_at).toLocaleString() : 'Não confirmado'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default withAuth(UsersPage);
