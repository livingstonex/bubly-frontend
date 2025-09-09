import { useGetUser } from '@/lib/queries/useGetUser';
import { Navigate } from 'react-router';
import { ROUTES } from '@/routes';

export function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const { data: user } = useGetUser();
  const { onboarding_complete } = user?.businesses[0] ?? {};

  if (!onboarding_complete) {
    return (
      <Navigate
        to={`${ROUTES.ONBOARDING}?redirect=${window.location.pathname}${window.location.search}`}
      />
    );
  }

  return children;
}
