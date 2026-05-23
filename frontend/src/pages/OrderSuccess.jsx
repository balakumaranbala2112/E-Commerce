import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";

const OrderSuccess = () => {
  return (
    <>
      <PageTitle title="Order Placed Successfully | ShoppingHUB" />
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Navbar />

        <main className="flex-1 flex items-center justify-center max-w-7xl mx-auto w-full px-4 sm:px-6 py-16 md:py-24">
          <div className="bg-white rounded-3xl border border-gray-100 p-12 md:p-16 text-center shadow-[0_4px_40px_rgba(0,0,0,0.04)] flex flex-col items-center gap-6 max-w-md mx-auto">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shadow-inner animate-bounce">
              <CheckCircle2 size={40} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-stone-900">Order Successful!</h2>
              <p className="text-sm text-stone-400 mt-2.5 leading-relaxed">
                Thank you for your purchase. Your order has been placed successfully and is now being processed.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
              <Link
                to="/orders"
                className="flex-1 bg-stone-900 hover:bg-stone-700 active:scale-95 text-white font-semibold py-3.5 rounded-2xl transition duration-200 text-sm flex items-center justify-center gap-1.5"
              >
                View My Orders
              </Link>
              <Link
                to="/products"
                className="flex-1 border border-stone-200 hover:bg-stone-50 active:scale-95 text-stone-600 font-semibold py-3.5 rounded-2xl transition duration-200 text-sm flex items-center justify-center gap-1.5"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default OrderSuccess;
