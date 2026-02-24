import express from "express";
import product from "./routes/productRoutes.js";
import errorHandler from "./middleware/error.js";

const app = express();

app.use(express.json());

app.use("/api/v1", product);

app.use(errorHandler);

export default app;
