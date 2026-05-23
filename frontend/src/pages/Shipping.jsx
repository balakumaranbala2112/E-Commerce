import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Home, MapPin, Globe, Phone, Mail, Hash, ArrowRight } from "lucide-react";
import { saveShippingInfo } from "../features/cart/cartSlice";
import toast from "react-hot-toast";

// Simple checkout stepper component for header
export const CheckoutSteps = ({ activeStep }) => {
  const steps = ["Shipping", "Confirm Order", "Payment"];
  return (
    <div className="flex items-center justify-center gap-4 md:gap-8 mb-10 w-full max-w-xl mx-auto">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex items-center gap-2">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                index <= activeStep
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-stone-200 text-stone-500"
              }`}
            >
              {index + 1}
            </span>
            <span
              className={`text-xs md:text-sm font-semibold transition ${
                index <= activeStep ? "text-stone-850 font-bold" : "text-stone-400"
              }`}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 min-w-[30px] transition-all duration-300 ${
                index < activeStep ? "bg-blue-600" : "bg-stone-200"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo?.address || "");
  const [city, setCity] = useState(shippingInfo?.city || "");
  const [state, setState] = useState(shippingInfo?.state || "");
  const [country, setCountry] = useState(shippingInfo?.country || "India");
  const [pinCode, setPinCode] = useState(shippingInfo?.pinCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address || !city || !state || !country || !pinCode || !phoneNo) {
      toast.error("Please fill in all shipping details");
      return;
    }
    if (phoneNo.toString().length !== 10) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }
    dispatch(
      saveShippingInfo({
        address,
        city,
        state,
        country,
        pinCode: Number(pinCode),
        phoneNo: Number(phoneNo),
      })
    );
    navigate("/order/confirm");
  };

  return (
    <>
      <PageTitle title="Shipping Details | Checkout" />
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Navbar />

        <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-10 md:py-16">
          <CheckoutSteps activeStep={0} />

          <div className="bg-white rounded-3xl shadow-[0_4px_40px_rgba(0,0,0,0.04)] border border-gray-100 p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Shipping Address</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Address */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Street Address</label>
                <div className="relative flex items-center bg-gray-50 hover:bg-gray-100/70 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 rounded-2xl px-4 py-3.5 border border-gray-100 focus-within:border-transparent transition-all duration-200">
                  <Home className="w-4 h-4 text-gray-400 shrink-0 mr-3" />
                  <input
                    type="text"
                    placeholder="123, Main Street"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-transparent text-sm text-gray-800 placeholder-gray-300 outline-none w-full font-medium"
                    required
                  />
                </div>
              </div>

              {/* City */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">City</label>
                <div className="relative flex items-center bg-gray-50 hover:bg-gray-100/70 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 rounded-2xl px-4 py-3.5 border border-gray-100 focus-within:border-transparent transition-all duration-200">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0 mr-3" />
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="bg-transparent text-sm text-gray-800 placeholder-gray-300 outline-none w-full font-medium"
                    required
                  />
                </div>
              </div>

              {/* State */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">State / Province</label>
                <div className="relative flex items-center bg-gray-50 hover:bg-gray-100/70 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 rounded-2xl px-4 py-3.5 border border-gray-100 focus-within:border-transparent transition-all duration-200">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0 mr-3" />
                  <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="bg-transparent text-sm text-gray-800 placeholder-gray-300 outline-none w-full font-medium"
                    required
                  />
                </div>
              </div>

              {/* Country */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Country</label>
                <div className="relative flex items-center bg-gray-50 hover:bg-gray-100/70 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 rounded-2xl px-4 py-3.5 border border-gray-100 focus-within:border-transparent transition-all duration-200">
                  <Globe className="w-4 h-4 text-gray-400 shrink-0 mr-3" />
                  <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="bg-transparent text-sm text-gray-800 placeholder-gray-300 outline-none w-full font-medium"
                    required
                  />
                </div>
              </div>

              {/* Pin Code */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">ZIP / Postal Code</label>
                <div className="relative flex items-center bg-gray-50 hover:bg-gray-100/70 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 rounded-2xl px-4 py-3.5 border border-gray-100 focus-within:border-transparent transition-all duration-200">
                  <Hash className="w-4 h-4 text-gray-400 shrink-0 mr-3" />
                  <input
                    type="number"
                    placeholder="600001"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    className="bg-transparent text-sm text-gray-800 placeholder-gray-300 outline-none w-full font-medium"
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone Number</label>
                <div className="relative flex items-center bg-gray-50 hover:bg-gray-100/70 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 rounded-2xl px-4 py-3.5 border border-gray-100 focus-within:border-transparent transition-all duration-200">
                  <Phone className="w-4 h-4 text-gray-400 shrink-0 mr-3" />
                  <input
                    type="number"
                    placeholder="10-digit mobile number"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    className="bg-transparent text-sm text-gray-800 placeholder-gray-300 outline-none w-full font-medium"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-6 md:col-span-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3.5 rounded-2xl transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                Continue to Confirm Order
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Shipping;
