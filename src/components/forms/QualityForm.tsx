import React from 'react';
import { getTodayIsoMY } from '../../utils/dateFormat';
import { AlertCircle, Lightbulb } from 'lucide-react';
import FormLayout from './FormLayout';
import { LawatanSection } from './CommonSections';
import { useFormLogic } from './useFormLogic';

interface QualityFormProps {
  deptName: string;
  onBack: () => void;
}

const QualityForm: React.FC<QualityFormProps> = ({ deptName, onBack }) => {
  const initialState = {
    tarikh: getTodayIsoMY(),
    disediakanOleh: '',
    jawatan: '',
    ringkasan: '',
    isu: '',
    cadangan: '',
    lawatan: []
  };

  const {
    formData,
    isSaving,
    isAutoSaving,
    showSuccess,
    saveError,
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
      isAutoSaving={isAutoSaving}
      showSuccess={showSuccess}
      saveError={saveError}
      formData={formData}
    >
      <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
            <AlertCircle className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-zus-900 sentence-case">Isu dan cabaran</h3>
        </div>

        <textarea
          name="isu"
          rows={8}
          placeholder="Nyatakan isu dan cabaran Unit Kualiti..."
          value={formData.isu}
          onChange={handleInputChange}
          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 focus:border-zus-gold outline-none transition-all text-sm font-medium resize-none"
        />
      </section>

      <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-zus-900 sentence-case">Cadangan penambahbaikan</h3>
        </div>

        <textarea
          name="cadangan"
          rows={8}
          placeholder="Nyatakan cadangan penambahbaikan / way forward Unit Kualiti..."
          value={formData.cadangan}
          onChange={handleInputChange}
          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 focus:border-zus-gold outline-none transition-all text-sm font-medium resize-none"
        />
      </section>

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

export default QualityForm;
