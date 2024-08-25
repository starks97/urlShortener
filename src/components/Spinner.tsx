import { useRouterState } from "@tanstack/react-router";

export function Spinner({
  show = true,
  wait = "delay-300",
}: {
  show?: boolean;
  wait?: `delay-${number}`;
}) {
  return (
    <div
      className={`inline-block animate-spin px-3 transition-opacity duration-500 ${
        show ? wait : "opacity-0 delay-0"
      }`}
    >
      ⍥
    </div>
  );
}

export function RouterSpinner() {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  return <Spinner show={isLoading} />;
}
