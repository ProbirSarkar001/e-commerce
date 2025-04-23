import * as AuthAPI from "@/api/endpoints/auth";
import type { LoginFormValues } from "@/components/auth/login-form";
import type { RegisterFormValues } from "@/components/auth/register-form";
import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
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
  login: (data: LoginFormValues) => void;
  register: (data: RegisterFormValues) => void;
  loading: boolean;
  error: Error | null;
  logoutMutation: UseMutationResult<LogoutResponse, Error, void, unknown>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const search = useSearch({ strict: false });
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  const login = useCallback(
    async (data: LoginFormValues) => {
      try {
        const res = await AuthAPI.login(data);
        toast.success(res.message || "Logged in successfully");
        localStorage.setItem("token", res.token);
        setUser(res.user);
        navigate({ to: search?.redirect || "/user" });
      } catch (error: any) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Login failed. Please try again.");
      }
    },
    [search, navigate]
  );
  const register = useCallback(
    async (data: RegisterFormValues) => {
      try {
        const res = await AuthAPI.register(data);
        toast.success(res.message || "Registered successfully");
        localStorage.setItem("token", res.token);
        setUser(res.user);
        navigate({ to: search?.redirect || "/user" });
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Registration failed. Please try again.");
      }
    },
    [search, navigate]
  );

  const logoutMutation = useMutation({
    mutationFn: AuthAPI.logout,
    onSuccess: (data) => {
      localStorage.removeItem("token");
      setUser(null);
      toast.success(data?.message || "Logged out successfully");
      navigate({ to: "/login" });
    },
    onError: (err) => {
      toast.error("Failed to log out");
      setError(err instanceof Error ? err : new Error("Logout failed"));
    },
  });

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
      logoutMutation,
      loading,
      error,
      register,
    }),
    [user, login, logoutMutation, register, loading, error]
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
