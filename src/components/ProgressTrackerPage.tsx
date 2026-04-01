import React from 'react';
import { CheckCircle2, Clock3, Gauge, Layers3, Sparkles } from 'lucide-react';
import { DEPARTMENTS, getIconForDept } from '../constants';
import { Department, SubUnit } from '../types';

const toStorageKey = (name: string) =>
  `jais_2025_${name
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')}`;

const hasSavedProgress = (name: string) => {
  if (typeof window === 'undefined') return false;

  try {
    const saved = window.localStorage.getItem(toStorageKey(name));
    return Boolean(saved && saved !== 'null' && saved !== '{}');
  } catch (error) {
    console.error('Failed to read progress status', error);
    return false;
  }
};

const isSubUnitCompleted = (parentName: string, unit: SubUnit) =>
  Boolean(unit.completed || hasSavedProgress(`${parentName} : ${unit.name}`) || hasSavedProgress(unit.name));

const getDepartmentProgress = (department: Department) => {
  if (!department.active) {
    return { percentage: 0, completedCount: 0, totalCount: 0, statusLabel: 'Tidak Aktif' };
  }

  if (department.completed) {
    return { percentage: 100, completedCount: 1, totalCount: 1, statusLabel: 'Selesai' };
  }

  if (department.subUnits?.length) {
    const activeUnits = department.subUnits.filter((unit) => unit.active);
    const completedCount = activeUnits.filter((unit) => isSubUnitCompleted(department.name, unit)).length;
    const totalCount = activeUnits.length;
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return {
      percentage,
      completedCount,
      totalCount,
      statusLabel: percentage === 100 ? 'Selesai' : completedCount > 0 ? 'Sedang Berjalan' : 'Belum Bermula',
    };
  }

  const completed = hasSavedProgress(department.name);

  return {
    percentage: completed ? 100 : 0,
    completedCount: completed ? 1 : 0,
    totalCount: 1,
    statusLabel: completed ? 'Selesai' : 'Belum Bermula',
  };
};

const ProgressTrackerPage: React.FC = () => {
  const trackerItems = React.useMemo(
    () => DEPARTMENTS.filter((department) => department.active).map((department) => ({
      ...department,
      progress: getDepartmentProgress(department),
    })),
    []
  );

  const overallPercentage = React.useMemo(() => {
    if (trackerItems.length === 0) return 0;

    const sum = trackerItems.reduce((total, item) => total + item.progress.percentage, 0);
    return Math.round(sum / trackerItems.length);
  }, [trackerItems]);

  const completedItems = trackerItems.filter((item) => item.progress.percentage === 100).length;
  const inProgressItems = trackerItems.filter((item) => item.progress.percentage > 0 && item.progress.percentage < 100).length;

  return (
    <div className="space-y-8 md:space-y-10">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-blue-200 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.2),_transparent_35%),linear-gradient(135deg,_#eff6ff,_#ffffff_45%,_#dbeafe)] px-6 py-7 shadow-xl shadow-blue-100/60 md:px-8 md:py-9">
        <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.24em] text-blue-700 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Progress Semasa
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
              Progress Tracker
            </h2>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-600 md:text-base">
              Ringkasan status semasa bagi 15 bahagian dan unit utama di halaman dashboard. Peratusan dikira
              berdasarkan unit yang telah ditandakan siap atau sudah mempunyai data simpanan.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-[1.75rem] border border-blue-200 bg-white/80 p-4 shadow-sm backdrop-blur">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Purata Keseluruhan</p>
              <p className="mt-3 text-4xl font-black text-slate-900">{overallPercentage}%</p>
            </div>
            <div className="rounded-[1.75rem] border border-emerald-200 bg-white/80 p-4 shadow-sm backdrop-blur">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Selesai</p>
              <p className="mt-3 text-4xl font-black text-slate-900">{completedItems}</p>
            </div>
            <div className="rounded-[1.75rem] border border-amber-200 bg-white/80 p-4 shadow-sm backdrop-blur">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600">Sedang Berjalan</p>
              <p className="mt-3 text-4xl font-black text-slate-900">{inProgressItems}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {trackerItems.map((item, index) => {
          const { percentage, completedCount, totalCount, statusLabel } = item.progress;
          const isDone = percentage === 100;
          const isStarted = percentage > 0 && percentage < 100;

          return (
            <article
              key={item.id}
              className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <div className={`absolute inset-x-0 top-0 h-1.5 ${isDone ? 'bg-emerald-500' : isStarted ? 'bg-amber-400' : 'bg-blue-500'}`} />

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${isDone ? 'bg-emerald-100 text-emerald-700' : isStarted ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                    {getIconForDept(item.name)}
                  </div>
                  <div>
                    <h3 className="text-base font-black leading-6 text-slate-900">{item.name}</h3>
                    <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                      {item.subUnits?.length ? <Layers3 className="h-3.5 w-3.5" /> : <Gauge className="h-3.5 w-3.5" />}
                      {statusLabel}
                    </div>
                  </div>
                </div>

                <div className={`rounded-2xl px-3 py-2 text-right ${isDone ? 'bg-emerald-50 text-emerald-700' : isStarted ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'}`}>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em]">Progress</p>
                  <p className="text-2xl font-black">{percentage}%</p>
                </div>
              </div>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${isDone ? 'bg-emerald-500' : isStarted ? 'bg-amber-400' : 'bg-blue-500'}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="mt-5 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>
                  {completedCount} / {totalCount} komponen siap
                </span>
                <span className="inline-flex items-center gap-1.5">
                  {isDone ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Clock3 className="h-4 w-4 text-amber-500" />}
                  {isDone ? 'Lengkap' : isStarted ? 'Sebahagian' : 'Belum mula'}
                </span>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default ProgressTrackerPage;
