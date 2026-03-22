"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm">
        
        {/* Left Side - Logo */}
        <div className="flex items-center gap-3 mb-3 md:mb-0">
          <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
          <p>
            © {new Date().getFullYear()} Event Booking Admin Panel. 
            All rights reserved.
          </p>
        </div>

        {/* Right Side */}
        <p className="text-center md:text-right">
          Powered by{" "}
          <span className="text-white font-medium">
            Dinex Services
          </span>
        </p>

      </div>
    </footer>
  );
}
