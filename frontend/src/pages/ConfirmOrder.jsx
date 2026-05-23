import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CheckoutSteps } from "./Shipping";
import { MapPin, Phone, User, ShoppingBag, ArrowRight } from "lucide-react";

const ConfirmOrder = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  // Free shipping for orders above 1000, else 150
  const shippingPrice = subtotal > 1000 ? 0 : 150;

  // 18% GST Tax
  const taxPrice = Math.round(subtotal * 0.18);

  const totalPrice = subtotal + shippingPrice + taxPrice;

  const addressString = `${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state}, ${shippingInfo?.country} - ${shippingInfo?.pinCode}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingPrice,
      taxPrice,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <>
      <PageTitle title="Confirm Order Details | Checkout" />
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 md:py-16">
          <CheckoutSteps activeStep={1} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">
            {/* Left Side details */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Shipping Address */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col gap-4">
                <h3 className="text-lg font-bold text-stone-900 pb-3 border-b border-stone-100 flex items-center gap-2">
                  <MapPin size={18} className="text-blue-500" />
                  Shipping Information
                </h3>
                <div className="flex flex-col gap-3 text-sm text-stone-600 mt-2">
                  <div className="flex items-center gap-3">
                    <User size={15} className="text-stone-400" />
                    <span>
                      <strong className="text-stone-800">Name:</strong> {user?.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={15} className="text-stone-400" />
                    <span>
                      <strong className="text-stone-800">Phone:</strong> {shippingInfo?.phoneNo}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={15} className="text-stone-400 mt-0.5" />
                    <span>
                      <strong className="text-stone-800">Address:</strong> {addressString}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cart Items */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col gap-4">
                <h3 className="text-lg font-bold text-stone-900 pb-3 border-b border-stone-100 flex items-center gap-2">
                  <ShoppingBag size={18} className="text-blue-500" />
                  Your Cart Items
                </h3>
                <div className="flex flex-col gap-4 mt-2">
                  {cartItems.map((item) => (
                    <div key={item.product} className="flex items-center justify-between gap-4 py-2 border-b border-stone-50 last:border-b-0">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100"}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover border border-stone-100 bg-stone-50 shrink-0"
                        />
                        <Link
                          to={`/product/${item.product}`}
                          className="text-sm font-semibold text-stone-800 hover:text-blue-600 line-clamp-1 transition"
                        >
                          {item.name}
                        </Link>
                      </div>
                      <div className="text-sm font-bold text-stone-600 shrink-0">
                        {item.quantity} x ₹{item.price} ={" "}
                        <strong className="text-stone-900">
                          ₹{(item.quantity * item.price).toLocaleString("en-IN")}
                        </strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side price summary */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-stone-900 mb-4 pb-4 border-b border-stone-100">
                Cost Summary
              </h3>

              <div className="flex flex-col gap-3.5">
                <div className="flex justify-between text-sm text-stone-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-800">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-stone-500">
                  <span>Shipping Charges</span>
                  <span className="font-semibold text-stone-800">
                    {shippingPrice === 0 ? "FREE" : `₹${shippingPrice}`}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-stone-500">
                  <span>GST Tax (18%)</span>
                  <span className="font-semibold text-stone-800">
                    ₹{taxPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                <hr className="border-stone-100 my-2" />

                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-stone-800">Grand Total</span>
                  <span className="text-xl font-extrabold text-stone-950">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                <button
                  onClick={proceedToPayment}
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3.5 rounded-2xl transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  Proceed to Payment
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ConfirmOrder;
