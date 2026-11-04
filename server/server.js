require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const clientRoutes = require("./routes/clientRoutes");
const materialRoutes = require("./routes/materialRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const noteRoutes = require("./routes/noteRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// ======================
// Connect Database
// ======================
connectDB();

// ======================
// Middleware
// ======================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// Static Upload Folder
// ======================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ======================
// API Routes
// ======================
app.use("/api/auth", authRoutes);

app.use("/api/clients", clientRoutes);

app.use("/api/materials", materialRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/notes", noteRoutes);

app.use("/api/tasks", taskRoutes);

// ======================
// Home Route
// ======================
app.get("/", (req, res) => {
  res.send("🚀 Vinfluence CRM Backend Running...");
});

// ======================
// Start Server
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});