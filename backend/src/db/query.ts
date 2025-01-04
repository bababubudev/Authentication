export const createUserQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";

export const getUserByEmailQuery = "SELECT * FROM users WHERE email=$1";

export const getUserByUsernameQuery = "SELECT * FROM users WHERE username=$1";