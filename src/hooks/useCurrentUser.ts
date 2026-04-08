import { api } from "@/axios";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export type Permissions = Record<string, boolean>;

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  user_role: "admin" | "supervisor" | "officer" | "client";
  permissions: Permissions;
}

const setAuthHeader = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const useCurrentUser = () => {
  return useQuery<User | null>({
    queryKey: ["currentUser"],
    retry: false,
    refetchOnWindowFocus: false,

    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) return null;

      setAuthHeader(token);

      try {
        const res = await api.get("/profile");
        const user = res.data.data;

        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          localStorage.removeItem("user");
        }
        return user ?? null;
      } catch (error) {
        if ((error as AxiosError).response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          return null;
        }
        throw error;
      }
    },

    initialData: () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (!token || !user || user === "undefined") return null;

      setAuthHeader(token);
      try {
        return JSON.parse(user);
      } catch (e) {
        console.error("Error parsing user from localStorage", e);
        localStorage.removeItem("user");
        return null;
      }
    },
  });
};
