import express from "express";
import {
  addNewBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogControllers.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, addNewBlog);
router.get("/getall", getAllBlog);
router.get("/get/:id", getSingleBlog);
router.put("/update/:id", updateBlog);
router.delete("/delete/:id", isAuthenticated, deleteBlog);

export default router;
