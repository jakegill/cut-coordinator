import express from "express";
import multer from "multer";
import {
	uploadPortfolio,
	uploadBarberProfile,
	uploadClientProfile,
} from "../controllers/gcs/uploadImg.controller.js";
import { deletePortfolio } from "../controllers/gcs/deleteImg.controller.js";

const router = express.Router();

router.post("/:email/uploadPortfolio", uploadPortfolio);
router.post("/:email/uploadBarberProfile", uploadBarberProfile);
router.post("/:email/uploadClientProfile", uploadClientProfile);
router.delete("/:email/deleteImg", deletePortfolio);

export default router;
