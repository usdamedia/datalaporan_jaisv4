import React from 'react';
import { Search, BookOpen, Award, Activity, Image, Plus, Trash2, FileSearch, Database } from 'lucide-react';
import { BPNP_2024_REFERENCE } from '../../constants';
import FormLayout from './FormLayout';
import { BasicInfoSection, NarrativeSection, LawatanSection } from './CommonSections';
import { useFormLogic } from './useFormLogic';

interface BpnpFormProps {
  deptName: string;
  onBack: () => void;
}

const BpnpForm: React.FC<BpnpFormProps> = ({ deptName, onBack }) => {
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
      }
    }
  };

  const {
    formData,
    isSaving,
    showSuccess,
    handleInputChange,
    handleSave,
    addLawatan,
    removeLawatan,
    updateLawatan,
    setFormData
  } = useFormLogic(deptName, initialState);

  const handleBpnpStatChange = (field: string, value: number) => {
    setFormData((prev: any) => ({
      ...prev,
      bpnp: {
        ...prev.bpnp,
        statistik: { ...prev.bpnp.statistik, [field]: value }
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
      deptName={deptName}
      onBack={onBack}
      onSave={handleSave}
      isSaving={isSaving}
      showSuccess={showSuccess}
      formData={formData}
    >
      <BasicInfoSection formData={formData} handleInputChange={handleInputChange} />

      {/* Kajian & Kaji Selidik */}
      <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-zus-900">Kajian & Kaji Selidik 2025</h3>
          </div>
          <button 
            onClick={addKajian}
            className="flex items-center gap-1.5 text-zus-gold hover:text-zus-900 font-bold text-xs uppercase tracking-wider transition-colors"
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
            <div key={index} className="flex gap-2 group animate-slide-in-right">
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
                  className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Penulisan Ilmiah */}
      <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
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

      {/* Statistik & Penerbitan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-zus-900">Statistik Operasi</h3>
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
            <h3 className="text-lg font-bold text-zus-900">Penerbitan Digital</h3>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">Jumlah Infografik Akidah</label>
                <div className="text-[10px] font-bold text-gray-400">2024: {BPNP_2024_REFERENCE.statistik.infografik}</div>
              </div>
              <input 
                type="number"
                value={formData.bpnp.statistik.infografik}
                onChange={(e) => handleBpnpStatChange('infografik', parseInt(e.target.value) || 0)}
                className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none transition-all"
              />
            </div>
            <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
              <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Kandungan Utama:</h4>
              <p className="text-xs text-indigo-600 font-medium">Ulangkaji Sifat 20, Koleksi Bahan Infografik Islamik (untuk paparan TV Masjid & Surau).</p>
            </div>
          </div>
        </section>
      </div>

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

const Star = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);

export default BpnpForm;
