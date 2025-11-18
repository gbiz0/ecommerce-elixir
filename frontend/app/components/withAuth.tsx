"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const Wrapper = (props: P) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace('/login');
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
