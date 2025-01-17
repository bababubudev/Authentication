import express from "express";
import { adminController } from "../controllers/adminController.js";
import { requireAdmin } from "../middleware/adminMiddleware.js";
import authorize from "../middleware/authorization.js";

const adminRoutes = express.Router();

adminRoutes.use(authorize, requireAdmin);

adminRoutes.get("/users", adminController.getUsers);
adminRoutes.put("/users/:userId/status", adminController.updateUserStatus);
adminRoutes.get("/users/:userId/audit", adminController.getUserAuditLog);

export default adminRoutes;