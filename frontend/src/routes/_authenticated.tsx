import { useAuth } from "@/context";
import { Navigate, Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) {
    return (
      <Navigate
        to="/login"
        search={{
          redirect: window.location.pathname,
        }}
        replace
      />
    );
  }

  return <Outlet />;
}
