import { Button } from "@/components/ui/button";
import { useAuth } from "@/context";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/user/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { logoutMutation } = useAuth();
  const { mutate: logout, isPending } = logoutMutation;
  return (
    <div>
      Hello "/user/"!
      {/* Link to the dashboard route */}
      <Link preload={false} to="/dashboard">
        Dashboard
      </Link>
      {/* Logout */}
      <Button onClick={() => logout()} disabled={isPending}>
        {isPending ? "Logging out..." : "Logout"}
      </Button>
    </div>
  );
}
