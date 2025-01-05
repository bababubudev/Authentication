import express from "express";

import { registerUser, loginUser } from "../controllers/userController.js";
import inputValidation from "../middleware/inputValidation.js";

const userRoutes = express.Router();

userRoutes.post("/login", inputValidation, loginUser);
userRoutes.post("/register", inputValidation, registerUser);

export default userRoutes;