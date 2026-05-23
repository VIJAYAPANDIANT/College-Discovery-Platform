import React from "react";
import { SearchCode, HelpCircle } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title = "No results found",
  description = "Try adjusting your search terms or filters to find what you are looking for.",
  actionText,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm max-w-md mx-auto my-12 animate-fade-in">
      {/* Icon Area */}
      <div className="h-16 w-16 rounded-2xl bg-slate-100 dark:bg-slate-850 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-6">
        {icon || <SearchCode className="h-8 w-8 text-indigo-500" />}
      </div>

      {/* Text Area */}
      <h3 className="text-lg font-bold text-slate-850 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
        {description}
      </p>

      {/* Action Button */}
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/10 transition"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
