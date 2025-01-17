type DefaultUser = {
  id: string;
  username: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
  last_login: string | null;
}

type User = {
  user_id: string,
  token_hash: string,
  ip_address: string,
  user_agent: string,
  username: string,
  email: string,
  role: string,
  is_email_verified: boolean,
  is_active: boolean,
  last_login: Date,
  created_at: Date,
  updated_at: Date,
};

type AuditLog = {
  id: string,
  ip_address: string,
  user_agent: string,
  created_at: string,
}