import { editClient } from "../controllers/client/editClient.controller.js";
import { getClient } from "../controllers/client/getClient.controller.js";
import { deleteSavedBarber } from "../controllers/client/deleteSavedBarber.controller.js";
import express from "express";

const router = express.Router();

router.post("/:email", editClient);
router.get("/:email", getClient);
router.delete("/:email", deleteSavedBarber);

export default router;
