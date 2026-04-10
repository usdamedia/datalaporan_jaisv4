import React from 'react';
import { getTodayIsoMY } from '../../utils/dateFormat';
import { FileText, ShieldCheck, Video } from 'lucide-react';
import FormLayout from './FormLayout';
import { useFormLogic } from './useFormLogic';
import { INTEGRITI_2025_CURRENT } from '../../constants';

interface IntegritiFormProps {
  deptName: string;
  onBack: () => void;
}

const REFERENCE_ROWS = [
  {
    key: 'bilMesyuaratTatakelola',
    label: 'Mesyuarat Jawatankuasa Tatakelola',
    reference: 3,
    placeholder: 'Masukkan jumlah...',
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    key: 'bilVideoIntegriti',
    label: 'Video Integriti',
    reference: 11,
    placeholder: 'Masukkan jumlah...',
    icon: <Video className="h-5 w-5" />,
  },
  {
    key: 'bilDokumenIntegriti',
    label: 'Dokumen Integriti Dikeluarkan',
    reference: 5,
    placeholder: 'Masukkan jumlah...',
    icon: <FileText className="h-5 w-5" />,
  },
  {
    key: 'bilManualIntegriti',
    label: 'Manual',
    reference: 1,
    placeholder: 'Masukkan jumlah...',
    icon: <FileText className="h-5 w-5" />,
  },
  {
    key: 'bilPolisiIntegriti',
    label: 'Polisi',
    reference: 4,
    placeholder: 'Masukkan jumlah...',
    icon: <FileText className="h-5 w-5" />,
  },
  {
    key: 'bilProgramIntegriti',
    label: 'Program / Aktiviti',
    reference: 31,
    placeholder: 'Masukkan jumlah...',
    icon: <ShieldCheck className="h-5 w-5" />,
  },
] as const;

