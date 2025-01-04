import session from "express-session";
import PgSession from "connect-pg-simple";
import pool from "../db/dbPool";

const PgStore = PgSession(session);

export default session({
  store: new PgStore({ pool: pool }),
  secret: process.env.SESSION_SECRET || "TEMPorarySECRET01.",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24,
  },
});