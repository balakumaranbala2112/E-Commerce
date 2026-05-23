import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import AdminSidebar from "../components/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../features/products/productSlice";
import { getAdminOrders } from "../features/order/orderSlice";
import { getAllUsers } from "../features/user/userSlice";
import {
  TrendingUp,
  ShoppingBasket,
  ShoppingCart,
  Users,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.product);
  const { orders, totalAmount } = useSelector((state) => state.order);
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      navigate("/");
      return;
    }
    dispatch(getAdminProducts());
    dispatch(getAdminOrders());
    dispatch(getAllUsers());
  }, [dispatch, isAuthenticated, user, navigate]);

  const loading = false; // Add state indicator if needed, but simple analytics count suffices

  const cardItems = [
    {
      title: "Total Revenue",
      value: `₹${totalAmount?.toLocaleString("en-IN") || 0}`,
      icon: TrendingUp,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      title: "Active Products",
      value: products?.length || 0,
      icon: ShoppingBasket,
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Placed Orders",
      value: orders?.length || 0,
      icon: ShoppingCart,
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
    {
      title: "Registered Users",
      value: users?.length || 0,
      icon: Users,
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
  ];

  return (
    <>
      <PageTitle title="Admin Dashboard | ShoppingHUB" />
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 md:py-16">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <AdminSidebar />

            <div className="flex-1 w-full flex flex-col gap-8">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
                  Dashboard Overview
                </h1>
                <p className="text-sm text-stone-400 mt-1">
                  Real-time analytics and store status.
                </p>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {cardItems.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={card.title}
                      className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center justify-between gap-4"
                    >
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                          {card.title}
                        </span>
                        <span className="text-2xl font-black text-stone-900">
                          {card.value}
                        </span>
                      </div>
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 ${card.color}`}
                      >
                        <Icon size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Graph or Stats Summary Placeholder */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col gap-6">
                <h3 className="text-lg font-bold text-stone-900">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => navigate("/admin/products")}
                    className="flex flex-col items-center gap-3 p-6 border border-stone-200 hover:border-blue-500 rounded-2xl text-stone-600 hover:text-blue-600 hover:bg-blue-50/20 transition-all duration-200 text-center font-semibold text-sm cursor-pointer"
                  >
                    <ShoppingBasket size={24} />
                    Manage Products
                  </button>
                  <button
                    onClick={() => navigate("/admin/orders")}
                    className="flex flex-col items-center gap-3 p-6 border border-stone-200 hover:border-blue-500 rounded-2xl text-stone-600 hover:text-blue-600 hover:bg-blue-50/20 transition-all duration-200 text-center font-semibold text-sm cursor-pointer"
                  >
                    <ShoppingCart size={24} />
                    Manage Orders
                  </button>
                  <button
                    onClick={() => navigate("/admin/users")}
                    className="flex flex-col items-center gap-3 p-6 border border-stone-200 hover:border-blue-500 rounded-2xl text-stone-600 hover:text-blue-600 hover:bg-blue-50/20 transition-all duration-200 text-center font-semibold text-sm cursor-pointer"
                  >
                    <Users size={24} />
                    Manage Users
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AdminDashboard;
