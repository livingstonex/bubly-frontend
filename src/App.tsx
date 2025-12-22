import { Route, Routes } from 'react-router';
import SignIn from './pages/auth/signin';
import SignUp from './pages/auth/signup';
import Otp from './pages/auth/otp';
import ForgotPassword from './pages/auth/forgot-password';
import ResetPassword from './pages/auth/reset-password';
import { ROUTES } from './routes';
import DummyDashboardPage from './pages/dashboard/dummy-dashboard-page';
import { AuthGuard } from './guards/auth-guard';
import AppLayout from './app/layout/app-layout';
import OnboardingFlow from './pages/onboarding/page';
import { OnboardingGuard } from './guards/onboarding-guard';
import { PaymentSuccess } from './pages/payment/payment-success';
import { PricingDemo } from './pages/subscription/pricing-demo';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<SignIn />} />
      <Route path={ROUTES.SIGNUP} element={<SignUp />} />
      <Route path={ROUTES.OTP} element={<Otp />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
      <Route path={ROUTES.PAYMENT_SUCCESSFUL} element={<PaymentSuccess />} />
      <Route path={ROUTES.PRICING} element={<PricingDemo />} />

      <Route
        element={
          <AuthGuard>
            <AppLayout />
          </AuthGuard>
        }
      >
        <Route path={ROUTES.ONBOARDING} element={<OnboardingFlow />} />
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <OnboardingGuard>
              <DummyDashboardPage />
            </OnboardingGuard>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
