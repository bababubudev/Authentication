import express from "express";
import { getUserData } from "../controllers/dashboardController.js";
import authorize from "../middleware/authorization.js";

const dashboardRoutes = express.Router();

dashboardRoutes.get("/", authorize, getUserData);

export default dashboardRoutes;