import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Rating from "../components/Rating";
import {
  Minus,
  PackageCheck,
  Plus,
  ShoppingCart,
  Heart,
  Share2,
  Shield,
  Truck,
  RotateCcw,
  PackageX,
  MessageSquare,
  Calendar,
  Send,
  Loader2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getProductDetails,
  removeErrors,
  submitReview,
} from "../features/products/productSlice";
import { addToCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";
import { calculateDiscount, formatDate } from "../utils/formatter";

const ProductDetails = () => {
  const { loading, error, product } = useSelector((state) => state.product);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) dispatch(getProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || error || "Something went wrong");
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleAddToCart = () => {
    if (!product || product.stock < 1) {
      toast.error("Item Out of Stock");
      return;
    }
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.image[0]?.url || "",
        stock: product.stock,
        quantity: qty,
      })
    );
    toast.success("Added to Cart");
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login to submit a review");
      return;
    }
    if (userRating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (!reviewText.trim()) {
      toast.error("Please enter a review comment");
      return;
    }
    dispatch(
      submitReview({
        rating: userRating,
        comment: reviewText,
        productId: id,
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Review posted successfully!");
        setUserRating(0);
        setReviewText("");
        // Reload details to show review
        dispatch(getProductDetails(id));
      } else {
        toast.error(res.payload || "Failed to submit review");
      }
    });
  };

  if (loading && !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center bg-stone-50">
          <Loader2 className="w-10 h-10 animate-spin text-stone-505" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <PageTitle title={product ? `${product.name} | Details` : "Product Details"} />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-xs tracking-widest uppercase text-stone-400">
          <Link to="/" className="hover:text-stone-700 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-stone-700 transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-stone-600">{product?.name}</span>
        </nav>

        {product && (
          <div className="bg-white rounded-3xl shadow-[0_4px_40px_rgba(0,0,0,0.07)] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* ── Left: Image Gallery ── */}
              <div className="bg-stone-100 p-8 lg:p-12 flex flex-col gap-4">
                <div className="relative rounded-2xl overflow-hidden aspect-square bg-white group">
                  <img
                    src={product.image[activeImg]?.url || product.image[0]?.url}
                    alt={product.name}
                    title={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.mrp && product.price && (
                    <span className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full shadow">
                      {calculateDiscount(product.price, product.mrp)}% OFF
                    </span>
                  )}
                  <button
                    onClick={() => setWishlisted((w) => !w)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200 cursor-pointer"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors duration-200 ${
                        wishlisted
                          ? "fill-rose-500 text-rose-500"
                          : "text-stone-400"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.image?.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                        activeImg === i
                          ? "border-stone-800 shadow-md opacity-100"
                          : "border-transparent opacity-50 hover:opacity-80"
                      }`}
                    >
                      <img
                        src={img.url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Right: Product Info ── */}
              <div className="p-8 lg:p-12 flex flex-col gap-7">
                <div className="space-y-3">
                  <span className="text-xs tracking-[0.2em] uppercase text-amber-600 font-semibold">
                    Premium Collection
                  </span>
                  <h1 className="text-4xl font-bold text-stone-900 leading-tight">
                    {product.name}
                  </h1>
                </div>

                <div className="flex items-center gap-3">
                  <Rating value={product.ratings} disabled={true} />
                  <span className="text-sm text-stone-400">
                    {product.ratings?.toFixed(1)}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-stone-300" />
                  <a
                    href="#reviews"
                    className="text-sm text-stone-500 underline underline-offset-2 hover:text-stone-800 transition-colors"
                  >
                    {product.numOfReviews} Reviews
                  </a>
                </div>

                <div className="w-10 h-0.5 bg-stone-200 rounded-full" />

                <div className="flex items-end gap-4">
                  <span className="text-4xl font-bold text-stone-900">
                    ₹{product.price}
                  </span>
                  {product.mrp && product.mrp > product.price && (
                    <div className="flex flex-col pb-1">
                      <span className="text-sm text-stone-400 line-through">
                        ₹{product.mrp}
                      </span>
                      <span className="text-xs text-rose-500 font-medium">
                        {calculateDiscount(product.price, product.mrp)}% OFF
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-stone-500 leading-relaxed text-[15px]">
                  {product.description}
                </p>

                {/* Stock Badge */}
                <div
                  className={`flex items-center gap-2.5 rounded-xl px-4 py-3 w-fit border ${
                    product.stock > 0
                      ? "bg-emerald-50 border-emerald-100"
                      : "bg-red-50 border-red-100"
                  }`}
                >
                  {product.stock > 0 ? (
                    <>
                      <PackageCheck className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm text-emerald-700 font-medium">
                        In Stock — {product.stock} Available
                      </span>
                    </>
                  ) : (
                    <>
                      <PackageX className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-red-700 font-medium">
                        Out of Stock
                      </span>
                    </>
                  )}
                </div>

                {/* Qty + Cart + Buy Now */}
                {product.stock > 0 && (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-stone-200 rounded-2xl overflow-hidden bg-white">
                        <button
                          onClick={() => setQty((q) => Math.max(1, q - 1))}
                          className="w-11 h-11 flex items-center justify-center text-stone-500 hover:bg-stone-900 hover:text-white transition-all duration-150 cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center text-stone-800 font-semibold text-sm">
                          {qty}
                        </span>
                        <button
                          onClick={() =>
                            setQty((q) => Math.min(product.stock, q + 1))
                          }
                          className="w-11 h-11 flex items-center justify-center text-stone-500 hover:bg-stone-900 hover:text-white transition-all duration-150 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={handleAddToCart}
                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer ${
                          added
                            ? "bg-emerald-600 text-white"
                            : "bg-stone-900 text-white hover:bg-stone-700"
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {added ? "Added!" : "Add to Cart"}
                      </button>

                      <button className="w-12 h-12 flex items-center justify-center border border-stone-200 rounded-2xl text-stone-400 hover:text-stone-700 hover:border-stone-400 transition-all duration-200 cursor-pointer">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Review Form ── */}
                <form
                  onSubmit={handleReviewSubmit}
                  className="bg-stone-50 border border-stone-100 rounded-2xl p-6 flex flex-col gap-4"
                >
                  <h3 className="flex items-center gap-2 text-base font-semibold text-stone-800">
                    <MessageSquare className="w-4 h-4 text-amber-600" />
                    Share Your Feedback
                  </h3>

                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-stone-400 uppercase tracking-widest mb-1">
                      Your Rating
                    </span>
                    <Rating
                      value={userRating}
                      disabled={false}
                      onRatingChange={(r) => setUserRating(r)}
                    />
                  </div>

                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder={
                      isAuthenticated
                        ? "Write your review here..."
                        : "Please login to write a review"
                    }
                    disabled={!isAuthenticated}
                    rows={4}
                    className="w-full resize-none rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-300 transition disabled:opacity-50"
                  />

                  <button
                    type="submit"
                    disabled={!isAuthenticated || loading}
                    className="self-end flex items-center gap-2 bg-stone-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-stone-700 active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Post Review
                  </button>
                </form>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-stone-100">
                  {[
                    { icon: Shield, label: "2-Year Warranty" },
                    { icon: Truck, label: "Free Delivery" },
                    { icon: RotateCcw, label: "Easy Returns" },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-1.5 text-center"
                    >
                      <div className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-stone-600" />
                      </div>
                      <span className="text-xs text-stone-400 leading-tight">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Reviews Section ── */}
        <section id="reviews" className="mt-14 max-w-7xl mx-auto px-4 sm:px-6">
          <h3 className="text-2xl font-bold text-stone-900 mb-6">
            Customer Reviews
            <span className="ml-3 text-base font-normal text-stone-400">
              ({product?.numOfReviews || 0})
            </span>
          </h3>

          {!product?.reviews || product.reviews.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-100 p-10 text-center text-stone-400 text-sm">
              No reviews yet. Be the first to share your thoughts!
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {product.reviews.map((rev, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-stone-100 p-6 flex flex-col gap-3 shadow-sm"
                >
                  {/* Reviewer Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
                        alt={rev.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-stone-100"
                      />
                      <div className="flex flex-col gap-0.5">
                        <h4 className="text-sm font-semibold text-stone-800">
                          {rev.name}
                        </h4>
                        <Rating value={rev.rating} disabled={true} />
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-stone-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(rev.createdAt)}</span>
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
