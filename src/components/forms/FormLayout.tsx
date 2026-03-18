import React, { useState } from 'react';
import { ArrowLeft, Save, FileDown, CheckCircle2, AlertCircle } from 'lucide-react';
import { buildReportExportState, exportReportPdf, type PdfExportState } from '../../utils/reportPdfExport';

interface FormLayoutProps {
  deptName: string;
  onBack: () => void;
  onSave: () => void;
  onExport?: () => void | Promise<void>;
  isSaving: boolean;
  showSuccess: boolean;
  saveError?: string | null;
  formData: any;
  getExportState?: () => PdfExportState;
  hideExportButton?: boolean;
  children: React.ReactNode;
}

const FormLayout: React.FC<FormLayoutProps> = ({ 
  deptName, 
  onBack, 
  onSave, 
  onExport,
  isSaving, 
  showSuccess, 
  saveError,
  formData,
  getExportState,
  hideExportButton,
  children 
}) => {
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const handleExportPdf = async () => {
    if (isExportingPdf) return;

    setIsExportingPdf(true);
    setExportError(null);
    try {
      if (onExport) {
        await onExport();
      } else {
        const exportState = getExportState ? getExportState() : buildReportExportState(deptName, formData);
        await exportReportPdf(deptName, exportState);
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
      <div className="mx-auto max-w-[110rem] animate-fade-in pb-28">
      {/* Form Header */}
      <div className="mb-12 flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0">
          <button 
            onClick={onBack}
            className="group mb-4 inline-flex items-center gap-2 text-xs font-bold text-gray-500 transition-colors hover:text-zus-900"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Utama
          </button>
          <h2 className="text-2xl font-extrabold tracking-tight text-zus-900 sm:text-3xl md:text-4xl">
            {deptName}
          </h2>
          <p className="mt-3 max-w-4xl text-sm font-medium text-gray-500 md:text-base">
            Sila lengkapkan maklumat laporan tahunan di bawah.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row xl:justify-end">
          <button
            onClick={onSave}
            disabled={isSaving}
            className="flex min-w-[220px] items-center justify-center gap-3 rounded-[1.35rem] bg-zus-900 px-8 py-5 text-base font-black text-white shadow-[0_18px_40px_rgba(15,35,64,0.18)] transition-all hover:bg-zus-800 active:scale-[0.98] disabled:opacity-70"
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
              className={`flex min-w-[220px] items-center justify-center gap-3 rounded-[1.35rem] px-7 py-5 text-lg font-black shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-all active:scale-[0.98] ${
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
      </div>

      {/* Error Notification */}
      {exportError && (
        <div className="mb-6 bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-700 animate-scale-in">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm font-bold">{exportError}</span>
        </div>
      )}

      {/* Success Notification */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-100 p-4 rounded-2xl flex items-center gap-3 text-green-700 animate-scale-in">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-bold">Data telah berjaya disimpan secara lokal!</span>
        </div>
      )}

      {saveError && (
        <div className="mb-6 bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-700 animate-scale-in">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm font-bold">{saveError}</span>
        </div>
      )}

      {/* Main Form Content */}
      <div className="space-y-10">
        {children}

        {/* Footer Info */}
        <div className="flex items-start gap-4 rounded-[1.5rem] border border-blue-100 bg-blue-50/60 p-6 text-blue-700">
          <AlertCircle className="mt-0.5 h-5 w-5" />
          <p className="text-[10px] md:text-[11px] font-medium">
            Nota: Data anda disimpan secara automatik dalam pelayar ini. Pastikan anda menekan butang <strong>Simpan Draf</strong> sebelum menutup tab.
          </p>
        </div>
      </div>
      </div>
    </>
  );
};

export default FormLayout;
