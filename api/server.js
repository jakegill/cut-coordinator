import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import authRoutes from "./routes/auth.route.js";
import editBarberRoute from "./routes/editBarber.route.js";
import getAllBarbersRoute from "./routes/getAllBarbers.route.js";
import uploadImgRoute from "./routes/uploadImg.route.js";
import appointmentsRoute from "./routes/appointments.route.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Multer config
const upload = multer({ storage: multer.memoryStorage() });

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

//Start server
app.listen(3000, () => console.log("Server running on port 3000"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/editBarber", editBarberRoute);
app.use("/api/barbers", getAllBarbersRoute);
app.use("/api/gcs", upload.single("file"), uploadImgRoute);
app.use("/api/appointments", appointmentsRoute);

//Middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

export default app;
