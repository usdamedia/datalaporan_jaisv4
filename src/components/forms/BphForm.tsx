import React, { useMemo } from 'react';
import FormLayout from './FormLayout';
import { BasicInfoSection, NarrativeSection, LawatanSection } from './CommonSections';
import { useFormLogic } from './useFormLogic';
import { BPH_2024_REFERENCE } from '../../constants';
import { 
  ShieldCheck, 
  FileText, 
  Activity, 
  MapPin, 
  Plus, 
  Save,
  Trash2, 
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  BarChart3
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface BphFormProps {
  deptName: string;
  onBack: () => void;
}

const BphForm: React.FC<BphFormProps> = ({ deptName, onBack }) => {
  const initialState = {
    tarikh: new Date().toISOString().split('T')[0],
    disediakanOleh: '',
    jawatan: '',
    ringkasan: '',
    isu: '',
    cadangan: '',
    lawatan: [],
    bph: {
      sphm: {
        permohonan: '',
        permohonanSkim: {
          rumahSembelihan: '',
          produk: '',
          premis: '',
          oem: '',
          logistik: '',
          barangGunaan: ''
        },
        skim: {
          rumahSembelihan: '',
          produk: '',
          premis: '',
          oem: '',
          logistik: '',
          barangGunaan: ''
        }
      },
      pemantauan: {
        patuh: '',
        amaran: '',
        gantung: '',
        tarikBalik: '',
        lain: ''
      },
      penguatkuasaan: '',
      aduan: '',
      ziarahHalal: '',
      zonHalal: BPH_2024_REFERENCE.zonHalal,
      aktiviti: {
        taklimat: '',
        kursus: '',
        total: ''
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

  // Auto-sum SPHM Aktif
  const sphmTotalAktif = useMemo(() => {
    const skim = formData.bph?.sphm?.skim || {};
    return Object.values(skim).reduce((acc: number, val: any) => acc + (parseInt(val) || 0), 0);
  }, [formData.bph?.sphm?.skim]);

  const sphmTotalPermohonan = useMemo(() => {
    const skimPermohonan = formData.bph?.sphm?.permohonanSkim || {};
    const totalSkim = Object.values(skimPermohonan).reduce((acc: number, val: any) => acc + (parseInt(val) || 0), 0);
    return totalSkim || (parseInt(formData.bph?.sphm?.permohonan) || 0);
  }, [formData.bph?.sphm?.permohonanSkim, formData.bph?.sphm?.permohonan]);

  // Auto-sum Pemantauan
  const pemantauanTotal = useMemo(() => {
    const p = formData.bph?.pemantauan || {};
    return Object.values(p).reduce((acc: number, val: any) => acc + (parseInt(val) || 0), 0);
  }, [formData.bph?.pemantauan]);

  const updateBph = (path: string[], value: any) => {
    setFormData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      if (!newData.bph) newData.bph = initialState.bph;
      
      let current = newData.bph;
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {};
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newData;
    });
  };

  const addZonHalal = () => {
    setFormData((prev: any) => ({
      ...prev,
      bph: {
        ...prev.bph,
        zonHalal: [...(prev.bph?.zonHalal || []), '']
      }
    }));
  };

  const removeZonHalal = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      bph: {
        ...prev.bph,
        zonHalal: prev.bph.zonHalal.filter((_: any, i: number) => i !== index)
      }
    }));
  };

  const updateZonHalal = (index: number, value: string) => {
    setFormData((prev: any) => {
      const newZon = [...prev.bph.zonHalal];
      newZon[index] = value;
      return {
        ...prev,
        bph: {
          ...prev.bph,
          zonHalal: newZon
        }
      };
    });
  };

  const chartData = [
    { name: '2024', permohonan: BPH_2024_REFERENCE.sphm.permohonan, aktif: BPH_2024_REFERENCE.sphm.aktif },
    { name: '2025', permohonan: sphmTotalPermohonan, aktif: sphmTotalAktif }
  ];

  if (!formData.bph) return null;

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

      <div className="space-y-8 animate-fade-in mt-8">
        {/* 1. SPHM Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#5A5A40] p-4 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-zus-gold" />
            <h3 className="text-white font-bold">1. Statistik Sijil Pengesahan Halal Malaysia (SPHM) 2025</h3>
          </div>
          <div className="p-6 space-y-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-xs font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">Permohonan Sijil (SPHM) 2025</h4>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { label: 'Rumah Sembelihan', field: 'rumahSembelihan' },
                    { label: 'Produk Makanan / Minuman', field: 'produk' },
                    { label: 'Premis Makanan', field: 'premis' },
                    { label: 'Skim Pengilangan Kontrak (OEM)', field: 'oem' },
                    { label: 'Logistik', field: 'logistik' },
                    { label: 'Barang Gunaan', field: 'barangGunaan' },
                  ].map(item => (
                    <div key={item.field} className="grid grid-cols-2 items-center gap-4 rounded-lg p-2 transition-colors hover:bg-gray-50">
                      <label className="text-[10px] font-bold text-gray-500 leading-tight">{item.label}</label>
                      <input 
                        type="number" 
                        value={formData.bph.sphm.permohonanSkim?.[item.field] || ''} 
                        onChange={(e) => updateBph(['sphm', 'permohonanSkim', item.field], e.target.value)} 
                        className="p-1.5 bg-white border border-gray-200 rounded text-xs font-bold text-center focus:ring-1 focus:ring-olive-500 outline-none" 
                      />
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-olive-50 border border-olive-100 rounded-2xl flex justify-between items-center">
                  <span className="text-xs font-black uppercase text-olive-900">Jumlah Permohonan</span>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-olive-400">Ref 24: {BPH_2024_REFERENCE.sphm.permohonan}</span>
                    <span className="text-xl font-black text-olive-900">{sphmTotalPermohonan}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">Pecahan Skim SPHM Aktif</h4>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { label: 'Rumah Sembelihan', field: 'rumahSembelihan', ref: BPH_2024_REFERENCE.sphm.skim.rumahSembelihan },
                    { label: 'Produk Makanan / Minuman', field: 'produk', ref: BPH_2024_REFERENCE.sphm.skim.produk },
                    { label: 'Premis Makanan', field: 'premis', ref: BPH_2024_REFERENCE.sphm.skim.premis },
                    { label: 'Skim Pengilangan Kontrak (OEM)', field: 'oem', ref: BPH_2024_REFERENCE.sphm.skim.oem },
                    { label: 'Logistik', field: 'logistik', ref: BPH_2024_REFERENCE.sphm.skim.logistik },
                    { label: 'Barang Gunaan', field: 'barangGunaan', ref: BPH_2024_REFERENCE.sphm.skim.barangGunaan },
                  ].map(item => (
                    <div key={item.field} className="grid grid-cols-3 items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <label className="text-[10px] font-bold text-gray-500 leading-tight">{item.label}</label>
                      <div className="text-center text-[9px] font-bold text-gray-400 bg-gray-50 py-0.5 rounded">Ref 24: {item.ref}</div>
                      <input 
                        type="number" 
                        value={formData.bph.sphm.skim[item.field]} 
                        onChange={(e) => updateBph(['sphm', 'skim', item.field], e.target.value)} 
                        className="p-1 bg-white border border-gray-200 rounded text-xs font-bold text-center focus:ring-1 focus:ring-olive-500 outline-none" 
                      />
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-[#5A5A40] text-zus-gold rounded-xl flex justify-between items-center">
                  <span className="text-xs font-black uppercase">Jumlah Pemilik Sijil Aktif</span>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] opacity-60">Ref 24: {BPH_2024_REFERENCE.sphm.aktif}</span>
                    <span className="text-xl font-black">{sphmTotalAktif}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-black text-zus-900 uppercase flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-olive-600" />
                Perbandingan SPHM (2024 vs 2025)
              </h4>
              <div className="h-[300px] w-full bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      cursor={{ fill: '#f3f4f6' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '10px', fontWeight: 'bold' }} />
                    <Bar dataKey="permohonan" name="Permohonan" fill="#5A5A40" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="aktif" name="Aktif" fill="#F27D26" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
                <Info className="w-4 h-4 text-blue-500 mt-0.5" />
                <p className="text-[10px] text-blue-700 leading-relaxed">
                  Graf di atas menunjukkan perbandingan prestasi permohonan dan pemilikan sijil aktif antara tahun rujukan 2024 dan data semasa 2025.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Pemantauan Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#5A5A40] p-4 flex items-center gap-3">
            <Activity className="w-5 h-5 text-zus-gold" />
            <h3 className="text-white font-bold">2. Pemantauan, Penguatkuasaan & Aduan</h3>
          </div>
          <div className="p-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <h4 className="text-xs font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">Hasil Pemantauan 2025</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Mematuhi Piawaian', field: 'patuh', ref: BPH_2024_REFERENCE.pemantauan.patuh, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                    { label: 'Diberi Amaran', field: 'amaran', ref: BPH_2024_REFERENCE.pemantauan.amaran, icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-50' },
                    { label: 'Digantung SPHM', field: 'gantung', ref: BPH_2024_REFERENCE.pemantauan.gantung, icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-50' },
                    { label: 'Ditarik Balik SPHM', field: 'tarikBalik', ref: BPH_2024_REFERENCE.pemantauan.tarikBalik, icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
                    { label: 'Lain-lain', field: 'lain', ref: BPH_2024_REFERENCE.pemantauan.lain, icon: Info, color: 'text-gray-500', bg: 'bg-gray-50' },
                  ].map(item => (
                    <div key={item.field} className={`p-4 rounded-2xl border border-gray-100 ${item.bg} space-y-3`}>
                      <div className="flex items-center gap-2">
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                        <span className="text-[10px] font-black text-gray-700 uppercase">{item.label}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-gray-400">Ref 24: {item.ref}</span>
                        <input 
                          type="number" 
                          value={formData.bph.pemantauan[item.field]} 
                          onChange={(e) => updateBph(['pemantauan', item.field], e.target.value)} 
                          className="w-20 p-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-olive-500 outline-none" 
                        />
                      </div>
                    </div>
                  ))}
                  <div className="p-4 rounded-2xl bg-[#5A5A40] text-zus-gold flex flex-col justify-center items-center gap-1">
                    <span className="text-[10px] font-black uppercase opacity-60">Jumlah Pemantauan</span>
                    <div className="text-2xl font-black">{pemantauanTotal}</div>
                    <span className="text-[9px] font-bold opacity-40">Ref 24: {BPH_2024_REFERENCE.pemantauan.total}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">Penguatkuasaan & Aduan</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                    <label className="text-[10px] font-black text-gray-500 uppercase">Kes Penguatkuasaan</label>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-gray-400">Ref 24: {BPH_2024_REFERENCE.penguatkuasaan}</span>
                      <input 
                        type="number" 
                        value={formData.bph.penguatkuasaan} 
                        onChange={(e) => updateBph(['penguatkuasaan'], e.target.value)} 
                        className="w-24 p-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-olive-500 outline-none" 
                      />
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                    <label className="text-[10px] font-black text-gray-500 uppercase">Jumlah Aduan Diterima</label>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-gray-400">Ref 24: {BPH_2024_REFERENCE.aduan}</span>
                      <input 
                        type="number" 
                        value={formData.bph.aduan} 
                        onChange={(e) => updateBph(['aduan'], e.target.value)} 
                        className="w-24 p-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-olive-500 outline-none" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Zon Halal Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#5A5A40] p-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                <MapPin className="w-5 h-5 text-zus-gold" />
              </div>
              <div>
                <h3 className="text-white font-bold">3. Zon Halal 2025</h3>
                <p className="text-[11px] font-semibold text-white/60">
                  Tambah, kemas kini, simpan, atau padam senarai zon halal aktif.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="rounded-full bg-white/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/70 ring-1 ring-white/10">
                {formData.bph.zonHalal.length} Zon Direkodkan
              </div>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#5A5A40] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save className={`h-3.5 w-3.5 ${isSaving ? 'animate-pulse' : ''}`} />
                {isSaving ? 'Menyimpan...' : 'Simpan Zon'}
              </button>
              <button 
                onClick={addZonHalal}
                className="inline-flex items-center gap-2 rounded-xl bg-zus-gold px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-zus-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-[#ffd39a] hover:shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Zon
              </button>
            </div>
          </div>
          <div className="p-6 space-y-5 bg-gradient-to-b from-[#faf8f1] via-white to-white">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div className="rounded-2xl border border-[#e7dfc9] bg-white/90 p-4 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#7d7657]">
                  Senarai Zon Halal
                </p>
                <p className="mt-2 text-xs font-medium leading-6 text-gray-500">
                  Gunakan ruang ini untuk menyusun zon halal tahun 2025. Setiap zon boleh disimpan bersama draf utama dan dipadam terus dari kad masing-masing.
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
                  Status Simpanan
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <CheckCircle2 className={`h-4 w-4 ${showSuccess ? 'text-emerald-600' : 'text-emerald-300'}`} />
                  <span className="text-xs font-bold text-emerald-800">
                    {showSuccess ? 'Perubahan zon berjaya disimpan.' : 'Klik "Simpan Zon" selepas selesai mengemas kini senarai.'}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {formData.bph.zonHalal.map((zon: string, idx: number) => (
                <div key={idx} className="group rounded-2xl border border-[#e9e3d2] bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-within:border-[#c8b07a]">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f8f3e4] text-[#8d7742]">
                        <MapPin className="w-4 h-4 shrink-0" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#8d7742]">
                          Zon {idx + 1}
                        </p>
                        <p className="text-[11px] font-semibold text-gray-400">
                          Rekod lokasi halal
                        </p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => removeZonHalal(idx)}
                      className="inline-flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-red-600 transition hover:border-red-300 hover:bg-red-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                  <input 
                    type="text" 
                    value={zon} 
                    onChange={(e) => updateZonHalal(idx, e.target.value)} 
                    placeholder="Contoh: Zon Kuching Tengah"
                    className="w-full rounded-xl border border-gray-200 bg-[#fcfcfa] px-4 py-3 text-sm font-bold text-gray-700 outline-none transition focus:border-[#c8b07a] focus:ring-2 focus:ring-[#efe3bd]"
                  />
                  <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-gray-400">
                    <span>Masukkan nama zon yang jelas</span>
                    <span>{zon.trim().length} aksara</span>
                  </div>
                </div>
              ))}
            </div>
            {formData.bph.zonHalal.length === 0 && (
              <div className="rounded-3xl border-2 border-dashed border-[#e1d8c3] bg-[#fbf8f0] py-12 text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <MapPin className="w-7 h-7 text-[#c4ab73]" />
                </div>
                <p className="text-sm font-black text-[#766d52]">Tiada zon halal direkodkan lagi</p>
                <p className="mt-2 text-xs font-medium text-gray-400">
                  Klik butang `Tambah Zon` untuk mula membina senarai zon halal 2025.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 4. Aktiviti Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#5A5A40] p-4 flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-zus-gold" />
            <h3 className="text-white font-bold">4. Program & Aktiviti Halal</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Ziarah Halal', field: 'ziarahHalal', ref: BPH_2024_REFERENCE.ziarahHalal },
                { label: 'Taklimat Halal', field: 'taklimat', ref: BPH_2024_REFERENCE.aktiviti.taklimat, sub: 'aktiviti' },
                { label: 'Kursus Kesedaran', field: 'kursus', ref: BPH_2024_REFERENCE.aktiviti.kursus, sub: 'aktiviti' },
                { label: 'Jumlah Besar Aktiviti', field: 'total', ref: BPH_2024_REFERENCE.aktiviti.total, sub: 'aktiviti', highlight: true },
              ].map(item => (
                <div key={item.field} className={`p-4 rounded-2xl border ${item.highlight ? 'bg-[#5A5A40] text-zus-gold border-[#5A5A40]' : 'bg-gray-50 border-gray-100'} space-y-3`}>
                  <label className={`text-[10px] font-black uppercase ${item.highlight ? 'opacity-60' : 'text-gray-500'}`}>{item.label}</label>
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-bold ${item.highlight ? 'opacity-40' : 'text-gray-400'}`}>Ref 24: {item.ref}</span>
                    <input 
                      type="number" 
                      value={item.sub ? formData.bph.aktiviti[item.field] : formData.bph[item.field]} 
                      onChange={(e) => updateBph(item.sub ? ['aktiviti', item.field] : [item.field], e.target.value)} 
                      className={`w-20 p-1.5 rounded-lg text-xs font-bold text-center outline-none focus:ring-2 ${item.highlight ? 'bg-white/10 border-white/20 text-white focus:ring-white/30' : 'bg-white border-gray-200 text-zus-900 focus:ring-olive-500'}`} 
                    />
                  </div>
                </div>
              ))}
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

export default BphForm;
