import React, { useState } from 'react';
import { Heart, Megaphone } from 'lucide-react';
import { LiveAnnouncementState } from '../hooks/useLiveAnnouncement';

interface LiveAnnouncementOverlayProps {
  announcement: LiveAnnouncementState;
  onLove: () => void;
}

const LiveAnnouncementOverlay: React.FC<LiveAnnouncementOverlayProps> = ({ announcement, onLove }) => {
  const [burstCount, setBurstCount] = useState(0);

  const handleLove = () => {
    setBurstCount((count) => count + 1);
    onLove();
  };

  return (
    <div className="fixed inset-0 z-[10000] flex min-h-screen items-center justify-center overflow-hidden bg-white px-5 text-center text-slate-950">
      <div className="live-announcement-bg" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} style={{ ['--i' as string]: index }} />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-slate-950 text-white shadow-[0_24px_70px_rgba(15,23,42,0.22)]">
          <Megaphone className="h-12 w-12" />
        </div>

        <p className="mb-4 text-sm font-black uppercase tracking-[0.34em] text-zus-gold">Live Announcement</p>
        <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-6xl md:text-7xl">
          {announcement.message}
        </h1>
        <p className="mt-6 max-w-2xl text-lg font-bold leading-relaxed text-slate-500 md:text-2xl">
          Sila beri perhatian sebentar. Anda boleh tap love sebagai tanda hadir dan beri sokongan.
        </p>

        <button
          type="button"
          onClick={handleLove}
          className="group relative mt-10 flex h-28 w-28 items-center justify-center rounded-full bg-rose-600 text-white shadow-[0_28px_80px_rgba(225,29,72,0.32)] transition hover:scale-105 hover:bg-rose-700 active:scale-95 md:h-32 md:w-32"
          aria-label="Tap love"
          title="Tap love"
        >
          <Heart className="h-12 w-12 fill-white transition group-hover:scale-110 md:h-14 md:w-14" />
          <span key={burstCount} className="live-love-burst">+1</span>
        </button>

        <div className="mt-6 rounded-full border border-rose-100 bg-rose-50 px-6 py-3 text-base font-black text-rose-700 shadow-sm">
          {announcement.loveCount.toLocaleString('ms-MY')} love
        </div>
      </div>
    </div>
  );
};

export default LiveAnnouncementOverlay;
