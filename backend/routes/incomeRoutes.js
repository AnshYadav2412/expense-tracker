import express from "express";

import {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel,
} from "../controllers/incomeController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.delete("/delete", protect, deleteIncome);
router.get("downloadExcel", protect, downloadIncomeExcel);

export default router;
