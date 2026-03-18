import React from 'react';
import { 
  MessageSquare, 
  MapPin, 
  BarChart3, 
  Smile, 
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
    customLokasi: Array<{
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
        customKategori: [],
        customLokasi: []
      },
      maklumBalas: {
        queueBee: { puas: 0, tidakPuas: 0 },
        qrCode: { puas: 0, tidakPuas: 0 }
      },
      lawatanLuar: 0
    }
  });

  const prData = {
    aduan: {
      sumber: {
        talikhidmat: formData.pr?.aduan?.sumber?.talikhidmat || 0,
        lain: formData.pr?.aduan?.sumber?.lain || 0,
      },
      statusSelesai: formData.pr?.aduan?.statusSelesai || 0,
      kategori: {
        masjid: formData.pr?.aduan?.kategori?.masjid || 0,
        kadNikah: formData.pr?.aduan?.kategori?.kadNikah || 0,
        kafa: formData.pr?.aduan?.kategori?.kafa || 0,
        logoHalal: formData.pr?.aduan?.kategori?.logoHalal || 0,
        ncr: formData.pr?.aduan?.kategori?.ncr || 0,
        tindakanPenguatkuasaanSyariah: formData.pr?.aduan?.kategori?.tindakanPenguatkuasaanSyariah || 0,
        tindakanPengukuhanPendidikanIslam: formData.pr?.aduan?.kategori?.tindakanPengukuhanPendidikanIslam || 0,
        usk: formData.pr?.aduan?.kategori?.usk || 0,
      },
      lokasi: {
        hqBkki: formData.pr?.aduan?.lokasi?.hqBkki || 0,
        paibBintulu: formData.pr?.aduan?.lokasi?.paibBintulu || 0,
        paibKuching: formData.pr?.aduan?.lokasi?.paibKuching || 0,
        paibMiri: formData.pr?.aduan?.lokasi?.paibMiri || 0,
        paibSarikei: formData.pr?.aduan?.lokasi?.paibSarikei || 0,
        paibSibu: formData.pr?.aduan?.lokasi?.paibSibu || 0,
      },
      customKategori: formData.pr?.aduan?.customKategori || [],
      customLokasi: formData.pr?.aduan?.customLokasi || [],
    },
    maklumBalas: {
      queueBee: {
        puas: formData.pr?.maklumBalas?.queueBee?.puas || 0,
        tidakPuas: formData.pr?.maklumBalas?.queueBee?.tidakPuas || 0,
      },
      qrCode: {
        puas:
          formData.pr?.maklumBalas?.qrCode?.puas ||
          formData.pr?.maklumBalas?.kodQr?.puas ||
          0,
        tidakPuas:
          formData.pr?.maklumBalas?.qrCode?.tidakPuas ||
          formData.pr?.maklumBalas?.kodQr?.tidakPuas ||
          0,
      },
    },
    lawatanLuar: formData.pr?.lawatanLuar || 0,
  } as UkokoPRData;
  const [newCustomKategori, setNewCustomKategori] = React.useState('');
  const [newCustomLokasi, setNewCustomLokasi] = React.useState('');

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

  const addCustomLokasi = () => {
    const trimmed = newCustomLokasi.trim();
    if (!trimmed) return;

    setFormData((prev: any) => ({
      ...prev,
      pr: {
        ...prev.pr,
        aduan: {
          ...prev.pr.aduan,
          customLokasi: [
            ...(prev.pr.aduan.customLokasi || []),
            {
              id: `${Date.now()}-${trimmed.toLowerCase().replace(/\s+/g, '-')}`,
              name: trimmed,
              value: 0,
            },
          ],
        },
      },
    }));
    setNewCustomLokasi('');
  };

  const updateCustomLokasi = (id: string, field: 'name' | 'value', value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      pr: {
        ...prev.pr,
        aduan: {
          ...prev.pr.aduan,
          customLokasi: (prev.pr.aduan.customLokasi || []).map((item: any) =>
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

  const removeCustomLokasi = (id: string) => {
    setFormData((prev: any) => ({
      ...prev,
      pr: {
        ...prev.pr,
        aduan: {
          ...prev.pr.aduan,
          customLokasi: (prev.pr.aduan.customLokasi || []).filter((item: any) => item.id !== id),
        },
      },
    }));
  };

  // Calculations
  const totalAduanSumber = prData.aduan.sumber.talikhidmat + prData.aduan.sumber.lain;
  const totalAduanKategori =
    Object.values(prData.aduan.kategori).reduce((a, b) => a + b, 0) +
    (prData.aduan.customKategori || []).reduce((sum, item) => sum + (item.value || 0), 0);
  const totalAduanLokasi =
    Object.values(prData.aduan.lokasi).reduce((a, b) => a + b, 0) +
    (prData.aduan.customLokasi || []).reduce((sum, item) => sum + (item.value || 0), 0);

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
  const complaintSummaryRows = [
    {
      label: 'Jumlah Aduan',
      ref: UKOKO_PR_2024_REFERENCE.aduan.jumlah,
      value: totalAduanSumber,
      readOnly: true,
    },
    {
      label: 'SCS Talikhidmat',
      ref: UKOKO_PR_2024_REFERENCE.aduan.sumber.talikhidmat,
      value: prData.aduan.sumber.talikhidmat,
      path: 'aduan.sumber.talikhidmat',
    },
    {
      label: 'Email / Emel / Surat',
      ref: UKOKO_PR_2024_REFERENCE.aduan.sumber.lain,
      value: prData.aduan.sumber.lain,
      path: 'aduan.sumber.lain',
    },
    {
      label: 'Status Selesai',
      ref: UKOKO_PR_2024_REFERENCE.aduan.statusSelesai,
      value: prData.aduan.statusSelesai,
      path: 'aduan.statusSelesai',
    },
  ];
  const feedbackRows = [
    {
      label: 'Queue Bee - Puas',
      ref: UKOKO_PR_2024_REFERENCE.maklumBalas.queueBee.puas,
      value: prData.maklumBalas.queueBee.puas,
      path: 'maklumBalas.queueBee.puas',
    },
    {
      label: 'Queue Bee - Tidak Puas',
      ref: UKOKO_PR_2024_REFERENCE.maklumBalas.queueBee.tidakPuas,
      value: prData.maklumBalas.queueBee.tidakPuas,
      path: 'maklumBalas.queueBee.tidakPuas',
    },
    {
      label: 'Kod QR - Puas',
      ref: UKOKO_PR_2024_REFERENCE.maklumBalas.qrCode.puas,
      value: prData.maklumBalas.qrCode.puas,
      path: 'maklumBalas.qrCode.puas',
    },
    {
      label: 'Kod QR - Tidak Puas',
      ref: UKOKO_PR_2024_REFERENCE.maklumBalas.qrCode.tidakPuas,
      value: prData.maklumBalas.qrCode.tidakPuas,
      path: 'maklumBalas.qrCode.tidakPuas',
    },
    {
      label: 'Jumlah Maklum Balas',
      ref: UKOKO_PR_2024_REFERENCE.maklumBalas.jumlah,
      value: totalMaklumBalas,
      readOnly: true,
    },
  ];
  const kategoriRows = Object.entries(prData.aduan.kategori).map(([key, value]) => ({
    key,
    label: aduanKategoriLabels[key] || key,
    ref: UKOKO_PR_2024_REFERENCE.aduan.kategori[key as keyof typeof UKOKO_PR_2024_REFERENCE.aduan.kategori] || 0,
    value,
    path: `aduan.kategori.${key}`,
  }));
  const lokasiRows = Object.entries(prData.aduan.lokasi).map(([key, value]) => ({
    key,
    label: aduanLokasiLabels[key] || key,
    ref: UKOKO_PR_2024_REFERENCE.aduan.lokasi[key as keyof typeof UKOKO_PR_2024_REFERENCE.aduan.lokasi] || 0,
    value,
    path: `aduan.lokasi.${key}`,
  }));

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
            Borang ini kini dipaparkan dalam susun atur satu aliran supaya item yang diisi mengikuti turutan komponen yang sama seperti paparan PDF eksport.
          </p>
        </section>

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

          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-indigo-100 bg-indigo-50 p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-500">Jumlah Aduan 2025</p>
              <p className="mt-2 text-4xl font-black text-indigo-950">{totalAduanSumber}</p>
              <p className="mt-2 text-xs font-semibold text-indigo-400">Ref 2024: {UKOKO_PR_2024_REFERENCE.aduan.jumlah}</p>
            </div>
            <div className={`rounded-3xl border p-5 ${isAduanBalanced ? 'border-emerald-100 bg-emerald-50 text-emerald-900' : 'border-rose-100 bg-rose-50 text-rose-900'}`}>
              <p className="text-[10px] font-black uppercase tracking-[0.25em]">Semakan Auto-Sum</p>
              <p className="mt-2 text-2xl font-black">{isAduanBalanced ? 'Jumlah Seimbang' : 'Jumlah Tidak Sepadan'}</p>
              <p className="mt-2 text-xs font-semibold">
                Sumber: {totalAduanSumber} · Kategori: {totalAduanKategori} · Lokasi: {totalAduanLokasi}
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h4 className="mb-4 flex items-center gap-2 text-sm font-black text-indigo-900">
                <TrendingUp className="w-4 h-4" /> RINGKASAN ADUAN & SUMBER
              </h4>
              <div className="overflow-x-auto rounded-3xl border border-indigo-100">
                <table className="w-full min-w-[640px] text-sm border-collapse">
                  <thead>
                    <tr className="bg-indigo-50">
                      <th className="border border-indigo-100 p-3 text-left font-black uppercase text-indigo-900">Komponen</th>
                      <th className="border border-indigo-100 p-3 text-center font-black uppercase text-indigo-900">2024</th>
                      <th className="border border-indigo-100 p-3 text-center font-black uppercase text-indigo-900">2025</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaintSummaryRows.map((row) => (
                      <tr key={row.label}>
                        <td className="border border-indigo-100 p-3 font-bold text-slate-800">{row.label}</td>
                        <td className="border border-indigo-100 p-3 text-center text-slate-500">{row.ref}</td>
                        <td className="border border-indigo-100 p-2">
                          {row.readOnly ? (
                            <div className="rounded-2xl bg-indigo-50 px-4 py-3 text-center font-black text-indigo-950">{row.value}</div>
                          ) : (
                            <input
                              type="number"
                              value={row.value}
                              onChange={(e) => updateField(row.path!, e.target.value)}
                              className="w-full rounded-2xl border border-indigo-200 bg-white px-4 py-3 text-center font-black text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 className="mb-4 flex items-center gap-2 text-sm font-black text-slate-900">
                <BarChart3 className="w-4 h-4" /> ADUAN MENGIKUT KATEGORI
              </h4>
              <div className="overflow-x-auto rounded-3xl border border-slate-200">
                <table className="w-full min-w-[640px] text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-200 p-3 text-left font-black uppercase text-slate-900">Kategori</th>
                      <th className="border border-slate-200 p-3 text-center font-black uppercase text-slate-900">2024</th>
                      <th className="border border-slate-200 p-3 text-center font-black uppercase text-slate-900">2025</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kategoriRows.map((row) => (
                      <tr key={row.key}>
                        <td className="border border-slate-200 p-3 font-bold text-slate-800">{row.label}</td>
                        <td className="border border-slate-200 p-3 text-center text-slate-500">{row.ref}</td>
                        <td className="border border-slate-200 p-2">
                          <input
                            type="number"
                            value={row.value}
                            onChange={(e) => updateField(row.path, e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center font-black text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </td>
                      </tr>
                    ))}
                    {(prData.aduan.customKategori || []).map((item) => (
                      <tr key={item.id}>
                        <td className="border border-slate-200 p-2">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateCustomKategori(item.id, 'name', e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Kategori tambahan"
                          />
                        </td>
                        <td className="border border-slate-200 p-3 text-center font-bold text-slate-400">-</td>
                        <td className="border border-slate-200 p-2">
                          <div className="flex gap-2">
                            <input
                              type="number"
                              value={item.value}
                              onChange={(e) => updateCustomKategori(item.id, 'value', e.target.value)}
                              className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center font-black text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
                              placeholder="0"
                            />
                            <button
                              type="button"
                              onClick={() => removeCustomKategori(item.id)}
                              className="inline-flex items-center justify-center rounded-2xl bg-rose-50 px-4 text-sm font-black text-rose-600 ring-1 ring-rose-100 transition hover:bg-rose-100"
                              aria-label={`Delete ${item.name || 'kategori'}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 p-3 font-black text-slate-900">JUMLAH</td>
                      <td className="border border-slate-200 p-3 text-center font-black text-slate-900">{UKOKO_PR_2024_REFERENCE.aduan.jumlah}</td>
                      <td className="border border-slate-200 p-3 text-center font-black text-slate-900">{totalAduanKategori}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/40 p-4">
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
              </div>
            </div>

            <div>
              <h4 className="mb-4 flex items-center gap-2 text-sm font-black text-purple-900">
                <MapPin className="w-4 h-4" /> ADUAN MENGIKUT BAHAGIAN / PAIB
              </h4>
              <div className="overflow-x-auto rounded-3xl border border-purple-100">
                <table className="w-full min-w-[640px] text-sm border-collapse">
                  <thead>
                    <tr className="bg-purple-50">
                      <th className="border border-purple-100 p-3 text-left font-black uppercase text-purple-900">Bahagian / PAIB</th>
                      <th className="border border-purple-100 p-3 text-center font-black uppercase text-purple-900">2024</th>
                      <th className="border border-purple-100 p-3 text-center font-black uppercase text-purple-900">2025</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lokasiRows.map((row) => (
                      <tr key={row.key}>
                        <td className="border border-purple-100 p-3 font-bold text-slate-800">{row.label}</td>
                        <td className="border border-purple-100 p-3 text-center text-slate-500">{row.ref}</td>
                        <td className="border border-purple-100 p-2">
                          <input
                            type="number"
                            value={row.value}
                            onChange={(e) => updateField(row.path, e.target.value)}
                            className="w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 text-center font-black text-slate-900 outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </td>
                      </tr>
                    ))}
                    {(prData.aduan.customLokasi || []).map((item) => (
                      <tr key={item.id}>
                        <td className="border border-purple-100 p-2">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateCustomLokasi(item.id, 'name', e.target.value)}
                            className="w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 font-bold text-slate-800 outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Bahagian / PAIB tambahan"
                          />
                        </td>
                        <td className="border border-purple-100 p-3 text-center font-bold text-slate-400">-</td>
                        <td className="border border-purple-100 p-2">
                          <div className="flex gap-2">
                            <input
                              type="number"
                              value={item.value}
                              onChange={(e) => updateCustomLokasi(item.id, 'value', e.target.value)}
                              className="flex-1 rounded-2xl border border-purple-200 bg-white px-4 py-3 text-center font-black text-slate-900 outline-none focus:ring-2 focus:ring-purple-500"
                              placeholder="0"
                            />
                            <button
                              type="button"
                              onClick={handleSave}
                              disabled={isSaving}
                              className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-4 text-sm font-black text-white transition hover:bg-emerald-700 disabled:opacity-60"
                              aria-label={`Save ${item.name || 'lokasi'}`}
                            >
                              <Save className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeCustomLokasi(item.id)}
                              className="inline-flex items-center justify-center rounded-2xl bg-rose-50 px-4 text-sm font-black text-rose-600 ring-1 ring-rose-100 transition hover:bg-rose-100"
                              aria-label={`Delete ${item.name || 'lokasi'}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-purple-50">
                      <td className="border border-purple-100 p-3 font-black text-purple-900">JUMLAH</td>
                      <td className="border border-purple-100 p-3 text-center font-black text-purple-900">{UKOKO_PR_2024_REFERENCE.aduan.jumlah}</td>
                      <td className="border border-purple-100 p-3 text-center font-black text-purple-900">{totalAduanLokasi}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 rounded-2xl border border-dashed border-purple-200 bg-purple-50/40 p-4">
                <div className="flex flex-col gap-3 md:flex-row">
                  <input
                    type="text"
                    value={newCustomLokasi}
                    onChange={(e) => setNewCustomLokasi(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCustomLokasi();
                      }
                    }}
                    placeholder="Tambah Bahagian / PAIB baharu"
                    className="flex-1 rounded-xl border border-purple-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="button"
                    onClick={addCustomLokasi}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-purple-700"
                  >
                    <Plus className="h-4 w-4" />
                    Tambah Bahagian / PAIB
                  </button>
                </div>
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

        </section>

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

          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-600">Jumlah Maklum Balas</p>
              <p className="mt-2 text-4xl font-black text-emerald-950">{totalMaklumBalas.toLocaleString()}</p>
              <p className="mt-2 text-xs font-semibold text-emerald-700">Ref 2024: {UKOKO_PR_2024_REFERENCE.maklumBalas.jumlah.toLocaleString()}</p>
            </div>
            <div className="rounded-3xl border border-emerald-100 bg-white p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-600">Puas Hati</p>
              <p className="mt-2 text-3xl font-black text-emerald-950">{(prData.maklumBalas.queueBee.puas + prData.maklumBalas.qrCode.puas).toLocaleString()}</p>
            </div>
            <div className="rounded-3xl border border-rose-100 bg-white p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-rose-600">Tidak Puas</p>
              <p className="mt-2 text-3xl font-black text-rose-950">{(prData.maklumBalas.queueBee.tidakPuas + prData.maklumBalas.qrCode.tidakPuas).toLocaleString()}</p>
            </div>
          </div>

          <div>
            <h4 className="mb-4 flex items-center gap-2 text-sm font-black text-emerald-900">
              <Smile className="w-4 h-4" /> MAKLUM BALAS PELANGGAN
            </h4>
            <div className="overflow-x-auto rounded-3xl border border-emerald-100">
              <table className="w-full min-w-[640px] text-sm border-collapse">
                <thead>
                  <tr className="bg-emerald-50">
                    <th className="border border-emerald-100 p-3 text-left font-black uppercase text-emerald-900">Platform</th>
                    <th className="border border-emerald-100 p-3 text-center font-black uppercase text-emerald-900">2024</th>
                    <th className="border border-emerald-100 p-3 text-center font-black uppercase text-emerald-900">2025</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbackRows.map((row) => (
                    <tr key={row.label}>
                      <td className="border border-emerald-100 p-3 font-bold text-slate-800">{row.label}</td>
                      <td className="border border-emerald-100 p-3 text-center text-slate-500">{row.ref.toLocaleString()}</td>
                      <td className="border border-emerald-100 p-2">
                        {row.readOnly ? (
                          <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-center font-black text-emerald-950">
                            {row.value.toLocaleString()}
                          </div>
                        ) : (
                          <input
                            type="number"
                            value={row.value}
                            onChange={(e) => updateField(row.path!, e.target.value)}
                            className="w-full rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-center font-black text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

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

          <div className="max-w-3xl overflow-x-auto rounded-3xl border border-indigo-100">
            <table className="w-full min-w-[520px] text-sm border-collapse">
              <tbody>
                <tr>
                  <td className="border border-indigo-100 p-3 font-black uppercase text-indigo-900">Jumlah Lawatan</td>
                  <td className="border border-indigo-100 p-3 text-center font-bold text-slate-500">{UKOKO_PR_2024_REFERENCE.lawatanLuar}</td>
                  <td className="border border-indigo-100 p-2">
                    <input
                      type="number"
                      value={prData.lawatanLuar}
                      onChange={(e) => updateField('lawatanLuar', e.target.value)}
                      className="w-full rounded-2xl border border-indigo-200 bg-white px-4 py-3 text-center font-black text-indigo-900 outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="0"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </FormLayout>
  );
};

export default UkokoPublicRelationsForm;
