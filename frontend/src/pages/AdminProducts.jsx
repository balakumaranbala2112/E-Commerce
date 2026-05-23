import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import AdminSidebar from "../components/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  clearMessage,
  removeErrors,
  resetProductCreateStatus,
  resetProductUpdateStatus,
  resetProductDeleteStatus,
} from "../features/products/productSlice";
import { Loader2, Plus, Edit2, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";

const AdminProducts = () => {
  const dispatch = useDispatch();

  const { products, loading, error, isCreated, isUpdated, isDeleted, message } =
    useSelector((state) => state.product);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form Fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Phone");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(removeErrors());
    }
    if (isCreated) {
      toast.success("Product Created Successfully!");
      dispatch(resetProductCreateStatus());
      closeModal();
      dispatch(getAdminProducts());
    }
    if (isUpdated) {
      toast.success("Product Updated Successfully!");
      dispatch(resetProductUpdateStatus());
      closeModal();
      dispatch(getAdminProducts());
    }
    if (isDeleted) {
      toast.success(message || "Product Deleted Successfully!");
      dispatch(resetProductDeleteStatus());
      dispatch(clearMessage());
      dispatch(getAdminProducts());
    }
  }, [dispatch, error, isCreated, isUpdated, isDeleted, message]);

  const openCreateModal = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setPrice("");
    setMrp("");
    setStock("1");
    setCategory("Phone");
    setImageUrl("https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400");
    setModalOpen(true);
  };

  const openEditModal = (prod) => {
    setEditingId(prod._id);
    setName(prod.name);
    setDescription(prod.description);
    setPrice(prod.price);
    setMrp(prod.mrp);
    setStock(prod.stock);
    setCategory(prod.category);
    setImageUrl(prod.image[0]?.url || "");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !price || !mrp || !stock || !imageUrl) {
      toast.error("Please fill in all fields");
      return;
    }

    const productData = {
      name,
      description,
      price: Number(price),
      mrp: Number(mrp),
      stock: Number(stock),
      category,
      image: [
        {
          public_id: "mock_public_id_" + Math.random().toString(36).substr(2, 9),
          url: imageUrl,
        },
      ],
    };

    if (editingId) {
      dispatch(updateProduct({ id: editingId, productData }));
    } else {
      dispatch(createProduct(productData));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <>
      <PageTitle title="Admin Products | ShoppingHUB" />
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 md:py-16">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <AdminSidebar />

            <div className="flex-1 w-full flex flex-col gap-6">
              {/* Header */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
                    Manage Products
                  </h1>
                  <p className="text-sm text-stone-400 mt-1">
                    Create, update, and delete e-commerce products.
                  </p>
                </div>
                <button
                  onClick={openCreateModal}
                  className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold px-5 py-3 rounded-2xl transition duration-150 flex items-center gap-2 text-sm shadow-md hover:shadow-blue-500/20 cursor-pointer"
                >
                  <Plus size={16} />
                  Add Product
                </button>
              </div>

              {/* Products Table */}
              {loading && !modalOpen ? (
                <div className="flex items-center justify-center py-20 text-stone-400">
                  <Loader2 className="w-10 h-10 animate-spin text-stone-500 mb-2" />
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-sm text-stone-500">
                      <thead className="bg-stone-50/75 border-b border-stone-100 text-xs font-semibold uppercase tracking-wider text-stone-700">
                        <tr>
                          <th scope="col" className="px-6 py-4">Image</th>
                          <th scope="col" className="px-6 py-4">Name</th>
                          <th scope="col" className="px-6 py-4">Stock</th>
                          <th scope="col" className="px-6 py-4">Price</th>
                          <th scope="col" className="px-6 py-4">Category</th>
                          <th scope="col" className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {products &&
                          products.map((prod) => (
                            <tr key={prod._id} className="hover:bg-stone-50/50 transition">
                              <td className="px-6 py-4">
                                <img
                                  src={prod.image[0]?.url || ""}
                                  alt=""
                                  className="w-12 h-12 rounded-lg object-cover border border-stone-100 bg-stone-50"
                                />
                              </td>
                              <td className="px-6 py-4 font-semibold text-stone-900 max-w-[200px] truncate">
                                {prod.name}
                              </td>
                              <td className="px-6 py-4">
                                <span
                                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                    prod.stock > 0
                                      ? "bg-emerald-50 text-emerald-700"
                                      : "bg-rose-50 text-rose-700"
                                  }`}
                                >
                                  {prod.stock} left
                                </span>
                              </td>
                              <td className="px-6 py-4 font-bold text-stone-900">
                                ₹{prod.price}
                              </td>
                              <td className="px-6 py-4 font-medium text-stone-600">
                                {prod.category}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => openEditModal(prod)}
                                    className="p-2 hover:bg-stone-100 rounded-xl text-stone-600 transition cursor-pointer"
                                    aria-label="Edit product"
                                  >
                                    <Edit2 size={14} />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(prod._id)}
                                    className="p-2 hover:bg-rose-50 rounded-xl text-rose-600 transition cursor-pointer"
                                    aria-label="Delete product"
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

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-stone-950">
                {editingId ? "Edit Product Details" : "Create New Product"}
              </h3>
              <button
                onClick={closeModal}
                className="text-stone-400 hover:text-stone-700 transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">
              {/* Product Name */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Product Name</label>
                <input
                  type="text"
                  placeholder="e.g. Phone 14 Pro Max"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-stone-50 rounded-2xl px-4 py-3 border border-stone-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-stone-800 font-medium transition"
                  required
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Description</label>
                <textarea
                  placeholder="Product specs & description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-stone-50 rounded-2xl px-4 py-3 border border-stone-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-stone-850 font-medium transition"
                  required
                />
              </div>

              {/* Price & MRP */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Selling Price (₹)</label>
                  <input
                    type="number"
                    placeholder="999"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-stone-50 rounded-2xl px-4 py-3 border border-stone-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-stone-800 font-medium transition"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">MRP Price (₹)</label>
                  <input
                    type="number"
                    placeholder="1299"
                    value={mrp}
                    onChange={(e) => setMrp(e.target.value)}
                    className="w-full bg-stone-50 rounded-2xl px-4 py-3 border border-stone-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-stone-800 font-medium transition"
                    required
                  />
                </div>
              </div>

              {/* Stock & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Stock Quantity</label>
                  <input
                    type="number"
                    placeholder="10"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full bg-stone-50 rounded-2xl px-4 py-3 border border-stone-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-stone-800 font-medium transition"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-stone-50 rounded-2xl px-4 py-3 border border-stone-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-stone-800 font-semibold transition"
                  >
                    <option value="Phone">Phone</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Books">Books</option>
                    <option value="Stationery">Stationery</option>
                  </select>
                </div>
              </div>

              {/* Image URL */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Product Image URL</label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-stone-50 rounded-2xl px-4 py-3 border border-stone-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-stone-800 font-medium transition"
                  required
                />
              </div>

              {/* Modal Actions */}
              <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="border border-stone-205 hover:bg-stone-50 font-semibold px-5 py-3 rounded-2xl text-stone-600 transition text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold px-6 py-3 rounded-2xl transition duration-150 text-sm flex items-center gap-2 shadow-md cursor-pointer"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingId ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProducts;
