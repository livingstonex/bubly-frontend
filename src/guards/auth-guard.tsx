import { useGetUser } from '@/lib/queries/useGetUser';
import { Navigate } from 'react-router';
import { Loader } from 'lucide-react';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: user, status, error } = useGetUser();

  switch (status) {
    case 'pending':
      return (
        <div className="h-screen w-screen grid place-content-center">
          <Loader className="animate-spin" size={24} strokeWidth={2} />
        </div>
      );

    case 'error':
      // eslint-disable-next-line no-console
      console.error('Error fetching user:', error);
      return (
        <Navigate
          to={`/?redirect=${window.location.pathname}${window.location.search}`}
        />
      );

    case 'success':
      if (!user) {
        return (
          <Navigate
            to={`/?redirect=${window.location.pathname}${window.location.search}`}
          />
        );
      }

      return children;
  }
}
