import React from 'react';
import { 
  Users, 
  Globe, 
  Radio, 
  BarChart3, 
  FileCheck,
  MapPin
} from 'lucide-react';
import { DAKWAH_2024_REFERENCE, SARAWAK_DIVISIONS } from '../../constants';
import FormLayout from './FormLayout';
import { BasicInfoSection, NarrativeSection, LawatanSection } from './CommonSections';
import { useFormLogic } from './useFormLogic';

interface DakwahFormProps {
  deptName: string;
  onBack: () => void;
}

const DakwahForm: React.FC<DakwahFormProps> = ({ deptName, onBack }) => {
  const initialState = {
    tarikh: new Date().toISOString().split('T')[0],
    disediakanOleh: '',
    jawatan: '',
    ringkasan: '',
    isu: '',
    cadangan: '',
    lawatan: [],
    dakwah: {
      progJais2025: 0,
      progAgensi2025: 0,
      tauliahAktif2025: 0,
      mediaRadio2025: 0,
      mediaInternet2025: 0,
      tauliahDivisions: SARAWAK_DIVISIONS.map(name => ({
        name,
        val2025: 0
      })),
      guruAsingDivisions: SARAWAK_DIVISIONS.map(name => ({
        name,
        val2025: 0
      }))
    }
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

  const handleDakwahChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      dakwah: { ...prev.dakwah, [field]: value }
    }));
  };

  const handleDivisionChange = (listField: string, index: number, field: string, value: any) => {
    setFormData((prev: any) => {
      const newList = [...prev.dakwah[listField]];
      newList[index] = { ...newList[index], [field]: parseInt(value) || 0 };
      return {
        ...prev,
        dakwah: { ...prev.dakwah, [listField]: newList }
      };
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

      {/* Statistik Program & Tauliah Aktif */}
      <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-zus-900">Statistik Program & Tauliah</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-zus-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-zus-gold" /> Program Dakwah (2025)
            </h4>
            <div className="space-y-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <label className="text-xs font-bold text-gray-500">JAIS</label>
                <div className="text-center text-[10px] font-bold text-gray-400 bg-gray-100 py-1 rounded-md">
                  2024: {DAKWAH_2024_REFERENCE.statistik.jais}
                </div>
                <input 
                  type="number"
                  value={formData.dakwah.progJais2025}
                  onChange={(e) => handleDakwahChange('progJais2025', parseInt(e.target.value) || 0)}
                  className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <label className="text-xs font-bold text-gray-500">Agensi & NGO</label>
                <div className="text-center text-[10px] font-bold text-gray-400 bg-gray-100 py-1 rounded-md">
                  2024: {DAKWAH_2024_REFERENCE.perbandingan.y2024.agensi}
                </div>
                <input 
                  type="number"
                  value={formData.dakwah.progAgensi2025}
                  onChange={(e) => handleDakwahChange('progAgensi2025', parseInt(e.target.value) || 0)}
                  className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-zus-900 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-zus-gold" /> Tauliah Mengajar Aktif
            </h4>
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-xs font-bold text-gray-500">Jumlah Aktif</label>
              <div className="text-center text-[10px] font-bold text-gray-400 bg-gray-100 py-1 rounded-md">
                2024: {DAKWAH_2024_REFERENCE.tauliahAktif}
              </div>
              <input 
                type="number"
                value={formData.dakwah.tauliahAktif2025}
                onChange={(e) => handleDakwahChange('tauliahAktif2025', parseInt(e.target.value) || 0)}
                className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tauliah Mengajar Dikeluarkan (Pecahan Bahagian) */}
      <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-zus-900">Tauliah Mengajar Dikeluarkan (2025)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {formData.dakwah.tauliahDivisions.map((div: any, idx: number) => (
            <div key={div.name} className="grid grid-cols-3 items-center gap-4 py-2 border-b border-gray-50 last:border-0">
              <label className="text-xs font-bold text-gray-500">{div.name}</label>
              <div className="text-center text-[10px] font-bold text-gray-400 bg-gray-100 py-1 rounded-md">
                2024: {(DAKWAH_2024_REFERENCE.tauliahDikeluarkan as any)[div.name.charAt(0).toLowerCase() + div.name.slice(1).replace(/\s+/g, '')] || 0}
              </div>
              <input 
                type="number"
                value={div.val2025}
                onChange={(e) => handleDivisionChange('tauliahDivisions', idx, 'val2025', e.target.value)}
                className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Guru Agama Warga Asing */}
      <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-zus-900">Guru Agama Warga Asing (2025)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {formData.dakwah.guruAsingDivisions.map((div: any, idx: number) => (
            <div key={div.name} className="grid grid-cols-3 items-center gap-4 py-2 border-b border-gray-50 last:border-0">
              <label className="text-xs font-bold text-gray-500">{div.name}</label>
              <div className="text-center text-[10px] font-bold text-gray-400 bg-gray-100 py-1 rounded-md">
                2024: {(DAKWAH_2024_REFERENCE.guruWargaAsing as any)[div.name.charAt(0).toLowerCase() + div.name.slice(1).replace(/\s+/g, '')] || 0}
              </div>
              <input 
                type="number"
                value={div.val2025}
                onChange={(e) => handleDivisionChange('guruAsingDivisions', idx, 'val2025', e.target.value)}
                className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Dakwah Melalui Media */}
      <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
            <Radio className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-zus-900">Dakwah Melalui Media (2025)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-xs font-bold text-gray-500">Radio</label>
            <div className="text-center text-[10px] font-bold text-gray-400 bg-gray-100 py-1 rounded-md">
              2024: {DAKWAH_2024_REFERENCE.media.radio}
            </div>
            <input 
              type="number"
              value={formData.dakwah.mediaRadio2025}
              onChange={(e) => handleDakwahChange('mediaRadio2025', parseInt(e.target.value) || 0)}
              className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-xs font-bold text-gray-500">Internet</label>
            <div className="text-center text-[10px] font-bold text-gray-400 bg-gray-100 py-1 rounded-md">
              2024: {DAKWAH_2024_REFERENCE.media.internet}
            </div>
            <input 
              type="number"
              value={formData.dakwah.mediaInternet2025}
              onChange={(e) => handleDakwahChange('mediaInternet2025', parseInt(e.target.value) || 0)}
              className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none"
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

export default DakwahForm;
