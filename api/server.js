import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import auth from "./routes/auth.route.js";
import client from "./routes/client.route.js";
import barber from "./routes/barber.route.js";
import gcs from "./routes/uploadImg.route.js";
import appointments from "./routes/appointments.route.js";
dotenv.config();

//TODO: change patches to posts

const app = express();
app.use(express.json());
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

app.listen(3000, () => console.log("Server running on port 3000"));

// Routes
app.use("/api/auth", auth);
app.use("/api/barber", barber);
app.use("/api/client", client);
app.use("/api/gcs", upload.single("file"), gcs); //google cloud storage for images
app.use("/api/appointments", appointments);

//Middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

export default app;
