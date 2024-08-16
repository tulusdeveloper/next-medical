// utils/withAuthClient.tsx
"use client";
import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { ComponentType } from 'react';

export function withAuthClient<P extends JSX.IntrinsicAttributes>(
  WrappedComponent: ComponentType<P>
): NextPage<P> {
  const WithAuthClient: NextPage<P> = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
      
      if (typeof window !== 'undefined') {
        const checkAuth = async () => {
          const accessToken = localStorage.getItem('accessToken');
          if (!accessToken) {
            // Dynamically import 'next/router' to avoid using it before client-side rendering
            const { default: router } = await import('next/router');
            router.push('/auth/login');
          } else {
            setIsAuthenticated(true);
          }
        };
        checkAuth();
      }
    }, []);

    if (!isClient) {
      return null; // or a loading component
    }

    if (!isAuthenticated) {
      return <div>Loading...</div>; // Or a more sophisticated loading component
    }

    return <WrappedComponent {...props} />;
  };

  // Copy getInitialProps from WrappedComponent if it exists
  if ((WrappedComponent as any).getInitialProps) {
    WithAuthClient.getInitialProps = (WrappedComponent as any).getInitialProps;
  }

  return WithAuthClient;
}
