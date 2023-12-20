import express from "express";
import {
  uploadImgGCSPortfolio,
  uploadImgGCSProfile,
} from "../controllers/uploadImg.controller.js";

const router = express.Router();

router.post("/:email/uploadImg", uploadImgGCSPortfolio);
router.post("/:email/uploadProfileImg", uploadImgGCSProfile);

export default router;
