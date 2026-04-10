import React, { useMemo } from 'react';
import { BookOpen, Gavel, Save, Users } from 'lucide-react';
import FormLayout from './FormLayout';
import { useFormLogic } from './useFormLogic';
import { BasicInfoSection, NarrativeSection, LawatanSection } from './CommonSections';
import { DHQC_2024_REFERENCE, SARAWAK_DIVISIONS } from '../../constants';

const DIVISION_FIELD_MAP: Record<string, keyof typeof DHQC_2024_REFERENCE.guruAlQuran> = {
  Kuching: 'kuching',
  Samarahan: 'samarahan',
  Serian: 'serian',
  'Sri Aman': 'sriAman',
  Betong: 'betong',
  Sarikei: 'sarikei',
  Sibu: 'sibu',
  Mukah: 'mukah',
  Kapit: 'kapit',
  Bintulu: 'bintulu',
  Miri: 'miri',
  Limbang: 'limbang',
};

const DhqcForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
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
    removeLawatan,
    updateLawatan,
  } = useFormLogic('DHQC', {
    dhqc: {
      pusatPemuliaan: [],
      statistikDebu: {
        berat: '',
        kekerapan: '',
      },
      guruAlQuran: {
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
        limbang: '',
      },
      penyelia: {
        ibuPejabat: '',
        bintulu: '',
      },
      hakim: {
        negeri: '',
        bahagian: '',
        daerah: '',
      },
      qariQariah: {
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
        limbang: '',
      },
    },
  });

  const handleNestedInputChange = (section: string, subSection: string, field: string, value: string) => {
    const numValue = value === '' ? '' : Math.max(0, parseFloat(value));
    setFormData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subSection]: {
          ...prev[section][subSection],
          [field]: numValue,
        },
      },
    }));
  };

  const totalGuru = useMemo(
    () => Object.values(formData.dhqc.guruAlQuran).reduce((acc: number, val: any) => acc + (parseFloat(val) || 0), 0),
    [formData.dhqc.guruAlQuran]
  );

  const totalQari = useMemo(
    () => Object.values(formData.dhqc.qariQariah).reduce((acc: number, val: any) => acc + (parseFloat(val) || 0), 0),
    [formData.dhqc.qariQariah]
  );

  const totalPenyelia = useMemo(
    () => (parseFloat(formData.dhqc.penyelia.ibuPejabat) || 0) + (parseFloat(formData.dhqc.penyelia.bintulu) || 0),
    [formData.dhqc.penyelia]
  );

  const totalHakim = useMemo(
    () =>
      (parseFloat(formData.dhqc.hakim.negeri) || 0) +
      (parseFloat(formData.dhqc.hakim.bahagian) || 0) +
      (parseFloat(formData.dhqc.hakim.daerah) || 0),
    [formData.dhqc.hakim]
  );

  const statCards = [
    {
      label: 'Jumlah Guru Al-Quran',
      value: totalGuru,
      ref: DHQC_2024_REFERENCE.guruAlQuran.total,
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      label: 'Jumlah Qari / Qariah',
      value: totalQari,
      ref: DHQC_2024_REFERENCE.qariQariah.total,
      icon: <Users className="h-5 w-5" />,
    },
    {
      label: 'Jumlah Hakim Tilawah',
      value: totalHakim,
      ref: DHQC_2024_REFERENCE.hakim.total,
      icon: <Gavel className="h-5 w-5" />,
    },
  ];

  return (
    <FormLayout
      deptName="DHQC - Darul Hana Quranic Centre"
      onBack={onBack}
      onSave={handleSave}
      isSaving={isSaving}
      isAutoSaving={isAutoSaving}
      showSuccess={showSuccess}
      saveError={saveError}
      formData={formData}
    >
      <div className="space-y-8">
      <BasicInfoSection formData={formData} handleInputChange={handleInputChange} />
      <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0d4f45] via-[#0b3c35] to-[#072822] text-white shadow-[0_20px_60px_rgba(7,40,34,0.22)]">
        <div className="grid gap-8 px-6 py-8 md:grid-cols-[1.4fr_0.8fr] md:px-8">
          <div>
            <p className="mb-3 inline-flex items-center rounded-full border border-[#f0cf73]/30 bg-[#f0cf73]/10 px-4 py-1 text-[11px] font-black uppercase tracking-[0.28em] text-[#f7d982]">
              Dashboard Pengurusan Data DHQC
            </p>
            <h2 className="max-w-3xl text-3xl font-black tracking-tight md:text-5xl">
              Sistem Kemasukan Data DHQC
            </h2>
            <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-white/78 md:text-base">
              Paparan ini menempatkan rujukan 2024 secara read-only dan ruang kemasukan data 2025 untuk pemantauan trend DHQC.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#f7d982]">Rujukan Ringkas 2024</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-black/10 p-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Guru Al-Quran</p>
                <p className="mt-1 text-2xl font-black">{DHQC_2024_REFERENCE.guruAlQuran.total}</p>
              </div>
              <div className="rounded-2xl bg-black/10 p-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Qari / Qariah</p>
                <p className="mt-1 text-2xl font-black">{DHQC_2024_REFERENCE.qariQariah.total}</p>
              </div>
              <div className="rounded-2xl bg-black/10 p-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Penyelia GAQMIS</p>
                <p className="mt-1 text-2xl font-black">{DHQC_2024_REFERENCE.penyelia.total}</p>
              </div>
              <div className="rounded-2xl bg-black/10 p-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Hakim Tilawah</p>
                <p className="mt-1 text-2xl font-black">{DHQC_2024_REFERENCE.hakim.total}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-[#d6e4dd] bg-white shadow-sm">
        <div className="px-6 py-5">
          <h3 className="text-lg font-black uppercase tracking-tight text-[#0d3b35]">Ringkasan 2024 vs 2025</h3>
          <p className="text-xs font-semibold text-slate-500">Rujukan 2024 dipaparkan bersama data semasa 2025 secara side-by-side.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[#f6faf8] text-left text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
                <th className="px-5 py-4">Komponen</th>
                <th className="px-5 py-4 text-center">Rujukan 2024</th>
                <th className="px-5 py-4 text-center">Data 2025</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {statCards.map((card) => (
                <tr key={card.label} className="hover:bg-[#fbfcfb]">
                  <td className="px-5 py-4 font-black text-[#0d3b35]">{card.label}</td>
                  <td className="px-5 py-4 text-center font-black text-[#947225]">{card.ref}</td>
                  <td className="px-5 py-4 text-center font-black text-[#0d3b35]">{card.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-[#d6e4dd] bg-white shadow-sm">
        <div className="flex items-center gap-3 bg-[#0d4f45] px-6 py-5 text-white">
          <div className="rounded-2xl bg-[#f0cf73] p-2 text-[#0d4f45]">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-black uppercase tracking-tight">Komponen B: Guru Al-Quran & Qari/Qariah</h3>
            <p className="text-xs font-semibold text-white/70">Jadual perbandingan rujukan 2024 bersebelahan input kemas kini 2025.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[#f6faf8] text-left text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
                <th className="px-5 py-4">Nama Bahagian</th>
                <th className="px-5 py-4">Guru 2024</th>
                <th className="px-5 py-4">Guru 2025</th>
                <th className="px-5 py-4">Qari/Qariah 2024</th>
                <th className="px-5 py-4">Qari/Qariah 2025</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {SARAWAK_DIVISIONS.map((division) => {
                const key = DIVISION_FIELD_MAP[division];

                return (
                  <tr key={division} className="hover:bg-[#fbfcfb]">
                    <td className="px-5 py-4 font-black text-[#0d3b35]">{division}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full bg-[#edf4f1] px-3 py-1 text-xs font-black text-slate-500">
                        {DHQC_2024_REFERENCE.guruAlQuran[key]}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <input
                        type="number"
                        min="0"
                        value={formData.dhqc.guruAlQuran[key]}
                        onChange={(e) => handleNestedInputChange('dhqc', 'guruAlQuran', key, e.target.value)}
                        className="w-28 rounded-xl border border-[#c9ded6] bg-white px-4 py-3 text-sm font-bold text-[#0d3b35] outline-none transition focus:border-[#0d4f45] focus:ring-2 focus:ring-[#0d4f45]/15"
                        placeholder="0"
                      />
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full bg-[#fff4d7] px-3 py-1 text-xs font-black text-[#947225]">
                        {DHQC_2024_REFERENCE.qariQariah[key]}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <input
                        type="number"
                        min="0"
                        value={formData.dhqc.qariQariah[key]}
                        onChange={(e) => handleNestedInputChange('dhqc', 'qariQariah', key, e.target.value)}
                        className="w-28 rounded-xl border border-[#eadfb6] bg-white px-4 py-3 text-sm font-bold text-[#7b5c0c] outline-none transition focus:border-[#d4ab3a] focus:ring-2 focus:ring-[#f0cf73]/35"
                        placeholder="0"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-[#0d4f45] text-white">
                <td className="px-5 py-4 text-sm font-black uppercase tracking-[0.16em]">Jumlah Keseluruhan</td>
                <td className="px-5 py-4 text-lg font-black text-[#f7d982]">{DHQC_2024_REFERENCE.guruAlQuran.total}</td>
                <td className="px-5 py-4 text-lg font-black">{totalGuru}</td>
                <td className="px-5 py-4 text-lg font-black text-[#f7d982]">{DHQC_2024_REFERENCE.qariQariah.total}</td>
                <td className="px-5 py-4 text-lg font-black">{totalQari}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-[#d6e4dd] bg-white shadow-sm">
        <div className="flex items-center gap-3 bg-[#0d4f45] px-6 py-5 text-white">
          <div className="rounded-2xl bg-[#f0cf73] p-2 text-[#0d4f45]">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-black uppercase tracking-tight">Komponen C: Penyelia GAQMIS & Hakim Tilawah</h3>
            <p className="text-xs font-semibold text-white/70">Padanan rujukan 2024 dan rekod 2025 dengan jumlah automatik.</p>
          </div>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <div className="rounded-[1.6rem] border border-[#dce7e2] bg-[#f8fcfa] p-5">
            <div className="mb-5 flex items-center justify-between">
              <h4 className="text-sm font-black uppercase tracking-[0.18em] text-[#0d3b35]">Penyelia GAQMIS</h4>
              <span className="rounded-full bg-[#dff2ea] px-3 py-1 text-[11px] font-black uppercase tracking-widest text-[#0d4f45]">
                Total 2025: {totalPenyelia}
              </span>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Ibu Pejabat', field: 'ibuPejabat', ref: DHQC_2024_REFERENCE.penyelia.ibuPejabat },
                { label: 'Bintulu', field: 'bintulu', ref: DHQC_2024_REFERENCE.penyelia.bintulu },
              ].map((item) => (
                <div key={item.field} className="grid grid-cols-[1fr_0.7fr_0.8fr] items-center gap-3">
                  <label className="text-sm font-bold text-slate-600">{item.label}</label>
                  <div className="rounded-xl bg-white px-3 py-2 text-center text-xs font-black uppercase tracking-widest text-slate-400">
                    Rujukan 2024: {item.ref}
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={formData.dhqc.penyelia[item.field as keyof typeof formData.dhqc.penyelia]}
                    onChange={(e) => handleNestedInputChange('dhqc', 'penyelia', item.field, e.target.value)}
                    className="rounded-xl border border-[#c9ded6] bg-white px-4 py-3 text-sm font-bold text-[#0d3b35] outline-none transition focus:border-[#0d4f45] focus:ring-2 focus:ring-[#0d4f45]/15"
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-[#f5e8bb] bg-[#fffaf0] p-5">
            <div className="mb-5 flex items-center justify-between">
              <h4 className="text-sm font-black uppercase tracking-[0.18em] text-[#7b5c0c]">Hakim Tilawah</h4>
              <span className="rounded-full bg-[#f8eab6] px-3 py-1 text-[11px] font-black uppercase tracking-widest text-[#7b5c0c]">
                Total 2025: {totalHakim}
              </span>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Peringkat Negeri', field: 'negeri', ref: DHQC_2024_REFERENCE.hakim.negeri },
                { label: 'Peringkat Bahagian', field: 'bahagian', ref: DHQC_2024_REFERENCE.hakim.bahagian },
                { label: 'Peringkat Daerah', field: 'daerah', ref: DHQC_2024_REFERENCE.hakim.daerah },
              ].map((item) => (
                <div key={item.field} className="grid grid-cols-[1fr_0.7fr_0.8fr] items-center gap-3">
                  <label className="text-sm font-bold text-slate-600">{item.label}</label>
                  <div className="rounded-xl bg-white px-3 py-2 text-center text-xs font-black uppercase tracking-widest text-slate-400">
                    Rujukan 2024: {item.ref}
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={formData.dhqc.hakim[item.field as keyof typeof formData.dhqc.hakim]}
                    onChange={(e) => handleNestedInputChange('dhqc', 'hakim', item.field, e.target.value)}
                    className="rounded-xl border border-[#eadfb6] bg-white px-4 py-3 text-sm font-bold text-[#7b5c0c] outline-none transition focus:border-[#d4ab3a] focus:ring-2 focus:ring-[#f0cf73]/35"
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
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

      <section className="rounded-[2rem] border border-[#d6e4dd] bg-gradient-to-r from-[#f8fcfa] to-[#fffaf0] p-6 shadow-sm print:hidden">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-black tracking-tight text-[#0d3b35]">Tindakan Rekod 2025</h3>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Simpan rekod DHQC. Butang `Export PDF` standard aplikasi di bahagian atas menggunakan layout alternatif PDF aplikasi.
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-3 rounded-[1.2rem] bg-[#0d4f45] px-6 py-4 text-sm font-black text-white shadow-[0_14px_30px_rgba(13,79,69,0.18)] transition hover:bg-[#0b4038] disabled:opacity-70"
          >
            <Save className="h-5 w-5" />
            {isSaving ? 'Menyimpan...' : 'Simpan Rekod 2025'}
          </button>
        </div>
      </section>
      </div>
    </FormLayout>
  );
};

export default DhqcForm;
