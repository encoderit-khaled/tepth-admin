import { AppSidebar } from '@/components/app-sidebar';
import Navbar from '@/components/navbar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect, useRef } from 'react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import Loading from '@/components/base/loading';


export const Route = createFileRoute('/_app')({
  component: RouteComponent,
})


function RouteComponent() {
  const navigate = useNavigate();
  const hasRedirected = useRef(false);

  const {
    data: user,
    isLoading: isLoadingUser,
    isFetching,
  } = useCurrentUser();

  useEffect(() => {
    // Only redirect if we're not loading AND not fetching AND no user AND haven't redirected yet
    if (!isLoadingUser && !isFetching && !user && !hasRedirected.current) {
      hasRedirected.current = true;
      navigate({
        to: "/login",
        replace: true,
      });
    }
  }, [user, isLoadingUser, isFetching, navigate]);

  // Show loading while initial load or background fetch is happening
  if (isLoadingUser || (isFetching && !user)) {
    return (
      <div className="flex h-svh w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!user) {
    return null; // redirect already triggered
  }

  return (
    <SidebarProvider className="h-full w-full overflow-hidden">
      <AppSidebar />
      <SidebarInset className="h-full flex flex-col min-h-0 overflow-hidden bg-custom-background px-0 py-0 border-none">
        <Navbar />
        <div className="border-b border-custom-background-white"></div>
        <main className="flex-1 overflow-y-auto min-h-0 bg-custom-background">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
