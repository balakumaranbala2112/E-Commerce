import mongoose from "mongoose";

export const connectDB = () => {
  mongoose.connect(process.env.DB_URL).then((data) => {
    console.log("Mongo DB connected successfully:", data.connection.host);
  });
};
