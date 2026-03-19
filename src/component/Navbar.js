"use client";

import { useAuth } from "./AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="bg-black shadow px-6 py-4 flex justify-between items-center">
      <div className="flex flex-col">
        <div className="text-white text-lg font-bold">
          Dashboard Overview
        </div>
        <div className="text-gray-400 text-[13px]">
          Manage your events and settings
        </div>
      </div>
      <div className="flex items-center gap-4">
        {user && (
          <div className="text-sm text-gray-400">
            <span className="text-white">{user.name}</span>
            <span className="mx-2">•</span>
            <span className="text-gray-500">{user.email}</span>
          </div>
        )}
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-500 text-white text-sm px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
