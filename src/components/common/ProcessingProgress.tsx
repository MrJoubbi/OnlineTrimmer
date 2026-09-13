import React from 'react';
import { Loader2, XCircle, CheckCircle2 } from 'lucide-react';
import { ProcessingState } from '../../types';

interface ProcessingProgressProps {
  state: ProcessingState;
  onCancel?: () => void;
  title?: string;
}

export const ProcessingProgress: React.FC<ProcessingProgressProps> = ({
  state,
  onCancel,
  title = 'Processing In Browser...',
}) => {
  if (!state.isProcessing && !state.error && state.progress === 0) {
    return null;
  }

  const isComplete = state.progress >= 100;

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 p-6 shadow-sm my-4 animate-in fade-in duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2.5">
          {isComplete ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          ) : (
            <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
          )}
          <span className="text-sm font-semibold text-slate-800">
            {isComplete ? 'Processing Complete!' : title}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
            {Math.round(state.progress)}%
          </span>
          {!isComplete && onCancel && (
            <button
              id="cancel-processing-btn"
              onClick={onCancel}
              className="text-xs text-slate-400 hover:text-rose-600 transition-colors cursor-pointer flex items-center space-x-1"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Cancel</span>
            </button>
          )}
        </div>
      </div>

      {/* Progress track */}
      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ease-out ${
            isComplete
              ? 'bg-emerald-500'
              : 'bg-gradient-to-r from-emerald-500 to-teal-600'
          }`}
          style={{ width: `${Math.min(100, Math.max(2, state.progress))}%` }}
        />
      </div>

      {/* Status & Stage */}
      <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
        <span className="truncate pr-2 font-medium text-slate-600">
          {state.statusMessage || (isComplete ? 'Ready to download' : 'Processing media streams...')}
        </span>
        {state.stage && (
          <span className="text-[11px] text-slate-400 font-mono shrink-0">
            [{state.stage}]
          </span>
        )}
      </div>

      {/* Error alert if any */}
      {state.error && (
        <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs">
          {state.error}
        </div>
      )}
    </div>
  );
};
