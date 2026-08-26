import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import { requireAdmin } from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();

const CLIENT_URL =
  process.env.CLIENT_URL || "http://localhost:5173";

/* ================= SECURITY ================= */

app.use(helmet());

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

/* ================= CORS ================= */

app.use(
  cors({
    origin: CLIENT_URL,
    methods: [
      "GET",
      "POST",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

/* ================= BODY ================= */

app.use(
  express.json({
    limit: "10kb",
  })
);

/* ================= DATABASE ================= */

let isConnected = false;

const connectDatabase = async () => {
  if (isConnected) {
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing.");
  }

  await mongoose.connect(process.env.MONGODB_URI);

  isConnected = true;

  console.log("MongoDB connected successfully.");
};

/* ================= HEALTH CHECK ================= */

app.get("/api/health", async (req, res) => {
  try {
    await connectDatabase();

    res.status(200).json({
      success: true,
      message: "Portfolio API is running.",
      database: "connected",
    });
  } catch (error) {
    console.error("Health check error:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed.",
    });
  }
});

/* ================= CONTACT API ================= */

app.use(
  "/api/contact",
  contactLimiter,
  async (req, res, next) => {
    try {
      await connectDatabase();
      next();
    } catch (error) {
      next(error);
    }
  },
  contactRoutes
);

/* ================= AUTH API ================= */

app.use(
  "/api/auth",
  async (req, res, next) => {
    try {
      await connectDatabase();
      next();
    } catch (error) {
      next(error);
    }
  },
  authRoutes
);

/* ================= ADMIN API ================= */

app.use(
  "/api/admin",
  async (req, res, next) => {
    try {
      await connectDatabase();
      next();
    } catch (error) {
      next(error);
    }
  },
  requireAdmin,
  adminRoutes
);

/* ================= 404 ================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

/* ================= ERROR HANDLER ================= */

app.use((error, req, res, next) => {
  console.error("Server error:", error);

  res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

/* ================= VERCEL EXPORT ================= */

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(
      `Server running at http://localhost:${PORT}`
    );
  });
}

export default app;