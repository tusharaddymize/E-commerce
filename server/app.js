import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/orders", orderRoutes);

// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "E-Commerce API Running Successfully 🚀",
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

export default app;