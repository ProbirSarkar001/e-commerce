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

export async function logout() {
	const response = await instance.post("/logout");
	return response.data;
}
