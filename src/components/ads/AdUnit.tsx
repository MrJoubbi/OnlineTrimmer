import React, { useEffect, useRef } from 'react';
import { ADSENSE_CONFIG } from '../../config/adsense';

interface AdUnitProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export const AdUnit: React.FC<AdUnitProps> = ({
  slotId = ADSENSE_CONFIG.slots.toolFooterBanner,
  format = 'auto',
  responsive = true,
  className = '',
  label = 'Advertisement',
}) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const isPushed = useRef(false);

  useEffect(() => {
    // Only attempt push if AdSense is actively enabled and in browser
    if (ADSENSE_CONFIG.isEnabled && typeof window !== 'undefined' && !isPushed.current) {
      try {
        if (window.adsbygoogle && adRef.current) {
          window.adsbygoogle.push({});
          isPushed.current = true;
        }
      } catch (err) {
        console.warn('AdSense ad push warning:', err);
      }
    }
  }, []);

  return (
    <div
      className={`w-full my-6 flex flex-col items-center justify-center text-center overflow-hidden ${className}`}
      aria-label="Advertising Section"
    >
      {/* Required Google AdSense Disclosure Label */}
      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-1.5 select-none">
        {label}
      </span>

      {/* Live AdSense Unit OR Compliant Development Placeholder */}
      <div className="w-full max-w-4xl bg-slate-50/70 border border-dashed border-slate-200 rounded-xl p-2 min-h-[100px] flex items-center justify-center transition-colors">
        {ADSENSE_CONFIG.isEnabled ? (
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={ADSENSE_CONFIG.publisherId}
            data-ad-slot={slotId}
            data-ad-format={format}
            data-full-width-responsive={responsive ? 'true' : 'false'}
          />
        ) : (
          <div className="py-6 px-4 text-center select-none">
            <div className="text-xs font-semibold text-slate-500 mb-1 flex items-center justify-center space-x-1.5">
              <span>Google AdSense Display Placement</span>
            </div>
            <p className="text-[11px] text-slate-400 max-w-md mx-auto">
              Responsive banner container ready for approval (Slot ID: {slotId}). Live ads will display once AdSense publisher ID is connected.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
