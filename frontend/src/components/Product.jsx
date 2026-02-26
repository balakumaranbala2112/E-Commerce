import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router";
import Rating from "./Rating";

const Product = ({ product }) => {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : null;

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col">
      {/* Image */}
      <Link
        to={`/product/${product._id}`}
        className="relative overflow-hidden block bg-gray-50"
      >
        <img
          src={product.image[0].url}
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />

        {/* Discount Badge */}
        {discount && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full tracking-wide shadow">
            -{discount}%
          </span>
        )}

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-xs font-semibold bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg">
            Quick View
          </span>
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Name & Description */}
        <div className="flex flex-col gap-1">
          <Link to={`/product/${product._id}`}>
            <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-1 hover:text-blue-600 transition-colors duration-200">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <Rating />
          <span className="text-xs text-gray-400">
            ({product.numOfReviews} reviews)
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Price & CTA */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-base font-extrabold text-gray-900 tracking-tight">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-sm hover:shadow-md hover:shadow-blue-200 transition-all duration-200">
            <ShoppingCart size={13} strokeWidth={2.5} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
