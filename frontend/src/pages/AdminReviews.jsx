import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import AdminSidebar from "../components/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductReviews,
  deleteProductReview,
  removeErrors,
  clearMessage,
  resetProductDeleteStatus,
} from "../features/products/productSlice";
import { Loader2, Search, Trash2, Star } from "lucide-react";
import toast from "react-hot-toast";
import { formatDate } from "../utils/formatter";

const AdminReviews = () => {
  const dispatch = useDispatch();

  const { reviews, loading, error, isDeleted, message } = useSelector(
    (state) => state.product
  );

  const [productId, setProductId] = useState("");
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(removeErrors());
    }
    if (isDeleted) {
      toast.success(message || "Review Deleted Successfully!");
      dispatch(resetProductDeleteStatus());
      dispatch(clearMessage());
      // Refresh reviews if we have a product ID
      if (productId) {
        dispatch(getProductReviews(productId));
      }
    }
  }, [dispatch, error, isDeleted, message, productId]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!productId.trim()) {
      toast.error("Please enter a Product ID");
      return;
    }
    setSearched(true);
    dispatch(getProductReviews(productId.trim()));
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      dispatch(deleteProductReview({ reviewId, productId: productId.trim() }));
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        className={
          i < rating
            ? "fill-amber-400 text-amber-400"
            : "text-stone-200"
        }
      />
    ));
  };

  return (
    <>
      <PageTitle title="Admin Reviews | ShoppingHUB" />
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 md:py-16">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <AdminSidebar />

            <div className="flex-1 w-full flex flex-col gap-6">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
                  Moderate Reviews
                </h1>
                <p className="text-sm text-stone-400 mt-1">
                  Search by Product ID to view and remove reviews.
                </p>
              </div>

              {/* Search bar */}
              <form
                onSubmit={handleSearch}
                className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
              >
                <div className="flex-1 flex items-center gap-3 bg-stone-50 rounded-xl px-4 py-3 border border-stone-100 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition">
                  <Search size={16} className="text-stone-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Enter Product ID..."
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="bg-transparent text-sm text-stone-800 placeholder-stone-300 outline-none w-full font-medium font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-stone-900 hover:bg-stone-800 active:scale-95 text-white font-semibold px-5 py-3 rounded-xl transition duration-150 text-sm flex items-center gap-2 cursor-pointer"
                >
                  <Search size={14} />
                  Search
                </button>
              </form>

              {/* Reviews Table */}
              {loading ? (
                <div className="flex items-center justify-center py-20 text-stone-400">
                  <Loader2 className="w-10 h-10 animate-spin text-stone-500" />
                </div>
              ) : searched && reviews && reviews.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center text-stone-400">
                  No reviews found for this product.
                </div>
              ) : reviews && reviews.length > 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-sm text-stone-500">
                      <thead className="bg-stone-50/75 border-b border-stone-100 text-xs font-semibold uppercase tracking-wider text-stone-700">
                        <tr>
                          <th scope="col" className="px-6 py-4">Review ID</th>
                          <th scope="col" className="px-6 py-4">Reviewer</th>
                          <th scope="col" className="px-6 py-4">Rating</th>
                          <th scope="col" className="px-6 py-4">Comment</th>
                          <th scope="col" className="px-6 py-4">Date</th>
                          <th scope="col" className="px-6 py-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {reviews.map((review) => (
                          <tr
                            key={review._id}
                            className="hover:bg-stone-50/50 transition"
                          >
                            <td className="px-6 py-4 font-mono text-xs text-stone-400">
                              {review._id}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <img
                                  src={
                                    review.avatar ||
                                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60"
                                  }
                                  alt={review.name}
                                  className="w-8 h-8 rounded-full object-cover border border-stone-100 shrink-0"
                                />
                                <span className="font-semibold text-stone-800">
                                  {review.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-0.5">
                                {renderStars(review.rating)}
                              </div>
                            </td>
                            <td className="px-6 py-4 max-w-xs">
                              <p className="line-clamp-2 text-stone-600">
                                {review.comment}
                              </p>
                            </td>
                            <td className="px-6 py-4">
                              {formatDate(review.createdAt)}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={() => handleDeleteReview(review._id)}
                                className="p-2 hover:bg-rose-50 rounded-xl text-rose-500 transition cursor-pointer"
                                aria-label="Delete review"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : !searched ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center text-stone-400">
                  <Search size={32} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium">Enter a Product ID above to see its reviews.</p>
                </div>
              ) : null}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AdminReviews;
