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

  // Detect if it's truly a mobile device via User Agent AND small width
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const isMobileUa = /Android|iPhone|iPod|IEMobile|Opera Mini/i.test(ua);
  
  // We allow tablets and half-screen desktop views, but block small mobile screens
  // 640px is a good threshold for "Mobile vs Tablet/Half-Desktop"
  return isSmallViewport && isMobileUa;
}

const WebViewOnlyGuard: React.FC<WebViewOnlyGuardProps> = ({ children, minWidthPx = 640 }) => {
  // Mobile blocking is disabled to support iPhone and other mobile views.
  // Set to false if we need to restore the original guard behavior.
  const MOBILE_BLOCK_DISABLED = true;
  const [isMobileView, setIsMobileView] = useState(() => getIsMobileView(minWidthPx));

  const title = useMemo(() => 'Paparan Mudah Alih Tidak Disokong', []);
  const description = useMemo(
    () =>
      'Aplikasi ini dioptimumkan untuk Desktop atau Laptop. Sila besarkan tetingkap pelayar anda atau buka melalui komputer.',
    []
  );

  useEffect(() => {
    const update = () => setIsMobileView(getIsMobileView(minWidthPx));
    
    // Initial check
    update();

    window.addEventListener('resize', update, { passive: true });
    window.addEventListener('orientationchange', update, { passive: true });

    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, [minWidthPx]);

  if (MOBILE_BLOCK_DISABLED) return <>{children}</>;
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

          <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight sentence-case">{title}</h1>
          <p className="mt-4 text-sm md:text-base text-slate-600">{description}</p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Mod Paparan Disokong</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                  <Monitor className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 sentence-case">Full screen atau half screen</p>
                  <p className="text-[10px] text-slate-600">Sesuai untuk tetingkap komputer.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Kenapa Ini Terjadi?</p>
              <p className="mt-3 text-xs text-slate-600">
                Sistem mengesan skrin anda terlalu kecil. Sila lebarkan tetingkap melebihi <span className="font-bold">{minWidthPx}px</span> untuk akses.
              </p>
            </div>
          </div>

          <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Akses Hanya Untuk Paparan Web
          </p>
        </div>
      </div>
    </div>
  );
};

export default WebViewOnlyGuard;
