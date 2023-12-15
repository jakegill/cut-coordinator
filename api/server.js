import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

//Start server
app.listen(3000, () => console.log("Server running on port 3000"));

// Routes
app.use("/api/auth", authRoutes);

//Middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

export default app;
