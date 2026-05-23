import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import AdminSidebar from "../components/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
  clearErrors,
  resetUpdateStatus,
  resetDeleteStatus,
  clearMessage,
} from "../features/user/userSlice";
import { Loader2, Trash2, ShieldCheck, ShieldOff } from "lucide-react";
import toast from "react-hot-toast";
import { formatDate } from "../utils/formatter";

const AdminUsers = () => {
  const dispatch = useDispatch();

  const {
    users,
    loading,
    error,
    isUpdated,
    isDeleted,
    message,
    user: currentUser,
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("User Role Updated Successfully!");
      dispatch(resetUpdateStatus());
      dispatch(getAllUsers());
    }
    if (isDeleted) {
      toast.success(message || "User Deleted Successfully!");
      dispatch(resetDeleteStatus());
      dispatch(clearMessage());
      dispatch(getAllUsers());
    }
  }, [dispatch, error, isUpdated, isDeleted, message]);

  const handleRoleToggle = (id, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    if (window.confirm(`Change this user's role to "${newRole}"?`)) {
      dispatch(updateUserRole({ id, roleData: { role: newRole } }));
    }
  };

  const handleDeleteUser = (id) => {
    if (id === currentUser?._id) {
      toast.error("You cannot delete your own account.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this user? This cannot be undone.")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <PageTitle title="Admin Users | ShoppingHUB" />
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 md:py-16">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <AdminSidebar />

            <div className="flex-1 w-full flex flex-col gap-6">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
                  Manage Users
                </h1>
                <p className="text-sm text-stone-400 mt-1">
                  View registered users, toggle admin roles, or remove accounts.
                </p>
              </div>

              {/* Table */}
              {loading ? (
                <div className="flex items-center justify-center py-20 text-stone-400">
                  <Loader2 className="w-10 h-10 animate-spin text-stone-500" />
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-sm text-stone-500">
                      <thead className="bg-stone-50/75 border-b border-stone-100 text-xs font-semibold uppercase tracking-wider text-stone-700">
                        <tr>
                          <th scope="col" className="px-6 py-4">User</th>
                          <th scope="col" className="px-6 py-4">Email</th>
                          <th scope="col" className="px-6 py-4">Joined</th>
                          <th scope="col" className="px-6 py-4">Role</th>
                          <th scope="col" className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {users &&
                          users.map((u) => (
                            <tr
                              key={u._id}
                              className={`hover:bg-stone-50/50 transition ${
                                u._id === currentUser?._id ? "bg-blue-50/30" : ""
                              }`}
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={
                                      u.avatar?.url ||
                                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80"
                                    }
                                    alt={u.name}
                                    className="w-9 h-9 rounded-full object-cover border border-stone-100 bg-stone-100 shrink-0"
                                  />
                                  <div className="flex flex-col">
                                    <span className="font-semibold text-stone-900">
                                      {u.name}
                                    </span>
                                    {u._id === currentUser?._id && (
                                      <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                                        (You)
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">{u.email}</td>
                              <td className="px-6 py-4">
                                {u.createdAt ? formatDate(u.createdAt) : "—"}
                              </td>
                              <td className="px-6 py-4">
                                <span
                                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                    u.role === "admin"
                                      ? "bg-purple-50 text-purple-700 border border-purple-100"
                                      : "bg-stone-100 text-stone-600 border border-stone-200"
                                  }`}
                                >
                                  {u.role}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  {/* Toggle Role */}
                                  <button
                                    onClick={() => handleRoleToggle(u._id, u.role)}
                                    disabled={u._id === currentUser?._id}
                                    className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-xl transition duration-150 cursor-pointer ${
                                      u.role === "admin"
                                        ? "bg-stone-100 hover:bg-amber-50 text-stone-600 hover:text-amber-700"
                                        : "bg-purple-50 hover:bg-purple-100 text-purple-700"
                                    } disabled:opacity-40 disabled:cursor-not-allowed`}
                                    title={
                                      u.role === "admin"
                                        ? "Demote to User"
                                        : "Promote to Admin"
                                    }
                                  >
                                    {u.role === "admin" ? (
                                      <>
                                        <ShieldOff size={12} />
                                        Demote
                                      </>
                                    ) : (
                                      <>
                                        <ShieldCheck size={12} />
                                        Make Admin
                                      </>
                                    )}
                                  </button>

                                  {/* Delete User */}
                                  <button
                                    onClick={() => handleDeleteUser(u._id)}
                                    disabled={u._id === currentUser?._id}
                                    className="p-2 hover:bg-rose-50 rounded-xl text-rose-500 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                                    aria-label="Delete user"
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

export default AdminUsers;
