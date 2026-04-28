import React, { useState } from 'react';
import { Heart, Megaphone } from 'lucide-react';
import { LiveAnnouncementState } from '../hooks/useLiveAnnouncement';

interface LiveAnnouncementOverlayProps {
  announcement: LiveAnnouncementState;
  onLove: (position?: { x: number; y: number }) => void;
}

const LiveAnnouncementOverlay: React.FC<LiveAnnouncementOverlayProps> = ({ announcement, onLove }) => {
  const [bursts, setBursts] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleLove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const id = Date.now();

    setBursts((items) => [...items.slice(-8), { id, x, y }]);
    window.setTimeout(() => {
      setBursts((items) => items.filter((item) => item.id !== id));
    }, 1100);
    onLove({ x, y });
  };

  return (
    <div className="fixed inset-0 z-[10000] flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-5 text-center text-slate-950 sm:px-6 md:px-8">
      <div className="live-announcement-bg" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} style={{ ['--i' as string]: index }} />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-[0_24px_70px_rgba(15,23,42,0.22)] sm:mb-7 sm:h-20 sm:w-20 md:h-24 md:w-24 md:rounded-[2rem]">
          <Megaphone className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
        </div>

        <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-zus-gold sm:mb-4 sm:text-sm sm:tracking-[0.34em]">Live Announcement</p>
        <h1 className="max-w-4xl text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl">
          {announcement.message}
        </h1>
        <p className="mt-4 max-w-2xl text-base font-bold leading-relaxed text-slate-500 sm:mt-6 sm:text-lg md:text-2xl">
          Sila beri perhatian sebentar. Anda boleh tap love sebagai tanda hadir dan beri sokongan.
        </p>

        <button
          type="button"
          onClick={handleLove}
          className="live-tap-zone group relative mt-7 flex w-full items-center justify-center overflow-hidden border border-rose-100 bg-white/90 text-rose-600 shadow-[0_28px_90px_rgba(15,23,42,0.12)] transition active:scale-[0.995] sm:mt-9"
          aria-label="Tap love pada kawasan ini"
          title="Tap love pada kawasan ini"
        >
          <div className="pointer-events-none flex flex-col items-center">
            <Heart className="h-14 w-14 fill-rose-600 transition group-hover:scale-110 sm:h-16 sm:w-16 md:h-20 md:w-20" />
            <span className="mt-3 text-sm font-black uppercase tracking-[0.22em] text-rose-500 sm:mt-4 sm:text-base sm:tracking-[0.24em]">Tap Love</span>
            <span className="mt-1 text-xs font-bold text-rose-300 sm:text-sm">Tap di mana-mana dalam kotak ini</span>
          </div>
          {bursts.map((burst) => (
            <span
              key={burst.id}
              className="live-love-burst"
              style={{
                left: `${burst.x * 100}%`,
                top: `${burst.y * 100}%`,
              }}
            >
              <Heart className="h-10 w-10 fill-rose-500 text-rose-500" />
            </span>
          ))}
        </button>

        <div className="mt-6 rounded-full border border-rose-100 bg-rose-50 px-6 py-3 text-base font-black text-rose-700 shadow-sm">
          {announcement.loveCount.toLocaleString('ms-MY')} love
        </div>
      </div>
    </div>
  );
};

export default LiveAnnouncementOverlay;
