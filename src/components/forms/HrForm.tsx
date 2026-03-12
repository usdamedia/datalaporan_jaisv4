import React, { useEffect } from 'react';
import { Users, UserCheck, PieChart, Briefcase, UserMinus, Info } from 'lucide-react';
import { HR_2024_REFERENCE } from '../../constants';
import FormLayout from './FormLayout';
import { BasicInfoSection, NarrativeSection, LawatanSection } from './CommonSections';
import { useFormLogic } from './useFormLogic';

interface HrFormProps {
  deptName: string;
  onBack: () => void;
}

const HrForm: React.FC<HrFormProps> = ({ deptName, onBack }) => {
  const initialState = {
    tarikh: new Date().toISOString().split('T')[0],
    disediakanOleh: '',
    jawatan: '',
    ringkasan: '',
    isu: '',
    cadangan: '',
    lawatan: [],
    hr: {
      ringkasan: {
        perjawatanBajet: 0,
        perjawatanDiisi: 0,
        jumlahWargaKerja: 0
      },
      demografi: {
        lelaki: 0,
        wanita: 0
      },
      skim: {
        jusa: 0,
        halEhwalIslam: 0,
        perundangan: 0,
        kewangan: 0,
        keselamatan: 0,
        pendidikan: 0,
        kejuruteraan: 0,
        pentadbiran: 0,
        pembantuAm: 0
      },
      sangkutan: {
        mis: 0,
        jakim: {
          penyeliaKafa: 0,
          penggerak: 0,
          takmir: 0
        }
      },
      bersara: 0
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

  // Auto-calculate total warga kerja based on gender
  useEffect(() => {
    const total = (Number(formData.hr.demografi.lelaki) || 0) + (Number(formData.hr.demografi.wanita) || 0);
    if (total !== formData.hr.ringkasan.jumlahWargaKerja) {
      setFormData((prev: any) => ({
        ...prev,
        hr: {
          ...prev.hr,
          ringkasan: {
            ...prev.hr.ringkasan,
            jumlahWargaKerja: total
          }
        }
      }));
    }
  }, [formData.hr.demografi.lelaki, formData.hr.demografi.wanita]);

  const handleHrChange = (section: string, field: string, value: any, subField?: string) => {
    setFormData((prev: any) => {
      const newHr = { ...prev.hr };
      if (subField) {
        newHr[section] = {
          ...newHr[section],
          [field]: {
            ...newHr[section][field],
            [subField]: value
          }
        };
      } else {
        newHr[section] = {
          ...newHr[section],
          [field]: value
        };
      }
      return { ...prev, hr: newHr };
    });
  };

  const handleSimpleHrChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      hr: { ...prev.hr, [field]: value }
    }));
  };

  const totalSangkutan = (Number(formData.hr.sangkutan.mis) || 0) + 
                         (Number(formData.hr.sangkutan.jakim.penyeliaKafa) || 0) + 
                         (Number(formData.hr.sangkutan.jakim.penggerak) || 0) + 
                         (Number(formData.hr.sangkutan.jakim.takmir) || 0);

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

      {/* Ringkasan Perjawatan */}
      <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-zus-900">Ringkasan Perjawatan 2025</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Perjawatan (Bajet)</label>
            <div className="text-[10px] font-bold text-gray-400 mb-1">Rujukan 2024: {HR_2024_REFERENCE.ringkasan.perjawatanBajet}</div>
            <input 
              type="number"
              value={formData.hr.ringkasan.perjawatanBajet}
              onChange={(e) => handleHrChange('ringkasan', 'perjawatanBajet', parseInt(e.target.value) || 0)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 outline-none transition-all text-sm font-bold"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Perjawatan Diisi</label>
            <div className="text-[10px] font-bold text-gray-400 mb-1">Rujukan 2024: {HR_2024_REFERENCE.ringkasan.perjawatanDiisi}</div>
            <input 
              type="number"
              value={formData.hr.ringkasan.perjawatanDiisi}
              onChange={(e) => handleHrChange('ringkasan', 'perjawatanDiisi', parseInt(e.target.value) || 0)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-zus-gold/20 outline-none transition-all text-sm font-bold"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Jumlah Warga Kerja</label>
            <div className="text-[10px] font-bold text-gray-400 mb-1">Rujukan 2024: {HR_2024_REFERENCE.ringkasan.jumlahWargaKerja}</div>
            <div className="w-full p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-sm font-black text-emerald-700">
              {formData.hr.ringkasan.jumlahWargaKerja}
            </div>
            <p className="text-[10px] text-gray-400 italic">* Dikira automatik dari jantina</p>
          </div>
        </div>
      </section>

      {/* Pecahan Jantina */}
      <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <PieChart className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-zus-900">Pecahan Jantina</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4 p-5 bg-blue-50/30 border border-blue-100 rounded-2xl">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-blue-900">Lelaki</label>
              <span className="text-[10px] font-bold text-blue-400 uppercase">Rujukan 2024: {HR_2024_REFERENCE.demografi.lelaki}</span>
            </div>
            <input 
              type="number"
              value={formData.hr.demografi.lelaki}
              onChange={(e) => handleHrChange('demografi', 'lelaki', parseInt(e.target.value) || 0)}
              className="w-full p-3 bg-white border border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm font-bold"
            />
          </div>
          <div className="space-y-4 p-5 bg-pink-50/30 border border-pink-100 rounded-2xl">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-pink-900">Wanita</label>
              <span className="text-[10px] font-bold text-pink-400 uppercase">Rujukan 2024: {HR_2024_REFERENCE.demografi.wanita}</span>
            </div>
            <input 
              type="number"
              value={formData.hr.demografi.wanita}
              onChange={(e) => handleHrChange('demografi', 'wanita', parseInt(e.target.value) || 0)}
              className="w-full p-3 bg-white border border-pink-100 rounded-xl focus:ring-2 focus:ring-pink-200 outline-none transition-all text-sm font-bold"
            />
          </div>
        </div>
      </section>

      {/* Skim Perkhidmatan */}
      <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 bg-zus-900 rounded-xl flex items-center justify-center text-zus-gold">
            <Briefcase className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-zus-900">Pecahan Skim Perkhidmatan</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'JUSA', field: 'jusa', ref: HR_2024_REFERENCE.skim.jusa },
            { label: 'Hal Ehwal Islam', field: 'halEhwalIslam', ref: HR_2024_REFERENCE.skim.halEhwalIslam },
            { label: 'Perundangan & Kehakiman', field: 'perundangan', ref: HR_2024_REFERENCE.skim.perundangan },
            { label: 'Kewangan', field: 'kewangan', ref: HR_2024_REFERENCE.skim.kewangan },
            { label: 'Keselamatan', field: 'keselamatan', ref: HR_2024_REFERENCE.skim.keselamatan },
            { label: 'Pendidikan', field: 'pendidikan', ref: HR_2024_REFERENCE.skim.pendidikan },
            { label: 'Kejuruteraan', field: 'kejuruteraan', ref: HR_2024_REFERENCE.skim.kejuruteraan },
            { label: 'Pentadbiran & Sokongan', field: 'pentadbiran', ref: HR_2024_REFERENCE.skim.pentadbiran },
            { label: 'Pembantu Am & Pemandu', field: 'pembantuAm', ref: HR_2024_REFERENCE.skim.pembantuAm },
          ].map((item) => (
            <div key={item.field} className="p-4 bg-gray-50 border border-gray-100 rounded-xl hover:border-emerald-200 transition-colors">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-500 uppercase leading-tight h-8">{item.label}</label>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] font-bold text-gray-400">2024: {item.ref}</span>
                  <input 
                    type="number"
                    value={formData.hr.skim[item.field as keyof typeof formData.hr.skim]}
                    onChange={(e) => handleHrChange('skim', item.field, parseInt(e.target.value) || 0)}
                    className="w-20 p-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Kakitangan Sangkutan */}
      <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-zus-900">Kakitangan Sangkutan</h3>
          </div>
          <div className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-black">
            Total: {totalSangkutan}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* MIS */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-indigo-900 uppercase tracking-widest flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div> Majlis Islam Sarawak (MIS)
            </h4>
            <div className="p-5 bg-indigo-50/30 border border-indigo-100 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-indigo-700">Pekhidmat MIS</label>
                <span className="text-[10px] font-bold text-indigo-400 uppercase">2024: {HR_2024_REFERENCE.sangkutan.mis}</span>
              </div>
              <input 
                type="number"
                value={formData.hr.sangkutan.mis}
                onChange={(e) => handleHrChange('sangkutan', 'mis', parseInt(e.target.value) || 0)}
                className="w-full p-3 bg-white border border-indigo-100 rounded-xl focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm font-bold"
              />
            </div>
          </div>

          {/* JAKIM */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-zus-900 uppercase tracking-widest flex items-center gap-2">
              <div className="w-2 h-2 bg-zus-gold rounded-full"></div> JAKIM
            </h4>
            <div className="p-5 bg-zus-50/30 border border-zus-100 rounded-2xl space-y-4">
              <div className="space-y-3">
                {[
                  { label: 'Penyelia KAFA', field: 'penyeliaKafa', ref: HR_2024_REFERENCE.sangkutan.jakim.penyeliaKafa },
                  { label: 'Penggerak Masyarakat', field: 'penggerak', ref: HR_2024_REFERENCE.sangkutan.jakim.penggerak },
                  { label: 'Takmir & Penyelaras', field: 'takmir', ref: HR_2024_REFERENCE.sangkutan.jakim.takmir },
                ].map((item) => (
                  <div key={item.field} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-zus-900">{item.label}</label>
                      <span className="text-[9px] font-bold text-zus-400">2024: {item.ref}</span>
                    </div>
                    <input 
                      type="number"
                      value={formData.hr.sangkutan.jakim[item.field as keyof typeof formData.hr.sangkutan.jakim]}
                      onChange={(e) => handleHrChange('sangkutan', 'jakim', parseInt(e.target.value) || 0, item.field)}
                      className="w-full p-2.5 bg-white border border-zus-100 rounded-xl focus:ring-2 focus:ring-zus-gold/20 outline-none transition-all text-sm font-bold"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Persaraan */}
      <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
            <UserMinus className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-zus-900">Kakitangan Bersara</h3>
        </div>

        <div className="p-6 bg-red-50/30 border border-red-100 rounded-2xl flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 space-y-1">
            <h4 className="text-sm font-bold text-red-900">Jumlah Keseluruhan Bersara 2025</h4>
            <p className="text-xs text-red-600 font-medium">Sila masukkan jumlah kakitangan yang telah atau akan bersara pada tahun ini.</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Rujukan 2024: {HR_2024_REFERENCE.bersara}</span>
            <input 
              type="number"
              value={formData.hr.bersara}
              onChange={(e) => handleSimpleHrChange('bersara', parseInt(e.target.value) || 0)}
              className="w-32 p-4 bg-white border border-red-200 rounded-2xl text-xl font-black text-center text-red-700 focus:ring-4 focus:ring-red-100 outline-none transition-all"
            />
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
    </FormLayout>
  );
};

export default HrForm;
