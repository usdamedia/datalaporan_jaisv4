import React, { useEffect, useMemo, useState } from 'react';
import { Monitor, Smartphone } from 'lucide-react';

interface WebViewOnlyGuardProps {
  children: React.ReactNode;
  minWidthPx?: number;
}

function getIsMobileView(minWidthPx: number) {
  if (typeof window === 'undefined') return false;

  const width = window.innerWidth;
  const isSmallViewport = width < minWidthPx;

  const coarsePointer = typeof window.matchMedia === 'function' ? window.matchMedia('(pointer: coarse)').matches : false;
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const isLikelyMobileUa = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(ua);

  return isSmallViewport || (coarsePointer && width < Math.max(minWidthPx, 1280)) || (isLikelyMobileUa && width < Math.max(minWidthPx, 1280));
}

const WebViewOnlyGuard: React.FC<WebViewOnlyGuardProps> = ({ children, minWidthPx = 1024 }) => {
  const [isMobileView, setIsMobileView] = useState(() => getIsMobileView(minWidthPx));

  const title = useMemo(() => 'Paparan Mudah Alih Tidak Disokong', []);
  const description = useMemo(
    () =>
      'Aplikasi ini hanya untuk paparan web (desktop/laptop). Sila buka menggunakan komputer atau besarkan tetingkap pelayar.',
    []
  );

  useEffect(() => {
    const update = () => setIsMobileView(getIsMobileView(minWidthPx));
    update();

    window.addEventListener('resize', update, { passive: true });
    window.addEventListener('orientationchange', update, { passive: true });

    const media = typeof window.matchMedia === 'function' ? window.matchMedia(`(max-width: ${minWidthPx - 1}px)`) : null;
    if (media) {
      const handler = () => update();
      if (typeof media.addEventListener === 'function') media.addEventListener('change', handler);
      else media.addListener(handler);

      return () => {
        window.removeEventListener('resize', update);
        window.removeEventListener('orientationchange', update);
        if (typeof media.removeEventListener === 'function') media.removeEventListener('change', handler);
        else media.removeListener(handler);
      };
    }

    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, [minWidthPx]);

  if (!isMobileView) return <>{children}</>;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-xl w-full bg-white rounded-[2rem] shadow-2xl border border-slate-200 p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-slate-900/5 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-red-100 text-red-700">
            <Smartphone className="h-10 w-10" />
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">{title}</h1>
          <p className="mt-4 text-sm md:text-base text-slate-600">{description}</p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Cadangan</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                  <Monitor className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">Desktop / Laptop</p>
                  <p className="text-xs text-slate-600">Buka melalui komputer untuk akses penuh.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Jika Anda Sudah Guna Desktop</p>
              <p className="mt-3 text-xs text-slate-600">
                Besarkan tetingkap pelayar melebihi <span className="font-bold">{minWidthPx}px</span>. Paparan akan dibuka secara automatik.
              </p>
            </div>
          </div>

          <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Akses hanya untuk paparan web
          </p>
        </div>
      </div>
    </div>
  );
};

export default WebViewOnlyGuard;

