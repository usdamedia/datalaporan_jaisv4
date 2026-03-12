import React, { useEffect } from 'react';
import FormLayout from './FormLayout';
import { BasicInfoSection, NarrativeSection, LawatanSection } from './CommonSections';
import { useFormLogic } from './useFormLogic';
import { LEADERSHIP_2024_REFERENCE, FINANCE_2024_REFERENCE } from '../../constants';
import { Users, ChevronRight, TrendingUp, DollarSign, Percent, Star, CheckCircle2, XCircle } from 'lucide-react';

interface BppsFormProps {
  deptName: string;
  onBack: () => void;
}

const BppsForm: React.FC<BppsFormProps> = ({ deptName, onBack }) => {
  const isPentadbiran = deptName.includes('Pentadbiran');
  const isFinance = deptName.includes('Kewangan') || deptName.includes('Akaun');

  const initialState = {
    tarikh: new Date().toISOString().split('T')[0],
    disediakanOleh: '',
    jawatan: '',
    ringkasan: '',
    isu: '',
    cadangan: '',
    lawatan: [],
    leadership: {
      jpto: '',
      mpj: '',
      pegawaiAgama: '',
      perhimpunan: {
        tawjihat: '',
        perdana: '',
        bulanan: '',
        total: 0
      },
      aset: '',
      keselamatan: '',
      kader: '',
      kewanganPerolehan: '',
      panelHR: {
        biasa: '',
        khas: '',
        total: 0
      }
    },
    finance: {
      financeYears: [
        { year: '2025', lulus: '', belanja: '', hasil: '' }
      ],
      percentageBelanja: '',
      percentageEcsa: '',
      financeDistricts: [
        { name: 'Kuching', naziran: false, starRating: 0 },
        { name: 'Samarahan', naziran: false, starRating: 0 },
        { name: 'Serian', naziran: false, starRating: 0 },
        { name: 'Sri Aman', naziran: false, starRating: 0 },
        { name: 'Betong', naziran: false, starRating: 0 },
        { name: 'Sarikei', naziran: false, starRating: 0 },
        { name: 'Sibu', naziran: false, starRating: 0 },
        { name: 'Mukah', naziran: false, starRating: 0 },
        { name: 'Kapit', naziran: false, starRating: 0 },
        { name: 'Bintulu', naziran: false, starRating: 0 },
        { name: 'Miri', naziran: false, starRating: 0 },
        { name: 'Limbang', naziran: false, starRating: 0 },
        { name: 'Lawas', naziran: false, starRating: 0 },
        { name: 'Daro', naziran: false, starRating: 0 }
      ]
    }
  };

  const {
    formData,
    setFormData,
    isSaving,
    showSuccess,
    handleInputChange,
    handleSave,
    addLawatan,
    removeLawatan,
    updateLawatan
  } = useFormLogic(deptName, initialState);

  // Auto-sum for Perhimpunan
  useEffect(() => {
    if (isPentadbiran) {
      const tawjihat = parseInt(formData.leadership.perhimpunan.tawjihat) || 0;
      const perdana = parseInt(formData.leadership.perhimpunan.perdana) || 0;
      const bulanan = parseInt(formData.leadership.perhimpunan.bulanan) || 0;
      const total = tawjihat + perdana + bulanan;

      if (total !== formData.leadership.perhimpunan.total) {
        setFormData((prev: any) => ({
          ...prev,
          leadership: {
            ...prev.leadership,
            perhimpunan: {
              ...prev.leadership.perhimpunan,
              total
            }
          }
        }));
      }
    }
  }, [formData.leadership?.perhimpunan?.tawjihat, formData.leadership?.perhimpunan?.perdana, formData.leadership?.perhimpunan?.bulanan, isPentadbiran]);

  // Auto-sum for Panel HR
  useEffect(() => {
    if (isPentadbiran) {
      const biasa = parseInt(formData.leadership.panelHR.biasa) || 0;
      const khas = parseInt(formData.leadership.panelHR.khas) || 0;
      const total = biasa + khas;

      if (total !== formData.leadership.panelHR.total) {
        setFormData((prev: any) => ({
          ...prev,
          leadership: {
            ...prev.leadership,
            panelHR: {
              ...prev.leadership.panelHR,
              total
            }
          }
        }));
      }
    }
  }, [formData.leadership?.panelHR?.biasa, formData.leadership?.panelHR?.khas, isPentadbiran]);

  const updateLeadershipField = (field: string, value: string, subField?: string) => {
    setFormData((prev: any) => {
      if (subField) {
        return {
          ...prev,
          leadership: {
            ...prev.leadership,
            [field]: {
              ...prev.leadership[field],
              [subField]: value
            }
          }
        };
      }
      return {
        ...prev,
        leadership: {
          ...prev.leadership,
          [field]: value
        }
      };
    });
  };

  const updateFinanceYearField = (index: number, field: string, value: string) => {
    setFormData((prev: any) => {
      const newYears = [...prev.finance.financeYears];
      newYears[index] = { ...newYears[index], [field]: value };
      return {
        ...prev,
        finance: {
          ...prev.finance,
          financeYears: newYears
        }
      };
    });
  };

  const updateFinanceDistrictField = (index: number, field: string, value: any) => {
    setFormData((prev: any) => {
      const newDistricts = [...prev.finance.financeDistricts];
      newDistricts[index] = { ...newDistricts[index], [field]: value };
      return {
        ...prev,
        finance: {
          ...prev.finance,
          financeDistricts: newDistricts
        }
      };
    });
  };

  const updateFinanceField = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      finance: {
        ...prev.finance,
        [field]: value
      }
    }));
  };

  return (
    <FormLayout
      deptName={deptName}
      onBack={onBack}
      onSave={handleSave}
      isSaving={isSaving}
      showSuccess={showSuccess}
      formData={formData}
    >
      <BasicInfoSection formData={formData} handleInputChange={handleInputChange} />

      {isFinance && (
        <div className="space-y-8">
          {/* Section 1: Bajet & Belanjawan */}
          <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zus-900">Bajet & Belanjawan 2025</h3>
                <p className="text-xs text-gray-400 font-medium">Pengurusan Kewangan Jabatan</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Lulus */}
              <div className="p-5 bg-purple-50/50 border border-purple-100 rounded-2xl space-y-3">
                <div className="flex justify-between items-start">
                  <label className="text-[10px] font-black text-purple-900 uppercase leading-tight">Peruntukan Lulus (RM)</label>
                  <span className="text-[9px] font-bold text-purple-400">Ref 24: {FINANCE_2024_REFERENCE.financeYears[3].lulus.toLocaleString()}</span>
                </div>
                <input
                  type="number"
                  value={formData.finance.financeYears[0].lulus}
                  onChange={(e) => updateFinanceYearField(0, 'lulus', e.target.value)}
                  className="w-full p-2.5 bg-white border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none font-bold text-sm"
                  placeholder="0"
                />
              </div>

              {/* Belanja */}
              <div className="p-5 bg-amber-50/50 border border-amber-100 rounded-2xl space-y-3">
                <div className="flex justify-between items-start">
                  <label className="text-[10px] font-black text-amber-900 uppercase leading-tight">Perbelanjaan (RM)</label>
                  <span className="text-[9px] font-bold text-amber-400">Ref 24: {FINANCE_2024_REFERENCE.financeYears[3].belanja.toLocaleString()}</span>
                </div>
                <input
                  type="number"
                  value={formData.finance.financeYears[0].belanja}
                  onChange={(e) => updateFinanceYearField(0, 'belanja', e.target.value)}
                  className="w-full p-2.5 bg-white border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none font-bold text-sm"
                  placeholder="0"
                />
              </div>

              {/* Baki */}
              <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-2xl space-y-3">
                <div className="flex justify-between items-start">
                  <label className="text-[10px] font-black text-blue-900 uppercase leading-tight">Baki (RM)</label>
                  <span className="text-[9px] font-bold text-blue-400">Auto-calculated</span>
                </div>
                <div className="w-full p-2.5 bg-white border border-blue-200 rounded-xl font-bold text-sm text-blue-700">
                  RM {( (parseInt(formData.finance.financeYears[0].lulus) || 0) - (parseInt(formData.finance.financeYears[0].belanja) || 0) ).toLocaleString()}
                </div>
              </div>

              {/* Kutipan Hasil */}
              <div className="p-5 bg-emerald-50/50 border border-emerald-100 rounded-2xl space-y-3">
                <div className="flex justify-between items-start">
                  <label className="text-[10px] font-black text-emerald-900 uppercase leading-tight">Kutipan Hasil (RM)</label>
                  <span className="text-[9px] font-bold text-emerald-400">Ref 24: {FINANCE_2024_REFERENCE.financeYears[3].hasil.toLocaleString()}</span>
                </div>
                <input
                  type="number"
                  value={formData.finance.financeYears[0].hasil}
                  onChange={(e) => updateFinanceYearField(0, 'hasil', e.target.value)}
                  className="w-full p-2.5 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-sm"
                  placeholder="0"
                />
              </div>

              {/* Prestasi Perbelanjaan */}
              <div className="p-5 bg-rose-50/50 border border-rose-100 rounded-2xl space-y-3">
                <div className="flex justify-between items-start">
                  <label className="text-[10px] font-black text-rose-900 uppercase leading-tight">Prestasi Perbelanjaan (%)</label>
                  <span className="text-[9px] font-bold text-rose-400">Ref 24: {FINANCE_2024_REFERENCE.percentageBelanja}%</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={formData.finance.percentageBelanja}
                    onChange={(e) => updateFinanceField('percentageBelanja', e.target.value)}
                    className="w-full p-2.5 bg-white border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none font-bold text-sm pr-8"
                    placeholder="0.00"
                  />
                  <Percent className="w-3.5 h-3.5 text-rose-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* eCSA */}
              <div className="p-5 bg-indigo-50/50 border border-indigo-100 rounded-2xl space-y-3">
                <div className="flex justify-between items-start">
                  <label className="text-[10px] font-black text-indigo-900 uppercase leading-tight">Pencapaian eCSA (%)</label>
                  <span className="text-[9px] font-bold text-indigo-400">Ref 24: {FINANCE_2024_REFERENCE.percentageEcsa}%</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={formData.finance.percentageEcsa}
                    onChange={(e) => updateFinanceField('percentageEcsa', e.target.value)}
                    className="w-full p-2.5 bg-white border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-sm pr-8"
                    placeholder="0.0"
                  />
                  <Percent className="w-3.5 h-3.5 text-indigo-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Naziran Kewangan & Inspektorat */}
          <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 bg-zus-gold/10 rounded-xl flex items-center justify-center text-zus-gold">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zus-900">Naziran & Inspektorat Perbendaharaan</h3>
                <p className="text-xs text-gray-400 font-medium">Status Kepatuhan & Rating Bintang Bahagian</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-4 px-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">Bahagian</th>
                    <th className="py-4 px-2 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status Naziran</th>
                    <th className="py-4 px-2 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Rating Inspektorat</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.finance.financeDistricts.map((district: any, idx: number) => (
                    <tr key={district.name} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-2 font-bold text-zus-900 text-sm">{district.name}</td>
                      <td className="py-4 px-2 text-center">
                        <button
                          onClick={() => updateFinanceDistrictField(idx, 'naziran', !district.naziran)}
                          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase transition-all ${
                            district.naziran 
                              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                              : 'bg-gray-100 text-gray-400 border border-gray-200'
                          }`}
                        >
                          {district.naziran ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {district.naziran ? 'Selesai' : 'Belum'}
                        </button>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center justify-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => updateFinanceDistrictField(idx, 'starRating', star)}
                              className="transition-transform active:scale-90"
                            >
                              <Star 
                                className={`w-5 h-5 ${
                                  star <= district.starRating 
                                    ? 'fill-zus-gold text-zus-gold' 
                                    : 'text-gray-200'
                                }`} 
                              />
                            </button>
                          ))}
                          <span className="ml-2 text-xs font-black text-zus-900">{district.starRating}/5</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {isPentadbiran && (
        <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-zus-900">Unit Pentadbiran - Kepimpinan</h3>
              <p className="text-xs text-gray-400 font-medium">Mesyuarat & Perhimpunan (Data 2025)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* JPTO */}
            <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-2xl space-y-3">
              <div className="flex justify-between items-start">
                <label className="text-[10px] font-black text-blue-900 uppercase leading-tight">J.P.T.O</label>
                <span className="text-[9px] font-bold text-blue-400">Ref 24: {LEADERSHIP_2024_REFERENCE.jpto}</span>
              </div>
              <input
                type="number"
                value={formData.leadership.jpto}
                onChange={(e) => updateLeadershipField('jpto', e.target.value)}
                className="w-full p-2.5 bg-white border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm"
                placeholder="0"
              />
            </div>

            {/* MPJ */}
            <div className="p-5 bg-emerald-50/50 border border-emerald-100 rounded-2xl space-y-3">
              <div className="flex justify-between items-start">
                <label className="text-[10px] font-black text-emerald-900 uppercase leading-tight">M.P.J</label>
                <span className="text-[9px] font-bold text-emerald-400">Ref 24: {LEADERSHIP_2024_REFERENCE.mpj}</span>
              </div>
              <input
                type="number"
                value={formData.leadership.mpj}
                onChange={(e) => updateLeadershipField('mpj', e.target.value)}
                className="w-full p-2.5 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-sm"
                placeholder="0"
              />
            </div>

            {/* Pegawai Agama */}
            <div className="p-5 bg-purple-50/50 border border-purple-100 rounded-2xl space-y-3">
              <div className="flex justify-between items-start">
                <label className="text-[10px] font-black text-purple-900 uppercase leading-tight">Pegawai Agama Bahagian</label>
                <span className="text-[9px] font-bold text-purple-400">Ref 24: {LEADERSHIP_2024_REFERENCE.pegawaiAgama}</span>
              </div>
              <input
                type="number"
                value={formData.leadership.pegawaiAgama}
                onChange={(e) => updateLeadershipField('pegawaiAgama', e.target.value)}
                className="w-full p-2.5 bg-white border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none font-bold text-sm"
                placeholder="0"
              />
            </div>

            {/* Perhimpunan Bersama Pengurusan (Complex) */}
            <div className="md:col-span-3 p-6 bg-orange-50/30 border border-orange-100 rounded-3xl space-y-4">
              <div className="flex items-center justify-between border-b border-orange-100 pb-2">
                <h4 className="text-xs font-black text-orange-900 uppercase">Perhimpunan Bersama Pengurusan</h4>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold text-orange-400 uppercase">Ref 24: {LEADERSHIP_2024_REFERENCE.perhimpunan.total}</span>
                  <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-black text-xs">
                    JUMLAH: {formData.leadership.perhimpunan.total}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-orange-700 uppercase">Tawjihat</label>
                  <input
                    type="number"
                    value={formData.leadership.perhimpunan.tawjihat}
                    onChange={(e) => updateLeadershipField('perhimpunan', e.target.value, 'tawjihat')}
                    className="w-full p-2 bg-white border border-orange-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 font-bold text-sm"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-orange-700 uppercase">Perdana</label>
                  <input
                    type="number"
                    value={formData.leadership.perhimpunan.perdana}
                    onChange={(e) => updateLeadershipField('perhimpunan', e.target.value, 'perdana')}
                    className="w-full p-2 bg-white border border-orange-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 font-bold text-sm"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-orange-700 uppercase">Bulanan</label>
                  <input
                    type="number"
                    value={formData.leadership.perhimpunan.bulanan}
                    onChange={(e) => updateLeadershipField('perhimpunan', e.target.value, 'bulanan')}
                    className="w-full p-2 bg-white border border-orange-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 font-bold text-sm"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Aset */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <div className="flex justify-between items-start">
                <label className="text-[10px] font-black text-slate-900 uppercase leading-tight">Pengurusan Aset Alih</label>
                <span className="text-[9px] font-bold text-slate-400">Ref 24: {LEADERSHIP_2024_REFERENCE.aset}</span>
              </div>
              <input
                type="number"
                value={formData.leadership.aset}
                onChange={(e) => updateLeadershipField('aset', e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 outline-none font-bold text-sm"
                placeholder="0"
              />
            </div>

            {/* Keselamatan */}
            <div className="p-5 bg-red-50/50 border border-red-100 rounded-2xl space-y-3">
              <div className="flex justify-between items-start">
                <label className="text-[10px] font-black text-red-900 uppercase leading-tight">Keselamatan</label>
                <span className="text-[9px] font-bold text-red-400">Ref 24: {LEADERSHIP_2024_REFERENCE.keselamatan}</span>
              </div>
              <input
                type="number"
                value={formData.leadership.keselamatan}
                onChange={(e) => updateLeadershipField('keselamatan', e.target.value)}
                className="w-full p-2.5 bg-white border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none font-bold text-sm"
                placeholder="0"
              />
            </div>

            {/* Kader */}
            <div className="p-5 bg-teal-50/50 border border-teal-100 rounded-2xl space-y-3">
              <div className="flex justify-between items-start">
                <label className="text-[10px] font-black text-teal-900 uppercase leading-tight">Kader (HEI)</label>
                <span className="text-[9px] font-bold text-teal-400">Ref 24: {LEADERSHIP_2024_REFERENCE.kader}</span>
              </div>
              <input
                type="number"
                value={formData.leadership.kader}
                onChange={(e) => updateLeadershipField('kader', e.target.value)}
                className="w-full p-2.5 bg-white border border-teal-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none font-bold text-sm"
                placeholder="0"
              />
            </div>

            {/* Kewangan Perolehan */}
            <div className="p-5 bg-amber-50/50 border border-amber-100 rounded-2xl space-y-3">
              <div className="flex justify-between items-start">
                <label className="text-[10px] font-black text-amber-900 uppercase leading-tight">Kewangan & Perolehan</label>
                <span className="text-[9px] font-bold text-amber-400">Ref 24: {LEADERSHIP_2024_REFERENCE.kewanganPerolehan}</span>
              </div>
              <input
                type="number"
                value={formData.leadership.kewanganPerolehan}
                onChange={(e) => updateLeadershipField('kewanganPerolehan', e.target.value)}
                className="w-full p-2.5 bg-white border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none font-bold text-sm"
                placeholder="0"
              />
            </div>

            {/* Panel HR (Complex) */}
            <div className="md:col-span-2 p-6 bg-rose-50/30 border border-rose-100 rounded-3xl space-y-4">
              <div className="flex items-center justify-between border-b border-rose-100 pb-2">
                <h4 className="text-xs font-black text-rose-900 uppercase">Panel Pengurusan Sumber Manusia</h4>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold text-rose-400 uppercase">Ref 24: {LEADERSHIP_2024_REFERENCE.panelHR.total}</span>
                  <div className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full font-black text-xs">
                    JUMLAH: {formData.leadership.panelHR.total}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-rose-700 uppercase">Mesyuarat Biasa</label>
                  <input
                    type="number"
                    value={formData.leadership.panelHR.biasa}
                    onChange={(e) => updateLeadershipField('panelHR', e.target.value, 'biasa')}
                    className="w-full p-2 bg-white border border-rose-200 rounded-lg outline-none focus:ring-2 focus:ring-rose-500 font-bold text-sm"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-rose-700 uppercase">Mesyuarat Khas</label>
                  <input
                    type="number"
                    value={formData.leadership.panelHR.khas}
                    onChange={(e) => updateLeadershipField('panelHR', e.target.value, 'khas')}
                    className="w-full p-2 bg-white border border-rose-200 rounded-lg outline-none focus:ring-2 focus:ring-rose-500 font-bold text-sm"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
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

export default BppsForm;
