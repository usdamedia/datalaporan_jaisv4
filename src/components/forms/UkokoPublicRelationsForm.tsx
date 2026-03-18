import React, { useMemo } from 'react';
import { 
  MessageSquare, 
  Users, 
  MapPin, 
  BarChart3, 
  Smile, 
  Frown, 
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Building2,
  Save,
  Trash2,
  Plus
} from 'lucide-react';
import FormLayout from './FormLayout';
import { useFormLogic } from './useFormLogic';
import { UKOKO_PR_2024_REFERENCE } from '../../constants';

interface UkokoPRData {
  aduan: {
    sumber: {
      talikhidmat: number;
      lain: number;
    };
    statusSelesai: number;
    kategori: {
      masjid: number;
      kadNikah: number;
      kafa: number;
      logoHalal: number;
      ncr: number;
      tindakanPenguatkuasaanSyariah: number;
      tindakanPengukuhanPendidikanIslam: number;
      usk: number;
    };
    lokasi: {
      hqBkki: number;
      paibBintulu: number;
      paibKuching: number;
      paibMiri: number;
      paibSarikei: number;
      paibSibu: number;
    };
    customKategori: Array<{
      id: string;
      name: string;
      value: number;
    }>;
  };
  maklumBalas: {
    queueBee: {
      puas: number;
      tidakPuas: number;
    };
    qrCode: {
      puas: number;
      tidakPuas: number;
    };
  };
  lawatanLuar: number;
}

