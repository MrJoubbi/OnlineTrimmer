import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div
      id="offline-status-banner"
      className="fixed bottom-4 left-4 z-50 flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-900/95 text-white border border-emerald-500/40 shadow-xl backdrop-blur-md text-xs font-medium animate-bounce"
    >
      <WifiOff className="w-4 h-4 text-emerald-400" />
      <span>Offline Ready — In-browser trimming works without internet</span>
      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-1" />
    </div>
  );
};
