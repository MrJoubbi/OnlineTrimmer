/**
 * Time formatting utilities for OnlineTrimmer.
 * Standardizes time display to clean minutes & seconds (MM:SS or HH:MM:SS)
 * without confusing millisecond fractions unless explicitly requested.
 */

export function formatTime(seconds: number, includeMs = false): string {
  if (isNaN(seconds) || seconds < 0) seconds = 0;
  const totalSeconds = Math.round(seconds);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');

  if (includeMs) {
    const rawMs = Math.floor((seconds % 1) * 100);
    if (h > 0) {
      return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(rawMs)}`;
    }
    return `${pad(m)}:${pad(s)}.${pad(rawMs)}`;
  }

  if (h > 0) {
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  }
  return `${pad(m)}:${pad(s)}`;
}

export function secondsToMinSec(totalSeconds: number): { minutes: number; seconds: number } {
  if (isNaN(totalSeconds) || totalSeconds < 0) totalSeconds = 0;
  const rounded = Math.round(totalSeconds);
  const minutes = Math.floor(rounded / 60);
  const seconds = rounded % 60;
  return { minutes, seconds };
}

export function minSecToSeconds(minutes: number, seconds: number): number {
  const safeM = Math.max(0, isNaN(minutes) ? 0 : minutes);
  const safeS = Math.max(0, isNaN(seconds) ? 0 : seconds);
  return safeM * 60 + safeS;
}

export function parseTimeString(timeStr: string): number | null {
  if (!timeStr) return null;
  const parts = timeStr.trim().split(':').map((p) => parseInt(p, 10));
  if (parts.some(isNaN)) return null;

  if (parts.length === 2) {
    const [m, s] = parts;
    return m * 60 + s;
  }
  if (parts.length === 3) {
    const [h, m, s] = parts;
    return h * 3600 + m * 60 + s;
  }
  return null;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 200);
}
