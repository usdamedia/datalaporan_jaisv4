import React, { useEffect, useMemo, useState } from 'react';
import { collection, getDocs, limit, query, Timestamp } from 'firebase/firestore';
import { 
  Calendar, 
  Plus, 
  Trash2, 
  MapPin, 
  Users, 
  Star,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { db } from '../../firebase';
import FormLayout from './FormLayout';
import { BasicInfoSection, NarrativeSection, LawatanSection } from './CommonSections';
import { useFormLogic } from './useFormLogic';
import { getTodayIsoMY } from '../../utils/dateFormat';
import { buildDraftKey } from '../../utils/formDraftKey';
import { SARAWAK_DIVISIONS, UKOKO_2024_REFERENCE } from '../../constants';

const toLogDate = (value: unknown) => {
  if (!value) return null;
  if (value instanceof Timestamp) return value.toDate();
  if (typeof value === 'object' && value && 'seconds' in value) {
    const seconds = Number((value as { seconds: unknown }).seconds);
    if (!Number.isNaN(seconds)) return new Date(seconds * 1000);
  }
  return null;
};

const UkokoForm: React.FC<{ deptName: string; onBack: () => void }> = ({ deptName, onBack }) => {
  const [latestSavedBy, setLatestSavedBy] = useState<string>('');
  const [latestSavedAt, setLatestSavedAt] = useState<string>('');
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
    updateLawatan
  } = useFormLogic(deptName, {
    tarikh: getTodayIsoMY(),
    disediakanOleh: '',
    jawatan: '',
    disemakOleh: '',
    disemakJawatan: '',
    disemakTarikh: '',
    disahkanOleh: '',
    disahkanJawatan: '',
    disahkanTarikh: '',
    ringkasan: '',
    isu: '',
    cadangan: '',
    lawatan: [],
    ukoko: {
      perayaanIslam: [],
      majlisKesyukuran: [],
      penyertaanLuar: []
    }
  });

  useEffect(() => {
    let cancelled = false;

    const loadLatestSaveLog = async () => {
      const storageKey = buildDraftKey(deptName);

      try {
        const snapshot = await getDocs(query(collection(db, 'drafts_2025', storageKey, 'update_logs'), limit(50)));
        const latestLog = snapshot.docs
          .map((entry) => {
            const data = entry.data();
            const createdAt = toLogDate(data.createdAt);
            const clientCreatedAt = data.clientCreatedAt ? String(data.clientCreatedAt) : '';
            return {
              officerName: String(data.officerName || ''),
              createdAt,
              clientCreatedAt,
              time: createdAt?.getTime() || (clientCreatedAt ? new Date(clientCreatedAt).getTime() : 0),
            };
          })
          .filter((entry) => entry.officerName)
          .sort((a, b) => b.time - a.time)[0];

        if (cancelled || !latestLog) return;

        setLatestSavedBy(latestLog.officerName);
        setLatestSavedAt(
          latestLog.createdAt
            ? latestLog.createdAt.toLocaleString('ms-MY', { dateStyle: 'medium', timeStyle: 'short' })
            : latestLog.clientCreatedAt
              ? new Date(latestLog.clientCreatedAt).toLocaleString('ms-MY', { dateStyle: 'medium', timeStyle: 'short' })
              : ''
        );
      } catch (error) {
        console.error('Failed to load latest UKOKO save log', error);
      }
    };

    void loadLatestSaveLog();

    return () => {
      cancelled = true;
    };
  }, [deptName]);

  const addEvent = (category: 'perayaanIslam' | 'majlisKesyukuran' | 'penyertaanLuar') => {
    setFormData((prev: any) => {
      const defaultItem = category === 'penyertaanLuar' 
        ? { nama: '', tarikh: '', lokasi: '' }
        : { nama: '', tarikh: '', tuanRumah: '', mesyuarat: '' };
        
      return {
        ...prev,
        ukoko: {
          ...prev.ukoko,
          [category]: [
            ...(prev.ukoko[category] || []),
            defaultItem
          ]
        }
      };
    });
  };

  const removeEvent = (category: 'perayaanIslam' | 'majlisKesyukuran' | 'penyertaanLuar', index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      ukoko: {
        ...prev.ukoko,
        [category]: prev.ukoko[category].filter((_: any, i: number) => i !== index)
      }
    }));
  };

  const updateEvent = (category: 'perayaanIslam' | 'majlisKesyukuran' | 'penyertaanLuar', index: number, field: string, value: string) => {
    setFormData((prev: any) => {
      const newEvents = [...(prev.ukoko[category] || [])];
      newEvents[index] = { ...newEvents[index], [field]: value };
      return {
        ...prev,
        ukoko: {
          ...prev.ukoko,
          [category]: newEvents
        }
      };
    });
  };

  const totalEvents = useMemo(() => {
    return (formData.ukoko.perayaanIslam?.length || 0) + 
           (formData.ukoko.majlisKesyukuran?.length || 0) +
           (formData.ukoko.penyertaanLuar?.length || 0);
  }, [formData.ukoko]);

  const isValid = useMemo(() => {
    const check1 = (events: any[] = []) => events.every(e => e.nama && e.tarikh && e.tuanRumah && e.mesyuarat !== '');
    const check2 = (events: any[] = []) => events.every(e => e.nama && e.tarikh && e.lokasi);
    return check1(formData.ukoko.perayaanIslam) && 
           check1(formData.ukoko.majlisKesyukuran) &&
           check2(formData.ukoko.penyertaanLuar);
  }, [formData.ukoko]);

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
      <BasicInfoSection formData={formData} handleInputChange={handleInputChange} showDisemak />

      <section className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 shadow-sm">
        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Simpanan terakhir</p>
        <p className="mt-2 text-sm font-bold text-zus-900">
          {latestSavedBy ? `Dikemaskini oleh ${latestSavedBy}` : 'Belum ada log simpanan manual untuk unit ini.'}
        </p>
        {latestSavedAt && (
          <p className="mt-1 text-xs font-medium text-emerald-800/70">{latestSavedAt}</p>
        )}
      </section>

      {/* Summary Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-emerald-900 p-6 rounded-3xl shadow-lg text-white flex flex-col justify-center relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-emerald-300 text-[10px] font-black uppercase tracking-widest mb-1">Jumlah Keseluruhan Acara</p>
            <h3 className="text-4xl font-black">{totalEvents}</h3>
            <p className="text-emerald-100/60 text-[10px] mt-2">Rujukan 2024: {UKOKO_2024_REFERENCE.total} Acara</p>
          </div>
          <Star className="absolute -bottom-4 -right-4 w-24 h-24 text-emerald-800/50 group-hover:rotate-12 transition-transform" />
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100 flex items-center gap-4">
          <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Perayaan Islam</p>
            <h3 className="text-2xl font-black text-gray-900">{formData.ukoko.perayaanIslam?.length || 0}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100 flex items-center gap-4">
          <div className="p-4 bg-teal-50 rounded-2xl text-teal-600">
            <Calendar className="w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Majlis Kesyukuran & Penyertaan</p>
            <h3 className="text-2xl font-black text-gray-900">
              {(formData.ukoko.majlisKesyukuran?.length || 0) + (formData.ukoko.penyertaanLuar?.length || 0)}
            </h3>
          </div>
        </div>
      </div>

      {/* Perayaan Islam Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-emerald-100 overflow-hidden mb-8">
        <div className="p-6 border-b border-emerald-50 flex items-center justify-between bg-emerald-50/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-600 rounded-xl text-white">
              <Star className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Senarai Perayaan Islam</h3>
          </div>
          <button
            onClick={() => addEvent('perayaanIslam')}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            TAMBAH ACARA
          </button>
        </div>
        
        <div className="p-6">
          {formData.ukoko.perayaanIslam.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 text-sm font-medium">Tiada acara perayaan Islam dimasukkan.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    <th className="px-4 py-3 w-[40%]">Nama Majlis</th>
                    <th className="px-4 py-3 w-40">Tarikh</th>
                    <th className="px-4 py-3 w-56">Tuan Rumah</th>
                    <th className="px-4 py-3 w-36">Bil. Mesyuarat</th>
                    <th className="px-4 py-3 w-24 text-right">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {formData.ukoko.perayaanIslam.map((event: any, idx: number) => (
                    <tr key={idx} className="group hover:bg-emerald-50/30 transition-colors">
                      <td className="px-4 py-4 align-top">
                        <textarea
                          value={event.nama}
                          onChange={(e) => updateEvent('perayaanIslam', idx, 'nama', e.target.value)}
                          placeholder="Nama Majlis..."
                          rows={2}
                          className="w-full min-w-[22rem] resize-none overflow-hidden bg-transparent border-none focus:ring-0 text-sm font-bold leading-snug text-gray-700 placeholder:text-gray-300 whitespace-normal break-words"
                        />
                      </td>
                      <td className="px-4 py-4 align-top">
                        <input
                          type="date"
                          lang="en-GB"
                          value={event.tarikh}
                          onChange={(e) => updateEvent('perayaanIslam', idx, 'tarikh', e.target.value)}
                          className="bg-transparent border-none focus:ring-0 text-sm text-gray-600"
                        />
                      </td>
                      <td className="px-4 py-4 align-top">
                        <select
                          value={event.tuanRumah}
                          onChange={(e) => updateEvent('perayaanIslam', idx, 'tuanRumah', e.target.value)}
                          className="bg-transparent border-none focus:ring-0 text-sm text-gray-600 font-medium"
                        >
                          <option value="">Pilih Bahagian</option>
                          {SARAWAK_DIVISIONS.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <input
                          type="number"
                          value={event.mesyuarat}
                          onChange={(e) => updateEvent('perayaanIslam', idx, 'mesyuarat', e.target.value)}
                          placeholder="0"
                          className="w-16 bg-transparent border-none focus:ring-0 text-sm font-black text-emerald-600"
                        />
                      </td>
                      <td className="px-4 py-4 text-right align-top">
                        <button
                          onClick={() => removeEvent('perayaanIslam', idx)}
                          className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Majlis Kesyukuran Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-teal-100 overflow-hidden">
        <div className="p-6 border-b border-teal-50 flex items-center justify-between bg-teal-50/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-600 rounded-xl text-white">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Senarai Majlis Kesyukuran</h3>
          </div>
          <button
            onClick={() => addEvent('majlisKesyukuran')}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold hover:bg-teal-700 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            TAMBAH MAJLIS
          </button>
        </div>
        
        <div className="p-6">
          {formData.ukoko.majlisKesyukuran.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 text-sm font-medium">Tiada majlis kesyukuran dimasukkan.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    <th className="px-4 py-3">Nama Majlis</th>
                    <th className="px-4 py-3">Tarikh</th>
                    <th className="px-4 py-3">Tuan Rumah</th>
                    <th className="px-4 py-3">Bil. Mesyuarat</th>
                    <th className="px-4 py-3 text-right">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {formData.ukoko.majlisKesyukuran.map((event: any, idx: number) => (
                    <tr key={idx} className="group hover:bg-teal-50/30 transition-colors">
                      <td className="px-4 py-4 align-top">
                        <textarea
                          value={event.nama}
                          onChange={(e) => updateEvent('majlisKesyukuran', idx, 'nama', e.target.value)}
                          placeholder="Nama Majlis..."
                          rows={2}
                          className="w-full min-w-[22rem] resize-none overflow-hidden bg-transparent border-none focus:ring-0 text-sm font-bold leading-snug text-gray-700 placeholder:text-gray-300 whitespace-normal break-words"
                        />
                      </td>
                      <td className="px-4 py-4 align-top">
                        <input
                          type="date"
                          lang="en-GB"
                          value={event.tarikh}
                          onChange={(e) => updateEvent('majlisKesyukuran', idx, 'tarikh', e.target.value)}
                          className="bg-transparent border-none focus:ring-0 text-sm text-gray-600"
                        />
                      </td>
                      <td className="px-4 py-4 align-top">
                        <select
                          value={event.tuanRumah}
                          onChange={(e) => updateEvent('majlisKesyukuran', idx, 'tuanRumah', e.target.value)}
                          className="bg-transparent border-none focus:ring-0 text-sm text-gray-600 font-medium"
                        >
                          <option value="">Pilih Bahagian</option>
                          {SARAWAK_DIVISIONS.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <input
                          type="number"
                          value={event.mesyuarat}
                          onChange={(e) => updateEvent('majlisKesyukuran', idx, 'mesyuarat', e.target.value)}
                          placeholder="0"
                          className="w-16 bg-transparent border-none focus:ring-0 text-sm font-black text-teal-600"
                        />
                      </td>
                      <td className="px-4 py-4 text-right align-top">
                        <button
                          onClick={() => removeEvent('majlisKesyukuran', idx)}
                          className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Penyertaan Luar Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-blue-100 overflow-hidden mb-8">
        <div className="p-6 border-b border-blue-50 flex items-center justify-between bg-blue-50/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl text-white">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Senarai Penyertaan Luar</h3>
          </div>
          <button
            onClick={() => addEvent('penyertaanLuar')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            TAMBAH PENYERTAAN
          </button>
        </div>
        
        <div className="p-6">
          {(formData.ukoko.penyertaanLuar || []).length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 text-sm font-medium">Tiada penyertaan luar dimasukkan.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    <th className="px-4 py-3">Nama Penyertaan</th>
                    <th className="px-4 py-3 w-48">Tarikh</th>
                    <th className="px-4 py-3">Lokasi</th>
                    <th className="px-4 py-3 text-right">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {formData.ukoko.penyertaanLuar.map((event: any, idx: number) => (
                    <tr key={idx} className="group hover:bg-blue-50/30 transition-colors">
                      <td className="px-4 py-4">
                        <input
                          type="text"
                          value={event.nama}
                          onChange={(e) => updateEvent('penyertaanLuar', idx, 'nama', e.target.value)}
                          placeholder="Nama Penyertaan..."
                          className="w-full bg-transparent border-none focus:ring-0 text-sm font-bold text-gray-700 placeholder:text-gray-300"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          type="date"
                          lang="en-GB"
                          value={event.tarikh}
                          onChange={(e) => updateEvent('penyertaanLuar', idx, 'tarikh', e.target.value)}
                          className="w-full bg-transparent border-none focus:ring-0 text-sm text-gray-600"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          type="text"
                          value={event.lokasi}
                          onChange={(e) => updateEvent('penyertaanLuar', idx, 'lokasi', e.target.value)}
                          placeholder="Lokasi..."
                          className="w-full bg-transparent border-none focus:ring-0 text-sm text-gray-600"
                        />
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button
                          onClick={() => removeEvent('penyertaanLuar', idx)}
                          className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {!isValid && totalEvents > 0 && (
        <div className="mt-6 flex items-center gap-3 p-4 bg-amber-50 border border-amber-100 rounded-2xl text-amber-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-xs font-bold uppercase tracking-tight">Sila pastikan semua maklumat acara diisi dengan lengkap sebelum menyimpan.</p>
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

export default UkokoForm;
