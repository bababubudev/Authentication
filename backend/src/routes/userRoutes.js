import express from "express";

import { registerUser, loginUser, verifyUser, logoutUser } from "../controllers/userController.js";
import inputValidation from "../middleware/inputValidation.js";
import authorize from "../middleware/authorization.js";

const userRoutes = express.Router();

userRoutes.post("/login", inputValidation, loginUser);
userRoutes.post("/register", inputValidation, registerUser);
userRoutes.post("/logout", authorize, logoutUser);
userRoutes.get("/verify", authorize, verifyUser);

export default userRoutes;