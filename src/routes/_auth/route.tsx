import { createFileRoute, Outlet, useNavigate, useRouterState } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/_auth')({
    component: RouteComponent,
})

function RouteComponent() {
    const token = localStorage.getItem("token");
    const path = useRouterState({
        select: (state) => state.location.pathname,
    });
    console.log("🚀 ~ RouteComponent ~ path:", path);
    const navigate = useNavigate();

    // Redirect logged-in users away from auth routes in an effect,
    // to avoid triggering navigation during render.
    useEffect(() => {
        if (token) {
            navigate({
                to: "/",
                replace: true,
                search: { page: 1, per_page: 5 },
            });
        }
    }, [token, navigate]);

    if (token) {
        // While redirecting, render nothing to avoid flash
        return null;
    }

    return (
        <div className="min-h-svh overflow-hidden flex items-center justify-center relative">
            {/* {path != "/login" && (
                <Button
                    variant="outline"
                    asChild
                    size={"icon"}
                    className="absolute top-4 left-4"
                >
                    <Link to="/login">
                        <CornerDownLeft />

                    </Link>
                </Button>
            )} */}
            <div className="w-full flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2">

                </div>
                <Outlet />
            </div>
        </div>

    )
}
