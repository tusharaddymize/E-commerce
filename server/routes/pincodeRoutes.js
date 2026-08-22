import express from "express";
import {
  getPincodesByState,
} from "../controllers/pincodeController.js";

const router = express.Router();

// ==========================================
// GET PINCODES BY STATE
// GET /api/pincodes/state/:state
// ==========================================

router.get(
  "/state/:state",
  getPincodesByState
);

export default router;