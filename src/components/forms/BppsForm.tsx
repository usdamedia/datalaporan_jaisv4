import React, { useEffect } from 'react';
import FormLayout from './FormLayout';
import { BasicInfoSection, NarrativeSection, LawatanSection } from './CommonSections';
import { useFormLogic } from './useFormLogic';
import TransportManagement from './TransportManagement';
import { LEADERSHIP_2024_REFERENCE, FINANCE_2024_REFERENCE } from '../../constants';
import { Users, ChevronRight, TrendingUp, DollarSign, Percent, Star, CheckCircle2, XCircle, Activity } from 'lucide-react';

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
    transport: {
      van: '',
      mpv: '',
      suv: '',
      bus: ''
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
    saveError,
    handleInputChange,
    handleSave,
    addLawatan,
    removeLawatan,
    updateLawatan
  } = useFormLogic(deptName, initialState);

  // Auto-sum for Perhimpunan
  useEffect(() => {
    if (isPentadbiran) {
      const perhimpunan = formData.leadership?.perhimpunan || { tawjihat: '', perdana: '', bulanan: '', total: 0 };
      const tawjihat = parseInt(perhimpunan.tawjihat) || 0;
      const perdana = parseInt(perhimpunan.perdana) || 0;
      const bulanan = parseInt(perhimpunan.bulanan) || 0;
      const total = tawjihat + perdana + bulanan;

      if (total !== perhimpunan.total) {
        setFormData((prev: any) => ({
          ...prev,
          leadership: {
            ...(prev.leadership || {}),
            perhimpunan: {
              ...(prev.leadership?.perhimpunan || {}),
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
      const panelHR = formData.leadership?.panelHR || { biasa: '', khas: '', total: 0 };
      const biasa = parseInt(panelHR.biasa) || 0;
      const khas = parseInt(panelHR.khas) || 0;
      const total = biasa + khas;

      if (total !== panelHR.total) {
        setFormData((prev: any) => ({
          ...prev,
          leadership: {
            ...(prev.leadership || {}),
            panelHR: {
              ...(prev.leadership?.panelHR || {}),
              total
            }
          }
        }));
      }
    }
  }, [formData.leadership?.panelHR?.biasa, formData.leadership?.panelHR?.khas, isPentadbiran]);

  // Auto-calculate percentageBelanja for Finance
  useEffect(() => {
    if (isFinance) {
      const yearData = formData.finance?.financeYears?.[0] || { lulus: '', belanja: '' };
      const lulus = parseFloat(yearData.lulus) || 0;
      const belanja = parseFloat(yearData.belanja) || 0;
      
      if (lulus > 0) {
        const percentage = ((belanja / lulus) * 100).toFixed(2);
        if (percentage !== formData.finance?.percentageBelanja) {
          setFormData((prev: any) => ({
            ...prev,
            finance: {
              ...prev.finance,
              percentageBelanja: percentage
            }
          }));
        }
      } else if (formData.finance?.percentageBelanja !== '') {
        setFormData((prev: any) => ({
          ...prev,
          finance: {
            ...prev.finance,
            percentageBelanja: ''
          }
        }));
      }
    }
  }, [formData.finance?.financeYears?.[0]?.lulus, formData.finance?.financeYears?.[0]?.belanja, isFinance]);

  const updateLeadershipField = (field: string, value: string, subField?: string) => {
    setFormData((prev: any) => {
      const currentLeadership = prev.leadership || {};
      if (subField) {
        return {
          ...prev,
          leadership: {
            ...currentLeadership,
            [field]: {
              ...(currentLeadership[field] || {}),
              [subField]: value
            }
          }
        };
      }
      return {
        ...prev,
        leadership: {
          ...currentLeadership,
          [field]: value
        }
      };
    });
  };

  const updateFinanceYearField = (index: number, field: string, value: string) => {
    setFormData((prev: any) => {
      const currentFinance = prev.finance || {};
      const newYears = [...(currentFinance.financeYears || [{ year: '2025', lulus: '', belanja: '', hasil: '' }])];
      newYears[index] = { ...newYears[index], [field]: value };
      return {
        ...prev,
        finance: {
          ...currentFinance,
          financeYears: newYears
        }
      };
    });
  };

  const updateFinanceDistrictField = (index: number, field: string, value: any) => {
    setFormData((prev: any) => {
      const currentFinance = prev.finance || {};
      const newDistricts = [...(currentFinance.financeDistricts || initialState.finance.financeDistricts)];
      newDistricts[index] = { ...newDistricts[index], [field]: value };
      return {
        ...prev,
        finance: {
          ...currentFinance,
          financeDistricts: newDistricts
        }
      };
    });
  };

  const updateFinanceField = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      finance: {
        ...(prev.finance || {}),
        [field]: value
      }
    }));
  };

  const updateTransportField = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      transport: {
        ...(prev.transport || {}),
        [field]: value
      }
    }));
  };

  const financeYear2025 = formData.finance?.financeYears?.[0] || { lulus: '', belanja: '', hasil: '' };
  const financeDistricts = formData.finance?.financeDistricts || [];
  const leadership = formData.leadership || {};
  const perhimpunan = leadership.perhimpunan || { tawjihat: '', perdana: '', bulanan: '', total: 0 };
  const panelHR = leadership.panelHR || { biasa: '', khas: '', total: 0 };
  const transport = formData.transport || { van: '', mpv: '', suv: '', bus: '' };

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

      {isFinance && (
        <div className="space-y-8">
          {/* Section 1: Bajet & Belanjawan */}
          <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zus-900">Bajet & Belanjawan</h3>
                <p className="text-xs text-gray-400 font-medium">Perbandingan Data 2021-2024 & Input 2025</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-4 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Tahun</th>
                    <th className="py-4 px-4 text-[10px] font-black text-purple-600 uppercase tracking-widest">Peruntukan Lulus (RM)</th>
                    <th className="py-4 px-4 text-[10px] font-black text-amber-600 uppercase tracking-widest">Perbelanjaan (RM)</th>
                    <th className="py-4 px-4 text-[10px] font-black text-blue-600 uppercase tracking-widest">Baki (RM)</th>
                  </tr>
                </thead>
                <tbody>
                  {FINANCE_2024_REFERENCE.financeYears.map((data, idx) => (
                    <tr key={data.year} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-4 font-bold text-zus-900 text-sm">{data.year} {data.year === '2023' && '*'}</td>
                      <td className="py-4 px-4 font-medium text-gray-600 text-sm">{data.lulus.toLocaleString()}</td>
                      <td className="py-4 px-4 font-medium text-gray-600 text-sm">{data.belanja.toLocaleString()}</td>
                      <td className="py-4 px-4 font-medium text-gray-600 text-sm">{(data.lulus - data.belanja).toLocaleString()}</td>
                    </tr>
                  ))}
                  {/* Input Row for 2025 */}
                  <tr className="bg-purple-50/30">
                    <td className="py-4 px-4 font-black text-purple-900 text-sm">2025</td>
                    <td className="py-4 px-4">
                      <input
                        type="number"
                        value={financeYear2025.lulus}
                        onChange={(e) => updateFinanceYearField(0, 'lulus', e.target.value)}
                        className="w-full p-2.5 bg-white border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none font-bold text-sm"
                        placeholder="0"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <input
                        type="number"
                        value={financeYear2025.belanja}
                        onChange={(e) => updateFinanceYearField(0, 'belanja', e.target.value)}
                        className="w-full p-2.5 bg-white border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none font-bold text-sm"
                        placeholder="0"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="w-full p-2.5 bg-white border border-blue-200 rounded-xl font-bold text-sm text-blue-700">
                        {( (parseFloat(financeYear2025.lulus) || 0) - (parseFloat(financeYear2025.belanja) || 0) ).toLocaleString()}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="text-[10px] text-gray-400 mt-2 italic">* Nota: Data 2023 berdasarkan Pelarasan Jabatan Perbendaharaan.</p>
            </div>
          </section>

          {/* Section 2: Analisis Hasil */}
          <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zus-900">Analisis Hasil</h3>
                <p className="text-xs text-gray-400 font-medium">Kutipan Hasil Jabatan</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Data Sejarah (2021-2024)</h4>
                <div className="space-y-3">
                  {FINANCE_2024_REFERENCE.financeYears.map((data) => (
                    <div key={data.year} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <span className="font-bold text-gray-600 text-sm">Tahun {data.year}</span>
                      <span className="font-black text-emerald-600 text-sm">RM {data.hasil.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-4">Input Hasil 2025</h4>
                <div className="p-6 bg-emerald-50/50 border border-emerald-100 rounded-2xl space-y-4">
                  <label className="text-sm font-black text-emerald-900 block whitespace-normal leading-tight">
                    Kutipan Hasil Keseluruhan (RM)
                  </label>
                  <input
                    type="number"
                    value={financeYear2025.hasil}
                    onChange={(e) => updateFinanceYearField(0, 'hasil', e.target.value)}
                    className="w-full p-3 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-lg"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Naziran Kewangan & Inspektorat */}
          <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 bg-zus-gold/10 rounded-xl flex items-center justify-center text-zus-gold">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zus-900">Jadual Naziran & Kepatuhan</h3>
                <p className="text-xs text-gray-400 font-medium">Status Kepatuhan & Rating Bintang Bahagian</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-4 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Nama Bahagian</th>
                    <th className="py-4 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status Naziran</th>
                    <th className="py-4 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Rating Inspektorat</th>
                  </tr>
                </thead>
                <tbody>
                  {financeDistricts.map((district: any, idx: number) => (
                    <tr key={district.name} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-4 font-bold text-zus-900 text-sm whitespace-normal leading-tight">
                        Pencapaian Inspektorat Perbendaharaan Sarawak Bahagian {district.name}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => updateFinanceDistrictField(idx, 'naziran', !district.naziran)}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase transition-all ${
                            district.naziran 
                              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                              : 'bg-gray-100 text-gray-400 border border-gray-200'
                          }`}
                        >
                          {district.naziran ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                          {district.naziran ? 'Selesai' : 'Belum'}
                        </button>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => updateFinanceDistrictField(idx, 'starRating', star)}
                              className="transition-transform active:scale-90 p-1"
                            >
                              <Star 
                                className={`w-6 h-6 ${
                                  star <= district.starRating 
                                    ? 'fill-zus-gold text-zus-gold' 
                                    : 'text-gray-200'
                                }`} 
                              />
                            </button>
                          ))}
                          <span className="ml-3 text-sm font-black text-zus-900 min-w-[2rem] text-center">{district.starRating}/5</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-[10px] text-gray-400 mt-2 italic">* Nota: Sarikei mempunyai tanda 'X' pada Naziran tetapi 5 bintang pada Inspektorat (Rujukan 2024).</p>
            </div>
          </section>

          {/* Section 4: Key Performance Indicator (KPI) */}
          <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zus-900">Key Performance Indicator (KPI)</h3>
                <p className="text-xs text-gray-400 font-medium">Prestasi & Kepatuhan 2025</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Prestasi Perbelanjaan */}
              <div className="p-6 bg-rose-50/50 border border-rose-100 rounded-2xl space-y-4">
                <div className="flex justify-between items-start">
                  <label className="text-sm font-black text-rose-900 uppercase leading-tight whitespace-normal">
                    Peratusan Perbelanjaan 2025
                  </label>
                  <span className="text-xs font-bold text-rose-400">Ref 24: {FINANCE_2024_REFERENCE.percentageBelanja}%</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={formData.finance?.percentageBelanja || ''}
                    onChange={(e) => updateFinanceField('percentageBelanja', e.target.value)}
                    className="w-full p-4 bg-white border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none font-black text-2xl pr-12 text-rose-700"
                    placeholder="0.00"
                  />
                  <Percent className="w-6 h-6 text-rose-400 absolute right-4 top-1/2 -translate-y-1/2" />
                </div>
                <p className="text-xs text-rose-600/70 font-medium italic">Dikira secara automatik: (Belanja / Lulus) * 100</p>
              </div>

              {/* eCSA */}
              <div className="p-6 bg-indigo-50/50 border border-indigo-100 rounded-2xl space-y-4">
                <div className="flex justify-between items-start">
                  <label className="text-sm font-black text-indigo-900 uppercase leading-tight whitespace-normal">
                    Pencapaian eCSA (Electronic Compliance Self Assessment) 2025
                  </label>
                  <span className="text-xs font-bold text-indigo-400">Ref 24: {FINANCE_2024_REFERENCE.percentageEcsa}%</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={formData.finance?.percentageEcsa || ''}
                    onChange={(e) => updateFinanceField('percentageEcsa', e.target.value)}
                    className="w-full p-4 bg-white border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-black text-2xl pr-12 text-indigo-700"
                    placeholder="0.0"
                  />
                  <Percent className="w-6 h-6 text-indigo-400 absolute right-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {isPentadbiran && (
        <div className="space-y-8">
          <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
            <TransportManagement 
              data2025={transport} 
              onChange={updateTransportField} 
              onSave={handleSave}
            />
          </section>

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
                value={leadership.jpto}
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
                value={leadership.mpj}
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
                value={leadership.pegawaiAgama}
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
                    JUMLAH: {perhimpunan.total}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-orange-700 uppercase">Tawjihat</label>
                  <input
                    type="number"
                    value={perhimpunan.tawjihat}
                    onChange={(e) => updateLeadershipField('perhimpunan', e.target.value, 'tawjihat')}
                    className="w-full p-2 bg-white border border-orange-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 font-bold text-sm"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-orange-700 uppercase">Perdana</label>
                  <input
                    type="number"
                    value={perhimpunan.perdana}
                    onChange={(e) => updateLeadershipField('perhimpunan', e.target.value, 'perdana')}
                    className="w-full p-2 bg-white border border-orange-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 font-bold text-sm"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-orange-700 uppercase">Bulanan</label>
                  <input
                    type="number"
                    value={perhimpunan.bulanan}
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
                value={leadership.aset}
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
                value={leadership.keselamatan}
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
                value={leadership.kader}
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
                value={leadership.kewanganPerolehan}
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
                    JUMLAH: {panelHR.total}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-rose-700 uppercase">Mesyuarat Biasa</label>
                  <input
                    type="number"
                    value={panelHR.biasa}
                    onChange={(e) => updateLeadershipField('panelHR', e.target.value, 'biasa')}
                    className="w-full p-2 bg-white border border-rose-200 rounded-lg outline-none focus:ring-2 focus:ring-rose-500 font-bold text-sm"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-rose-700 uppercase">Mesyuarat Khas</label>
                  <input
                    type="number"
                    value={panelHR.khas}
                    onChange={(e) => updateLeadershipField('panelHR', e.target.value, 'khas')}
                    className="w-full p-2 bg-white border border-rose-200 rounded-lg outline-none focus:ring-2 focus:ring-rose-500 font-bold text-sm"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
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
