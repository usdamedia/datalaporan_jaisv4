import React, { useMemo } from 'react';
import { 
  Zap, 
  Users, 
  FileText, 
  Search, 
  Activity, 
  TrendingUp,
  MapPin,
  Scale,
  AlertCircle,
  ShieldCheck,
  Info
} from 'lucide-react';
import { ResponsiveContainer, Tooltip, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import FormLayout from './FormLayout';
import { useFormLogic } from './useFormLogic';
import { LawatanSection } from './CommonSections';
import { BPKS_2024_REFERENCE } from '../../constants';

const RO = "w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 text-sm font-black text-teal-800 cursor-default";

const BpksForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const {
    formData,
    setFormData,
    handleSave,
    isSaving,
    isAutoSaving,
    showSuccess,
    saveError,
    handleInputChange,
    addLawatan,
    updateLawatan,
    removeLawatan
  } = useFormLogic('BPKS', {
    bpks: {
      statistik: {
        btam: '',
        rondaan: '',
        operasi: ''
      },
      pegawai: {
        ibuPejabat: '',
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
      borang5: {
        bahagian: {
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
        kategori: {
          matrimoni: '',
          jenayahSyariah: ''
        }
      },
      kertasSiasatan: {
        matrimoni: '',
        jenayahSyariah: ''
      },
      aktiviti: {
        total: ''
      }
    }
  });

  const handleNestedInputChange = (section: string, subSection: string, field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subSection]: {
          ...prev[section][subSection],
          [field]: value
        }
      }
    }));
  };

  const handleDeepNestedInputChange = (section: string, subSection: string, subSubSection: string, field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subSection]: {
          ...prev[section][subSection],
          [subSubSection]: {
            ...prev[section][subSection][subSubSection],
            [field]: value
          }
        }
      }
    }));
  };

  // Auto-sum for Pegawai
  const totalPegawai = useMemo(() => {
    return Object.values(formData.bpks.pegawai).reduce((acc: number, val: any) => acc + (parseInt(val) || 0), 0);
  }, [formData.bpks.pegawai]);

  // Auto-sum for Borang 5 Bahagian
  const totalBorang5Bahagian = useMemo(() => {
    return Object.values(formData.bpks.borang5.bahagian).reduce((acc: number, val: any) => acc + (parseInt(val) || 0), 0);
  }, [formData.bpks.borang5.bahagian]);

  // Auto-sum for Borang 5 Kategori
  const totalBorang5Kategori = useMemo(() => {
    return (parseInt(formData.bpks.borang5.kategori.matrimoni) || 0) + (parseInt(formData.bpks.borang5.kategori.jenayahSyariah) || 0);
  }, [formData.bpks.borang5.kategori]);

  // Validation for Borang 5
  const isBorang5Valid = totalBorang5Bahagian === totalBorang5Kategori;

  // Chart Data
  const borang5ChartData = [
    { name: 'Matrimoni', value: parseInt(formData.bpks.borang5.kategori.matrimoni) || 0 },
    { name: 'Jenayah Syariah', value: parseInt(formData.bpks.borang5.kategori.jenayahSyariah) || 0 }
  ];

  const ipChartData = [
    { name: 'Matrimoni', value: parseInt(formData.bpks.kertasSiasatan.matrimoni) || 0 },
    { name: 'Jenayah Syariah', value: parseInt(formData.bpks.kertasSiasatan.jenayahSyariah) || 0 }
  ];

  const COLORS = ['#0D9488', '#2DD4BF', '#134E4A', '#5EEAD4'];
  const formatLabel = (value: string) => value.replace(/([A-Z])/g, ' $1').trim();
  const pegawaiLocations = Object.keys(formData.bpks.pegawai) as string[];

  const customTooltipStyle = { borderRadius: '14px', border: '1px solid #ccfbf1', boxShadow: '0 10px 30px rgba(13,148,136,0.10)', fontSize: '12px', fontWeight: 700 };

  return (
    <FormLayout
      deptName="Bahagian Penguatkuasaan Syariah (BPKS)"
      onBack={onBack}
      onSave={handleSave}
      isSaving={isSaving}
      isAutoSaving={isAutoSaving}
      showSuccess={showSuccess}
      saveError={saveError}
      formData={formData}
      readOnly={true}
    >
      {/* Verified Banner */}
      <section className="bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm"><ShieldCheck className="w-6 h-6" /></div>
          <div>
            <h3 className="text-lg font-black text-emerald-900">Data Telah Disahkan & Diverifikasi</h3>
            <p className="text-sm text-emerald-700 font-medium mt-1">Bahagian Penguatkuasaan Syariah (BPKS) telah menyelesaikan proses pengesahan data. Borang ini hanya boleh dilihat sahaja.</p>
          </div>
        </div>
      </section>

      {/* Maklumat Asas (Read-Only) */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-4"><div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600"><Info className="w-5 h-5" /></div><h3 className="text-lg font-bold text-gray-900">Maklumat Asas</h3></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2"><label className="text-xs font-bold text-gray-500">Tarikh</label><div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-slate-900">{formData.tarikh || '-'}</div></div>
          <div className="space-y-2"><label className="text-xs font-bold text-gray-500">Disediakan Oleh</label><div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-slate-900">{formData.disediakanOleh || '-'}</div></div>
          <div className="space-y-2"><label className="text-xs font-bold text-gray-500">Jawatan</label><div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-slate-900">{formData.jawatan || '-'}</div></div>
        </div>
      </section>
      
      {/* 1. Statistik Ringkasan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-teal-100 hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-teal-50 rounded-2xl text-teal-600">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Statistik Operasi</h3>
              <p className="text-xs text-gray-500">Ringkasan maklumat awal & operasi</p>
            </div>
          </div>
          
          <div className="overflow-x-auto rounded-2xl border border-teal-100">
            <table className="w-full min-w-[460px] text-sm">
              <thead className="bg-teal-50">
                <tr>
                  <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider text-teal-900">Perkara</th>
                  <th className="px-4 py-3 text-center text-[11px] font-black uppercase tracking-wider text-teal-900">Rujukan 2024</th>
                  <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider text-teal-900">Input 2025</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-teal-100">
                  <td className="px-4 py-3 font-semibold text-gray-800">BTAM Diterima</td>
                  <td className="px-4 py-3 text-center font-black text-teal-700">{BPKS_2024_REFERENCE.statistik.btam}</td>
                  <td className="px-4 py-3">
                    <div className={RO}>{formData.bpks.statistik.btam || '-'}</div>
                  </td>
                </tr>
                <tr className="border-t border-teal-100">
                  <td className="px-4 py-3 font-semibold text-gray-800">Rondaan</td>
                  <td className="px-4 py-3 text-center font-black text-teal-700">{BPKS_2024_REFERENCE.statistik.rondaan}</td>
                  <td className="px-4 py-3">
                    <div className={RO}>{formData.bpks.statistik.rondaan || '-'}</div>
                  </td>
                </tr>
                <tr className="border-t border-teal-100">
                  <td className="px-4 py-3 font-semibold text-gray-800">Operasi</td>
                  <td className="px-4 py-3 text-center font-black text-teal-700">{BPKS_2024_REFERENCE.statistik.operasi}</td>
                  <td className="px-4 py-3">
                    <div className={RO}>{formData.bpks.statistik.operasi || '-'}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-teal-900 p-6 rounded-3xl shadow-lg text-white flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-teal-400" />
            <h3 className="text-xl font-bold">Trend Operasi 2025</h3>
          </div>
          <p className="text-teal-100 text-sm mb-6">
            Peningkatan keberkesanan operasi melalui maklumat awal awam (BTAM).
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <p className="text-[10px] uppercase tracking-wider font-bold text-teal-300 mb-1">BTAM 2025</p>
              <p className="text-2xl font-black">{formData.bpks.statistik.btam || 0}</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <p className="text-[10px] uppercase tracking-wider font-bold text-teal-300 mb-1">Rondaan 2025</p>
              <p className="text-2xl font-black">{formData.bpks.statistik.rondaan || 0}</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <p className="text-[10px] uppercase tracking-wider font-bold text-teal-300 mb-1">Operasi 2025</p>
              <p className="text-2xl font-black">{formData.bpks.statistik.operasi || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Sumber Manusia */}
      <div className="mt-8 bg-white p-8 rounded-3xl shadow-sm border border-teal-100">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-teal-50 rounded-2xl text-teal-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Pegawai Penguatkuasa Agama</h3>
              <p className="text-xs text-gray-500">Taburan pegawai mengikut lokasi</p>
            </div>
          </div>
          <div className="bg-teal-600 text-white px-6 py-3 rounded-2xl shadow-lg flex flex-col items-center">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Jumlah Pegawai</span>
            <span className="text-2xl font-black">{totalPegawai}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <section className="overflow-hidden rounded-[1.75rem] border border-slate-200">
            <div className="border-b border-slate-200 bg-slate-100 px-5 py-4">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Data Lama</p>
              <h4 className="mt-1 text-lg font-black text-slate-900">Rujukan 2024</h4>
            </div>
            <div className="divide-y divide-slate-100 bg-slate-50/70">
              {pegawaiLocations.map((loc) => (
                <div key={`ref-${loc}`} className="flex items-center justify-between gap-4 px-5 py-3.5">
                  <span className="text-sm font-bold text-slate-700">{formatLabel(loc)}</span>
                  <span className="min-w-[64px] rounded-full bg-white px-3 py-1 text-center text-sm font-black text-teal-700 shadow-sm">
                    {BPKS_2024_REFERENCE.pegawai[loc as keyof typeof BPKS_2024_REFERENCE.pegawai] || 0}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="overflow-hidden rounded-[1.75rem] border border-teal-200">
            <div className="border-b border-teal-200 bg-teal-50 px-5 py-4">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-teal-600">Data Semasa</p>
              <h4 className="mt-1 text-lg font-black text-slate-900">Input 2025</h4>
            </div>
            <div className="divide-y divide-teal-100 bg-white">
              {pegawaiLocations.map((loc) => (
                <label key={`input-${loc}`} className="flex items-center justify-between gap-4 px-5 py-3.5">
                  <span className="text-sm font-bold text-slate-700">{formatLabel(loc)}</span>
                  <div className="w-28 rounded-xl border border-emerald-100 bg-emerald-50/50 px-3 py-2 text-right text-sm font-black text-slate-900">{formData.bpks.pegawai[loc] || '-'}</div>
                </label>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* 3. Borang 5 Didaftar */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-teal-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-teal-50 rounded-2xl text-teal-600">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Borang 5 Didaftar</h3>
              <p className="text-xs text-gray-500">Maklumat kepada Pegawai Penguatkuasa</p>
            </div>
          </div>

          <div className="mb-8 overflow-x-auto rounded-2xl border border-teal-100">
            <table className="w-full min-w-[520px] text-sm">
              <thead className="bg-teal-50">
                <tr>
                  <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider text-teal-900">Bahagian</th>
                  <th className="px-4 py-3 text-center text-[11px] font-black uppercase tracking-wider text-teal-900">Rujukan 2024</th>
                  <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider text-teal-900">Input 2025</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(formData.bpks.borang5.bahagian).map((div) => (
                  <tr key={div} className="border-t border-teal-100">
                    <td className="px-4 py-3 font-semibold text-gray-800">{formatLabel(div)}</td>
                    <td className="px-4 py-3 text-center font-black text-teal-700">
                      {BPKS_2024_REFERENCE.borang5.bahagian[div as keyof typeof BPKS_2024_REFERENCE.borang5.bahagian] || 0}
                    </td>
                    <td className="px-4 py-3">
                      <div className={RO}>{formData.bpks.borang5.bahagian[div] || '-'}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-teal-50 rounded-2xl border border-teal-100">
            <h4 className="text-sm font-bold text-teal-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Pecahan Kategori
            </h4>
            <div className="overflow-x-auto rounded-2xl border border-teal-100 bg-white">
              <table className="w-full min-w-[460px] text-sm">
                <thead className="bg-teal-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider text-teal-900">Kategori</th>
                    <th className="px-4 py-3 text-center text-[11px] font-black uppercase tracking-wider text-teal-900">Rujukan 2024</th>
                    <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider text-teal-900">Input 2025</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-teal-100">
                    <td className="px-4 py-3 font-semibold text-gray-800">Matrimoni</td>
                    <td className="px-4 py-3 text-center font-black text-teal-700">{BPKS_2024_REFERENCE.borang5.kategori.matrimoni}</td>
                    <td className="px-4 py-3">
                      <div className={RO}>{formData.bpks.borang5.kategori.matrimoni || '-'}</div>
                    </td>
                  </tr>
                  <tr className="border-t border-teal-100">
                    <td className="px-4 py-3 font-semibold text-gray-800">Jenayah Syariah</td>
                    <td className="px-4 py-3 text-center font-black text-teal-700">{BPKS_2024_REFERENCE.borang5.kategori.jenayahSyariah}</td>
                    <td className="px-4 py-3">
                      <div className={RO}>{formData.bpks.borang5.kategori.jenayahSyariah || '-'}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-teal-100 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-teal-50 rounded-xl text-teal-600"><TrendingUp className="w-5 h-5" /></div>
            <h3 className="text-lg font-bold text-gray-900">Visualisasi Borang 5</h3>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100 text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-teal-600 mb-1">Matrimoni</p>
              <p className="text-2xl font-black text-teal-900">{parseInt(formData.bpks.borang5.kategori.matrimoni) || 0}</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Jenayah Syariah</p>
              <p className="text-2xl font-black text-emerald-900">{parseInt(formData.bpks.borang5.kategori.jenayahSyariah) || 0}</p>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="flex-1 min-h-[260px] rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50/30 via-white to-white p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={borang5ChartData} layout="horizontal" margin={{ top: 16, right: 12, left: 12, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ccfbf1" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 800, fill: '#134E4A' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#99f6e4' }} />
                <Tooltip contentStyle={customTooltipStyle} cursor={{ fill: '#f0fdfa' }} />
                <Bar dataKey="value" name="Jumlah" radius={[10, 10, 0, 0]} barSize={60}>
                  {borang5ChartData.map((entry, index) => (
                    <Cell key={`b5-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend + Total */}
          <div className="mt-4 flex items-center justify-center gap-6">
            {borang5ChartData.map((item, idx) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                <span className="text-xs font-black text-teal-900">{item.name}: <span className="text-teal-600">{item.value}</span></span>
              </div>
            ))}
          </div>
          <div className={`mt-4 p-4 rounded-2xl text-center ${isBorang5Valid ? 'bg-teal-50 border border-teal-100' : 'bg-amber-50 border border-amber-200'}`}>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Jumlah Keseluruhan</p>
            <p className="text-3xl font-black text-teal-600">{totalBorang5Bahagian}</p>
            {!isBorang5Valid && totalBorang5Kategori > 0 && (
              <div className="mt-2 flex items-center justify-center gap-1.5 text-amber-700">
                <AlertCircle className="w-3.5 h-3.5" />
                <p className="text-[10px] font-bold">Jumlah bahagian ({totalBorang5Bahagian}) ≠ kategori ({totalBorang5Kategori})</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Kertas Siasatan & Aktiviti */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-teal-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-teal-50 rounded-2xl text-teal-600">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Kertas Siasatan (I.P)</h3>
              <p className="text-xs text-gray-500">Dikemukakan ke Bahagian Pendakwaan</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="overflow-x-auto rounded-2xl border border-teal-100">
              <table className="w-full min-w-[460px] text-sm">
                <thead className="bg-teal-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider text-teal-900">Kategori</th>
                    <th className="px-4 py-3 text-center text-[11px] font-black uppercase tracking-wider text-teal-900">Rujukan 2024</th>
                    <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider text-teal-900">Input 2025</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-teal-100">
                    <td className="px-4 py-3 font-semibold text-gray-800">Matrimoni</td>
                    <td className="px-4 py-3 text-center font-black text-teal-700">{BPKS_2024_REFERENCE.kertasSiasatan.matrimoni}</td>
                    <td className="px-4 py-3">
                      <div className={RO}>{formData.bpks.kertasSiasatan.matrimoni || '-'}</div>
                    </td>
                  </tr>
                  <tr className="border-t border-teal-100">
                    <td className="px-4 py-3 font-semibold text-gray-800">Jenayah Syariah</td>
                    <td className="px-4 py-3 text-center font-black text-teal-700">{BPKS_2024_REFERENCE.kertasSiasatan.jenayahSyariah}</td>
                    <td className="px-4 py-3">
                      <div className={RO}>{formData.bpks.kertasSiasatan.jenayahSyariah || '-'}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Chart - Horizontal Bar for better readability */}
            <div className="rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50/30 via-white to-white p-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-teal-600 mb-4">Pecahan Kategori I.P</p>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ipChartData} layout="horizontal" margin={{ top: 16, right: 12, left: 12, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ccfbf1" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 800, fill: '#134E4A' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#5EEAD4' }} />
                    <Tooltip contentStyle={customTooltipStyle} cursor={{ fill: '#f0fdfa' }} />
                    <Bar dataKey="value" name="Jumlah" radius={[8, 8, 0, 0]} fill="#0D9488">
                      {ipChartData.map((entry, index) => (
                        <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center justify-center gap-6">
                {ipChartData.map((item, idx) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                    <span className="text-xs font-black text-teal-900">{item.name}: <span className="text-teal-600">{item.value}</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-teal-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-teal-50 rounded-2xl text-teal-600">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Program / Aktiviti</h3>
                <p className="text-xs text-gray-500">Jumlah keseluruhan program 2025</p>
              </div>
            </div>
            
            <div className="overflow-x-auto rounded-2xl border border-teal-100">
              <table className="w-full min-w-[430px] text-sm">
                <thead className="bg-teal-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider text-teal-900">Perkara</th>
                    <th className="px-4 py-3 text-center text-[11px] font-black uppercase tracking-wider text-teal-900">Rujukan 2024</th>
                    <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider text-teal-900">Input 2025</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-teal-100">
                    <td className="px-4 py-3 font-semibold text-gray-800">Jumlah Program / Aktiviti</td>
                    <td className="px-4 py-3 text-center font-black text-teal-700">{BPKS_2024_REFERENCE.aktiviti.total}</td>
                    <td className="px-4 py-3">
                      <div className={RO}>{formData.bpks.aktiviti.total || '-'}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-teal-50 p-8 rounded-3xl border border-teal-100 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-teal-900 mb-2">Aktiviti Kesedaran</h3>
              <p className="text-sm text-teal-700 mb-4">
                Fokus kepada infografik kesedaran pematuhan undang-undang Syariah (Seksyen 14, Ramadhan, dll).
              </p>
              <div className="flex items-center gap-2 text-teal-600 font-bold">
                <MapPin className="w-4 h-4" />
                <span className="text-xs uppercase tracking-widest">Seluruh Sarawak</span>
              </div>
            </div>
            <Scale className="absolute -bottom-4 -right-4 w-32 h-32 text-teal-200/50 group-hover:scale-110 transition-transform duration-500" />
          </div>
        </div>
      </div>

      {/* Ringkasan & Analisis (Read-Only) */}
      <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-4"><div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600"><FileText className="w-5 h-5" /></div><h3 className="text-lg font-bold text-gray-900">Ringkasan & Analisis</h3></div>
        <div className="space-y-6">
          <div className="space-y-2"><label className="text-xs font-bold text-gray-500">Ringkasan pencapaian utama</label><div className="w-full min-h-20 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-slate-800 whitespace-pre-wrap">{formData.ringkasan || '-'}</div></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2"><label className="text-xs font-bold text-gray-500">Isu dan cabaran</label><div className="w-full min-h-20 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-slate-800 whitespace-pre-wrap">{formData.isu || '-'}</div></div>
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
    </FormLayout>
  );
};

export default BpksForm;
