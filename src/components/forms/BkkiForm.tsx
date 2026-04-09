import React, { useEffect, useMemo } from 'react';
import FormLayout from './FormLayout';
import { BasicInfoSection, NarrativeSection, LawatanSection } from './CommonSections';
import { useFormLogic } from './useFormLogic';
import { BKKI_2024_REFERENCE } from '../../constants';
import { 
  Heart, 
  UserMinus, 
  UserPlus, 
  CreditCard, 
  Users, 
  Calendar,
  Calculator,
  Info
} from 'lucide-react';

interface BkkiFormProps {
  deptName: string;
  onBack: () => void;
}

const REGIONS = [
  'Seluruh Sarawak',
  'Kuching',
  'Samarahan',
  'Serian',
  'Sri Aman',
  'Betong',
  'Sarikei',
  'Sibu',
  'Kapit',
  'Mukah/ Daro',
  'Bintulu',
  'Miri',
  'Limbang/ Lawas'
];

const BkkiForm: React.FC<BkkiFormProps> = ({ deptName, onBack }) => {
  const initialState = {
    tarikh: new Date().toISOString().split('T')[0],
    disediakanOleh: '',
    jawatan: '',
    ringkasan: '',
    isu: '',
    cadangan: '',
    lawatan: [],
    stats: {
      bilPerkahwinan: '',
      bilPerceraian: '',
      bilRuju: '',
      bilKadNikah: '',
      jumPesertaKursus: '',
      bilProgram: ''
    },
    registrarTable: REGIONS.map(region => ({
      region,
      kpncr: '',
      pncr: '',
      tpncr: '',
      ppncr: '',
      jurunikah: ''
    }))
  };

  const {
    formData,
    setFormData,
    isSaving,
    showSuccess,
    saveError,
    handleInputChange,
    handleSave,
    addLawatan,
    removeLawatan,
    updateLawatan
  } = useFormLogic(deptName, initialState);

  const updateStat = (field: string, value: string) => {
    const numValue = value === '' ? '' : Math.max(0, parseInt(value) || 0).toString();
    setFormData((prev: any) => ({
      ...prev,
      stats: {
        ...prev.stats,
        [field]: numValue
      }
    }));
  };

  const updateRegistrar = (index: number, field: string, value: string) => {
    const numValue = value === '' ? '' : Math.max(0, parseInt(value) || 0).toString();
    setFormData((prev: any) => {
      const newTable = [...prev.registrarTable];
      newTable[index] = { ...newTable[index], [field]: numValue };
      return {
        ...prev,
        registrarTable: newTable
      };
    });
  };

  // Calculate totals
  const tableWithTotals = useMemo(() => {
    const rows = formData.registrarTable.map((row: any) => {
      const total = (parseInt(row.kpncr) || 0) + 
                    (parseInt(row.pncr) || 0) + 
                    (parseInt(row.tpncr) || 0) + 
                    (parseInt(row.ppncr) || 0) + 
                    (parseInt(row.jurunikah) || 0);
      return { ...row, total };
    });

    const colTotals = {
      region: 'JUMLAH',
      kpncr: rows.reduce((acc: number, row: any) => acc + (parseInt(row.kpncr) || 0), 0),
      pncr: rows.reduce((acc: number, row: any) => acc + (parseInt(row.pncr) || 0), 0),
      tpncr: rows.reduce((acc: number, row: any) => acc + (parseInt(row.tpncr) || 0), 0),
      ppncr: rows.reduce((acc: number, row: any) => acc + (parseInt(row.ppncr) || 0), 0),
      jurunikah: rows.reduce((acc: number, row: any) => acc + (parseInt(row.jurunikah) || 0), 0),
      total: rows.reduce((acc: number, row: any) => acc + row.total, 0)
    };

    return { rows, colTotals };
  }, [formData.registrarTable]);

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

      {/* Statistik Utama Section */}
      <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zus-900">Statistik Utama Munakahat 2025</h3>
            <p className="text-xs text-gray-400 font-medium">Ringkasan Pendaftaran & Aktiviti</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Perkahwinan */}
          <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-emerald-600" />
                <label className="text-[10px] font-black text-emerald-900 uppercase">Perkahwinan Didaftar</label>
              </div>
              <span className="text-[9px] font-bold text-emerald-400">Ref 24: {BKKI_2024_REFERENCE.stats.bilPerkahwinan}</span>
            </div>
            <input
              type="number"
              value={formData.stats.bilPerkahwinan}
              onChange={(e) => updateStat('bilPerkahwinan', e.target.value)}
              className="w-full p-2.5 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-sm"
              placeholder="0"
            />
          </div>

          {/* Perceraian */}
          <div className="p-5 bg-rose-50 border border-rose-100 rounded-2xl space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <UserMinus className="w-4 h-4 text-rose-600" />
                <label className="text-[10px] font-black text-rose-900 uppercase">Perceraian Didaftar</label>
              </div>
              <span className="text-[9px] font-bold text-rose-400">Ref 24: {BKKI_2024_REFERENCE.stats.bilPerceraian}</span>
            </div>
            <input
              type="number"
              value={formData.stats.bilPerceraian}
              onChange={(e) => updateStat('bilPerceraian', e.target.value)}
              className="w-full p-2.5 bg-white border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none font-bold text-sm"
              placeholder="0"
            />
          </div>

          {/* Ruju' */}
          <div className="p-5 bg-teal-50 border border-teal-100 rounded-2xl space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-teal-600" />
                <label className="text-[10px] font-black text-teal-900 uppercase">Ruju' Didaftar</label>
              </div>
              <span className="text-[9px] font-bold text-teal-400">Ref 24: {BKKI_2024_REFERENCE.stats.bilRuju}</span>
            </div>
            <input
              type="number"
              value={formData.stats.bilRuju}
              onChange={(e) => updateStat('bilRuju', e.target.value)}
              className="w-full p-2.5 bg-white border border-teal-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none font-bold text-sm"
              placeholder="0"
            />
          </div>

          {/* Kad Nikah */}
          <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-600" />
                <label className="text-[10px] font-black text-blue-900 uppercase">Kad Nikah Dikeluarkan</label>
              </div>
              <span className="text-[9px] font-bold text-blue-400">Ref 24: {BKKI_2024_REFERENCE.stats.bilKadNikah}</span>
            </div>
            <input
              type="number"
              value={formData.stats.bilKadNikah}
              onChange={(e) => updateStat('bilKadNikah', e.target.value)}
              className="w-full p-2.5 bg-white border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm"
              placeholder="0"
            />
          </div>

          {/* Peserta Kursus */}
          <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-2xl space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" />
                <label className="text-[10px] font-black text-indigo-900 uppercase">Peserta Kursus Pra-Nikah</label>
              </div>
              <span className="text-[9px] font-bold text-indigo-400">Ref 24: {BKKI_2024_REFERENCE.stats.jumPesertaKursus}</span>
            </div>
            <input
              type="number"
              value={formData.stats.jumPesertaKursus}
              onChange={(e) => updateStat('jumPesertaKursus', e.target.value)}
              className="w-full p-2.5 bg-white border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-sm"
              placeholder="0"
            />
          </div>

          {/* Program */}
          <div className="p-5 bg-amber-50 border border-amber-100 rounded-2xl space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-600" />
                <label className="text-[10px] font-black text-amber-900 uppercase">Program / Aktiviti</label>
              </div>
              <span className="text-[9px] font-bold text-amber-400">Ref 24: {BKKI_2024_REFERENCE.stats.bilProgram}</span>
            </div>
            <input
              type="number"
              value={formData.stats.bilProgram}
              onChange={(e) => updateStat('bilProgram', e.target.value)}
              className="w-full p-2.5 bg-white border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none font-bold text-sm"
              placeholder="0"
            />
          </div>
        </div>
      </section>

      {/* Pendaftar & Jurunikah Section */}
      <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zus-900">Jadual Pendaftar & Jurunikah 2025</h3>
            <p className="text-xs text-gray-400 font-medium">Data Keahlian Mengikut Bahagian</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Bahagian</th>
                <th className="py-4 px-2 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">KPNCR</th>
                <th className="py-4 px-2 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">PNCR</th>
                <th className="py-4 px-2 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">TPNCR</th>
                <th className="py-4 px-2 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">PPNCR</th>
                <th className="py-4 px-2 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Jurunikah</th>
                <th className="py-4 px-4 text-[10px] font-black text-teal-600 uppercase tracking-widest text-center bg-teal-50/50">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {formData.registrarTable.map((row: any, idx: number) => (
                <tr key={row.region} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-zus-900 text-xs">{row.region}</td>
                  <td className="py-3 px-2">
                    <input
                      type="number"
                      value={row.kpncr}
                      onChange={(e) => updateRegistrar(idx, 'kpncr', e.target.value)}
                      className="w-16 mx-auto block p-1.5 bg-white border border-gray-200 rounded-lg text-center text-xs font-bold focus:ring-2 focus:ring-teal-500 outline-none"
                      placeholder="0"
                    />
                  </td>
                  <td className="py-3 px-2">
                    <input
                      type="number"
                      value={row.pncr}
                      onChange={(e) => updateRegistrar(idx, 'pncr', e.target.value)}
                      className="w-16 mx-auto block p-1.5 bg-white border border-gray-200 rounded-lg text-center text-xs font-bold focus:ring-2 focus:ring-teal-500 outline-none"
                      placeholder="0"
                    />
                  </td>
                  <td className="py-3 px-2">
                    <input
                      type="number"
                      value={row.tpncr}
                      onChange={(e) => updateRegistrar(idx, 'tpncr', e.target.value)}
                      className="w-16 mx-auto block p-1.5 bg-white border border-gray-200 rounded-lg text-center text-xs font-bold focus:ring-2 focus:ring-teal-500 outline-none"
                      placeholder="0"
                    />
                  </td>
                  <td className="py-3 px-2">
                    <input
                      type="number"
                      value={row.ppncr}
                      onChange={(e) => updateRegistrar(idx, 'ppncr', e.target.value)}
                      className="w-16 mx-auto block p-1.5 bg-white border border-gray-200 rounded-lg text-center text-xs font-bold focus:ring-2 focus:ring-teal-500 outline-none"
                      placeholder="0"
                    />
                  </td>
                  <td className="py-3 px-2">
                    <input
                      type="number"
                      value={row.jurunikah}
                      onChange={(e) => updateRegistrar(idx, 'jurunikah', e.target.value)}
                      className="w-16 mx-auto block p-1.5 bg-white border border-gray-200 rounded-lg text-center text-xs font-bold focus:ring-2 focus:ring-teal-500 outline-none"
                      placeholder="0"
                    />
                  </td>
                  <td className="py-3 px-4 text-center font-black text-teal-700 bg-teal-50/30 text-sm">
                    {tableWithTotals.rows[idx].total}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-teal-600 text-white font-black">
                <td className="py-4 px-4 text-xs uppercase tracking-widest">JUMLAH KESELURUHAN</td>
                <td className="py-4 px-2 text-center text-sm">{tableWithTotals.colTotals.kpncr}</td>
                <td className="py-4 px-2 text-center text-sm">{tableWithTotals.colTotals.pncr}</td>
                <td className="py-4 px-2 text-center text-sm">{tableWithTotals.colTotals.tpncr}</td>
                <td className="py-4 px-2 text-center text-sm">{tableWithTotals.colTotals.ppncr}</td>
                <td className="py-4 px-2 text-center text-sm">{tableWithTotals.colTotals.jurunikah}</td>
                <td className="py-4 px-4 text-center text-base bg-teal-700">{tableWithTotals.colTotals.total}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-start gap-2">
            <Info className="w-3 h-3 text-gray-400 mt-0.5" />
            <div>
              <div className="text-[8px] font-black text-gray-400 uppercase">KPNCR</div>
              <div className="text-[9px] font-medium text-gray-500">Ketua Pendaftar Nikah, Cerai & Ruju'</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Info className="w-3 h-3 text-gray-400 mt-0.5" />
            <div>
              <div className="text-[8px] font-black text-gray-400 uppercase">PNCR</div>
              <div className="text-[9px] font-medium text-gray-500">Pendaftar Nikah, Cerai & Ruju'</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Info className="w-3 h-3 text-gray-400 mt-0.5" />
            <div>
              <div className="text-[8px] font-black text-gray-400 uppercase">TPNCR</div>
              <div className="text-[9px] font-medium text-gray-500">Timbalan Pendaftar Nikah, Cerai & Ruju'</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Info className="w-3 h-3 text-gray-400 mt-0.5" />
            <div>
              <div className="text-[8px] font-black text-gray-400 uppercase">PPNCR</div>
              <div className="text-[9px] font-medium text-gray-500">Penolong Pendaftar Nikah, Cerai & Ruju'</div>
            </div>
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

export default BkkiForm;
