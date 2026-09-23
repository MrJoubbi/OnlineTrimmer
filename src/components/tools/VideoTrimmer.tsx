import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Download, Scissors, Video as VideoIcon, RefreshCw, Volume2, VolumeX, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ToolConfig, ProcessingState } from '../../types';
import { FileDropzone } from '../common/FileDropzone';
import { ProcessingProgress } from '../common/ProcessingProgress';
import { formatTime, formatFileSize, downloadBlob } from '../../lib/formatUtils';
import { trimVideoClientSide } from '../../lib/videoTrimmer';
import { DraggableTimeline } from '../common/DraggableTimeline';
import { MinSecInput } from '../common/MinSecInput';

interface VideoTrimmerProps {
  toolConfig: ToolConfig;
}

export const VideoTrimmer: React.FC<VideoTrimmerProps> = ({ toolConfig }) => {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [outputFormat, setOutputFormat] = useState<'mp4' | 'webm'>('mp4');
  const [processingState, setProcessingState] = useState<ProcessingState>({
    isProcessing: false,
    progress: 0,
    statusMessage: '',
  });
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [videoMetadata, setVideoMetadata] = useState<{ width: number; height: number } | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Set default output format based on tool config if format-specific
  useEffect(() => {
    if (toolConfig.id === 'webm-trimmer') {
      setOutputFormat('webm');
    } else {
      setOutputFormat('mp4');
    }
  }, [toolConfig.id]);

  // Clean up object URLs on unmount or file change
  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  const handleFileSelected = (selectedFile: File) => {
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    const url = URL.createObjectURL(selectedFile);
    setFile(selectedFile);
    setVideoUrl(url);
    setResultBlob(null);
    setProcessingState({ isProcessing: false, progress: 0, statusMessage: '' });
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    const dur = videoRef.current.duration || 10;
    setDuration(dur);
    setStartTime(0);
    setEndTime(dur);
    setCurrentTime(0);
    setVideoMetadata({
      width: videoRef.current.videoWidth,
      height: videoRef.current.videoHeight,
    });
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    setCurrentTime(curr);

    // Loop within trim boundaries if playing
    if (curr >= endTime) {
      videoRef.current.currentTime = startTime;
      setCurrentTime(startTime);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      // If cursor is outside boundaries, jump to start
      if (videoRef.current.currentTime < startTime || videoRef.current.currentTime >= endTime) {
        videoRef.current.currentTime = startTime;
      }
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const seekTo = (time: number) => {
    if (!videoRef.current) return;
    const clamped = Math.max(0, Math.min(duration, time));
    videoRef.current.currentTime = clamped;
    setCurrentTime(clamped);
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current || duration === 0) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    seekTo(ratio * duration);
  };

  const handleSetStartAtPlayhead = () => {
    const newStart = Math.min(currentTime, endTime - 0.1);
    setStartTime(newStart);
  };

  const handleSetEndAtPlayhead = () => {
    const newEnd = Math.max(currentTime, startTime + 0.1);
    setEndTime(newEnd);
  };

  const applyPreset = (presetDuration: number) => {
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
  };

  // Keyboard navigation shortcuts: Space (Play/Pause), [ or I (Set Start), ] or O (Set End), Left/Right (Step)
  useEffect(() => {
    if (!file) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (e.target as HTMLElement)?.tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === '[' || e.key.toLowerCase() === 'i') {
        e.preventDefault();
        handleSetStartAtPlayhead();
      } else if (e.key === ']' || e.key.toLowerCase() === 'o') {
        e.preventDefault();
        handleSetEndAtPlayhead();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        seekTo(Math.max(0, currentTime - 0.5));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        seekTo(Math.min(duration, currentTime + 0.5));
      } else if (e.key.toLowerCase() === 'j') {
        e.preventDefault();
        seekTo(Math.max(0, currentTime - 1.0));
      } else if (e.key.toLowerCase() === 'l') {
        e.preventDefault();
        seekTo(Math.min(duration, currentTime + 1.0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [file, currentTime, duration, isPlaying, startTime, endTime]);

  const handleTrim = async () => {
    if (!file) return;
    if (isPlaying && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }

    setProcessingState({
      isProcessing: true,
      progress: 5,
      statusMessage: 'Initializing client-side video decoder...',
    });

    try {
      const blob = await trimVideoClientSide(file, {
        startTime,
        endTime,
        outputFormat,
        onProgress: (pct, stage) => {
          setProcessingState((prev) => ({
            ...prev,
            progress: pct,
            statusMessage: stage,
          }));
        },
      });

      setResultBlob(blob);
      setProcessingState({
        isProcessing: false,
        progress: 100,
        statusMessage: 'Trimming completed successfully!',
      });

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
      const msg = err instanceof Error ? err.message : 'Trimming failed';
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
    const originalBase = file.name.substring(0, file.name.lastIndexOf('.')) || 'video';
    const filename = `${originalBase}-trimmed.${outputFormat}`;
    downloadBlob(resultBlob, filename);
  };

  const resetAll = () => {
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    setFile(null);
    setVideoUrl(null);
    setResultBlob(null);
    setProcessingState({ isProcessing: false, progress: 0, statusMessage: '' });
  };

  return (
    <div className="w-full">
      {!file ? (
        <FileDropzone
          toolConfig={toolConfig}
          onFileSelected={handleFileSelected}
          sampleFileType="video"
        />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Top Info Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <VideoIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-800 truncate max-w-xs sm:max-w-md">
                  {file.name}
                </h2>
                <div className="flex items-center space-x-3 text-xs text-slate-500">
                  <span>Size: {formatFileSize(file.size)}</span>
                  {videoMetadata && (
                    <>
                      <span>•</span>
                      <span>{videoMetadata.width}×{videoMetadata.height}</span>
                    </>
                  )}
                  <span>•</span>
                  <span>Duration: {formatTime(duration)}</span>
                </div>
              </div>
            </div>

            <button
              id="change-video-file-btn"
              onClick={resetAll}
              className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-rose-600 transition-colors cursor-pointer px-3 py-1.5 rounded-lg border border-slate-200 hover:border-rose-200"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Choose Another File</span>
            </button>
          </div>

          {/* Video Preview Container */}
          <div className="relative rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center max-h-[460px] aspect-video mx-auto">
            {videoUrl && (
              <video
                ref={videoRef}
                src={videoUrl}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                playsInline
                muted={isMuted}
                className="w-full h-full object-contain cursor-pointer"
                onClick={togglePlay}
              />
            )}

            {/* Centered Play Button Overlay when paused */}
            {!isPlaying && (
              <button
                id="video-overlay-play-btn"
                onClick={togglePlay}
                className="absolute w-16 h-16 rounded-full bg-black/60 hover:bg-emerald-600/90 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer backdrop-blur-xs"
              >
                <Play className="w-7 h-7 fill-current translate-x-0.5" />
              </button>
            )}

            {/* In-Video Micro Controls */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg">
              <div className="flex items-center space-x-2">
                <button
                  id="video-mute-toggle-btn"
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="font-mono">{formatTime(currentTime)}</span>
                <span className="text-slate-400">/</span>
                <span className="font-mono text-slate-400">{formatTime(duration)}</span>
              </div>
              <div className="font-mono text-[11px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                Trim Length: {formatTime(Math.max(0, endTime - startTime))}
              </div>
            </div>
          </div>

          {/* Interactive Draggable Timeline Scrubbing Bar */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Interactive Timeline & Cut Range
              </span>
              <span className="text-slate-500 font-mono text-[11px]">
                Drag handles or selection window to trim • Space to Play
              </span>
            </div>

            {/* Draggable Pro Timeline */}
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
              heightClass="h-14 sm:h-16"
            />

            {/* Smart Presets & Quick Duration Pills */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider mr-1">
                  Presets:
                </span>
                <button
                  type="button"
                  id="preset-full-video"
                  onClick={() => applyPreset(0)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
                >
                  Full Video
                </button>
                <button
                  type="button"
                  id="preset-tiktok-15s"
                  onClick={() => applyPreset(15)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
                  title="Trim 15-second highlight for TikTok & Stories"
                >
                  TikTok (15s)
                </button>
                <button
                  type="button"
                  id="preset-reels-30s"
                  onClick={() => applyPreset(30)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
                  title="Trim 30-second clip for Instagram Reels"
                >
                  Reels (30s)
                </button>
                <button
                  type="button"
                  id="preset-shorts-60s"
                  onClick={() => applyPreset(59.9)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
                  title="Trim under 60-second video for YouTube Shorts"
                >
                  Shorts (60s)
                </button>
                <button
                  type="button"
                  id="preset-discord-10s"
                  onClick={() => applyPreset(10)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
                  title="Trim quick 10s clip for Discord or WhatsApp"
                >
                  Discord (10s)
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

            {/* Precision Cut Controls (Minutes & Seconds Only) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {/* Start (In Point) Dual Min/Sec Box */}
              <MinSecInput
                label="Start Point (In)"
                time={startTime}
                minTime={0}
                maxTime={Math.max(0, endTime - 1)}
                onChange={(newTime) => {
                  setStartTime(newTime);
                  seekTo(newTime);
                }}
                onUsePlayhead={handleSetStartAtPlayhead}
                idPrefix="video-start"
              />

              {/* End (Out Point) Dual Min/Sec Box */}
              <MinSecInput
                label="End Point (Out)"
                time={endTime}
                minTime={Math.min(duration, startTime + 1)}
                maxTime={duration}
                onChange={(newTime) => {
                  setEndTime(newTime);
                  seekTo(newTime);
                }}
                onUsePlayhead={handleSetEndAtPlayhead}
                idPrefix="video-end"
              />

              {/* Playback Controls Box */}
              <div className="bg-slate-900 text-white p-3.5 rounded-xl border border-slate-800 shadow-sm flex flex-col justify-between space-y-2.5">
                <span className="text-xs font-semibold text-slate-200 tracking-wide flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                  Playback Preview
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    id="video-play-pause-btn"
                    onClick={togglePlay}
                    className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlaying ? 'Pause' : 'Play Loop'}</span>
                  </button>
                  <button
                    type="button"
                    title="Jump to start"
                    onClick={() => seekTo(startTime)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono border-t border-slate-800 pt-1">
                  <span>Loop: In ⇄ Out</span>
                  <span className="text-emerald-400 font-semibold">{formatTime(Math.max(0, endTime - startTime))}</span>
                </div>
              </div>

              {/* Output Format Box */}
              <div className="bg-slate-900 text-white p-3.5 rounded-xl border border-slate-800 shadow-sm flex flex-col justify-between space-y-2.5">
                <span className="text-xs font-semibold text-slate-200 tracking-wide flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-emerald-400" />
                  Output Container
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    id="format-mp4-btn"
                    onClick={() => setOutputFormat('mp4')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      outputFormat === 'mp4'
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    MP4
                  </button>
                  <button
                    type="button"
                    id="format-webm-btn"
                    onClick={() => setOutputFormat('webm')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      outputFormat === 'webm'
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    WebM
                  </button>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono border-t border-slate-800 pt-1">
                  <span>In-Browser</span>
                  <span className="text-emerald-400">Lossless Speed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Processing Progress */}
          <ProcessingProgress
            state={processingState}
            title="Trimming video in browser..."
          />

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <div className="text-xs text-slate-500">
              Output: <span className="font-bold text-slate-700">{formatTime(Math.max(0, endTime - startTime))}</span> duration
            </div>

            <div className="flex items-center space-x-3">
              {resultBlob ? (
                <>
                  <button
                    type="button"
                    id="trim-again-btn"
                    onClick={() => setResultBlob(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    Adjust Selection
                  </button>
                  <button
                    type="button"
                    id="download-trimmed-video-btn"
                    onClick={handleDownload}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center space-x-2 transition-all transform active:scale-95 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Trimmed Video ({formatFileSize(resultBlob.size)})</span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  id="start-trim-video-btn"
                  disabled={processingState.isProcessing}
                  onClick={handleTrim}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <Scissors className="w-4 h-4" />
                  <span>Trim & Export Video</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
