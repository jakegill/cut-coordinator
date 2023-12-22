import express from "express";
import {
  uploadImgGCSPortfolio,
  uploadImgGcsBarberProfile,
} from "../controllers/gcs/uploadImg.controller.js";

const router = express.Router();

router.post("/:email/uploadImg", uploadImgGCSPortfolio);
router.post("/:email/uploadBarberProfileImg", uploadImgGcsBarberProfile);
router.post("/:email/uploadClientProfileImg", uploadImgGcsBarberProfile);

export default router;
