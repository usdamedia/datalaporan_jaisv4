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
          className="live-tap-zone group relative mt-10 flex min-h-[15rem] w-full max-w-3xl items-center justify-center overflow-hidden rounded-[2rem] border border-rose-100 bg-white/90 text-rose-600 shadow-[0_28px_90px_rgba(15,23,42,0.12)] transition active:scale-[0.995] md:min-h-[18rem]"
          aria-label="Tap love pada kawasan ini"
          title="Tap love pada kawasan ini"
        >
          <div className="pointer-events-none flex flex-col items-center">
            <Heart className="h-16 w-16 fill-rose-600 transition group-hover:scale-110 md:h-20 md:w-20" />
            <span className="mt-4 text-base font-black uppercase tracking-[0.24em] text-rose-500">Tap Love</span>
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
