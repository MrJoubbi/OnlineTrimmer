/**
 * Analytics tracking module for Google Analytics 4 and Yandex Metrica.
 * Fires standard events on media actions like "trim" and "download".
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    ym?: (counterId: number, eventName: string, targetName: string, params?: Record<string, any>) => void;
  }
}

export function trackEvent(action: string, category: string, label?: string, value?: number) {
  try {
    // 1. Google Analytics 4
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }

    // 2. Yandex Metrica (supports reachGoal for conversions)
    if (typeof window !== 'undefined' && typeof window.ym === 'function') {
      // If Yandex counter ID is initialized, reachGoal tracks custom user action
      const ymCounters = (window as any).Ya?._metrika?.counters || [];
      const firstCounter = Object.keys(ymCounters)[0];
      if (firstCounter) {
        window.ym(Number(firstCounter), 'reachGoal', action, { category, label });
      }
    }
  } catch (e) {
    // Fail silently without interrupting UI workflow
  }
}

export function trackTrimAction(toolId: string, format?: string, durationSeconds?: number) {
  trackEvent('trim', 'media_editing', `${toolId}${format ? `_${format}` : ''}`, durationSeconds ? Math.round(durationSeconds) : undefined);
}

export function trackDownloadAction(toolId: string, format?: string, fileSizeBytes?: number) {
  trackEvent('download', 'export', `${toolId}${format ? `_${format}` : ''}`, fileSizeBytes);
}
