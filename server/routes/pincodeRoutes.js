import express from "express";

import {
  getPincodesByState,
} from "../controllers/pincodeController.js";

const router = express.Router();

router.get(
  "/state/:state",
  getPincodesByState
);

export default router;