import { isEmailValid, isPasswordValid, isUsernameValid } from "../utils/validation.js";

export default function inputValidation(req, res, next) {
  let { username, email, password, confirmPassword, currentPassword } = req.body;
  let errors = [];

  if (req.path === "/register") {
    if (![username, email, password, confirmPassword].every(Boolean)) {
      res.status(400).json({ message: "Missing fields" });
      return;
    }

    if (!isUsernameValid(username)) {
      errors.push("Username must be 3-16 characters long, and may include '-' or '_'.");
    }

    if (!isEmailValid(email)) {
      errors.push("Invalid email address");
    }

    if (!isPasswordValid(password)) {
      errors.push(
        ["Must contain at least 8 characters"],
        ["Contains one digit"],
        ["Contains one special character"]
      );
    }

    if (password !== confirmPassword) {
      errors.push("Passwords do not match.");
    }

    if (errors.length > 0) {
      res.status(400).json({ message: "Error registering user.", data: errors });
      return;
    }
  }
  else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      res.status(400).json({ message: "Missing fields" });
      return;
    }

    if (!isEmailValid(email)) {
      res.status(422).json({ message: "Email format not valid." });
      return;
    }
  }
  else if (req.path === "/dashboard") {
    if (![currentPassword, confirmPassword, password].every(Boolean)) {
      res.status(400).json({ message: "Missing fields" });
      return;
    }

    if (currentPassword === password) {
      res.status(400).json({ message: "New password cannot be the same as old." });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json({ message: "Passwords do not match." });
      return;
    }
  }

  next();
}