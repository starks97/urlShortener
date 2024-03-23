import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div>
      <h1 className="text-2xl text-red-900">Home</h1>
    </div>
  );
}
