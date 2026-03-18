import React, { useState } from 'react';
import { ArrowLeft, Save, FileDown, CheckCircle2, AlertCircle } from 'lucide-react';
import { buildReportExportState, exportReportPdf, type PdfExportState } from '../../utils/reportPdfExport';

interface FormLayoutProps {
  deptName: string;
  onBack: () => void;
  onSave: () => void;
  isSaving: boolean;
  showSuccess: boolean;
  saveError?: string | null;
  formData: any;
  getExportState?: () => PdfExportState;
  children: React.ReactNode;
}

const FormLayout: React.FC<FormLayoutProps> = ({ 
  deptName, 
  onBack, 
  onSave, 
  isSaving, 
  showSuccess, 
  saveError,
  formData,
  getExportState,
  children 
}) => {
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const handleExportPdf = async () => {
    if (isExportingPdf) return;

    setIsExportingPdf(true);
    setExportError(null);
    try {
      const exportState = getExportState ? getExportState() : buildReportExportState(deptName, formData);
      await exportReportPdf(deptName, exportState);
    } catch (err) {
      console.error('PDF Export failed:', err);
      setExportError('Gagal menjana PDF. Sila cuba lagi.');
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto animate-fade-in pb-20">
      {/* Form Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-zus-900 font-bold text-sm mb-2 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Utama
          </button>
          <h2 className="text-2xl md:text-3xl font-extrabold text-zus-900">
            {deptName}
          </h2>
          <p className="text-gray-500 text-sm md:text-base">Sila lengkapkan maklumat laporan tahunan di bawah.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-zus-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-zus-700 transition-all active:scale-95 disabled:opacity-70"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Save className="w-4 h-4" />
            )}
            Simpan Draf
          </button>

          <button
            onClick={handleExportPdf}
            disabled={isExportingPdf}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all active:scale-95 ${
              isExportingPdf 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-zus-900 border border-gray-200 hover:border-zus-gold'
            }`}
          >
            {isExportingPdf ? (
              <div className="w-4 h-4 border-2 border-zus-900/30 border-t-zus-900 rounded-full animate-spin"></div>
            ) : (
              <FileDown className="w-4 h-4" />
            )}
            {isExportingPdf ? 'Menjana PDF...' : 'Export PDF'}
          </button>
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
      <div className="space-y-6">
        {children}

        {/* Footer Info */}
        <div className="flex items-center gap-2 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 text-blue-600">
          <AlertCircle className="w-4 h-4" />
          <p className="text-[10px] md:text-xs font-medium">
            Nota: Data anda disimpan secara automatik dalam pelayar ini. Pastikan anda menekan butang <strong>Simpan Draf</strong> sebelum menutup tab.
          </p>
        </div>
      </div>
      </div>
    </>
  );
};

export default FormLayout;
