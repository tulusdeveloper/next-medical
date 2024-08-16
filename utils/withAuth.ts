// utils/withAuth.ts
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import api from './api';

export const withAuth = <P extends Record<string, unknown>>(
  getServerSidePropsFunc?: GetServerSideProps<P>
): GetServerSideProps<P> => {
  return async (context: GetServerSidePropsContext) => {
    const { req } = context;
    const token = req.cookies.accessToken || null;

    if (!token) {
      // Redirect to login if there's no token
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      };
    }

    try {
      // Optionally, you can verify the token by making a request to your backend
      await api.get('/api/verify-token/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // If there's a getServerSideProps function, call it
      if (getServerSidePropsFunc) {
        return await getServerSidePropsFunc(context);
      }

      return {
        props: {} as P, // If there is no additional data to fetch
      };
    } catch (error) {
      // If the token is invalid or expired, redirect to login
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      };
    }
  };
};

export default withAuth;
