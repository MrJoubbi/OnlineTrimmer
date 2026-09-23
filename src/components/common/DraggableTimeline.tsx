import React, { useRef, useState, useEffect, useCallback } from 'react';
import { formatTime } from '../../lib/formatUtils';

interface DraggableTimelineProps {
  duration: number;
  startTime: number;
  endTime: number;
  currentTime: number;
  onStartTimeChange: (time: number) => void;
  onEndTimeChange: (time: number) => void;
  onRangeChange?: (start: number, end: number) => void;
  onSeek: (time: number) => void;
  heightClass?: string;
  className?: string;
}

type DragTarget = 'start' | 'end' | 'window' | 'playhead' | null;

export const DraggableTimeline: React.FC<DraggableTimelineProps> = ({
  duration,
  startTime,
  endTime,
  currentTime,
  onStartTimeChange,
  onEndTimeChange,
  onRangeChange,
  onSeek,
  heightClass = 'h-14',
  className = '',
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeDrag, setActiveDrag] = useState<DragTarget>(null);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [initialStart, setInitialStart] = useState<number>(0);
  const [initialEnd, setInitialEnd] = useState<number>(0);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPos, setHoverPos] = useState<number>(0);

  const safeDuration = duration > 0 ? duration : 1;
  const startPct = Math.max(0, Math.min(100, (startTime / safeDuration) * 100));
  const endPct = Math.max(0, Math.min(100, (endTime / safeDuration) * 100));
  const currentPct = Math.max(0, Math.min(100, (currentTime / safeDuration) * 100));
  const widthPct = Math.max(0, endPct - startPct);

  // Convert clientX to timeline seconds
  const getTimeFromClientX = useCallback(
    (clientX: number): number => {
      if (!trackRef.current || duration <= 0) return 0;
      const rect = trackRef.current.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      return Math.round(ratio * duration);
    },
    [duration]
  );

  // Pointer down handlers
  const handleStartHandlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveDrag('start');
    setDragStartX(e.clientX);
    setInitialStart(startTime);
    setInitialEnd(endTime);
  };

  const handleEndHandlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveDrag('end');
    setDragStartX(e.clientX);
    setInitialStart(startTime);
    setInitialEnd(endTime);
  };

  const handleWindowPointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveDrag('window');
    setDragStartX(e.clientX);
    setInitialStart(startTime);
    setInitialEnd(endTime);
  };

  const handleTrackPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    const clickedTime = getTimeFromClientX(e.clientX);
    onSeek(clickedTime);
    setActiveDrag('playhead');
  };

  // Window-level pointermove & pointerup to ensure smooth dragging even outside container
  useEffect(() => {
    if (!activeDrag) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!trackRef.current || duration <= 0) return;
      const rect = trackRef.current.getBoundingClientRect();
      const deltaX = e.clientX - dragStartX;
      const deltaTime = (deltaX / rect.width) * duration;

      if (activeDrag === 'start') {
        const newStart = Math.max(0, Math.min(initialEnd - 1, Math.round(initialStart + deltaTime)));
        onStartTimeChange(newStart);
        onSeek(newStart);
      } else if (activeDrag === 'end') {
        const newEnd = Math.max(initialStart + 1, Math.min(duration, Math.round(initialEnd + deltaTime)));
        onEndTimeChange(newEnd);
        onSeek(newEnd);
      } else if (activeDrag === 'window') {
        const windowDuration = initialEnd - initialStart;
        let newStart = Math.round(initialStart + deltaTime);
        let newEnd = newStart + windowDuration;

        if (newStart < 0) {
          newStart = 0;
          newEnd = windowDuration;
        } else if (newEnd > duration) {
          newEnd = duration;
          newStart = duration - windowDuration;
        }

        if (onRangeChange) {
          onRangeChange(newStart, newEnd);
        } else {
          onStartTimeChange(newStart);
          onEndTimeChange(newEnd);
        }
        onSeek(newStart);
      } else if (activeDrag === 'playhead') {
        const scrubTime = getTimeFromClientX(e.clientX);
        onSeek(scrubTime);
      }
    };

    const handlePointerUp = () => {
      setActiveDrag(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [
    activeDrag,
    dragStartX,
    initialStart,
    initialEnd,
    duration,
    getTimeFromClientX,
    onStartTimeChange,
    onEndTimeChange,
    onRangeChange,
    onSeek,
  ]);

  // Handle track hover for cursor indicator
  const handleTrackMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current || duration <= 0) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    setHoverPos(clickX);
    setHoverTime(Math.round(ratio * duration));
  };

  const handleTrackMouseLeave = () => {
    setHoverTime(null);
  };

  // Generate tick marks (e.g. 5 ticks)
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((pct) => ({
    pct: pct * 100,
    time: Math.round(pct * duration),
  }));

  return (
    <div className={`space-y-2 select-none ${className}`}>
      {/* Timeline Bar Container */}
      <div
        ref={trackRef}
        onPointerDown={handleTrackPointerDown}
        onMouseMove={handleTrackMouseMove}
        onMouseLeave={handleTrackMouseLeave}
        className={`relative ${heightClass} bg-slate-950 rounded-xl border border-slate-800 shadow-inner overflow-hidden cursor-crosshair group touch-none`}
      >
        {/* Background Filmstrip / Audio Track Grid */}
        <div className="absolute inset-0 flex justify-between px-3 items-center pointer-events-none opacity-40">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className={`w-0.5 bg-slate-700 ${i % 4 === 0 ? 'h-5 bg-slate-600' : 'h-2'}`}
            />
          ))}
        </div>

        {/* Dimmed Left Non-Selected Area */}
        <div
          className="absolute top-0 bottom-0 left-0 bg-slate-950/80 backdrop-blur-[1px] z-10 pointer-events-none transition-all duration-75"
          style={{ width: `${startPct}%` }}
        />

        {/* Active Draggable Trimmed Selection Window */}
        <div
          onPointerDown={handleWindowPointerDown}
          className={`absolute top-0 bottom-0 z-20 bg-emerald-500/20 border-y-2 border-emerald-400/90 cursor-grab active:cursor-grabbing transition-all duration-75 flex items-center justify-center ${
            activeDrag === 'window' ? 'bg-emerald-500/30 ring-1 ring-emerald-400' : 'hover:bg-emerald-500/25'
          }`}
          style={{
            left: `${startPct}%`,
            width: `${widthPct}%`,
          }}
          title="Click and drag to slide the selection window along the timeline"
        >
          {/* Subtle center grip icon */}
          <div className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity pointer-events-none px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40">
            <span className="w-1 h-3 bg-emerald-400 rounded-full" />
            <span className="w-1 h-3 bg-emerald-400 rounded-full" />
            <span className="w-1 h-3 bg-emerald-400 rounded-full" />
          </div>
        </div>

        {/* Dimmed Right Non-Selected Area */}
        <div
          className="absolute top-0 bottom-0 right-0 bg-slate-950/80 backdrop-blur-[1px] z-10 pointer-events-none transition-all duration-75"
          style={{ width: `${100 - endPct}%` }}
        />

        {/* Left Boundary Handle (Start / IN) */}
        <div
          onPointerDown={handleStartHandlePointerDown}
          className={`absolute top-0 bottom-0 z-30 flex items-center justify-center cursor-ew-resize touch-none ${
            activeDrag === 'start' ? 'scale-105' : ''
          }`}
          style={{
            left: `${startPct}%`,
            transform: 'translateX(-50%)',
          }}
          title="Drag to adjust Start (In) point"
        >
          {/* Touch-Friendly Grab Handle */}
          <div className="w-4 sm:w-5 h-full bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-300 rounded-l-md shadow-md flex flex-col items-center justify-center gap-1 border-r border-emerald-700 transition-colors">
            {/* Grip lines */}
            <span className="w-0.5 h-3 bg-white/80 rounded-full" />
            <span className="w-0.5 h-3 bg-white/80 rounded-full" />
          </div>

          {/* IN Badge */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-1 py-0.5 rounded bg-emerald-600 text-white font-mono text-[9px] font-bold shadow pointer-events-none uppercase">
            In
          </div>
        </div>

        {/* Right Boundary Handle (End / OUT) */}
        <div
          onPointerDown={handleEndHandlePointerDown}
          className={`absolute top-0 bottom-0 z-30 flex items-center justify-center cursor-ew-resize touch-none ${
            activeDrag === 'end' ? 'scale-105' : ''
          }`}
          style={{
            left: `${endPct}%`,
            transform: 'translateX(-50%)',
          }}
          title="Drag to adjust End (Out) point"
        >
          {/* Touch-Friendly Grab Handle */}
          <div className="w-4 sm:w-5 h-full bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-300 rounded-r-md shadow-md flex flex-col items-center justify-center gap-1 border-l border-emerald-700 transition-colors">
            {/* Grip lines */}
            <span className="w-0.5 h-3 bg-white/80 rounded-full" />
            <span className="w-0.5 h-3 bg-white/80 rounded-full" />
          </div>

          {/* OUT Badge */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-1 py-0.5 rounded bg-emerald-600 text-white font-mono text-[9px] font-bold shadow pointer-events-none uppercase">
            Out
          </div>
        </div>

        {/* Playhead Needle (Current Time) */}
        <div
          className="absolute top-0 bottom-0 z-40 pointer-events-none flex flex-col items-center"
          style={{
            left: `${currentPct}%`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="w-3 h-3 bg-rose-500 rotate-45 -mt-1.5 shadow-sm ring-2 ring-white/30" />
          <div className="w-0.5 h-full bg-rose-500 shadow-sm" />
        </div>

        {/* Floating Tooltip when Hovering or Dragging */}
        {(hoverTime !== null || activeDrag) && (
          <div
            className="absolute -bottom-6 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-emerald-400 font-mono text-[10px] font-semibold pointer-events-none z-50 shadow-md -translate-x-1/2"
            style={{
              left: activeDrag === 'start'
                ? `${startPct}%`
                : activeDrag === 'end'
                ? `${endPct}%`
                : activeDrag === 'playhead'
                ? `${currentPct}%`
                : `${hoverPos}px`,
            }}
          >
            {formatTime(
              activeDrag === 'start'
                ? startTime
                : activeDrag === 'end'
                ? endTime
                : activeDrag === 'playhead'
                ? currentTime
                : (hoverTime ?? 0)
            )}
          </div>
        )}
      </div>

      {/* Timeline Ruler / Seconds Scale (Strictly MM:SS) */}
      <div className="flex justify-between items-center px-1 text-[11px] font-mono text-slate-400">
        {ticks.map((tick, idx) => (
          <span key={idx} className={idx === 0 || idx === ticks.length - 1 ? 'font-medium text-slate-300' : ''}>
            {formatTime(tick.time)}
          </span>
        ))}
      </div>
    </div>
  );
};
