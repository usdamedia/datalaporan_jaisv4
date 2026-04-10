import React, { useEffect, useMemo } from 'react';
import FormLayout from './FormLayout';
import { BasicInfoSection, NarrativeSection, LawatanSection } from './CommonSections';
import { useFormLogic } from './useFormLogic';
import { BPH_2024_REFERENCE, BPH_2025_REFERENCE } from '../../constants';
import { 
  ShieldCheck, 
  FileText, 
  Activity, 
  MapPin, 
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
  const FIXED_ACTIVITY_VALUES = useMemo(
    () => ({
      ziarahHalal: 40,
      taklimat: 26,
      kursus: 22,
      total: 40 + 26 + 22
    }),
    []
  );
  const FIXED_MONITORING_VALUES = useMemo(
    () => ({
      patuh: 277,
      amaran: 62,
      gantung: 68,
      tarikBalik: 5,
      total: 277 + 62 + 68 + 5
    }),
    []
  );
  const FIXED_SPHM_PERMOHONAN_VALUES = useMemo(
    () => ({
      rumahSembelihan: 22,
      produk: 263,
      premis: 379,
      oem: 8,
      logistik: 4,
      barangGunaan: 1,
      total: 22 + 263 + 379 + 8 + 4 + 1
    }),
    []
  );
  const FIXED_SPHM_AKTIF_VALUES = useMemo(
    () => ({
      rumahSembelihan: 26,
      produk: 461,
      premis: 547,
      oem: 32,
      logistik: 8,
      barangGunaan: 2,
      total: 26 + 461 + 547 + 32 + 8 + 2
    }),
    []
  );
  const FIXED_BPH_LAWATAN_VALUES = useMemo(
    () => ([
      {
        jenis: 'keluar',
        tajukAgensi: 'Lawatan Malaysian International Halal Showcase (MIHAS)',
        tarikh: '2025-09-16',
        tempat: 'MITEC, Kuala Lumpur',
        objektif: 'Pendedahan industri: menambah pengetahuan tentang trend, inovasi dan teknologi terkini dalam ekosistem halal; promosi antarabangsa serta penanda aras (benchmarking) piawaian industri daripada pempamer antarabangsa.',
      },
      {
        jenis: 'masuk',
        tajukAgensi: 'Lawatan dari pihak JAKIM Putrajaya, Jabatan Agama Islam Negeri ke Zon Halal Lundu',
        tarikh: '2025-03-02',
        tempat: 'Mecca',
        objektif: 'Menghadiri Mecca Halal Forum dan mempromosi peniaga serta produk Sarawak di peringkat antarabangsa.',
      },
      {
        jenis: 'masuk',
        tajukAgensi: 'Kunjungan Hormat Delegasi Centexs Commercial Sarawak ke Jabatan Agama Islam Sarawak',
        tarikh: '2025-10-03',
        tempat: 'ARAS 12, MTAHMS',
        objektif: 'Mempergiat dan memperluaskan bakat dan pendidikan halal ke Centex Sarawak.',
      },
      {
        jenis: 'masuk',
        tajukAgensi: 'Perbincangan bersama Haltex Group PTE LTD Limited',
        tarikh: '2025-07-04',
        tempat: 'ARAS 12, MTAHMS',
        objektif: 'Menjalinkan kerjasama bersama JAIS bagi perundingan, latihan dan pembangunan industri halal.',
      },
      {
        jenis: 'keluar',
        tajukAgensi: 'Kunjungan Hormat pihak Akademi Pengajian Islam Kontemporari (ACIS) UiTM, Shah Alam ke BPH, JAIS',
        tarikh: '2025-05-20',
        tempat: 'ARAS 12, MTAHMS',
        objektif: 'Menyokong dari segi pendidikan halal sedia ada dan kursus baharu yang bakal ditubuhkan.',
      },
      {
        jenis: 'masuk',
        tajukAgensi: 'Taklimat kerjasama Pengurusan Halal UiTM Sarawak dan BPH, JAIS',
        tarikh: '2025-07-10',
        tempat: 'ARAS 12, MTAHMS',
        objektif: 'Mengadakan perbincangan secara telus berkenaan pendidikan dan kerjasama antara UiTM Sarawak dengan BPH.',
      },
      {
        jenis: 'keluar',
        tajukAgensi: 'Lawatan Penanda Aras Pensijilan Halal Industri Kotej di Negeri Sembilan & Lawatan ke Pusat Analisis Halal Makmal (MYHAC) JAKIM',
        tarikh: '2025-04-17',
        tempat: 'Negeri Sembilan',
        objektif: 'Mempelajari berkenaan industri kotej berkaitan halal di Negeri Sembilan dan mengadakan lawatan di MYHAC JAKIM.',
      },
      {
        jenis: 'masuk',
        tajukAgensi: 'Kunjungan Hormat Pihak Halalpreneur Sarawak ke Bahagian Pengurusan Halal, JAIS',
        tarikh: '2025-09-09',
        tempat: 'ARAS 12, MTAHMS',
        objektif: 'Mengadakan perbincangan dan kolaborasi bersama dengan BPH.',
      },
      {
        jenis: 'keluar',
        tajukAgensi: 'Mengadakan Perbincangan Meja Bulat bersama Panel Pakar Halal JAKIM bersama BPH, JAIS & MPC bagi keberkesanan ISPHM di Sarawak',
        tarikh: '2025-10-29',
        tempat: 'Hotel Zenith, Putrajaya',
        objektif: 'Mengadakan perbincangan meja bulat bersama JAKIM bagi menangani isu Mye-Halal untuk mencapai inisiatif Pensijilan Halal Malaysia.',
      },
      {
        jenis: 'masuk',
        tajukAgensi: 'Menjadi Tuan Rumah kepada Mesyuarat Jawatankuasa Pelaksana Pensijilan Halal JAKIM Bil.3/2025',
        tarikh: '2025-10-28',
        tempat: 'Waterfront Hotel, Kuching',
        objektif: 'Menjadi tuan rumah bagi mesyuarat pelaksana pensijilan halal yang dihadiri oleh pihak JAKIM, JAIN dan MAIN.',
      },
    ]),
    []
  );

  const initialState = {
    tarikh: '2026-04-06',
    disediakanOleh: 'EFFA RINA BINTI ABD SALAM',
    jawatan: 'Ketua Bahagian Pengurusan Halal',
    ringkasan: '',
    isu: '',
    cadangan: '',
    lawatan: [],
    bph: {
      sphm: {
        permohonan: BPH_2025_REFERENCE.sphm.permohonan.toString(),
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
        patuh: BPH_2025_REFERENCE.pemantauan.patuh.toString(),
        amaran: BPH_2025_REFERENCE.pemantauan.amaran.toString(),
        gantung: BPH_2025_REFERENCE.pemantauan.gantung.toString(),
        tarikBalik: BPH_2025_REFERENCE.pemantauan.tarikBalik.toString(),
        lain: ''
      },
      penguatkuasaan: '',
      aduan: '',
      ziarahHalal: '',
      zonHalal: BPH_2025_REFERENCE.zonHalal,
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

  useEffect(() => {
    setFormData((prev: any) => {
      if (!prev?.bph) return prev;

      const currentAktiviti = prev.bph.aktiviti || {};
      const needsUpdate =
        String(prev.bph.ziarahHalal ?? '') !== String(FIXED_ACTIVITY_VALUES.ziarahHalal) ||
        String(currentAktiviti.taklimat ?? '') !== String(FIXED_ACTIVITY_VALUES.taklimat) ||
        String(currentAktiviti.kursus ?? '') !== String(FIXED_ACTIVITY_VALUES.kursus) ||
        String(currentAktiviti.total ?? '') !== String(FIXED_ACTIVITY_VALUES.total);

      if (!needsUpdate) return prev;

      return {
        ...prev,
        bph: {
          ...prev.bph,
          ziarahHalal: String(FIXED_ACTIVITY_VALUES.ziarahHalal),
          aktiviti: {
            ...currentAktiviti,
            taklimat: String(FIXED_ACTIVITY_VALUES.taklimat),
            kursus: String(FIXED_ACTIVITY_VALUES.kursus),
            total: String(FIXED_ACTIVITY_VALUES.total)
          }
        }
      };
    });
  }, [FIXED_ACTIVITY_VALUES, setFormData]);

  useEffect(() => {
    setFormData((prev: any) => {
      if (!prev?.bph) return prev;

      const currentPemantauan = prev.bph.pemantauan || {};
      const needsUpdate =
        String(currentPemantauan.patuh ?? '') !== String(FIXED_MONITORING_VALUES.patuh) ||
        String(currentPemantauan.amaran ?? '') !== String(FIXED_MONITORING_VALUES.amaran) ||
        String(currentPemantauan.gantung ?? '') !== String(FIXED_MONITORING_VALUES.gantung) ||
        String(currentPemantauan.tarikBalik ?? '') !== String(FIXED_MONITORING_VALUES.tarikBalik) ||
        String(currentPemantauan.lain ?? '') !== '0';

      if (!needsUpdate) return prev;

      return {
        ...prev,
        bph: {
          ...prev.bph,
          pemantauan: {
            ...currentPemantauan,
            patuh: String(FIXED_MONITORING_VALUES.patuh),
            amaran: String(FIXED_MONITORING_VALUES.amaran),
            gantung: String(FIXED_MONITORING_VALUES.gantung),
            tarikBalik: String(FIXED_MONITORING_VALUES.tarikBalik),
            lain: '0'
          }
        }
      };
    });
  }, [FIXED_MONITORING_VALUES, setFormData]);

  useEffect(() => {
    setFormData((prev: any) => {
      if (!prev?.bph?.sphm) return prev;

      const currentPermohonanSkim = prev.bph.sphm.permohonanSkim || {};
      const needsUpdate =
        String(currentPermohonanSkim.rumahSembelihan ?? '') !== String(FIXED_SPHM_PERMOHONAN_VALUES.rumahSembelihan) ||
        String(currentPermohonanSkim.produk ?? '') !== String(FIXED_SPHM_PERMOHONAN_VALUES.produk) ||
        String(currentPermohonanSkim.premis ?? '') !== String(FIXED_SPHM_PERMOHONAN_VALUES.premis) ||
        String(currentPermohonanSkim.oem ?? '') !== String(FIXED_SPHM_PERMOHONAN_VALUES.oem) ||
        String(currentPermohonanSkim.logistik ?? '') !== String(FIXED_SPHM_PERMOHONAN_VALUES.logistik) ||
        String(currentPermohonanSkim.barangGunaan ?? '') !== String(FIXED_SPHM_PERMOHONAN_VALUES.barangGunaan) ||
        String(prev.bph.sphm.permohonan ?? '') !== String(FIXED_SPHM_PERMOHONAN_VALUES.total);

      if (!needsUpdate) return prev;

      return {
        ...prev,
        bph: {
          ...prev.bph,
          sphm: {
            ...prev.bph.sphm,
            permohonan: String(FIXED_SPHM_PERMOHONAN_VALUES.total),
            permohonanSkim: {
              ...currentPermohonanSkim,
              rumahSembelihan: String(FIXED_SPHM_PERMOHONAN_VALUES.rumahSembelihan),
              produk: String(FIXED_SPHM_PERMOHONAN_VALUES.produk),
              premis: String(FIXED_SPHM_PERMOHONAN_VALUES.premis),
              oem: String(FIXED_SPHM_PERMOHONAN_VALUES.oem),
              logistik: String(FIXED_SPHM_PERMOHONAN_VALUES.logistik),
              barangGunaan: String(FIXED_SPHM_PERMOHONAN_VALUES.barangGunaan)
            }
          }
        }
      };
    });
  }, [FIXED_SPHM_PERMOHONAN_VALUES, setFormData]);

  useEffect(() => {
    setFormData((prev: any) => {
      if (!prev?.bph?.sphm?.skim) return prev;

      const currentSkim = prev.bph.sphm.skim || {};
      const needsUpdate =
        String(currentSkim.rumahSembelihan ?? '') !== String(FIXED_SPHM_AKTIF_VALUES.rumahSembelihan) ||
        String(currentSkim.produk ?? '') !== String(FIXED_SPHM_AKTIF_VALUES.produk) ||
        String(currentSkim.premis ?? '') !== String(FIXED_SPHM_AKTIF_VALUES.premis) ||
        String(currentSkim.oem ?? '') !== String(FIXED_SPHM_AKTIF_VALUES.oem) ||
        String(currentSkim.logistik ?? '') !== String(FIXED_SPHM_AKTIF_VALUES.logistik) ||
        String(currentSkim.barangGunaan ?? '') !== String(FIXED_SPHM_AKTIF_VALUES.barangGunaan);

      if (!needsUpdate) return prev;

      return {
        ...prev,
        bph: {
          ...prev.bph,
          sphm: {
            ...prev.bph.sphm,
            skim: {
              ...currentSkim,
              rumahSembelihan: String(FIXED_SPHM_AKTIF_VALUES.rumahSembelihan),
              produk: String(FIXED_SPHM_AKTIF_VALUES.produk),
              premis: String(FIXED_SPHM_AKTIF_VALUES.premis),
              oem: String(FIXED_SPHM_AKTIF_VALUES.oem),
              logistik: String(FIXED_SPHM_AKTIF_VALUES.logistik),
              barangGunaan: String(FIXED_SPHM_AKTIF_VALUES.barangGunaan)
            }
          }
        }
      };
    });
  }, [FIXED_SPHM_AKTIF_VALUES, setFormData]);

  useEffect(() => {
    setFormData((prev: any) => {
      const currentLawatan = prev?.lawatan || [];
      const nextLawatan = FIXED_BPH_LAWATAN_VALUES;
      const sameLawatan = JSON.stringify(currentLawatan) === JSON.stringify(nextLawatan);
      if (sameLawatan) return prev;
      return {
        ...prev,
        lawatan: nextLawatan
      };
    });
  }, [FIXED_BPH_LAWATAN_VALUES, setFormData]);

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

  const chartData = [
    { name: '2024', permohonan: BPH_2024_REFERENCE.sphm.permohonan, aktif: BPH_2024_REFERENCE.sphm.aktif },
    { name: '2025', permohonan: FIXED_SPHM_PERMOHONAN_VALUES.total, aktif: FIXED_SPHM_AKTIF_VALUES.total }
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
      <div>
      <BasicInfoSection formData={formData} handleInputChange={handleInputChange} />

      <div className="mt-8 space-y-8 animate-fade-in px-4 md:px-8">
        {/* 1. SPHM Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#5A5A40] p-4 flex items-center gap-4">
            <ShieldCheck className="w-5 h-5 text-zus-gold" />
            <h3 className="text-white font-bold">1. Statistik Sijil Pengesahan Halal Malaysia (SPHM) 2025</h3>
          </div>
          <div className="p-6 space-y-10">
            {/* Unified SPHM Tables */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
              {/* Table 1: Permohonan Sijil */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 border-l-4 border-zus-gold pl-4">
                  <h4 className="text-[11px] font-black text-zus-900 uppercase tracking-wider">Statistik Permohonan SPHM</h4>
                </div>
                <div className="overflow-hidden bg-white border border-gray-100 rounded-2xl shadow-sm">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50/80 border-b border-gray-100">
                        <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-500">Kategori Skim</th>
                        <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-500 text-center">2024</th>
                        <th className="px-4 py-3 text-[10px] font-black uppercase text-zus-900 text-center">2025</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        { label: 'Rumah Sembelihan', field: 'rumahSembelihan', ref: 'Rujukan 2024: -', value: FIXED_SPHM_PERMOHONAN_VALUES.rumahSembelihan },
                        { label: 'Produk Makanan / Minuman', field: 'produk', ref: 'Rujukan 2024: -', value: FIXED_SPHM_PERMOHONAN_VALUES.produk },
                        { label: 'Premis Makanan', field: 'premis', ref: 'Rujukan 2024: -', value: FIXED_SPHM_PERMOHONAN_VALUES.premis },
                        { label: 'Skim Pengilangan Kontrak (OEM)', field: 'oem', ref: 'Rujukan 2024: -', value: FIXED_SPHM_PERMOHONAN_VALUES.oem },
                        { label: 'Logistik', field: 'logistik', ref: 'Rujukan 2024: -', value: FIXED_SPHM_PERMOHONAN_VALUES.logistik },
                        { label: 'Barang Gunaan', field: 'barangGunaan', ref: 'Rujukan 2024: -', value: FIXED_SPHM_PERMOHONAN_VALUES.barangGunaan },
                      ].map(item => (
                        <tr key={item.field} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3 text-[10px] font-bold text-gray-700">{item.label}</td>
                          <td className="px-4 py-3 text-[10px] font-bold text-gray-400 text-center italic">{item.ref}</td>
                          <td className="px-4 py-2">
                            <input 
                              type="number" 
                              value={item.value}
                              readOnly
                              className="w-full max-w-[80px] mx-auto block p-2 bg-gray-100 border border-gray-200 rounded-lg text-xs font-bold text-center text-zus-900 outline-none pointer-events-none" 
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-olive-50/50 border-t border-olive-100">
                        <td colSpan={2} className="px-4 py-3 text-[10px] font-black uppercase text-olive-900">Jumlah Permohonan</td>
                        <td className="px-4 py-3 text-lg font-black text-olive-900 text-center">{FIXED_SPHM_PERMOHONAN_VALUES.total}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Table 2: Pemilik Sijil Aktif */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 border-l-4 border-zus-gold pl-4">
                  <h4 className="text-[11px] font-black text-zus-900 uppercase tracking-wider">Pemilik Sijil (SPHM) Aktif</h4>
                </div>
                <div className="overflow-hidden bg-white border border-gray-100 rounded-2xl shadow-sm">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50/80 border-b border-gray-100">
                        <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-500">Kategori Skim</th>
                        <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-500 text-center">2024</th>
                        <th className="px-4 py-3 text-[10px] font-black uppercase text-zus-900 text-center">2025</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        { label: 'Rumah Sembelihan', field: 'rumahSembelihan', ref: BPH_2024_REFERENCE.sphm.skim.rumahSembelihan, value: FIXED_SPHM_AKTIF_VALUES.rumahSembelihan },
                        { label: 'Produk Makanan / Minuman', field: 'produk', ref: BPH_2024_REFERENCE.sphm.skim.produk, value: FIXED_SPHM_AKTIF_VALUES.produk },
                        { label: 'Premis Makanan', field: 'premis', ref: BPH_2024_REFERENCE.sphm.skim.premis, value: FIXED_SPHM_AKTIF_VALUES.premis },
                        { label: 'Skim Pengilangan Kontrak (OEM)', field: 'oem', ref: BPH_2024_REFERENCE.sphm.skim.oem, value: FIXED_SPHM_AKTIF_VALUES.oem },
                        { label: 'Logistik', field: 'logistik', ref: BPH_2024_REFERENCE.sphm.skim.logistik, value: FIXED_SPHM_AKTIF_VALUES.logistik },
                        { label: 'Barang Gunaan', field: 'barangGunaan', ref: BPH_2024_REFERENCE.sphm.skim.barangGunaan, value: FIXED_SPHM_AKTIF_VALUES.barangGunaan },
                      ].map(item => (
                        <tr key={item.field} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3 text-[10px] font-bold text-gray-700">{item.label}</td>
                          <td className="px-4 py-3 text-xs font-black text-gray-400 text-center">{item.ref}</td>
                          <td className="px-4 py-2">
                            <input 
                              type="number" 
                              value={item.value}
                              readOnly
                              className="w-full max-w-[80px] mx-auto block p-2 bg-gray-100 border border-gray-200 rounded-lg text-xs font-bold text-center text-zus-900 outline-none pointer-events-none" 
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-[#5A5A40] border-t border-gray-700">
                        <td colSpan={2} className="px-4 py-3 text-[10px] font-black uppercase text-zus-gold">Jumlah Pemilik Aktif</td>
                        <td className="px-4 py-3 text-lg font-black text-zus-gold text-center">{FIXED_SPHM_AKTIF_VALUES.total}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-black text-zus-900 uppercase flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-olive-600" />
                Perbandingan SPHM (2024 vs 2025)
              </h4>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
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

                <div className="overflow-hidden bg-white border border-gray-100 rounded-2xl shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50/50">
                        <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-500">Tahun</th>
                        <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-500 text-center">Permohonan</th>
                        <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-500 text-center">Pemilik Aktif</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr>
                        <td className="px-4 py-4 text-xs font-bold text-gray-500">2024 (Ref)</td>
                        <td className="px-4 py-4 text-xs font-black text-center text-zus-900">{BPH_2024_REFERENCE.sphm.permohonan}</td>
                        <td className="px-4 py-4 text-xs font-black text-center text-zus-900">{BPH_2024_REFERENCE.sphm.aktif}</td>
                      </tr>
                      <tr className="bg-olive-50/30">
                        <td className="px-4 py-4 text-xs font-bold text-olive-900">2025 (Semasa)</td>
                        <td className="px-4 py-4 text-sm font-black text-center text-olive-900">{sphmTotalPermohonan || BPH_2025_REFERENCE.sphm.permohonan}</td>
                        <td className="px-4 py-4 text-sm font-black text-center text-olive-900">{sphmTotalAktif || BPH_2025_REFERENCE.sphm.aktif}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-4">
                <Info className="w-4 h-4 text-blue-500 mt-0.5" />
                <p className="text-[10px] text-blue-700 leading-relaxed">
                  Data 2024 adalah sebagai rujukan prestasi jabatan. Data 2025 adalah data semasa yang direkodkan melalui sistem.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Pemantauan Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#5A5A40] p-4 flex items-center gap-4">
            <Activity className="w-5 h-5 text-zus-gold" />
            <h3 className="text-white font-bold">2. Pemantauan, Penguatkuasaan & Aduan</h3>
          </div>
          <div className="p-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <h4 className="text-xs font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-4">Hasil Pemantauan 2025</h4>
                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50/80 border-b border-gray-100">
                        <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-500">Kategori</th>
                        <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-500 text-center">2024</th>
                        <th className="px-4 py-3 text-[10px] font-black uppercase text-zus-900 text-center">2025</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        { label: 'Mematuhi Piawaian', ref2024: BPH_2024_REFERENCE.pemantauan.patuh, value2025: FIXED_MONITORING_VALUES.patuh, icon: CheckCircle2 },
                        { label: 'Diberi Amaran', ref2024: BPH_2024_REFERENCE.pemantauan.amaran, value2025: FIXED_MONITORING_VALUES.amaran, icon: AlertCircle },
                        { label: 'Digantung SPHM', ref2024: BPH_2024_REFERENCE.pemantauan.gantung, value2025: FIXED_MONITORING_VALUES.gantung, icon: AlertTriangle },
                        { label: 'Ditarik Balik SPHM', ref2024: BPH_2024_REFERENCE.pemantauan.tarikBalik, value2025: FIXED_MONITORING_VALUES.tarikBalik, icon: XCircle },
                      ].map(item => (
                        <tr key={item.label} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <item.icon className="h-4 w-4 text-emerald-600" />
                              <span className="text-[10px] font-bold text-gray-700">{item.label}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs font-black text-gray-500 text-center">{item.ref2024}</td>
                          <td className="px-4 py-3 text-sm font-black text-emerald-700 text-center">{item.value2025}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-emerald-50 border-t border-emerald-100">
                        <td className="px-4 py-3 text-[10px] font-black uppercase text-emerald-900">Jumlah Pemantauan</td>
                        <td className="px-4 py-3 text-xs font-black text-emerald-700 text-center">{BPH_2024_REFERENCE.pemantauan.total}</td>
                        <td className="px-4 py-3 text-base font-black text-emerald-900 text-center">{FIXED_MONITORING_VALUES.total}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-4">Penguatkuasaan & Aduan</h4>
                <div className="overflow-x-auto rounded-2xl border border-gray-100">
                  <table className="w-full min-w-[430px] text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-[10px] font-black uppercase text-gray-500">Perkara</th>
                        <th className="px-4 py-3 text-center text-[10px] font-black uppercase text-gray-500">Rujukan 2024</th>
                        <th className="px-4 py-3 text-left text-[10px] font-black uppercase text-zus-900">Input 2025</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-4 py-3 text-xs font-bold text-gray-700">Kes Penguatkuasaan</td>
                        <td className="px-4 py-3 text-center text-xs font-black text-gray-500">{BPH_2024_REFERENCE.penguatkuasaan}</td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            value={formData.bph.penguatkuasaan}
                            onChange={(e) => updateBph(['penguatkuasaan'], e.target.value)}
                            className="w-full max-w-[120px] p-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-olive-500 outline-none"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-xs font-bold text-gray-700">Jumlah Aduan Diterima</td>
                        <td className="px-4 py-3 text-center text-xs font-black text-gray-500">{BPH_2024_REFERENCE.aduan}</td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            value={formData.bph.aduan}
                            onChange={(e) => updateBph(['aduan'], e.target.value)}
                            className="w-full max-w-[120px] p-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-olive-500 outline-none"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Zon Halal Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#5A5A40] p-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                <MapPin className="w-5 h-5 text-zus-gold" />
              </div>
              <div>
                <h3 className="text-white font-bold">3. Zon Halal 2025</h3>
                <p className="text-[10px] font-semibold text-white/60">
                  Data zon halal tahun 2025 yang telah disahkan.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="rounded-full bg-emerald-500/20 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-100 ring-1 ring-emerald-500/30">
                Data Terkunci (Sah)
              </div>
              <div className="rounded-full bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/70 ring-1 ring-white/10">
                {formData.bph.zonHalal.length} Zon Direkodkan
              </div>
            </div>
          </div>
          <div className="p-6 space-y-6 bg-gradient-to-b from-[#faf8f1] via-white to-white">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div className="rounded-2xl border border-[#e7dfc9] bg-white/90 p-4 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#7d7657]">
                  Senarai Zon Halal 2025
                </p>
                <p className="mt-2 text-xs font-medium leading-6 text-gray-500">
                  Senarai ini merupakan zon halal rujukan bagi tahun 2025 yang telah ditandatangani oleh Ketua Bahagian.
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
                  Status Pengesahan
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-800">
                    Telah disahkan oleh Ketua Bahagian Pengurusan Halal.
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {formData.bph.zonHalal.map((zon: string, idx: number) => (
                <div key={idx} className="group rounded-2xl border border-emerald-100 bg-emerald-50/30 p-4 shadow-sm transition-all duration-200">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                      <MapPin className="w-4 h-4 shrink-0" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-700">
                        Zon {idx + 1}
                      </p>
                    </div>
                  </div>
                  <input 
                    type="text" 
                    value={zon} 
                    readOnly 
                    className="w-full rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-bold text-emerald-900 outline-none pointer-events-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Aktiviti Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#5A5A40] p-4 flex items-center gap-4">
            <BarChart3 className="w-5 h-5 text-zus-gold" />
            <h3 className="text-white font-bold">4. Program & Aktiviti Halal</h3>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto rounded-2xl border border-gray-100">
              <table className="w-full min-w-[500px] text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase text-gray-500">Perkara</th>
                    <th className="px-4 py-3 text-center text-[10px] font-black uppercase text-gray-500">Rujukan 2024</th>
                    <th className="px-4 py-3 text-center text-[10px] font-black uppercase text-zus-900">Data 2025</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { label: 'Ziarah Halal', value: FIXED_ACTIVITY_VALUES.ziarahHalal, ref: BPH_2024_REFERENCE.ziarahHalal },
                    { label: 'Taklimat Halal', value: FIXED_ACTIVITY_VALUES.taklimat, ref: BPH_2024_REFERENCE.aktiviti.taklimat },
                    { label: 'Kursus Kesedaran Halal', value: FIXED_ACTIVITY_VALUES.kursus, ref: BPH_2024_REFERENCE.aktiviti.kursus },
                    { label: 'Jumlah Besar Aktiviti', value: FIXED_ACTIVITY_VALUES.total, ref: BPH_2024_REFERENCE.aktiviti.total, highlight: true },
                  ].map(item => (
                    <tr key={item.label} className={item.highlight ? 'bg-[#5A5A40] text-zus-gold' : ''}>
                      <td className="px-4 py-3 text-xs font-black">{item.label}</td>
                      <td className={`px-4 py-3 text-center text-xs font-black ${item.highlight ? 'text-zus-gold/80' : 'text-gray-500'}`}>{item.ref}</td>
                      <td className="px-4 py-3 text-center">
                        <input
                          type="number"
                          value={item.value}
                          readOnly
                          className={`w-24 p-2 rounded-lg text-xs font-bold text-center outline-none pointer-events-none ${item.highlight ? 'bg-white/10 border border-white/20 text-white' : 'bg-white border border-gray-200 text-zus-900'}`}
                        />
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
          readOnly
        />
      </div>
      </div>
    </FormLayout>
  );
};

export default BphForm;
