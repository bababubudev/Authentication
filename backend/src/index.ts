/// <reference path="./types/session.d.ts" />

import dotenv from "dotenv";
dotenv.config();

import app from "./app";
const PORT: string | undefined = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});