const UkokoPublicRelationsForm: React.FC<{ deptName: string; onBack: () => void }> = ({ deptName, onBack }) => {
  const {
    formData,
    setFormData,
    handleSave,
    isSaving,
    showSuccess,
    saveError
  } = useFormLogic(deptName, {
    pr: {
      aduan: {
        sumber: { talikhidmat: 0, lain: 0 },
        statusSelesai: 0,
        kategori: {
          masjid: 0,
          kadNikah: 0,
          kafa: 0,
          logoHalal: 0,
          ncr: 0,
          tindakanPenguatkuasaanSyariah: 0,
          tindakanPengukuhanPendidikanIslam: 0,
          usk: 0
        },
        lokasi: {
          hqBkki: 0,
          paibBintulu: 0,
          paibKuching: 0,
          paibMiri: 0,
          paibSarikei: 0,
          paibSibu: 0
        },
        customKategori: []
      },
      maklumBalas: {
        queueBee: { puas: 0, tidakPuas: 0 },
        qrCode: { puas: 0, tidakPuas: 0 }
      },
      lawatanLuar: 0
    }
  });

  const prData = formData.pr as UkokoPRData;
  const [newCustomKategori, setNewCustomKategori] = React.useState('');

  const updateField = (path: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setFormData((prev: any) => {
      const newPr = { ...prev.pr };
      const keys = path.split('.');
      let current = newPr;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = numValue;
      return { ...prev, pr: newPr };
    });
  };

  const addCustomKategori = () => {
    const trimmed = newCustomKategori.trim();
    if (!trimmed) return;

    setFormData((prev: any) => ({
      ...prev,
      pr: {
        ...prev.pr,
        aduan: {
          ...prev.pr.aduan,
          customKategori: [
            ...(prev.pr.aduan.customKategori || []),
            {
              id: `${Date.now()}-${trimmed.toLowerCase().replace(/\s+/g, '-')}`,
              name: trimmed,
              value: 0,
            },
          ],
        },
      },
    }));
    setNewCustomKategori('');
  };

  const updateCustomKategori = (id: string, field: 'name' | 'value', value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      pr: {
        ...prev.pr,
        aduan: {
          ...prev.pr.aduan,
          customKategori: (prev.pr.aduan.customKategori || []).map((item: any) =>
            item.id === id
              ? {
                  ...item,
                  [field]: field === 'value' ? parseInt(value) || 0 : value,
                }
              : item
          ),
        },
      },
    }));
  };

  const removeCustomKategori = (id: string) => {
    setFormData((prev: any) => ({
      ...prev,
      pr: {
        ...prev.pr,
        aduan: {
          ...prev.pr.aduan,
          customKategori: (prev.pr.aduan.customKategori || []).filter((item: any) => item.id !== id),
        },
      },
    }));
  };

  // Calculations
  const totalAduanSumber = prData.aduan.sumber.talikhidmat + prData.aduan.sumber.lain;
  const totalAduanKategori =
    Object.values(prData.aduan.kategori).reduce((a, b) => a + b, 0) +
    (prData.aduan.customKategori || []).reduce((sum, item) => sum + (item.value || 0), 0);
  const totalAduanLokasi = Object.values(prData.aduan.lokasi).reduce((a, b) => a + b, 0);

  const totalQueueBee = prData.maklumBalas.queueBee.puas + prData.maklumBalas.queueBee.tidakPuas;
  const totalQrCode = prData.maklumBalas.qrCode.puas + prData.maklumBalas.qrCode.tidakPuas;
  const totalMaklumBalas = totalQueueBee + totalQrCode;

  const isAduanBalanced = totalAduanSumber === totalAduanKategori && totalAduanSumber === totalAduanLokasi;
  const aduanKategoriLabels: Record<string, string> = {
    masjid: 'Masjid',
    kadNikah: 'Kad Nikah',
    kafa: 'KAFA',
    logoHalal: 'Logo Halal',
    ncr: 'NCR',
    tindakanPenguatkuasaanSyariah: 'Tindakan Penguatkuasaan Syariah',
    tindakanPengukuhanPendidikanIslam: 'Tindakan Pengukuhan Pendidikan Islam',
    usk: 'USIK',
  };
  const aduanLokasiLabels: Record<string, string> = {
    hqBkki: 'HQ BKKI',
    paibBintulu: 'PAIB Bintulu',
    paibKuching: 'PAIB Kuching',
    paibMiri: 'PAIB Miri',
    paibSarikei: 'PAIB Sarikei',
    paibSibu: 'PAIB Sibu',
  };

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
      <div className="space-y-8">
        <section className="rounded-[2rem] bg-[linear-gradient(135deg,#5b6cff_0%,#7c3aed_55%,#5b21b6_100%)] p-8 text-white shadow-xl">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-100">Laporan Tahunan Perhubungan Awam</p>
          <h1 className="mt-3 max-w-4xl text-3xl font-black uppercase tracking-tight">Unit Komunikasi Korporat (UKOKO) · Unit Perhubungan Awam</h1>
          <p className="mt-4 max-w-3xl text-sm font-medium leading-6 text-indigo-50">
            Halaman ini memfokuskan pengisian data aduan, maklum balas pelanggan, dan lawatan luar bagi tahun 2025 dengan semakan automatik pada jumlah utama.
          </p>
        </section>

        {/* 1. Statistik Aduan */}
        <section className="overflow-hidden rounded-[2rem] border border-indigo-100 bg-white p-6 shadow-sm md:p-8">
          <div className="flex items-center gap-3 mb-8 border-b border-indigo-50 pb-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-indigo-950 uppercase tracking-tight">Statistik Aduan 2025</h3>
              <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest">Pengurusan Aduan Awam • Ref 2024: {UKOKO_PR_2024_REFERENCE.aduan.jumlah}</p>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-6 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-500">Jumlah Aduan</p>
              <p className="mt-3 text-4xl font-black text-indigo-950">{totalAduanSumber}</p>
              <p className="mt-2 text-xs font-semibold text-slate-400">Rujukan 2024: {UKOKO_PR_2024_REFERENCE.aduan.jumlah}</p>
            </div>
            <div className={`rounded-3xl border p-6 shadow-sm ${isAduanBalanced ? 'border-emerald-100 bg-emerald-50' : 'border-rose-100 bg-rose-50'}`}>
              <p className={`text-[10px] font-black uppercase tracking-[0.25em] ${isAduanBalanced ? 'text-emerald-600' : 'text-rose-600'}`}>Semakan Auto-Sum</p>
              <p className={`mt-3 text-2xl font-black ${isAduanBalanced ? 'text-emerald-900' : 'text-rose-900'}`}>
                {isAduanBalanced ? 'Jumlah Seimbang' : 'Jumlah Tidak Sepadan'}
              </p>
              <p className={`mt-2 text-xs font-semibold ${isAduanBalanced ? 'text-emerald-700' : 'text-rose-700'}`}>
                Sumber: {totalAduanSumber} · Kategori: {totalAduanKategori} · Lokasi: {totalAduanLokasi}
              </p>
            </div>
            <div className="rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-6 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-violet-500">Status Selesai</p>
              <p className="mt-2 text-[10px] font-bold text-violet-300">Ref 2024: {UKOKO_PR_2024_REFERENCE.aduan.statusSelesai}</p>
              <input
                type="number"
                value={prData.aduan.statusSelesai}
                onChange={(e) => updateField('aduan.statusSelesai', e.target.value)}
                className="mt-3 w-full rounded-2xl border border-violet-200 bg-white p-4 text-center text-3xl font-black text-violet-950 focus:ring-4 focus:ring-violet-500/20 outline-none"
                placeholder="0"
              />
              <p className="mt-2 text-xs font-semibold text-slate-400">Jumlah aduan selesai bagi 2025</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* A. Sumber Aduan */}
            <div className="space-y-4">
              <h4 className="text-sm font-black text-indigo-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> SUMBER ADUAN
              </h4>
              <div className="grid grid-cols-1 gap-3">
                <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                  <label className="block text-[10px] font-black text-indigo-400 uppercase mb-2">SCS Talikhidmat</label>
                  <p className="mb-2 text-[10px] font-bold text-indigo-300">Ref 2024: {UKOKO_PR_2024_REFERENCE.aduan.sumber.talikhidmat}</p>
                  <input
                    type="number"
                    value={prData.aduan.sumber.talikhidmat}
                    onChange={(e) => updateField('aduan.sumber.talikhidmat', e.target.value)}
                    className="w-full bg-white border border-indigo-200 rounded-xl p-3 font-black text-indigo-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                  <label className="block text-[10px] font-black text-indigo-400 uppercase mb-2">Email / Emel / Surat</label>
                  <p className="mb-2 text-[10px] font-bold text-indigo-300">Ref 2024: {UKOKO_PR_2024_REFERENCE.aduan.sumber.lain}</p>
                  <input
                    type="number"
                    value={prData.aduan.sumber.lain}
                    onChange={(e) => updateField('aduan.sumber.lain', e.target.value)}
                    className="w-full bg-white border border-indigo-200 rounded-xl p-3 font-black text-indigo-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div className="p-4 bg-indigo-900 rounded-2xl text-white">
                  <p className="text-[10px] font-black uppercase opacity-60">Jumlah Aduan</p>
                  <p className="text-2xl font-black">{totalAduanSumber}</p>
                  <p className="mt-1 text-[10px] font-bold text-indigo-200/70 uppercase">Status Selesai 2025: {prData.aduan.statusSelesai}</p>
                </div>
              </div>
            </div>

            {/* B. Kategori Aduan */}
            <div className="space-y-4">
              <h4 className="text-sm font-black text-indigo-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" /> KATEGORI ADUAN
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(prData.aduan.kategori).map(([key, val]) => (
                  <div key={key} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <label className="block text-[9px] font-black text-slate-400 uppercase mb-1 truncate">
                      {aduanKategoriLabels[key]}
                    </label>
                    <p className="mb-1 text-[9px] font-bold text-slate-300">Ref 2024: {UKOKO_PR_2024_REFERENCE.aduan.kategori[key as keyof typeof UKOKO_PR_2024_REFERENCE.aduan.kategori]}</p>
                    <input
                      type="number"
                      value={val}
                      onChange={(e) => updateField(`aduan.kategori.${key}`, e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/40 p-4">
                <div className="flex flex-col gap-3 md:flex-row">
                  <input
                    type="text"
                    value={newCustomKategori}
                    onChange={(e) => setNewCustomKategori(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCustomKategori();
                      }
                    }}
                    placeholder="Tambah jenis / kategori aduan baharu"
                    className="flex-1 rounded-xl border border-indigo-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={addCustomKategori}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-indigo-700"
                  >
                    <Plus className="h-4 w-4" />
                    Tambah Kategori
                  </button>
                </div>

                {(prData.aduan.customKategori || []).length > 0 && (
                  <div className="mt-4 space-y-3">
                    {(prData.aduan.customKategori || []).map((item) => (
                      <div key={item.id} className="rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm">
                        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_140px_auto_auto]">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateCustomKategori(item.id, 'name', e.target.value)}
                            className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Nama kategori aduan"
                          />
                          <input
                            type="number"
                            value={item.value}
                            onChange={(e) => updateCustomKategori(item.id, 'value', e.target.value)}
                            className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-black text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="0"
                          />
                          <button
                            type="button"
                            onClick={handleSave}
                            disabled={isSaving}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-[11px] font-black uppercase tracking-widest text-white transition hover:bg-emerald-700 disabled:opacity-60"
                          >
                            <Save className="h-4 w-4" />
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => removeCustomKategori(item.id)}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-50 px-4 py-3 text-[11px] font-black uppercase tracking-widest text-rose-600 ring-1 ring-rose-100 transition hover:bg-rose-100"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className={`p-3 rounded-xl flex justify-between items-center ${totalAduanKategori === totalAduanSumber ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                <span className="text-[10px] font-black uppercase">Jumlah Kategori</span>
                <span className="font-black">{totalAduanKategori}</span>
              </div>
            </div>

            {/* C. Lokasi PAIB */}
            <div className="space-y-4">
              <h4 className="text-sm font-black text-indigo-900 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> LOKASI PAIB
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(prData.aduan.lokasi).map(([key, val]) => (
                  <div key={key} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <label className="block text-[9px] font-black text-slate-400 uppercase mb-1 truncate">
                      {aduanLokasiLabels[key]}
                    </label>
                    <p className="mb-1 text-[9px] font-bold text-slate-300">Ref 2024: {UKOKO_PR_2024_REFERENCE.aduan.lokasi[key as keyof typeof UKOKO_PR_2024_REFERENCE.aduan.lokasi]}</p>
                    <input
                      type="number"
                      value={val}
                      onChange={(e) => updateField(`aduan.lokasi.${key}`, e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                ))}
              </div>
              <div className={`p-3 rounded-xl flex justify-between items-center ${totalAduanLokasi === totalAduanSumber ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                <span className="text-[10px] font-black uppercase">Jumlah Lokasi</span>
                <span className="font-black">{totalAduanLokasi}</span>
              </div>
            </div>
          </div>

          {!isAduanBalanced && totalAduanSumber > 0 && (
            <div className="mt-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-xs font-bold uppercase tracking-tight">
                Amaran: Jumlah Kategori ({totalAduanKategori}) atau Lokasi ({totalAduanLokasi}) tidak sepadan dengan Jumlah Aduan ({totalAduanSumber}).
              </p>
            </div>
          )}

          {/* Bar Chart Placeholders */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-48 rounded-[1.75rem] border border-slate-100 bg-slate-50 p-6 text-slate-400 flex flex-col items-center justify-center">
              <BarChart3 className="w-8 h-8 mb-2 opacity-20" />
              <p className="text-[10px] font-black uppercase tracking-widest">Visualisasi Kategori Aduan</p>
              <div className="w-full mt-4 flex items-end gap-2 h-16 px-4">
                {[40, 70, 30, 90, 50, 60, 20, 45].map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-indigo-200 rounded-t-sm opacity-50"></div>
                ))}
              </div>
            </div>
            <div className="h-48 rounded-[1.75rem] border border-slate-100 bg-slate-50 p-6 text-slate-400 flex flex-col items-center justify-center">
              <BarChart3 className="w-8 h-8 mb-2 opacity-20" />
              <p className="text-[10px] font-black uppercase tracking-widest">Visualisasi Lokasi PAIB</p>
              <div className="w-full mt-4 flex items-end gap-2 h-16 px-8">
                {[60, 40, 80, 50, 30, 70].map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-purple-200 rounded-t-sm opacity-50"></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. Maklum Balas Pelanggan */}
        <section className="overflow-hidden rounded-[2rem] border border-purple-100 bg-white p-6 shadow-sm md:p-8">
          <div className="flex items-center gap-3 mb-8 border-b border-purple-50 pb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
              <Smile className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-purple-950 uppercase tracking-tight">Maklum Balas Pelanggan</h3>
              <p className="text-xs text-purple-400 font-bold uppercase tracking-widest">Kepuasan Perkhidmatan • Ref 2024: {UKOKO_PR_2024_REFERENCE.maklumBalas.jumlah.toLocaleString()}</p>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="rounded-3xl border border-purple-100 bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-6 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-purple-500">Jumlah Maklum Balas</p>
              <p className="mt-3 text-4xl font-black text-purple-950">{totalMaklumBalas.toLocaleString()}</p>
              <p className="mt-2 text-xs font-semibold text-slate-400">Rujukan 2024: {UKOKO_PR_2024_REFERENCE.maklumBalas.jumlah.toLocaleString()}</p>
            </div>
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-600">Puas Hati</p>
              <p className="mt-3 text-4xl font-black text-emerald-950">
                {(prData.maklumBalas.queueBee.puas + prData.maklumBalas.qrCode.puas).toLocaleString()}
              </p>
              <p className="mt-2 text-xs font-semibold text-emerald-700">Queue Bee + Kod QR</p>
            </div>
            <div className="rounded-3xl border border-rose-100 bg-rose-50 p-6 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-rose-600">Tidak Puas</p>
              <p className="mt-3 text-4xl font-black text-rose-950">
                {(prData.maklumBalas.queueBee.tidakPuas + prData.maklumBalas.qrCode.tidakPuas).toLocaleString()}
              </p>
              <p className="mt-2 text-xs font-semibold text-rose-700">Queue Bee + Kod QR</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Queue Bee */}
            <div className="bg-indigo-50/30 rounded-3xl p-6 border border-indigo-100">
              <h4 className="text-xs font-black text-indigo-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Queue Bee System
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-600 mb-1">
                    <Smile className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase">Puas Hati</span>
                  </div>
                  <p className="text-[10px] font-bold text-emerald-300">Ref 2024: {UKOKO_PR_2024_REFERENCE.maklumBalas.queueBee.puas.toLocaleString()}</p>
                  <input
                    type="number"
                    value={prData.maklumBalas.queueBee.puas}
                    onChange={(e) => updateField('maklumBalas.queueBee.puas', e.target.value)}
                    className="w-full bg-white border border-emerald-200 rounded-xl p-3 font-black text-emerald-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-rose-600 mb-1">
                    <Frown className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase">Tidak Puas</span>
                  </div>
                  <p className="text-[10px] font-bold text-rose-300">Ref 2024: {UKOKO_PR_2024_REFERENCE.maklumBalas.queueBee.tidakPuas}</p>
                  <input
                    type="number"
                    value={prData.maklumBalas.queueBee.tidakPuas}
                    onChange={(e) => updateField('maklumBalas.queueBee.tidakPuas', e.target.value)}
                    className="w-full bg-white border border-rose-200 rounded-xl p-3 font-black text-rose-900 focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-indigo-100 flex justify-between items-center">
                <span className="text-[10px] font-black text-indigo-400 uppercase">Sub-Jumlah</span>
                <span className="text-lg font-black text-indigo-900">{totalQueueBee}</span>
              </div>
              <p className="mt-2 text-[10px] font-bold text-indigo-300 uppercase">Jumlah Ref 2024: {UKOKO_PR_2024_REFERENCE.maklumBalas.queueBee.jumlah.toLocaleString()}</p>
            </div>

            {/* QR Code */}
            <div className="bg-purple-50/30 rounded-3xl p-6 border border-purple-100">
              <h4 className="text-xs font-black text-purple-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Kod QR
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-600 mb-1">
                    <Smile className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase">Puas Hati</span>
                  </div>
                  <p className="text-[10px] font-bold text-emerald-300">Ref 2024: {UKOKO_PR_2024_REFERENCE.maklumBalas.kodQr.puas}</p>
                  <input
                    type="number"
                    value={prData.maklumBalas.qrCode.puas}
                    onChange={(e) => updateField('maklumBalas.qrCode.puas', e.target.value)}
                    className="w-full bg-white border border-emerald-200 rounded-xl p-3 font-black text-emerald-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-rose-600 mb-1">
                    <Frown className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase">Tidak Puas</span>
                  </div>
                  <p className="text-[10px] font-bold text-rose-300">Ref 2024: {UKOKO_PR_2024_REFERENCE.maklumBalas.kodQr.tidakPuas}</p>
                  <input
                    type="number"
                    value={prData.maklumBalas.qrCode.tidakPuas}
                    onChange={(e) => updateField('maklumBalas.qrCode.tidakPuas', e.target.value)}
                    className="w-full bg-white border border-rose-200 rounded-xl p-3 font-black text-rose-900 focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-purple-100 flex justify-between items-center">
                <span className="text-[10px] font-black text-purple-400 uppercase">Sub-Jumlah</span>
                <span className="text-lg font-black text-purple-900">{totalQrCode}</span>
              </div>
              <p className="mt-2 text-[10px] font-bold text-purple-300 uppercase">Jumlah Ref 2024: {UKOKO_PR_2024_REFERENCE.maklumBalas.kodQr.jumlah}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-6 rounded-[2rem] bg-gradient-to-r from-indigo-900 to-purple-900 p-8 text-white md:flex-row">
            <div>
              <p className="text-indigo-200 text-xs font-black uppercase tracking-widest mb-1">Jumlah Keseluruhan Maklum Balas</p>
              <h3 className="text-5xl font-black tracking-tighter">{totalMaklumBalas.toLocaleString()}</h3>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-indigo-200/70">Ref 2024: {UKOKO_PR_2024_REFERENCE.maklumBalas.jumlah.toLocaleString()}</p>
            </div>
            <div className="flex gap-4">
              <div className="text-center px-6 py-3 bg-white/10 rounded-2xl backdrop-blur-md">
                <p className="text-[10px] font-black uppercase opacity-60">Puas Hati</p>
                <p className="text-xl font-black text-emerald-400">
                  {(prData.maklumBalas.queueBee.puas + prData.maklumBalas.qrCode.puas).toLocaleString()}
                </p>
              </div>
              <div className="text-center px-6 py-3 bg-white/10 rounded-2xl backdrop-blur-md">
                <p className="text-[10px] font-black uppercase opacity-60">Tidak Puas</p>
                <p className="text-xl font-black text-rose-400">
                  {(prData.maklumBalas.queueBee.tidakPuas + prData.maklumBalas.qrCode.tidakPuas).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Lawatan Luar */}
        <section className="overflow-hidden rounded-[2rem] border border-indigo-100 bg-white p-6 shadow-sm md:p-8">
          <div className="flex items-center gap-3 mb-8 border-b border-indigo-50 pb-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-indigo-950 uppercase tracking-tight">Lawatan Luar</h3>
              <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest">Agensi / Badan / NGO / Syarikat • Ref 2024: {UKOKO_PR_2024_REFERENCE.lawatanLuar}</p>
            </div>
          </div>

          <div className="max-w-md">
            <div className="p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100 flex items-center gap-6">
              <div className="flex-1">
                <label className="block text-xs font-black text-indigo-900 uppercase mb-2">Jumlah Lawatan Diterima</label>
                <input
                  type="number"
                  value={prData.lawatanLuar}
                  onChange={(e) => updateField('lawatanLuar', e.target.value)}
                  className="w-full bg-white border border-indigo-200 rounded-2xl p-4 font-black text-3xl text-indigo-900 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all"
                  placeholder="0"
                />
              </div>
              <div className="w-20 h-20 bg-indigo-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <TrendingUp className="w-10 h-10 opacity-40" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </FormLayout>
  );
};

export default UkokoPublicRelationsForm;
