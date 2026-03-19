"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const isEventRoute = pathname.startsWith("/event/");
  const isParticipationRoute = pathname.includes("/participants");

  const navLink = (href, label) => (
    <li>
      <Link
        href={href}
        className={`block px-4 py-2 rounded-lg transition ${
          pathname === href ? "bg-blue-600" : "hover:bg-gray-800"
        }`}
      >
        {label}
      </Link>
    </li>
  );

  return (
    <div className="w-64 min-h-screen bg-[#0f172a] text-white p-6 border-r border-gray-800 flex flex-col">
      <h2 className="text-2xl font-bold mb-10 tracking-wide">Admin</h2>

      <ul className="space-y-2 flex-1">
        {/* Dashboard */}
        {navLink("/", "Dashboard")}

        {/* Create Event */}
        {navLink("/events/create", "+ Create Event")}

        {/* Registrations */}
        {navLink("/registrations", "Registrations")}

        {/* Per-event participation — only show when inside /event/:id */}
        {isEventRoute && (
          <li>
            <Link
              href={`${pathname.split("/participants")[0]}/participants`}
              className={`block px-4 py-2 rounded-lg text-sm transition ${
                isParticipationRoute ? "bg-blue-600" : "hover:bg-gray-800"
              }`}
            >
              Participants
            </Link>
          </li>
        )}

        {/* Settings */}
        {navLink("/admin/settings", "Settings")}
      </ul>
    </div>
  );
}
