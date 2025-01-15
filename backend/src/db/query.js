export const queries = {
  createUser: `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, username, email
  `,

  getUserByEmail: `
    SELECT * FROM users
    WHERE email = $1 AND is_active = true
  `,

  createSession: `
    INSERT INTO sessions (user_id, token_hash, expires_at, ip_address, user_agent)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `,

  validateSession: `
    SELECT s.*, u.id as user_id, u.username, u.email, u.role
    FROM sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.token_hash = $1
    AND s.expires_at > NOW()
  `,

  deleteSession: `
    DELETE FROM sessions
    WHERE token_hash = $1
  `,

  deleteExpiredQuery: `
    DELETE FROM sessions
    WHERE expires_at < NOW()
  `,
};