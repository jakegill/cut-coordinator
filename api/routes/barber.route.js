import express from "express";
import { editBarber } from "../controllers/barber/editBarber.controller.js";
import { getBarber } from "../controllers/barber/getBarber.controller.js";
import { getAllBarbers } from "../controllers/barber/getAllBarbers.controller.js";

const router = express.Router();

router.get("/getAllBarbers", getAllBarbers);
router.patch("/:email", editBarber);
router.get("/:email", getBarber);

export default router;
