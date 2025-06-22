import { createRootRoute, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      {/* <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/reserve" className="[&.active]:font-bold">
          Reserve
        </Link>
      </div>
      <hr /> */}
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
