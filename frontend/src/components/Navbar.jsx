import { Menu, Search, ShoppingBag, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const isAuthenticated = true;

  return (
    <nav className="sticky top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-blue-600"
        >
          <ShoppingBag /> <span>Shopping HUB</span>
        </Link>

        {/* DEsktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            className="text-gray-700 hover:text-blue-600 transition font-semibold"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-gray-700 hover:text-blue-600 transition font-semibold "
            to="/products"
          >
            Products
          </Link>
          <Link
            className="text-gray-700 hover:text-blue-600 transition font-semibold "
            to="/about"
          >
            About
          </Link>
          <Link
            className="text-gray-700 hover:text-blue-600 transition font-semibold"
            to="/contact"
          >
            Contact
          </Link>
        </div>

        {/* Right Sections */}

        <div className="flex items-center gap-4">
          <form
            action=""
            className="hidden sm:flex items-center border rounded overflow-hidden"
          >
            <input
              type="search"
              name=""
              id=""
              placeholder="Search Product"
              className="px-3 py-2 text-sm w-40 focus:outline-none"
            />
            <button className="px-3 teaxt-gray-300 hover:text-blue-600 transition">
              <Search size={18} />
            </button>
          </form>
          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-gray-700 hover:text-blue-600 transition"
          >
            {" "}
            <ShoppingCart />{" "}
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-semibold min-w-5 rounded-full flex items-center justify-center">
              6
            </span>
          </Link>
          {/* REgister */}
          {!isAuthenticated && (
            <Link
              to="/register"
              className="hideen  sm:flex gap-2 items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <User size={18} /> Register
            </Link>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-700 cursor-pointer"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile NAv */}

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? " max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}`}
      >
        <div className="flex flex-col p-4 gap-4 ">
          <Link
            onClick={() => setOpen(false)}
            className="text-gray-700 hover:text-blue-600 transition font-semibold"
            to="/"
          >
            Home
          </Link>
          <Link
            onClick={() => setOpen(false)}
            className="text-gray-700 hover:text-blue-600 transition font-semibold "
            to="/products"
          >
            Products
          </Link>
          <Link
            onClick={() => setOpen(false)}
            className="text-gray-700 hover:text-blue-600 transition font-semibold "
            to="/about"
          >
            About
          </Link>
          <Link
            onClick={() => setOpen(false)}
            className="text-gray-700 hover:text-blue-600 transition font-semibold"
            to="/contact"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
