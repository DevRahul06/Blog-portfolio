import express from "express";
import {addNewSkill, getAllSkill, updateSkill, deleteNewSkill} from "../controllers/skillsController.js"
import { isAuthenticated } from "../middlewares/auth.js";



const router = express.Router();

router.post("/add", isAuthenticated, addNewSkill);
router.get("/getall", getAllSkill);
router.put("/update/:id", updateSkill);
router.delete("/delete/:id", isAuthenticated, deleteNewSkill);

export default router;
