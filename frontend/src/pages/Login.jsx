import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2, ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../features/user/userSlice";
import toast from "react-hot-toast";
import PageTitle from "../components/PageTitle";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, isAuthenticated } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // If coming from checkout, redirect back to shipping, otherwise home
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, isAuthenticated, navigate, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    dispatch(login({ email, password }));
  };

  return (
    <>
      <PageTitle title="Login | ShoppingHUB" />
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
            <h2 className="text-xl font-bold text-gray-900 mt-2">Welcome Back!</h2>
            <p className="text-sm text-gray-400">Please sign in to your account to continue shopping.</p>
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

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</label>
                <Link to="/password/forgot" className="text-xs text-blue-600 hover:underline font-medium">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative flex items-center bg-gray-50 hover:bg-gray-100/70 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 rounded-2xl px-4 py-3.5 border border-gray-100 focus-within:border-transparent transition-all duration-200">
                <Lock className="w-4 h-4 text-gray-400 shrink-0 mr-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent text-sm text-gray-800 placeholder-gray-300 outline-none w-full font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
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
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Register Redirect */}
          <div className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to={`/register?redirect=${redirect}`} className="text-blue-600 hover:underline font-semibold">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
