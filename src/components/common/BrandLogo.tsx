import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  height?: number | string;
  showIcon?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'dark',
  height = 38,
  showIcon = false,
}) => {
  const isLight = variant === 'light';
  const iconSrc = isLight ? '/brand-mark-white.png' : '/brand-mark.png';
  const numericHeight = typeof height === 'number' ? height : parseInt(String(height), 10) || 38;

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {/* Optional Brand Icon (hidden by default) */}
      {showIcon && (
        <img
          src={iconSrc}
          alt="OnlineTrimmer Logo"
          style={{
            height: `${numericHeight}px`,
            width: 'auto',
            maxHeight: `${numericHeight}px`,
          }}
          className="object-contain select-none shrink-0"
          referrerPolicy="no-referrer"
        />
      )}

      {/* Prominent, readable typography */}
      <span
        className={`font-black tracking-tight leading-none select-none transition-colors duration-200 ${
          isLight ? 'text-white' : 'text-slate-900'
        }`}
        style={{
          fontSize: `${Math.max(25, Math.round(numericHeight * 0.72))}px`,
          letterSpacing: '-0.03em',
        }}
      >
        Online<span className={isLight ? 'text-emerald-400' : 'text-emerald-600'}>Trimmer</span>
      </span>
    </div>
  );
};

export const FaviconIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 32,
  className = '',
}) => {
  return (
    <img
      src="/favicon.png"
      alt="OnlineTrimmer Icon"
      width={size}
      height={size}
      className={`object-contain select-none ${className}`}
      referrerPolicy="no-referrer"
    />
  );
};

