import React, { useMemo } from 'react';
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
import FormLayout from './FormLayout';
import { useFormLogic } from './useFormLogic';
import { SARAWAK_DIVISIONS, UKOKO_2024_REFERENCE } from '../../constants';

const UkokoForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const {
    formData,
    setFormData,
    handleSave,
    isSaving,
    showSuccess
  } = useFormLogic('UKOKO', {
    ukoko: {
      perayaanIslam: [],
      majlisKesyukuran: []
    }
  });

  const addEvent = (category: 'perayaanIslam' | 'majlisKesyukuran') => {
    setFormData((prev: any) => ({
      ...prev,
      ukoko: {
        ...prev.ukoko,
        [category]: [
          ...prev.ukoko[category],
          { nama: '', tarikh: '', tuanRumah: '', mesyuarat: '' }
        ]
      }
    }));
  };

  const removeEvent = (category: 'perayaanIslam' | 'majlisKesyukuran', index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      ukoko: {
        ...prev.ukoko,
        [category]: prev.ukoko[category].filter((_: any, i: number) => i !== index)
      }
    }));
  };

  const updateEvent = (category: 'perayaanIslam' | 'majlisKesyukuran', index: number, field: string, value: string) => {
    setFormData((prev: any) => {
      const newEvents = [...prev.ukoko[category]];
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
    return (formData.ukoko.perayaanIslam?.length || 0) + (formData.ukoko.majlisKesyukuran?.length || 0);
  }, [formData.ukoko]);

  const isValid = useMemo(() => {
    const check = (events: any[]) => events.every(e => e.nama && e.tarikh && e.tuanRumah && e.mesyuarat);
    return check(formData.ukoko.perayaanIslam) && check(formData.ukoko.majlisKesyukuran);
  }, [formData.ukoko]);

  return (
    <FormLayout
      deptName="Unit Komunikasi Korporat (UKOKO) - Subunit Perayaan Islam"
      onBack={onBack}
      onSave={handleSave}
      isSaving={isSaving}
      showSuccess={showSuccess}
      formData={formData}
    >
      {/* Summary Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-emerald-900 p-6 rounded-3xl shadow-lg text-white flex flex-col justify-center relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-emerald-300 text-[10px] font-black uppercase tracking-widest mb-1">Jumlah Keseluruhan Acara</p>
            <h3 className="text-4xl font-black">{totalEvents}</h3>
            <p className="text-emerald-100/60 text-[10px] mt-2">Ref 2024: {UKOKO_2024_REFERENCE.total} Acara</p>
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
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Majlis Kesyukuran</p>
            <h3 className="text-2xl font-black text-gray-900">{formData.ukoko.majlisKesyukuran?.length || 0}</h3>
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
                    <th className="px-4 py-3">Nama Majlis</th>
                    <th className="px-4 py-3">Tarikh</th>
                    <th className="px-4 py-3">Tuan Rumah</th>
                    <th className="px-4 py-3">Bil. Mesyuarat</th>
                    <th className="px-4 py-3 text-right">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {formData.ukoko.perayaanIslam.map((event: any, idx: number) => (
                    <tr key={idx} className="group hover:bg-emerald-50/30 transition-colors">
                      <td className="px-4 py-4">
                        <input
                          type="text"
                          value={event.nama}
                          onChange={(e) => updateEvent('perayaanIslam', idx, 'nama', e.target.value)}
                          placeholder="Nama Majlis..."
                          className="w-full bg-transparent border-none focus:ring-0 text-sm font-bold text-gray-700 placeholder:text-gray-300"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          type="date"
                          value={event.tarikh}
                          onChange={(e) => updateEvent('perayaanIslam', idx, 'tarikh', e.target.value)}
                          className="bg-transparent border-none focus:ring-0 text-sm text-gray-600"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <select
                          value={event.tuanRumah}
                          onChange={(e) => updateEvent('perayaanIslam', idx, 'tuanRumah', e.target.value)}
                          className="bg-transparent border-none focus:ring-0 text-sm text-gray-600 font-medium"
                        >
                          <option value="">Pilih Bahagian</option>
                          {SARAWAK_DIVISIONS.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-4">
                        <input
                          type="number"
                          value={event.mesyuarat}
                          onChange={(e) => updateEvent('perayaanIslam', idx, 'mesyuarat', e.target.value)}
                          placeholder="0"
                          className="w-16 bg-transparent border-none focus:ring-0 text-sm font-black text-emerald-600"
                        />
                      </td>
                      <td className="px-4 py-4 text-right">
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
                      <td className="px-4 py-4">
                        <input
                          type="text"
                          value={event.nama}
                          onChange={(e) => updateEvent('majlisKesyukuran', idx, 'nama', e.target.value)}
                          placeholder="Nama Majlis..."
                          className="w-full bg-transparent border-none focus:ring-0 text-sm font-bold text-gray-700 placeholder:text-gray-300"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          type="date"
                          value={event.tarikh}
                          onChange={(e) => updateEvent('majlisKesyukuran', idx, 'tarikh', e.target.value)}
                          className="bg-transparent border-none focus:ring-0 text-sm text-gray-600"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <select
                          value={event.tuanRumah}
                          onChange={(e) => updateEvent('majlisKesyukuran', idx, 'tuanRumah', e.target.value)}
                          className="bg-transparent border-none focus:ring-0 text-sm text-gray-600 font-medium"
                        >
                          <option value="">Pilih Bahagian</option>
                          {SARAWAK_DIVISIONS.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-4">
                        <input
                          type="number"
                          value={event.mesyuarat}
                          onChange={(e) => updateEvent('majlisKesyukuran', idx, 'mesyuarat', e.target.value)}
                          placeholder="0"
                          className="w-16 bg-transparent border-none focus:ring-0 text-sm font-black text-teal-600"
                        />
                      </td>
                      <td className="px-4 py-4 text-right">
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

      {!isValid && totalEvents > 0 && (
        <div className="mt-6 flex items-center gap-3 p-4 bg-amber-50 border border-amber-100 rounded-2xl text-amber-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-xs font-bold uppercase tracking-tight">Sila pastikan semua maklumat acara diisi dengan lengkap sebelum menyimpan.</p>
        </div>
      )}
    </FormLayout>
  );
};

export default UkokoForm;
