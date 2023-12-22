import express from "express";

const router = express.Router();

router.patch("/:email", editClient);
router.get("/:email", getClient);

export default router;
