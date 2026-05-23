import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ activePage = 1, itemsCountPerPage = 8, totalItemsCount = 0, onChange }) => {
  const totalPages = Math.ceil(totalItemsCount / itemsCountPerPage);
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex items-center gap-1.5" aria-label="Pagination">
      {/* Prev */}
      <button
        onClick={() => onChange(Math.max(1, activePage - 1))}
        disabled={activePage === 1}
        className="w-10 h-10 rounded-xl border border-stone-200 bg-white flex items-center justify-center text-stone-600 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed hover:text-stone-900 transition-all duration-200"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Pages */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200 ${
            activePage === p
              ? "bg-stone-900 text-white shadow-md shadow-stone-900/10"
              : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 hover:text-stone-900"
          }`}
        >
          {p}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onChange(Math.min(totalPages, activePage + 1))}
        disabled={activePage === totalPages}
        className="w-10 h-10 rounded-xl border border-stone-200 bg-white flex items-center justify-center text-stone-600 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed hover:text-stone-900 transition-all duration-200"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
};

export default Pagination;