import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X } from 'lucide-react';

interface CookieConsentProps {
  onNavigate?: (path: string) => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has been given previously
    try {
      const consent = localStorage.getItem('onlinetrimmer_cookie_consent');
      if (!consent) {
        // Show after a brief delay so page loads smoothly
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // Fallback
    }

    // Listen for custom trigger from footer "Cookie Settings"
    const handleReopen = () => setIsVisible(true);
    window.addEventListener('openCookieSettings', handleReopen);
    return () => window.removeEventListener('openCookieSettings', handleReopen);
  }, []);

  const handleChoice = (type: 'all' | 'essential') => {
    try {
      localStorage.setItem('onlinetrimmer_cookie_consent', JSON.stringify({
        choice: type,
        timestamp: new Date().toISOString(),
      }));
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie Consent Notice"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-2xl border border-slate-700/80 backdrop-blur-md">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <Cookie className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">Privacy & Cookie Preferences</h3>
              <span className="text-[11px] text-emerald-400 font-medium flex items-center space-x-1 mt-0.5">
                <ShieldCheck className="w-3 h-3" />
                <span>Zero File Uploads Guarantee</span>
              </span>
            </div>
          </div>
          <button
            onClick={() => handleChoice('essential')}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="Close cookie consent"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          OnlineTrimmer processes all your media 100% locally in your browser. We use cookies and similar technologies for necessary site functionality, site analytics, and to deliver personalized advertising via Google AdSense.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <button
            id="cookie-accept-all"
            onClick={() => handleChoice('all')}
            className="w-full sm:w-auto flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs py-2 px-3.5 rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            Accept All
          </button>
          <button
            id="cookie-reject-nonessential"
            onClick={() => handleChoice('essential')}
            className="w-full sm:w-auto flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs py-2 px-3.5 rounded-xl border border-slate-700 transition-colors cursor-pointer"
          >
            Essential Only
          </button>
          {onNavigate && (
            <button
              onClick={() => onNavigate('/cookie-policy')}
              className="text-[11px] text-slate-400 hover:text-emerald-400 underline underline-offset-2 transition-colors cursor-pointer px-1 py-1"
            >
              Policy
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
