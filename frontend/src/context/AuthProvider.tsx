import { AuthContext } from "./AuthContext";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { MessageType, Status } from "../types/Notification";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const BASEURL = "http://localhost:6060/api/users";

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<MessageType | null>(null);
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

      setError(null);
    }
    catch (err) {
      setIsAuthenticated(false);
      setUser(null);
    }
  }

  const login = async (emailOrUsername: string, password: string) => {
    try {
      const response = await fetch(BASEURL + "/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrUsername, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      setUser(data.data);
      setIsAuthenticated(true);
      setError(null);
      navigate("/dashboard", { state: { message: data.message, state: Status.Success } });
    }
    catch (err) {
      const errMessage = err instanceof Error ? err.message : "Login failed";
      setError({ message: errMessage, state: Status.Error });
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
      setError(null);

      navigate("/", { state: { message: data.message, state: Status.Success } });
    }
    catch (err) {
      const errMessage = err instanceof Error ? err.message : "Registration failed";
      setError({ message: errMessage, state: Status.Warn });
      throw err;
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string, confirmPassword: string) => {
    try {
      const response = await fetch(BASEURL + "/change-password", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, password: newPassword, confirmPassword }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      navigate("/", { state: { message: "Password changed. User logged out", state: Status.Info } });
    } catch (err) {
      const errMessage = err instanceof Error ? err.message : "Password change failed";
      setError({ message: errMessage, state: Status.Error });
      throw err;
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:6060/api/users/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        navigate("/", {
          state: {
            message: "Logged out successfully",
            state: Status.Success
          },
          replace: true,
        });

        setTimeout(() => {
          setIsAuthenticated(false);
          setUser(null);
        }, 0);
      }
    }
    catch (err) {
      const errMessage = err instanceof Error ? err.message : "Couldn't log out";
      setError({ message: errMessage, state: Status.Error });
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
      error,
      setError,
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