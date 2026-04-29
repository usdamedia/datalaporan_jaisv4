import React from 'react';
import { Info, Calendar, User, FileText, MessageSquare, Lightbulb, Plus, Trash2, AlertCircle, Save, Loader2, Briefcase } from 'lucide-react';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { formatDateDDMMYYYYMY, getTodayIsoMY } from '../../utils/dateFormat';

interface CommonSectionsProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  addLawatan: () => void;
  removeLawatan: (index: number) => void;
  updateLawatan: (index: number, field: string, value: string) => void;
  handleSave?: () => void;
  isSaving?: boolean;
}

const autoGrowTextarea = (element: HTMLTextAreaElement | null) => {
  if (!element) return;
  element.style.height = 'auto';
  element.style.height = `${element.scrollHeight}px`;
};

const LAWATAN_MONTH_OPTIONS = [
  { value: '01', label: 'Januari' },
  { value: '02', label: 'Februari' },
  { value: '03', label: 'Mac' },
  { value: '04', label: 'April' },
  { value: '05', label: 'Mei' },
  { value: '06', label: 'Jun' },
  { value: '07', label: 'Julai' },
  { value: '08', label: 'Ogos' },
  { value: '09', label: 'September' },
  { value: '10', label: 'Oktober' },
  { value: '11', label: 'November' },
  { value: '12', label: 'Disember' }
];

const LAWATAN_DAY_OPTIONS = Array.from({ length: 31 }, (_, index) => String(index + 1).padStart(2, '0'));
const CURRENT_YEAR = new Date().getFullYear();
const LAWATAN_YEAR_OPTIONS = Array.from({ length: 21 }, (_, index) => String(CURRENT_YEAR - 5 + index));

const parseIsoDateParts = (value: string) => {
  const matched = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '');
  if (!matched) {
    return { year: '', month: '', day: '' };
  }

  return {
    year: matched[1],
    month: matched[2],
    day: matched[3]
  };
};

const buildIsoDate = (year: string, month: string, day: string) => {
  if (!year || !month || !day) return '';
  return `${year}-${month}-${day}`;
};

export const BasicInfoSection: React.FC<{ formData: any, handleInputChange: any, showDisemak?: boolean }> = ({ formData, handleInputChange, showDisemak = false }) => (
  <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
    <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-4">
      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
        <Info className="w-5 h-5" />
      </div>
      <h3 className="text-lg font-bold text-zus-900 sentence-case">Maklumat asas</h3>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-500 flex items-center gap-2 sentence-case">
          <Calendar className="w-3 h-3" /> Tarikh laporan
        </label>
        <div className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm font-medium text-slate-900">
          {formatDateDDMMYYYYMY(getTodayIsoMY())}
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-500 flex items-center gap-2 sentence-case">
          <User className="w-3 h-3" /> Disediakan oleh
        </label>
        <input 
          type="text"
          name="disediakanOleh"
          placeholder="Nama pegawai"
          value={formData.disediakanOleh}
          onChange={handleInputChange}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 focus:border-zus-gold outline-none transition-all text-sm font-medium"
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-500 flex items-center gap-2 sentence-case">
          <Briefcase className="w-3 h-3" /> Jawatan
        </label>
        <input 
          type="text"
          name="jawatan"
          placeholder="Jawatan pegawai"
          value={formData.jawatan}
          onChange={handleInputChange}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 focus:border-zus-gold outline-none transition-all text-sm font-medium"
        />
      </div>
    </div>

    {showDisemak && (
      <div className="mt-8 border-t border-gray-100 pt-8">
        <h4 className="text-sm font-black text-zus-900 sentence-case">Disemak Oleh</h4>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 sentence-case">Nama</label>
            <input
              type="text"
              name="disemakOleh"
              placeholder="Nama pegawai penyemak"
              value={formData.disemakOleh || ''}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 focus:border-zus-gold outline-none transition-all text-sm font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 sentence-case">Jawatan</label>
            <input
              type="text"
              name="disemakJawatan"
              placeholder="Jawatan pegawai penyemak"
              value={formData.disemakJawatan || ''}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 focus:border-zus-gold outline-none transition-all text-sm font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 sentence-case">Tarikh</label>
            <input
              type="date"
              lang="en-GB"
              name="disemakTarikh"
              value={formData.disemakTarikh || ''}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 focus:border-zus-gold outline-none transition-all text-sm font-medium"
            />
          </div>
        </div>
      </div>
    )}

    <div className="mt-8 border-t border-gray-100 pt-8">
      <h4 className="text-sm font-black text-zus-900 sentence-case">Disahkan Oleh</h4>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 sentence-case">Nama</label>
          <input
            type="text"
            name="disahkanOleh"
            placeholder="Nama penyemak / penyelaras"
            value={formData.disahkanOleh || ''}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 focus:border-zus-gold outline-none transition-all text-sm font-medium"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 sentence-case">Jawatan</label>
          <input
            type="text"
            name="disahkanJawatan"
            placeholder="Jawatan pegawai pengesah"
            value={formData.disahkanJawatan || ''}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 focus:border-zus-gold outline-none transition-all text-sm font-medium"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 sentence-case">Tarikh</label>
          <input
            type="date"
            lang="en-GB"
            name="disahkanTarikh"
            value={formData.disahkanTarikh || ''}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 focus:border-zus-gold outline-none transition-all text-sm font-medium"
          />
        </div>
      </div>
    </div>
  </section>
);

