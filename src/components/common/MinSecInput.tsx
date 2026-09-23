import React from 'react';
import { ChevronUp, ChevronDown, Clock } from 'lucide-react';
import { formatTime, secondsToMinSec, minSecToSeconds } from '../../lib/formatUtils';

interface MinSecInputProps {
  label: string;
  time: number;
  minTime: number;
  maxTime: number;
  onChange: (newSeconds: number) => void;
  onUsePlayhead?: () => void;
  idPrefix: string;
}

export const MinSecInput: React.FC<MinSecInputProps> = ({
  label,
  time,
  minTime,
  maxTime,
  onChange,
  onUsePlayhead,
  idPrefix,
}) => {
  const { minutes, seconds } = secondsToMinSec(time);

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const m = Math.max(0, parseInt(e.target.value, 10) || 0);
    const newTotal = minSecToSeconds(m, seconds);
    const clamped = Math.max(minTime, Math.min(maxTime, newTotal));
    onChange(clamped);
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let s = parseInt(e.target.value, 10);
    if (isNaN(s)) s = 0;
    s = Math.max(0, Math.min(59, s));
    const newTotal = minSecToSeconds(minutes, s);
    const clamped = Math.max(minTime, Math.min(maxTime, newTotal));
    onChange(clamped);
  };

  const adjustBySeconds = (delta: number) => {
    const newTotal = Math.max(minTime, Math.min(maxTime, Math.round(time) + delta));
    onChange(newTotal);
  };

  return (
    <div className="bg-slate-900 text-white p-3.5 rounded-xl border border-slate-800 shadow-sm flex flex-col justify-between space-y-2.5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-200 tracking-wide flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          {label}
        </span>
        {onUsePlayhead && (
          <button
            type="button"
            id={`${idPrefix}-use-playhead-btn`}
            onClick={onUsePlayhead}
            className="text-[11px] font-medium text-emerald-400 hover:text-emerald-300 hover:underline transition-colors cursor-pointer"
          >
            Use Playhead
          </button>
        )}
      </div>

      {/* Minutes & Seconds Dual Input */}
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-slate-950 border border-slate-700/80 rounded-lg p-1.5 flex items-center justify-center gap-1.5 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500">
          {/* Minutes Field */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-slate-400 uppercase font-mono font-medium">Min</span>
            <input
              id={`${idPrefix}-min-input`}
              type="number"
              min={0}
              max={99}
              value={minutes.toString().padStart(2, '0')}
              onChange={handleMinutesChange}
              className="w-11 text-center bg-transparent text-white font-mono text-base font-bold outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          <span className="text-slate-500 font-mono text-lg font-bold pb-1">:</span>

          {/* Seconds Field */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-slate-400 uppercase font-mono font-medium">Sec</span>
            <input
              id={`${idPrefix}-sec-input`}
              type="number"
              min={0}
              max={59}
              value={seconds.toString().padStart(2, '0')}
              onChange={handleSecondsChange}
              className="w-11 text-center bg-transparent text-white font-mono text-base font-bold outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>

        {/* Quick Stepper Column */}
        <div className="flex flex-col gap-1">
          <button
            type="button"
            id={`${idPrefix}-plus-1s-btn`}
            onClick={() => adjustBySeconds(1)}
            className="w-7 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-[10px] transition-colors cursor-pointer"
            title="+1 second"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            id={`${idPrefix}-minus-1s-btn`}
            onClick={() => adjustBySeconds(-1)}
            className="w-7 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-[10px] transition-colors cursor-pointer"
            title="-1 second"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Fine-Tuning Pill Badges */}
      <div className="flex items-center justify-between pt-0.5 text-[10px] font-mono text-slate-400 border-t border-slate-800/80">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => adjustBySeconds(-5)}
            className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            -5s
          </button>
          <button
            type="button"
            onClick={() => adjustBySeconds(5)}
            className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            +5s
          </button>
        </div>
        <span className="text-emerald-400 font-semibold font-mono text-[11px]">
          {formatTime(time)}
        </span>
      </div>
    </div>
  );
};
