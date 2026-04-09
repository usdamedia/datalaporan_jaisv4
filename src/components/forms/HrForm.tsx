import React, { useEffect } from 'react';
import FormLayout from './FormLayout';
import { useFormLogic } from './useFormLogic';
import { buildReportExportState } from '../../utils/reportPdfExport';
import { HR_2024_REFERENCE, LATIHAN_2024_REFERENCE } from '../../constants';
import { Save, Users, Briefcase, UserPlus, LogOut, GraduationCap, BookOpen, Award, Plus, Trash2 } from 'lucide-react';
import { BasicInfoSection, NarrativeSection, LawatanSection } from './CommonSections';

interface HrFormProps {
  deptName: string;
  onBack: () => void;
}

const HrForm: React.FC<HrFormProps> = ({ deptName, onBack }) => {
  const initialState = {
    tarikh: new Date().toISOString().split('T')[0],
    disediakanOleh: '',
    jawatan: '',
    ringkasan: '',
    isu: '',
    cadangan: '',
    lawatan: [],
    hr: {
      ringkasan: {
        perjawatanBajet: '',
        perjawatanDiisi: '',
        jumlahWargaKerja: ''
      },
      demografi: {
        lelaki: '',
        wanita: ''
      },
      skim: {
        jusa: '',
        halEhwalIslam: '',
        perundangan: '',
        kewangan: '',
        keselamatan: '',
        pendidikan: '',
        kejuruteraan: '',
        pentadbiran: '',
        pembantuAm: ''
      },
      sangkutan: {
        mis: '',
        jakim: {
          penyeliaKafa: '',
          penggerak: '',
          takmir: ''
        }
      },
      taburan: {
        ibuPejabat: {
          bpps: '',
          bpnp: '',
          dakwah: '',
          bkim: '',
          bpks: '',
          bkki: '',
          bph: '',
          bpds: '',
          bksk: '',
          bksp: '',
          kaunseling: '',
          ukoko: '',
          upp: '',
          integriti: '',
          total: ''
        },
        daerah: [
          { name: 'Limbang', value: '' },
          { name: 'Lawas', value: '' },
          { name: 'Miri', value: '' },
          { name: 'Bintulu', value: '' },
          { name: 'Mukah', value: '' },
          { name: 'Daro', value: '' },
          { name: 'Kapit', value: '' },
          { name: 'Sibu', value: '' },
          { name: 'Sarikei', value: '' },
          { name: 'Betong', value: '' },
          { name: 'Sri Aman', value: '' },
          { name: 'Serian', value: '' },
          { name: 'Samarahan', value: '' },
          { name: 'Kuching', value: '' }
        ],
        totalDaerah: '',
        grandTotal: ''
      },
      bersara: '',
      naikPangkat: [],
      hldp: []
    },
    latihan: {
      ringkasan: {
        jumlah: '',
        generik: '',
        spesifik: ''
      },
      pencapaian: {
        mencapai: { pp: '', sk1: '', sk2: '', total: '', ppPct: '', sk1Pct: '', sk2Pct: '', totalPct: '' },
        tidakMencapai: { pp: '', sk1: '', sk2: '', total: '', ppPct: '', sk1Pct: '', sk2Pct: '', totalPct: '' },
        tiadaRekod: { pp: '', sk1: '', sk2: '', total: '', ppPct: '', sk1Pct: '', sk2Pct: '', totalPct: '' },
        jumlahKeseluruhan: { pp: '', sk1: '', sk2: '', total: '' }
      }
    }
  };

  const { 
    formData, 
    setFormData, 
    isSaving, 
    showSuccess,
    saveError,
    handleSave,
    handleInputChange,
    addLawatan,
    removeLawatan,
    updateLawatan
  } = useFormLogic(deptName, initialState);

  // Auto-calculate total based on male/female
  useEffect(() => {
    const lelaki = parseInt(formData.hr.demografi.lelaki) || 0;
    const wanita = parseInt(formData.hr.demografi.wanita) || 0;
    const total = lelaki + wanita;
    
    if (total !== parseInt(formData.hr.ringkasan.jumlahWargaKerja)) {
      setFormData((prev: any) => ({
        ...prev,
        hr: {
          ...prev.hr,
          ringkasan: {
            ...prev.hr.ringkasan,
            jumlahWargaKerja: total.toString()
          }
        }
      }));
    }
  }, [formData.hr.demografi.lelaki, formData.hr.demografi.wanita]);

  // Auto-calculate total for Ibu Pejabat, Daerah and Grand Total
  useEffect(() => {
    const ip = formData.hr.taburan.ibuPejabat;
    const totalIP = Object.keys(ip)
      .filter(key => key !== 'total')
      .reduce((acc, key) => acc + (parseInt(ip[key as keyof typeof ip]) || 0), 0);
    
    const totalDaerah = formData.hr.taburan.daerah.reduce((acc: number, curr: any) => acc + (parseInt(curr.value) || 0), 0);
    const grandTotal = totalIP + totalDaerah;

    if (
      totalIP !== parseInt(ip.total) || 
      totalDaerah !== parseInt(formData.hr.taburan.totalDaerah) ||
      grandTotal !== parseInt(formData.hr.taburan.grandTotal)
    ) {
      setFormData((prev: any) => ({
        ...prev,
        hr: {
          ...prev.hr,
          taburan: {
            ...prev.hr.taburan,
            ibuPejabat: {
              ...prev.hr.taburan.ibuPejabat,
              total: totalIP.toString()
            },
            totalDaerah: totalDaerah.toString(),
            grandTotal: grandTotal.toString()
          }
        }
      }));
    }
  }, [
    formData.hr.taburan.ibuPejabat.bpps,
    formData.hr.taburan.ibuPejabat.bpnp,
    formData.hr.taburan.ibuPejabat.dakwah,
    formData.hr.taburan.ibuPejabat.bkim,
    formData.hr.taburan.ibuPejabat.bpks,
    formData.hr.taburan.ibuPejabat.bkki,
    formData.hr.taburan.ibuPejabat.bph,
    formData.hr.taburan.ibuPejabat.bpds,
    formData.hr.taburan.ibuPejabat.bksk,
    formData.hr.taburan.ibuPejabat.bksp,
    formData.hr.taburan.ibuPejabat.kaunseling,
    formData.hr.taburan.ibuPejabat.ukoko,
    formData.hr.taburan.ibuPejabat.upp,
    formData.hr.taburan.ibuPejabat.integriti,
    formData.hr.taburan.daerah
  ]);

  // Auto-calculate Latihan Table
  useEffect(() => {
    const p = formData.latihan.pencapaian;
    
    const calcRowTotal = (row: any) => {
      return (parseInt(row.pp) || 0) + (parseInt(row.sk1) || 0) + (parseInt(row.sk2) || 0);
    };

    const totalMencapai = calcRowTotal(p.mencapai);
    const totalTidakMencapai = calcRowTotal(p.tidakMencapai);
    const totalTiadaRekod = calcRowTotal(p.tiadaRekod);

    const grandPP = (parseInt(p.mencapai.pp) || 0) + (parseInt(p.tidakMencapai.pp) || 0) + (parseInt(p.tiadaRekod.pp) || 0);
    const grandSK1 = (parseInt(p.mencapai.sk1) || 0) + (parseInt(p.tidakMencapai.sk1) || 0) + (parseInt(p.tiadaRekod.sk1) || 0);
    const grandSK2 = (parseInt(p.mencapai.sk2) || 0) + (parseInt(p.tidakMencapai.sk2) || 0) + (parseInt(p.tiadaRekod.sk2) || 0);
    const grandTotal = grandPP + grandSK1 + grandSK2;

    if (
      totalMencapai.toString() !== p.mencapai.total ||
      totalTidakMencapai.toString() !== p.tidakMencapai.total ||
      totalTiadaRekod.toString() !== p.tiadaRekod.total ||
      grandPP.toString() !== p.jumlahKeseluruhan.pp ||
      grandSK1.toString() !== p.jumlahKeseluruhan.sk1 ||
      grandSK2.toString() !== p.jumlahKeseluruhan.sk2 ||
      grandTotal.toString() !== p.jumlahKeseluruhan.total
    ) {
      setFormData((prev: any) => ({
        ...prev,
        latihan: {
          ...prev.latihan,
          pencapaian: {
            ...prev.latihan.pencapaian,
            mencapai: { ...prev.latihan.pencapaian.mencapai, total: totalMencapai.toString() },
            tidakMencapai: { ...prev.latihan.pencapaian.tidakMencapai, total: totalTidakMencapai.toString() },
            tiadaRekod: { ...prev.latihan.pencapaian.tiadaRekod, total: totalTiadaRekod.toString() },
            jumlahKeseluruhan: {
              pp: grandPP.toString(),
              sk1: grandSK1.toString(),
              sk2: grandSK2.toString(),
              total: grandTotal.toString()
            }
          }
        }
      }));
    }
  }, [formData.latihan.pencapaian]);

  const updateNestedField = (section: string, field: string, value: string, subField?: string) => {
    setFormData((prev: any) => {
      const newHr = { ...prev.hr };
      if (!field) {
        newHr[section] = value;
        return { ...prev, hr: newHr };
      }
      if (subField) {
        newHr[section][field] = { ...newHr[section][field], [subField]: value };
      } else {
        newHr[section] = { ...newHr[section], [field]: value };
      }
      return { ...prev, hr: newHr };
    });
  };

  const addHrListItem = (section: 'naikPangkat' | 'hldp') => {
    setFormData((prev: any) => ({
      ...prev,
      hr: {
        ...prev.hr,
        [section]: [
          ...(prev.hr[section] || []),
          section === 'naikPangkat'
            ? { nama: '', pangkatSemasa: '', pangkatBaru: '' }
            : { nama: '', jawatan: '', jenisPengajian: '' }
        ]
      }
    }));
  };

  const updateHrListItem = (section: 'naikPangkat' | 'hldp', index: number, field: string, value: string) => {
    setFormData((prev: any) => {
      const nextItems = [...(prev.hr[section] || [])];
      nextItems[index] = { ...nextItems[index], [field]: value };
      return {
        ...prev,
        hr: {
          ...prev.hr,
          [section]: nextItems
        }
      };
    });
  };

  const removeHrListItem = (section: 'naikPangkat' | 'hldp', index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      hr: {
        ...prev.hr,
        [section]: (prev.hr[section] || []).filter((_: any, itemIndex: number) => itemIndex !== index)
      }
    }));
  };

  const updateDaerah = (index: number, value: string) => {
    setFormData((prev: any) => {
      const newDaerah = [...prev.hr.taburan.daerah];
      newDaerah[index] = { ...newDaerah[index], value };
      return {
        ...prev,
        hr: {
          ...prev.hr,
          taburan: {
            ...prev.hr.taburan,
            daerah: newDaerah
          }
        }
      };
    });
  };

  const updateLatihanField = (section: string, field: string, value: string, subField?: string) => {
    setFormData((prev: any) => {
      const newLatihan = { ...prev.latihan };
      if (subField) {
        newLatihan[section][field] = { ...newLatihan[section][field], [subField]: value };
      } else {
        newLatihan[section] = { ...newLatihan[section], [field]: value };
      }
      return { ...prev, latihan: newLatihan };
    });
  };

  const getExportState = () =>
    buildReportExportState(deptName, formData, {
      pagination: {
        scope: 'all-filtered',
      },
    });

  return (
    <FormLayout deptName={deptName} onBack={onBack} onSave={handleSave} isSaving={isSaving} showSuccess={showSuccess} saveError={saveError} formData={formData} getExportState={getExportState}>
      <BasicInfoSection formData={formData} handleInputChange={handleInputChange} />
      
      <div className="space-y-8 animate-fade-in mt-8">
        
        {/* 1. Ringkasan Eksekutif & Demografi (Z-Pattern Header) */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-slate-900 p-4 flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-white font-bold text-lg">1. Ringkasan Eksekutif & Demografi</h2>
          </div>
          {/* Z-Pattern Layout: Left to Right, Top to Bottom */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Kiri: Perjawatan Bajet */}
              <div className="space-y-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <label className="text-sm md:text-base font-bold text-gray-700 whitespace-normal break-words block">Perjawatan (Bajet)</label>
                <div className="text-[10px] font-bold text-gray-400 mb-1">Rujukan 2024: {HR_2024_REFERENCE.ringkasan.perjawatanBajet}</div>
                <input
                  type="number"
                  value={formData.hr.ringkasan.perjawatanBajet}
                  onChange={(e) => updateNestedField('ringkasan', 'perjawatanBajet', e.target.value)}
                  className="w-full max-w-xs p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-bold"
                  placeholder="0"
                />
              </div>
              
              {/* Tengah: Perjawatan Diisi */}
              <div className="space-y-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <label className="text-sm md:text-base font-bold text-gray-700 whitespace-normal break-words block">Perjawatan Diisi</label>
                <div className="text-[10px] font-bold text-gray-400 mb-1">Rujukan 2024: {HR_2024_REFERENCE.ringkasan.perjawatanDiisi}</div>
                <input
                  type="number"
                  value={formData.hr.ringkasan.perjawatanDiisi}
                  onChange={(e) => updateNestedField('ringkasan', 'perjawatanDiisi', e.target.value)}
                  className="w-full max-w-xs p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-bold"
                  placeholder="0"
                />
              </div>

              {/* Kanan: Keseluruhan Warga Kerja (Auto-Sum) */}
              <div className="space-y-2 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                <label className="text-sm md:text-base font-bold text-emerald-900 whitespace-normal break-words block">Keseluruhan Warga Kerja JAIS</label>
                <div className="text-[10px] font-bold text-emerald-600 mb-1">Auto-Kira (Lelaki + Wanita) | Ref 24: {HR_2024_REFERENCE.ringkasan.jumlahWargaKerja}</div>
                <input
                  type="number"
                  readOnly
                  value={formData.hr.ringkasan.jumlahWargaKerja}
                  className="w-full max-w-xs p-3 bg-white border border-emerald-200 rounded-xl text-emerald-700 font-black outline-none"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Demografi Jantina */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-6">
              <div className="space-y-2">
                <label className="text-sm md:text-base font-bold text-blue-900 whitespace-normal break-words block">Lelaki</label>
                <div className="text-[10px] font-bold text-blue-400 mb-1">Rujukan 2024: {HR_2024_REFERENCE.demografi.lelaki}</div>
                <input
                  type="number"
                  value={formData.hr.demografi.lelaki}
                  onChange={(e) => updateNestedField('demografi', 'lelaki', e.target.value)}
                  className="w-full max-w-xs p-3 bg-white border-2 border-blue-100 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 outline-none font-bold transition-all"
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm md:text-base font-bold text-pink-900 whitespace-normal break-words block">Wanita</label>
                <div className="text-[10px] font-bold text-pink-400 mb-1">Rujukan 2024: {HR_2024_REFERENCE.demografi.wanita}</div>
                <input
                  type="number"
                  value={formData.hr.demografi.wanita}
                  onChange={(e) => updateNestedField('demografi', 'wanita', e.target.value)}
                  className="w-full max-w-xs p-3 bg-white border-2 border-pink-100 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 outline-none font-bold transition-all"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. Skim Perkhidmatan */}
        <section className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
          <div className="bg-emerald-600 p-4 flex items-center gap-3">
            <div className="p-2 bg-emerald-500/30 rounded-lg">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-white font-bold text-lg">2. Skim Perkhidmatan</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: 'Jusa', field: 'jusa', ref: HR_2024_REFERENCE.skim.jusa },
              { label: 'Hal Ehwal Islam', field: 'halEhwalIslam', ref: HR_2024_REFERENCE.skim.halEhwalIslam },
              { label: 'Perundangan dan Kehakiman', field: 'perundangan', ref: HR_2024_REFERENCE.skim.perundangan },
              { label: 'Kewangan', field: 'kewangan', ref: HR_2024_REFERENCE.skim.kewangan },
              { label: 'Keselamatan', field: 'keselamatan', ref: HR_2024_REFERENCE.skim.keselamatan },
              { label: 'Pendidikan', field: 'pendidikan', ref: HR_2024_REFERENCE.skim.pendidikan },
              { label: 'Kejuruteraan', field: 'kejuruteraan', ref: HR_2024_REFERENCE.skim.kejuruteraan },
              { label: 'Pentadbiran dan Sokongan', field: 'pentadbiran', ref: HR_2024_REFERENCE.skim.pentadbiran },
              { label: 'Pembantu Am dan Pemandu', field: 'pembantuAm', ref: HR_2024_REFERENCE.skim.pembantuAm },
            ].map((item) => (
              <div key={item.field} className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 hover:border-emerald-300 transition-colors flex flex-col justify-between h-full">
                <div className="mb-3">
                  <label className="text-sm md:text-base font-bold text-emerald-900 whitespace-normal break-words block leading-tight">
                    {item.label}
                  </label>
                  <span className="text-[10px] font-bold text-emerald-600/70 mt-1 block">Ref 24: {item.ref}</span>
                </div>
                <input
                  type="number"
                  value={formData.hr.skim[item.field as keyof typeof formData.hr.skim]}
                  onChange={(e) => updateNestedField('skim', item.field, e.target.value)}
                  className="w-full max-w-xs p-3 bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-base transition-all"
                  placeholder="0"
                />
              </div>
            ))}
          </div>
        </section>

        {/* 3. Kakitangan Sangkutan */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-slate-800 p-4 flex items-center gap-3">
            <div className="p-2 bg-slate-700 rounded-lg">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-white font-bold text-lg">3. Kakitangan Sangkutan</h2>
          </div>
          <div className="p-6 space-y-8">
            {/* MIS - Hitam/Kelabu Gelap */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-3 mb-5">
                <div className="w-2 h-6 bg-slate-700 rounded-full"></div>
                <h3 className="font-bold text-slate-800 text-base md:text-lg">Majlis Islam Sarawak (MIS)</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex flex-col justify-between h-full">
                  <div className="mb-3">
                    <label className="text-sm md:text-base font-bold text-slate-700 whitespace-normal break-words block leading-tight">
                      Pekhidmat MIS
                    </label>
                    <span className="text-[10px] font-bold text-slate-500 mt-1 block">Rujukan 2024: {HR_2024_REFERENCE.sangkutan.mis}</span>
                  </div>
                  <input
                    type="number"
                    value={formData.hr.sangkutan.mis}
                    onChange={(e) => updateNestedField('sangkutan', 'mis', e.target.value)}
                    className="w-full max-w-xs p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-base transition-all"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* JAKIM - Biru Cerah */}
            <div className="bg-cyan-50 p-6 rounded-2xl border border-cyan-200">
              <div className="flex items-center gap-3 border-b border-cyan-200 pb-3 mb-5">
                <div className="w-2 h-6 bg-cyan-500 rounded-full"></div>
                <h3 className="font-bold text-cyan-900 text-base md:text-lg">JAKIM</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { label: 'Penyelia KAFA', field: 'penyeliaKafa', ref: HR_2024_REFERENCE.sangkutan.jakim.penyeliaKafa },
                  { label: 'Penggerak Masyarakat Saudara Kita', field: 'penggerak', ref: HR_2024_REFERENCE.sangkutan.jakim.penggerak },
                  { label: 'Pegawai Takmir, Pembantu Takmir dan Penyelaras Pentadbiran Masjid Daerah', field: 'takmir', ref: HR_2024_REFERENCE.sangkutan.jakim.takmir },
                ].map((item) => (
                  <div key={item.field} className="flex flex-col justify-between h-full">
                    <div className="mb-3">
                      <label className="text-sm md:text-base font-bold text-cyan-900 whitespace-normal break-words block leading-tight">
                        {item.label}
                      </label>
                      <span className="text-[10px] font-bold text-cyan-600 mt-1 block">Rujukan 2024: {item.ref}</span>
                    </div>
                    <input
                      type="number"
                      value={formData.hr.sangkutan.jakim[item.field as keyof typeof formData.hr.sangkutan.jakim]}
                      onChange={(e) => updateNestedField('sangkutan', 'jakim', e.target.value, item.field)}
                      className="w-full max-w-xs p-3 bg-white border border-cyan-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-base transition-all"
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Taburan Kakitangan */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-teal-900 p-4 flex items-center gap-3">
            <div className="p-2 bg-teal-500/20 rounded-lg">
              <Users className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-white font-bold text-lg">4. Taburan Kakitangan (Ibu Pejabat & Daerah)</h2>
          </div>
          
          <div className="p-6 space-y-10">
            {/* Ibu Pejabat */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-teal-100 pb-2">
                <h3 className="font-black text-teal-900 uppercase text-sm">Ibu Pejabat</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Jumlah Besar (Auto):</span>
                  <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-black text-sm">{formData.hr.taburan.ibuPejabat.total}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: 'Pentadbiran & Pengurusan Sumber', field: 'bpps', ref: HR_2024_REFERENCE.taburan.ibuPejabat.bpps },
                  { label: 'Perancangan & Penyelidikan', field: 'bpnp', ref: HR_2024_REFERENCE.taburan.ibuPejabat.bpnp },
                  { label: 'Dakwah', field: 'dakwah', ref: HR_2024_REFERENCE.taburan.ibuPejabat.dakwah },
                  { label: 'Kemajuan Institusi Masjid', field: 'bkim', ref: HR_2024_REFERENCE.taburan.ibuPejabat.bkim },
                  { label: 'Penguatkuasaan Syariah', field: 'bpks', ref: HR_2024_REFERENCE.taburan.ibuPejabat.bpks },
                  { label: 'Kemajuan Keluarga Islam', field: 'bkki', ref: HR_2024_REFERENCE.taburan.ibuPejabat.bkki },
                  { label: 'Pengurusan Halal', field: 'bph', ref: HR_2024_REFERENCE.taburan.ibuPejabat.bph },
                  { label: 'Pendakwaan Syariah', field: 'bpds', ref: HR_2024_REFERENCE.taburan.ibuPejabat.bpds },
                  { label: 'Kemajuan Saudara Kita', field: 'bksk', ref: HR_2024_REFERENCE.taburan.ibuPejabat.bksk },
                  { label: 'Pengukuhan Pendidikan Islam', field: 'bksp', ref: HR_2024_REFERENCE.taburan.ibuPejabat.bksp },
                  { label: 'Kaunseling Syarie & Psikologi', field: 'kaunseling', ref: HR_2024_REFERENCE.taburan.ibuPejabat.kaunseling },
                  { label: 'Unit Komunikasi Korporat', field: 'ukoko', ref: HR_2024_REFERENCE.taburan.ibuPejabat.ukoko },
                  { label: 'Unit Pengurusan Projek', field: 'upp', ref: HR_2024_REFERENCE.taburan.ibuPejabat.upp },
                  { label: 'Unit Integriti', field: 'integriti', ref: HR_2024_REFERENCE.taburan.ibuPejabat.integriti },
                ].map((item) => (
                  <div key={item.field} className="p-3 bg-teal-50/30 rounded-xl border border-teal-100/50">
                    <div className="flex justify-between items-start mb-1">
                      <label className="text-[10px] font-bold text-teal-800 uppercase leading-tight">{item.label}</label>
                      <span className="text-[9px] font-bold text-teal-400">2024: {item.ref}</span>
                    </div>
                    <input
                      type="number"
                      value={formData.hr.taburan.ibuPejabat[item.field as keyof typeof formData.hr.taburan.ibuPejabat]}
                      onChange={(e) => updateNestedField('taburan', 'ibuPejabat', e.target.value, item.field)}
                      className="w-full p-2 bg-white border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none font-bold text-sm"
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Taburan Daerah */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-teal-100 pb-2">
                <h3 className="font-black text-teal-900 uppercase text-sm">Taburan Daerah / Bahagian</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Jumlah Daerah (Auto):</span>
                  <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-black text-sm">{formData.hr.taburan.totalDaerah}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {formData.hr.taburan.daerah.map((daerah: any, idx: number) => (
                  <div key={daerah.name} className="flex items-center gap-4 group">
                    <div className="w-24 text-right">
                      <label className="text-xs font-black text-teal-900 uppercase group-hover:text-teal-600 transition-colors">{daerah.name}</label>
                    </div>
                    <div className="flex-1 relative">
                      <input
                        type="number"
                        value={daerah.value}
                        onChange={(e) => updateDaerah(idx, e.target.value)}
                        className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none font-bold text-sm"
                        placeholder="0"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-bold text-gray-300">
                        Ref 24: {HR_2024_REFERENCE.taburan.daerah[idx].value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grand Total */}
            <div className="pt-6 border-t-2 border-teal-100 border-dashed">
              <div className="bg-teal-900 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg shadow-teal-900/20">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <Users className="w-8 h-8 text-teal-300" />
                  </div>
                  <div>
                    <h3 className="text-white font-black uppercase tracking-wider">Jumlah Keseluruhan Kakitangan</h3>
                    <p className="text-teal-300 text-xs font-bold uppercase">Ibu Pejabat + Semua Daerah</p>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white">{formData.hr.taburan.grandTotal}</span>
                  <span className="text-teal-400 text-xs font-bold uppercase">Orang</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Kakitangan Bersara */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-red-800 p-4 flex items-center gap-3">
            <div className="p-2 bg-red-700 rounded-lg">
              <LogOut className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-white font-bold text-lg">5. Kakitangan Bersara</h2>
          </div>
          <div className="p-6">
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100 max-w-md mx-auto">
              <div className="mb-4 text-center">
                <label className="text-sm md:text-base font-bold text-red-900 whitespace-normal break-words block leading-tight">
                  Kakitangan Bersara
                </label>
                <span className="text-xs font-bold text-red-500 mt-1 block">Rujukan 2024: {HR_2024_REFERENCE.bersara}</span>
              </div>
              <div className="relative w-full max-w-xs mx-auto">
                <input
                  type="number"
                  value={formData.hr.bersara}
                  onChange={(e) => updateNestedField('bersara', '', e.target.value)}
                  className="w-full p-4 bg-white border-2 border-red-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 outline-none text-2xl font-black text-red-700 text-center transition-all"
                  placeholder="0"
                />
                <div className="absolute -top-3 -right-3 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg animate-bounce">
                  WAJIB ISI
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Kakitangan Naik Pangkat */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-blue-800 p-4 flex items-center gap-3">
            <div className="p-2 bg-blue-700 rounded-lg">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-white font-bold text-lg">6. Kakitangan Naik Pangkat</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-end">
              <button
                onClick={() => addHrListItem('naikPangkat')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Tambah Rekod
              </button>
            </div>
            {(formData.hr.naikPangkat || []).length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-sm font-medium text-gray-400">
                Tiada rekod kenaikan pangkat ditambah.
              </div>
            ) : (
              <div className="space-y-4">
                {(formData.hr.naikPangkat || []).map((item: any, index: number) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-4 p-4 bg-blue-50/40 border border-blue-100 rounded-2xl">
                    <input
                      type="text"
                      value={item.nama}
                      onChange={(e) => updateHrListItem('naikPangkat', index, 'nama', e.target.value)}
                      className="w-full p-3 bg-white border border-blue-200 rounded-xl outline-none font-medium"
                      placeholder="Nama Kakitangan"
                    />
                    <input
                      type="text"
                      value={item.pangkatSemasa}
                      onChange={(e) => updateHrListItem('naikPangkat', index, 'pangkatSemasa', e.target.value)}
                      className="w-full p-3 bg-white border border-blue-200 rounded-xl outline-none font-medium"
                      placeholder="Pangkat Semasa"
                    />
                    <input
                      type="text"
                      value={item.pangkatBaru}
                      onChange={(e) => updateHrListItem('naikPangkat', index, 'pangkatBaru', e.target.value)}
                      className="w-full p-3 bg-white border border-blue-200 rounded-xl outline-none font-medium"
                      placeholder="Pangkat Baru"
                    />
                    <button
                      onClick={() => removeHrListItem('naikPangkat', index)}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 7. Kakitangan HLDP / Menyambung Pengajian */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-purple-800 p-4 flex items-center gap-3">
            <div className="p-2 bg-purple-700 rounded-lg">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-white font-bold text-lg">7. Kakitangan HLDP / Menyambung Pengajian 2025</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-xs font-medium text-gray-500">
              Sekiranya ada, termasuk kakitangan yang sedang melanjutkan pengajian melalui HLDP.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => addHrListItem('hldp')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Tambah Rekod
              </button>
            </div>
            {(formData.hr.hldp || []).length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-sm font-medium text-gray-400">
                Tiada rekod HLDP / pengajian ditambah.
              </div>
            ) : (
              <div className="space-y-4">
                {(formData.hr.hldp || []).map((item: any, index: number) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-4 p-4 bg-purple-50/40 border border-purple-100 rounded-2xl">
                    <input
                      type="text"
                      value={item.nama}
                      onChange={(e) => updateHrListItem('hldp', index, 'nama', e.target.value)}
                      className="w-full p-3 bg-white border border-purple-200 rounded-xl outline-none font-medium"
                      placeholder="Nama"
                    />
                    <input
                      type="text"
                      value={item.jawatan}
                      onChange={(e) => updateHrListItem('hldp', index, 'jawatan', e.target.value)}
                      className="w-full p-3 bg-white border border-purple-200 rounded-xl outline-none font-medium"
                      placeholder="Jawatan"
                    />
                    <input
                      type="text"
                      value={item.jenisPengajian}
                      onChange={(e) => updateHrListItem('hldp', index, 'jenisPengajian', e.target.value)}
                      className="w-full p-3 bg-white border border-purple-200 rounded-xl outline-none font-medium"
                      placeholder="Jenis: Diploma / Degree / Master"
                    />
                    <button
                      onClick={() => removeHrListItem('hldp', index)}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 8. Latihan Sumber Manusia */}
        <section className="space-y-8">
          {/* Z-Pattern Header & Summary Card */}
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <div className="flex-1 space-y-2">
              <h2 className="text-3xl font-black text-zus-900 uppercase tracking-tighter leading-none">
                Latihan Sumber Manusia <br />
                <span className="text-teal-600">Unit HR &amp; Latihan BPPS</span>
              </h2>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Kemasukan Data Latihan 2025</p>
            </div>

            <div className="w-full lg:w-auto">
              <div className="bg-[#0D9488] rounded-3xl p-6 text-white shadow-xl shadow-teal-900/20 flex items-center gap-8 relative overflow-hidden">
                <div className="relative z-10 space-y-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Jumlah Latihan 2025</p>
                    <div className="flex items-baseline gap-2">
                      <input
                        type="number"
                        value={formData.latihan.ringkasan.jumlah}
                        onChange={(e) => updateLatihanField('ringkasan', 'jumlah', e.target.value)}
                        className="bg-transparent border-none p-0 text-5xl font-black focus:ring-0 w-24"
                        placeholder="0"
                      />
                      <span className="text-teal-200 text-xs font-bold">Ref 24: {LATIHAN_2024_REFERENCE.ringkasan.jumlah}</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="space-y-1">
                      <p className="text-[8px] font-black uppercase opacity-60">Generik</p>
                      <input
                        type="number"
                        value={formData.latihan.ringkasan.generik}
                        onChange={(e) => updateLatihanField('ringkasan', 'generik', e.target.value)}
                        className="bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-xs font-bold w-16 focus:bg-white/20 outline-none"
                        placeholder="0"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[8px] font-black uppercase opacity-60">Spesifik</p>
                      <input
                        type="number"
                        value={formData.latihan.ringkasan.spesifik}
                        onChange={(e) => updateLatihanField('ringkasan', 'spesifik', e.target.value)}
                        className="bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-xs font-bold w-16 focus:bg-white/20 outline-none"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
                  <GraduationCap className="w-48 h-48" />
                </div>
                <div className="relative z-10 hidden sm:block">
                  <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                    <BookOpen className="w-10 h-10 text-teal-200" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* F-Pattern Table */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center gap-3">
              <Award className="w-5 h-5 text-teal-600" />
              <h3 className="text-sm font-black text-zus-900 uppercase">Jadual Pencapaian Jam Latihan Kakitangan</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0D9488] text-white">
                    <th className="p-4 text-[10px] font-black uppercase tracking-wider border-r border-teal-800 w-12">BIL</th>
                    <th className="p-4 text-[10px] font-black uppercase tracking-wider border-r border-teal-800">REKOD PENCAPAIAN</th>
                    <th className="p-4 text-[10px] font-black uppercase tracking-wider border-r border-teal-800 text-center">JAM LATIHAN: P&P</th>
                    <th className="p-4 text-[10px] font-black uppercase tracking-wider border-r border-teal-800 text-center">JAM LATIHAN: SK 1</th>
                    <th className="p-4 text-[10px] font-black uppercase tracking-wider border-r border-teal-800 text-center">JAM LATIHAN: SK 2</th>
                    <th className="p-4 text-[10px] font-black uppercase tracking-wider text-center">JUMLAH</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {[
                    { id: '1', label: 'Pegawai Telah Mencapai', key: 'mencapai', ref: LATIHAN_2024_REFERENCE.pencapaian.mencapai },
                    { id: '2', label: 'Pegawai Tidak Mencapai', key: 'tidakMencapai', ref: LATIHAN_2024_REFERENCE.pencapaian.tidakMencapai },
                    { id: '3', label: 'Pegawai Tiada Rekod Log Latihan', key: 'tiadaRekod', ref: LATIHAN_2024_REFERENCE.pencapaian.tiadaRekod },
                  ].map((row) => (
                    <tr key={row.key} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-black text-gray-400 border-r border-gray-100">{row.id}</td>
                      <td className="p-4 font-bold text-zus-900 border-r border-gray-100">{row.label}</td>
                      {['pp', 'sk1', 'sk2'].map((col) => (
                        <td key={col} className="p-4 border-r border-gray-100">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                value={formData.latihan.pencapaian[row.key as keyof typeof formData.latihan.pencapaian][col as any]}
                                onChange={(e) => updateLatihanField('pencapaian', row.key, e.target.value, col)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 font-bold text-center focus:ring-2 focus:ring-teal-500 outline-none"
                                placeholder="0"
                              />
                              <div className="flex items-center bg-teal-50 rounded-lg px-2 py-1 border border-teal-100">
                                <input
                                  type="number"
                                  value={formData.latihan.pencapaian[row.key as keyof typeof formData.latihan.pencapaian][`${col}Pct` as any]}
                                  onChange={(e) => updateLatihanField('pencapaian', row.key, e.target.value, `${col}Pct`)}
                                  className="w-8 bg-transparent border-none p-0 text-[10px] font-black text-teal-700 text-center focus:ring-0"
                                  placeholder="0"
                                />
                                <span className="text-[8px] font-black text-teal-400">%</span>
                              </div>
                            </div>
                            <p className="text-[8px] text-gray-300 font-bold text-center italic">Ref 24: {row.ref[col as keyof typeof row.ref]} ({row.ref[`${col}Pct` as keyof typeof row.ref]}%)</p>
                          </div>
                        </td>
                      ))}
                      <td className="p-4 bg-teal-50/30">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              readOnly
                              value={formData.latihan.pencapaian[row.key as keyof typeof formData.latihan.pencapaian].total}
                              className="w-full bg-white border border-teal-200 rounded-lg px-2 py-1 font-black text-teal-700 text-center outline-none"
                            />
                            <div className="flex items-center bg-teal-600 rounded-lg px-2 py-1">
                              <input
                                type="number"
                                value={formData.latihan.pencapaian[row.key as keyof typeof formData.latihan.pencapaian].totalPct}
                                onChange={(e) => updateLatihanField('pencapaian', row.key, e.target.value, 'totalPct')}
                                className="w-8 bg-transparent border-none p-0 text-[10px] font-black text-white text-center focus:ring-0"
                                placeholder="0"
                              />
                              <span className="text-[8px] font-black text-teal-200">%</span>
                            </div>
                          </div>
                          <p className="text-[8px] text-teal-300 font-bold text-center italic">Ref 24: {row.ref.total} ({row.ref.totalPct}%)</p>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {/* Total Row */}
                  <tr className="bg-gray-50 font-black">
                    <td className="p-4 border-r border-gray-200"></td>
                    <td className="p-4 text-zus-900 border-r border-gray-200 uppercase">JUMLAH KESELURUHAN</td>
                    {['pp', 'sk1', 'sk2'].map((col) => (
                      <td key={col} className="p-4 text-center border-r border-gray-200 text-teal-700 text-sm">
                        {formData.latihan.pencapaian.jumlahKeseluruhan[col as keyof typeof formData.latihan.pencapaian.jumlahKeseluruhan]}
                      </td>
                    ))}
                    <td className="p-4 text-center bg-teal-600 text-white text-base">
                      {formData.latihan.pencapaian.jumlahKeseluruhan.total}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <p className="text-[9px] text-gray-400 italic font-bold">
                * Petunjuk: P&P (Pengurusan dan Profesional), SK (Sokongan SK 1 & SK 2)
              </p>
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

export default HrForm;
