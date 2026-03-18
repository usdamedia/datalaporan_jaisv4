import React, { useMemo } from 'react';
import { Heart, Users, BarChart3, CheckSquare, Activity, Info } from 'lucide-react';
import { BKSP_2024_REFERENCE } from '../../constants';
import FormLayout from './FormLayout';
import { BasicInfoSection, NarrativeSection, LawatanSection } from './CommonSections';
import { useFormLogic } from './useFormLogic';

interface BkspFormProps {
  deptName: string;
  onBack: () => void;
}

const BkspForm: React.FC<BkspFormProps> = ({ deptName, onBack }) => {
  const initialState = {
    tarikh: new Date().toISOString().split('T')[0],
    disediakanOleh: '',
    jawatan: '',
    ringkasan: '',
    isu: '',
    cadangan: '',
    lawatan: [],
    bksp: {
      permohonan: BKSP_2024_REFERENCE.permohonan.map(p => ({ name: p.name, value: 0 })),
      pegawai: BKSP_2024_REFERENCE.pegawai.map(p => ({ name: p.name, value: 0 })),
      statistik: {
        kaunselingSyarie: 0,
        psikologi: 0
      },
      statusKes: {
        diterima: 0,
        diselesaikan: 0
      },
      puncaKrisis: BKSP_2024_REFERENCE.puncaKrisis.map(p => ({ name: p, value: 0 }))
    }
  };

  const {
    formData,
    isSaving,
    showSuccess,
    saveError,
    handleInputChange,
    handleSave,
    addLawatan,
    removeLawatan,
    updateLawatan,
    setFormData
  } = useFormLogic(deptName, initialState);

  const handleBkspChange = (section: string, index: number, value: any) => {
    setFormData((prev: any) => {
      const newBksp = { ...prev.bksp };
      const newArray = [...newBksp[section]];
      newArray[index] = { ...newArray[index], value: parseInt(value) || 0 };
      newBksp[section] = newArray;
      return { ...prev, bksp: newBksp };
    });
  };

  const handleStatistikChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      bksp: {
        ...prev.bksp,
        statistik: {
          ...prev.bksp.statistik,
          [field]: parseInt(value) || 0
        }
      }
    }));
  };

  const handleStatusKesChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      bksp: {
        ...prev.bksp,
        statusKes: {
          ...prev.bksp.statusKes,
          [field]: parseInt(value) || 0
        }
      }
    }));
  };

  const addPuncaKrisis = (name: string) => {
    if (!name.trim()) return;
    setFormData((prev: any) => ({
      ...prev,
      bksp: {
        ...prev.bksp,
        puncaKrisis: [...prev.bksp.puncaKrisis, { name: name.trim(), value: 0 }]
      }
    }));
  };

  const totalPermohonan = useMemo(() => 
    formData.bksp.permohonan.reduce((acc: number, curr: any) => acc + (curr.value || 0), 0), 
    [formData.bksp.permohonan]
  );

  const totalPegawai = useMemo(() => 
    formData.bksp.pegawai.reduce((acc: number, curr: any) => acc + (curr.value || 0), 0), 
    [formData.bksp.pegawai]
  );

  const totalProgram = (formData.bksp.statistik.kaunselingSyarie || 0) + (formData.bksp.statistik.psikologi || 0);

  return (
    <FormLayout
      deptName={deptName}
      onBack={onBack}
      onSave={handleSave}
      isSaving={isSaving}
      showSuccess={showSuccess}
      saveError={saveError}
      formData={formData}
    >
      <BasicInfoSection formData={formData} handleInputChange={handleInputChange} />

      {/* Permohonan Runding Cara */}
      <section className="bg-white border border-pink-100 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6 border-b border-pink-50 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-zus-900">Permohonan Runding Cara 2025</h3>
          </div>
          <div className="px-4 py-2 bg-pink-600 text-white rounded-xl text-sm font-black shadow-md shadow-pink-100">
            Total: {totalPermohonan}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {formData.bksp.permohonan.map((item: any, idx: number) => (
            <div key={item.name} className="p-4 bg-pink-50/30 border border-pink-100 rounded-xl hover:bg-pink-50 transition-colors">
              <label className="block text-[10px] font-black text-pink-900 uppercase tracking-wider mb-1">{item.name}</label>
              <div className="text-[9px] text-pink-400 font-bold mb-2">Ref 2024: {BKSP_2024_REFERENCE.permohonan[idx].value}</div>
              <input 
                type="number"
                value={item.value}
                onChange={(e) => handleBkspChange('permohonan', idx, e.target.value)}
                className="w-full p-2 bg-white border border-pink-200 rounded-lg text-sm font-bold text-pink-700 focus:ring-2 focus:ring-pink-500/20 outline-none"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Pegawai Runding Cara */}
      <section className="bg-white border border-pink-100 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6 border-b border-pink-50 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-zus-900">Pegawai Runding Cara 2025</h3>
          </div>
          <div className="px-4 py-2 bg-pink-600 text-white rounded-xl text-sm font-black shadow-md shadow-pink-100">
            Total: {totalPegawai}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {formData.bksp.pegawai.map((item: any, idx: number) => (
            <div key={item.name} className="p-4 bg-pink-50/30 border border-pink-100 rounded-xl hover:bg-pink-50 transition-colors">
              <label className="block text-[10px] font-black text-pink-900 uppercase tracking-wider mb-1">{item.name}</label>
              <div className="text-[9px] text-pink-400 font-bold mb-2">Ref 2024: {BKSP_2024_REFERENCE.pegawai[idx].value}</div>
              <input 
                type="number"
                value={item.value}
                onChange={(e) => handleBkspChange('pegawai', idx, e.target.value)}
                className="w-full p-2 bg-white border border-pink-200 rounded-lg text-sm font-bold text-pink-700 focus:ring-2 focus:ring-pink-500/20 outline-none"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Statistik Program & Status Kes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Statistik Program */}
        <section className="bg-white border border-pink-100 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6 border-b border-pink-50 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zus-900">Statistik Program</h3>
            </div>
            <div className="px-3 py-1 bg-pink-100 text-pink-700 rounded-lg text-xs font-black">
              Total: {totalProgram}
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-pink-50/30 border border-pink-100 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-black text-pink-900 uppercase">Kaunseling Syarie</label>
                <span className="text-[10px] font-bold text-pink-400">Ref 2024: {BKSP_2024_REFERENCE.statistik.kaunselingSyarie}</span>
              </div>
              <input 
                type="number"
                value={formData.bksp.statistik.kaunselingSyarie}
                onChange={(e) => handleStatistikChange('kaunselingSyarie', e.target.value)}
                className="w-full p-3 bg-white border border-pink-200 rounded-xl text-sm font-bold text-pink-700 focus:ring-2 focus:ring-pink-500/20 outline-none"
              />
            </div>
            <div className="p-4 bg-pink-50/30 border border-pink-100 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-black text-pink-900 uppercase">Psikologi</label>
                <span className="text-[10px] font-bold text-pink-400">Ref 2024: {BKSP_2024_REFERENCE.statistik.psikologi}</span>
              </div>
              <input 
                type="number"
                value={formData.bksp.statistik.psikologi}
                onChange={(e) => handleStatistikChange('psikologi', e.target.value)}
                className="w-full p-3 bg-white border border-pink-200 rounded-xl text-sm font-bold text-pink-700 focus:ring-2 focus:ring-pink-500/20 outline-none"
              />
            </div>
          </div>
        </section>

        {/* Status Kes */}
        <section className="bg-white border border-pink-100 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 border-b border-pink-50 pb-4">
            <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-zus-900">Status Kes 2025</h3>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-pink-50/30 border border-pink-100 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-black text-pink-900 uppercase">Kes Diterima</label>
                <span className="text-[10px] font-bold text-pink-400">Ref 2024: {BKSP_2024_REFERENCE.statusKes.diterima}</span>
              </div>
              <input 
                type="number"
                value={formData.bksp.statusKes.diterima}
                onChange={(e) => handleStatusKesChange('diterima', e.target.value)}
                className="w-full p-3 bg-white border border-pink-200 rounded-xl text-sm font-bold text-pink-700 focus:ring-2 focus:ring-pink-500/20 outline-none"
              />
            </div>
            <div className="p-4 bg-emerald-50/30 border border-emerald-100 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-black text-emerald-900 uppercase">Kes Diselesaikan</label>
                <span className="text-[10px] font-bold text-emerald-400">Ref 2024: {BKSP_2024_REFERENCE.statusKes.diselesaikan}</span>
              </div>
              <input 
                type="number"
                value={formData.bksp.statusKes.diselesaikan}
                onChange={(e) => handleStatusKesChange('diselesaikan', e.target.value)}
                className="w-full p-3 bg-white border border-emerald-200 rounded-xl text-sm font-bold text-emerald-700 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Punca Krisis */}
      <section className="bg-white border border-pink-100 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-pink-50 pb-4">
          <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-zus-900">Punca Krisis Aduan Khidmat Nasihat Keluarga</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {formData.bksp.puncaKrisis.map((item: any, idx: number) => (
            <div key={`${item.name}-${idx}`} className="flex items-center gap-3 p-3 bg-pink-50/30 border border-pink-100 rounded-xl">
              <div className="flex-1">
                <span className="text-xs font-bold text-pink-900">{item.name}</span>
              </div>
              <input 
                type="number"
                value={item.value}
                onChange={(e) => handleBkspChange('puncaKrisis', idx, e.target.value)}
                className="w-20 p-2 bg-white border border-pink-200 rounded-lg text-sm font-bold text-pink-700 focus:ring-2 focus:ring-pink-500/20 outline-none"
                placeholder="0"
              />
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-6 border-t border-pink-50 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              id="new-category-input"
              type="text"
              placeholder="Tambah kategori baru..."
              className="flex-1 p-3 bg-white border border-pink-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-pink-500/20 outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const input = e.currentTarget;
                  addPuncaKrisis(input.value);
                  input.value = '';
                }
              }}
            />
            <button 
              onClick={() => {
                const input = document.getElementById('new-category-input') as HTMLInputElement;
                addPuncaKrisis(input.value);
                input.value = '';
              }}
              className="px-6 py-3 bg-pink-100 text-pink-700 rounded-xl text-sm font-black hover:bg-pink-200 transition-colors"
            >
              Tambah Kategori
            </button>
          </div>

          <div className="flex justify-end">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-8 py-3 bg-pink-600 text-white rounded-xl text-sm font-black hover:bg-pink-700 transition-all shadow-lg shadow-pink-200 active:scale-95 disabled:opacity-50"
            >
              {isSaving ? 'Menyimpan...' : 'Simpan Bahagian Ini'}
            </button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-500 shrink-0" />
          <p className="text-[10px] text-blue-700 leading-relaxed font-medium">
            Sila masukkan jumlah kes bagi setiap punca krisis yang dilaporkan bagi tahun 2025. Anda boleh menambah kategori baru jika perlu menggunakan ruangan di atas.
          </p>
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

export default BkspForm;
