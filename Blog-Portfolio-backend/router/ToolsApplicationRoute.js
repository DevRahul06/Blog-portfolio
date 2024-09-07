import express from "express";
import {
  addNewApplication,
  deleteApplication,
  getAllApplication,
} from "../controllers/ToolsApplicationControllers.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, addNewApplication);
router.get("/getAll", getAllApplication);
router.delete("/delete/:id", isAuthenticated, deleteApplication);

export default router;
