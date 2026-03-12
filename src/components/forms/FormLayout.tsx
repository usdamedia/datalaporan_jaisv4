import React from 'react';
import { ArrowLeft, Save, FileDown, CheckCircle2, AlertCircle } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReportPDF from '../ReportPDF';

interface FormLayoutProps {
  deptName: string;
  onBack: () => void;
  onSave: () => void;
  isSaving: boolean;
  showSuccess: boolean;
  formData: any;
  children: React.ReactNode;
}

const FormLayout: React.FC<FormLayoutProps> = ({ 
  deptName, 
  onBack, 
  onSave, 
  isSaving, 
  showSuccess, 
  formData,
  children 
}) => {
  return (
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
          
          <PDFDownloadLink
            document={<ReportPDF deptName={deptName} formData={formData} />}
            fileName={`Laporan_JAIS_2025_${deptName.replace(/\s+/g, '_')}.pdf`}
            className="flex items-center gap-2 bg-white text-zus-900 border border-gray-200 px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:border-zus-gold transition-all active:scale-95"
          >
            {({ loading }) => (
              <>
                <FileDown className="w-4 h-4" />
                {loading ? 'Generating...' : 'Export PDF'}
              </>
            )}
          </PDFDownloadLink>
        </div>
      </div>

      {/* Success Notification */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-100 p-4 rounded-2xl flex items-center gap-3 text-green-700 animate-scale-in">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-bold">Data telah berjaya disimpan secara lokal!</span>
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
  );
};

export default FormLayout;
