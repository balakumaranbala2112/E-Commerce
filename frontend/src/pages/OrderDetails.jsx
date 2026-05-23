import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Loader2, MapPin, CreditCard, ShoppingBag, Calendar, CheckCircle2 } from "lucide-react";
import { getOrderDetails, clearErrors } from "../features/order/orderSlice";
import toast from "react-hot-toast";
import { formatDate } from "../utils/formatter";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, error, order } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const addressString = order
    ? `${order.shippingAddress?.address}, ${order.shippingAddress?.city}, ${order.shippingAddress?.state}, ${order.shippingAddress?.country} - ${order.shippingAddress?.pinCode}`
    : "";

  return (
    <>
      <PageTitle title={`Order #${id?.substring(0, 8)} Details`} />
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Navbar />

        <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-10 md:py-16">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Link to="/orders" className="text-xs font-semibold text-blue-600 hover:underline uppercase tracking-wider block mb-1">
                &larr; Back to Orders
              </Link>
              <h1 className="text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight">
                Order <span className="font-mono text-xl md:text-2xl text-stone-500 font-medium">#{id}</span>
              </h1>
            </div>

            {order && (
              <span
                className={`w-fit inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${
                  order.orderStatus === "Delivered"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    : order.orderStatus === "Shipped"
                    ? "bg-blue-50 text-blue-700 border border-blue-100"
                    : "bg-amber-50 text-amber-700 border border-amber-100"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {order.orderStatus}
              </span>
            )}
          </div>

          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center py-20 text-stone-400">
              <Loader2 className="w-10 h-10 animate-spin text-stone-500 mb-3" />
              <p className="text-sm font-medium tracking-wide uppercase">Loading order details...</p>
            </div>
          ) : !order ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm max-w-lg mx-auto">
              <p className="text-stone-500">Order not found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Side Details */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {/* Shipping Details */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col gap-4">
                  <h3 className="text-lg font-bold text-stone-900 pb-3 border-b border-stone-100 flex items-center gap-2">
                    <MapPin size={18} className="text-blue-500" />
                    Delivery Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-stone-600 mt-2">
                    <div>
                      <strong className="text-stone-800 block mb-1">Customer Name</strong>
                      <span>{order.user?.name}</span>
                    </div>
                    <div>
                      <strong className="text-stone-800 block mb-1">Customer Email</strong>
                      <span>{order.user?.email}</span>
                    </div>
                    <div>
                      <strong className="text-stone-800 block mb-1">Contact Number</strong>
                      <span>{order.shippingAddress?.phoneNo}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <strong className="text-stone-800 block mb-1">Shipping Address</strong>
                      <span className="leading-relaxed">{addressString}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Status */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col gap-4">
                  <h3 className="text-lg font-bold text-stone-900 pb-3 border-b border-stone-100 flex items-center gap-2">
                    <CreditCard size={18} className="text-blue-500" />
                    Payment Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-stone-600 mt-2">
                    <div>
                      <strong className="text-stone-800 block mb-1">Transaction ID</strong>
                      <span className="font-mono text-xs">{order.paymentInfo?.id}</span>
                    </div>
                    <div>
                      <strong className="text-stone-800 block mb-1">Payment Status</strong>
                      <span
                        className={`font-semibold capitalize ${
                          order.paymentInfo?.status === "succeeded" ? "text-emerald-600" : "text-rose-600"
                        }`}
                      >
                        {order.paymentInfo?.status}
                      </span>
                    </div>
                    <div>
                      <strong className="text-stone-800 block mb-1">Date Placed</strong>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-stone-400" />
                        {formatDate(order.createdAt)}
                      </span>
                    </div>
                    {order.deliveredAt && (
                      <div>
                        <strong className="text-stone-800 block mb-1">Date Delivered</strong>
                        <span className="flex items-center gap-1.5 text-emerald-600">
                          <CheckCircle2 size={13} />
                          {formatDate(order.deliveredAt)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Items List */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col gap-4">
                  <h3 className="text-lg font-bold text-stone-900 pb-3 border-b border-stone-100 flex items-center gap-2">
                    <ShoppingBag size={18} className="text-blue-500" />
                    Ordered Items
                  </h3>
                  <div className="flex flex-col gap-4 mt-2">
                    {order.orderItems?.map((item) => (
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

              {/* Right Side Summary */}
              <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
                <h3 className="text-lg font-bold text-stone-900 mb-4 pb-4 border-b border-stone-100">
                  Total Summary
                </h3>

                <div className="flex flex-col gap-3.5">
                  <div className="flex justify-between text-sm text-stone-500">
                    <span>Items Total</span>
                    <span className="font-semibold text-stone-800">
                      ₹{order.itemsPrice?.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-stone-500">
                    <span>Shipping Charges</span>
                    <span className="font-semibold text-stone-800">
                      {order.shippingPrice === 0 ? "FREE" : `₹${order.shippingPrice}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-stone-500">
                    <span>GST Tax (18%)</span>
                    <span className="font-semibold text-stone-800">
                      ₹{order.taxPrice?.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <hr className="border-stone-100 my-2" />

                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold text-stone-800">Paid Amount</span>
                    <span className="text-xl font-extrabold text-stone-950">
                      ₹{order.totalPrice?.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default OrderDetails;
