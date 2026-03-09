import React, { useState, useEffect } from 'react';
import { 
  Save, 
  ArrowLeft, 
  FileDown, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  Info,
  Calendar,
  User,
  FileText,
  MessageSquare,
  Lightbulb
} from 'lucide-react';
import { ReportData } from '../types';

interface FormEntryProps {
  deptName: string;
  onBack: () => void;
}

const FormEntry: React.FC<FormEntryProps> = ({ deptName, onBack }) => {
  const [formData, setFormData] = useState<ReportData>({
    tarikh: new Date().toISOString().split('T')[0],
    disediakanOleh: '',
    ringkasan: '',
    isu: '',
    cadangan: '',
    lawatan: []
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(`jais_2025_${deptName}`);
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (e) {
        console.error("Error parsing saved data", e);
      }
    }
  }, [deptName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem(`jais_2025_${deptName}`, JSON.stringify(formData));
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  const addLawatan = () => {
    setFormData(prev => ({
      ...prev,
      lawatan: [
        ...(prev.lawatan || []),
        { jenis: 'keluar', tajukAgensi: '', tarikh: '', tempat: '', objektif: '' }
      ]
    }));
  };

  const removeLawatan = (index: number) => {
    setFormData(prev => ({
      ...prev,
      lawatan: prev.lawatan?.filter((_, i) => i !== index)
    }));
  };

  const updateLawatan = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const newLawatan = [...(prev.lawatan || [])];
      newLawatan[index] = { ...newLawatan[index], [field]: value };
      return { ...prev, lawatan: newLawatan };
    });
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Form Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-zus-900 font-bold text-sm mb-2 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Utama
          </button>
          <h2 className="text-2xl md:text-3xl font-extrabold text-zus-900">
            {deptName}
          </h2>
          <p className="text-gray-500 text-sm md:text-base">Sila lengkapkan maklumat laporan tahunan di bawah.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-zus-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-zus-700 transition-all active:scale-95 disabled:opacity-70"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Save className="w-4 h-4" />
            )}
            Simpan Draf
          </button>
          <button
            className="flex items-center gap-2 bg-white text-zus-900 border border-gray-200 px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:border-zus-gold transition-all active:scale-95"
          >
            <FileDown className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-100 p-4 rounded-2xl flex items-center gap-3 text-green-700 animate-scale-in">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-bold">Data telah berjaya disimpan secara lokal!</span>
        </div>
      )}

      {/* Main Form Sections */}
      <div className="space-y-6">
        {/* Section 1: Basic Info */}
        <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <Info className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-zus-900">Maklumat Asas</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-3 h-3" /> Tarikh Laporan
              </label>
              <input 
                type="date"
                name="tarikh"
                value={formData.tarikh}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 focus:border-zus-gold outline-none transition-all text-sm font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <User className="w-3 h-3" /> Disediakan Oleh
              </label>
              <input 
                type="text"
                name="disediakanOleh"
                placeholder="Nama Pegawai"
                value={formData.disediakanOleh}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 focus:border-zus-gold outline-none transition-all text-sm font-medium"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Narrative */}
        <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-zus-900">Ringkasan & Analisis</h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                Ringkasan Pencapaian Utama 2025
              </label>
              <textarea 
                name="ringkasan"
                rows={4}
                placeholder="Nyatakan pencapaian utama bahagian anda..."
                value={formData.ringkasan}
                onChange={handleInputChange}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 focus:border-zus-gold outline-none transition-all text-sm font-medium resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-3 h-3" /> Isu & Cabaran
                </label>
                <textarea 
                  name="isu"
                  rows={3}
                  placeholder="Isu yang dihadapi..."
                  value={formData.isu}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 focus:border-zus-gold outline-none transition-all text-sm font-medium resize-none"
                ></textarea>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <Lightbulb className="w-3 h-3" /> Cadangan Penambahbaikan
                </label>
                <textarea 
                  name="cadangan"
                  rows={3}
                  placeholder="Cadangan untuk 2026..."
                  value={formData.cadangan}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 focus:border-zus-gold outline-none transition-all text-sm font-medium resize-none"
                ></textarea>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Lawatan (Dynamic) */}
        <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zus-900">Rekod Lawatan</h3>
            </div>
            <button 
              onClick={addLawatan}
              className="flex items-center gap-1.5 text-zus-gold hover:text-zus-900 font-bold text-xs uppercase tracking-wider transition-colors"
            >
              <Plus className="w-4 h-4" /> Tambah Lawatan
            </button>
          </div>

          {(!formData.lawatan || formData.lawatan.length === 0) ? (
            <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-400 font-medium">Tiada rekod lawatan ditambah.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.lawatan.map((item, index) => (
                <div key={index} className="p-5 border border-gray-100 rounded-2xl bg-gray-50/50 relative group animate-slide-in-right">
                  <button 
                    onClick={() => removeLawatan(index)}
                    className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Jenis</label>
                      <select 
                        value={item.jenis}
                        onChange={(e) => updateLawatan(index, 'jenis', e.target.value)}
                        className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-zus-gold/20"
                      >
                        <option value="keluar">Lawatan Keluar</option>
                        <option value="masuk">Lawatan Masuk</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tajuk Agensi / Program</label>
                      <input 
                        type="text"
                        value={item.tajukAgensi}
                        onChange={(e) => updateLawatan(index, 'tajukAgensi', e.target.value)}
                        placeholder="Contoh: Lawatan Kerja ke MIS"
                        className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-zus-gold/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tarikh & Tempat</label>
                      <div className="flex gap-2">
                        <input 
                          type="date"
                          value={item.tarikh}
                          onChange={(e) => updateLawatan(index, 'tarikh', e.target.value)}
                          className="flex-1 p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-zus-gold/20"
                        />
                        <input 
                          type="text"
                          value={item.tempat}
                          onChange={(e) => updateLawatan(index, 'tempat', e.target.value)}
                          placeholder="Tempat"
                          className="flex-1 p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-zus-gold/20"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Objektif</label>
                      <input 
                        type="text"
                        value={item.objektif}
                        onChange={(e) => updateLawatan(index, 'objektif', e.target.value)}
                        placeholder="Tujuan lawatan..."
                        className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-zus-gold/20"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Footer Info */}
        <div className="flex items-center gap-2 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 text-blue-600">
          <AlertCircle className="w-4 h-4" />
          <p className="text-[10px] md:text-xs font-medium">
            Nota: Data anda disimpan secara automatik dalam pelayar ini. Pastikan anda menekan butang <strong>Simpan Draf</strong> sebelum menutup tab.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormEntry;
