import crypto from "crypto";

export function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function generateSessionExpiry() {
  const expiryDate = new Date();
  expiryDate.setHours(expiryDate.getHours() + 24);

  return expiryDate;
}