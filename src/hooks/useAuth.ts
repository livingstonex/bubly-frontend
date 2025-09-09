import { useGetUser } from '@/lib/queries/useGetUser';

export function useAuth() {
  const q = useGetUser();

  return { ...q, isAuthenticated: q.status === 'success' && !!q.data };
}
