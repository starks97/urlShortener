import ReactDOM from "react-dom/client";
import "./global.css";

import { Suspense } from "react";

import {
  RouterProvider,
  createRouter,
  ErrorComponent,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider, useAuth } from "./context";
import { Spinner } from "./components/Spinner";
import "./axiosConfig";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
    <div className={`p-2 text-2xl`}>
      <Spinner />
    </div>
  ),
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: {
    queryClient,
    auth: null,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
function InnerApp() {
  const auth = useAuth();
  return (
    <Suspense fallback={<Spinner />}>
      <RouterProvider router={router} context={{ queryClient, auth }} />
    </Suspense>
  );
}
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <InnerApp />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
