import express from "express";
import { fetchUserdata } from "../controllers/dashboardController.js";
import authorize from "../middleware/authorization.js";

const dashboardRoutes = express.Router();

dashboardRoutes.get("/", authorize, fetchUserdata);

export default dashboardRoutes;