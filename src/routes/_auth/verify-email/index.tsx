import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useVerifyEmail, useResendVerification } from "./-api/use-email-verification";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Loading from "@/components/base/loading";

type VerifyEmailSearchParams = {
    token?: string;
};

export const Route = createFileRoute("/_auth/verify-email/")({
    validateSearch: (search: Record<string, unknown>): VerifyEmailSearchParams => {
        return {
            token: (search.token as string) || undefined,
        };
    },
    component: VerifyEmailComponent,
});

function VerifyEmailComponent() {
    const { token } = Route.useSearch();
    const navigate = useNavigate();
    const { mutate: verifyEmail } = useVerifyEmail();
    const { mutate: resendVerification, isPending: resending } = useResendVerification();
    const [status, setStatus] = useState<"verifying" | "success" | "error" | "no-token">("verifying");

    useEffect(() => {
        if (token) {
            verifyEmail(token, {
                onSuccess: () => {
                    setStatus("success");
                    toast.success("Email verified successfully!");
                },
                onError: () => {
                    setStatus("error");
                    toast.error("Verification failed. The link may be expired.");
                },
            });
        } else {
            setStatus("no-token");
        }
    }, [token, verifyEmail, navigate]);

    const handleResend = () => {
        resendVerification(undefined, {
            onSuccess: () => {
                toast.success("Verification link sent!");
            },
            onError: () => {
                toast.error("Failed to resend verification link.");
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Card className="w-full max-w-lg mx-auto px-10 py-12 border-1 border-custom-footer-text-red">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Email Verification</h1>

                    {status === "verifying" && (
                        <div className="flex flex-col items-center gap-4 py-8">
                            <Loading />
                            <p className="text-muted-foreground">Verifying your email address...</p>
                        </div>
                    )}

                    {status === "success" && (
                        <div className="space-y-6 py-8">
                            <div className="text-green-600 text-5xl mb-4">✓</div>
                            <p className="text-green-600 font-medium text-xl">Verification Successful!</p>
                            <p className="text-muted-foreground">Your email has been verified. You can now login to your account.</p>
                        </div>
                    )}

                    {status === "error" && (
                        <div className="space-y-6 py-8">
                            <div className="text-red-600 text-5xl mb-4">!</div>
                            <p className="text-red-600 font-medium text-xl">Verification Failed</p>
                            <p className="text-muted-foreground">The verification link is invalid or has expired.</p>
                            <Button
                                onClick={handleResend}
                                loading={resending}
                                variant="active"
                                className="w-full"
                            >
                                Resend Verification Link
                            </Button>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}
