import { USERNAME_REGEX, EMAIL_REGEX, PASSWORD_REGEX } from "./regex.js";

export const isUsernameValid = (username) => USERNAME_REGEX.test(username);
export const isEmailValid = (email) => EMAIL_REGEX.test(email);
export const isPasswordValid = (password) => PASSWORD_REGEX.test(password);