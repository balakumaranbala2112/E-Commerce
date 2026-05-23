import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Loader2, ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearErrors, clearMessage } from "../features/user/userSlice";
import toast from "react-hot-toast";
import PageTitle from "../components/PageTitle";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const { loading, error, message } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, error, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    dispatch(forgotPassword({ email }));
  };

  return (
    <>
      <PageTitle title="Forgot Password | ShoppingHUB" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 via-blue-50/20 to-stone-100 px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.06)] border border-gray-100 p-8 flex flex-col gap-6 relative overflow-hidden">
          {/* Header Brand */}
          <div className="flex flex-col items-center gap-3 text-center">
            <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-gray-900 tracking-tight">
              <span className="bg-blue-600 text-white p-2 rounded-xl">
                <ShoppingBag size={22} strokeWidth={2.5} />
              </span>
              Shopping<span className="text-blue-600">HUB</span>
            </Link>
            <h2 className="text-xl font-bold text-gray-900 mt-2">Reset Password</h2>
            <p className="text-sm text-gray-400">
              Enter your registered email address and we'll send you a password reset link.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address</label>
              <div className="relative flex items-center bg-gray-50 hover:bg-gray-100/70 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 rounded-2xl px-4 py-3.5 border border-gray-100 focus-within:border-transparent transition-all duration-200">
                <Mail className="w-4 h-4 text-gray-400 shrink-0 mr-3" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-sm text-gray-800 placeholder-gray-300 outline-none w-full font-medium"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3.5 rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending Link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          {/* Back to Login Link */}
          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-blue-600 transition duration-200 font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
