import React from 'react';
import { LayoutGrid, MapPin } from 'lucide-react';
import { SARAWAK_DIVISIONS } from '../../constants';
import FormLayout from './FormLayout';
import { BasicInfoSection, NarrativeSection, LawatanSection } from './CommonSections';
import { useFormLogic } from './useFormLogic';

interface UppFormProps {
  deptName: string;
  onBack: () => void;
}

const UppForm: React.FC<UppFormProps> = ({ deptName, onBack }) => {
  const initialState = {
    tarikh: new Date().toISOString().split('T')[0],
    disediakanOleh: '',
    jawatan: '',
    ringkasan: '',
    isu: '',
    cadangan: '',
    lawatan: [],
    uppDivisions: SARAWAK_DIVISIONS.map(name => ({
      name,
      fasaPerancangan: 0,
      fasaPelaksanaan: 0,
      siapSepenuhnya: 0
    }))
  };

  const {
    formData,
    isSaving,
    showSuccess,
    handleInputChange,
    handleSave,
    addLawatan,
    removeLawatan,
    updateLawatan,
    setFormData
  } = useFormLogic(deptName, initialState);

  const handleUppDivisionChange = (index: number, field: string, value: any) => {
    setFormData((prev: any) => {
      const newDivisions = [...prev.uppDivisions];
      newDivisions[index] = { ...newDivisions[index], [field]: parseInt(value) || 0 };
      return { ...prev, uppDivisions: newDivisions };
    });
  };

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

      {/* UPP Specific: Division Table */}
      <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm overflow-x-auto">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
            <LayoutGrid className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-zus-900">Status Projek Mengikut Bahagian (2025)</h3>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-100">
              <th className="p-4">Bahagian</th>
              <th className="p-4 text-center">Perancangan</th>
              <th className="p-4 text-center">Pelaksanaan</th>
              <th className="p-4 text-center">Siap</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {formData.uppDivisions.map((div: any, idx: number) => (
              <tr key={div.name} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 text-xs font-bold text-zus-900">{div.name}</td>
                <td className="p-4 text-center">
                  <input 
                    type="number"
                    value={div.fasaPerancangan}
                    onChange={(e) => handleUppDivisionChange(idx, 'fasaPerancangan', e.target.value)}
                    className="w-20 p-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none"
                  />
                </td>
                <td className="p-4 text-center">
                  <input 
                    type="number"
                    value={div.fasaPelaksanaan}
                    onChange={(e) => handleUppDivisionChange(idx, 'fasaPelaksanaan', e.target.value)}
                    className="w-20 p-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none"
                  />
                </td>
                <td className="p-4 text-center">
                  <input 
                    type="number"
                    value={div.siapSepenuhnya}
                    onChange={(e) => handleUppDivisionChange(idx, 'siapSepenuhnya', e.target.value)}
                    className="w-20 p-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default UppForm;
