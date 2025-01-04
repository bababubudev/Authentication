import session from "express-session";
import PgSession from "connect-pg-simple";
import pool from "../db/dbPool";

const PgStore = PgSession(session);

export default session({
  store: new PgStore({ pool: pool, createTableIfMissing: true }),
  secret: process.env.SESSION_SECRET || "TEMPorarySECRET01.",
  resave: false,
  saveUninitialized: false,
  name: "connect.sid",
  cookie: {
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    path: "/",
    domain: "localhost"
  },
});