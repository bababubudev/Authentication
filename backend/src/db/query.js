export const queries = {
  createUser: `
    INSERT INTO users (username, email, password, role)
    VALUES ($1, $2, $3, 'user')
    RETURNING id, username, email
  `,

  getUserByEmail: `
    SELECT * FROM users
    WHERE email=$1 AND is_active = true
  `,

  getUserByEmailOrUsername: `
    SELECT * FROM users
    WHERE (email = $1 OR $1 IS NULL)
    AND (username = $2 or $2 IS NULL)
    AND is_active = true
  `,

  updatePassword: `
    UPDATE users
    SET password = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING id
  `,

  validatePassword: `
    SELECT password
    FROM users WHERE id = $1
  `,

  updateLastLogin: `
    UPDATE users
    SET last_login = CURRENT_TIMESTAMP
    WHERE id = $1
  `,

  createSession: `
    INSERT INTO sessions (user_id, token_hash, expires_at, ip_address, user_agent)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `,

  validateSession: `
    SELECT
    s.token_hash,
    u.id as user_id,
    u.username,
    u.email,
    u.role,
    u.is_email_verified,
    u.is_active,
    u.created_at,
    u.updated_at,
    u.last_login
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

export const adminQueries = {
  getAllUsers: `
    SELECT
    u.id as user_id,
    u.username,
    u.email,
    u.role,
    u.is_email_verified,
    u.is_active,
    u.created_at,
    u.updated_at,
    u.last_login
    FROM users u
  `,

  getUserAuditLog: `
    SELECT * FROM sessions
    WHERE user_id = $1
    ORDER BY created_at DESC
  `,

  updateUserStatus: `
    UPDATE users SET is_active = $1,
    updated_at = CURRENT_TIMESTAMP
    WHERE id = $2 RETURNING *
  `,

  updateUsername: `
    UPDATE users SET username = $1,
    updated_at = CURRENT_TIMESTAMP
    WHERE id = $2 RETURNING *
  `,

  getUserRole: `
    SELECT role FROM users where id = $1
  `
}