import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Download, Scissors, Music, RefreshCw, Volume2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ToolConfig, ProcessingState } from '../../types';
import { FileDropzone } from '../common/FileDropzone';
import { ProcessingProgress } from '../common/ProcessingProgress';
import { formatTime, formatFileSize, downloadBlob } from '../../lib/formatUtils';
import { extractWaveformData, trimAudioBuffer, audioBufferToWavBlob, WaveformData } from '../../lib/audioTrimmer';
import { useLanguage } from '../../i18n/LanguageContext';
import { DraggableTimeline } from '../common/DraggableTimeline';
import { MinSecInput } from '../common/MinSecInput';
import { trackTrimAction, trackDownloadAction } from '../../lib/tracking';

interface AudioTrimmerProps {
  toolConfig: ToolConfig;
}

export const AudioTrimmer: React.FC<AudioTrimmerProps> = ({ toolConfig }) => {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [waveformData, setWaveformData] = useState<WaveformData | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  const [fadeOut, setFadeOut] = useState<boolean>(false);
  const [processingState, setProcessingState] = useState<ProcessingState>({
    isProcessing: false,
    progress: 0,
    statusMessage: '',
  });
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const playbackStartTimeRef = useRef<number>(0);
  const playbackOffsetRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  const handleFileSelected = async (selectedFile: File) => {
    setFile(selectedFile);
    setResultBlob(null);
    setProcessingState({
      isProcessing: true,
      progress: 20,
      statusMessage: 'Decoding audio and building visual waveform...',
    });

    try {
      const { buffer, waveform } = await extractWaveformData(selectedFile);
      setAudioBuffer(buffer);
      setWaveformData(waveform);
      setDuration(waveform.duration);
      setStartTime(0);
      setEndTime(waveform.duration);
      setCurrentTime(0);

      setProcessingState({
        isProcessing: false,
        progress: 100,
        statusMessage: 'Waveform generated successfully',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to decode audio';
      setProcessingState({
        isProcessing: false,
        progress: 0,
        statusMessage: '',
        error: msg,
      });
    }
  };

  // Stop active web audio playback
  const stopPlayback = useCallback(() => {
    if (activeSourceRef.current) {
      try {
        activeSourceRef.current.stop();
        activeSourceRef.current.disconnect();
      } catch {
        // Source might have already ended
      }
      activeSourceRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopPlayback();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, [stopPlayback]);

  // Start web audio playback from a given time up to endTime
  const playFrom = (startOffset: number) => {
    if (!audioBuffer) return;
    stopPlayback();

    const audioCtx = audioCtxRef.current || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    audioCtxRef.current = audioCtx;

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioCtx.destination);

    const safeStart = Math.max(startTime, Math.min(endTime - 0.05, startOffset));
    const playDuration = Math.max(0.1, endTime - safeStart);

    playbackStartTimeRef.current = audioCtx.currentTime;
    playbackOffsetRef.current = safeStart;
    activeSourceRef.current = source;
    setIsPlaying(true);

    source.start(0, safeStart, playDuration);

    source.onended = () => {
      stopPlayback();
      setCurrentTime(startTime);
    };

    // Tracking loop
    const trackPlayhead = () => {
      if (!audioCtxRef.current) return;
      const elapsed = audioCtxRef.current.currentTime - playbackStartTimeRef.current;
      const current = playbackOffsetRef.current + elapsed;
      if (current >= endTime) {
        stopPlayback();
        setCurrentTime(startTime);
      } else {
        setCurrentTime(current);
        animationFrameRef.current = requestAnimationFrame(trackPlayhead);
      }
    };
    animationFrameRef.current = requestAnimationFrame(trackPlayhead);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      const startAt = currentTime >= endTime || currentTime < startTime ? startTime : currentTime;
      playFrom(startAt);
    }
  };

  const seekTo = (time: number) => {
    const clamped = Math.max(0, Math.min(duration, time));
    setCurrentTime(clamped);
    if (isPlaying) {
      playFrom(clamped);
    }
  };

  const applyPreset = (presetDuration: number, autoFade: boolean = false) => {
    if (presetDuration === 0) {
      setStartTime(0);
      setEndTime(duration);
      seekTo(0);
      return;
    }
    const safeStart = Math.min(currentTime, Math.max(0, duration - presetDuration));
    const safeEnd = Math.min(duration, safeStart + presetDuration);
    setStartTime(safeStart);
    setEndTime(safeEnd);
    seekTo(safeStart);
    if (autoFade) {
      setFadeIn(true);
      setFadeOut(true);
    }
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    if (!file || !audioBuffer) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (e.target as HTMLElement)?.tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === '[' || e.key.toLowerCase() === 'i') {
        e.preventDefault();
        setStartTime(Math.min(currentTime, endTime - 0.1));
      } else if (e.key === ']' || e.key.toLowerCase() === 'o') {
        e.preventDefault();
        setEndTime(Math.max(currentTime, startTime + 0.1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        seekTo(Math.max(0, currentTime - 0.5));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        seekTo(Math.min(duration, currentTime + 0.5));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [file, audioBuffer, currentTime, duration, isPlaying, startTime, endTime]);

  // Draw Waveform on Canvas
  useEffect(() => {
    if (!canvasRef.current || !waveformData) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const midY = height / 2;
    const peaks = waveformData.peaks;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Draw background grid lines
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, midY);
    ctx.lineTo(width, midY);
    ctx.stroke();

    // In/Out Boundaries
    const inX = (startTime / (duration || 1)) * width;
    const outX = (endTime / (duration || 1)) * width;

    // Dim regions outside trim
    ctx.fillStyle = 'rgba(241, 245, 249, 0.7)';
    ctx.fillRect(0, 0, inX, height);
    ctx.fillRect(outX, 0, width - outX, height);

    // Waveform bars
    const barWidth = Math.max(1.5, width / peaks.length);
    const gap = 1;

    for (let i = 0; i < peaks.length; i++) {
      const x = (i / peaks.length) * width;
      const peak = peaks[i];
      const barHeight = Math.max(2, peak * (height * 0.8));
      const isInside = x >= inX && x <= outX;

      if (isInside) {
        ctx.fillStyle = '#059669'; // Emerald-600 active
      } else {
        ctx.fillStyle = '#cbd5e1'; // Muted slate
      }

      ctx.beginPath();
      ctx.roundRect(x, midY - barHeight / 2, barWidth - gap, barHeight, 2);
      ctx.fill();
    }

    // Selected region top/bottom boundary lines
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(inX, 0);
    ctx.lineTo(outX, 0);
    ctx.moveTo(inX, height);
    ctx.lineTo(outX, height);
    ctx.stroke();

    // Start handle
    ctx.fillStyle = '#047857';
    ctx.fillRect(inX - 2, 0, 4, height);

    // End handle
    ctx.fillStyle = '#047857';
    ctx.fillRect(outX - 2, 0, 4, height);

    // Current playhead cursor
    const cursorX = (currentTime / (duration || 1)) * width;
    ctx.fillStyle = '#f43f5e'; // Rose-500
    ctx.fillRect(cursorX - 1.5, 0, 3, height);
  }, [waveformData, startTime, endTime, currentTime, duration]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || duration === 0) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    seekTo(ratio * duration);
  };

  const handleTrimAudio = async () => {
    if (!audioBuffer || !file) return;
    stopPlayback();

    setProcessingState({
      isProcessing: true,
      progress: 30,
      statusMessage: 'Extracting high-resolution PCM audio buffer...',
    });

    try {
      // 1. Slice audio buffer
      const trimmed = trimAudioBuffer(audioBuffer, startTime, endTime, fadeIn, fadeOut);

      setProcessingState({
        isProcessing: true,
        progress: 75,
        statusMessage: 'Compiling lossless 16-bit PCM WAV container...',
      });

      // 2. Convert to standard WAV blob
      const wavBlob = audioBufferToWavBlob(trimmed);
      setResultBlob(wavBlob);

      setProcessingState({
        isProcessing: false,
        progress: 100,
        statusMessage: 'Trimmed audio ready!',
      });
      trackTrimAction(toolConfig.id, 'wav', endTime - startTime);

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {
        // Safe fallback
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Audio trim failed';
      setProcessingState({
        isProcessing: false,
        progress: 0,
        statusMessage: '',
        error: msg,
      });
    }
  };

  const handleDownload = () => {
    if (!resultBlob || !file) return;
    const originalBase = file.name.substring(0, file.name.lastIndexOf('.')) || 'audio';
    const filename = `${originalBase}-trimmed.wav`;
    trackDownloadAction(toolConfig.id, 'wav', resultBlob.size);
    downloadBlob(resultBlob, filename);
  };

  const resetAll = () => {
    stopPlayback();
    setFile(null);
    setAudioBuffer(null);
    setWaveformData(null);
    setResultBlob(null);
    setProcessingState({ isProcessing: false, progress: 0, statusMessage: '' });
  };

  return (
    <div className="w-full">
      {!file ? (
        <FileDropzone
          toolConfig={toolConfig}
          onFileSelected={handleFileSelected}
          sampleFileType="audio"
        />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Top Info Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-800 truncate max-w-xs sm:max-w-md">
                  {file.name}
                </h2>
                <div className="flex items-center space-x-3 text-xs text-slate-500">
                  <span>Size: {formatFileSize(file.size)}</span>
                  <span>•</span>
                  <span>Duration: {formatTime(duration)}</span>
                  <span>•</span>
                  <span>44.1kHz High Fidelity</span>
                </div>
              </div>
            </div>

            <button
              id="change-audio-file-btn"
              onClick={resetAll}
              className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-rose-600 transition-colors cursor-pointer px-3 py-1.5 rounded-lg border border-slate-200 hover:border-rose-200"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Choose Another File</span>
            </button>
          </div>

          {/* Interactive Waveform Visualizer */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center space-x-2 font-medium">
                <span>Interactive Waveform</span>
                <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                  PCM Decoded
                </span>
              </div>
              <div className="text-slate-400">
                Click anywhere on the waveform to seek
              </div>
            </div>

              {/* Canvas Container */}
            <div className="relative rounded-2xl bg-slate-900 border border-slate-800 p-4 shadow-inner space-y-3">
              <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                className="w-full h-32 rounded-lg cursor-pointer"
              />

              {/* Draggable Timeline integrated under Waveform */}
              <DraggableTimeline
                duration={duration}
                startTime={startTime}
                endTime={endTime}
                currentTime={currentTime}
                onStartTimeChange={(t) => {
                  setStartTime(t);
                  seekTo(t);
                }}
                onEndTimeChange={(t) => {
                  setEndTime(t);
                  seekTo(t);
                }}
                onRangeChange={(s, e) => {
                  setStartTime(s);
                  setEndTime(e);
                  seekTo(s);
                }}
                onSeek={seekTo}
                heightClass="h-12"
              />

              {/* Float Micro Timestamps (Strictly MM:SS) */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs font-mono text-slate-400">
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-400 font-bold">In: {formatTime(startTime)}</span>
                  <span>→</span>
                  <span className="text-emerald-400 font-bold">Out: {formatTime(endTime)}</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-slate-300">Length: {formatTime(Math.max(0, endTime - startTime))}</span>
                </div>
                <div className="flex items-center space-x-2 text-white">
                  <Volume2 className="w-3.5 h-3.5 text-sky-400" />
                  <span>Playhead: {formatTime(currentTime)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Smart Presets & Quick Duration Pills */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider mr-1">
                Presets:
              </span>
              <button
                type="button"
                id="audio-preset-full"
                onClick={() => applyPreset(0)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
              >
                Full Audio
              </button>
              <button
                type="button"
                id="audio-preset-ringtone"
                onClick={() => applyPreset(29, true)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
                title="Trim 29s snippet with smooth fade in and fade out (M4R/MP3 ringtones)"
              >
                Ringtone (29s) + Fade
              </button>
              <button
                type="button"
                id="audio-preset-notification"
                onClick={() => applyPreset(5, false)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
                title="Trim quick 5-second alert chime"
              >
                Alert / Notification (5s)
              </button>
              <button
                type="button"
                id="audio-preset-hook"
                onClick={() => applyPreset(30, true)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
                title="Trim 30-second chorus hook"
              >
                Chorus Hook (30s)
              </button>
            </div>

            {/* Keyboard Shortcuts HUD */}
            <div className="hidden lg:flex items-center space-x-2 text-[11px] text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
              <span className="font-semibold text-slate-500">Shortcuts:</span>
              <span><kbd className="font-mono bg-white px-1 py-0.5 rounded border border-slate-200 text-[10px] text-slate-600">Space</kbd> Play</span>
              <span><kbd className="font-mono bg-white px-1 py-0.5 rounded border border-slate-200 text-[10px] text-slate-600">[</kbd> In</span>
              <span><kbd className="font-mono bg-white px-1 py-0.5 rounded border border-slate-200 text-[10px] text-slate-600">]</kbd> Out</span>
              <span><kbd className="font-mono bg-white px-1 py-0.5 rounded border border-slate-200 text-[10px] text-slate-600">←/→</kbd> Step</span>
            </div>
          </div>

          {/* Precision Audio Controls Grid (Minutes & Seconds Only) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            {/* Start Time Min/Sec Box */}
            <MinSecInput
              label="Start Point (In)"
              time={startTime}
              minTime={0}
              maxTime={Math.max(0, endTime - 1)}
              onChange={(newTime) => {
                setStartTime(newTime);
                seekTo(newTime);
              }}
              onUsePlayhead={() => setStartTime(Math.min(currentTime, endTime - 1))}
              idPrefix="audio-start"
            />

            {/* End Time Min/Sec Box */}
            <MinSecInput
              label="End Point (Out)"
              time={endTime}
              minTime={Math.min(duration, startTime + 1)}
              maxTime={duration}
              onChange={(newTime) => {
                setEndTime(newTime);
                seekTo(newTime);
              }}
              onUsePlayhead={() => setEndTime(Math.max(currentTime, startTime + 1))}
              idPrefix="audio-end"
            />

            {/* Player Controls */}
            <div className="bg-slate-900 text-white p-3.5 rounded-xl border border-slate-800 shadow-sm flex flex-col justify-between space-y-2.5">
              <span className="text-xs font-semibold text-slate-200 tracking-wide flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 text-sky-400" />
                {t('playbackPreview')}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  id="audio-play-btn"
                  onClick={togglePlay}
                  className="flex-1 py-2 px-3 rounded-lg bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? t('pause') : t('play')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => seekTo(startTime)}
                  title="Reset to In Point"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono border-t border-slate-800 pt-1">
                <span>Loop: In ⇄ Out</span>
                <span className="text-sky-400 font-semibold">{formatTime(Math.max(0, endTime - startTime))}</span>
              </div>
            </div>

            {/* Smooth Fade Options & Ringtone Preset */}
            <div className="bg-slate-900 text-white p-3.5 rounded-xl border border-slate-800 shadow-sm flex flex-col justify-between space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-200 tracking-wide flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-sky-400" />
                  Audio Fades
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const maxEnd = Math.min(startTime + 29, duration);
                    setEndTime(maxEnd);
                    setFadeIn(true);
                    setFadeOut(true);
                  }}
                  className="text-[10px] bg-sky-950 text-sky-400 border border-sky-800 hover:bg-sky-900 font-semibold px-2 py-0.5 rounded transition-colors cursor-pointer"
                  title="Auto-select 29 seconds with smooth fades for iOS/Android ringtone"
                >
                  {t('makeRingtone')}
                </button>
              </div>
              <div className="flex items-center space-x-3 text-xs text-slate-300">
                <label className="flex items-center space-x-1.5 cursor-pointer hover:text-white">
                  <input
                    type="checkbox"
                    checked={fadeIn}
                    onChange={(e) => setFadeIn(e.target.checked)}
                    className="rounded text-sky-600 focus:ring-sky-500 bg-slate-950 border-slate-700"
                  />
                  <span>{t('fadeIn')}</span>
                </label>
                <label className="flex items-center space-x-1.5 cursor-pointer hover:text-white">
                  <input
                    type="checkbox"
                    checked={fadeOut}
                    onChange={(e) => setFadeOut(e.target.checked)}
                    className="rounded text-sky-600 focus:ring-sky-500 bg-slate-950 border-slate-700"
                  />
                  <span>{t('fadeOut')}</span>
                </label>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono border-t border-slate-800 pt-1">
                <span>Anti-Click</span>
                <span className="text-sky-400">Smooth curve</span>
              </div>
            </div>
          </div>

          {/* Processing Progress */}
          <ProcessingProgress
            state={processingState}
            title="Rendering audio buffer..."
          />

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <div className="text-xs text-slate-500">
              Selected Duration: <span className="font-bold text-slate-800">{formatTime(Math.max(0, endTime - startTime))}</span>
            </div>

            <div className="flex items-center space-x-3">
              {resultBlob ? (
                <>
                  <button
                    type="button"
                    onClick={() => setResultBlob(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    Adjust Range
                  </button>
                  <button
                    type="button"
                    id="download-trimmed-audio-btn"
                    onClick={handleDownload}
                    className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md shadow-sky-600/20 flex items-center space-x-2 transition-all transform active:scale-95 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t('download')} ({formatFileSize(resultBlob.size)})</span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  id="start-trim-audio-btn"
                  disabled={processingState.isProcessing}
                  onClick={handleTrimAudio}
                  className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white text-xs font-bold shadow-sm shadow-sky-600/20 flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <Scissors className="w-4 h-4" />
                  <span>{t('cutAudio')}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
