import { USERNAME_REGEX, EMAIL_REGEX, PASSWORD_REGEX } from "./regex";

export const isUsernameValid = (username: string): boolean => USERNAME_REGEX.test(username);
export const isEmailValid = (email: string): boolean => EMAIL_REGEX.test(email);
export const isPasswordValid = (password: string): boolean => PASSWORD_REGEX.test(password);