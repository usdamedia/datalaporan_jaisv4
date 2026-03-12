import React, { useMemo } from 'react';
import FormLayout from './FormLayout';
import { BasicInfoSection, NarrativeSection, LawatanSection } from './CommonSections';
import { useFormLogic } from './useFormLogic';
import { BPH_2024_REFERENCE } from '../../constants';
import { 
  ShieldCheck, 
  FileText, 
  Activity, 
  MapPin, 
  Plus, 
  Trash2, 
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  BarChart3
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface BphFormProps {
  deptName: string;
  onBack: () => void;
}

const BphForm: React.FC<BphFormProps> = ({ deptName, onBack }) => {
  const initialState = {
    tarikh: new Date().toISOString().split('T')[0],
    disediakanOleh: '',
    jawatan: '',
    ringkasan: '',
    isu: '',
    cadangan: '',
    lawatan: [],
    bph: {
      sphm: {
        permohonan: '',
        skim: {
          rumahSembelihan: '',
          produk: '',
          premis: '',
          oem: '',
          logistik: '',
          barangGunaan: ''
        }
      },
      pemantauan: {
        patuh: '',
        amaran: '',
        gantung: '',
        tarikBalik: '',
        lain: ''
      },
      penguatkuasaan: '',
      aduan: '',
      ziarahHalal: '',
      zonHalal: BPH_2024_REFERENCE.zonHalal,
      aktiviti: {
        taklimat: '',
        kursus: '',
        total: ''
      }
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

  // Auto-sum SPHM Aktif
  const sphmTotalAktif = useMemo(() => {
    const skim = formData.bph?.sphm?.skim || {};
    return Object.values(skim).reduce((acc: number, val: any) => acc + (parseInt(val) || 0), 0);
  }, [formData.bph?.sphm?.skim]);

  // Auto-sum Pemantauan
  const pemantauanTotal = useMemo(() => {
    const p = formData.bph?.pemantauan || {};
    return Object.values(p).reduce((acc: number, val: any) => acc + (parseInt(val) || 0), 0);
  }, [formData.bph?.pemantauan]);

  const updateBph = (path: string[], value: any) => {
    setFormData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      if (!newData.bph) newData.bph = initialState.bph;
      
      let current = newData.bph;
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {};
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newData;
    });
  };

  const addZonHalal = () => {
    setFormData((prev: any) => ({
      ...prev,
      bph: {
        ...prev.bph,
        zonHalal: [...(prev.bph?.zonHalal || []), '']
      }
    }));
  };

  const removeZonHalal = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      bph: {
        ...prev.bph,
        zonHalal: prev.bph.zonHalal.filter((_: any, i: number) => i !== index)
      }
    }));
  };

  const updateZonHalal = (index: number, value: string) => {
    setFormData((prev: any) => {
      const newZon = [...prev.bph.zonHalal];
      newZon[index] = value;
      return {
        ...prev,
        bph: {
          ...prev.bph,
          zonHalal: newZon
        }
      };
    });
  };

  const chartData = [
    { name: '2024', permohonan: BPH_2024_REFERENCE.sphm.permohonan, aktif: BPH_2024_REFERENCE.sphm.aktif },
    { name: '2025', permohonan: parseInt(formData.bph?.sphm?.permohonan) || 0, aktif: sphmTotalAktif }
  ];

  if (!formData.bph) return null;

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

      <div className="space-y-8 animate-fade-in mt-8">
        {/* 1. SPHM Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#5A5A40] p-4 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-zus-gold" />
            <h3 className="text-white font-bold">1. Statistik Sijil Pengesahan Halal Malaysia (SPHM) 2025</h3>
          </div>
          <div className="p-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="p-4 bg-olive-50 border border-olive-100 rounded-2xl space-y-2">
                  <label className="text-[10px] font-black text-olive-900 uppercase">Permohonan Sijil (SPHM) 2025</label>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-olive-400">Ref 24: {BPH_2024_REFERENCE.sphm.permohonan}</span>
                    <input 
                      type="number" 
                      value={formData.bph.sphm.permohonan} 
                      onChange={(e) => updateBph(['sphm', 'permohonan'], e.target.value)} 
                      className="w-32 p-2 bg-white border border-olive-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-olive-500 outline-none" 
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">Pecahan Skim SPHM Aktif</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { label: 'Rumah Sembelihan', field: 'rumahSembelihan', ref: BPH_2024_REFERENCE.sphm.skim.rumahSembelihan },
                      { label: 'Produk Makanan / Minuman', field: 'produk', ref: BPH_2024_REFERENCE.sphm.skim.produk },
                      { label: 'Premis Makanan', field: 'premis', ref: BPH_2024_REFERENCE.sphm.skim.premis },
                      { label: 'Skim Pengilangan Kontrak (OEM)', field: 'oem', ref: BPH_2024_REFERENCE.sphm.skim.oem },
                      { label: 'Logistik', field: 'logistik', ref: BPH_2024_REFERENCE.sphm.skim.logistik },
                      { label: 'Barang Gunaan', field: 'barangGunaan', ref: BPH_2024_REFERENCE.sphm.skim.barangGunaan },
                    ].map(item => (
                      <div key={item.field} className="grid grid-cols-3 items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <label className="text-[10px] font-bold text-gray-500 leading-tight">{item.label}</label>
                        <div className="text-center text-[9px] font-bold text-gray-400 bg-gray-50 py-0.5 rounded">Ref 24: {item.ref}</div>
                        <input 
                          type="number" 
                          value={formData.bph.sphm.skim[item.field]} 
                          onChange={(e) => updateBph(['sphm', 'skim', item.field], e.target.value)} 
                          className="p-1 bg-white border border-gray-200 rounded text-xs font-bold text-center focus:ring-1 focus:ring-olive-500 outline-none" 
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-[#5A5A40] text-zus-gold rounded-xl flex justify-between items-center">
                    <span className="text-xs font-black uppercase">Jumlah Pemilik Sijil Aktif</span>
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] opacity-60">Ref 24: {BPH_2024_REFERENCE.sphm.aktif}</span>
                      <span className="text-xl font-black">{sphmTotalAktif}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-black text-zus-900 uppercase flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-olive-600" />
                  Perbandingan SPHM (2024 vs 2025)
                </h4>
                <div className="h-[300px] w-full bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        cursor={{ fill: '#f3f4f6' }}
                      />
                      <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '10px', fontWeight: 'bold' }} />
                      <Bar dataKey="permohonan" name="Permohonan" fill="#5A5A40" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="aktif" name="Aktif" fill="#F27D26" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
                  <Info className="w-4 h-4 text-blue-500 mt-0.5" />
                  <p className="text-[10px] text-blue-700 leading-relaxed">
                    Graf di atas menunjukkan perbandingan prestasi permohonan dan pemilikan sijil aktif antara tahun rujukan 2024 dan data semasa 2025.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Pemantauan Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#5A5A40] p-4 flex items-center gap-3">
            <Activity className="w-5 h-5 text-zus-gold" />
            <h3 className="text-white font-bold">2. Pemantauan, Penguatkuasaan & Aduan</h3>
          </div>
          <div className="p-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <h4 className="text-xs font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">Hasil Pemantauan 2025</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Mematuhi Piawaian', field: 'patuh', ref: BPH_2024_REFERENCE.pemantauan.patuh, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                    { label: 'Diberi Amaran', field: 'amaran', ref: BPH_2024_REFERENCE.pemantauan.amaran, icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-50' },
                    { label: 'Digantung SPHM', field: 'gantung', ref: BPH_2024_REFERENCE.pemantauan.gantung, icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-50' },
                    { label: 'Ditarik Balik SPHM', field: 'tarikBalik', ref: BPH_2024_REFERENCE.pemantauan.tarikBalik, icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
                    { label: 'Lain-lain', field: 'lain', ref: BPH_2024_REFERENCE.pemantauan.lain, icon: Info, color: 'text-gray-500', bg: 'bg-gray-50' },
                  ].map(item => (
                    <div key={item.field} className={`p-4 rounded-2xl border border-gray-100 ${item.bg} space-y-3`}>
                      <div className="flex items-center gap-2">
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                        <span className="text-[10px] font-black text-gray-700 uppercase">{item.label}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-gray-400">Ref 24: {item.ref}</span>
                        <input 
                          type="number" 
                          value={formData.bph.pemantauan[item.field]} 
                          onChange={(e) => updateBph(['pemantauan', item.field], e.target.value)} 
                          className="w-20 p-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-olive-500 outline-none" 
                        />
                      </div>
                    </div>
                  ))}
                  <div className="p-4 rounded-2xl bg-[#5A5A40] text-zus-gold flex flex-col justify-center items-center gap-1">
                    <span className="text-[10px] font-black uppercase opacity-60">Jumlah Pemantauan</span>
                    <div className="text-2xl font-black">{pemantauanTotal}</div>
                    <span className="text-[9px] font-bold opacity-40">Ref 24: {BPH_2024_REFERENCE.pemantauan.total}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">Penguatkuasaan & Aduan</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                    <label className="text-[10px] font-black text-gray-500 uppercase">Kes Penguatkuasaan</label>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-gray-400">Ref 24: {BPH_2024_REFERENCE.penguatkuasaan}</span>
                      <input 
                        type="number" 
                        value={formData.bph.penguatkuasaan} 
                        onChange={(e) => updateBph(['penguatkuasaan'], e.target.value)} 
                        className="w-24 p-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-olive-500 outline-none" 
                      />
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                    <label className="text-[10px] font-black text-gray-500 uppercase">Jumlah Aduan Diterima</label>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-gray-400">Ref 24: {BPH_2024_REFERENCE.aduan}</span>
                      <input 
                        type="number" 
                        value={formData.bph.aduan} 
                        onChange={(e) => updateBph(['aduan'], e.target.value)} 
                        className="w-24 p-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-olive-500 outline-none" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Zon Halal Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#5A5A40] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-zus-gold" />
              <h3 className="text-white font-bold">3. Zon Halal 2025</h3>
            </div>
            <button 
              onClick={addZonHalal}
              className="px-3 py-1 bg-zus-gold text-zus-900 rounded-lg text-[10px] font-black flex items-center gap-1 hover:bg-white transition-colors"
            >
              <Plus className="w-3 h-3" /> TAMBAH ZON
            </button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {formData.bph.zonHalal.map((zon: string, idx: number) => (
                <div key={idx} className="group relative flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100 focus-within:border-olive-300 transition-all">
                  <MapPin className="w-4 h-4 text-olive-400 shrink-0" />
                  <input 
                    type="text" 
                    value={zon} 
                    onChange={(e) => updateZonHalal(idx, e.target.value)} 
                    placeholder="Masukkan lokasi zon halal..."
                    className="flex-1 bg-transparent text-xs font-bold text-gray-700 outline-none"
                  />
                  <button 
                    onClick={() => removeZonHalal(idx)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-600 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            {formData.bph.zonHalal.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <MapPin className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-xs font-bold text-gray-400">Tiada zon halal direkodkan. Klik butang di atas untuk menambah.</p>
              </div>
            )}
          </div>
        </section>

        {/* 4. Aktiviti Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#5A5A40] p-4 flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-zus-gold" />
            <h3 className="text-white font-bold">4. Program & Aktiviti Halal</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Ziarah Halal', field: 'ziarahHalal', ref: BPH_2024_REFERENCE.ziarahHalal },
                { label: 'Taklimat Halal', field: 'taklimat', ref: BPH_2024_REFERENCE.aktiviti.taklimat, sub: 'aktiviti' },
                { label: 'Kursus Kesedaran', field: 'kursus', ref: BPH_2024_REFERENCE.aktiviti.kursus, sub: 'aktiviti' },
                { label: 'Jumlah Besar Aktiviti', field: 'total', ref: BPH_2024_REFERENCE.aktiviti.total, sub: 'aktiviti', highlight: true },
              ].map(item => (
                <div key={item.field} className={`p-4 rounded-2xl border ${item.highlight ? 'bg-[#5A5A40] text-zus-gold border-[#5A5A40]' : 'bg-gray-50 border-gray-100'} space-y-3`}>
                  <label className={`text-[10px] font-black uppercase ${item.highlight ? 'opacity-60' : 'text-gray-500'}`}>{item.label}</label>
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-bold ${item.highlight ? 'opacity-40' : 'text-gray-400'}`}>Ref 24: {item.ref}</span>
                    <input 
                      type="number" 
                      value={item.sub ? formData.bph.aktiviti[item.field] : formData.bph[item.field]} 
                      onChange={(e) => updateBph(item.sub ? ['aktiviti', item.field] : [item.field], e.target.value)} 
                      className={`w-20 p-1.5 rounded-lg text-xs font-bold text-center outline-none focus:ring-2 ${item.highlight ? 'bg-white/10 border-white/20 text-white focus:ring-white/30' : 'bg-white border-gray-200 text-zus-900 focus:ring-olive-500'}`} 
                    />
                  </div>
                </div>
              ))}
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

export default BphForm;
