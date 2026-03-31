import React from 'react';
import { 
  Users, 
  Globe, 
  Radio, 
  BarChart3, 
  FileCheck,
  MapPin,
  Anchor,
  Plus,
  Trash2
} from 'lucide-react';
import { DAKWAH_2024_REFERENCE, DHQC_2024_REFERENCE, SARAWAK_DIVISIONS } from '../../constants';
import FormLayout from './FormLayout';
import { BasicInfoSection, NarrativeSection, LawatanSection } from './CommonSections';
import { useFormLogic } from './useFormLogic';

interface DakwahFormProps {
  deptName: string;
  onBack: () => void;
}

const DakwahForm: React.FC<DakwahFormProps> = ({ deptName, onBack }) => {
  const isUnitAlQuran = deptName.toUpperCase().includes('AL-QURAN');
  const initialState = {
    tarikh: new Date().toISOString().split('T')[0],
    disediakanOleh: '',
    jawatan: '',
    ringkasan: '',
    isu: '',
    cadangan: '',
    lawatan: [],
    dakwah: {
      progJais2025: 0,
      progAgensi2025: 0,
      tauliahAktif2025: 0,
      mediaRadio2025: 0,
      mediaInternet2025: 0,
      mediaSosial: {
        facebook: '',
        instagram: '',
        thread: '',
        tiktok: '',
        telegramChannel: '',
        whatsappChannel: '',
      },
      alQuran: {
        pusatPemuliaan: [],
        statistikDebu: {
          berat: '',
          kekerapan: '',
        },
      },
      tauliahDivisions: SARAWAK_DIVISIONS.map(name => ({
        name,
        val2025: 0
      })),
      guruAsingDivisions: SARAWAK_DIVISIONS.map(name => ({
        name,
        val2025: 0
      }))
    }
  };

  const {
    formData,
    isSaving,
    showSuccess,
    saveError,
    handleInputChange,
    handleSave,
    addLawatan,
    removeLawatan,
    updateLawatan,
    setFormData
  } = useFormLogic(deptName, initialState);

  const handleDakwahChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      dakwah: { ...prev.dakwah, [field]: value }
    }));
  };

  const handleMediaSosialChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      dakwah: {
        ...prev.dakwah,
        mediaSosial: {
          ...prev.dakwah.mediaSosial,
          [field]: value,
        },
      },
    }));
  };

  const handleDivisionChange = (listField: string, index: number, field: string, value: any) => {
    setFormData((prev: any) => {
      const newList = [...prev.dakwah[listField]];
      newList[index] = { ...newList[index], [field]: parseInt(value) || 0 };
      return {
        ...prev,
        dakwah: { ...prev.dakwah, [listField]: newList }
      };
    });
  };

  const updatePusatAlQuran = (index: number, field: 'lokasi' | 'bahagian', value: string) => {
    setFormData((prev: any) => {
      const currentRows = [...(prev.dakwah.alQuran?.pusatPemuliaan || [])];
      while (currentRows.length <= index) {
        currentRows.push({ lokasi: '', bahagian: '' });
      }

      currentRows[index] = {
        ...currentRows[index],
        [field]: value,
      };

      return {
        ...prev,
        dakwah: {
          ...prev.dakwah,
          alQuran: {
            ...prev.dakwah.alQuran,
            pusatPemuliaan: currentRows,
          },
        },
      };
    });
  };

  const addPusatAlQuran = () => {
    setFormData((prev: any) => ({
      ...prev,
      dakwah: {
        ...prev.dakwah,
        alQuran: {
          ...prev.dakwah.alQuran,
          pusatPemuliaan: [...(prev.dakwah.alQuran?.pusatPemuliaan || []), { lokasi: '', bahagian: '' }],
        },
      },
    }));
  };

  const removePusatAlQuran = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      dakwah: {
        ...prev.dakwah,
        alQuran: {
          ...prev.dakwah.alQuran,
          pusatPemuliaan: (prev.dakwah.alQuran?.pusatPemuliaan || []).filter((_: any, currentIndex: number) => currentIndex !== index),
        },
      },
    }));
  };

  const handleAlQuranStatChange = (field: 'berat' | 'kekerapan', value: string) => {
    const numValue = value === '' ? '' : Math.max(0, parseFloat(value));
    setFormData((prev: any) => ({
      ...prev,
      dakwah: {
        ...prev.dakwah,
        alQuran: {
          ...prev.dakwah.alQuran,
          statistikDebu: {
            ...prev.dakwah.alQuran?.statistikDebu,
            [field]: numValue,
          },
        },
      },
    }));
  };

  const totalPusatAlQuran2025 = (formData.dakwah.alQuran?.pusatPemuliaan || []).filter(
    (item: { lokasi?: string; bahagian?: string }) => item?.lokasi?.trim() || item?.bahagian?.trim()
  ).length;

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
      <BasicInfoSection formData={formData} handleInputChange={handleInputChange} />

      {isUnitAlQuran ? (
        <section className="overflow-hidden rounded-[2rem] border border-[#d6e4dd] bg-white shadow-sm">
          <div className="flex items-center gap-3 bg-[#0d4f45] px-6 py-5 text-white">
            <div className="rounded-2xl bg-[#f0cf73] p-2 text-[#0d4f45]">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight">Komponen A: Pusat Pemuliaan & Statistik Debu</h3>
              <p className="text-xs font-semibold text-white/70">Dipindahkan ke BDAKWAH &gt; Unit Al-Quran untuk rujukan 2024 dan kemasukan data 2025.</p>
            </div>
          </div>

          <div className="grid gap-8 p-6 xl:grid-cols-[1.25fr_0.95fr]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black uppercase tracking-[0.18em] text-[#0d3b35]">Pusat Pemuliaan Al-Quran 2024</h4>
                <span className="rounded-full bg-[#dff2ea] px-3 py-1 text-[11px] font-black uppercase tracking-widest text-[#0d4f45]">
                  Ref 2024: {DHQC_2024_REFERENCE.pusatPemuliaan.length}
                </span>
              </div>

              <div className="grid gap-4">
                {DHQC_2024_REFERENCE.pusatPemuliaan.map((item) => (
                  <div key={`${item.lokasi}-${item.bahagian}`} className="rounded-[1.5rem] border border-gray-100 bg-[#fbfcfb] p-4">
                    <div className="rounded-[1.35rem] border border-[#dce7e2] bg-white p-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">Rujukan 2024</p>
                      <p className="mt-3 text-sm font-black text-[#0d3b35]">{item.lokasi}</p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-widest text-[#947225]">{item.bahagian}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[1.6rem] border border-[#dce7e2] bg-[#f8fcfa] p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-[#dff2ea] p-3 text-[#0d4f45]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-[0.18em] text-[#0d3b35]">Tambah Pusat Pemuliaan 2025</h4>
                      <p className="text-xs font-medium text-slate-500">Tambah rekod pusat pemuliaan Al-Quran baharu untuk tahun 2025.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addPusatAlQuran}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0d4f45] px-4 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-[#0b4038]"
                  >
                    <Plus className="h-4 w-4" />
                    Tambah
                  </button>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black uppercase tracking-[0.16em] text-[#0d3b35]">Senarai 2025</span>
                    <span className="rounded-full bg-[#dff2ea] px-3 py-1 text-[11px] font-black uppercase tracking-widest text-[#0d4f45]">
                      Total 2025: {totalPusatAlQuran2025}
                    </span>
                  </div>

                  {(formData.dakwah.alQuran?.pusatPemuliaan || []).length === 0 && (
                    <div className="rounded-[1.35rem] border border-dashed border-[#c9ded6] bg-white px-4 py-5 text-sm font-medium text-slate-500">
                      Tiada pusat pemuliaan 2025 ditambah lagi. Klik butang <strong>Tambah</strong> untuk menambah rekod baharu.
                    </div>
                  )}

                  {(formData.dakwah.alQuran?.pusatPemuliaan || []).map((item: { lokasi?: string; bahagian?: string }, index: number) => (
                    <div key={`dakwah-pusat-2025-${index}`} className="space-y-3 rounded-[1.35rem] border border-[#f5e8bb] bg-[#fffaf0] p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#947225]">Pusat Pemuliaan 2025 #{index + 1}</p>
                        <button
                          type="button"
                          onClick={() => removePusatAlQuran(index)}
                          className="inline-flex items-center gap-1 rounded-xl bg-rose-50 px-3 py-2 text-[11px] font-black uppercase tracking-widest text-rose-600 ring-1 ring-rose-100 transition hover:bg-rose-100"
                        >
                          <Trash2 className="h-4 w-4" />
                          Padam
                        </button>
                      </div>
                      <input
                        type="text"
                        value={item.lokasi || ''}
                        onChange={(e) => updatePusatAlQuran(index, 'lokasi', e.target.value)}
                        placeholder="Masukkan lokasi pusat pemuliaan 2025"
                        className="w-full rounded-xl border border-[#eadfb6] bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[#d4ab3a] focus:ring-2 focus:ring-[#f0cf73]/40"
                      />
                      <select
                        value={item.bahagian || ''}
                        onChange={(e) => updatePusatAlQuran(index, 'bahagian', e.target.value)}
                        className="w-full rounded-xl border border-[#eadfb6] bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[#d4ab3a] focus:ring-2 focus:ring-[#f0cf73]/40"
                      >
                        <option value="">Pilih bahagian 2025</option>
                        {SARAWAK_DIVISIONS.map((division) => (
                          <option key={division} value={division}>
                            {division}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.6rem] border border-[#dce7e2] bg-[#f8fcfa] p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-[#dff2ea] p-3 text-[#0d4f45]">
                    <Anchor className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-[0.18em] text-[#0d3b35]">Statistik Debu & Pemuliaan</h4>
                    <p className="text-xs font-medium text-slate-500">Masukkan data 2025 sambil mengekalkan rujukan 2024.</p>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="grid grid-cols-[1.2fr_0.7fr_0.9fr] items-center gap-3">
                    <label className="text-sm font-bold text-slate-600">Berat Debu Al-Quran (Tan)</label>
                    <div className="rounded-xl bg-white px-3 py-2 text-center text-xs font-black uppercase tracking-widest text-slate-400">
                      Ref 2024: {DHQC_2024_REFERENCE.statistikDebu.berat}
                    </div>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={formData.dakwah.alQuran?.statistikDebu?.berat || ''}
                      onChange={(e) => handleAlQuranStatChange('berat', e.target.value)}
                      placeholder="0.0"
                      className="rounded-xl border border-[#c9ded6] bg-white px-4 py-3 text-sm font-bold text-[#0d3b35] outline-none transition focus:border-[#0d4f45] focus:ring-2 focus:ring-[#0d4f45]/15"
                    />
                  </div>

                  <div className="grid grid-cols-[1.2fr_0.7fr_0.9fr] items-center gap-3">
                    <label className="text-sm font-bold text-slate-600">Kekerapan Pemuliaan ke Lautan</label>
                    <div className="rounded-xl bg-white px-3 py-2 text-center text-xs font-black uppercase tracking-widest text-slate-400">
                      Ref 2024: {DHQC_2024_REFERENCE.statistikDebu.kekerapan}
                    </div>
                    <input
                      type="number"
                      min="0"
                      value={formData.dakwah.alQuran?.statistikDebu?.kekerapan || ''}
                      onChange={(e) => handleAlQuranStatChange('kekerapan', e.target.value)}
                      placeholder="0"
                      className="rounded-xl border border-[#c9ded6] bg-white px-4 py-3 text-sm font-bold text-[#0d3b35] outline-none transition focus:border-[#0d4f45] focus:ring-2 focus:ring-[#0d4f45]/15"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
      <>
      {/* Statistik Program & Tauliah Aktif */}
      <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-zus-900">Statistik Program & Tauliah</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-zus-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-zus-gold" /> Program Dakwah (2025)
            </h4>
            <div className="space-y-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <label className="text-xs font-bold text-gray-500">JAIS</label>
                <div className="text-center text-[10px] font-bold text-gray-400 bg-gray-100 py-1 rounded-md">
                  2024: {DAKWAH_2024_REFERENCE.statistik.jais}
                </div>
                <input 
                  type="number"
                  value={formData.dakwah.progJais2025}
                  onChange={(e) => handleDakwahChange('progJais2025', parseInt(e.target.value) || 0)}
                  className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <label className="text-xs font-bold text-gray-500">Agensi & NGO</label>
                <div className="text-center text-[10px] font-bold text-gray-400 bg-gray-100 py-1 rounded-md">
                  2024: {DAKWAH_2024_REFERENCE.perbandingan.y2024.agensi}
                </div>
                <input 
                  type="number"
                  value={formData.dakwah.progAgensi2025}
                  onChange={(e) => handleDakwahChange('progAgensi2025', parseInt(e.target.value) || 0)}
                  className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-zus-900 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-zus-gold" /> Tauliah Mengajar Aktif
            </h4>
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-xs font-bold text-gray-500">Jumlah Aktif</label>
              <div className="text-center text-[10px] font-bold text-gray-400 bg-gray-100 py-1 rounded-md">
                2024: {DAKWAH_2024_REFERENCE.tauliahAktif}
              </div>
              <input 
                type="number"
                value={formData.dakwah.tauliahAktif2025}
                onChange={(e) => handleDakwahChange('tauliahAktif2025', parseInt(e.target.value) || 0)}
                className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tauliah Mengajar Dikeluarkan (Pecahan Bahagian) */}
      <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-zus-900">Tauliah Mengajar Dikeluarkan (2025)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {formData.dakwah.tauliahDivisions.map((div: any, idx: number) => (
            <div key={div.name} className="grid grid-cols-3 items-center gap-4 py-2 border-b border-gray-50 last:border-0">
              <label className="text-xs font-bold text-gray-500">{div.name}</label>
              <div className="text-center text-[10px] font-bold text-gray-400 bg-gray-100 py-1 rounded-md">
                2024: {(DAKWAH_2024_REFERENCE.tauliahDikeluarkan as any)[div.name.charAt(0).toLowerCase() + div.name.slice(1).replace(/\s+/g, '')] || 0}
              </div>
              <input 
                type="number"
                value={div.val2025}
                onChange={(e) => handleDivisionChange('tauliahDivisions', idx, 'val2025', e.target.value)}
                className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Guru Agama Warga Asing */}
      <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-zus-900">Guru Agama Warga Asing (2025)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {formData.dakwah.guruAsingDivisions.map((div: any, idx: number) => (
            <div key={div.name} className="grid grid-cols-3 items-center gap-4 py-2 border-b border-gray-50 last:border-0">
              <label className="text-xs font-bold text-gray-500">{div.name}</label>
              <div className="text-center text-[10px] font-bold text-gray-400 bg-gray-100 py-1 rounded-md">
                2024: {(DAKWAH_2024_REFERENCE.guruWargaAsing as any)[div.name.charAt(0).toLowerCase() + div.name.slice(1).replace(/\s+/g, '')] || 0}
              </div>
              <input 
                type="number"
                value={div.val2025}
                onChange={(e) => handleDivisionChange('guruAsingDivisions', idx, 'val2025', e.target.value)}
                className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Dakwah Melalui Media */}
      <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
            <Radio className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-zus-900">Dakwah Melalui Media (2025)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-xs font-bold text-gray-500">Radio</label>
            <div className="text-center text-[10px] font-bold text-gray-400 bg-gray-100 py-1 rounded-md">
              2024: {DAKWAH_2024_REFERENCE.media.radio}
            </div>
            <input 
              type="number"
              value={formData.dakwah.mediaRadio2025}
              onChange={(e) => handleDakwahChange('mediaRadio2025', parseInt(e.target.value) || 0)}
              className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-xs font-bold text-gray-500">Internet</label>
            <div className="text-center text-[10px] font-bold text-gray-400 bg-gray-100 py-1 rounded-md">
              2024: {DAKWAH_2024_REFERENCE.media.internet}
            </div>
            <input 
              type="number"
              value={formData.dakwah.mediaInternet2025}
              onChange={(e) => handleDakwahChange('mediaInternet2025', parseInt(e.target.value) || 0)}
              className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none"
            />
          </div>
        </div>

        <div className="mt-8 rounded-[1.75rem] border border-orange-100 bg-orange-50/40 p-5 md:p-6">
          <div className="mb-5">
            <h4 className="text-sm font-black uppercase tracking-[0.18em] text-orange-900">
              Medium Media Sosial (Sekiranya Ada)
            </h4>
            <p className="mt-2 text-sm font-medium text-orange-900/70">
              Isikan maklumat, pautan, atau catatan ringkas bagi medium media sosial yang digunakan pada tahun 2025.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { key: 'facebook', label: 'Facebook' },
              { key: 'instagram', label: 'Instagram' },
              { key: 'thread', label: 'Thread' },
              { key: 'tiktok', label: 'Tiktok' },
              { key: 'telegramChannel', label: 'Telegram Channel' },
              { key: 'whatsappChannel', label: 'Whatsap Channel' },
            ].map((item) => (
              <div key={item.key} className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-600">{item.label}</label>
                <input
                  type="text"
                  value={formData.dakwah.mediaSosial?.[item.key] || ''}
                  onChange={(e) => handleMediaSosialChange(item.key, e.target.value)}
                  placeholder={`Masukkan ${item.label}`}
                  className="w-full rounded-xl border border-orange-100 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-200/60"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      </>
      )}

      <NarrativeSection formData={formData} handleInputChange={handleInputChange} />
      <LawatanSection 
        formData={formData} 
        addLawatan={addLawatan} 
        removeLawatan={removeLawatan} 
        updateLawatan={updateLawatan} 
        handleSave={handleSave}
        isSaving={isSaving}
      />
    </FormLayout>
  );
};

export default DakwahForm;
