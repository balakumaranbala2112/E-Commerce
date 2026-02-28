import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, removeErrors } from "../features/products/productSlice";
import toast from "react-hot-toast";
import { Loader2, SlidersHorizontal, PackageSearch } from "lucide-react";
import Product from "../components/Product";
import Pagination from "../components/Pagination";

const categories = ["All", "Phone", "Laptop", "Books", "Stationery"];

const Products = () => {
  const { products, productCount, loading, error } = useSelector(
    (state) => state.product,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center bg-stone-50">
          <div className="flex flex-col items-center gap-4 text-stone-400">
            <Loader2 className="w-10 h-10 animate-spin text-stone-500" />
            <p className="text-sm tracking-widest uppercase font-medium">
              Loading products…
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 md:py-14">
        {/* Page Header */}
        <div className="mb-8">
          <p className="text-xs tracking-[0.2em] uppercase text-amber-600 font-semibold mb-1">
            Explore
          </p>
          <h1 className="text-3xl font-bold text-stone-900">All Products</h1>
        </div>

        <div className="flex gap-8 items-start">
          {/* ── Sidebar ── */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6">
              <div className="flex items-center gap-2 mb-5">
                <SlidersHorizontal className="w-4 h-4 text-stone-500" />
                <h3 className="text-sm font-semibold text-stone-700 tracking-wide uppercase">
                  Categories
                </h3>
              </div>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-stone-600 font-medium hover:bg-stone-100 hover:text-stone-900 transition-all duration-150 first-of-type:bg-stone-900 first-of-type:text-white">
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* ── Product Grid ── */}
          <section className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-stone-500">
                <span className="font-semibold text-stone-900">
                  {productCount || 0}
                </span>{" "}
                items found
              </span>
              {/* Mobile category strip */}
              <div className="flex lg:hidden gap-2 overflow-x-auto pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-stone-200 text-stone-600 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-150"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            {products && products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-stone-400">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center">
                  <PackageSearch className="w-7 h-7 text-stone-400" />
                </div>
                <p className="text-sm font-medium tracking-wide">
                  No products found
                </p>
                <p className="text-xs text-stone-400">
                  Try selecting a different category
                </p>
              </div>
            )}

            {/* Pagination */}
            {products && products.length > 0 && (
              <div className="mt-10 flex justify-center">
                <Pagination />
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
