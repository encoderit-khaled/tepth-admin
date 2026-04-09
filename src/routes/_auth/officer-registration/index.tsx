import { createFileRoute } from '@tanstack/react-router'
import FormRegistration from './-components/form-registration'

export const Route = createFileRoute('/_auth/officer-registration/')({
    component: RegistrationPage,
})

function RegistrationPage() {
    return (
        <div className="flex items-center justify-center min-vh-100 p-4">
            <div className="w-full max-w-7xl">
                <FormRegistration />
            </div>
        </div>
    )
}
