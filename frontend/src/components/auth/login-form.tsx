import { login } from "@/api/endpoints/auth";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
	email: z.string().email({
		message: "Invalid email address.",
	}),
	password: z.string().min(8, {
		message: "Password must be at least 8 characters.",
	}),
});
export type LoginFormValues = z.infer<typeof formSchema>;

const defaultValues: LoginFormValues = {
	email: "",
	password: "",
};

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const form = useForm<LoginFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	async function onSubmit(data: LoginFormValues) {
		try {
			const res = await login(data);
			toast.success(res.message || "Logged in successfully");
			form.reset();
			localStorage.setItem("token", res.token);
			// Navigate or reload logic here
		} catch (error: any) {
			toast.error(error?.message || "Login failed. Please try again.");
		}
	}

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your email and password to continue
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className="flex flex-col gap-6">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													type="email"
													placeholder="m@example.com"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input type="password" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button
									disabled={form.formState.isSubmitting}
									type="submit"
									className="w-full"
								>
									Login
								</Button>
								<Button variant="outline" className="w-full">
									Login with Google
								</Button>
							</div>
							<div className="mt-4 text-center text-sm">
								Don&apos;t have an account?{" "}
								<Link to="/register" className="underline underline-offset-4">
									Sign up
								</Link>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
