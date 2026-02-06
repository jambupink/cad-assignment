// src/components/layout/Layout.tsx
import { NavLink, Outlet } from "react-router";
import {
  Building2,
  ClipboardList,
  Home,
  Info,
  HelpCircle,
} from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/locations", label: "Locations", icon: Building2 },
  { to: "/issues", label: "Issues", icon: ClipboardList },
  { to: "/about", label: "About", icon: Info },
  { to: "/contact", label: "Contact", icon: HelpCircle },
];

function Layout() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      {/* Header */}
      <header className="border-border sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-5xl items-center px-5 py-4">
          <NavLink to="/" className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Building2 className="size-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              CampusWatch
            </span>
          </NavLink>
          <div className="grow" />
          <nav className="flex gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`
                }
                end={item.to === "/"}
              >
                <item.icon className="size-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="w-full max-w-5xl px-5 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-border w-full border-t">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-2 px-5 py-6 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
          <p>
            &copy; 2026 CampusWatch — Campus Asset Monitoring System
          </p>
          <p>Nanyang Polytechnic — Facilities Management</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;