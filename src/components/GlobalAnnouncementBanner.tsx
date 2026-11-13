import React, { useState, useEffect } from 'react';
import { GlobalAnnouncement, NavTab } from '../types';
import { adminStorage } from '../utils/adminStorage';
import { Megaphone, X, ArrowRight, Sparkles, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import { audioFeedback } from '../utils/audioFeedback';

interface GlobalAnnouncementBannerProps {
  onNavigateTab: (tab: NavTab) => void;
}

export const GlobalAnnouncementBanner: React.FC<GlobalAnnouncementBannerProps> = ({ onNavigateTab }) => {
  const [banner, setBanner] = useState<GlobalAnnouncement>(() => adminStorage.getGlobalAnnouncement());
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleStorageUpdate = () => {
      setBanner(adminStorage.getGlobalAnnouncement());
    };
    window.addEventListener('crafty_storage_update', handleStorageUpdate);
    return () => window.removeEventListener('crafty_storage_update', handleStorageUpdate);
  }, []);

  if (!banner.isLive || dismissed || !banner.text) {
    return null;
  }

  const getVariantStyles = () => {
    switch (banner.variant) {
      case 'urgent':
        return {
          bg: 'bg-rose-50/95 border-rose-200 text-rose-900',
          icon: <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />,
          btn: 'bg-rose-600 hover:bg-rose-700 text-white font-semibold',
        };
      case 'warning':
        return {
          bg: 'bg-amber-50/95 border-amber-200 text-amber-900',
          icon: <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />,
          btn: 'bg-amber-500 hover:bg-amber-600 text-white font-semibold',
        };
      case 'info':
        return {
          bg: 'bg-sky-50/95 border-sky-200 text-sky-950',
          icon: <Megaphone className="w-4 h-4 text-sky-600 shrink-0" />,
          btn: 'bg-sky-600 hover:bg-sky-700 text-white font-semibold',
        };
      case 'success':
      default:
        return {
          bg: 'bg-white/95 border-sky-200 text-slate-800',
          icon: <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />,
          btn: 'bg-sky-600 hover:bg-sky-700 text-white font-semibold',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`relative z-50 border-b px-4 py-2.5 transition-all shadow-sm text-xs sm:text-sm ${styles.bg}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          {styles.icon}
          <span className="font-medium tracking-wide truncate">
            {banner.text}
          </span>
          {banner.linkText && banner.linkTab && (
            <button
              onClick={() => {
                audioFeedback.playClick();
                if (banner.linkTab) onNavigateTab(banner.linkTab);
              }}
              className={`shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs transition-transform active:scale-95 shadow-sm ${styles.btn}`}
            >
              <span>{banner.linkText}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

        <button
          onClick={() => {
            audioFeedback.playClick();
            setDismissed(true);
          }}
          className="p-1 rounded-md text-slate-500 hover:text-slate-900 hover:bg-sky-100 transition-colors shrink-0"
          title="Dismiss banner"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
