import React, { useEffect, useState } from 'react';
import { collection, getDocs, limit, query, Timestamp } from 'firebase/firestore';
import { ArrowLeft, Save, FileDown, CheckCircle2, AlertCircle, History } from 'lucide-react';
import { db } from '../../firebase';
import { buildDraftKey } from '../../utils/formDraftKey';
import { buildReportExportState, exportReportPdf, type PdfExportState } from '../../utils/reportPdfExport';

interface FormLayoutProps {
  deptName: string;
  exportDeptName?: string;
  onBack: () => void;
  onSave: () => void;
  onExport?: () => void | Promise<void>;
  isSaving: boolean;
  isAutoSaving?: boolean;
  showSuccess: boolean;
  saveError?: string | null;
  formData: any;
  getExportState?: () => PdfExportState;
  hideExportButton?: boolean;
  readOnly?: boolean;
  children: React.ReactNode;
}

const toLogDate = (value: unknown) => {
  if (!value) return null;
  if (value instanceof Timestamp) return value.toDate();
  if (typeof value === 'object' && value && 'seconds' in value) {
    const seconds = Number((value as { seconds: unknown }).seconds);
    if (!Number.isNaN(seconds)) return new Date(seconds * 1000);
  }
  return null;
};

const FormLayout: React.FC<FormLayoutProps> = ({ 
  deptName, 
  exportDeptName,
  onBack, 
  onSave, 
  onExport,
  isSaving, 
  isAutoSaving,
  showSuccess, 
  saveError,
  formData,
  getExportState,
  hideExportButton,
  readOnly = false,
  children 
}) => {
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [latestSavedBy, setLatestSavedBy] = useState('');
  const [latestSavedAt, setLatestSavedAt] = useState('');

  useEffect(() => {
    let cancelled = false;

    const loadLatestSaveLog = async () => {
      const storageKey = buildDraftKey(deptName);

      try {
        const snapshot = await getDocs(query(collection(db, 'drafts_2025', storageKey, 'update_logs'), limit(50)));
        const latestLog = snapshot.docs
          .map((entry) => {
            const data = entry.data();
            const createdAt = toLogDate(data.createdAt);
            const clientCreatedAt = data.clientCreatedAt ? String(data.clientCreatedAt) : '';
            return {
              officerName: String(data.officerName || ''),
              createdAt,
              clientCreatedAt,
              time: createdAt?.getTime() || (clientCreatedAt ? new Date(clientCreatedAt).getTime() : 0),
            };
          })
          .filter((entry) => entry.officerName)
          .sort((a, b) => b.time - a.time)[0];

        if (cancelled) return;

        if (!latestLog) {
          setLatestSavedBy('');
          setLatestSavedAt('');
          return;
        }

        setLatestSavedBy(latestLog.officerName);
        setLatestSavedAt(
          latestLog.createdAt
            ? latestLog.createdAt.toLocaleString('ms-MY', { dateStyle: 'medium', timeStyle: 'short' })
            : latestLog.clientCreatedAt
              ? new Date(latestLog.clientCreatedAt).toLocaleString('ms-MY', { dateStyle: 'medium', timeStyle: 'short' })
              : ''
        );
      } catch (error) {
        console.error('Failed to load latest save log', error);
      }
    };

    void loadLatestSaveLog();

    return () => {
      cancelled = true;
    };
  }, [deptName, showSuccess]);

  const handleExportPdf = async () => {
    if (isExportingPdf) return;

    setIsExportingPdf(true);
    setExportError(null);
    try {
      const effectiveExportDeptName = exportDeptName || deptName;
      if (onExport) {
        await onExport();
      } else {
        const exportState = getExportState ? getExportState() : buildReportExportState(effectiveExportDeptName, formData);
        await exportReportPdf(effectiveExportDeptName, exportState);
      }
    } catch (err) {
      console.error('PDF Export failed:', err);
      setExportError('Gagal menjana PDF. Sila cuba lagi.');
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-[62.5rem] animate-fade-in pb-28">
      {/* Form Header */}
      <div className="mb-8 flex flex-col gap-6 sm:mb-10 sm:gap-8 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0">
          <button 
            onClick={onBack}
            className="group mb-4 inline-flex items-center gap-2 text-xs font-bold text-gray-500 transition-colors hover:text-zus-900"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Utama
          </button>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <h2 className="text-xl font-extrabold tracking-tight text-zus-900 sm:text-3xl md:text-4xl">
              {deptName}
            </h2>
            {isAutoSaving && (
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-slate-500">
                <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Auto Save</span>
              </div>
            )}
          </div>
          <p className="mt-3 max-w-4xl text-sm font-medium text-gray-500 md:text-base">
            Sila lengkapkan maklumat laporan tahunan di bawah.
          </p>
        </div>

        {readOnly ? (
          <div className="flex w-full items-center gap-3 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-emerald-100 px-5 py-3 shadow-sm sm:w-auto sm:px-6 sm:py-4">
            <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600" />
            <div>
              <p className="text-sm font-black text-emerald-900">Data Telah Disahkan</p>
              <p className="text-[11px] font-medium text-emerald-700">Borang ini telah diverifikasi dan dikunci daripada pengeditan.</p>
            </div>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:gap-4 sm:flex-row xl:justify-end">
            <button
              onClick={onSave}
              disabled={isSaving}
              className="flex w-full sm:w-auto sm:min-w-[224px] items-center justify-center gap-3 rounded-[1.2rem] bg-zus-900 px-5 py-3 text-sm sm:gap-4 sm:rounded-[1.35rem] sm:px-8 sm:py-4 sm:text-base font-black text-white shadow-[0_18px_40px_rgba(15,35,64,0.18)] transition-all hover:bg-zus-800 active:scale-[0.98] disabled:opacity-70"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Save className="w-6 h-6" />
              )}
              Simpan Draf
            </button>

            {!hideExportButton && (
              <button
                onClick={handleExportPdf}
                disabled={isExportingPdf}
                className={`flex w-full sm:w-auto sm:min-w-[224px] items-center justify-center gap-3 rounded-[1.2rem] px-5 py-3 text-sm sm:gap-4 sm:rounded-[1.35rem] sm:px-8 sm:py-4 sm:text-lg font-black shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-all active:scale-[0.98] ${
                  isExportingPdf 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'border border-gray-200 bg-white text-zus-900 hover:border-zus-gold hover:bg-slate-50'
                }`}
              >
                {isExportingPdf ? (
                  <div className="w-4 h-4 border-2 border-zus-900/30 border-t-zus-900 rounded-full animate-spin"></div>
                ) : (
                  <FileDown className="w-6 h-6" />
                )}
                {isExportingPdf ? 'Menjana PDF...' : 'Export PDF'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Error Notification */}
      {exportError && (
        <div className="mb-8 bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-4 text-red-700 animate-scale-in">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm font-bold">{exportError}</span>
        </div>
      )}

      {/* Success Notification */}
      {showSuccess && (
        <div className="mb-8 bg-green-50 border border-green-100 p-4 rounded-2xl flex items-center gap-4 text-green-700 animate-scale-in">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-bold">Data Telah Disimpan. Terima Kasih!</span>
        </div>
      )}

      {saveError && (
        <div className="mb-8 bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-4 text-red-700 animate-scale-in">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm font-bold">{saveError}</span>
        </div>
      )}

      <section className="mb-8 flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          <History className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Simpanan terakhir</p>
          <p className="mt-2 text-sm font-bold text-zus-900">
            {latestSavedBy ? `Dikemaskini oleh ${latestSavedBy}` : 'Belum ada log simpanan manual untuk bahagian / unit ini.'}
          </p>
          {latestSavedAt && (
            <p className="mt-1 text-xs font-medium text-slate-500">{latestSavedAt}</p>
          )}
        </div>
      </section>

      {/* Main Form Content */}
      <div className="space-y-10">
        {children}
      </div>
      </div>
    </>
  );
};

export default FormLayout;
