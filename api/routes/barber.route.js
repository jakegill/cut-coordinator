import express from "express";
import { editBarber } from "../controllers/barber/editBarber.controller.js";
import { getBarber } from "../controllers/barber/getBarber.controller.js";
import { getAllBarbers } from "../controllers/barber/getAllBarbers.controller.js";
import { deleteService } from "../controllers/barber/deleteService.controller.js";

const router = express.Router();

router.get("/getAllBarbers", getAllBarbers);
router.delete("/:email/service", deleteService);
router.post("/:email", editBarber);
router.get("/:email", getBarber);

export default router;
