import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product name..."],
  },
  description: {
    type: String,
    required: [true, "Please Enter product description..."],
  },
  mrp: {
    type: Number,
    required: [true, "Please Enter product MRP price..."],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product price..."],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  image: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter product Category..."],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter product Stock..."],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
      avatar: { type: String },
      name: { type: String, required: [true] },
      rating: { type: Number, required: [true] },
      comment: { type: String, required: [true] },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Product", productSchema);
