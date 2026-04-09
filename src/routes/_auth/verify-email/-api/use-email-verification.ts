import { useMutation } from "@tanstack/react-query";
import { api } from "@/axios";

export const useVerifyEmail = () => {
    return useMutation({
        mutationKey: ["verify-email"],
        mutationFn: (token: string) => {
            return api.post("/email/verify", { token });
        },
    });
};

export const useResendVerification = () => {
    return useMutation({
        mutationKey: ["resend-verification"],
        mutationFn: () => {
            return api.get("/email/resend-verification-link");
        },
    });
};
