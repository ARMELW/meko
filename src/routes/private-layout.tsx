import { Outlet, useLocation } from "react-router";
import { Header } from "@/components/molecules/layout/header";
import Footer from '@/components/molecules/layout/footer';
import { ErrorBoundary } from '@/components/atoms/error-boundary';

const hideFooterRoutes = [
  '/profile/choose',
  '/profile/welcome',
  '/profile/avatar',
  '/profile/create-child',
  '/onboarding/profile',
  '/onboarding/welcome',
  '/onboarding/avatar',
];

export default function PrivateLayout() {
  const location = useLocation();
  const hideFooter = hideFooterRoutes.includes(location.pathname);
  return (
    <ErrorBoundary>
      <div className="px-4 lg:px-32 xl:px-32 min-h-screen">
        <Header />
        <div className="z-10 relative w-full h-full">
          <Outlet />
        </div>
      </div>
      {!hideFooter && <Footer />}
    </ErrorBoundary>
  );
}
