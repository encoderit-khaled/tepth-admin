import { useMutation } from "@tanstack/react-query";
import { api } from "@/axios";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { omitEmpty } from "@/lib/omit-empties";
import type { TOfficerRegistrationSchema } from "../-type";

export const useOfficerRegistration = () => {

    return useMutation({
        mutationKey: ["officer-registration"],
        mutationFn: (body: TOfficerRegistrationSchema) => {
            const data = omitEmpty({
                ...body,
            });
            return api.post("/register", data);
        },
        onSuccess: () => {
            toast.success("Registration successful! Please check your email to verify your account.");
        },
        onError: (error) => {
            const fallback = "Failed to register.";
            if (isAxiosError(error)) {
                const serverErrors = error.response?.data?.errors;
                const message = serverErrors
                    ? Object.values(serverErrors).flat().join(", ")
                    : error.response?.data?.message || error.message || fallback;
                toast.error(message);
            } else {
                toast.error("Something went wrong.");
            }
        },
    });
};
