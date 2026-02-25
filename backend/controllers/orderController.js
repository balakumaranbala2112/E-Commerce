import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import errorHandler from "../helper/handleError.js";

export const createNewOrder = async (req, res, next) => {
  const {
    shippingAddress,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingAddress,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(200).json({
    success: true,
    order,
  });
};

//Get Singlr order details
export const getOrderDetails = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );
  if (!order) {
    return next(new errorHandler("Order Not Found", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
};

//Get All order details
export const getAllOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }).populate(
    "user",
    "name email",
  );
  if (!orders) {
    return next(new errorHandler("Order Not Found", 404));
  }
  res.status(200).json({
    success: true,
    orders,
  });
};

export const getAllOrdersByAdmin = async (req, res, next) => {
  const orders = await Order.find().populate("user", "name email");
  if (!orders) {
    return next(new errorHandler("Order Not Found", 404));
  }
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
};

export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new errorHandler("Order Not Found", 404));
    }

    if (order.orderStatus !== "Delivered") {
      return next(
        new errorHandler(
          "This order is under processing and cant be deleted",
          404,
        ),
      );
    }
    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Order Deleted Successfully",
    });
  } catch (error) {
    next(error.message);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  const id = req.params.id;
  const order = await Order.findById(id);
  if (!order) {
    return next(new errorHandler("Order Not Found", 404));
  }
  if (order.orderStatus === "Delivered") {
    return next(new errorHandler("This order is already Delivered", 404));
  }

  //Update stock

  await Promise.all(
    order.orderItems.map((item) => updateQuantity(item.product, item.quantity)),
  );
  order.orderStatus = req.body.status;
  if (order.orderStatus === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    order,
  });
};

async function updateQuantity(id, quantity) {
  const product = await Product.findById(id);
  if (!product) {
    return next(new errorHandler("Product Not Found", 404));
  }
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}
