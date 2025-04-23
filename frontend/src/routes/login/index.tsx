import { LoginForm } from "@/components/auth/login-form";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const loginSearchSchema = z.object({
  redirect: z.string().optional(),
});
export const Route = createFileRoute("/login/")({
  component: RouteComponent,
  validateSearch: (search) => loginSearchSchema.parse(search),
});

function RouteComponent() {
  return (
    <div className="max-w-md w-full mx-auto my-12">
      <LoginForm />
    </div>
  );
}
