import express from "express";
import multer from "multer";
import {
  uploadImgGCSPortfolio,
  uploadImgGcsBarberProfile,
  uploadImgGcsClientProfile,
} from "../controllers/gcs/uploadImg.controller.js";

const router = express.Router();

router.post("/:email/uploadImg", uploadImgGCSPortfolio);
router.post("/:email/uploadBarberProfileImg", uploadImgGcsBarberProfile);
router.post("/:email/uploadClientProfileImg", uploadImgGcsClientProfile);

export default router;
