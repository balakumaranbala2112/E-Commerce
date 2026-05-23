import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Loader2, Package, Eye, ArrowRight } from "lucide-react";
import { getMyOrders, clearErrors } from "../features/order/orderSlice";
import toast from "react-hot-toast";
import { formatDate } from "../utils/formatter";

const MyOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      <PageTitle title="My Orders | ShoppingHUB" />
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 md:py-16">
          <div className="mb-8">
            <p className="text-xs tracking-[0.2em] uppercase text-amber-600 font-semibold mb-1">
              History
            </p>
            <h1 className="text-3xl font-bold text-stone-900">My Orders</h1>
          </div>

          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center py-20 text-stone-400">
              <Loader2 className="w-10 h-10 animate-spin text-stone-500 mb-3" />
              <p className="text-sm font-medium tracking-wide uppercase">Loading your orders...</p>
            </div>
          ) : !orders || orders.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center shadow-[0_4px_40px_rgba(0,0,0,0.04)] flex flex-col items-center gap-6 max-w-xl mx-auto">
              <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center text-stone-400">
                <Package size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-800">No Orders Found</h3>
                <p className="text-sm text-stone-400 mt-2 leading-relaxed">
                  You haven't placed any orders yet. Once you buy something, your order history will appear here.
                </p>
              </div>
              <Link
                to="/products"
                className="bg-stone-900 text-white font-semibold px-8 py-3.5 rounded-2xl hover:bg-stone-700 active:scale-95 transition-all duration-200"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm text-stone-500">
                  <thead className="bg-stone-50/75 border-b border-stone-100 text-xs font-semibold uppercase tracking-wider text-stone-700">
                    <tr>
                      <th scope="col" className="px-6 py-4">Order ID</th>
                      <th scope="col" className="px-6 py-4">Date Placed</th>
                      <th scope="col" className="px-6 py-4">Items Count</th>
                      <th scope="col" className="px-6 py-4">Total Amount</th>
                      <th scope="col" className="px-6 py-4">Status</th>
                      <th scope="col" className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {orders.map((order) => {
                      const totalItems = order.orderItems.reduce((acc, i) => acc + i.quantity, 0);
                      return (
                        <tr key={order._id} className="hover:bg-stone-50/50 transition">
                          <td className="px-6 py-4 font-mono font-medium text-stone-900">
                            {order._id}
                          </td>
                          <td className="px-6 py-4">
                            {formatDate(order.createdAt)}
                          </td>
                          <td className="px-6 py-4 font-semibold text-stone-750">
                            {totalItems} {totalItems === 1 ? "item" : "items"}
                          </td>
                          <td className="px-6 py-4 font-bold text-stone-900">
                            ₹{order.totalPrice.toLocaleString("en-IN")}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                                order.orderStatus === "Delivered"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : order.orderStatus === "Shipped"
                                  ? "bg-blue-50 text-blue-700"
                                  : "bg-amber-50 text-amber-700"
                              }`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-current" />
                              {order.orderStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link
                              to={`/order/${order._id}`}
                              className="inline-flex items-center gap-1 bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-650 text-xs font-semibold px-3.5 py-2 rounded-xl transition duration-150"
                            >
                              <Eye size={12} />
                              Details
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default MyOrders;
