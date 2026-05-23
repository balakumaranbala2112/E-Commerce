import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CheckoutSteps } from "./Shipping";
import { CreditCard, Calendar, ShieldCheck, User, Loader2 } from "lucide-react";
import { createOrder, clearErrors, resetOrderState } from "../features/order/orderSlice";
import { clearCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error, success, loading } = useSelector((state) => state.order);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      dispatch(clearCart());
      dispatch(resetOrderState());
      navigate("/success");
    }
  }, [dispatch, error, success, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cardNumber || !expiry || !cvv || !cardName) {
      toast.error("Please fill in all card details");
      return;
    }
    if (cardNumber.replace(/\s/g, "").length !== 16) {
      toast.error("Card number must be 16 digits");
      return;
    }
    if (cvv.length !== 3) {
      toast.error("CVV must be 3 digits");
      return;
    }

    const orderData = {
      shippingAddress: shippingInfo,
      orderItems: cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
        product: item.product,
      })),
      paymentInfo: {
        id: "pay_mock_" + Math.random().toString(36).substring(2, 11),
        status: "succeeded",
      },
      itemsPrice: orderInfo.subtotal,
      taxPrice: orderInfo.taxPrice,
      shippingPrice: orderInfo.shippingPrice,
      totalPrice: orderInfo.totalPrice,
    };

    dispatch(createOrder(orderData));
  };

  const handleCardNumberChange = (e) => {
    // Format card number as xxxx xxxx xxxx xxxx
    const val = e.target.value.replace(/\s?/g, "").replace(/(\d{4})/g, "$1 ").trim();
    if (val.replace(/\s/g, "").length <= 16) {
      setCardNumber(val);
    }
  };

  const handleExpiryChange = (e) => {
    // Format expiry as MM/YY
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 4) val = val.substring(0, 4);
    if (val.length >= 2) {
      val = val.substring(0, 2) + "/" + val.substring(2);
    }
    setExpiry(val);
  };

  return (
    <>
      <PageTitle title="Payment Details | Checkout" />
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Navbar />

        <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-10 md:py-16">
          <CheckoutSteps activeStep={2} />

          <div className="bg-white rounded-3xl shadow-[0_4px_40px_rgba(0,0,0,0.04)] border border-gray-100 p-8 sm:p-10 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-stone-900 mb-2">Card Details</h2>
            <p className="text-sm text-stone-400 mb-6">
              Total amount to pay: <strong className="text-stone-800">₹{orderInfo?.totalPrice?.toLocaleString("en-IN")}</strong>
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Cardholder Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Cardholder Name</label>
                <div className="relative flex items-center bg-gray-50 hover:bg-gray-100/70 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 rounded-2xl px-4 py-3.5 border border-gray-100 focus-within:border-transparent transition-all duration-200">
                  <User className="w-4 h-4 text-gray-400 shrink-0 mr-3" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="bg-transparent text-sm text-gray-800 placeholder-gray-300 outline-none w-full font-medium"
                    required
                  />
                </div>
              </div>

              {/* Card Number */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Card Number</label>
                <div className="relative flex items-center bg-gray-50 hover:bg-gray-100/70 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 rounded-2xl px-4 py-3.5 border border-gray-100 focus-within:border-transparent transition-all duration-200">
                  <CreditCard className="w-4 h-4 text-gray-400 shrink-0 mr-3" />
                  <input
                    type="text"
                    placeholder="4111 2222 3333 4444"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    className="bg-transparent text-sm text-gray-800 placeholder-gray-300 outline-none w-full font-medium"
                    required
                  />
                </div>
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Expiry Date</label>
                  <div className="relative flex items-center bg-gray-50 hover:bg-gray-100/70 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 rounded-2xl px-4 py-3.5 border border-gray-100 focus-within:border-transparent transition-all duration-200">
                    <Calendar className="w-4 h-4 text-gray-400 shrink-0 mr-3" />
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={handleExpiryChange}
                      className="bg-transparent text-sm text-gray-800 placeholder-gray-300 outline-none w-full font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">CVV</label>
                  <div className="relative flex items-center bg-gray-50 hover:bg-gray-100/70 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 rounded-2xl px-4 py-3.5 border border-gray-100 focus-within:border-transparent transition-all duration-200">
                    <ShieldCheck className="w-4 h-4 text-gray-400 shrink-0 mr-3" />
                    <input
                      type="password"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => {
                        if (e.target.value.length <= 3) setCvv(e.target.value.replace(/\D/g, ""));
                      }}
                      className="bg-transparent text-sm text-gray-800 placeholder-gray-300 outline-none w-full font-medium"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3.5 rounded-2xl transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  `Pay ₹${orderInfo?.totalPrice?.toLocaleString("en-IN")}`
                )}
              </button>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Payment;
