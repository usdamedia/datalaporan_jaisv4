import React, { useMemo } from 'react';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Book,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import FormLayout from './FormLayout';
import { useFormLogic } from './useFormLogic';
import { BasicInfoSection, NarrativeSection, LawatanSection } from './CommonSections';

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
      kategoriBuku: [
        { nama: 'Munakahat', jumlah: '' },
        { nama: 'Motivasi', jumlah: '' }
      ]
    }
  });

  const addCategory = () => {
    setFormData((prev: any) => ({
      ...prev,
      penerbitan: {
        ...prev.penerbitan,
        kategoriBuku: [
          ...prev.penerbitan.kategoriBuku,
          { nama: '', jumlah: '' }
        ]
      }
    }));
  };

  const removeCategory = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      penerbitan: {
        ...prev.penerbitan,
        kategoriBuku: prev.penerbitan.kategoriBuku.filter((_: any, i: number) => i !== index)
      }
    }));
  };

  const updateCategory = (index: number, field: string, value: string) => {
    setFormData((prev: any) => {
      const newCategories = [...prev.penerbitan.kategoriBuku];
      newCategories[index] = { ...newCategories[index], [field]: value };
      return {
        ...prev,
        penerbitan: {
          ...prev.penerbitan,
          kategoriBuku: newCategories
        }
      };
    });
  };

  const totalCategories = useMemo(() => {
    return (formData.penerbitan?.kategoriBuku?.length || 0);
  }, [formData.penerbitan]);

  const isValid = useMemo(() => {
    return formData.penerbitan?.kategoriBuku?.every((c: any) => c.nama);
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

      {/* Summary Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-indigo-900 p-6 rounded-3xl shadow-lg text-white flex flex-col justify-center relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-1">Jumlah Kategori Buku 2025</p>
            <h3 className="text-4xl font-black">{totalCategories}</h3>
          </div>
          <BookOpen className="absolute -bottom-4 -right-4 w-24 h-24 text-indigo-800/50 group-hover:rotate-12 transition-transform" />
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-indigo-100 flex items-center gap-4">
          <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Status Data</p>
            <h3 className="text-2xl font-black text-gray-900">{isValid ? 'Lengkap' : 'Belum Lengkap'}</h3>
          </div>
        </div>
      </div>

      {/* Kategori Buku Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-indigo-100 overflow-hidden mb-8">
        <div className="p-6 border-b border-indigo-50 flex items-center justify-between bg-indigo-50/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-xl text-white">
              <Book className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Kategori Baharu Buku Tahun 2025</h3>
          </div>
          <button
            onClick={addCategory}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            TAMBAH KATEGORI
          </button>
        </div>
        
        <div className="p-6">
          {formData.penerbitan?.kategoriBuku?.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 text-sm font-medium">Tiada kategori buku dimasukkan.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    <th className="px-4 py-3">Nama Kategori Buku</th>
                    <th className="px-4 py-3">Bilangan Buku (Jika Ada)</th>
                    <th className="px-4 py-3 text-right">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {formData.penerbitan.kategoriBuku.map((cat: any, idx: number) => (
                    <tr key={idx} className="group hover:bg-indigo-50/30 transition-colors">
                      <td className="px-4 py-4">
                        <input
                          type="text"
                          value={cat.nama}
                          onChange={(e) => updateCategory(idx, 'nama', e.target.value)}
                          placeholder="Contoh: Munakahat, Motivasi..."
                          className="w-full bg-transparent border-none focus:ring-0 text-sm font-bold text-gray-700 placeholder:text-gray-300"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          type="number"
                          value={cat.jumlah}
                          onChange={(e) => updateCategory(idx, 'jumlah', e.target.value)}
                          placeholder="0"
                          className="w-24 bg-transparent border-none focus:ring-0 text-sm font-black text-indigo-600"
                        />
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button
                          onClick={() => removeCategory(idx)}
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

      <NarrativeSection formData={formData} handleInputChange={handleInputChange} />

      <LawatanSection 
        formData={formData} 
        addLawatan={addLawatan} 
        removeLawatan={removeLawatan} 
        updateLawatan={updateLawatan} 
        handleSave={handleSave}
        isSaving={isSaving}
      />

      {!isValid && totalCategories > 0 && (
        <div className="mt-6 flex items-center gap-3 p-4 bg-amber-50 border border-amber-100 rounded-2xl text-amber-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-xs font-bold uppercase tracking-tight">Sila pastikan nama kategori diisi sebelum menyimpan.</p>
        </div>
      )}
    </FormLayout>
  );
};

export default UkokoPenerbitanForm;
