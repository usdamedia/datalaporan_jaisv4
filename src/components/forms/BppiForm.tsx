import React, { useEffect, useMemo } from 'react';
import { getTodayIsoMY } from '../../utils/dateFormat';
import FormLayout from './FormLayout';
import { LawatanSection } from './CommonSections';
import { ShieldCheck, Info, FileText } from 'lucide-react';
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

const RO_CLASS = "w-full max-w-[130px] p-2 bg-emerald-50/50 border border-emerald-100 rounded-lg text-xs font-black text-center text-zus-900 cursor-default";
const RO_SM = "w-20 p-1.5 bg-emerald-50/50 border border-emerald-100 rounded-lg text-xs font-black text-center text-zus-900 cursor-default";

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

  // Sync enrolmenMIS array with reference to ensure new schools like SRAMOR are added
  useEffect(() => {
    if (formData.bppi?.enrolmenMIS) {
      if (formData.bppi.enrolmenMIS.length !== BPPI_2024_REFERENCE.enrolmenMIS.length) {
        setFormData((prev: any) => {
          const currentData = prev.bppi.enrolmenMIS || [];
          const newArray = BPPI_2024_REFERENCE.enrolmenMIS.map((refItem) => {
            const existing = currentData.find((d: any) => d.name === refItem.name);
            return existing ? existing : { name: refItem.name, value: '' };
          });
          return {
            ...prev,
            bppi: {
              ...prev.bppi,
              enrolmenMIS: newArray
            }
          };
        });
      }
    }
  }, [formData.bppi?.enrolmenMIS?.length, setFormData]);

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
    <FormLayout deptName={deptName} onBack={onBack} onSave={handleSave} isSaving={isSaving} isAutoSaving={isAutoSaving} showSuccess={showSuccess} saveError={saveError} formData={formData} readOnly={true}>
      {/* Verified Banner */}
      <section className="bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm"><ShieldCheck className="w-6 h-6" /></div>
          <div>
            <h3 className="text-lg font-black text-emerald-900">Data Telah Disahkan & Diverifikasi</h3>
            <p className="text-sm text-emerald-700 font-medium mt-1">Bahagian Pengukuhan Pendidikan Islam (BPPI) telah menyelesaikan proses pengesahan data. Borang ini hanya boleh dilihat sahaja.</p>
          </div>
        </div>
      </section>

      {/* Maklumat Asas (Read-Only) */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm mt-8">
        <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-4"><div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600"><Info className="w-5 h-5" /></div><h3 className="text-lg font-bold text-zus-900">Maklumat Asas</h3></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2"><label className="text-xs font-bold text-gray-500">Tarikh</label><div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-slate-900">{formData.tarikh || '-'}</div></div>
          <div className="space-y-2"><label className="text-xs font-bold text-gray-500">Disediakan Oleh</label><div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-slate-900">{formData.disediakanOleh || '-'}</div></div>
          <div className="space-y-2"><label className="text-xs font-bold text-gray-500">Jawatan</label><div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-slate-900">{formData.jawatan || '-'}</div></div>
        </div>
      </section>

      <div className="space-y-8 animate-fade-in mt-8">
        {/* 1. Institusi Pendidikan Islam */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-zus-900 p-4 flex items-center gap-3">
            <School className="w-5 h-5 text-zus-gold" />
            <h3 className="text-white font-bold">1. Institusi Pendidikan Islam 2025</h3>
          </div>
          <div className="p-6 space-y-8">
            <div className="space-y-8">
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
                          <div className={RO_CLASS}>{formData.bppi.institusi.mis.rendah || '-'}</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-xs font-bold text-gray-600">Sekolah Menengah</td>
                        <td className="px-4 py-3 text-center text-xs font-black text-gray-500">{BPPI_2024_REFERENCE.institusi.mis.menengah}</td>
                        <td className="px-4 py-3">
                          <div className={RO_CLASS}>{formData.bppi.institusi.mis.menengah || '-'}</div>
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
                            <div className="w-full p-1.5 bg-emerald-50/50 border border-emerald-100 rounded text-xs font-black text-center text-zus-900 cursor-default">{formData.bppi.institusi.ipip[item.field] || '-'}</div>
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
                        <div className={RO_CLASS}>{school.value || '-'}</div>
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
                    <div className={RO_CLASS}>{formData.bppi.kafa[item.field] || '-'}</div>
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
                        <div className={RO_CLASS}>{formData.bppi.kafa.upkk.calon || '-'}</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-xs font-black text-amber-900">Gred Purata Skor (GPS)</td>
                      <td className="px-4 py-3 text-center text-xs font-black text-amber-600">{BPPI_2024_REFERENCE.kafa.upkk.gps}</td>
                      <td className="px-4 py-3">
                        <div className={RO_CLASS}>{formData.bppi.kafa.upkk.gps || '-'}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white border border-amber-100 rounded-2xl p-4 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-[10px] font-black text-amber-900 uppercase">Trend Tahunan UPKK (2019 - 2025)</h4>
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
                        <td className="py-2"><div className="w-full p-1 rounded bg-amber-50 border border-amber-100 text-[10px] font-bold text-center text-amber-900/80">{t.calon || '-'}</div></td>
                        <td className="py-2"><div className="w-full p-1 rounded bg-amber-50 border border-amber-100 text-[10px] font-bold text-center text-amber-900/80">{t.gps || '-'}</div></td>
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
                        <td className="px-4 py-3"><div className={RO_CLASS}>{formData.bppi.kad.guruLelaki || '-'}</div></td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-xs font-bold text-gray-600">Wanita</td>
                        <td className="px-4 py-3 text-center text-xs font-black text-gray-500">{BPPI_2024_REFERENCE.kad.guru.wanita}</td>
                        <td className="px-4 py-3"><div className={RO_CLASS}>{formData.bppi.kad.guruWanita || '-'}</div></td>
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
                      <td className="p-4 text-center"><div className={RO_SM}>{p.kelas || '-'}</div></td>
                      <td className="p-4 text-center text-xs font-black text-gray-500">{BPPI_2024_REFERENCE.kad.pecahan[idx].pelajar}</td>
                      <td className="p-4 text-center"><div className={RO_SM}>{p.pelajar || '-'}</div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Ringkasan & Analisis (Read-Only) */}
        <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-4"><div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600"><FileText className="w-5 h-5" /></div><h3 className="text-lg font-bold text-zus-900">Ringkasan & Analisis</h3></div>
          <div className="space-y-6">
            <div className="space-y-2"><label className="text-xs font-bold text-gray-500">Ringkasan pencapaian utama unit tahun 2025</label><div className="w-full min-h-20 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-slate-800 whitespace-pre-wrap">{formData.ringkasan || '-'}</div></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2"><label className="text-xs font-bold text-gray-500">Isu dan cabaran unit</label><div className="w-full min-h-20 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-slate-800 whitespace-pre-wrap">{formData.isu || '-'}</div></div>
              <div className="space-y-2"><label className="text-xs font-bold text-gray-500">Cadangan penambahbaikan</label><div className="w-full min-h-20 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-slate-800 whitespace-pre-wrap">{formData.cadangan || '-'}</div></div>
            </div>
          </div>
        </section>
        
        <LawatanSection 
          formData={formData} 
          addLawatan={() => {}} 
          removeLawatan={() => {}} 
          updateLawatan={() => {}} 
          readOnly
        />
      </div>
    </FormLayout>
  );
};

export default BppiForm;