const IntegritiForm: React.FC<IntegritiFormProps> = ({ deptName, onBack }) => {
  const { formData, setFormData, handleSave, isSaving, isAutoSaving, showSuccess, saveError } = useFormLogic(deptName, {
    tarikh: getTodayIsoMY(),
    disediakanOleh: '',
    jawatan: '',
    integriti: {
      bilMesyuaratTatakelola: INTEGRITI_2025_CURRENT.tadbirUrus.mesyuarat,
      bilVideoIntegriti: INTEGRITI_2025_CURRENT.multimedia.video,
      bilDokumenIntegriti: INTEGRITI_2025_CURRENT.dokumentasi.total,
      bilManualIntegriti: INTEGRITI_2025_CURRENT.dokumentasi.manual,
      bilPolisiIntegriti: INTEGRITI_2025_CURRENT.dokumentasi.polisi,
      bilProgramIntegriti: INTEGRITI_2025_CURRENT.tadbirUrus.program,
    },
  });

  React.useEffect(() => {
    setFormData((prev: any) => ({
      ...prev,
      integriti: {
        ...prev.integriti,
        bilMesyuaratTatakelola: INTEGRITI_2025_CURRENT.tadbirUrus.mesyuarat,
        bilVideoIntegriti: INTEGRITI_2025_CURRENT.multimedia.video,
        bilDokumenIntegriti: INTEGRITI_2025_CURRENT.dokumentasi.total,
        bilManualIntegriti: INTEGRITI_2025_CURRENT.dokumentasi.manual,
        bilPolisiIntegriti: INTEGRITI_2025_CURRENT.dokumentasi.polisi,
        bilProgramIntegriti: INTEGRITI_2025_CURRENT.tadbirUrus.program,
      },
    }));
  }, [setFormData]);

  const handleNumberChange = (
    field:
      | 'bilMesyuaratTatakelola'
      | 'bilVideoIntegriti'
      | 'bilDokumenIntegriti'
      | 'bilManualIntegriti'
      | 'bilPolisiIntegriti'
      | 'bilProgramIntegriti',
    value: string
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      integriti: {
        ...prev.integriti,
        [field]: value === '' ? '' : Math.max(0, parseInt(value, 10) || 0),
      },
    }));
  };

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
      <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0f2b46] via-[#114f61] to-[#1d7669] text-white shadow-[0_25px_70px_rgba(17,79,97,0.22)]">
        <div className="grid gap-8 px-6 py-8 md:px-8 xl:grid-cols-[1.35fr_0.85fr]">
          <div>
            <p className="mb-3 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-[11px] font-black uppercase tracking-[0.28em] text-[#d8f3ef]">
              Kemaskini Pencapaian Unit Integriti
            </p>
            <h2 className="max-w-3xl text-3xl font-black tracking-tight md:text-5xl">
              Data 2024 dipapar sebagai rujukan sahaja dan tidak boleh diubah.
            </h2>
            <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-white/80 md:text-base">
              Susun atur ini mengikut format yang anda beri: lajur rujukan `2024` kekal statik, manakala lajur
              `2025 Entry Form` diletakkan di sebelahnya untuk kemaskini data semasa.
            </p>
            <div className="mt-5 inline-flex items-center rounded-full border border-emerald-200/25 bg-emerald-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-100">
              {INTEGRITI_2025_CURRENT.status.note} Ditandatangani oleh {INTEGRITI_2025_CURRENT.status.signedBy}.
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#d8f3ef]">Nota Rujukan 2024</p>
            <div className="mt-4 space-y-3 text-sm font-medium text-white/85">
              <p>Dokumen integriti tahun 2024 berjumlah 5 dan pecahannya ialah:</p>
              <ol className="space-y-2 pl-5 text-white/80 list-decimal">
                <li>1 manual</li>
                <li>4 polisi</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-[#d8e3e8] bg-white shadow-sm">
        <div className="border-b border-[#d8e3e8] bg-[#f5fafb] px-6 py-5">
          <h3 className="text-lg font-black uppercase tracking-tight text-[#12344a]">Grid Kemaskini 2025</h3>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Lajur kedua ialah data rujukan 2024 dan lajur ketiga ialah data semasa 2025 yang boleh disemak atau dikemas kini.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#12344a] text-white">
                <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-[0.18em]">Kategori Aktiviti</th>
                <th className="px-6 py-4 text-center text-sm font-black uppercase tracking-[0.18em]">Data 2024 (Rujukan)</th>
                <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-[0.18em]">2025 Entry Form</th>
              </tr>
            </thead>
            <tbody>
              {REFERENCE_ROWS.map((row, index) => (
                <tr key={row.key} className={index % 2 === 0 ? 'bg-white' : 'bg-[#fbfdfd]'}>
                  <td className="border-t border-[#e6eef1] px-6 py-5">
                    <div className="flex items-start gap-3">
                      <div className="rounded-2xl bg-[#dff4f1] p-3 text-[#114f61]">{row.icon}</div>
                      <div>
                        <p className="text-sm font-black text-[#12344a]">{row.label}</p>
                      </div>
                    </div>
                  </td>
                  <td className="border-t border-[#e6eef1] px-6 py-5 text-center">
                    <span className="inline-flex min-w-16 items-center justify-center rounded-full bg-[#eef4f7] px-4 py-2 text-lg font-black text-[#12344a]">
                      {row.reference}
                    </span>
                  </td>
                  <td className="border-t border-[#e6eef1] px-6 py-5">
                    <input
                      type="number"
                      min="0"
                      inputMode="numeric"
                      value={formData.integriti?.[row.key] ?? ''}
                      onChange={(e) => handleNumberChange(row.key, e.target.value)}
                      placeholder={row.placeholder}
                      className="w-full rounded-2xl border border-[#cfe0e7] bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#1d7669] focus:ring-4 focus:ring-[#1d7669]/10"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.6rem] border border-amber-100 bg-amber-50 p-6">
          <h3 className="text-sm font-black uppercase tracking-[0.18em] text-amber-900">Panduan Teknikal</h3>
          <div className="mt-4 space-y-3 text-sm font-medium leading-6 text-amber-900/85">
            <p>Data 2024 ditetapkan sebagai rujukan statik dan tidak boleh diubah pada page ini.</p>
            <p>Data 2025 telah diisi awal dengan rekod terkini yang disahkan oleh Ketua Unit Integriti.</p>
            <p>Setiap perubahan boleh disimpan sebagai draf menggunakan butang simpan di bahagian atas.</p>
          </div>
        </div>

        <div className="rounded-[1.6rem] border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-sm font-black uppercase tracking-[0.18em] text-slate-700">Ringkasan Input 2025</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {REFERENCE_ROWS.map((row) => (
              <div key={row.key} className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">{row.label}</p>
                <p className="mt-2 text-3xl font-black tracking-tight text-[#12344a]">
                  {formData.integriti?.[row.key] === '' || formData.integriti?.[row.key] === undefined
                    ? '-'
                    : formData.integriti[row.key]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FormLayout>
  );
};

export default IntegritiForm;
