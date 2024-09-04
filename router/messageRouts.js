import express from "express"
import { getAllMessages, sendMessage, deleteMessages } from "../controllers/messageController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/send",sendMessage);
router.get("/getAll", getAllMessages)
router.delete("/delete/:id", isAuthenticated, deleteMessages)

export default router;