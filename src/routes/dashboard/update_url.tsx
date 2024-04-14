import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/update_url')({
  component: () => <div>Hello /dashboard/update_url!</div>
})