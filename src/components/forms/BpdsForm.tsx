import React, { useMemo } from 'react';
import { getTodayIsoMY } from '../../utils/dateFormat';
import { Gavel, FileText, CheckCircle2, Users, ClipboardList, Activity, Info, ShieldCheck } from 'lucide-react';
import { BPDS_2024_REFERENCE } from '../../constants';
import FormLayout from './FormLayout';
import { LawatanSection } from './CommonSections';
import { useFormLogic } from './useFormLogic';
import { toNonNegativeFloat, toNonNegativeInt } from '../../utils/inputNormalization';

interface BpdsFormProps {
  deptName: string;
  onBack: () => void;
}

const BpdsForm: React.FC<BpdsFormProps> = ({ deptName, onBack }) => {
  const initialState = {
    tarikh: getTodayIsoMY(),
    disediakanOleh: '',
    jawatan: '',
    ringkasan: '',
    isu: '',
    cadangan: '',
    lawatan: [],
    bpds: {
      kertasSiasatan: {
        matrimoni: 0,
        jenayahSyariah: 0
      },
      kesSelesai: BPDS_2024_REFERENCE.kesSelesai.map(k => ({ name: k.name, value: 0 })),
      pendakwaSyarie: {
        pegawaiSyariah: 0,
        penolongPegawaiSyariah: 0,
        penolongPegawaiHalEhwalIslam: 0
      },
      pendaftaranKes: {
        matrimoni: 0,
        jenayahSyariah: 0
      },
      penggubalanKaedah: BPDS_2024_REFERENCE.penggubalanKaedah.map(k => ({ name: k.name, value: 0 })),
      derafUndangUndang: '',
      derafUndangUndangList: [],
      derafUndangUndangKemajuan: 0,
      aktiviti: 0
    }
  };

  const {
    formData,
    isSaving,
    isAutoSaving,
    showSuccess,
    saveError,
    handleSave,
  } = useFormLogic(deptName, initialState);

  const totalKesSelesai = useMemo(() => 
    formData.bpds.kesSelesai.reduce((acc: number, curr: any) => acc + toNonNegativeFloat(curr.value), 0),
    [formData.bpds.kesSelesai]
  );

  const totalPendakwa = toNonNegativeInt(formData.bpds.pendakwaSyarie.pegawaiSyariah) + 
                       toNonNegativeInt(formData.bpds.pendakwaSyarie.penolongPegawaiSyariah) + 
                       toNonNegativeInt(formData.bpds.pendakwaSyarie.penolongPegawaiHalEhwalIslam);

  const displayValue = (value: number | string | undefined | null) => {
    if (value === 0 || value === '0' || value === undefined || value === null || value === '') {
      return '-';
    }
    return value;
  };

  const isCompletedProgress = (value: number | string | undefined | null) => Number(value) >= 100;

  const readOnlyInputClass = "w-full p-2.5 bg-emerald-50/50 border border-emerald-100 rounded-lg text-sm font-black text-stone-800 cursor-default";

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
      readOnly={true}
    >
      {/* Verified Banner */}
      <section className="bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-emerald-900">Data Telah Disahkan & Diverifikasi</h3>
            <p className="text-sm text-emerald-700 font-medium mt-1">
              Bahagian Pendakwaan Syariah (BPDS) telah menyelesaikan proses pengesahan data. Borang ini hanya boleh dilihat sahaja.
            </p>
          </div>
        </div>
      </section>

      {/* Maklumat Asas (Read-Only) */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-stone-100 pb-4">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <Info className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">Maklumat Asas</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500">Tarikh Laporan</label>
            <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-slate-900">{formData.tarikh || '-'}</div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500">Disediakan Oleh</label>
            <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-slate-900">{formData.disediakanOleh || '-'}</div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500">Jawatan</label>
            <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-slate-900">{formData.jawatan || '-'}</div>
          </div>
        </div>
      </section>

      {/* Kertas Siasatan (IP) */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-stone-100 pb-4">
          <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center text-stone-600">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">Kertas Siasatan (IP) 2025</h3>
        </div>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full min-w-[480px] text-sm border-collapse">
            <thead className="bg-stone-50">
              <tr>
                <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider text-stone-800">Kategori</th>
                <th className="px-4 py-3 text-center text-[11px] font-black uppercase tracking-wider text-stone-800">Rujukan 2024</th>
                <th className="px-4 py-3 text-center text-[11px] font-black uppercase tracking-wider text-stone-800">Data 2025</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-stone-100">
                <td className="px-4 py-3 font-semibold text-stone-800">Matrimoni</td>
                <td className="px-4 py-3 text-center font-black text-stone-700">{BPDS_2024_REFERENCE.kertasSiasatan.matrimoni}</td>
                <td className="px-4 py-3">
                  <div className={readOnlyInputClass + " text-center"}>{displayValue(formData.bpds.kertasSiasatan.matrimoni)}</div>
                </td>
              </tr>
              <tr className="border-t border-stone-100">
                <td className="px-4 py-3 font-semibold text-stone-800">Jenayah Syariah</td>
                <td className="px-4 py-3 text-center font-black text-stone-700">{BPDS_2024_REFERENCE.kertasSiasatan.jenayahSyariah}</td>
                <td className="px-4 py-3">
                  <div className={readOnlyInputClass + " text-center"}>{displayValue(formData.bpds.kertasSiasatan.jenayahSyariah)}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Kes Selesai */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6 border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center text-stone-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">Kes Selesai Mengikut Bahagian 2025</h3>
          </div>
          <div className="px-4 py-2 bg-stone-800 text-white rounded-xl text-sm font-black shadow-md shadow-stone-100">
            Total: {totalKesSelesai}
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full min-w-[540px] text-sm border-collapse">
            <thead className="bg-stone-50">
              <tr>
                <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider text-stone-800">Bahagian</th>
                <th className="px-4 py-3 text-center text-[11px] font-black uppercase tracking-wider text-stone-800">Rujukan 2024</th>
                <th className="px-4 py-3 text-center text-[11px] font-black uppercase tracking-wider text-stone-800">Data 2025</th>
              </tr>
            </thead>
            <tbody>
              {formData.bpds.kesSelesai.map((item: any, idx: number) => (
                <tr key={item.name} className="border-t border-stone-100">
                  <td className="px-4 py-3 font-semibold text-stone-800">{item.name}</td>
                  <td className="px-4 py-3 text-center font-black text-stone-700">{BPDS_2024_REFERENCE.kesSelesai[idx].value}</td>
                  <td className="px-4 py-3">
                    <div className={readOnlyInputClass + " text-center"}>{displayValue(item.value)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sumber Manusia (Pendakwa) */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6 border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center text-stone-600">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">Sumber Manusia (Pendakwa Syarie)</h3>
          </div>
          <div className="px-3 py-1 bg-stone-100 text-stone-700 rounded-lg text-xs font-black">
            Total: {totalPendakwa}
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full min-w-[560px] text-sm border-collapse">
            <thead className="bg-stone-50">
              <tr>
                <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider text-stone-800">Jawatan</th>
                <th className="px-4 py-3 text-center text-[11px] font-black uppercase tracking-wider text-stone-800">Rujukan 2024</th>
                <th className="px-4 py-3 text-center text-[11px] font-black uppercase tracking-wider text-stone-800">Data 2025</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-stone-100">
                <td className="px-4 py-3 font-semibold text-stone-800">Pegawai Syariah</td>
                <td className="px-4 py-3 text-center font-black text-stone-700">{BPDS_2024_REFERENCE.pendakwaSyarie.pegawaiSyariah}</td>
                <td className="px-4 py-3">
                  <div className={readOnlyInputClass + " text-center"}>{displayValue(formData.bpds.pendakwaSyarie.pegawaiSyariah)}</div>
                </td>
              </tr>
              <tr className="border-t border-stone-100">
                <td className="px-4 py-3 font-semibold text-stone-800">Penolong Pegawai Syariah</td>
                <td className="px-4 py-3 text-center font-black text-stone-700">{BPDS_2024_REFERENCE.pendakwaSyarie.penolongPegawaiSyariah}</td>
                <td className="px-4 py-3">
                  <div className={readOnlyInputClass + " text-center"}>{displayValue(formData.bpds.pendakwaSyarie.penolongPegawaiSyariah)}</div>
                </td>
              </tr>
              <tr className="border-t border-stone-100">
                <td className="px-4 py-3 font-semibold text-stone-800">Penolong Pegawai Hal Ehwal Islam</td>
                <td className="px-4 py-3 text-center font-black text-stone-700">{BPDS_2024_REFERENCE.pendakwaSyarie.penolongPegawaiHalEhwalIslam}</td>
                <td className="px-4 py-3">
                  <div className={readOnlyInputClass + " text-center"}>{displayValue(formData.bpds.pendakwaSyarie.penolongPegawaiHalEhwalIslam)}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Pendaftaran Kes ke Mahkamah Syariah */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-stone-100 pb-4">
          <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center text-stone-600">
            <ClipboardList className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">Pendaftaran Kes ke Mahkamah Syariah 2025</h3>
        </div>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full min-w-[480px] text-sm border-collapse">
            <thead className="bg-stone-50">
              <tr>
                <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider text-stone-800">Kategori</th>
                <th className="px-4 py-3 text-center text-[11px] font-black uppercase tracking-wider text-stone-800">Rujukan 2024</th>
                <th className="px-4 py-3 text-center text-[11px] font-black uppercase tracking-wider text-stone-800">Data 2025</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-stone-100">
                <td className="px-4 py-3 font-semibold text-stone-800">Matrimoni</td>
                <td className="px-4 py-3 text-center font-black text-stone-700">{BPDS_2024_REFERENCE.pendaftaranKes.matrimoni}</td>
                <td className="px-4 py-3">
                  <div className={readOnlyInputClass + " text-center"}>{displayValue(formData.bpds.pendaftaranKes.matrimoni)}</div>
                </td>
              </tr>
              <tr className="border-t border-stone-100">
                <td className="px-4 py-3 font-semibold text-stone-800">Jenayah Syariah</td>
                <td className="px-4 py-3 text-center font-black text-stone-700">{BPDS_2024_REFERENCE.pendaftaranKes.jenayahSyariah}</td>
                <td className="px-4 py-3">
                  <div className={readOnlyInputClass + " text-center"}>{displayValue(formData.bpds.pendaftaranKes.jenayahSyariah)}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Penggubalan Kaedah */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 mb-6 border-b border-stone-100 pb-4">
          <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center text-stone-600">
            <Gavel className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">Penggubalan Kaedah (Status Kemajuan 2025)</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50">
                <th className="p-4 text-xs font-black text-stone-900 uppercase tracking-wider border-b border-stone-200">Jenis Kaedah</th>
                <th className="p-4 text-xs font-black text-stone-900 uppercase tracking-wider border-b border-stone-200 text-center">Rujukan 2024 (%)</th>
                <th className="p-4 text-xs font-black text-stone-900 uppercase tracking-wider border-b border-stone-200 text-center">Kemajuan 2025 (%)</th>
              </tr>
            </thead>
            <tbody>
              {formData.bpds.penggubalanKaedah.map((item: any, idx: number) => (
                <tr key={item.name} className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-4 text-xs font-bold text-stone-700 border-b border-stone-100">{item.name}</td>
                  <td className="p-4 text-xs font-bold text-stone-400 border-b border-stone-100 text-center">{BPDS_2024_REFERENCE.penggubalanKaedah[idx].value}%</td>
                  <td className="p-4 border-b border-stone-100">
                    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 p-2 bg-emerald-50/50 border border-emerald-100 rounded-lg text-sm font-black text-stone-800 text-center cursor-default">
                          {displayValue(item.value)}
                        </div>
                        <span className="text-xs font-bold text-stone-400">%</span>
                      </div>
                      {isCompletedProgress(item.value) && (
                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-black text-emerald-700">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                          Lengkap
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {(formData.bpds.derafUndangUndangList || []).map((item: any, idx: number) => {
                const draftItem = typeof item === 'string' ? { name: item, value: 0 } : item;

                return (
                  <tr key={`draft-${draftItem.name}-${idx}`} className="bg-amber-50/40 hover:bg-amber-50/70 transition-colors">
                    <td className="p-4 text-xs font-bold text-stone-700 border-b border-stone-100">{draftItem.name}</td>
                    <td className="p-4 text-xs font-bold text-stone-300 border-b border-stone-100 text-center">-</td>
                    <td className="p-4 border-b border-stone-100">
                      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-24 p-2 bg-emerald-50/50 border border-emerald-100 rounded-lg text-sm font-black text-stone-800 text-center cursor-default">
                            {displayValue(draftItem.value)}
                          </div>
                          <span className="text-xs font-bold text-stone-400">%</span>
                        </div>
                        {isCompletedProgress(draftItem.value) && (
                          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-black text-emerald-700">
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                            Lengkap
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Program / Aktiviti */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-stone-100 pb-4">
          <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center text-stone-600">
            <Activity className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">Program / Aktiviti 2025</h3>
        </div>

        <div className="overflow-x-auto rounded-xl border border-stone-200 max-w-2xl">
          <table className="w-full min-w-[460px] text-sm border-collapse">
            <thead className="bg-stone-50">
              <tr>
                <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider text-stone-800">Perkara</th>
                <th className="px-4 py-3 text-center text-[11px] font-black uppercase tracking-wider text-stone-800">Rujukan 2024</th>
                <th className="px-4 py-3 text-center text-[11px] font-black uppercase tracking-wider text-stone-800">Data 2025</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-stone-100">
                <td className="px-4 py-3 font-semibold text-stone-800">Jumlah Keseluruhan Program</td>
                <td className="px-4 py-3 text-center font-black text-stone-700">{BPDS_2024_REFERENCE.aktiviti}</td>
                <td className="px-4 py-3">
                  <div className={readOnlyInputClass + " text-center"}>{displayValue(formData.bpds.aktiviti)}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Ringkasan & Analisis (Read-Only) */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-stone-100 pb-4">
          <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">Ringkasan & Analisis</h3>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500">Ringkasan pencapaian utama unit tahun 2025</label>
            <div className="w-full min-h-20 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-slate-800 whitespace-pre-wrap">
              {formData.ringkasan || '-'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500">Isu dan cabaran unit</label>
              <div className="w-full min-h-20 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-slate-800 whitespace-pre-wrap">
                {formData.isu || '-'}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500">Cadangan penambahbaikan / way forward unit</label>
              <div className="w-full min-h-20 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-slate-800 whitespace-pre-wrap">
                {formData.cadangan || '-'}
              </div>
            </div>
          </div>
        </div>
      </section>

      <LawatanSection 
        formData={formData} 
        addLawatan={() => {}} 
        removeLawatan={() => {}} 
        updateLawatan={() => {}} 
        readOnly={true}
      />
    </FormLayout>
  );
};

export default BpdsForm;
