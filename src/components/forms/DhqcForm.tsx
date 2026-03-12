import React, { useMemo } from 'react';
import { 
  Plus, 
  Trash2, 
  BookOpen, 
  Anchor, 
  Users, 
  Gavel,
  Calculator,
  Save,
  ArrowLeft,
  MapPin
} from 'lucide-react';
import FormLayout from './FormLayout';
import { useFormLogic } from './useFormLogic';
import { SARAWAK_DIVISIONS, DHQC_2024_REFERENCE } from '../../constants';

const DhqcForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const {
    formData,
    setFormData,
    handleSave,
    isSaving,
    showSuccess
  } = useFormLogic('DHQC', {
    dhqc: {
      pusatPemuliaan: [],
      statistikDebu: {
        berat: '',
        kekerapan: ''
      },
      guruAlQuran: {
        kuching: '',
        samarahan: '',
        serian: '',
        sriAman: '',
        betong: '',
        sarikei: '',
        sibu: '',
        mukah: '',
        kapit: '',
        bintulu: '',
        miri: '',
        limbang: ''
      },
      penyelia: {
        ibuPejabat: '',
        bintulu: ''
      },
      hakim: {
        negeri: '',
        bahagian: '',
        daerah: ''
      },
      qariQariah: {
        kuching: '',
        samarahan: '',
        serian: '',
        sriAman: '',
        betong: '',
        sarikei: '',
        sibu: '',
        mukah: '',
        kapit: '',
        bintulu: '',
        miri: '',
        limbang: ''
      }
    }
  });

  const handleNestedInputChange = (section: string, subSection: string, field: string, value: string) => {
    const numValue = value === '' ? '' : Math.max(0, parseFloat(value));
    setFormData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subSection]: {
          ...prev[section][subSection],
          [field]: numValue
        }
      }
    }));
  };

  const addPusat = () => {
    setFormData((prev: any) => ({
      ...prev,
      dhqc: {
        ...prev.dhqc,
        pusatPemuliaan: [
          ...prev.dhqc.pusatPemuliaan,
          { lokasi: '', bahagian: '' }
        ]
      }
    }));
  };

  const removePusat = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      dhqc: {
        ...prev.dhqc,
        pusatPemuliaan: prev.dhqc.pusatPemuliaan.filter((_: any, i: number) => i !== index)
      }
    }));
  };

  const updatePusat = (index: number, field: string, value: string) => {
    setFormData((prev: any) => {
      const newList = [...prev.dhqc.pusatPemuliaan];
      newList[index] = { ...newList[index], [field]: value };
      return {
        ...prev,
        dhqc: {
          ...prev.dhqc,
          pusatPemuliaan: newList
        }
      };
    });
  };

  const totalGuru = useMemo(() => {
    return Object.values(formData.dhqc.guruAlQuran).reduce((acc: number, val: any) => acc + (parseFloat(val) || 0), 0);
  }, [formData.dhqc.guruAlQuran]);

  const totalQari = useMemo(() => {
    return Object.values(formData.dhqc.qariQariah).reduce((acc: number, val: any) => acc + (parseFloat(val) || 0), 0);
  }, [formData.dhqc.qariQariah]);

  const totalPenyelia = useMemo(() => {
    return (parseFloat(formData.dhqc.penyelia.ibuPejabat) || 0) + (parseFloat(formData.dhqc.penyelia.bintulu) || 0);
  }, [formData.dhqc.penyelia]);

  const totalHakim = useMemo(() => {
    return (parseFloat(formData.dhqc.hakim.negeri) || 0) + 
           (parseFloat(formData.dhqc.hakim.bahagian) || 0) + 
           (parseFloat(formData.dhqc.hakim.daerah) || 0);
  }, [formData.dhqc.hakim]);

  return (
    <FormLayout
      deptName="Darul Hana Quran Centre (DHQC)"
      onBack={onBack}
      onSave={handleSave}
      isSaving={isSaving}
      showSuccess={showSuccess}
      formData={formData}
    >
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#0a1e3b] p-6 rounded-3xl shadow-lg border-b-4 border-[#c5a065]">
          <p className="text-[#c5a065] text-[10px] font-black uppercase tracking-widest mb-1">Jumlah Guru al-Quran</p>
          <h3 className="text-3xl font-black text-white">{totalGuru}</h3>
          <p className="text-white/40 text-[10px] mt-1">Ref 2024: {DHQC_2024_REFERENCE.guruAlQuran.total}</p>
        </div>
        <div className="bg-[#0a1e3b] p-6 rounded-3xl shadow-lg border-b-4 border-[#c5a065]">
          <p className="text-[#c5a065] text-[10px] font-black uppercase tracking-widest mb-1">Jumlah Qari/Qariah</p>
          <h3 className="text-3xl font-black text-white">{totalQari}</h3>
          <p className="text-white/40 text-[10px] mt-1">Ref 2024: {DHQC_2024_REFERENCE.qariQariah.total}</p>
        </div>
        <div className="bg-[#0a1e3b] p-6 rounded-3xl shadow-lg border-b-4 border-[#c5a065]">
          <p className="text-[#c5a065] text-[10px] font-black uppercase tracking-widest mb-1">Jumlah Hakim</p>
          <h3 className="text-3xl font-black text-white">{totalHakim}</h3>
          <p className="text-white/40 text-[10px] mt-1">Ref 2024: {DHQC_2024_REFERENCE.hakim.total}</p>
        </div>
        <div className="bg-[#0a1e3b] p-6 rounded-3xl shadow-lg border-b-4 border-[#c5a065]">
          <p className="text-[#c5a065] text-[10px] font-black uppercase tracking-widest mb-1">Debu al-Quran (Tan)</p>
          <h3 className="text-3xl font-black text-white">{formData.dhqc.statistikDebu.berat || 0}</h3>
          <p className="text-white/40 text-[10px] mt-1">Ref 2024: {DHQC_2024_REFERENCE.statistikDebu.berat}</p>
        </div>
      </div>

      {/* Pusat Pemuliaan Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-[#0a1e3b]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#c5a065] rounded-xl text-[#0a1e3b]">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight">Pusat Pemuliaan Al-Quran</h3>
          </div>
          <button
            onClick={addPusat}
            className="flex items-center gap-2 px-4 py-2 bg-[#c5a065] text-[#0a1e3b] rounded-xl text-xs font-bold hover:bg-[#b08e56] transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            TAMBAH LOKASI
          </button>
        </div>
        <div className="p-6">
          {formData.dhqc.pusatPemuliaan.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 text-sm font-medium">Tiada lokasi pusat pemuliaan dimasukkan.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.dhqc.pusatPemuliaan.map((item: any, idx: number) => (
                <div key={idx} className="flex gap-4 items-start bg-gray-50 p-4 rounded-2xl group transition-all hover:shadow-md">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 ml-1">Nama Lokasi / Masjid</label>
                      <input
                        type="text"
                        value={item.lokasi}
                        onChange={(e) => updatePusat(idx, 'lokasi', e.target.value)}
                        placeholder="Contoh: Masjid Assyakirin"
                        className="w-full bg-white border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#c5a065] shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 ml-1">Bahagian</label>
                      <select
                        value={item.bahagian}
                        onChange={(e) => updatePusat(idx, 'bahagian', e.target.value)}
                        className="w-full bg-white border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#c5a065] shadow-sm"
                      >
                        <option value="">Pilih Bahagian</option>
                        {SARAWAK_DIVISIONS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => removePusat(idx)}
                    className="mt-6 p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Statistik Debu & Penyelia & Hakim */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Statistik Debu */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 bg-gray-50 border-b border-gray-100 flex items-center gap-3">
            <Anchor className="w-5 h-5 text-[#0a1e3b]" />
            <h3 className="text-sm font-black text-[#0a1e3b] uppercase">Statistik Pemuliaan Debu</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 ml-1">Berat Debu (Tan)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.dhqc.statistikDebu.berat}
                onChange={(e) => handleNestedInputChange('dhqc', 'statistikDebu', 'berat', e.target.value)}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#c5a065]"
                placeholder="0.0"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 ml-1">Kekerapan Pemuliaan</label>
              <input
                type="number"
                min="0"
                value={formData.dhqc.statistikDebu.kekerapan}
                onChange={(e) => handleNestedInputChange('dhqc', 'statistikDebu', 'kekerapan', e.target.value)}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#c5a065]"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Penyelia GAQMIS */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 bg-gray-50 border-b border-gray-100 flex items-center gap-3">
            <Users className="w-5 h-5 text-[#0a1e3b]" />
            <h3 className="text-sm font-black text-[#0a1e3b] uppercase">Penyelia GAQMIS</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 ml-1">Ibu Pejabat</label>
              <input
                type="number"
                min="0"
                value={formData.dhqc.penyelia.ibuPejabat}
                onChange={(e) => handleNestedInputChange('dhqc', 'penyelia', 'ibuPejabat', e.target.value)}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#c5a065]"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 ml-1">Bintulu</label>
              <input
                type="number"
                min="0"
                value={formData.dhqc.penyelia.bintulu}
                onChange={(e) => handleNestedInputChange('dhqc', 'penyelia', 'bintulu', e.target.value)}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#c5a065]"
                placeholder="0"
              />
            </div>
            <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs font-black text-gray-400 uppercase">Jumlah Besar</span>
              <span className="text-lg font-black text-[#0a1e3b]">{totalPenyelia}</span>
            </div>
          </div>
        </div>

        {/* Hakim Majlis Tilawah */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 bg-gray-50 border-b border-gray-100 flex items-center gap-3">
            <Gavel className="w-5 h-5 text-[#0a1e3b]" />
            <h3 className="text-sm font-black text-[#0a1e3b] uppercase">Hakim Majlis Tilawah</h3>
          </div>
          <div className="p-6 space-y-3">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 ml-1">Peringkat Negeri</label>
              <input
                type="number"
                min="0"
                value={formData.dhqc.hakim.negeri}
                onChange={(e) => handleNestedInputChange('dhqc', 'hakim', 'negeri', e.target.value)}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[#c5a065]"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 ml-1">Peringkat Bahagian</label>
              <input
                type="number"
                min="0"
                value={formData.dhqc.hakim.bahagian}
                onChange={(e) => handleNestedInputChange('dhqc', 'hakim', 'bahagian', e.target.value)}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[#c5a065]"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 ml-1">Peringkat Daerah</label>
              <input
                type="number"
                min="0"
                value={formData.dhqc.hakim.daerah}
                onChange={(e) => handleNestedInputChange('dhqc', 'hakim', 'daerah', e.target.value)}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[#c5a065]"
                placeholder="0"
              />
            </div>
            <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs font-black text-gray-400 uppercase">Jumlah Besar</span>
              <span className="text-lg font-black text-[#0a1e3b]">{totalHakim}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Guru & Qari/Qariah Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6 bg-[#0a1e3b] flex items-center gap-3">
          <Calculator className="w-6 h-6 text-[#c5a065]" />
          <h3 className="text-lg font-black text-white uppercase tracking-tight">Pecahan Guru & Qari/Qariah Mengikut Bahagian</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                <th className="px-6 py-4">Bahagian</th>
                <th className="px-6 py-4">Guru al-Quran (GAQMIS)</th>
                <th className="px-6 py-4">Statistik Qari/Qariah</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {SARAWAK_DIVISIONS.map((div) => (
                <tr key={div} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-700">{div}</td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      min="0"
                      value={formData.dhqc.guruAlQuran[div.charAt(0).toLowerCase() + div.slice(1).replace(/\s+/g, '')]}
                      onChange={(e) => handleNestedInputChange('dhqc', 'guruAlQuran', div.charAt(0).toLowerCase() + div.slice(1).replace(/\s+/g, ''), e.target.value)}
                      className="w-24 bg-gray-50 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#c5a065]"
                      placeholder="0"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      min="0"
                      value={formData.dhqc.qariQariah[div.charAt(0).toLowerCase() + div.slice(1).replace(/\s+/g, '')]}
                      onChange={(e) => handleNestedInputChange('dhqc', 'qariQariah', div.charAt(0).toLowerCase() + div.slice(1).replace(/\s+/g, ''), e.target.value)}
                      className="w-24 bg-gray-50 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#c5a065]"
                      placeholder="0"
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-[#0a1e3b] text-white">
                <td className="px-6 py-4 font-black uppercase tracking-widest">Jumlah Keseluruhan</td>
                <td className="px-6 py-4 text-xl font-black text-[#c5a065]">{totalGuru}</td>
                <td className="px-6 py-4 text-xl font-black text-[#c5a065]">{totalQari}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </FormLayout>
  );
};

export default DhqcForm;
