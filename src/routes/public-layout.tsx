import { Outlet } from "react-router";
import { Header } from "@/components/molecules/layout/header";
import Footer from '@/components/molecules/layout/footer';

export default function PublicLayout() {
  return (
    <>
      <div className="px-4 lg:px-32 xl:px-32 min-h-screen">
        <Header />
        <div className="z-10 relative w-full h-full">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}
