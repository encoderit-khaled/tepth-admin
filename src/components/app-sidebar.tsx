import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "./ui/sidebar";
import { useRouterState } from "@tanstack/react-router";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Loading from "./base/loading";
import { NavMain } from "./nav-main";
import type { TRoute } from "@/types/route-paths";
import {
  LayoutDashboard,
  MapPin,
  DollarSign,
  BookOpen,
  File
} from "lucide-react";



export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const {
    location: { pathname },
  } = useRouterState();

  const { open } = useSidebar();
  const { isLoading } = useCurrentUser();

  const isActiveLink = React.useCallback(
    (items: string[]) => items.includes(pathname),
    [pathname]
  );

  const routes: TRoute[] = React.useMemo(() => [
    {
      name: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: isActiveLink(["/"]),
      isVisible: true,
    },
    {
      name: "Exam Preparation Courses",
      url: "/exam-preparation-courses",
      icon: BookOpen,
      isActive: isActiveLink(["/exam-preparation-courses"]),
    },
    {
      name: "Testing Services",
      url: "/testing-services",
      icon: File,
      isActive: isActiveLink(["/testing-services"]),
    },
    {
      name: "Fees",
      url: "/fees",
      icon: DollarSign,
      isActive: isActiveLink(["/fees"]),
    },
    {
      name: "Our Venues",
      url: "/our-venues",
      icon: MapPin,
      isActive: isActiveLink(["/our-venues"]),
    },


  ], [isActiveLink]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex justify-between items-center p-1">


          <SidebarTrigger className="rounded-md" />
        </div>
      </SidebarHeader>


      <SidebarContent>
        <NavMain routes={routes.filter(r => r.isVisible !== false)} />
      </SidebarContent>

      <SidebarRail />

      {open && (
        <SidebarFooter>
          <h1 className="text-xs text-custom-footer-text">
            © <span className="text-custom-footer-text-red">Tepth.</span>{" "}
            All Rights Reserved.
          </h1>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
