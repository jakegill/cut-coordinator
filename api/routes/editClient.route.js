import express from "express";
import { editBarber } from "../controllers/editBarber.controller.js";
import { getBarber } from "../controllers/getBarber.controller.js";

const router = express.Router();

router.patch("/:email", editBarber);
router.get("/:email", getBarber);

export default router;
