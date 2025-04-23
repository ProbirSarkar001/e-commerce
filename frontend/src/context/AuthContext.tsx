import * as AuthAPI from "@/api/endpoints/auth";
import { useRouter } from "@tanstack/react-router";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type User = {
  name: string;
  email: string;
  // Add other user properties as needed
} | null;

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  login: (userData: User, token?: string) => void;
  logout: () => Promise<void>;
  loading: boolean;
  error: Error | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const login = useCallback((userData: User, token?: string) => {
    setUser(userData);
    if (token) {
      localStorage.setItem("token", token);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await AuthAPI.logout();
      toast.success("Logged out successfully");
      localStorage.removeItem("token");
      setUser(null);
      router.navigate({ to: "/login" });
    } catch (err) {
      console.error("Error logging out:", err);
      toast.error("Failed to log out");
      setError(err instanceof Error ? err : new Error("Logout failed"));
    } finally {
      setLoading(false);
    }
  }, [router]);

  const getUser = useCallback(async () => {
    try {
      setLoading(true);
      const userData = await AuthAPI.getUser();
      setUser(userData);
      setError(null);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setUser(null);
      setError(err instanceof Error ? err : new Error("Authentication failed"));
      // Consider clearing invalid token if exists
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Only fetch user if not already loaded and no current user
    if (user === null && loading) {
      getUser();
    }
  }, [getUser, loading, user]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      logout,
      loading,
      error,
    }),
    [user, login, logout, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
