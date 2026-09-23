import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate, className = '' }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center space-x-1.5 text-xs text-slate-500 font-medium overflow-x-auto whitespace-nowrap py-1 mb-4 ${className}`}
    >
      <button
        onClick={() => onNavigate('/')}
        className="flex items-center text-slate-500 hover:text-emerald-600 transition-colors cursor-pointer"
        aria-label="Home"
      >
        <Home className="w-3.5 h-3.5" />
      </button>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
            {isLast || !item.path ? (
              <span className="text-slate-800 font-semibold truncate max-w-[220px] sm:max-w-xs" aria-current="page">
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => onNavigate(item.path!)}
                className="hover:text-emerald-600 transition-colors cursor-pointer truncate max-w-[180px]"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
