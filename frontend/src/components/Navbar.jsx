import { Menu, Search, ShoppingBag, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const isAuthenticated = false;
  const cartCount = 6;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-extrabold text-gray-900 tracking-tight shrink-0"
        >
          <span className="bg-blue-600 text-white p-1.5 rounded-lg">
            <ShoppingBag size={18} strokeWidth={2.5} />
          </span>
          Shopping<span className="text-blue-600">HUB</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="px-4 py-2 text-sm font-semibold text-gray-600 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden sm:flex items-center gap-2 bg-gray-100 hover:bg-gray-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:shadow-sm rounded-full px-3 py-2 transition-all duration-200 w-44 focus-within:w-56">
            <Search
              size={15}
              className="text-gray-400 shrink-0"
              strokeWidth={2.5}
            />
            <input
              type="search"
              placeholder="Search..."
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
            />
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-6 w-px bg-gray-200" />

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
          >
            <ShoppingCart size={20} strokeWidth={1.8} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-blue-600 text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white leading-none">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Register Button */}
          {!isAuthenticated && (
            <Link
              to="/register"
              className="hidden sm:flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <User size={15} strokeWidth={2.5} />
              Register
            </Link>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 transition-all duration-200"
            aria-label="Toggle menu"
          >
            {open ? (
              <X size={18} strokeWidth={2} />
            ) : (
              <Menu size={18} strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              {label}
            </Link>
          ))}

          {/* Mobile Search */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2 mt-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all duration-200">
            <Search
              size={15}
              className="text-gray-400 shrink-0"
              strokeWidth={2.5}
            />
            <input
              type="search"
              placeholder="Search products..."
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
            />
          </div>

          {!isAuthenticated && (
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-all duration-200"
            >
              <User size={15} strokeWidth={2.5} />
              Create Account
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
