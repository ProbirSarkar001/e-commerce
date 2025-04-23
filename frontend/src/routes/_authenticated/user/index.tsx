import { Button } from "@/components/ui/button";
import { useAuth } from "@/context";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/user/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { logout } = useAuth();
  return (
    <div>
      Hello "/user/"!
      {/* Link to the dashboard route */}
      <Link preload={false} to="/dashboard">
        Dashboard
      </Link>
      {/* Logout */}
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}
