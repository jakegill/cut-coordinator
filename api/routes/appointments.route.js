import express from "express";
import createAppointment from "../controllers/appointment/createAppointment.controller.js";

const router = express.Router();

router.post("/create", createAppointment);

export default router;
