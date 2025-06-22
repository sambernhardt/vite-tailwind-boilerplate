import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <h3>Home</h3>
    </div>
  );
}
