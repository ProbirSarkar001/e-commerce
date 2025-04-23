import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/_authenticated/dashboard/"!
      {/* Link to the user route */}
      <Link preload={false} to="/user">
        User
      </Link>
    </div>
  );
}
