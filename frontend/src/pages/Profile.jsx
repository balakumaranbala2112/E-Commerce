import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Calendar,
  Shield,
  Loader2,
  Settings,
  KeyRound,
} from "lucide-react";
import {
  updateProfile,
  updatePassword,
  clearErrors,
  resetUpdateStatus,
} from "../features/user/userSlice";
import toast from "react-hot-toast";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated, loading, error, isUpdated } = useSelector(
    (state) => state.user
  );

  const [activeTab, setActiveTab] = useState("details"); // 'details' or 'password'

  // Profile details state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Password update state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated Successfully!");
      dispatch(resetUpdateStatus());
      // Reset password fields if password tab was active
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [dispatch, error, isUpdated]);

  const handleUpdateProfileSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Name and email are required");
      return;
    }
    dispatch(updateProfile({ name, email }));
  };

  const handleUpdatePasswordSubmit = (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New and confirm password do not match");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }
    dispatch(updatePassword({ oldPassword, newPassword, confirmPassword }));
  };

  return (
    <>
      <PageTitle title={`${user?.name || "Profile"} | Profile Settings`} />
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Navbar />

        <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-10 md:py-16">
          <div className="bg-white rounded-3xl shadow-[0_4px_40px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
            {/* Sidebar Column */}
            <div className="md:col-span-4 bg-stone-50/50 border-r border-gray-100 p-8 flex flex-col items-center gap-6 text-center">
              {/* User Avatar */}
              <div className="relative group">
                <img
                  src={
                    user?.avatar?.url ||
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200"
                  }
                  alt={user?.name}
                  className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              {/* User Identity */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 leading-snug">
                  {user?.name}
                </h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 text-blue-600 mt-2">
                  <Shield size={12} />
                  {user?.role}
                </span>
              </div>

              {/* Metadata */}
              <div className="w-full border-t border-gray-100 pt-6 mt-2 flex flex-col gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-3 justify-center">
                  <Calendar size={15} className="text-gray-400" />
                  <span>
                    Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : "Recently"}
                  </span>
                </div>
              </div>

              {/* Tabs Section */}
              <div className="w-full flex flex-col gap-2 mt-6">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    activeTab === "details"
                      ? "bg-stone-900 text-white shadow-md shadow-stone-900/10"
                      : "text-gray-600 hover:bg-stone-100 hover:text-stone-900"
                  }`}
                >
                  <Settings size={16} />
                  Profile Details
                </button>
                <button
                  onClick={() => setActiveTab("password")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    activeTab === "password"
                      ? "bg-stone-900 text-white shadow-md shadow-stone-900/10"
                      : "text-gray-600 hover:bg-stone-100 hover:text-stone-900"
                  }`}
                >
                  <KeyRound size={16} />
                  Change Password
                </button>
              </div>
            </div>

            {/* Form Content Column */}
            <div className="md:col-span-8 p-8 sm:p-12 flex flex-col justify-center">
              {activeTab === "details" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Profile Details
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Update your account email address and username.
                    </p>
                  </div>

                  <form
                    onSubmit={handleUpdateProfileSubmit}
                    className="flex flex-col gap-4"
                  >
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Full Name
                      </label>
                      <div className="relative flex items-center bg-gray-50 hover:bg-gray-100/70 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 rounded-2xl px-4 py-3.5 border border-gray-100 focus-within:border-transparent transition-all duration-200">
                        <User className="w-4 h-4 text-gray-400 shrink-0 mr-3" />
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-transparent text-sm text-gray-800 placeholder-gray-300 outline-none w-full font-medium"
                          required
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Email Address
                      </label>
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

                    {/* Save Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-4 w-fit bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-8 py-3.5 rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Saving Changes...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </form>
                </div>
              )}

              {activeTab === "password" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Change Password
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Choose a secure password to keep your account safe.
                    </p>
                  </div>

                  <form
                    onSubmit={handleUpdatePasswordSubmit}
                    className="flex flex-col gap-4"
                  >
                    {/* Old Password */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Current Password
                      </label>
                      <div className="relative flex items-center bg-gray-50 hover:bg-gray-100/70 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 rounded-2xl px-4 py-3.5 border border-gray-100 focus-within:border-transparent transition-all duration-200">
                        <Lock className="w-4 h-4 text-gray-400 shrink-0 mr-3" />
                        <input
                          type="password"
                          placeholder="Current Password"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          className="bg-transparent text-sm text-gray-800 placeholder-gray-300 outline-none w-full font-medium"
                          required
                        />
                      </div>
                    </div>

                    {/* New Password */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        New Password
                      </label>
                      <div className="relative flex items-center bg-gray-50 hover:bg-gray-100/70 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 rounded-2xl px-4 py-3.5 border border-gray-100 focus-within:border-transparent transition-all duration-200">
                        <Lock className="w-4 h-4 text-gray-400 shrink-0 mr-3" />
                        <input
                          type="password"
                          placeholder="New Password (min 8 chars)"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="bg-transparent text-sm text-gray-800 placeholder-gray-300 outline-none w-full font-medium"
                          required
                        />
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Confirm New Password
                      </label>
                      <div className="relative flex items-center bg-gray-50 hover:bg-gray-100/70 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 rounded-2xl px-4 py-3.5 border border-gray-100 focus-within:border-transparent transition-all duration-200">
                        <Lock className="w-4 h-4 text-gray-400 shrink-0 mr-3" />
                        <input
                          type="password"
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="bg-transparent text-sm text-gray-800 placeholder-gray-300 outline-none w-full font-medium"
                          required
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-4 w-fit bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-8 py-3.5 rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Updating Password...
                        </>
                      ) : (
                        "Update Password"
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Profile;
