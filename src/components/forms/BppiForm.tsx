import React, { useEffect, useMemo } from 'react';
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
  const initialState = {
    tarikh: new Date().toISOString().split('T')[0],
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
        trendUPKK: [
          { year: '2019', calon: '', gps: '2.08' },
          { year: '2020', calon: '', gps: '1.83' },
          { year: '2021', calon: '', gps: '1.83' },
          { year: '2022', calon: '', gps: '2.28' },
          { year: '2023', calon: '', gps: '2.28' },
          { year: '2024', calon: '', gps: String(BPPI_2024_REFERENCE.kafa.upkk.gps) },
          { year: '2025', calon: '', gps: '' },
        ]
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

  if (!formData.bppi) return null;

  return (
    <FormLayout deptName={deptName} onBack={onBack} onSave={handleSave} isSaving={isSaving} showSuccess={showSuccess} saveError={saveError} formData={formData}>
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
                <div className="space-y-3">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label className="text-xs font-bold text-gray-500">Sekolah Rendah</label>
                    <div className="text-center text-[10px] font-bold text-gray-400 bg-gray-50 py-1 rounded">Ref 24: {BPPI_2024_REFERENCE.institusi.mis.rendah}</div>
                    <input type="number" value={formData.bppi.institusi.mis.rendah} onChange={(e) => updateBppi(['institusi', 'mis', 'rendah'], e.target.value)} className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none" />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label className="text-xs font-bold text-gray-500">Sekolah Menengah</label>
                    <div className="text-center text-[10px] font-bold text-gray-400 bg-gray-50 py-1 rounded">Ref 24: {BPPI_2024_REFERENCE.institusi.mis.menengah}</div>
                    <input type="number" value={formData.bppi.institusi.mis.menengah} onChange={(e) => updateBppi(['institusi', 'mis', 'menengah'], e.target.value)} className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none" />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4 pt-2 border-t border-gray-100">
                    <span className="text-xs font-black text-zus-900">JUMLAH MIS</span>
                    <div className="text-center text-[10px] font-bold text-gray-400">Ref 24: {BPPI_2024_REFERENCE.institusi.mis.total}</div>
                    <div className="p-2 bg-zus-900 text-zus-gold rounded-lg text-xs font-black text-center">{institusiTotals.misTotal}</div>
                  </div>
                </div>
              </div>

              {/* IPIP */}
              <div className="space-y-4">
                <h4 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">Institusi Persendirian (IPIP)</h4>
                <div className="grid grid-cols-1 gap-2">
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
                    <div key={item.field} className="grid grid-cols-3 items-center gap-4">
                      <label className="text-[10px] font-bold text-gray-500 leading-tight">{item.label}</label>
                      <div className="text-center text-[9px] font-bold text-gray-400 bg-gray-50 py-0.5 rounded">Ref 24: {item.ref}</div>
                      <input type="number" value={formData.bppi.institusi.ipip[item.field]} onChange={(e) => updateBppi(['institusi', 'ipip', item.field], e.target.value)} className="p-1 bg-gray-50 border border-gray-200 rounded text-xs font-bold text-center focus:ring-1 focus:ring-zus-gold/20 outline-none" />
                    </div>
                  ))}
                  <div className="grid grid-cols-3 items-center gap-4 pt-2 border-t border-gray-100">
                    <span className="text-xs font-black text-zus-900">JUMLAH IPIP</span>
                    <div className="text-center text-[10px] font-bold text-gray-400">Ref 24: {BPPI_2024_REFERENCE.institusi.ipip.total}</div>
                    <div className="p-2 bg-zus-900 text-zus-gold rounded-lg text-xs font-black text-center">{institusiTotals.ipipTotal}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-zus-gold/10 border border-zus-gold/20 rounded-xl flex justify-between items-center">
              <span className="text-sm font-black text-zus-900 uppercase">Jumlah Besar Institusi</span>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-gray-500">Ref 24: {BPPI_2024_REFERENCE.institusi.grandTotal}</span>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {formData.bppi.enrolmenMIS.map((school: any, idx: number) => (
                <div key={school.name} className="flex items-center justify-between gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex-1">
                    <div className="text-[10px] font-black text-zus-900 uppercase leading-tight">{school.name}</div>
                    <div className="text-[9px] font-bold text-gray-400">Ref 24: {BPPI_2024_REFERENCE.enrolmenMIS[idx].value}</div>
                  </div>
                  <input 
                    type="number" 
                    value={school.value} 
                    onChange={(e) => updateArrayItem(['enrolmenMIS'], idx, 'value', e.target.value)} 
                    className="w-24 p-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none"
                    placeholder="0"
                  />
                </div>
              ))}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Bilangan Pelajar', field: 'pelajar', ref: BPPI_2024_REFERENCE.kafa.pelajar },
                { label: 'Bilangan Guru', field: 'guru', ref: BPPI_2024_REFERENCE.kafa.guru },
                { label: 'Bilangan Penyelia', field: 'penyelia', ref: BPPI_2024_REFERENCE.kafa.penyelia },
              ].map(item => (
                <div key={item.field} className="p-4 bg-blue-50 border border-blue-100 rounded-2xl space-y-2">
                  <label className="text-[10px] font-black text-blue-900 uppercase">{item.label}</label>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-blue-400">Ref 24: {item.ref.toLocaleString()}</span>
                    <input type="number" value={formData.bppi.kafa[item.field]} onChange={(e) => updateBppi(['kafa', item.field], e.target.value)} className="w-24 p-1.5 bg-white border border-blue-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-amber-200 pb-2">
                <GraduationCap className="w-5 h-5 text-amber-600" />
                <h4 className="text-sm font-black text-amber-900 uppercase">Statistik UPKK 2025</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-amber-800 uppercase">Bilangan Calon</label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 text-center text-[10px] font-bold text-amber-500 bg-white py-2 rounded-lg border border-amber-100">Ref 24: {BPPI_2024_REFERENCE.kafa.upkk.calon.toLocaleString()}</div>
                    <input type="number" value={formData.bppi.kafa.upkk.calon} onChange={(e) => updateBppi(['kafa', 'upkk', 'calon'], e.target.value)} className="flex-1 p-2 bg-white border border-amber-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-amber-500 outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-amber-800 uppercase">Gred Purata Skor (GPS)</label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 text-center text-[10px] font-bold text-amber-500 bg-white py-2 rounded-lg border border-amber-100">Ref 24: {BPPI_2024_REFERENCE.kafa.upkk.gps}</div>
                    <input type="text" value={formData.bppi.kafa.upkk.gps} onChange={(e) => updateBppi(['kafa', 'upkk', 'gps'], e.target.value)} className="flex-1 p-2 bg-white border border-amber-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-amber-500 outline-none" placeholder="0.00" />
                  </div>
                </div>
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
                    {formData.bppi.kafa.trendUPKK.map((t: any, idx: number) => (
                      <tr key={t.year} className="border-b border-amber-50 last:border-0">
                        <td className="py-2 text-[10px] font-bold text-zus-900">{t.year}</td>
                        <td className="py-2">
                          <input type="number" value={t.calon} onChange={(e) => updateArrayItem(['kafa', 'trendUPKK'], idx, 'calon', e.target.value)} className="w-full p-1 bg-gray-50 border border-amber-100 rounded text-[10px] font-bold text-center outline-none focus:ring-1 focus:ring-amber-500" />
                        </td>
                        <td className="py-2">
                          <input type="text" value={t.gps} onChange={(e) => updateArrayItem(['kafa', 'trendUPKK'], idx, 'gps', e.target.value)} className="w-full p-1 bg-gray-50 border border-amber-100 rounded text-[10px] font-bold text-center outline-none focus:ring-1 focus:ring-amber-500" placeholder="0.00" />
                        </td>
                      </tr>
                    ))}
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500">Lelaki</label>
                    <input type="number" value={formData.bppi.kad.guruLelaki} onChange={(e) => updateBppi(['kad', 'guruLelaki'], e.target.value)} className="w-full p-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none" />
                    <div className="text-[9px] text-center text-gray-400">Ref 24: {BPPI_2024_REFERENCE.kad.guru.lelaki}</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500">Wanita</label>
                    <input type="number" value={formData.bppi.kad.guruWanita} onChange={(e) => updateBppi(['kad', 'guruWanita'], e.target.value)} className="w-full p-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none" />
                    <div className="text-[9px] text-center text-gray-400">Ref 24: {BPPI_2024_REFERENCE.kad.guru.wanita}</div>
                  </div>
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
                    <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Bilangan Kelas</th>
                    <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Bilangan Pelajar</th>
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
                      <td className="p-4">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-[9px] text-gray-400 font-bold">Ref 24: {BPPI_2024_REFERENCE.kad.pecahan[idx].kelas}</span>
                          <input type="number" value={p.kelas} onChange={(e) => updateArrayItem(['kad', 'pecahan'], idx, 'kelas', e.target.value)} className="w-20 p-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none" />
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-[9px] text-gray-400 font-bold">Ref 24: {BPPI_2024_REFERENCE.kad.pecahan[idx].pelajar}</span>
                          <input type="number" value={p.pelajar} onChange={(e) => updateArrayItem(['kad', 'pecahan'], idx, 'pelajar', e.target.value)} className="w-20 p-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none" />
                        </div>
                      </td>
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
