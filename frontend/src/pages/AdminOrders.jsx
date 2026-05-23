import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import AdminSidebar from "../components/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminOrders,
  updateOrderStatus,
  deleteOrder,
  clearErrors,
  resetOrderUpdateStatus,
  resetOrderDeleteStatus,
} from "../features/order/orderSlice";
import { Loader2, Trash2, ArrowUpRight, Check } from "lucide-react";
import toast from "react-hot-toast";
import { formatDate } from "../utils/formatter";

const AdminOrders = () => {
  const dispatch = useDispatch();

  const { orders, loading, error, isUpdated, isDeleted } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getAdminOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Order Status Updated Successfully!");
      dispatch(resetOrderUpdateStatus());
      dispatch(getAdminOrders());
    }
    if (isDeleted) {
      toast.success("Order Deleted Successfully!");
      dispatch(resetOrderDeleteStatus());
      dispatch(getAdminOrders());
    }
  }, [dispatch, error, isUpdated, isDeleted]);

  const handleUpdateStatus = (id, currentStatus) => {
    let nextStatus = "";
    if (currentStatus === "Processing") {
      nextStatus = "Shipped";
    } else if (currentStatus === "Shipped") {
      nextStatus = "Delivered";
    } else {
      return; // Already delivered
    }

    dispatch(updateOrderStatus({ id, status: nextStatus }));
  };

  const handleDeleteOrder = (id, status) => {
    if (status !== "Delivered") {
      toast.error("Under processing orders cannot be deleted!");
      return;
    }
    if (window.confirm("Are you sure you want to delete this order?")) {
      dispatch(deleteOrder(id));
    }
  };

  return (
    <>
      <PageTitle title="Admin Orders | ShoppingHUB" />
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 md:py-16">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <AdminSidebar />

            <div className="flex-1 w-full flex flex-col gap-6">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
                  Manage Orders
                </h1>
                <p className="text-sm text-stone-400 mt-1">
                  Track shipment status and fulfill active orders.
                </p>
              </div>

              {/* Table */}
              {loading ? (
                <div className="flex items-center justify-center py-20 text-stone-400">
                  <Loader2 className="w-10 h-10 animate-spin text-stone-500 mb-2" />
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-sm text-stone-500">
                      <thead className="bg-stone-50/75 border-b border-stone-100 text-xs font-semibold uppercase tracking-wider text-stone-700">
                        <tr>
                          <th scope="col" className="px-6 py-4">Order ID</th>
                          <th scope="col" className="px-6 py-4">Customer</th>
                          <th scope="col" className="px-6 py-4">Date</th>
                          <th scope="col" className="px-6 py-4">Total Price</th>
                          <th scope="col" className="px-6 py-4">Status</th>
                          <th scope="col" className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {orders &&
                          orders.map((order) => (
                            <tr key={order._id} className="hover:bg-stone-50/50 transition">
                              <td className="px-6 py-4 font-mono font-medium text-stone-900">
                                {order._id}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex flex-col">
                                  <span className="font-semibold text-stone-800">{order.user?.name}</span>
                                  <span className="text-xs text-stone-400">{order.user?.email}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                {formatDate(order.createdAt)}
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
                                <div className="flex items-center justify-end gap-2">
                                  {/* Update status action */}
                                  {order.orderStatus !== "Delivered" ? (
                                    <button
                                      onClick={() => handleUpdateStatus(order._id, order.orderStatus)}
                                      className="inline-flex items-center gap-1 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold px-3 py-2 rounded-xl transition duration-150 cursor-pointer"
                                      title={order.orderStatus === "Processing" ? "Ship Order" : "Deliver Order"}
                                    >
                                      <ArrowUpRight size={12} />
                                      {order.orderStatus === "Processing" ? "Ship" : "Deliver"}
                                    </button>
                                  ) : (
                                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-2 rounded-xl inline-flex items-center gap-1 select-none">
                                      <Check size={12} />
                                      Done
                                    </span>
                                  )}

                                  {/* Delete Order Action */}
                                  <button
                                    onClick={() => handleDeleteOrder(order._id, order.orderStatus)}
                                    className={`p-2 rounded-xl transition cursor-pointer ${
                                      order.orderStatus === "Delivered"
                                        ? "text-rose-600 hover:bg-rose-50"
                                        : "text-stone-300 cursor-not-allowed"
                                    }`}
                                    disabled={order.orderStatus !== "Delivered"}
                                    title="Delete Order (Delivered Only)"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
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

export default AdminOrders;
