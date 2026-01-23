import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import labRoutes from "./routes/labRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import protectedRoutes from "./routes/protected.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/lab", labRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", protectedRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
