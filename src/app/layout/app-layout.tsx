import { NavBar } from '@/components/navbar';
import { OnboardingTopBar } from '@/components/onboarding-top-bar';
import { Outlet, useLocation } from 'react-router';

function AppLayout() {
  const { pathname } = useLocation();
  const isOnboarding = pathname.startsWith('/onboarding');

  return (
    <div className="min-h-screen flex flex-col">
      {isOnboarding ? <OnboardingTopBar /> : <NavBar />}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
