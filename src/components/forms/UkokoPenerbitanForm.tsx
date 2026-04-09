import React, { useMemo } from 'react';
import { 
  Lightbulb,
  BookOpen,
  Plus,
  Trash2,
  FileText
} from 'lucide-react';
import FormLayout from './FormLayout';
import { useFormLogic } from './useFormLogic';
import { BasicInfoSection, LawatanSection } from './CommonSections';

const UkokoPenerbitanForm: React.FC<{ deptName: string; onBack: () => void }> = ({ deptName, onBack }) => {
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
    penerbitan: {
      senaraiPenerbitan: []
    }
  });

  const addPublication = () => {
    setFormData((prev: any) => ({
      ...prev,
      penerbitan: {
        ...prev.penerbitan,
        senaraiPenerbitan: [
          ...(prev.penerbitan?.senaraiPenerbitan || []),
          { nama: '', jenis: 'Buku', bahagian: '' }
        ]
      }
    }));
  };

  const removePublication = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      penerbitan: {
        ...prev.penerbitan,
        senaraiPenerbitan: prev.penerbitan.senaraiPenerbitan.filter((_: any, i: number) => i !== index)
      }
    }));
  };

  const updatePublication = (index: number, field: string, value: string) => {
    setFormData((prev: any) => {
      const newList = [...(prev.penerbitan?.senaraiPenerbitan || [])];
      newList[index] = { ...newList[index], [field]: value };
      return {
        ...prev,
        penerbitan: {
          ...prev.penerbitan,
          senaraiPenerbitan: newList
        }
      };
    });
  };

  const totalPublications = useMemo(() => {
    return (formData.penerbitan?.senaraiPenerbitan?.length || 0);
  }, [formData.penerbitan]);

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
      <BasicInfoSection formData={formData} handleInputChange={handleInputChange} />

      {/* Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-indigo-900 to-indigo-800 p-6 rounded-3xl shadow-lg text-white flex flex-col justify-center relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-1 font-sans">Jumlah Penerbitan 2025</p>
            <h3 className="text-4xl font-black">{totalPublications}</h3>
          </div>
          <BookOpen className="absolute -bottom-4 -right-4 w-24 h-24 text-white/10 group-hover:rotate-12 transition-transform" />
        </div>
      </div>

      {/* Penerbitan JAIS 2025 Section */}
      <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-zus-900 uppercase tracking-tight">Penerbitan JAIS 2025</h3>
          </div>
          <button
            onClick={addPublication}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            TAMBAH PENERBITAN
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                <th className="px-4 py-3">Nama Penerbitan</th>
                <th className="px-4 py-3 w-1/4">Jenis</th>
                <th className="px-4 py-3 w-1/4">Bahagian yang Menerbitkan</th>
                <th className="px-4 py-3 text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(formData.penerbitan?.senaraiPenerbitan || []).map((item: any, idx: number) => (
                <tr key={idx} className="group hover:bg-indigo-50/30 transition-colors">
                  <td className="px-4 py-4">
                    <input
                      type="text"
                      value={item.nama}
                      onChange={(e) => updatePublication(idx, 'nama', e.target.value)}
                      placeholder="Contoh: Buku Laporan Tahunan"
                      className="w-full bg-transparent border-none focus:ring-0 text-sm font-bold text-gray-700 placeholder:text-gray-300"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <select
                      value={item.jenis}
                      onChange={(e) => updatePublication(idx, 'jenis', e.target.value)}
                      className="w-full bg-transparent border-none focus:ring-0 text-sm font-bold text-indigo-600"
                    >
                      <option value="Buku">Buku</option>
                      <option value="Risalah">Risalah</option>
                      <option value="Pamplet">Pamplet</option>
                      <option value="Lain-lain">Lain-lain</option>
                    </select>
                  </td>
                  <td className="px-4 py-4">
                    <input
                      type="text"
                      value={item.bahagian}
                      onChange={(e) => updatePublication(idx, 'bahagian', e.target.value)}
                      placeholder="Contoh: UKOKO"
                      className="w-full bg-transparent border-none focus:ring-0 text-sm font-bold text-gray-700 placeholder:text-gray-300"
                    />
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => removePublication(idx)}
                      className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {(formData.penerbitan?.senaraiPenerbitan || []).length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-gray-400 text-sm font-medium italic bg-gray-50 rounded-b-2xl">
                    Tiada rekod penerbitan ditambah. Klik 'Tambah Penerbitan' untuk mula.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Custom Cadangan Section */}
      <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-zus-900 sentence-case">Cadangan Penambahbaikan</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 flex items-center gap-2 sentence-case">
              Cadangan penambahbaikan untuk tahun 2026
            </label>
            <textarea 
              name="cadangan"
              rows={4}
              placeholder="Nyatakan cadangan anda..."
              value={formData.cadangan}
              onChange={handleInputChange}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 focus:border-zus-gold outline-none transition-all text-sm font-medium resize-none"
            ></textarea>
          </div>
        </div>
      </section>

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

export default UkokoPenerbitanForm;
