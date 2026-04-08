import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/exam-preparation-courses/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/exam-preparation-courses/"!</div>
}
