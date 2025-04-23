// src/context/AuthContext.tsx
import type React from "react";
import { createContext, useContext, useState } from "react";

type User = { id: string; name: string } | null;

type AuthContextType = {
	user: User;
	login: (userData: User) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
	children: React.ReactNode;
};
export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User>(null);

	const login = (userData: User) => setUser(userData);
	const logout = () => setUser(null);

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within AuthProvider");
	return context;
};
