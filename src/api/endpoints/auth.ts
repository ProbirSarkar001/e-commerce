import instance from "../axios";
import type { FormValues as RegisterFormValues } from "@/components/auth/register-form";

type RegisterResponse = {
  message: string;
  token: string;
};
export async function register(data: RegisterFormValues) {
  const response = await instance.post<RegisterResponse>("/register", data);
  return response.data;
}
