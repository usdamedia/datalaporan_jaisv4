import React from 'react';
import { ShieldCheck, Users, ClipboardCheck } from 'lucide-react';
import FormLayout from './FormLayout';
import { BasicInfoSection, NarrativeSection, LawatanSection } from './CommonSections';
import { useFormLogic } from './useFormLogic';

interface IntegritiFormProps {
  deptName: string;
  onBack: () => void;
}

const IntegritiForm: React.FC<IntegritiFormProps> = ({ deptName, onBack }) => {
  const initialState = {
    tarikh: new Date().toISOString().split('T')[0],
    disediakanOleh: '',
    jawatan: '',
    ringkasan: '',
    isu: '',
    cadangan: '',
    lawatan: [],
    bilMesyuaratTatakelola: 0,
    bilProgramIntegriti: 0,
    iso9001Finding: '',
    abmsFinding: ''
  };

  const {
    formData,
    isSaving,
    showSuccess,
    handleInputChange,
    handleSave,
    addLawatan,
    removeLawatan,
    updateLawatan
  } = useFormLogic(deptName, initialState);

  return (
    <FormLayout
      deptName={deptName}
      onBack={onBack}
      onSave={handleSave}
      isSaving={isSaving}
      showSuccess={showSuccess}
      formData={formData}
    >
      <BasicInfoSection formData={formData} handleInputChange={handleInputChange} />

      {/* Integriti Specific */}
      <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-zus-900">Tatakelola & Integriti</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              Bilangan Mesyuarat Tatakelola
            </label>
            <input 
              type="number"
              name="bilMesyuaratTatakelola"
              value={formData.bilMesyuaratTatakelola}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 outline-none transition-all text-sm font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              Bilangan Program Integriti
            </label>
            <input 
              type="number"
              name="bilProgramIntegriti"
              value={formData.bilProgramIntegriti}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 outline-none transition-all text-sm font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              Penemuan ISO 9001
            </label>
            <input 
              type="text"
              name="iso9001Finding"
              value={formData.iso9001Finding}
              onChange={handleInputChange}
              placeholder="Contoh: 0 NCR, 2 OFI"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 outline-none transition-all text-sm font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              Penemuan ABMS
            </label>
            <input 
              type="text"
              name="abmsFinding"
              value={formData.abmsFinding}
              onChange={handleInputChange}
              placeholder="Contoh: Tiada ketidakpatuhan"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 outline-none transition-all text-sm font-medium"
            />
          </div>
        </div>
      </section>

      <NarrativeSection formData={formData} handleInputChange={handleInputChange} />
      <LawatanSection 
        formData={formData} 
        addLawatan={addLawatan} 
        removeLawatan={removeLawatan} 
        updateLawatan={updateLawatan} 
        handleSave={handleSave}
        isSaving={isSaving}
      />
    </FormLayout>
  );
};

export default IntegritiForm;
