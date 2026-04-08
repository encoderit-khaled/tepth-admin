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
  Users,
  MapPin,
  Settings2,
  ClipboardList,
  Settings,
  History
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
      name: "Users",
      url: "/users",
      icon: Users,
      isActive: isActiveLink(["/users"]),
    },
    {
      name: "Service Area",
      url: "/service-area",
      icon: MapPin,
      isActive: isActiveLink(["/service-area"]),
    },
    {
      name: "Services",
      url: "/services",
      icon: Settings2,
      isActive: isActiveLink(["/services"]),
    },
    {
      name: "Reports",
      url: "/reports",
      icon: ClipboardList,
      isActive: isActiveLink(["/reports"]),
    },
    {
      name: "Setting",
      url: "/setting",
      icon: Settings,
      isActive: isActiveLink(["/setting"]),
    },
    {
      name: "Service History",
      url: "/service-history",
      icon: History,
      isActive: isActiveLink(["/service-history"]),
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
            © <span className="text-custom-footer-text-red">OMG Security.</span>{" "}
            All Rights Reserved.
          </h1>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
