import { AuthContext } from "./AuthContext";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const BASEURL = "http://localhost:6060/api/users";

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const verifyAuth = async () => {
    try {
      const response = await fetch(BASEURL + "/verify", {
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
      const response = await fetch(BASEURL + "/login", {
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
      const response = await fetch(BASEURL + "/register", {
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
      navigate("/dashboard");
    }
    catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
      throw err;
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const response = await fetch(BASEURL + "/change-password", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Password change failed");
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
      navigate("/");
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
      changePassword,
      logout,
      verifyAuth,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const context = useContext(AuthContext);

  if (!context?.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}