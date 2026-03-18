import React from 'react';
import { Search, BookOpen, Award, Activity, Image, Plus, Trash2, LayoutDashboard, Printer } from 'lucide-react';
import { BPNP_2024_REFERENCE } from '../../constants';
import FormLayout from './FormLayout';
import { BasicInfoSection, NarrativeSection, LawatanSection } from './CommonSections';
import { useFormLogic } from './useFormLogic';
import DataManagementDashboard from '../DataManagementDashboard';
import { usePrintView } from '../../hooks/usePrintView';

interface BpnpFormProps {
  deptName: string;
  onBack: () => void;
}

const BpnpForm: React.FC<BpnpFormProps> = ({ deptName, onBack }) => {
  const [showDataManagement, setShowDataManagement] = React.useState(false);
  const { contentRef: strategicPrintRef, handlePrint: handleStrategicPrint } = usePrintView<HTMLDivElement>({
    documentTitle: 'BPNP_Unit_Perancangan_Strategik_2025',
  });
  const normalizedDeptName = deptName.toUpperCase();
  const selectedUnit = normalizedDeptName.includes('PERANCANGAN STRATEGIK')
    ? 'UNIT PERANCANGAN STRATEGIK'
    : normalizedDeptName.includes('AKIDAH TAPISAN')
      ? 'UNIT AKIDAH TAPISAN'
      : 'UNIT PENYELIDIKAN';
  const isUnitPenyelidikan = selectedUnit === 'UNIT PENYELIDIKAN';
  const isUnitStrategik = selectedUnit === 'UNIT PERANCANGAN STRATEGIK';
  const isUnitAkidah = selectedUnit === 'UNIT AKIDAH TAPISAN';

  const initialState = {
    tarikh: new Date().toISOString().split('T')[0],
    disediakanOleh: '',
    jawatan: '',
    ringkasan: '',
    isu: '',
    cadangan: '',
    lawatan: [],
    bpnp: {
      kajianList: [''],
      penulisan: {
        diploma: {
          johan: { nama: '', tajuk: '' },
          naibJohan: { nama: '', tajuk: '' },
          ketiga: { nama: '', tajuk: '' },
          pesertaLain: 0
        },
        sarjanaMuda: {
          johan: { nama: '', tajuk: '' },
          naibJohan: { nama: '', tajuk: '' },
          ketiga: { nama: '', tajuk: '' },
          pesertaLain: 0
        }
      },
      statistik: {
        penapisan: 0,
        kluster: 0,
        program: 0,
        infografik: 0
      },
      penerbitanDigital: {
        kandunganUtama: ''
      },
      dataManagement: {
        dtawgMeetings: 0,
        integratedDashboards: 0,
        dataClusters: 0,
        subDataDashboards: 0,
        subDataList: ['']
      }
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
  } = useFormLogic(selectedUnit || deptName, initialState);

  const handleBpnpStatChange = (field: string, value: number) => {
    setFormData((prev: any) => ({
      ...prev,
      bpnp: {
        ...prev.bpnp,
        statistik: { ...prev.bpnp.statistik, [field]: value }
      }
    }));
  };

  const handleBpnpNestedTextChange = (section: string, field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      bpnp: {
        ...prev.bpnp,
        [section]: {
          ...prev.bpnp[section],
          [field]: value
        }
      }
    }));
  };

  const handlePenulisanChange = (category: string, rank: string, field: string, value: string | number) => {
    setFormData((prev: any) => ({
      ...prev,
      bpnp: {
        ...prev.bpnp,
        penulisan: {
          ...prev.bpnp.penulisan,
          [category]: {
            ...prev.bpnp.penulisan[category],
            [rank]: typeof prev.bpnp.penulisan[category][rank] === 'object' 
              ? { ...prev.bpnp.penulisan[category][rank], [field]: value }
              : value
          }
        }
      }
    }));
  };

  const addKajian = () => {
    setFormData((prev: any) => ({
      ...prev,
      bpnp: {
        ...prev.bpnp,
        kajianList: [...prev.bpnp.kajianList, '']
      }
    }));
  };

  const removeKajian = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      bpnp: {
        ...prev.bpnp,
        kajianList: prev.bpnp.kajianList.filter((_: any, i: number) => i !== index)
      }
    }));
  };

  const updateKajian = (index: number, value: string) => {
    setFormData((prev: any) => {
      const newList = [...prev.bpnp.kajianList];
      newList[index] = value;
      return {
        ...prev,
        bpnp: { ...prev.bpnp, kajianList: newList }
      };
    });
  };

  return (
    <FormLayout
      deptName={showDataManagement ? 'Data Management' : selectedUnit}
      onBack={() => {
        if (showDataManagement) {
          setShowDataManagement(false);
        } else {
          onBack();
        }
      }}
      onSave={handleSave}
      isSaving={isSaving}
      showSuccess={showSuccess}
      saveError={saveError}
      formData={formData}
      hideExportButton={isUnitStrategik && !showDataManagement}
    >
      {isUnitPenyelidikan || isUnitStrategik || isUnitAkidah ? (
        showDataManagement ? (
          <DataManagementDashboard 
            data={formData.bpnp.dataManagement} 
            onChange={(newData) => setFormData((prev: any) => ({
              ...prev,
              bpnp: {
                ...prev.bpnp,
                dataManagement: newData
              }
            }))}
          />
        ) : (
          <>
            {isUnitStrategik && (
              <div className="mb-8 flex flex-wrap justify-end gap-3 print-hidden" data-print-hidden="true">
                <button
                  onClick={handleStrategicPrint}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-[#134E4A] border border-teal-200 rounded-2xl font-bold hover:bg-teal-50 transition-all shadow-sm active:scale-95"
                >
                  <Printer className="w-5 h-5" />
                  Cetak View Semasa
                </button>
                <button
                  onClick={() => setShowDataManagement(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-[#134E4A] text-white rounded-2xl font-bold hover:bg-teal-900 transition-all shadow-lg active:scale-95"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Buka Data Management Dashboard
                </button>
              </div>
            )}
            <div
              ref={isUnitStrategik ? strategicPrintRef : undefined}
              className={isUnitStrategik ? 'print-view-root print-page' : undefined}
            >
            <BasicInfoSection formData={formData} handleInputChange={handleInputChange} />

            {isUnitPenyelidikan && (
              <>
                <section className="bg-white border border-blue-100 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6 border-b border-blue-50 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                        <Search className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-zus-900">Senarai Kajian dan Kaji Selidik Dihasilkan (2025)</h3>
                        <p className="text-xs text-slate-500 font-medium">Paparan ini diselaraskan berdasarkan dokumen rujukan Unit Penyelidikan.</p>
                      </div>
                    </div>
                    <button 
                      onClick={addKajian}
                      className="flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-wider text-blue-700 transition-colors hover:bg-blue-100"
                    >
                      <Plus className="w-4 h-4" /> Tambah Baris Kajian
                    </button>
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
                    <h4 className="mb-3 text-[10px] font-black uppercase tracking-widest text-blue-600">Rujukan Data 2024 (Jumlah: {BPNP_2024_REFERENCE.kajian.length})</h4>
                    <ul className="space-y-2">
                      {BPNP_2024_REFERENCE.kajian.map((kajian, index) => (
                        <li key={index} className="flex gap-3 rounded-xl bg-white px-4 py-3 text-sm text-slate-700 ring-1 ring-blue-100">
                          <span className="font-black text-blue-500">{index + 1}.</span>
                          <span className="font-medium">{kajian}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 space-y-4">
                    <h4 className="text-sm font-black text-zus-900">Senarai Kajian / Kaji Selidik 2025</h4>
                    {formData.bpnp.kajianList.map((kajian: string, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 text-sm font-black text-slate-400">{index + 1}.</div>
                        <input 
                          type="text"
                          value={kajian}
                          onChange={(e) => updateKajian(index, e.target.value)}
                          placeholder="Sila masukkan nama kajian / kaji selidik di sini"
                          className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition-all focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                        />
                        {formData.bpnp.kajianList.length > 1 && (
                          <button 
                            onClick={() => removeKajian(index)}
                            className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            title="Padam baris kajian"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {isUnitStrategik && (
              <>
          <section className="bg-amber-50 border border-amber-200 rounded-2xl p-5 md:p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-amber-900">Maklumat diperlukan sedang dikemaskini</h3>
                <p className="mt-1 text-sm font-medium text-amber-800">
                  Bahagian ini sedang diselaraskan. Sila rujuk kemaskini seterusnya untuk pengisian maklumat lengkap bagi Unit Perancangan Strategik.
                </p>
              </div>
            </div>
          </section>

          {/* Kajian & Kaji Selidik */}
          <section className="print-section-card print-avoid-break bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
              <div className="print-heading flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-zus-900">Kajian & Kaji Selidik 2025</h3>
              </div>
              <button 
                onClick={addKajian}
                className="print-hidden flex items-center gap-1.5 text-zus-gold hover:text-zus-900 font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <Plus className="w-4 h-4" /> Tambah Kajian
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Rujukan 2024:</h4>
                <ul className="space-y-1">
                  {BPNP_2024_REFERENCE.kajian.map((k, i) => (
                    <li key={i} className="text-xs text-slate-500 flex gap-2">
                      <span className="font-bold text-slate-400">{i+1}.</span> {k}
                    </li>
                  ))}
                </ul>
              </div>

              {formData.bpnp.kajianList.map((kajian: string, index: number) => (
                <div key={index} className="print-avoid-break flex gap-2 group animate-slide-in-right">
                  <div className="flex-1 relative">
                    <input 
                      type="text"
                      value={kajian}
                      onChange={(e) => updateKajian(index, e.target.value)}
                      placeholder={`Tajuk Kajian/Kaji Selidik ${index + 1}`}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 outline-none transition-all text-sm font-medium"
                    />
                  </div>
                  {formData.bpnp.kajianList.length > 1 && (
                    <button 
                      onClick={() => removeKajian(index)}
                      className="print-hidden p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Penulisan Ilmiah */}
          <section className="print-section-card print-avoid-break bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="print-heading flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zus-900">Penulisan Ilmiah 2025</h3>
            </div>

            <div className="space-y-12">
              {/* Category: Diploma */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-blue-600 uppercase tracking-widest border-l-4 border-blue-600 pl-3">Kategori: Diploma</h4>
                  <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                    <span className="text-[10px] font-black text-blue-700 uppercase">Bilangan Peserta Lain:</span>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handlePenulisanChange('diploma', 'pesertaLain', '', Math.max(0, formData.bpnp.penulisan.diploma.pesertaLain - 1))}
                        className="w-6 h-6 flex items-center justify-center bg-white border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="text-sm font-black text-blue-900 w-6 text-center">{formData.bpnp.penulisan.diploma.pesertaLain}</span>
                      <button 
                        onClick={() => handlePenulisanChange('diploma', 'pesertaLain', '', formData.bpnp.penulisan.diploma.pesertaLain + 1)}
                        className="w-6 h-6 flex items-center justify-center bg-white border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Johan */}
                  <div className="space-y-4 p-5 bg-yellow-50/30 border border-yellow-100 rounded-2xl">
                    <div className="flex items-center gap-2 text-yellow-700 font-black text-xs uppercase tracking-widest">
                      <Star className="w-4 h-4 fill-yellow-400" /> Johan
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Nama</label>
                        <input 
                          type="text"
                          value={formData.bpnp.penulisan.diploma.johan.nama}
                          onChange={(e) => handlePenulisanChange('diploma', 'johan', 'nama', e.target.value)}
                          placeholder="Nama Pemenang"
                          className="w-full p-2.5 bg-white border border-yellow-100 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-yellow-200"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Tajuk</label>
                        <input 
                          type="text"
                          value={formData.bpnp.penulisan.diploma.johan.tajuk}
                          onChange={(e) => handlePenulisanChange('diploma', 'johan', 'tajuk', e.target.value)}
                          placeholder="Tajuk Penulisan"
                          className="w-full p-2.5 bg-white border border-yellow-100 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-yellow-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Naib Johan */}
                  <div className="space-y-4 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div className="flex items-center gap-2 text-slate-600 font-black text-xs uppercase tracking-widest">
                      <Award className="w-4 h-4 text-slate-400" /> Naib Johan
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Nama</label>
                        <input 
                          type="text"
                          value={formData.bpnp.penulisan.diploma.naibJohan.nama}
                          onChange={(e) => handlePenulisanChange('diploma', 'naibJohan', 'nama', e.target.value)}
                          placeholder="Nama Pemenang"
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-slate-200"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Tajuk</label>
                        <input 
                          type="text"
                          value={formData.bpnp.penulisan.diploma.naibJohan.tajuk}
                          onChange={(e) => handlePenulisanChange('diploma', 'naibJohan', 'tajuk', e.target.value)}
                          placeholder="Tajuk Penulisan"
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-slate-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Ketiga */}
                  <div className="space-y-4 p-5 bg-orange-50/30 border border-orange-100 rounded-2xl">
                    <div className="flex items-center gap-2 text-orange-700 font-black text-xs uppercase tracking-widest">
                      <Award className="w-4 h-4 text-orange-400" /> Tempat Ketiga
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Nama</label>
                        <input 
                          type="text"
                          value={formData.bpnp.penulisan.diploma.ketiga.nama}
                          onChange={(e) => handlePenulisanChange('diploma', 'ketiga', 'nama', e.target.value)}
                          placeholder="Nama Pemenang"
                          className="w-full p-2.5 bg-white border border-orange-100 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-orange-200"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Tajuk</label>
                        <input 
                          type="text"
                          value={formData.bpnp.penulisan.diploma.ketiga.tajuk}
                          onChange={(e) => handlePenulisanChange('diploma', 'ketiga', 'tajuk', e.target.value)}
                          placeholder="Tajuk Penulisan"
                          className="w-full p-2.5 bg-white border border-orange-100 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-orange-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category: Sarjana Muda dan Keatas */}
              <div className="space-y-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-indigo-600 uppercase tracking-widest border-l-4 border-indigo-600 pl-3">Kategori: Sarjana Muda dan Keatas</h4>
                  <div className="flex items-center gap-3 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100">
                    <span className="text-[10px] font-black text-indigo-700 uppercase">Bilangan Peserta Lain:</span>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handlePenulisanChange('sarjanaMuda', 'pesertaLain', '', Math.max(0, formData.bpnp.penulisan.sarjanaMuda.pesertaLain - 1))}
                        className="w-6 h-6 flex items-center justify-center bg-white border border-indigo-200 rounded-lg text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="text-sm font-black text-indigo-900 w-6 text-center">{formData.bpnp.penulisan.sarjanaMuda.pesertaLain}</span>
                      <button 
                        onClick={() => handlePenulisanChange('sarjanaMuda', 'pesertaLain', '', formData.bpnp.penulisan.sarjanaMuda.pesertaLain + 1)}
                        className="w-6 h-6 flex items-center justify-center bg-white border border-indigo-200 rounded-lg text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Johan */}
                  <div className="space-y-4 p-5 bg-yellow-50/30 border border-yellow-100 rounded-2xl">
                    <div className="flex items-center gap-2 text-yellow-700 font-black text-xs uppercase tracking-widest">
                      <Star className="w-4 h-4 fill-yellow-400" /> Johan
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Nama</label>
                        <input 
                          type="text"
                          value={formData.bpnp.penulisan.sarjanaMuda.johan.nama}
                          onChange={(e) => handlePenulisanChange('sarjanaMuda', 'johan', 'nama', e.target.value)}
                          placeholder="Nama Pemenang"
                          className="w-full p-2.5 bg-white border border-yellow-100 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-yellow-200"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Tajuk</label>
                        <input 
                          type="text"
                          value={formData.bpnp.penulisan.sarjanaMuda.johan.tajuk}
                          onChange={(e) => handlePenulisanChange('sarjanaMuda', 'johan', 'tajuk', e.target.value)}
                          placeholder="Tajuk Penulisan"
                          className="w-full p-2.5 bg-white border border-yellow-100 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-yellow-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Naib Johan */}
                  <div className="space-y-4 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div className="flex items-center gap-2 text-slate-600 font-black text-xs uppercase tracking-widest">
                      <Award className="w-4 h-4 text-slate-400" /> Naib Johan
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Nama</label>
                        <input 
                          type="text"
                          value={formData.bpnp.penulisan.sarjanaMuda.naibJohan.nama}
                          onChange={(e) => handlePenulisanChange('sarjanaMuda', 'naibJohan', 'nama', e.target.value)}
                          placeholder="Nama Pemenang"
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-slate-200"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Tajuk</label>
                        <input 
                          type="text"
                          value={formData.bpnp.penulisan.sarjanaMuda.naibJohan.tajuk}
                          onChange={(e) => handlePenulisanChange('sarjanaMuda', 'naibJohan', 'tajuk', e.target.value)}
                          placeholder="Tajuk Penulisan"
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-slate-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Ketiga */}
                  <div className="space-y-4 p-5 bg-orange-50/30 border border-orange-100 rounded-2xl">
                    <div className="flex items-center gap-2 text-orange-700 font-black text-xs uppercase tracking-widest">
                      <Award className="w-4 h-4 text-orange-400" /> Tempat Ketiga
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Nama</label>
                        <input 
                          type="text"
                          value={formData.bpnp.penulisan.sarjanaMuda.ketiga.nama}
                          onChange={(e) => handlePenulisanChange('sarjanaMuda', 'ketiga', 'nama', e.target.value)}
                          placeholder="Nama Pemenang"
                          className="w-full p-2.5 bg-white border border-orange-100 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-orange-200"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Tajuk</label>
                        <input 
                          type="text"
                          value={formData.bpnp.penulisan.sarjanaMuda.ketiga.tajuk}
                          onChange={(e) => handlePenulisanChange('sarjanaMuda', 'ketiga', 'tajuk', e.target.value)}
                          placeholder="Tajuk Penulisan"
                          className="w-full p-2.5 bg-white border border-orange-100 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-orange-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
              </>
            )}

            {isUnitAkidah && (
              <>
          {/* Statistik & Penerbitan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-zus-900">Statistik Aktiviti & Operasi (2025)</h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Penapisan Bahan Berunsur Islam', field: 'penapisan', ref: BPNP_2024_REFERENCE.statistik.penapisan },
                  { label: 'Kluster Data Bersepadu', field: 'kluster', ref: BPNP_2024_REFERENCE.statistik.kluster },
                  { label: 'Program / Aktiviti', field: 'program', ref: BPNP_2024_REFERENCE.statistik.program },
                ].map((item) => (
                  <div key={item.field} className="grid grid-cols-2 items-center gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500">{item.label}</label>
                      <div className="text-[10px] font-bold text-gray-400">2024: {item.ref}</div>
                    </div>
                    <input 
                      type="number"
                      value={formData.bpnp.statistik[item.field]}
                      onChange={(e) => handleBpnpStatChange(item.field, parseInt(e.target.value) || 0)}
                      className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none transition-all"
                    />
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                  <Image className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-zus-900">Penerbitan Digital (2025)</h3>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-4">
                  <div className="space-y-4 rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500">Infografik Akidah</label>
                      <div className="text-[10px] font-bold text-indigo-400">2024: {BPNP_2024_REFERENCE.statistik.infografik}</div>
                    </div>
                    <input 
                      type="number"
                      value={formData.bpnp.statistik.infografik}
                      onChange={(e) => handleBpnpStatChange('infografik', parseInt(e.target.value) || 0)}
                      className="w-full p-3 bg-white border border-indigo-100 rounded-xl text-sm font-bold text-center focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    />
                  </div>
                  <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4">
                    <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">Kandungan Utama / Tajuk Koleksi</h4>
                    <p className="mb-3 text-[10px] font-medium italic text-slate-500">
                      Rujukan 2024: Ulangkaji Sifat 20, Koleksi Bahan Infografik Islamik (untuk paparan TV Masjid & Surau).
                    </p>
                    <textarea
                      rows={5}
                      value={formData.bpnp.penerbitanDigital?.kandunganUtama || ''}
                      onChange={(e) => handleBpnpNestedTextChange('penerbitanDigital', 'kandunganUtama', e.target.value)}
                      placeholder="Masukkan kandungan utama atau tajuk koleksi untuk tahun 2025"
                      className="w-full resize-y rounded-xl border border-indigo-100 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition-all focus:ring-2 focus:ring-indigo-200"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
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
          </div>
        </>)
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
            <BookOpen className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-black text-zus-900 mb-2 uppercase tracking-tight">{selectedUnit}</h3>
          <p className="text-slate-500 font-medium max-w-md mx-auto">
            Borang untuk unit ini sedang dalam pembangunan atau tiada data khusus yang diperlukan buat masa ini.
          </p>
        </div>
      )}
    </FormLayout>
  );
};

export default BpnpForm;
