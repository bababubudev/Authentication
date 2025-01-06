import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, confirmPassword: string) => Promise<void>;
  logout: () => Promise<void>;
  verifyAuth: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const verifyAuth = async () => {
    try {
      const response = await fetch("http://localhost:6060/api/users/verify", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.data);
        setIsAuthenticated(true);
      }
      else {
        setIsAuthenticated(false);
        setUser(null);
      }
    }
    catch (err) {
      setIsAuthenticated(false);
      setUser(null);
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:6060/api/users/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      setUser(data.data);
      setIsAuthenticated(true);
      navigate("/dashboard");
    }
    catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      throw err;
    }
  };

  const register = async (username: string, email: string, password: string, confirmPassword: string) => {
    try {
      setError(null);
      const response = await fetch("http://localhost:6060/api/users/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setUser(data.data);
      setIsAuthenticated(true);
      window.location.href = "/dashboard";
    }
    catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
      throw err;
    }
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:6060/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
    }
    finally {
      setIsAuthenticated(false);
      setUser(null);
      window.location.href = "/";
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      register,
      logout,
      verifyAuth,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}


export const useAuth = () => useContext(AuthContext);