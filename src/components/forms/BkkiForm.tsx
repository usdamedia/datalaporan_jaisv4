import React, { useEffect, useMemo } from 'react';
import { getTodayIsoMY } from '../../utils/dateFormat';
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
    tarikh: getTodayIsoMY(),
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
    isAutoSaving,
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
      isAutoSaving={isAutoSaving}
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

        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full min-w-[560px] text-sm border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider text-gray-700">Perkara</th>
                <th className="px-4 py-3 text-center text-[11px] font-black uppercase tracking-wider text-gray-700">Rujukan 2024</th>
                <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider text-gray-700">Input 2025</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Perkahwinan Didaftar', key: 'bilPerkahwinan', ref: BKKI_2024_REFERENCE.stats.bilPerkahwinan },
                { label: 'Perceraian Didaftar', key: 'bilPerceraian', ref: BKKI_2024_REFERENCE.stats.bilPerceraian },
                { label: "Ruju' Didaftar", key: 'bilRuju', ref: BKKI_2024_REFERENCE.stats.bilRuju },
                { label: 'Kad Nikah Dikeluarkan', key: 'bilKadNikah', ref: BKKI_2024_REFERENCE.stats.bilKadNikah },
                { label: 'Peserta Kursus Pra-Nikah', key: 'jumPesertaKursus', ref: BKKI_2024_REFERENCE.stats.jumPesertaKursus },
                { label: 'Program / Aktiviti', key: 'bilProgram', ref: BKKI_2024_REFERENCE.stats.bilProgram }
              ].map((item) => (
                <tr key={item.key} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-semibold text-zus-900">{item.label}</td>
                  <td className="px-4 py-3 text-center font-black text-gray-700">{item.ref}</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={formData.stats[item.key as keyof typeof formData.stats]}
                      onChange={(e) => updateStat(item.key, e.target.value)}
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none font-bold text-sm"
                      placeholder="0"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
