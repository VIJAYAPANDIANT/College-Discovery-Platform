import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = "Something went wrong",
  message = "An error occurred while loading data. Please check your network connection and try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-red-200 dark:border-red-950/30 rounded-2xl bg-red-50/10 dark:bg-red-950/5 shadow-sm max-w-md mx-auto my-12 animate-fade-in">
      {/* Icon Area */}
      <div className="h-16 w-16 rounded-2xl bg-red-100 dark:bg-red-950/20 flex items-center justify-center text-red-500 mb-6">
        <AlertTriangle className="h-8 w-8" />
      </div>

      {/* Text Area */}
      <h3 className="text-lg font-bold text-slate-800 dark:text-red-200 mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
        {message}
      </p>

      {/* Action Button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2.5 bg-red-650 hover:bg-red-750 text-white rounded-xl text-xs font-bold shadow-md shadow-red-500/10 transition"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
