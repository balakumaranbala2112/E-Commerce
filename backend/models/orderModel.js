import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // ─── Shipping Details ───────────────────────────────
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      pinCode: { type: Number, required: true },
      phoneNo: { type: Number, required: true },
    },

    // ─── Ordered Products ───────────────────────────────
    // Each item stores a snapshot of the product at time of order
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product", // links to Product model
          required: true,
        },
      },
    ],

    // ─── Who Placed the Order ────────────────────────────
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User", // links to User model
      required: true,
    },

    // ─── Payment ─────────────────────────────────────────
    paymentInfo: {
      id: { type: String, required: true }, // payment gateway transaction id
      status: { type: String, required: true }, // e.g. "succeeded"
    },
    
    paidAt: { type: Date, required: true },

    // ─── Price Breakdown ──────────────────────────────────
    itemsPrice: { type: Number, required: true, default: 0 },
    taxPrice: { type: Number, required: true, default: 0 },
    shippingPrice: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },

    // ─── Order Status ─────────────────────────────────────
    // Flows: Processing → Shipped → Delivered
    orderStatus: {
      type: String,
      required: true,
      default: "Processing",
      //   enum: ["Processing", "Shipped", "Delivered"], // only these 3 values allowed
    },
    deliveredAt: Date, // only set when orderStatus becomes "Delivered"
  },
  { timestamps: true }, // adds createdAt and updatedAt automatically
);

export default mongoose.model("Order", orderSchema);
