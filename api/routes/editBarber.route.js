import express from "express";
import { editBarber } from "../controllers/editBarber.controller.js";

const router = express.Router();

router.patch("/:email", editBarber);

export default router;
