import React, { useMemo } from 'react';
import { getTodayIsoMY } from '../../utils/dateFormat';
import { BookOpenCheck, HandHelping, Home, Sparkles, Users } from 'lucide-react';
import FormLayout from './FormLayout';
import { BasicInfoSection, LawatanSection, NarrativeSection } from './CommonSections';
import { useFormLogic } from './useFormLogic';
import { BKSK_2024_REFERENCE } from '../../constants';

interface BkskFormProps {
  deptName: string;
  onBack: () => void;
}

const createInitialState = () => ({
  tarikh: getTodayIsoMY(),
  disediakanOleh: '',
  jawatan: '',
  ringkasan: '',
  isu: '',
  cadangan: '',
  lawatan: [],
  bksk: {
    statistik: {
      pendaftaranPengislaman: '',
      programAktiviti: '',
    },
    kelasBimbingan: BKSK_2024_REFERENCE.kelasBimbingan.map((row) => ({
      name: row.name,
      kelas: '',
      guru: '',
    })),
    urusSetiaProkask: BKSK_2024_REFERENCE.urusSetiaProkask.map((row) => ({
      name: row.name,
      urusSetia: '',
      prokask: '',
    })),
    kampungNuqaba: BKSK_2024_REFERENCE.kampungNuqaba.map((row) => ({
      name: row.name,
      kampungSaudaraKita: '',
      nuqabaMualaf: '',
    })),
  },
});

const parseNumberInput = (value: string) => {
  if (value === '') return '';
  const parsed = parseInt(value, 10);
  return Number.isNaN(parsed) ? '' : Math.max(0, parsed);
};

const sumField = (rows: any[], field: string) =>
  rows.reduce((total, row) => total + (parseInt(row[field], 10) || 0), 0);

