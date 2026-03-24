import React from 'react';
import { Info, Calendar, User, FileText, MessageSquare, Lightbulb, Plus, Trash2, AlertCircle, Save, Loader2, Briefcase } from 'lucide-react';

interface CommonSectionsProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  addLawatan: () => void;
  removeLawatan: (index: number) => void;
  updateLawatan: (index: number, field: string, value: string) => void;
  handleSave?: () => void;
  isSaving?: boolean;
}

export const BasicInfoSection: React.FC<{ formData: any, handleInputChange: any }> = ({ formData, handleInputChange }) => (
  <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
    <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
        <Info className="w-5 h-5" />
      </div>
      <h3 className="text-lg font-bold text-zus-900">Maklumat Asas</h3>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label htmlFor="tarikh" className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
          <Calendar className="w-3 h-3" /> Tarikh Laporan
        </label>
        <input 
          id="tarikh"
          type="date"
          name="tarikh"
          value={formData.tarikh}
          onChange={handleInputChange}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 focus:border-zus-gold outline-none transition-all text-sm font-medium"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="disediakanOleh" className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
          <User className="w-3 h-3" /> Disediakan Oleh
        </label>
        <input 
          id="disediakanOleh"
          type="text"
          name="disediakanOleh"
          placeholder="Nama Pegawai"
          value={formData.disediakanOleh}
          onChange={handleInputChange}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 focus:border-zus-gold outline-none transition-all text-sm font-medium"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="jawatan" className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
          <Briefcase className="w-3 h-3" /> Jawatan
        </label>
        <input 
          id="jawatan"
          type="text"
          name="jawatan"
          placeholder="Jawatan Pegawai"
          value={formData.jawatan}
          onChange={handleInputChange}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 focus:border-zus-gold outline-none transition-all text-sm font-medium"
        />
      </div>
    </div>
  </section>
);

export const NarrativeSection: React.FC<{ formData: any, handleInputChange: any }> = ({ formData, handleInputChange }) => (
  <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
    <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
      <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
        <FileText className="w-5 h-5" />
      </div>
      <h3 className="text-lg font-bold text-zus-900">Ringkasan & Analisis</h3>
    </div>

    <div className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="ringkasan" className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
          Ringkasan Pencapaian Utama 2025
        </label>
        <textarea 
          id="ringkasan"
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
          <label htmlFor="isu" className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <MessageSquare className="w-3 h-3" /> Isu & Cabaran
          </label>
          <textarea 
            id="isu"
            name="isu"
            rows={3}
            placeholder="Isu yang dihadapi..."
            value={formData.isu}
            onChange={handleInputChange}
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 focus:border-zus-gold outline-none transition-all text-sm font-medium resize-none"
          ></textarea>
        </div>
        <div className="space-y-2">
          <label htmlFor="cadangan" className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <Lightbulb className="w-3 h-3" /> Cadangan Penambahbaikan
          </label>
          <textarea 
            id="cadangan"
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
);

export const LawatanSection: React.FC<{ 
  formData: any, 
  addLawatan: any, 
  removeLawatan: any, 
  updateLawatan: any,
  handleSave?: any,
  isSaving?: boolean
}> = ({ 
  formData, addLawatan, removeLawatan, updateLawatan, handleSave, isSaving 
}) => (
  <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
    <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
          <Calendar className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-zus-900">Rekod Lawatan</h3>
      </div>
      <div className="flex items-center gap-4">
        {formData.lawatan && formData.lawatan.length > 0 && handleSave && (
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-1.5 bg-zus-900 text-white px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all hover:bg-zus-700 active:scale-95 disabled:opacity-70"
          >
            {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            Simpan Rekod
          </button>
        )}
        <button 
          onClick={addLawatan}
          className="flex items-center gap-1.5 text-zus-gold hover:text-zus-900 font-bold text-xs uppercase tracking-wider transition-colors"
        >
          <Plus className="w-4 h-4" /> Tambah Lawatan
        </button>
      </div>
    </div>

    {(!formData.lawatan || formData.lawatan.length === 0) ? (
      <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
        <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
        <p className="text-sm text-gray-400 font-medium">Tiada rekod lawatan ditambah.</p>
      </div>
    ) : (
      <div className="space-y-4">
        {formData.lawatan.map((item: any, index: number) => (
          <div key={index} className="p-5 border border-gray-100 rounded-2xl bg-gray-50/50 relative group animate-slide-in-right">
            <button 
              onClick={() => removeLawatan(index)}
              aria-label="Buang Lawatan"
              className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="space-y-1.5">
                <label htmlFor={`jenis-${index}`} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Jenis</label>
                <select 
                  id={`jenis-${index}`}
                  value={item.jenis}
                  onChange={(e) => updateLawatan(index, 'jenis', e.target.value)}
                  className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-zus-gold/20"
                >
                  <option value="keluar">Lawatan Keluar</option>
                  <option value="masuk">Lawatan Masuk</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label htmlFor={`tajukAgensi-${index}`} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tajuk Agensi / Program</label>
                <input 
                  id={`tajukAgensi-${index}`}
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
                <label htmlFor={`tarikh-${index}`} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tarikh & Tempat</label>
                <div className="flex gap-2">
                  <input 
                    id={`tarikh-${index}`}
                    type="date"
                    value={item.tarikh}
                    onChange={(e) => updateLawatan(index, 'tarikh', e.target.value)}
                    className="flex-1 p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-zus-gold/20"
                  />
                  <input 
                    id={`tempat-${index}`}
                    type="text"
                    aria-label={`Tempat untuk lawatan ${index + 1}`}
                    value={item.tempat}
                    onChange={(e) => updateLawatan(index, 'tempat', e.target.value)}
                    placeholder="Tempat"
                    className="flex-1 p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-zus-gold/20"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label htmlFor={`objektif-${index}`} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Objektif</label>
                <input 
                  id={`objektif-${index}`}
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
);
