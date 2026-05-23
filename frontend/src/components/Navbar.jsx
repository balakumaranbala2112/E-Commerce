import React, { useState } from "react";
import { Menu, Search, ShoppingBag, ShoppingCart, User, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/user/userSlice";
import toast from "react-hot-toast";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact-us" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const cartCount = cartItems?.length || 0;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/products");
    }
  };

  const handleLogout = () => {
    dispatch(logout()).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Successfully Logged Out");
        navigate("/");
      } else {
        toast.error("Logout Failed");
      }
    });
  };

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
          <form
            onSubmit={handleSearchSubmit}
            className="hidden sm:flex items-center gap-2 bg-gray-100 hover:bg-gray-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:shadow-sm rounded-full px-3 py-2 transition-all duration-200 w-44 focus-within:w-56"
          >
            <button type="submit" className="focus:outline-none cursor-pointer">
              <Search
                size={15}
                className="text-gray-400 shrink-0"
                strokeWidth={2.5}
              />
            </button>
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
            />
          </form>

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

          {/* User Section (Profile Dropdown / Register Button) */}
          {isAuthenticated ? (
            <div className="relative group hidden sm:block">
              <button className="flex items-center gap-2 focus:outline-none cursor-pointer">
                <img
                  src={user?.avatar?.url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full border-2 border-blue-500 object-cover"
                />
                <span className="hidden lg:inline text-sm font-semibold text-gray-700 hover:text-blue-600 transition">
                  {user?.name}
                </span>
              </button>
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {user?.role === "admin" && (
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Link
                  to="/me"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
                >
                  My Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
                >
                  My Orders
                </Link>
                <hr className="my-1 border-gray-100" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <User size={15} strokeWidth={2.5} />
              Login
            </Link>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 transition-all duration-200"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
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
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2 mt-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all duration-200"
          >
            <button type="submit">
              <Search
                size={15}
                className="text-gray-400 shrink-0"
                strokeWidth={2.5}
              />
            </button>
            <input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
            />
          </form>

          {/* Mobile User Authentication options */}
          {isAuthenticated ? (
            <div className="flex flex-col gap-1 mt-2 pt-2 border-t border-gray-100">
              <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                Hello, {user?.name}
              </span>
              {user?.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                >
                  Admin Dashboard
                </Link>
              )}
              <Link
                to="/me"
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
              >
                My Profile
              </Link>
              <Link
                to="/orders"
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
              >
                My Orders
              </Link>
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-1 mt-2 pt-2 border-t border-gray-100">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-all duration-200"
              >
                <User size={15} strokeWidth={2.5} />
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
