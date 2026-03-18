import React, { useMemo } from 'react';
import { Gavel, FileText, CheckCircle2, Users, ClipboardList, Activity, Info, Trash2 } from 'lucide-react';
import { BPDS_2024_REFERENCE } from '../../constants';
import FormLayout from './FormLayout';
import { BasicInfoSection, NarrativeSection, LawatanSection } from './CommonSections';
import { useFormLogic } from './useFormLogic';

interface BpdsFormProps {
  deptName: string;
  onBack: () => void;
}

const BpdsForm: React.FC<BpdsFormProps> = ({ deptName, onBack }) => {
  const initialState = {
    tarikh: new Date().toISOString().split('T')[0],
    disediakanOleh: '',
    jawatan: '',
    ringkasan: '',
    isu: '',
    cadangan: '',
    lawatan: [],
    bpds: {
      kertasSiasatan: {
        matrimoni: 0,
        jenayahSyariah: 0
      },
      kesSelesai: BPDS_2024_REFERENCE.kesSelesai.map(k => ({ name: k.name, value: 0 })),
      pendakwaSyarie: {
        pegawaiSyariah: 0,
        penolongPegawaiSyariah: 0,
        penolongPegawaiHalEhwalIslam: 0
      },
      pendaftaranKes: {
        matrimoni: 0,
        jenayahSyariah: 0
      },
      penggubalanKaedah: BPDS_2024_REFERENCE.penggubalanKaedah.map(k => ({ name: k.name, value: 0 })),
      derafUndangUndang: '',
      derafUndangUndangList: [],
      derafUndangUndangKemajuan: 0,
      aktiviti: 0
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

  const handleBpdsNestedChange = (section: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      bpds: {
        ...prev.bpds,
        [section]: {
          ...prev.bpds[section],
          [field]: parseInt(value) || 0
        }
      }
    }));
  };

  const handleBpdsArrayChange = (section: string, index: number, value: any) => {
    setFormData((prev: any) => {
      const newBpds = { ...prev.bpds };
      const newArray = [...newBpds[section]];
      newArray[index] = { ...newArray[index], value: parseFloat(value) || 0 };
      newBpds[section] = newArray;
      return { ...prev, bpds: newBpds };
    });
  };

  const handleBpdsDraftArrayChange = (index: number, field: string, value: any) => {
    setFormData((prev: any) => {
      const currentDrafts = (prev.bpds.derafUndangUndangList || []).map((item: any) =>
        typeof item === 'string' ? { name: item, value: 0 } : item
      );
      const nextDrafts = [...currentDrafts];
      nextDrafts[index] = {
        ...nextDrafts[index],
        [field]: field === 'value' ? parseFloat(value) || 0 : value
      };

      return {
        ...prev,
        bpds: {
          ...prev.bpds,
          derafUndangUndangList: nextDrafts
        }
      };
    });
  };

  const handleBpdsSimpleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      bpds: {
        ...prev.bpds,
        [field]: parseInt(value) || 0
      }
    }));
  };

  const handleBpdsTextChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      bpds: {
        ...prev.bpds,
        [field]: value
      }
    }));
  };

  const handleSaveDerafUndangUndang = () => {
    const derafText = (formData.bpds.derafUndangUndang || '').trim();

    if (!derafText) {
      handleSave();
      return;
    }

    const updatedData = {
      ...formData,
      bpds: {
        ...formData.bpds,
        derafUndangUndang: '',
        derafUndangUndangKemajuan: 0,
        derafUndangUndangList: [
          ...((formData.bpds.derafUndangUndangList || []).map((item: any) =>
            typeof item === 'string' ? { name: item, value: 0 } : item
          )),
          {
            name: derafText,
            value: parseFloat(formData.bpds.derafUndangUndangKemajuan) || 0
          }
        ]
      }
    };

    setFormData(updatedData);
    handleSave(updatedData);
  };

  const handleDeleteDeraf = (index: number) => {
    const nextDrafts = [...(formData.bpds.derafUndangUndangList || [])];
    nextDrafts.splice(index, 1);
    
    const updatedData = {
      ...formData,
      bpds: {
        ...formData.bpds,
        derafUndangUndangList: nextDrafts
      }
    };
    
    setFormData(updatedData);
    handleSave(updatedData);
  };

  const totalKesSelesai = useMemo(() => 
    formData.bpds.kesSelesai.reduce((acc: number, curr: any) => acc + (curr.value || 0), 0),
    [formData.bpds.kesSelesai]
  );

  const totalPendakwa = (formData.bpds.pendakwaSyarie.pegawaiSyariah || 0) + 
                       (formData.bpds.pendakwaSyarie.penolongPegawaiSyariah || 0) + 
                       (formData.bpds.pendakwaSyarie.penolongPegawaiHalEhwalIslam || 0);

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

      {/* Kertas Siasatan (IP) */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-stone-100 pb-4">
          <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center text-stone-600">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">Kertas Siasatan (IP) 2025</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-stone-50 border border-stone-100 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black text-stone-700 uppercase">Matrimoni</label>
              <span className="text-[10px] font-bold text-stone-400">Ref 2024: {BPDS_2024_REFERENCE.kertasSiasatan.matrimoni}</span>
            </div>
            <input 
              type="number"
              value={formData.bpds.kertasSiasatan.matrimoni}
              onChange={(e) => handleBpdsNestedChange('kertasSiasatan', 'matrimoni', e.target.value)}
              className="w-full p-3 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-700 focus:ring-2 focus:ring-stone-500/20 outline-none"
            />
          </div>
          <div className="p-4 bg-stone-50 border border-stone-100 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black text-stone-700 uppercase">Jenayah Syariah</label>
              <span className="text-[10px] font-bold text-stone-400">Ref 2024: {BPDS_2024_REFERENCE.kertasSiasatan.jenayahSyariah}</span>
            </div>
            <input 
              type="number"
              value={formData.bpds.kertasSiasatan.jenayahSyariah}
              onChange={(e) => handleBpdsNestedChange('kertasSiasatan', 'jenayahSyariah', e.target.value)}
              className="w-full p-3 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-700 focus:ring-2 focus:ring-stone-500/20 outline-none"
            />
          </div>
        </div>
      </section>

      {/* Kes Selesai */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6 border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center text-stone-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">Kes Selesai Mengikut Bahagian 2025</h3>
          </div>
          <div className="px-4 py-2 bg-stone-800 text-white rounded-xl text-sm font-black shadow-md shadow-stone-100">
            Total: {totalKesSelesai}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {formData.bpds.kesSelesai.map((item: any, idx: number) => (
            <div key={item.name} className="p-4 bg-stone-50/50 border border-stone-100 rounded-xl hover:bg-stone-50 transition-colors">
              <label className="block text-[10px] font-black text-stone-900 uppercase tracking-wider mb-1">{item.name}</label>
              <div className="text-[9px] text-stone-400 font-bold mb-2">Ref 2024: {BPDS_2024_REFERENCE.kesSelesai[idx].value}</div>
              <input 
                type="number"
                value={item.value}
                onChange={(e) => handleBpdsArrayChange('kesSelesai', idx, e.target.value)}
                className="w-full p-2 bg-white border border-stone-200 rounded-lg text-sm font-bold text-stone-700 focus:ring-2 focus:ring-stone-500/20 outline-none"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Sumber Manusia (Pendakwa) */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6 border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center text-stone-600">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">Sumber Manusia (Pendakwa Syarie)</h3>
          </div>
          <div className="px-3 py-1 bg-stone-100 text-stone-700 rounded-lg text-xs font-black">
            Total: {totalPendakwa}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-stone-50 border border-stone-100 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] font-black text-stone-700 uppercase">Pegawai Syariah</label>
              <span className="text-[9px] font-bold text-stone-400">Ref 2024: {BPDS_2024_REFERENCE.pendakwaSyarie.pegawaiSyariah}</span>
            </div>
            <input 
              type="number"
              value={formData.bpds.pendakwaSyarie.pegawaiSyariah}
              onChange={(e) => handleBpdsNestedChange('pendakwaSyarie', 'pegawaiSyariah', e.target.value)}
              className="w-full p-3 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-700 focus:ring-2 focus:ring-stone-500/20 outline-none"
            />
          </div>
          <div className="p-4 bg-stone-50 border border-stone-100 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] font-black text-stone-700 uppercase">Penolong Pegawai Syariah</label>
              <span className="text-[9px] font-bold text-stone-400">Ref 2024: {BPDS_2024_REFERENCE.pendakwaSyarie.penolongPegawaiSyariah}</span>
            </div>
            <input 
              type="number"
              value={formData.bpds.pendakwaSyarie.penolongPegawaiSyariah}
              onChange={(e) => handleBpdsNestedChange('pendakwaSyarie', 'penolongPegawaiSyariah', e.target.value)}
              className="w-full p-3 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-700 focus:ring-2 focus:ring-stone-500/20 outline-none"
            />
          </div>
          <div className="p-4 bg-stone-50 border border-stone-100 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] font-black text-stone-700 uppercase tracking-tighter">Penolong Pegawai Hal Ehwal Islam</label>
              <span className="text-[9px] font-bold text-stone-400">Ref 2024: {BPDS_2024_REFERENCE.pendakwaSyarie.penolongPegawaiHalEhwalIslam}</span>
            </div>
            <input 
              type="number"
              value={formData.bpds.pendakwaSyarie.penolongPegawaiHalEhwalIslam}
              onChange={(e) => handleBpdsNestedChange('pendakwaSyarie', 'penolongPegawaiHalEhwalIslam', e.target.value)}
              className="w-full p-3 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-700 focus:ring-2 focus:ring-stone-500/20 outline-none"
            />
          </div>
        </div>
      </section>

      {/* Pendaftaran Kes ke Mahkamah Syariah */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-stone-100 pb-4">
          <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center text-stone-600">
            <ClipboardList className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">Pendaftaran Kes ke Mahkamah Syariah 2025</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-stone-50 border border-stone-100 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black text-stone-700 uppercase">Matrimoni</label>
              <span className="text-[10px] font-bold text-stone-400">Ref 2024: {BPDS_2024_REFERENCE.pendaftaranKes.matrimoni}</span>
            </div>
            <input 
              type="number"
              value={formData.bpds.pendaftaranKes.matrimoni}
              onChange={(e) => handleBpdsNestedChange('pendaftaranKes', 'matrimoni', e.target.value)}
              className="w-full p-3 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-700 focus:ring-2 focus:ring-stone-500/20 outline-none"
            />
          </div>
          <div className="p-4 bg-stone-50 border border-stone-100 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black text-stone-700 uppercase">Jenayah Syariah</label>
              <span className="text-[10px] font-bold text-stone-400">Ref 2024: {BPDS_2024_REFERENCE.pendaftaranKes.jenayahSyariah}</span>
            </div>
            <input 
              type="number"
              value={formData.bpds.pendaftaranKes.jenayahSyariah}
              onChange={(e) => handleBpdsNestedChange('pendaftaranKes', 'jenayahSyariah', e.target.value)}
              className="w-full p-3 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-700 focus:ring-2 focus:ring-stone-500/20 outline-none"
            />
          </div>
        </div>
      </section>

      {/* Penggubalan Kaedah */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 mb-6 border-b border-stone-100 pb-4">
          <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center text-stone-600">
            <Gavel className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">Penggubalan Kaedah (Status Kemajuan 2025)</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50">
                <th className="p-4 text-xs font-black text-stone-900 uppercase tracking-wider border-b border-stone-200">Jenis Kaedah</th>
                <th className="p-4 text-xs font-black text-stone-900 uppercase tracking-wider border-b border-stone-200 text-center">Ref 2024 (%)</th>
                <th className="p-4 text-xs font-black text-stone-900 uppercase tracking-wider border-b border-stone-200 text-center">Kemajuan 2025 (%)</th>
              </tr>
            </thead>
            <tbody>
              {formData.bpds.penggubalanKaedah.map((item: any, idx: number) => (
                <tr key={item.name} className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-4 text-xs font-bold text-stone-700 border-b border-stone-100">{item.name}</td>
                  <td className="p-4 text-xs font-bold text-stone-400 border-b border-stone-100 text-center">{BPDS_2024_REFERENCE.penggubalanKaedah[idx].value}%</td>
                  <td className="p-4 border-b border-stone-100">
                    <div className="flex items-center gap-3 justify-center">
                      <input 
                        type="number"
                        step="0.01"
                        value={item.value}
                        onChange={(e) => handleBpdsArrayChange('penggubalanKaedah', idx, e.target.value)}
                        className="w-24 p-2 bg-white border border-stone-200 rounded-lg text-sm font-bold text-stone-700 text-center focus:ring-2 focus:ring-stone-500/20 outline-none"
                      />
                      <span className="text-xs font-bold text-stone-400">%</span>
                    </div>
                  </td>
                </tr>
              ))}
              {(formData.bpds.derafUndangUndangList || []).map((item: any, idx: number) => {
                const draftItem = typeof item === 'string' ? { name: item, value: 0 } : item;

                return (
                  <tr key={`draft-${draftItem.name}-${idx}`} className="bg-amber-50/40 hover:bg-amber-50/70 transition-colors">
                    <td className="p-4 text-xs font-bold text-stone-700 border-b border-stone-100">{draftItem.name}</td>
                    <td className="p-4 text-xs font-bold text-stone-300 border-b border-stone-100 text-center">-</td>
                    <td className="p-4 border-b border-stone-100">
                      <div className="flex items-center gap-3 justify-center">
                        <input
                          type="number"
                          step="0.01"
                          value={draftItem.value || 0}
                          onChange={(e) => handleBpdsDraftArrayChange(idx, 'value', e.target.value)}
                          className="w-24 p-2 bg-white border border-stone-200 rounded-lg text-sm font-bold text-stone-700 text-center focus:ring-2 focus:ring-stone-500/20 outline-none"
                        />
                        <span className="text-xs font-bold text-stone-400">%</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteDeraf(idx)}
                          className="p-2 text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-lg transition-colors ml-1"
                          title="Padam Deraf"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-6 border-t border-stone-100 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 items-end">
            <div className="p-4 bg-stone-50 border border-stone-100 rounded-xl">
              <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-2">
                Tambah Deraf Undang Undang
              </label>
              <textarea
                value={formData.bpds.derafUndangUndang || ''}
                onChange={(e) => handleBpdsTextChange('derafUndangUndang', e.target.value)}
                rows={4}
                placeholder="Masukkan maklumat deraf undang-undang di sini"
                className="w-full p-3 bg-white border border-stone-200 rounded-xl text-sm font-medium text-stone-700 focus:ring-2 focus:ring-stone-500/20 outline-none resize-y"
              />
            </div>

            <div className="p-4 bg-stone-50 border border-stone-100 rounded-xl lg:max-w-[180px]">
              <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-2">
                Kemajuan 2025 (%)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.bpds.derafUndangUndangKemajuan || 0}
                onChange={(e) => handleBpdsTextChange('derafUndangUndangKemajuan', e.target.value)}
                className="w-full p-3 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-700 text-center focus:ring-2 focus:ring-stone-500/20 outline-none"
              />
            </div>

            <button
              type="button"
              onClick={handleSaveDerafUndangUndang}
              disabled={isSaving}
              className="h-fit px-5 py-3 bg-stone-900 text-white rounded-xl text-sm font-black hover:bg-stone-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
          <p className="mt-3 text-[11px] text-stone-500 font-medium">
            Simpanan menggunakan `localStorage` untuk data page Pendakwaaan.
          </p>
        </div>
      </section>

      {/* Program / Aktiviti */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-stone-100 pb-4">
          <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center text-stone-600">
            <Activity className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">Program / Aktiviti 2025</h3>
        </div>

        <div className="p-6 bg-stone-50 border border-stone-100 rounded-2xl max-w-md">
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-black text-stone-700 uppercase">Jumlah Keseluruhan Program</label>
            <span className="text-xs font-bold text-stone-400">Ref 2024: {BPDS_2024_REFERENCE.aktiviti}</span>
          </div>
          <input 
            type="number"
            value={formData.bpds.aktiviti}
            onChange={(e) => handleBpdsSimpleChange('aktiviti', e.target.value)}
            className="w-full p-4 bg-white border border-stone-200 rounded-2xl text-lg font-black text-stone-800 focus:ring-4 focus:ring-stone-500/10 outline-none"
          />
        </div>
        
        <div className="mt-6 p-4 bg-stone-100 border border-stone-200 rounded-xl flex items-start gap-3">
          <Info className="w-5 h-5 text-stone-500 shrink-0" />
          <p className="text-[10px] text-stone-600 leading-relaxed font-medium">
            Sila masukkan jumlah keseluruhan program atau aktiviti yang telah dilaksanakan oleh Bahagian Pendakwaan sepanjang tahun 2025.
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

export default BpdsForm;
