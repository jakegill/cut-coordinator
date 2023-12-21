import express from "express";
import createAppointment from "../controllers/createAppointment.controller.js";

const router = express.Router();

router.post("/createAppointment", createAppointment);

export default router;
