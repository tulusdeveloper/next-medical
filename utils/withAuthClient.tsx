// utils/withAuthClient.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { ComponentType } from 'react';

export function withAuthClient<P extends JSX.IntrinsicAttributes>(
  WrappedComponent: ComponentType<P>
): NextPage<P> {
  const WithAuthClient: NextPage<P> = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          router.push('/auth/login');
        } else {
          setIsAuthenticated(true);
        }
      };

      checkAuth();
    }, [router]);

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