export const NarrativeSection: React.FC<{ formData: any, handleInputChange: any }> = ({ formData, handleInputChange }) => (
  <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
    <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-4">
      <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
        <FileText className="w-5 h-5" />
      </div>
      <h3 className="text-lg font-bold text-zus-900 sentence-case">Ringkasan & analisis</h3>
    </div>

    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-500 flex items-center gap-2 sentence-case">
          Ringkasan pencapaian utama unit tahun 2025
        </label>
        <textarea 
          name="ringkasan"
          rows={4}
          placeholder="Nyatakan pencapaian utama bahagian anda..."
          value={formData.ringkasan}
          onChange={handleInputChange}
          ref={(element) => autoGrowTextarea(element)}
          onInput={(event) => autoGrowTextarea(event.currentTarget)}
          className="w-full min-h-32 overflow-hidden p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 focus:border-zus-gold outline-none transition-all text-sm font-medium resize-none"
        ></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 flex items-center gap-2 sentence-case">
            <MessageSquare className="w-3 h-3" /> Isu dan cabaran unit
          </label>
          <textarea 
            name="isu"
            rows={3}
          placeholder="Isu yang dihadapi..."
          value={formData.isu}
          onChange={handleInputChange}
            ref={(element) => autoGrowTextarea(element)}
            onInput={(event) => autoGrowTextarea(event.currentTarget)}
            className="w-full min-h-28 overflow-hidden p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 focus:border-zus-gold outline-none transition-all text-sm font-medium resize-none"
          ></textarea>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 flex items-center gap-2 sentence-case">
            <Lightbulb className="w-3 h-3" /> Cadangan penambahbaikan / way forward unit
          </label>
          <textarea 
            name="cadangan"
            rows={3}
          placeholder="Cadangan untuk 2026..."
          value={formData.cadangan}
          onChange={handleInputChange}
            ref={(element) => autoGrowTextarea(element)}
            onInput={(event) => autoGrowTextarea(event.currentTarget)}
            className="w-full min-h-28 overflow-hidden p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 focus:border-zus-gold outline-none transition-all text-sm font-medium resize-none"
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
  isSaving?: boolean,
  readOnly?: boolean,
  useMuiDatePicker?: boolean
}> = ({ 
  formData, addLawatan, removeLawatan, updateLawatan, handleSave, isSaving, readOnly = false, useMuiDatePicker = true
}) => (
  <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
    <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
          <Calendar className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-zus-900 sentence-case">Rekod lawatan</h3>
      </div>
      <div className="flex items-center gap-4">
        {formData.lawatan && formData.lawatan.length > 0 && handleSave && !readOnly && (
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-zus-900 text-white px-4 py-2 rounded-xl font-bold text-xs sentence-case tracking-wider transition-all hover:bg-zus-700 active:scale-95 disabled:opacity-70"
          >
            {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            Simpan rekod
          </button>
        )}
        {!readOnly && (
          <button 
            onClick={addLawatan}
            className="flex items-center gap-2 text-zus-gold hover:text-zus-900 font-bold text-xs sentence-case tracking-wider transition-colors"
          >
            <Plus className="w-4 h-4" /> Tambah lawatan
          </button>
        )}
      </div>
    </div>

    {(!formData.lawatan || formData.lawatan.length === 0) ? (
      <div className="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
        <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
        <p className="text-sm text-gray-400 font-medium sentence-case">Tiada rekod lawatan ditambah.</p>
      </div>
    ) : (
      <div className="space-y-4">
        {formData.lawatan.map((item: any, index: number) => (
          <div key={index} className="relative rounded-2xl border border-gray-100 bg-gray-50/50 p-5 animate-slide-in-right md:p-6">
            {!readOnly && (
              <button 
                onClick={() => removeLawatan(index)}
                className="absolute right-4 top-4 rounded-xl p-2 text-gray-300 transition-all hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 sentence-case">Jenis</label>
                      <select 
                        value={item.jenis}
                        onChange={(e) => updateLawatan(index, 'jenis', e.target.value)}
                        disabled={readOnly}
                        className={`h-12 w-full rounded-2xl border border-gray-200 px-4 text-sm font-bold outline-none ${readOnly ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : 'bg-white focus:border-zus-gold/40 focus:ring-2 focus:ring-zus-gold/20'}`}
                      >
                        <option value="keluar">Lawatan Keluar</option>
                        <option value="masuk">Lawatan Masuk</option>
                      </select>
                    </div>
                    <div className="space-y-2 lg:col-span-2">
                      <label className="text-xs font-bold text-gray-400 sentence-case">Tajuk agensi / program</label>
                      <textarea 
                        value={item.tajukAgensi}
                        onChange={(e) => updateLawatan(index, 'tajukAgensi', e.target.value)}
                        onInput={(e) => autoGrowTextarea(e.currentTarget)}
                        ref={(el) => autoGrowTextarea(el)}
                        placeholder="Contoh: Lawatan Kerja ke MIS"
                        rows={1}
                        readOnly={readOnly}
                        className={`min-h-12 w-full resize-none overflow-hidden rounded-2xl border border-gray-200 px-4 py-3 text-sm font-medium leading-relaxed outline-none ${readOnly ? 'bg-gray-100 text-gray-700 cursor-not-allowed' : 'bg-white focus:border-zus-gold/40 focus:ring-2 focus:ring-zus-gold/20'}`}
                      />
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(14rem,0.85fr)_minmax(15rem,1fr)_minmax(18rem,1.45fr)]">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 sentence-case">Tarikh</label>
                        <div className="relative w-full">
                          {useMuiDatePicker ? (
                            <DatePicker
                              value={item.tarikh ? dayjs(item.tarikh) : null}
                              onChange={(newValue) => updateLawatan(index, 'tarikh', newValue?.isValid() ? newValue.format('YYYY-MM-DD') : '')}
                              disabled={readOnly}
	                              format="DD/MM/YYYY"
	                              slotProps={{
	                                textField: {
	                                  fullWidth: true,
	                                  size: 'small',
	                                  variant: 'outlined',
	                                  slotProps: {
	                                    htmlInput: {
	                                      'aria-label': 'Pilih tarikh lawatan',
	                                    },
	                                  },
	                                },
	                              }}
                              sx={{
                                width: '100%',
                                '& .MuiInputBase-root': {
                                  height: 48,
                                  borderRadius: '1rem',
                                  backgroundColor: readOnly ? '#f3f4f6' : '#ffffff',
                                  color: '#1e293b',
                                  fontFamily: 'inherit',
                                  fontSize: '0.875rem',
                                  fontWeight: 800,
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#e5e7eb',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#d1d5db',
                                },
                                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#c5a065 !important',
                                  borderWidth: '1px',
                                },
                                '& .MuiInputBase-input': {
                                  padding: '0.75rem 0.875rem',
                                },
                              }}
                            />
                          ) : (
                            <>
                              <Calendar className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                              <input
                                type="date"
                                value={item.tarikh || ''}
                                onChange={(e) => updateLawatan(index, 'tarikh', e.target.value)}
                                disabled={readOnly}
                                className={`h-12 w-full rounded-2xl border border-gray-200 px-4 pl-11 text-sm font-bold leading-none text-slate-800 outline-none ${readOnly ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : 'bg-white focus:border-zus-gold/40 focus:ring-2 focus:ring-zus-gold/20'}`}
                              />
                            </>
                          )}
                        </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 sentence-case">Tempat</label>
                      <textarea
                        value={item.tempat}
                        onChange={(e) => updateLawatan(index, 'tempat', e.target.value)}
                        placeholder="Tempat"
                        rows={2}
                        readOnly={readOnly}
                        className={`min-h-[4.75rem] w-full resize-y rounded-2xl border border-gray-200 px-4 py-3 text-sm font-medium leading-relaxed outline-none ${readOnly ? 'bg-gray-100 text-gray-700 cursor-not-allowed' : 'bg-white focus:border-zus-gold/40 focus:ring-2 focus:ring-zus-gold/20'}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 sentence-case">Objektif</label>
                      <textarea 
                        value={item.objektif}
                        onChange={(e) => updateLawatan(index, 'objektif', e.target.value)}
                        onInput={(e) => autoGrowTextarea(e.currentTarget)}
                        ref={(el) => autoGrowTextarea(el)}
                        placeholder="Tujuan lawatan..."
                        rows={1}
                        readOnly={readOnly}
                        className={`min-h-[4.75rem] w-full resize-none overflow-hidden rounded-2xl border border-gray-200 px-4 py-3 text-sm font-medium leading-relaxed outline-none ${readOnly ? 'bg-gray-100 text-gray-700 cursor-not-allowed' : 'bg-white focus:border-zus-gold/40 focus:ring-2 focus:ring-zus-gold/20'}`}
                      />
                    </div>
                  </div>
          </div>
        ))}
      </div>
    )}
  </section>
);
