import React, { useEffect, useRef, useState } from 'react';

type DraftLoadingEvent = CustomEvent<{
  isLoading: boolean;
  deptName?: string;
}>;

const SkeletonCard = ({ index }: { index: number }) => (
  <div
    className="overflow-hidden rounded-2xl border border-slate-100 bg-white/95 p-5 shadow-sm"
    style={{ animationDelay: `${index * 90}ms` }}
  >
    <div className="h-4 w-[92%] animate-pulse rounded-full bg-slate-200"></div>
    <div className="mt-3 h-4 w-[62%] animate-pulse rounded-full bg-slate-200"></div>
    <div className="mt-5 h-3 w-[88%] animate-pulse rounded-full bg-slate-100"></div>
    <div className="mt-3 h-3 w-[42%] animate-pulse rounded-full bg-slate-100"></div>
  </div>
);

const DraftLoadingOverlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [deptName, setDeptName] = useState('');
  const hideTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleDraftLoading = (event: Event) => {
      const { isLoading, deptName: nextDeptName } = (event as DraftLoadingEvent).detail || {};

      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }

      if (isLoading) {
        setDeptName(nextDeptName || '');
        setIsVisible(true);
        return;
      }

      hideTimeoutRef.current = window.setTimeout(() => setIsVisible(false), 250);
    };

    window.addEventListener('jais:draft-loading', handleDraftLoading);

    return () => {
      window.removeEventListener('jais:draft-loading', handleDraftLoading);
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-white/88 px-4 py-6 backdrop-blur-sm sm:py-10"
      role="status"
      aria-live="polite"
      aria-label="Memuatkan draft daripada Firebase"
    >
      <div className="w-full max-w-2xl animate-fade-in">
        <div className="mb-5 overflow-hidden rounded-full bg-slate-100">
          <div className="h-1.5 w-1/2 animate-[loading-line_1.25s_ease-in-out_infinite] rounded-full bg-teal-600"></div>
        </div>

        <div className="mb-5">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-teal-700">Memuatkan Draft</p>
          <h2 className="mt-2 text-xl font-black text-slate-900 sm:text-2xl">
            Mengkonfigurasi Data
          </h2>
          {deptName && (
            <p className="mt-2 text-sm font-semibold text-slate-500">{deptName}</p>
          )}
        </div>

        <div className="space-y-5">
          {[0, 1, 2].map((index) => (
            <SkeletonCard key={index} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DraftLoadingOverlay;
