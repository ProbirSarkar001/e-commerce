import type { LoginFormValues } from "@/components/auth/login-form";
import type { RegisterFormValues } from "@/components/auth/register-form";
import instance from "../axios";

export async function register(data: RegisterFormValues) {
	const response = await instance.post<RegisterResponse>("/register", data);
	return response.data;
}

export async function login(data: LoginFormValues) {
	const response = await instance.post<LoginResponse>("/login", data);
	return response.data;
}

export async function logout() {
	const response = await instance.get<LogoutResponse>("/logout");
	return response.data;
}

export async function getUser() {
	const response = await instance.get<User>("/user");
	return response.data;
}
