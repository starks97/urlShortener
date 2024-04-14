import { useRouterState } from "@tanstack/react-router";

export function Spinner({
  show = true,
  wait,
}: {
  show?: boolean;
  wait?: `delay-${number}`;
}) {
  return (
    <div
      className={`inline-block animate-spin px-3 transition-opacity duration-500 ${show ? (wait ? `delay-${wait}` : "delay-300") : "opacity-0 delay-0"}`}
    >
      ⍥
    </div>
  );
}

export function RouterSpinner() {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  return <Spinner show={isLoading} />;
}
