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
  AlertCircle
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import FormLayout from './FormLayout';
import { useFormLogic } from './useFormLogic';
import { BPKS_2024_REFERENCE } from '../../constants';

const BpksForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const {
    formData,
    setFormData,
    handleSave,
    isSaving,
    isAutoSaving,
    showSuccess,
    saveError
  } = useFormLogic('BPKS', {
    bpks: {
      statistik: {
        btam: '',
        rondaan: ''
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

  const COLORS = ['#0D9488', '#2DD4BF']; // Teal 600, Teal 400
  const formatLabel = (value: string) => value.replace(/([A-Z])/g, ' $1').trim();

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
    >
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
                    <input
                      type="number"
                      value={formData.bpks.statistik.btam}
                      onChange={(e) => handleNestedInputChange('bpks', 'statistik', 'btam', e.target.value)}
                      className="w-full bg-gray-50 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 transition-all"
                      placeholder="0"
                    />
                  </td>
                </tr>
                <tr className="border-t border-teal-100">
                  <td className="px-4 py-3 font-semibold text-gray-800">Rondaan & Operasi</td>
                  <td className="px-4 py-3 text-center font-black text-teal-700">{BPKS_2024_REFERENCE.statistik.rondaan}</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={formData.bpks.statistik.rondaan}
                      onChange={(e) => handleNestedInputChange('bpks', 'statistik', 'rondaan', e.target.value)}
                      className="w-full bg-gray-50 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 transition-all"
                      placeholder="0"
                    />
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
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <p className="text-[10px] uppercase tracking-wider font-bold text-teal-300 mb-1">BTAM 2025</p>
              <p className="text-2xl font-black">{formData.bpks.statistik.btam || 0}</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <p className="text-[10px] uppercase tracking-wider font-bold text-teal-300 mb-1">Rondaan 2025</p>
              <p className="text-2xl font-black">{formData.bpks.statistik.rondaan || 0}</p>
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

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Object.keys(formData.bpks.pegawai).map((loc) => (
            <div key={loc} className="group">
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 ml-1 group-hover:text-teal-600 transition-colors">
                {loc.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.bpks.pegawai[loc]}
                  onChange={(e) => {
                    const newPegawai = { ...formData.bpks.pegawai, [loc]: e.target.value };
                    setFormData((prev: any) => ({
                      ...prev,
                      bpks: { ...prev.bpks, pegawai: newPegawai }
                    }));
                  }}
                  className="w-full bg-gray-50 border-none rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 transition-all"
                  placeholder="0"
                />
                <span className="absolute right-2 top-2 text-[8px] font-bold text-teal-400">
                  Ref: {BPKS_2024_REFERENCE.pegawai[loc as keyof typeof BPKS_2024_REFERENCE.pegawai] || 0}
                </span>
              </div>
            </div>
          ))}
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
                      <input
                        type="number"
                        value={formData.bpks.borang5.bahagian[div]}
                        onChange={(e) => {
                          const newBahagian = { ...formData.bpks.borang5.bahagian, [div]: e.target.value };
                          setFormData((prev: any) => ({
                            ...prev,
                            bpks: {
                              ...prev.bpks,
                              borang5: { ...prev.bpks.borang5, bahagian: newBahagian }
                            }
                          }));
                        }}
                        className="w-full bg-gray-50 border-none rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 transition-all"
                        placeholder="0"
                      />
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
                      <input
                        type="number"
                        value={formData.bpks.borang5.kategori.matrimoni}
                        onChange={(e) => handleDeepNestedInputChange('bpks', 'borang5', 'kategori', 'matrimoni', e.target.value)}
                        className="w-full bg-gray-50 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 shadow-sm"
                        placeholder="0"
                      />
                    </td>
                  </tr>
                  <tr className="border-t border-teal-100">
                    <td className="px-4 py-3 font-semibold text-gray-800">Jenayah Syariah</td>
                    <td className="px-4 py-3 text-center font-black text-teal-700">{BPKS_2024_REFERENCE.borang5.kategori.jenayahSyariah}</td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={formData.bpks.borang5.kategori.jenayahSyariah}
                        onChange={(e) => handleDeepNestedInputChange('bpks', 'borang5', 'kategori', 'jenayahSyariah', e.target.value)}
                        className="w-full bg-gray-50 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 shadow-sm"
                        placeholder="0"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {!isBorang5Valid && (totalBorang5Bahagian > 0 || totalBorang5Kategori > 0) && (
              <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">
                <AlertCircle className="w-4 h-4" />
                <p className="text-[10px] font-bold">
                  AMARAN: Jumlah Bahagian ({totalBorang5Bahagian}) tidak sama dengan Jumlah Kategori ({totalBorang5Kategori}).
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-teal-100 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Visualisasi Borang 5</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={borang5ChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {borang5ChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-2xl text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Jumlah Keseluruhan</p>
            <p className="text-3xl font-black text-teal-600">{totalBorang5Bahagian}</p>
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
                      <input
                        type="number"
                        value={formData.bpks.kertasSiasatan.matrimoni}
                        onChange={(e) => handleNestedInputChange('bpks', 'kertasSiasatan', 'matrimoni', e.target.value)}
                        className="w-full bg-gray-50 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 transition-all"
                        placeholder="0"
                      />
                    </td>
                  </tr>
                  <tr className="border-t border-teal-100">
                    <td className="px-4 py-3 font-semibold text-gray-800">Jenayah Syariah</td>
                    <td className="px-4 py-3 text-center font-black text-teal-700">{BPKS_2024_REFERENCE.kertasSiasatan.jenayahSyariah}</td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={formData.bpks.kertasSiasatan.jenayahSyariah}
                        onChange={(e) => handleNestedInputChange('bpks', 'kertasSiasatan', 'jenayahSyariah', e.target.value)}
                        className="w-full bg-gray-50 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 transition-all"
                        placeholder="0"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ipChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {ipChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
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
                      <input
                        type="number"
                        value={formData.bpks.aktiviti.total}
                        onChange={(e) => handleNestedInputChange('bpks', 'aktiviti', 'total', e.target.value)}
                        className="w-full bg-gray-50 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 transition-all"
                        placeholder="0"
                      />
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
    </FormLayout>
  );
};

export default BpksForm;
