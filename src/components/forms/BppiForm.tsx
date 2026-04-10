import React, { useEffect, useMemo } from 'react';
import { getTodayIsoMY } from '../../utils/dateFormat';
import FormLayout from './FormLayout';
import { BasicInfoSection, NarrativeSection, LawatanSection } from './CommonSections';
import { useFormLogic } from './useFormLogic';
import { BPPI_2024_REFERENCE } from '../../constants';
import { 
  BookOpen, 
  School, 
  Users, 
  GraduationCap, 
  BarChart3,
  MapPin,
  Calculator
} from 'lucide-react';

interface BppiFormProps {
  deptName: string;
  onBack: () => void;
}

const BppiForm: React.FC<BppiFormProps> = ({ deptName, onBack }) => {
  const upkkTrendDefaults = [
    { year: '2019', calon: '12754', gps: '2.08' },
    { year: '2020', calon: '25075', gps: '1.83' },
    { year: '2021', calon: '25075', gps: '1.83' },
    { year: '2022', calon: '13172', gps: '2.28' },
    { year: '2023', calon: '12686', gps: '2.28' },
    { year: '2024', calon: String(BPPI_2024_REFERENCE.kafa.upkk.calon), gps: String(BPPI_2024_REFERENCE.kafa.upkk.gps) },
    { year: '2025', calon: '', gps: '' },
  ];

  const initialState = {
    tarikh: getTodayIsoMY(),
    disediakanOleh: '',
    jawatan: '',
    ringkasan: '',
    isu: '',
    cadangan: '',
    lawatan: [],
    bppi: {
      institusi: {
        mis: { rendah: '', menengah: '' },
        ipip: {
          tadika: '', kafa: '', srar: '', sra: '', sma: '',
          tahfizRendah: '', tahfizMenengah: '', tahfizRendahMenengah: '',
          pondok: '', lepasanSpm: '', dewasa: ''
        }
      },
      enrolmenMIS: BPPI_2024_REFERENCE.enrolmenMIS.map(s => ({ name: s.name, value: '' })),
      kafa: {
        pelajar: '', guru: '', penyelia: '',
        upkk: { calon: '', gps: '' },
        trendUPKK: upkkTrendDefaults
      },
      kad: {
        guruLelaki: '', guruWanita: '',
        pecahan: BPPI_2024_REFERENCE.kad.pecahan.map(p => ({ name: p.name, kelas: '', pelajar: '' }))
      }
    }
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

  // Auto-sum Institusi
  const institusiTotals = useMemo(() => {
    const misTotal = (parseInt(formData.bppi?.institusi?.mis?.rendah) || 0) + 
                     (parseInt(formData.bppi?.institusi?.mis?.menengah) || 0);
    
    const ipip = formData.bppi?.institusi?.ipip || {};
    const ipipTotal = Object.values(ipip).reduce((acc: number, val: any) => acc + (parseInt(val) || 0), 0);
    
    return { misTotal, ipipTotal, grandTotal: misTotal + ipipTotal };
  }, [formData.bppi?.institusi]);

  // Auto-sum Enrolmen MIS
  const totalEnrolmenMIS = useMemo(() => {
    return (formData.bppi?.enrolmenMIS || []).reduce((acc: number, s: any) => acc + (parseInt(s.value) || 0), 0);
  }, [formData.bppi?.enrolmenMIS]);

  // Auto-sum KAD
  const kadTotals = useMemo(() => {
    const totalKelas = (formData.bppi?.kad?.pecahan || []).reduce((acc: number, p: any) => acc + (parseInt(p.kelas) || 0), 0);
    const totalPelajar = (formData.bppi?.kad?.pecahan || []).reduce((acc: number, p: any) => acc + (parseInt(p.pelajar) || 0), 0);
    const totalGuru = (parseInt(formData.bppi?.kad?.guruLelaki) || 0) + (parseInt(formData.bppi?.kad?.guruWanita) || 0);
    return { totalKelas, totalPelajar, totalGuru };
  }, [formData.bppi?.kad]);

  const updateBppi = (path: string[], value: any) => {
    setFormData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      if (!newData.bppi) newData.bppi = initialState.bppi;
      
      let current = newData.bppi;
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {};
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newData;
    });
  };

  const updateArrayItem = (arrayPath: string[], index: number, field: string, value: any) => {
    setFormData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      if (!newData.bppi) newData.bppi = initialState.bppi;
      
      let current = newData.bppi;
      for (let i = 0; i < arrayPath.length; i++) {
        if (!current[arrayPath[i]]) current[arrayPath[i]] = [];
        current = current[arrayPath[i]];
      }
      if (current[index]) {
        current[index] = { ...current[index], [field]: value };
      }
      return newData;
    });
  };

  const updateUpkkSummary = (field: 'calon' | 'gps', value: string) => {
    setFormData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      if (!newData.bppi) newData.bppi = initialState.bppi;

      newData.bppi.kafa.upkk[field] = value;
      const trendList = newData.bppi.kafa.trendUPKK || [];
      const idx2025 = trendList.findIndex((item: any) => item.year === '2025');
      if (idx2025 >= 0) {
        trendList[idx2025][field] = value;
      }

      return newData;
    });
  };

  const updateUpkkTrend = (index: number, field: 'calon' | 'gps', value: string) => {
    setFormData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      if (!newData.bppi) newData.bppi = initialState.bppi;

      const trendList = newData.bppi.kafa.trendUPKK || [];
      if (trendList[index]) {
        trendList[index][field] = value;
        if (trendList[index].year === '2025') {
          newData.bppi.kafa.upkk[field] = value;
        }
      }

      return newData;
    });
  };

  if (!formData.bppi) return null;

  return (
    <FormLayout deptName={deptName} onBack={onBack} onSave={handleSave} isSaving={isSaving} isAutoSaving={isAutoSaving} showSuccess={showSuccess} saveError={saveError} formData={formData}>
      <BasicInfoSection formData={formData} handleInputChange={handleInputChange} />

      <div className="space-y-8 animate-fade-in mt-8">
        {/* 1. Institusi Pendidikan Islam */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-zus-900 p-4 flex items-center gap-3">
            <School className="w-5 h-5 text-zus-gold" />
            <h3 className="text-white font-bold">1. Institusi Pendidikan Islam 2025</h3>
          </div>
          <div className="p-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* MIS */}
              <div className="space-y-4">
                <h4 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">Sekolah Agama MIS</h4>
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                  <table className="w-full min-w-[440px] text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-[10px] font-black uppercase text-gray-500">Perkara</th>
                        <th className="px-4 py-3 text-center text-[10px] font-black uppercase text-gray-500">Rujukan 2024</th>
                        <th className="px-4 py-3 text-left text-[10px] font-black uppercase text-zus-900">Input 2025</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-4 py-3 text-xs font-bold text-gray-600">Sekolah Rendah</td>
                        <td className="px-4 py-3 text-center text-xs font-black text-gray-500">{BPPI_2024_REFERENCE.institusi.mis.rendah}</td>
                        <td className="px-4 py-3">
                          <input type="number" value={formData.bppi.institusi.mis.rendah} onChange={(e) => updateBppi(['institusi', 'mis', 'rendah'], e.target.value)} className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none" />
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-xs font-bold text-gray-600">Sekolah Menengah</td>
                        <td className="px-4 py-3 text-center text-xs font-black text-gray-500">{BPPI_2024_REFERENCE.institusi.mis.menengah}</td>
                        <td className="px-4 py-3">
                          <input type="number" value={formData.bppi.institusi.mis.menengah} onChange={(e) => updateBppi(['institusi', 'mis', 'menengah'], e.target.value)} className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none" />
                        </td>
                      </tr>
                      <tr className="bg-zus-900/5">
                        <td className="px-4 py-3 text-xs font-black text-zus-900">JUMLAH MIS</td>
                        <td className="px-4 py-3 text-center text-xs font-black text-gray-600">{BPPI_2024_REFERENCE.institusi.mis.total}</td>
                        <td className="px-4 py-3 text-center">
                          <div className="inline-block px-3 py-2 bg-zus-900 text-zus-gold rounded-lg text-xs font-black">{institusiTotals.misTotal}</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* IPIP */}
              <div className="space-y-4">
                <h4 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">Institusi Persendirian (IPIP)</h4>
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                  <table className="w-full min-w-[500px] text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-[10px] font-black uppercase text-gray-500">Kategori</th>
                        <th className="px-4 py-3 text-center text-[10px] font-black uppercase text-gray-500">Rujukan 2024</th>
                        <th className="px-4 py-3 text-left text-[10px] font-black uppercase text-zus-900">Input 2025</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        { label: 'Tadika Islam', field: 'tadika', ref: BPPI_2024_REFERENCE.institusi.ipip.tadika },
                        { label: 'Sekolah Agama Rakyat (KAFA)', field: 'kafa', ref: BPPI_2024_REFERENCE.institusi.ipip.kafa },
                        { label: 'Sekolah Rendah Agama Rakyat (SRAR)', field: 'srar', ref: BPPI_2024_REFERENCE.institusi.ipip.srar },
                        { label: 'Sekolah Rendah Agama', field: 'sra', ref: BPPI_2024_REFERENCE.institusi.ipip.sra },
                        { label: 'Sekolah Menengah Agama', field: 'sma', ref: BPPI_2024_REFERENCE.institusi.ipip.sma },
                        { label: 'Tahfiz Rendah', field: 'tahfizRendah', ref: BPPI_2024_REFERENCE.institusi.ipip.tahfizRendah },
                        { label: 'Tahfiz Menengah', field: 'tahfizMenengah', ref: BPPI_2024_REFERENCE.institusi.ipip.tahfizMenengah },
                        { label: 'Tahfiz Rendah & Menengah', field: 'tahfizRendahMenengah', ref: BPPI_2024_REFERENCE.institusi.ipip.tahfizRendahMenengah },
                        { label: 'Pondok', field: 'pondok', ref: BPPI_2024_REFERENCE.institusi.ipip.pondok },
                        { label: 'Lepasan SPM', field: 'lepasanSpm', ref: BPPI_2024_REFERENCE.institusi.ipip.lepasanSpm },
                        { label: 'Kelas Dewasa', field: 'dewasa', ref: BPPI_2024_REFERENCE.institusi.ipip.dewasa },
                      ].map(item => (
                        <tr key={item.field}>
                          <td className="px-4 py-3 text-[10px] font-bold text-gray-600">{item.label}</td>
                          <td className="px-4 py-3 text-center text-[10px] font-black text-gray-500">{item.ref}</td>
                          <td className="px-4 py-3">
                            <input type="number" value={formData.bppi.institusi.ipip[item.field]} onChange={(e) => updateBppi(['institusi', 'ipip', item.field], e.target.value)} className="w-full p-1.5 bg-gray-50 border border-gray-200 rounded text-xs font-bold text-center focus:ring-1 focus:ring-zus-gold/20 outline-none" />
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-zus-900/5">
                        <td className="px-4 py-3 text-xs font-black text-zus-900">JUMLAH IPIP</td>
                        <td className="px-4 py-3 text-center text-xs font-black text-gray-600">{BPPI_2024_REFERENCE.institusi.ipip.total}</td>
                        <td className="px-4 py-3 text-center">
                          <div className="inline-block p-2 bg-zus-900 text-zus-gold rounded-lg text-xs font-black">{institusiTotals.ipipTotal}</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-zus-gold/10 border border-zus-gold/20 rounded-xl flex justify-between items-center">
              <span className="text-sm font-black text-zus-900 uppercase">Jumlah Besar Institusi</span>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-gray-500">Rujukan 2024: {BPPI_2024_REFERENCE.institusi.grandTotal}</span>
                <div className="px-6 py-2 bg-zus-900 text-zus-gold rounded-xl text-lg font-black">{institusiTotals.grandTotal}</div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Enrolmen Pelajar Sekolah Agama MIS */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-zus-900 p-4 flex items-center gap-3">
            <Users className="w-5 h-5 text-zus-gold" />
            <h3 className="text-white font-bold">2. Enrolmen Pelajar Sekolah Agama MIS 2025</h3>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full min-w-[540px] text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase text-gray-500">Sekolah</th>
                    <th className="px-4 py-3 text-center text-[10px] font-black uppercase text-gray-500">Rujukan 2024</th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase text-zus-900">Input 2025</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {formData.bppi.enrolmenMIS.map((school: any, idx: number) => (
                    <tr key={school.name}>
                      <td className="px-4 py-3 text-[10px] font-black text-zus-900 uppercase leading-tight">{school.name}</td>
                      <td className="px-4 py-3 text-center text-[10px] font-black text-gray-500">{BPPI_2024_REFERENCE.enrolmenMIS[idx].value}</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={school.value}
                          onChange={(e) => updateArrayItem(['enrolmenMIS'], idx, 'value', e.target.value)}
                          className="w-full max-w-[130px] p-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none"
                          placeholder="0"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 p-4 bg-zus-900 text-zus-gold rounded-2xl flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Calculator className="w-6 h-6" />
                <span className="font-black uppercase tracking-wider">Jumlah Enrolmen Keseluruhan</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-[10px] font-bold opacity-60 uppercase">Tahun 2024</div>
                  <div className="text-sm font-black">{BPPI_2024_REFERENCE.enrolmenMIS.reduce((a,b)=>a+b.value,0).toLocaleString()}</div>
                </div>
                <div className="h-10 w-px bg-zus-gold/20"></div>
                <div className="text-right">
                  <div className="text-[10px] font-bold opacity-60 uppercase">Tahun 2025</div>
                  <div className="text-2xl font-black">{totalEnrolmenMIS.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Kelas al-Quran dan Fardu Ain (KAFA) */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-zus-900 p-4 flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-zus-gold" />
            <h3 className="text-white font-bold">3. Kelas al-Quran dan Fardu Ain (KAFA)</h3>
          </div>
          <div className="p-6 space-y-8">
            <div className="overflow-x-auto rounded-xl border border-blue-100">
              <table className="w-full min-w-[500px] text-sm">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase text-blue-800">Perkara</th>
                    <th className="px-4 py-3 text-center text-[10px] font-black uppercase text-blue-800">Rujukan 2024</th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase text-blue-900">Input 2025</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-100">
              {[
                { label: 'Bilangan Pelajar', field: 'pelajar', ref: BPPI_2024_REFERENCE.kafa.pelajar },
                { label: 'Bilangan Guru', field: 'guru', ref: BPPI_2024_REFERENCE.kafa.guru },
                { label: 'Bilangan Penyelia', field: 'penyelia', ref: BPPI_2024_REFERENCE.kafa.penyelia },
              ].map(item => (
                <tr key={item.field}>
                  <td className="px-4 py-3 text-xs font-black text-blue-900">{item.label}</td>
                  <td className="px-4 py-3 text-center text-xs font-black text-blue-500">{item.ref.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <input type="number" value={formData.bppi.kafa[item.field]} onChange={(e) => updateBppi(['kafa', item.field], e.target.value)} className="w-full max-w-[130px] p-2 bg-white border border-blue-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-blue-500 outline-none" />
                  </td>
                </tr>
              ))}
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-amber-200 pb-2">
                <GraduationCap className="w-5 h-5 text-amber-600" />
                <h4 className="text-sm font-black text-amber-900 uppercase">Statistik UPKK 2025</h4>
              </div>
              <div className="overflow-x-auto rounded-xl border border-amber-100">
                <table className="w-full min-w-[470px] text-sm">
                  <thead className="bg-amber-100/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-[10px] font-black uppercase text-amber-800">Perkara</th>
                      <th className="px-4 py-3 text-center text-[10px] font-black uppercase text-amber-800">Rujukan 2024</th>
                      <th className="px-4 py-3 text-left text-[10px] font-black uppercase text-amber-900">Input 2025</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-100">
                    <tr>
                      <td className="px-4 py-3 text-xs font-black text-amber-900">Bilangan Calon</td>
                      <td className="px-4 py-3 text-center text-xs font-black text-amber-600">{BPPI_2024_REFERENCE.kafa.upkk.calon.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <input type="number" value={formData.bppi.kafa.upkk.calon} onChange={(e) => updateUpkkSummary('calon', e.target.value)} className="w-full p-2 bg-white border border-amber-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-amber-500 outline-none" />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-xs font-black text-amber-900">Gred Purata Skor (GPS)</td>
                      <td className="px-4 py-3 text-center text-xs font-black text-amber-600">{BPPI_2024_REFERENCE.kafa.upkk.gps}</td>
                      <td className="px-4 py-3">
                        <input type="text" value={formData.bppi.kafa.upkk.gps} onChange={(e) => updateUpkkSummary('gps', e.target.value)} className="w-full p-2 bg-white border border-amber-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-amber-500 outline-none" placeholder="0.00" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white border border-amber-100 rounded-2xl p-4 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-[10px] font-black text-amber-900 uppercase">Trend Tahunan UPKK (2019 - 2025)</h4>
                <button
                  type="button"
                  onClick={() => handleSave()}
                  disabled={isSaving}
                  className="rounded-lg bg-amber-500 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? 'Menyimpan...' : 'Simpan Trend'}
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-amber-100">
                      <th className="py-2 text-[9px] font-bold text-amber-600 uppercase">Tahun</th>
                      <th className="py-2 text-[9px] font-bold text-amber-600 uppercase text-center">Bil. Calon</th>
                      <th className="py-2 text-[9px] font-bold text-amber-600 uppercase text-center">GPS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.bppi.kafa.trendUPKK.map((t: any, idx: number) => {
                      const calonEditable = t.year === '2024' || t.year === '2025';
                      const gpsEditable = t.year === '2024' || t.year === '2025';

                      return (
                      <tr key={t.year} className="border-b border-amber-50 last:border-0">
                        <td className="py-2 text-[10px] font-bold text-zus-900">{t.year}</td>
                        <td className="py-2">
                          <input
                            type="number"
                            value={t.calon}
                            onChange={(e) => updateUpkkTrend(idx, 'calon', e.target.value)}
                            readOnly={!calonEditable}
                            disabled={!calonEditable}
                            className={`w-full p-1 rounded text-[10px] font-bold text-center outline-none ${
                              calonEditable
                                ? 'bg-white border border-amber-200 focus:ring-1 focus:ring-amber-500'
                                : 'bg-amber-50 border border-amber-100 text-amber-900/80 cursor-not-allowed'
                            }`}
                          />
                        </td>
                        <td className="py-2">
                          <input
                            type="number"
                            step="0.01"
                            value={t.gps}
                            onChange={(e) => updateUpkkTrend(idx, 'gps', e.target.value)}
                            readOnly={!gpsEditable}
                            disabled={!gpsEditable}
                            className={`w-full p-1 rounded text-[10px] font-bold text-center outline-none ${
                              gpsEditable
                                ? 'bg-white border border-amber-200 focus:ring-1 focus:ring-amber-500'
                                : 'bg-amber-50 border border-amber-100 text-amber-900/80 cursor-not-allowed'
                            }`}
                            placeholder="0.00"
                          />
                        </td>
                      </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Kelas Agama Dewasa (KAD) */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-zus-900 p-4 flex items-center gap-3">
            <Users className="w-5 h-5 text-zus-gold" />
            <h3 className="text-white font-bold">4. Kelas Agama Dewasa (KAD) 2025</h3>
          </div>
          <div className="p-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                <h4 className="text-xs font-black text-zus-900 uppercase">Pecahan Guru KAD</h4>
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                  <table className="w-full min-w-[430px] text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-[10px] font-black uppercase text-gray-500">Jantina</th>
                        <th className="px-4 py-3 text-center text-[10px] font-black uppercase text-gray-500">Rujukan 2024</th>
                        <th className="px-4 py-3 text-left text-[10px] font-black uppercase text-zus-900">Input 2025</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-4 py-3 text-xs font-bold text-gray-600">Lelaki</td>
                        <td className="px-4 py-3 text-center text-xs font-black text-gray-500">{BPPI_2024_REFERENCE.kad.guru.lelaki}</td>
                        <td className="px-4 py-3"><input type="number" value={formData.bppi.kad.guruLelaki} onChange={(e) => updateBppi(['kad', 'guruLelaki'], e.target.value)} className="w-full p-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none" /></td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-xs font-bold text-gray-600">Wanita</td>
                        <td className="px-4 py-3 text-center text-xs font-black text-gray-500">{BPPI_2024_REFERENCE.kad.guru.wanita}</td>
                        <td className="px-4 py-3"><input type="number" value={formData.bppi.kad.guruWanita} onChange={(e) => updateBppi(['kad', 'guruWanita'], e.target.value)} className="w-full p-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none" /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-xs font-black text-zus-900">JUMLAH GURU</span>
                  <div className="px-4 py-1 bg-zus-900 text-zus-gold rounded-lg text-xs font-black">{kadTotals.totalGuru}</div>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-4">
                <div className="p-4 bg-zus-gold/10 border border-zus-gold/20 rounded-2xl flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-zus-900" />
                    <span className="text-xs font-black text-zus-900 uppercase">Jumlah Keseluruhan Kelas</span>
                  </div>
                  <span className="text-xl font-black text-zus-900">{kadTotals.totalKelas}</span>
                </div>
                <div className="p-4 bg-zus-900 text-zus-gold rounded-2xl flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5" />
                    <span className="text-xs font-black uppercase">Jumlah Keseluruhan Pelajar</span>
                  </div>
                  <span className="text-xl font-black">{kadTotals.totalPelajar}</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Bahagian</th>
                    <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Rujukan 2024 (Kelas)</th>
                    <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Input 2025 (Kelas)</th>
                    <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Rujukan 2024 (Pelajar)</th>
                    <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Input 2025 (Pelajar)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {formData.bppi.kad.pecahan.map((p: any, idx: number) => (
                    <tr key={p.name} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-zus-gold" />
                          <span className="text-xs font-bold text-zus-900">{p.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center text-xs font-black text-gray-500">{BPPI_2024_REFERENCE.kad.pecahan[idx].kelas}</td>
                      <td className="p-4 text-center"><input type="number" value={p.kelas} onChange={(e) => updateArrayItem(['kad', 'pecahan'], idx, 'kelas', e.target.value)} className="w-20 p-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none" /></td>
                      <td className="p-4 text-center text-xs font-black text-gray-500">{BPPI_2024_REFERENCE.kad.pecahan[idx].pelajar}</td>
                      <td className="p-4 text-center"><input type="number" value={p.pelajar} onChange={(e) => updateArrayItem(['kad', 'pecahan'], idx, 'pelajar', e.target.value)} className="w-20 p-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
      </div>
    </FormLayout>
  );
};

export default BppiForm;
