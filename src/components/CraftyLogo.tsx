import React from 'react';

interface CraftyLogoProps {
  className?: string;
  size?: number;
}

export const CraftyLogo: React.FC<CraftyLogoProps> = ({ className = '', size = 38 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Royal Blue & Navy Crest Shield */}
      <rect width="48" height="48" rx="12" fill="url(#craftyCrestBg)" />
      <rect
        x="1.5"
        y="1.5"
        width="45"
        height="45"
        rx="10.5"
        stroke="url(#craftyGoldTrim)"
        strokeWidth="1.5"
        strokeOpacity="0.85"
      />

      {/* Open Academic Book Pages */}
      <path
        d="M9.5 16.5C13.5 14.5 19.5 15 24 18V35.5C19.5 32.8 13.8 32.5 9.5 34V16.5Z"
        fill="#FFFFFF"
        fillOpacity="0.96"
      />
      <path
        d="M38.5 16.5C34.5 14.5 28.5 15 24 18V35.5C28.5 32.8 34.2 32.5 38.5 34V16.5Z"
        fill="#E0F2FE"
        fillOpacity="0.96"
      />
      {/* Book Spine Accent */}
      <path d="M24 18V35.5" stroke="#1D4ED8" strokeWidth="1.6" strokeLinecap="round" />

      {/* Subtle Page Ruling Lines */}
      <path d="M12.5 21H20.5M12.5 25H19.5M12.5 29H18.5" stroke="#93C5FD" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M27.5 21H35.5M28.5 25H35.5M29.5 29H35.5" stroke="#60A5FA" strokeWidth="1.3" strokeLinecap="round" />

      {/* Golden Alphabet Symbol Emblem ("E" Crowned Crest) */}
      <circle cx="24" cy="12.5" r="6.5" fill="#0A192F" stroke="#F59E0B" strokeWidth="1.5" />
      <path
        d="M21.5 9.5H26.6M21.5 9.5V15.5M21.5 12.5H25.7M21.5 15.5H26.7"
        stroke="#FCD34D"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <defs>
        <linearGradient id="craftyCrestBg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0A192F" />
          <stop offset="60%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="craftyGoldTrim" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
    </svg>
  );
};
