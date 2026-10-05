import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";

// The Express app is shared by the local server (server.js) and the Vercel function (api/index.js).
const app = express();

const origins = (process.env.CLIENT_ORIGIN || "http://localhost:5173").split(",").map((o) => o.trim());

app.set("trust proxy", 1);
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(cors({ origin: origins, credentials: true }));

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error(error.message);
    res.status(503).json({ message: "The database is not available right now. Please try again shortly." });
  }
});
app.use("/api/auth", authRoutes);
app.use("/api", contentRoutes);

app.use("/api", (req, res) => res.status(404).json({ message: "Route not found" }));

// Express 5 forwards rejected promises here.
app.use((err, req, res, _next) => {
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((e) => e.message).join(", ");
    return res.status(400).json({ message });
  }
  if (err.code === 11000) {
    return res.status(409).json({ message: `${Object.values(err.keyValue || {}).join(", ")} already exists` });
  }
  if (err.type === "entity.parse.failed") return res.status(400).json({ message: "Invalid JSON" });
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
});

export default app;
