import express from "express";
import { getAllBarbers } from "../controllers/getAllBarbers.controller.js";

const router = express.Router();

router.get("/getAllBarbers", getAllBarbers);

export default router;
