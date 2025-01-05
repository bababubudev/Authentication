import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.post("/login", loginUser);
userRoutes.post("/register", registerUser);

export default userRoutes;