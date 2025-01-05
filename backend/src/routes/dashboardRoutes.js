import express from "express";
import { getDashboard } from "../controllers/dashboardController.js";

const dashboardRoutes = express.Router();

dashboardRoutes.get("/", getDashboard);

export default dashboardRoutes;