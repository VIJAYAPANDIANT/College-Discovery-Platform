"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthStore } from "@/store/authStore";
import { useToastStore } from "@/store/toastStore";
import { LogIn, Mail, Lock, ShieldAlert } from "lucide-react";

// Define Validation Schema with Zod
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const { addToast } = useToastStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    login(data.email);
    addToast(`Welcome back, ${data.email.split("@")[0]}!`, "success");
    router.push("/");
  };

  return (
    <div className="flex-grow flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950/20">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
        {/* Title / Header */}
        <div className="text-center">
          <div className="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4">
            <LogIn className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-850 dark:text-white">
            Log in to UniScope
          </h2>
          <p className="text-xs text-slate-450 dark:text-slate-500 mt-1.5">
            Access saved campuses, reviews, and compare selections
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-450 dark:text-slate-550 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 text-slate-400 h-4.5 w-4.5 pointer-events-none" />
                <input
                  type="email"
                  {...register("email")}
                  placeholder="name@example.com"
                  className={`w-full pl-10 pr-4 py-3 bg-slate-50 focus:bg-white dark:bg-slate-950 focus:dark:bg-transparent border ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-slate-205 dark:border-slate-850 focus:border-indigo-500 dark:focus:border-indigo-550"
                  } rounded-xl focus:outline-none text-sm text-slate-850 dark:text-white font-medium placeholder-slate-400 transition`}
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-1 text-xs font-semibold text-red-500 mt-1">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <span>{errors.email.message}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-450 dark:text-slate-550 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs font-semibold text-indigo-650 hover:underline dark:text-indigo-400"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 text-slate-400 h-4.5 w-4.5 pointer-events-none" />
                <input
                  type="password"
                  {...register("password")}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-3 bg-slate-50 focus:bg-white dark:bg-slate-950 focus:dark:bg-transparent border ${
                    errors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-slate-205 dark:border-slate-850 focus:border-indigo-500 dark:focus:border-indigo-550"
                  } rounded-xl focus:outline-none text-sm text-slate-850 dark:text-white font-medium placeholder-slate-400 transition`}
                />
              </div>
              {errors.password && (
                <div className="flex items-center gap-1 text-xs font-semibold text-red-500 mt-1">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <span>{errors.password.message}</span>
                </div>
              )}
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none text-white font-bold rounded-xl shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 text-sm transition"
          >
            {isSubmitting ? "Authenticating..." : "Sign In"}
          </button>

          {/* Signup Link */}
          <div className="text-center text-xs font-bold text-slate-400 mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
