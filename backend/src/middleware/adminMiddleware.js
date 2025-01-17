export function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      message: "forbidden - Admin access required"
    });
  }

  next();
}