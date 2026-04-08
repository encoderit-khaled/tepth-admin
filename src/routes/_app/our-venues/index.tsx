import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/our-venues/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/our-venues/"!</div>
}
