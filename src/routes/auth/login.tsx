import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "../../components/auth";

export const Route = createFileRoute("/auth/login")({
  component: Login,
});

function Login() {
  return (
    <>
      <LoginForm />
    </>
  );
}
