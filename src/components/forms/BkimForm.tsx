import React from 'react';
import { getTodayIsoMY } from '../../utils/dateFormat';
import { Building2, MapPin, Star } from 'lucide-react';
import { BKIM_2024_REFERENCE, SARAWAK_DIVISIONS } from '../../constants';
import FormLayout from './FormLayout';
import { BasicInfoSection, NarrativeSection, LawatanSection } from './CommonSections';
import { useFormLogic } from './useFormLogic';

interface BkimFormProps {
  deptName: string;
  onBack: () => void;
}

const BkimForm: React.FC<BkimFormProps> = ({ deptName, onBack }) => {
  const initialState = {
    tarikh: getTodayIsoMY(),
    disediakanOleh: '',
    jawatan: '',
    ringkasan: '',
    isu: '',
    cadangan: '',
    lawatan: [],
    bkim: {
      bilMasjid: 0,
      bilSurau: 0,
      bilMusolla: 0,
      imam1: 0,
      imam2: 0,
      imam3: 0,
      bilal: 0,
      marbot: 0,
      kuburMis: 0,
      kuburKerajaan: 0,
      kuburLak: 0,
      kuburLain: 0,
      star5: 0,
      star4: 0,
      star3: 0,
      star2: 0,
      star1: 0,
      star0: 0,
      bkimDivisions: SARAWAK_DIVISIONS.map(name => ({
        name,
        program: 0,
        guruTakmir: 0,
        lak: 0
      }))
    }
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
    updateLawatan,
    setFormData
  } = useFormLogic(deptName, initialState);

  const handleBkimChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      bkim: { ...prev.bkim, [field]: value }
    }));
  };

  const handleBkimDivisionChange = (index: number, field: string, value: any) => {
    setFormData((prev: any) => {
      const newDivisions = [...prev.bkim.bkimDivisions];
      newDivisions[index] = { ...newDivisions[index], [field]: parseInt(value) || 0 };
      return {
        ...prev,
        bkim: { ...prev.bkim, bkimDivisions: newDivisions }
      };
    });
  };

  const renderReferenceTable = (
    title: string,
    items: Array<{ label: string; field: string; ref: number }>
  ) => (
    <div className="space-y-4">
      <h4 className="text-sm font-extrabold text-zus-900">{title}</h4>
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full min-w-[460px] text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-[10px] font-black uppercase text-gray-500">Perkara</th>
              <th className="px-4 py-3 text-center text-[10px] font-black uppercase text-gray-500">Rujukan 2024</th>
              <th className="px-4 py-3 text-left text-[10px] font-black uppercase text-zus-900">Input 2025</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => (
              <tr key={item.field}>
                <td className="px-4 py-3 text-xs font-bold text-gray-600">{item.label}</td>
                <td className="px-4 py-3 text-center text-xs font-black text-gray-500">{item.ref}</td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={formData.bkim[item.field]}
                    onChange={(e) => handleBkimChange(item.field, parseInt(e.target.value) || 0)}
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

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
      <BasicInfoSection formData={formData} handleInputChange={handleInputChange} />

      {/* BKIM Specific: Fasiliti & Perjawatan */}
      <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-zus-900">Fasiliti & Perjawatan</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {renderReferenceTable('Bilangan Fasiliti', [
            { label: 'Masjid', field: 'bilMasjid', ref: BKIM_2024_REFERENCE.fasiliti.masjid },
            { label: 'Surau', field: 'bilSurau', ref: BKIM_2024_REFERENCE.fasiliti.surau },
            { label: 'Musolla', field: 'bilMusolla', ref: BKIM_2024_REFERENCE.fasiliti.musolla },
          ])}

          {renderReferenceTable('Pegawai Masjid', [
            { label: 'Imam I', field: 'imam1', ref: BKIM_2024_REFERENCE.perjawatan.imam1 },
            { label: 'Imam II', field: 'imam2', ref: BKIM_2024_REFERENCE.perjawatan.imam2 },
            { label: 'Imam III', field: 'imam3', ref: BKIM_2024_REFERENCE.perjawatan.imam3 },
            { label: 'Bilal', field: 'bilal', ref: BKIM_2024_REFERENCE.perjawatan.bilal },
            { label: 'Marbot', field: 'marbot', ref: BKIM_2024_REFERENCE.perjawatan.marbot },
          ])}
        </div>
      </section>

      {/* BKIM Specific: Tanah Perkuburan & Penarafan */}
      <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-2">
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-md font-bold text-zus-900">Tanah Perkuburan</h3>
            </div>
            {renderReferenceTable('Tanah Perkuburan', [
              { label: 'MIS', field: 'kuburMis', ref: BKIM_2024_REFERENCE.kubur.mis },
              { label: 'Tanah Kerajaan', field: 'kuburKerajaan', ref: BKIM_2024_REFERENCE.kubur.kerajaan },
              { label: 'LAK', field: 'kuburLak', ref: BKIM_2024_REFERENCE.kubur.lak },
              { label: 'Lain-Lain', field: 'kuburLain', ref: BKIM_2024_REFERENCE.kubur.lain },
            ])}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-2">
              <div className="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center text-yellow-600">
                <Star className="w-4 h-4" />
              </div>
              <h3 className="text-md font-bold text-zus-900">Penarafan Bintang</h3>
            </div>
            {renderReferenceTable('Penarafan Bintang', [
              { label: '5 Bintang', field: 'star5', ref: BKIM_2024_REFERENCE.bintang.star5 },
              { label: '4 Bintang', field: 'star4', ref: BKIM_2024_REFERENCE.bintang.star4 },
              { label: '3 Bintang', field: 'star3', ref: BKIM_2024_REFERENCE.bintang.star3 },
              { label: '2 Bintang', field: 'star2', ref: BKIM_2024_REFERENCE.bintang.star2 },
              { label: '1 Bintang', field: 'star1', ref: BKIM_2024_REFERENCE.bintang.star1 },
              { label: 'Tiada Bintang', field: 'star0', ref: BKIM_2024_REFERENCE.bintang.star0 },
            ])}
          </div>
        </div>
      </section>

      {/* BKIM Specific: Division Table */}
      <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm overflow-x-auto">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-zus-900">Pecahan Mengikut Bahagian (2025)</h3>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-100">
              <th className="p-4">Bahagian</th>
              <th className="p-4 text-center">Program/Aktiviti Rujukan 2024</th>
              <th className="p-4 text-center">Program/Aktiviti Input 2025</th>
              <th className="p-4 text-center">Guru Takmir Rujukan 2024</th>
              <th className="p-4 text-center">Guru Takmir Input 2025</th>
              <th className="p-4 text-center">LAK Rujukan 2024</th>
              <th className="p-4 text-center">LAK Input 2025</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {formData.bkim.bkimDivisions.map((div: any, idx: number) => (
              <tr key={div.name} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 text-xs font-bold text-zus-900">{div.name}</td>
                <td className="p-4 text-center text-xs font-black text-gray-500">{BKIM_2024_REFERENCE.divisions[idx]?.program || 0}</td>
                <td className="p-4 text-center"><input type="number" value={div.program} onChange={(e) => handleBkimDivisionChange(idx, 'program', e.target.value)} className="w-20 p-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none" /></td>
                <td className="p-4 text-center text-xs font-black text-gray-500">{BKIM_2024_REFERENCE.divisions[idx]?.guruTakmir || 0}</td>
                <td className="p-4 text-center"><input type="number" value={div.guruTakmir} onChange={(e) => handleBkimDivisionChange(idx, 'guruTakmir', e.target.value)} className="w-20 p-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none" /></td>
                <td className="p-4 text-center text-xs font-black text-gray-500">{BKIM_2024_REFERENCE.divisions[idx]?.lak || 0}</td>
                <td className="p-4 text-center"><input type="number" value={div.lak} onChange={(e) => handleBkimDivisionChange(idx, 'lak', e.target.value)} className="w-20 p-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none" /></td>
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

export default BkimForm;
