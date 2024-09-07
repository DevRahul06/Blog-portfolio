import express from "express"
import { register, login, logout, getUser, userupdate, updatePassword, getUserForPortfolio,forgotPassword, resetPassword } from "../controllers/userController.js";
import {isAuthenticated} from "../middlewares/auth.js"

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/logout",isAuthenticated, logout);
router.get("/getuser",isAuthenticated, getUser);
router.put("/update/profile",isAuthenticated, userupdate);
router.put("/update/password",isAuthenticated, updatePassword);
router.get("/me/portfolio",getUserForPortfolio);
router.post("/password/forgot",forgotPassword);
router.put("/password/reset/:token", resetPassword);

export default router;