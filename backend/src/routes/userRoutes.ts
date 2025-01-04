import express from "express";
import { registerUser, loginUser, getLoggedUser, logoutUser } from "../controllers/userController";

const userRoutes = express.Router();

userRoutes.get("/login/me", getLoggedUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/register", registerUser);
userRoutes.get("/logout", logoutUser);

export default userRoutes;