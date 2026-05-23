import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingCart, ArrowRight } from "lucide-react";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);

  const increaseQty = (id, currentQty, stock) => {
    const newQty = currentQty + 1;
    if (newQty > stock) {
      toast.error(`Only ${stock} items available in stock`);
      return;
    }
    dispatch(addToCart({ product: id, quantity: newQty }));
  };

  const decreaseQty = (id, currentQty) => {
    const newQty = currentQty - 1;
    if (newQty < 1) return;
    dispatch(addToCart({ product: id, quantity: newQty }));
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from cart");
  };

  const checkoutHandler = () => {
    if (!isAuthenticated) {
      navigate("/login?redirect=shipping");
    } else {
      navigate("/shipping");
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <>
      <PageTitle title="Your Shopping Cart | ShoppingHUB" />
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 md:py-16">
          <div className="mb-8">
            <p className="text-xs tracking-[0.2em] uppercase text-amber-600 font-semibold mb-1">
              Your Bag
            </p>
            <h1 className="text-3xl font-bold text-stone-900">Shopping Cart</h1>
          </div>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center shadow-[0_4px_40px_rgba(0,0,0,0.04)] flex flex-col items-center gap-6 max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center text-stone-400">
                <ShoppingCart size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-800">Your Cart is Empty</h3>
                <p className="text-sm text-stone-400 mt-2 leading-relaxed">
                  Looks like you haven't added any products to your cart yet. Explore our curated collections to find premium items.
                </p>
              </div>
              <Link
                to="/products"
                className="bg-stone-900 text-white font-semibold px-8 py-3.5 rounded-2xl hover:bg-stone-700 active:scale-95 transition-all duration-200"
              >
                Shop Our Collection
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Cart Items List */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                {cartItems.map((item) => (
                  <div
                    key={item.product}
                    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
                  >
                    {/* Item info */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img
                        src={item.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150"}
                        alt={item.name}
                        className="w-20 h-20 rounded-xl object-cover border border-stone-100 shrink-0 bg-stone-50"
                      />
                      <div className="min-w-0">
                        <Link
                          to={`/product/${item.product}`}
                          className="font-bold text-stone-800 hover:text-blue-600 transition block text-sm leading-snug line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <span className="text-xs text-stone-400 block mt-1">
                          Price: ₹{item.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    {/* Quantity Selector & Action */}
                    <div className="flex items-center justify-between sm:justify-start gap-8 w-full sm:w-auto mt-2 sm:mt-0">
                      {/* Qty Selector */}
                      <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-white">
                        <button
                          onClick={() => decreaseQty(item.product, item.quantity)}
                          className="w-9 h-9 flex items-center justify-center text-stone-500 hover:bg-stone-900 hover:text-white transition duration-150"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-8 text-center text-stone-800 font-bold text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQty(item.product, item.quantity, item.stock)}
                          className="w-9 h-9 flex items-center justify-center text-stone-500 hover:bg-stone-900 hover:text-white transition duration-150"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Line total */}
                      <span className="text-sm font-extrabold text-stone-900 min-w-[70px] text-right">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.product)}
                        className="text-stone-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-xl transition cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
                <h3 className="text-lg font-bold text-stone-900 mb-4 pb-4 border-b border-stone-100">
                  Order Summary
                </h3>

                <div className="flex flex-col gap-3">
                  <div className="flex justify-between text-sm text-stone-500">
                    <span>Total Items</span>
                    <span className="font-semibold text-stone-800">
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-stone-500">
                    <span>Subtotal</span>
                    <span className="font-extrabold text-stone-900">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <hr className="border-stone-100 my-2" />

                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold text-stone-800">Grand Total</span>
                    <span className="text-xl font-extrabold text-stone-950">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <button
                    onClick={checkoutHandler}
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3.5 rounded-2xl transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Proceed to Checkout
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Cart;
