import express from "express"
import { postTimeline, deleteTimeline, getAllTimeline } from "../controllers/timelineControllers.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, postTimeline);
router.delete("/delete/:id",isAuthenticated,deleteTimeline);
router.get("/getAll", getAllTimeline);

export default router;