import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBasket,
  ShoppingCart,
  Users,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();

  const links = [
    { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Products", to: "/admin/products", icon: ShoppingBasket },
    { label: "Orders", to: "/admin/orders", icon: ShoppingCart },
    { label: "Users", to: "/admin/users", icon: Users },
    { label: "Reviews", to: "/admin/reviews", icon: MessageSquare },
  ];

  return (
    <aside className="w-full lg:w-64 bg-stone-900 text-stone-300 flex flex-col shrink-0 rounded-3xl lg:sticky lg:top-24 border border-stone-850 p-6 gap-6 shadow-xl">
      {/* Brand */}
      <div className="pb-4 border-b border-stone-800">
        <h3 className="text-sm font-extrabold text-white tracking-widest uppercase">
          Admin Portal
        </h3>
        <p className="text-[10px] text-stone-500 font-semibold tracking-wider uppercase mt-1">
          Store Management
        </p>
      </div>

      {/* Nav */}
      <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none w-full">
        {links.map((link) => {
          const Icon = link.icon;
          const active = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 shrink-0 lg:shrink ${
                active
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                  : "hover:bg-stone-800 hover:text-white"
              }`}
            >
              <Icon size={16} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Back to Home Link */}
      <div className="mt-auto pt-4 border-t border-stone-800 hidden lg:block">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-400 hover:text-white transition duration-200"
        >
          <ArrowLeft size={14} />
          Back to Store
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
