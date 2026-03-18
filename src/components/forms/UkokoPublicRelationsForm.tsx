import React, { useMemo } from 'react';
import { 
  MessageSquare, 
  Users, 
  MapPin, 
  BarChart3, 
  Smile, 
  Frown, 
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Building2
} from 'lucide-react';
import FormLayout from './FormLayout';
import { useFormLogic } from './useFormLogic';

interface UkokoPRData {
  aduan: {
    sumber: {
      talikhidmat: number;
      lain: number;
    };
    kategori: {
      masjid: number;
      kadNikah: number;
      kafa: number;
      halal: number;
      ncr: number;
      penguatkuasaan: number;
      pendidikan: number;
      usk: number;
    };
    lokasi: {
      hq: number;
      bintulu: number;
      kuching: number;
      miri: number;
      sarikei: number;
      sibu: number;
    };
  };
  maklumBalas: {
    queueBee: {
      puas: number;
      tidakPuas: number;
    };
    qrCode: {
      puas: number;
      tidakPuas: number;
    };
  };
  lawatanLuar: number;
}

const UkokoPublicRelationsForm: React.FC<{ deptName: string; onBack: () => void }> = ({ deptName, onBack }) => {
  const {
    formData,
    setFormData,
    handleSave,
    isSaving,
    showSuccess,
    saveError
  } = useFormLogic(deptName, {
    pr: {
      aduan: {
        sumber: { talikhidmat: 0, lain: 0 },
        kategori: {
          masjid: 0,
          kadNikah: 0,
          kafa: 0,
          halal: 0,
          ncr: 0,
          penguatkuasaan: 0,
          pendidikan: 0,
          usk: 0
        },
        lokasi: {
          hq: 0,
          bintulu: 0,
          kuching: 0,
          miri: 0,
          sarikei: 0,
          sibu: 0
        }
      },
      maklumBalas: {
        queueBee: { puas: 0, tidakPuas: 0 },
        qrCode: { puas: 0, tidakPuas: 0 }
      },
      lawatanLuar: 0
    }
  });

  const prData = formData.pr as UkokoPRData;

  const updateField = (path: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setFormData((prev: any) => {
      const newPr = { ...prev.pr };
      const keys = path.split('.');
      let current = newPr;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = numValue;
      return { ...prev, pr: newPr };
    });
  };

  // Calculations
  const totalAduanSumber = prData.aduan.sumber.talikhidmat + prData.aduan.sumber.lain;
  const totalAduanKategori = Object.values(prData.aduan.kategori).reduce((a, b) => a + b, 0);
  const totalAduanLokasi = Object.values(prData.aduan.lokasi).reduce((a, b) => a + b, 0);

  const totalQueueBee = prData.maklumBalas.queueBee.puas + prData.maklumBalas.queueBee.tidakPuas;
  const totalQrCode = prData.maklumBalas.qrCode.puas + prData.maklumBalas.qrCode.tidakPuas;
  const totalMaklumBalas = totalQueueBee + totalQrCode;

  const isAduanBalanced = totalAduanSumber === totalAduanKategori && totalAduanSumber === totalAduanLokasi;

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
      <div className="space-y-8">
        {/* 1. Statistik Aduan */}
        <section className="bg-white border border-indigo-100 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8 border-b border-indigo-50 pb-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-indigo-950 uppercase tracking-tight">Statistik Aduan 2025</h3>
              <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest">Pengurusan Aduan Awam</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* A. Sumber Aduan */}
            <div className="space-y-4">
              <h4 className="text-sm font-black text-indigo-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> SUMBER ADUAN
              </h4>
              <div className="grid grid-cols-1 gap-3">
                <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                  <label className="block text-[10px] font-black text-indigo-400 uppercase mb-2">SCS Talikhidmat</label>
                  <input
                    type="number"
                    value={prData.aduan.sumber.talikhidmat}
                    onChange={(e) => updateField('aduan.sumber.talikhidmat', e.target.value)}
                    className="w-full bg-white border border-indigo-200 rounded-xl p-3 font-black text-indigo-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                  <label className="block text-[10px] font-black text-indigo-400 uppercase mb-2">Lain-lain (Emel/Surat)</label>
                  <input
                    type="number"
                    value={prData.aduan.sumber.lain}
                    onChange={(e) => updateField('aduan.sumber.lain', e.target.value)}
                    className="w-full bg-white border border-indigo-200 rounded-xl p-3 font-black text-indigo-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div className="p-4 bg-indigo-900 rounded-2xl text-white">
                  <p className="text-[10px] font-black uppercase opacity-60">Jumlah Aduan</p>
                  <p className="text-2xl font-black">{totalAduanSumber}</p>
                </div>
              </div>
            </div>

            {/* B. Kategori Aduan */}
            <div className="space-y-4">
              <h4 className="text-sm font-black text-indigo-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" /> KATEGORI ADUAN
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(prData.aduan.kategori).map(([key, val]) => (
                  <div key={key} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <label className="block text-[9px] font-black text-slate-400 uppercase mb-1 truncate">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </label>
                    <input
                      type="number"
                      value={val}
                      onChange={(e) => updateField(`aduan.kategori.${key}`, e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                ))}
              </div>
              <div className={`p-3 rounded-xl flex justify-between items-center ${totalAduanKategori === totalAduanSumber ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                <span className="text-[10px] font-black uppercase">Jumlah Kategori</span>
                <span className="font-black">{totalAduanKategori}</span>
              </div>
            </div>

            {/* C. Lokasi PAIB */}
            <div className="space-y-4">
              <h4 className="text-sm font-black text-indigo-900 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> LOKASI PAIB
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(prData.aduan.lokasi).map(([key, val]) => (
                  <div key={key} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <label className="block text-[9px] font-black text-slate-400 uppercase mb-1 truncate">
                      {key.toUpperCase()}
                    </label>
                    <input
                      type="number"
                      value={val}
                      onChange={(e) => updateField(`aduan.lokasi.${key}`, e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                ))}
              </div>
              <div className={`p-3 rounded-xl flex justify-between items-center ${totalAduanLokasi === totalAduanSumber ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                <span className="text-[10px] font-black uppercase">Jumlah Lokasi</span>
                <span className="font-black">{totalAduanLokasi}</span>
              </div>
            </div>
          </div>

          {!isAduanBalanced && totalAduanSumber > 0 && (
            <div className="mt-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-xs font-bold uppercase tracking-tight">
                Amaran: Jumlah Kategori ({totalAduanKategori}) atau Lokasi ({totalAduanLokasi}) tidak sepadan dengan Jumlah Aduan ({totalAduanSumber}).
              </p>
            </div>
          )}

          {/* Bar Chart Placeholders */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 h-48 flex flex-col items-center justify-center text-slate-400">
              <BarChart3 className="w-8 h-8 mb-2 opacity-20" />
              <p className="text-[10px] font-black uppercase tracking-widest">Visualisasi Kategori Aduan</p>
              <div className="w-full mt-4 flex items-end gap-2 h-16 px-4">
                {[40, 70, 30, 90, 50, 60, 20, 45].map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-indigo-200 rounded-t-sm opacity-50"></div>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 h-48 flex flex-col items-center justify-center text-slate-400">
              <BarChart3 className="w-8 h-8 mb-2 opacity-20" />
              <p className="text-[10px] font-black uppercase tracking-widest">Visualisasi Lokasi PAIB</p>
              <div className="w-full mt-4 flex items-end gap-2 h-16 px-8">
                {[60, 40, 80, 50, 30, 70].map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-purple-200 rounded-t-sm opacity-50"></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. Maklum Balas Pelanggan */}
        <section className="bg-white border border-purple-100 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8 border-b border-purple-50 pb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
              <Smile className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-purple-950 uppercase tracking-tight">Maklum Balas Pelanggan</h3>
              <p className="text-xs text-purple-400 font-bold uppercase tracking-widest">Kepuasan Perkhidmatan</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Queue Bee */}
            <div className="bg-indigo-50/30 rounded-3xl p-6 border border-indigo-100">
              <h4 className="text-xs font-black text-indigo-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Queue Bee System
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-600 mb-1">
                    <Smile className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase">Puas Hati</span>
                  </div>
                  <input
                    type="number"
                    value={prData.maklumBalas.queueBee.puas}
                    onChange={(e) => updateField('maklumBalas.queueBee.puas', e.target.value)}
                    className="w-full bg-white border border-emerald-200 rounded-xl p-3 font-black text-emerald-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-rose-600 mb-1">
                    <Frown className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase">Tidak Puas</span>
                  </div>
                  <input
                    type="number"
                    value={prData.maklumBalas.queueBee.tidakPuas}
                    onChange={(e) => updateField('maklumBalas.queueBee.tidakPuas', e.target.value)}
                    className="w-full bg-white border border-rose-200 rounded-xl p-3 font-black text-rose-900 focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-indigo-100 flex justify-between items-center">
                <span className="text-[10px] font-black text-indigo-400 uppercase">Sub-Jumlah</span>
                <span className="text-lg font-black text-indigo-900">{totalQueueBee}</span>
              </div>
            </div>

            {/* QR Code */}
            <div className="bg-purple-50/30 rounded-3xl p-6 border border-purple-100">
              <h4 className="text-xs font-black text-purple-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Kod QR
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-600 mb-1">
                    <Smile className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase">Puas Hati</span>
                  </div>
                  <input
                    type="number"
                    value={prData.maklumBalas.qrCode.puas}
                    onChange={(e) => updateField('maklumBalas.qrCode.puas', e.target.value)}
                    className="w-full bg-white border border-emerald-200 rounded-xl p-3 font-black text-emerald-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-rose-600 mb-1">
                    <Frown className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase">Tidak Puas</span>
                  </div>
                  <input
                    type="number"
                    value={prData.maklumBalas.qrCode.tidakPuas}
                    onChange={(e) => updateField('maklumBalas.qrCode.tidakPuas', e.target.value)}
                    className="w-full bg-white border border-rose-200 rounded-xl p-3 font-black text-rose-900 focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-purple-100 flex justify-between items-center">
                <span className="text-[10px] font-black text-purple-400 uppercase">Sub-Jumlah</span>
                <span className="text-lg font-black text-purple-900">{totalQrCode}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-indigo-900 to-purple-900 rounded-3xl p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-indigo-200 text-xs font-black uppercase tracking-widest mb-1">Jumlah Keseluruhan Maklum Balas</p>
              <h3 className="text-5xl font-black tracking-tighter">{totalMaklumBalas.toLocaleString()}</h3>
            </div>
            <div className="flex gap-4">
              <div className="text-center px-6 py-3 bg-white/10 rounded-2xl backdrop-blur-md">
                <p className="text-[10px] font-black uppercase opacity-60">Puas Hati</p>
                <p className="text-xl font-black text-emerald-400">
                  {(prData.maklumBalas.queueBee.puas + prData.maklumBalas.qrCode.puas).toLocaleString()}
                </p>
              </div>
              <div className="text-center px-6 py-3 bg-white/10 rounded-2xl backdrop-blur-md">
                <p className="text-[10px] font-black uppercase opacity-60">Tidak Puas</p>
                <p className="text-xl font-black text-rose-400">
                  {(prData.maklumBalas.queueBee.tidakPuas + prData.maklumBalas.qrCode.tidakPuas).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Lawatan Luar */}
        <section className="bg-white border border-indigo-100 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8 border-b border-indigo-50 pb-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-indigo-950 uppercase tracking-tight">Lawatan Luar</h3>
              <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest">Agensi / Badan / NGO / Syarikat</p>
            </div>
          </div>

          <div className="max-w-md">
            <div className="p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100 flex items-center gap-6">
              <div className="flex-1">
                <label className="block text-xs font-black text-indigo-900 uppercase mb-2">Jumlah Lawatan Diterima</label>
                <input
                  type="number"
                  value={prData.lawatanLuar}
                  onChange={(e) => updateField('lawatanLuar', e.target.value)}
                  className="w-full bg-white border border-indigo-200 rounded-2xl p-4 font-black text-3xl text-indigo-900 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all"
                  placeholder="0"
                />
              </div>
              <div className="w-20 h-20 bg-indigo-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <TrendingUp className="w-10 h-10 opacity-40" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </FormLayout>
  );
};

export default UkokoPublicRelationsForm;
