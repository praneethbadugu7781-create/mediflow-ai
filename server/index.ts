import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 4000;

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "MediFlow AI API", version: "1.0.0" });
});

// Dashboard stats
app.get("/api/dashboard/stats", (_req, res) => {
  res.json({
    totalRevenue: 2847500,
    monthlyProfit: 412800,
    pendingPayments: 186400,
    todayExpenses: 12450,
    productDeliveries: 47,
  });
});

// Expenses CRUD placeholder
app.get("/api/expenses", (_req, res) => {
  res.json([]);
});

app.post("/api/expenses", (req, res) => {
  res.status(201).json({ id: crypto.randomUUID(), ...req.body });
});

// Hospitals
app.get("/api/hospitals", (_req, res) => {
  res.json([]);
});

// Auth
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (password?.length >= 6) {
    return res.json({ token: "jwt-placeholder", user: { email, role: "OWNER" } });
  }
  res.status(401).json({ error: "Invalid credentials" });
});

app.listen(PORT, () => {
  console.log(`MediFlow AI API running on http://localhost:${PORT}`);
});
