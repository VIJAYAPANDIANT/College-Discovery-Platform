"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { useToastStore } from "@/store/toastStore";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5 * 60 * 1000, // 5 minutes
          },
        },
      })
  );

  const { toasts, removeToast } = useToastStore();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-lg shadow-lg border backdrop-blur-md transition-all duration-300 animate-slide-in-right ${
              toast.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                : toast.type === "error"
                ? "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400"
                : "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400"
            }`}
          >
            <div className="flex items-center gap-3">
              {toast.type === "success" && <CheckCircle className="h-5 w-5 flex-shrink-0" />}
              {toast.type === "error" && <AlertCircle className="h-5 w-5 flex-shrink-0" />}
              {toast.type === "info" && <Info className="h-5 w-5 flex-shrink-0" />}
              <span className="text-sm font-medium">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 hover:opacity-70 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </QueryClientProvider>
  );
}
