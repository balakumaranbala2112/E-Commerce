import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config({ path: "backend/config/.env" });
const PORT = process.env.PORT || 3000;

connectDB();

process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Server is shut down uncaughtException");

  process.exit(1);
});

const server = app.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}`),
);

process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Server is shut down");

  server.close(() => {
    process.exit(1);
  });
});
