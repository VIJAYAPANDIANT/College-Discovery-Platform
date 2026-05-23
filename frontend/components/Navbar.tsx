"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useSavedStore } from "@/store/savedStore";
import { useCompareStore } from "@/store/compareStore";
import { useToastStore } from "@/store/toastStore";
import { BookOpen, Bookmark, GitCompare, LogIn, LogOut, Menu, X, User } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { user, isAuthenticated, logout } = useAuthStore();
  const { savedIds } = useSavedStore();
  const { compareIds } = useCompareStore();
  const { addToast } = useToastStore();

  const handleLogout = () => {
    logout();
    addToast("Logged out successfully", "success");
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Browse Colleges", href: "/colleges", icon: BookOpen },
    {
      name: "Compare",
      href: "/compare",
      icon: GitCompare,
      badge: compareIds.length,
    },
    {
      name: "Saved",
      href: "/saved",
      icon: Bookmark,
      badge: savedIds.length,
    },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo & Navigation */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20 group-hover:scale-105 transition duration-300">
                U
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-350 bg-clip-text text-transparent group-hover:from-indigo-400 group-hover:to-violet-400 transition duration-300">
                UniScope
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? "bg-indigo-950/40 text-indigo-400"
                        : "text-slate-300 hover:bg-slate-900/50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.name}</span>
                    {link.badge !== undefined && link.badge > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white animate-pulse">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Auth Buttons */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="h-8 w-8 rounded-full bg-indigo-900/50 flex items-center justify-center text-indigo-400">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="font-medium">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-slate-305 hover:text-red-400 hover:bg-red-950/20 border border-border hover:border-red-950 rounded-lg transition"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-900 rounded-lg transition"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-semibold text-white bg-indigo-650 hover:bg-indigo-700 rounded-lg shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:bg-slate-900 transition"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-slate-950 px-4 pt-2 pb-4 space-y-1 transition duration-200">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium transition ${
                  isActive
                    ? "bg-indigo-950/40 text-indigo-400"
                    : "text-slate-300 hover:bg-slate-900/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  <span>{link.name}</span>
                </div>
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
          
          <div className="pt-4 border-t border-border">
            {isAuthenticated && user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-3">
                  <div className="h-9 w-9 rounded-full bg-indigo-900/50 flex items-center justify-center text-indigo-400 font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-200">{user.name}</div>
                    <div className="text-xs text-slate-500">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-950/20 text-left font-medium transition"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 p-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 border border-border rounded-lg text-slate-300 font-medium hover:bg-slate-900 transition"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center py-2.5 bg-indigo-600 rounded-lg text-white font-medium hover:bg-indigo-700 shadow-sm transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
