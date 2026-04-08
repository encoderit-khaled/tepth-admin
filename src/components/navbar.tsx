import { NavUser } from "./nav-user";

// import { NotificationDropdown } from "./notification-dropdown";
// import SearchBar from "./ui/search-bar";
// import { SidebarTrigger } from "./ui/sidebar";
// import AppThemeToggle from "./app-theme-toggle";

// sticky top-0 z-50
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon] justify-between sidebar-wrapper:h-12 px-2 md:px-4 bg-custom-background">
      <div className="flex items-center gap-2">
        {/* <SidebarTrigger className="-ml-1" /> */}
        {/* <SearchBar/> */}
      </div>
      <div className="flex items-center gap-2 ">
        {/* <AppThemeToggle /> */}
        {/* <NotificationDropdown /> */}
        <NavUser />
      </div>

    </header>

  );
}
