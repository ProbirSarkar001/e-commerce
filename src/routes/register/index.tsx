import { RegisterForm } from "@/components/auth/register-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-md w-full mx-auto my-12">
      <RegisterForm />
    </div>
  );
}
