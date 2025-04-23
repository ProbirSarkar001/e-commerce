import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
      <TanStackRouterDevtools />
      <Toaster richColors theme="light" />
    </>
  ),
});
