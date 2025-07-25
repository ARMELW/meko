import { Outlet, useLocation } from "react-router";
import { Header } from "@/components/molecules/layout/header";
import Footer from '@/components/molecules/layout/footer';
const hideFooterRoutes = [
  '/subscription',
];
export default function PublicLayout() {
   const location = useLocation();
  const hideFooter = hideFooterRoutes.includes(location.pathname);
  return (
    <>
      <div className="px-4 lg:px-32 xl:px-32 min-h-screen">
         {!hideFooter && <Header />}
        <div className="z-10 relative w-full h-full">
          <Outlet />
        </div>
      </div>
      {!hideFooter && <Footer />}
    </>
  );
}
