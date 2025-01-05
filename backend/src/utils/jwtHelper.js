import jwt from "jsonwebtoken";

function jwtGenerator(payload) {
  return jwt.sign(payload, process.env.SESSION_SECRET, { expiresIn: "24hr" });
}

function jwtVerifier(token) {
  return jwt.verify(token, process.env.SESSION_SECRET);
}

export {
  jwtGenerator,
  jwtVerifier
}