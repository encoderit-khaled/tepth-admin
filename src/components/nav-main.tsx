import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link } from "@tanstack/react-router";
import type { TRoute } from "@/types/route-paths";

type TProps = { routes: TRoute[] };
export function NavMain({ routes }: TProps) {
  const { open, openMobile } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {routes
          .filter((route) => route.isVisible !== false)
          .map((route) =>
            !!route.children == false ? (
              <SidebarMenuItem key={route.name}>
                <SidebarMenuButton
                  isActive={route.isActive}
                  tooltip={route.name}
                  className="capitalize"
                  render={(props) => (
                    <Link
                      {...props}
                      to={route.url}
                      className={cn(props.className, route.isActive && "pointer-events-none")}
                    />
                  )}
                >
                  {route.icon && <route.icon />}
                  <span>{route.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ) : open || openMobile ? (
              <Collapsible
                key={route.name}
                defaultOpen={route.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger
                    render={(props) => (
                      <SidebarMenuButton
                        {...props}
                        tooltip={route.name}
                        isActive={route.isActive}
                        className="capitalize"
                      />
                    )}
                  >
                    {route.icon && <route.icon />}
                    <span>{route.name}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="mr-0 pr-0">
                      {route.children
                        ?.filter((route) => route.isVisible)
                        .map((subItem) => (
                          <SidebarMenuSubItem key={subItem.name}>
                            <SidebarMenuSubButton
                              isActive={subItem.isActive}
                              className="py-1.5 capitalize"
                              render={(props) => (
                                <Link {...props} to={subItem.url} />
                              )}
                            >
                              <span>{subItem.name}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={route.name}>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={(props) => (
                      <SidebarMenuButton
                        {...props}
                        tooltip={route.name}
                        isActive={route.isActive}
                      />
                    )}
                  >
                    <Link to={route.url}>
                      {route.icon && <route.icon />}
                      <span>{route.name}</span>
                    </Link>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-48 rounded-lg ml-2"
                    side={"right"}
                    align={"start"}
                  >
                    {route.children?.map((subItem) => (
                      <DropdownMenuItem key={subItem.name}>
                        {subItem.icon && <subItem.icon />}
                        <span>{subItem.name}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            )
          )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
