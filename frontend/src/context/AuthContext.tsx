import { createContext, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  verifyAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState(null);
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
  };

  const logout = async () => {
    await fetch("http://localhost:6060/api/users/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsAuthenticated(false);
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, verifyAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Link to="/" />;
  }

  return <>{children}</>;
}

export const useAuth = () => useContext(AuthContext);