import { editClient } from "../controllers/client/editClient.controller.js";
import { getClient} from "../controllers/client/getClient.controller.js";
import express from "express";

const router = express.Router();

router.patch("/:email", editClient);
router.get("/:email", getClient);

export default router;