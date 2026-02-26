import {
  Copyright,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ShoppingBag,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-8">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 w-fit">
              <span className="bg-blue-600 text-white p-1.5 rounded-lg">
                <ShoppingBag size={18} strokeWidth={2.5} />
              </span>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Shopping<span className="text-blue-500">HUB</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Providing professional e-commerce solutions to help you grow your
              online business with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {["Home", "Products", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-3 text-sm">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800 text-blue-400 shrink-0">
                  <Phone size={14} strokeWidth={2} />
                </span>
                +91 1234567890
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800 text-blue-400 shrink-0">
                  <Mail size={14} strokeWidth={2} />
                </span>
                abcdsw123@gmail.com
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800 text-blue-400 shrink-0">
                  <MapPin size={14} strokeWidth={2} />
                </span>
                Tamil Nadu, India
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
              Follow Me
            </h3>
            <div className="flex gap-3">
              <a
                href=""
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-800 text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-200"
              >
                <Github size={17} strokeWidth={1.8} />
              </a>
              <a
                href=""
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-800 text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-200"
              >
                <Linkedin size={17} strokeWidth={1.8} />
              </a>
              <a
                href=""
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-800 text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-200"
              >
                <Youtube size={17} strokeWidth={1.8} />
              </a>
              <a
                href=""
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-800 text-gray-400 hover:bg-pink-600 hover:text-white transition-all duration-200"
              >
                <Instagram size={17} strokeWidth={1.8} />
              </a>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Stay connected for the latest deals, product drops, and updates.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <Copyright size={12} />
            <span>
              {new Date().getFullYear()} Balakumaran. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="hover:text-gray-300 transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <span className="w-px h-3 bg-gray-700" />
            <a
              href="#"
              className="hover:text-gray-300 transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
