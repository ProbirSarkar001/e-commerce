import type { LoginFormValues } from "@/components/auth/login-form";
import type { FormValues as RegisterFormValues } from "@/components/auth/register-form";
import instance from "../axios";

type RegisterResponse = {
	message: string;
	token: string;
};
export async function register(data: RegisterFormValues) {
	const response = await instance.post<RegisterResponse>("/register", data);
	return response.data;
}

type LoginResponse = {
	message: string;
	token: string;
};
export async function login(data: LoginFormValues) {
	const response = await instance.post<LoginResponse>("/login", data);
	return response.data;
}

type LogoutResponse = {
	message: string;
};
export async function logout() {
	const response = await instance.get<LogoutResponse>("/logout");
	return response.data;
}

// User
type User = {
	name: string;
	email: string;
};
export async function getUser() {
	const response = await instance.get<User>("/user");
	return response.data;
}