const BkskForm: React.FC<BkskFormProps> = ({ deptName, onBack }) => {
  const {
    formData,
    setFormData,
    isSaving,
    showSuccess,
    saveError,
    handleInputChange,
    handleSave,
    addLawatan,
    removeLawatan,
    updateLawatan,
    isAutoSaving,
  } = useFormLogic(deptName, createInitialState());

  const handleStatChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      bksk: {
        ...prev.bksk,
        statistik: {
          ...prev.bksk.statistik,
          [field]: parseNumberInput(value),
        },
      },
    }));
  };

  const handleTableChange = (table: string, index: number, field: string, value: string) => {
    setFormData((prev: any) => {
      const nextRows = [...prev.bksk[table]];
      nextRows[index] = {
        ...nextRows[index],
        [field]: parseNumberInput(value),
      };

      return {
        ...prev,
        bksk: {
          ...prev.bksk,
          [table]: nextRows,
        },
      };
    });
  };

  const totals = useMemo(() => ({
    kelasBimbingan: {
      kelas2025: sumField(formData.bksk.kelasBimbingan, 'kelas'),
      guru2025: sumField(formData.bksk.kelasBimbingan, 'guru'),
    },
    urusSetiaProkask: {
      urusSetia2025: sumField(formData.bksk.urusSetiaProkask, 'urusSetia'),
      prokask2025: sumField(formData.bksk.urusSetiaProkask, 'prokask'),
    },
    kampungNuqaba: {
      kampung2025: sumField(formData.bksk.kampungNuqaba, 'kampungSaudaraKita'),
      nuqaba2025: sumField(formData.bksk.kampungNuqaba, 'nuqabaMualaf'),
    },
  }), [formData.bksk]);

  const StatCard = ({
    title,
    field,
    icon,
  }: {
    title: string;
    field: 'pendaftaranPengislaman' | 'programAktiviti';
    icon: React.ReactNode;
  }) => (
    <div className="rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-50 via-white to-amber-50 p-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-teal-700">{title}</p>
          <p className="mt-1 text-xs font-semibold text-slate-400">Input data semasa untuk tahun 2025</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-700 text-white shadow-lg">
          {icon}
        </div>
      </div>
      <input
        type="number"
        min="0"
        value={formData.bksk.statistik[field]}
        onChange={(e) => handleStatChange(field, e.target.value)}
        placeholder="0"
        className="w-full rounded-2xl border border-teal-100 bg-white px-5 py-4 text-2xl font-black text-slate-900 outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
      />
      <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Input Data 2025</p>
    </div>
  );

  const renderDivisionTable = ({
    title,
    icon,
    rows2025,
    tableKey,
    columns,
  }: any) => (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-teal-900 via-teal-800 to-cyan-800 px-6 py-5 text-white">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-black uppercase tracking-wide">{title}</h3>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-100">Input data 2025</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#F5EFE3] text-slate-600">
              <th className="border-b border-slate-200 px-4 py-3 text-left text-[11px] font-black uppercase tracking-widest">Bahagian</th>
              {columns.map((column: any) => (
                <th key={column.key} className="border-b border-slate-200 px-4 py-3 text-center text-[11px] font-black uppercase tracking-widest bg-teal-50">
                  {column.label} 2025
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows2025.map((row: any, index: number) => (
              <tr key={row.name} className="odd:bg-white even:bg-slate-50/60">
                <td className="border-b border-slate-100 px-4 py-3 font-black text-slate-800">{row.name}</td>
                {columns.map((column: any) => (
                  <td key={column.key} className="border-b border-slate-100 bg-teal-50/60 px-3 py-2">
                    <input
                      type="number"
                      min="0"
                      value={row[column.key]}
                      onChange={(e) => handleTableChange(tableKey, index, column.key, e.target.value)}
                      placeholder="0"
                      className="w-full rounded-xl border border-teal-100 bg-white px-3 py-2 text-center font-black text-slate-900 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                    />
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-teal-900 text-white">
              <td className="px-4 py-3 font-black uppercase">Jumlah</td>
              {columns.map((column: any) => (
                <td key={column.key} className="px-4 py-3 text-center font-black bg-teal-800">
                  {sumField(rows2025, column.key)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );

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
      <div className="space-y-8">
        <section className="rounded-[2rem] bg-[linear-gradient(135deg,#0f766e_0%,#155e75_55%,#164e63_100%)] p-8 text-white shadow-xl">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-cyan-100">Laporan Pengislaman Dan Saudara Kita</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-black uppercase tracking-tight">Bahagian Kemajuan Saudara Kita (BKSK)</h1>
          <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-teal-50">
            Borang ini memfokuskan pengisian data tahun 2025 untuk semakan, simpanan, dan eksport laporan tahunan.
          </p>
        </section>

        <BasicInfoSection formData={formData} handleInputChange={handleInputChange} />

        <section className="space-y-5">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-teal-700">1. Statistik Utama</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900">Ringkasan Pencapaian BKSK</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <StatCard
              title="Pendaftaran Pengislaman"
              field="pendaftaranPengislaman"
              icon={<Users className="h-5 w-5" />}
            />
            <StatCard
              title="Program / Aktiviti"
              field="programAktiviti"
              icon={<Sparkles className="h-5 w-5" />}
            />
          </div>
        </section>

        {renderDivisionTable({
          title: '2. Kelas Bimbingan Saudara Kita',
          icon: <BookOpenCheck className="h-5 w-5" />,
          rows2025: formData.bksk.kelasBimbingan,
          tableKey: 'kelasBimbingan',
          columns: [
            { key: 'kelas', label: 'Kelas' },
            { key: 'guru', label: 'Guru' },
          ],
        })}

        {renderDivisionTable({
          title: '3. Urus Setia & Program Angkat (PROKASK)',
          icon: <HandHelping className="h-5 w-5" />,
          rows2025: formData.bksk.urusSetiaProkask,
          tableKey: 'urusSetiaProkask',
          columns: [
            { key: 'urusSetia', label: 'Urus Setia' },
            { key: 'prokask', label: 'PROKASK' },
          ],
        })}

        {renderDivisionTable({
          title: '4. Kampung Saudara Kita & Nuqaba Mualaf',
          icon: <Home className="h-5 w-5" />,
          rows2025: formData.bksk.kampungNuqaba,
          tableKey: 'kampungNuqaba',
          columns: [
            { key: 'kampungSaudaraKita', label: 'Kg Saudara Kita' },
            { key: 'nuqabaMualaf', label: 'Nuqaba Mualaf' },
          ],
        })}

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

export default BkskForm;
