"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Building,
  Menu,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Bookings", href: "/admin/bookings", icon: Calendar },
  { name: "Rooms", href: "/admin/rooms", icon: Building },
];

function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname(); // ✅ Correct for App Router

  return (
    <div className="min-h-screen pt-22">
      <div className="flex  px-4 sm:px-6 lg:px-5">
        {/* Sidebar */}
        <div
          className={`fixed sm:left-15 left-0 z-50 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "w-54" : "w-16"
          } top-21 bottom-0`}
        >
          <div className="flex h-full flex-col">
            {/* Toggle button */}
            <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-1 flex-col px-2 py-6">
              <ul className="space-y-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                          isActive
                            ? "bg-primary-500 text-white"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                        title={!sidebarOpen ? item.name : undefined}
                      >
                        <item.icon
                          className={`flex-shrink-0 ${
                            isActive
                              ? "text-white"
                              : "text-gray-400 group-hover:text-gray-500"
                          } ${sidebarOpen ? "mr-3 h-5 w-5" : "h-5 w-5 mx-auto"}`}
                          aria-hidden="true"
                        />
                        {sidebarOpen && (
                          <span className="truncate">{item.name}</span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>

        {/* Main content area */}
        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${
            sidebarOpen ? "ml-56" : "ml-16"
          }`}
        >
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
