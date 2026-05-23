import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email, name) => {
        const fallbackName = name || email.split("@")[0];
        const formattedName = fallbackName.charAt(0).toUpperCase() + fallbackName.slice(1);
        set({
          user: {
            id: "usr_" + Math.random().toString(36).substr(2, 9),
            name: formattedName,
            email,
          },
          isAuthenticated: true,
        });
      },
      signup: (name, email) => {
        set({
          user: {
            id: "usr_" + Math.random().toString(36).substr(2, 9),
            name,
            email,
          },
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "college-discovery-auth",
    }
  )
);
