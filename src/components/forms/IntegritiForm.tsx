import React, { useMemo } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Video, 
  FileText, 
  Link as LinkIcon,
  Plus,
  Trash2,
  LayoutDashboard,
  Award,
  Calendar,
  Building,
  AlertCircle,
  Lightbulb,
  CheckCircle2,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import FormLayout from './FormLayout';
import { useFormLogic } from './useFormLogic';
import { INTEGRITI_2024_REFERENCE, QUALITY_INITIATIVES_2024_REFERENCE } from '../../constants';

const IntegritiForm: React.FC<{ deptName: string; onBack: () => void }> = ({ deptName, onBack }) => {
  const {
    formData,
    setFormData,
    handleSave,
    isSaving,
    showSuccess,
    saveError
  } = useFormLogic('INTEGRITI', {
    integriti: {
      tadbirUrus: {
        mesyuarat: '',
        program: ''
      },
      multimedia: {
        video: ''
      },
      dokumentasi: {
        manual: '',
        polisi: '',
        links: []
      }
    },
    quality: {
      iso9001: {
        badanAudit: '',
        tarikhAudit: '',
        status: '',
        ncr: '',
        ofi: ''
      },
      iso37001: {
        badanAudit: '',
        tarikhAudit: '',
        status: '',
        ncr: '',
        ofi: ''
      },
      frameworks: {
        mbef: false,
        scsScorecard: false,
        eksa: false
      },
      additionalInitiatives: []
    }
  });

  const handleNestedInputChange = (section: string, subSection: string, value: string) => {
    const numValue = value === '' ? '' : Math.max(0, parseInt(value));
    setFormData((prev: any) => ({
      ...prev,
      integriti: {
        ...prev.integriti,
        [section]: {
          ...prev.integriti[section],
          [subSection]: numValue
        }
      }
    }));
  };

  const handleISOChange = (iso: 'iso9001' | 'iso37001', field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      quality: {
        ...prev.quality,
        [iso]: {
          ...prev.quality[iso],
          [field]: value
        }
      }
    }));
  };

  const toggleFramework = (framework: string) => {
    setFormData((prev: any) => ({
      ...prev,
      quality: {
        ...prev.quality,
        frameworks: {
          ...prev.quality.frameworks,
          [framework]: !prev.quality.frameworks[framework]
        }
      }
    }));
  };

  const addInitiative = () => {
    setFormData((prev: any) => ({
      ...prev,
      quality: {
        ...prev.quality,
        additionalInitiatives: [
          ...prev.quality.additionalInitiatives,
          { title: '', status: '' }
        ]
      }
    }));
  };

  const updateInitiative = (index: number, field: string, value: string) => {
    setFormData((prev: any) => {
      const newInitiatives = [...prev.quality.additionalInitiatives];
      newInitiatives[index] = { ...newInitiatives[index], [field]: value };
      return {
        ...prev,
        quality: {
          ...prev.quality,
          additionalInitiatives: newInitiatives
        }
      };
    });
  };

  const removeInitiative = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      quality: {
        ...prev.quality,
        additionalInitiatives: prev.quality.additionalInitiatives.filter((_: any, i: number) => i !== index)
      }
    }));
  };

  const addLink = () => {
    setFormData((prev: any) => ({
      ...prev,
      integriti: {
        ...prev.integriti,
        dokumentasi: {
          ...prev.integriti.dokumentasi,
          links: [...prev.integriti.dokumentasi.links, { title: '', url: '' }]
        }
      }
    }));
  };

  const updateLink = (index: number, field: string, value: string) => {
    setFormData((prev: any) => {
      const newLinks = [...prev.integriti.dokumentasi.links];
      newLinks[index] = { ...newLinks[index], [field]: value };
      return {
        ...prev,
        integriti: {
          ...prev.integriti,
          dokumentasi: {
            ...prev.integriti.dokumentasi,
            links: newLinks
          }
        }
      };
    });
  };

  const removeLink = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      integriti: {
        ...prev.integriti,
        dokumentasi: {
          ...prev.integriti.dokumentasi,
          links: prev.integriti.dokumentasi.links.filter((_: any, i: number) => i !== index)
        }
      }
    }));
  };

  const totalDokumen = useMemo(() => {
    return (parseInt(formData.integriti.dokumentasi.manual) || 0) + (parseInt(formData.integriti.dokumentasi.polisi) || 0);
  }, [formData.integriti.dokumentasi]);

  const isCertified = useMemo(() => {
    return formData.quality.iso9001.status.toLowerCase().includes('recommend') || 
           formData.quality.iso37001.status.toLowerCase().includes('recommend');
  }, [formData.quality.iso9001.status, formData.quality.iso37001.status]);

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
      {/* Z-Pattern: Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#FDE047] p-6 rounded-3xl shadow-lg border-b-4 border-yellow-500 text-zus-900">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-zus-900/40" />
            <p className="text-zus-900/60 text-[10px] font-black uppercase tracking-widest">Jumlah Program</p>
          </div>
          <h3 className="text-3xl font-black">{formData.integriti.tadbirUrus.program || 0}</h3>
          <p className="text-zus-900/40 text-[10px] mt-1">Ref 2024: {INTEGRITI_2024_REFERENCE.tadbirUrus.program}</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <LayoutDashboard className="w-5 h-5 text-yellow-500" />
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Mesyuarat Tatakelola</p>
          </div>
          <h3 className="text-3xl font-black text-zus-900">{formData.integriti.tadbirUrus.mesyuarat || 0}</h3>
          <p className="text-gray-300 text-[10px] mt-1">Ref 2024: {INTEGRITI_2024_REFERENCE.tadbirUrus.mesyuarat}</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-5 h-5 text-yellow-500" />
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Jumlah Dokumen</p>
          </div>
          <h3 className="text-3xl font-black text-zus-900">{totalDokumen}</h3>
          <p className="text-gray-300 text-[10px] mt-1">Ref 2024: {INTEGRITI_2024_REFERENCE.dokumentasi.total}</p>
        </div>

        <div className={`p-6 rounded-3xl shadow-sm border-2 flex flex-col justify-center ${isCertified ? 'bg-teal-50 border-teal-200 text-teal-700' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
          <div className="flex items-center gap-3 mb-2">
            <Award className={`w-5 h-5 ${isCertified ? 'text-teal-500' : 'text-gray-400'}`} />
            <p className="text-[10px] font-black uppercase tracking-widest">Status ISO</p>
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest">
            {isCertified ? 'Certified' : 'Pending'}
          </h3>
        </div>
      </div>

      {/* F-Pattern: Detailed Entry */}
      <div className="space-y-12">
        {/* Section 1: Integriti Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Documentation & Multimedia */}
          <div className="space-y-8">
            {/* Tadbir Urus & Aktiviti */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 bg-gray-50 border-b border-gray-100 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-yellow-600" />
                <h3 className="text-sm font-black text-zus-900 uppercase">Tadbir Urus & Aktiviti</h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 ml-1">Bilangan Mesyuarat Jawatankuasa Tatakelola</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.integriti.tadbirUrus.mesyuarat}
                    onChange={(e) => handleNestedInputChange('tadbirUrus', 'mesyuarat', e.target.value)}
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-yellow-400"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 ml-1">Bilangan Program / Aktiviti Integriti</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.integriti.tadbirUrus.program}
                    onChange={(e) => handleNestedInputChange('tadbirUrus', 'program', e.target.value)}
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-yellow-400"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Multimedia */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 bg-gray-50 border-b border-gray-100 flex items-center gap-3">
                <Video className="w-5 h-5 text-yellow-600" />
                <h3 className="text-sm font-black text-zus-900 uppercase">Kandungan Multimedia</h3>
              </div>
              <div className="p-6">
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 ml-1">Bilangan Video Integriti Dihasilkan</label>
                <input
                  type="number"
                  min="0"
                  value={formData.integriti.multimedia.video}
                  onChange={(e) => handleNestedInputChange('multimedia', 'video', e.target.value)}
                  className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-yellow-400"
                  placeholder="0"
                />
                <p className="text-[10px] text-gray-400 italic mt-2">* Termasuk video pertandingan integriti.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Documentation Details */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 bg-[#FDE047] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-zus-900" />
                  <h3 className="text-lg font-black text-zus-900 uppercase tracking-tight">Dokumentasi Integriti</h3>
                </div>
                <div className="bg-zus-900 text-white px-4 py-1.5 rounded-full text-xs font-black">
                  JUMLAH: {totalDokumen}
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 ml-1">Manual</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.integriti.dokumentasi.manual}
                      onChange={(e) => handleNestedInputChange('dokumentasi', 'manual', e.target.value)}
                      className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-yellow-400"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 ml-1">Polisi</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.integriti.dokumentasi.polisi}
                      onChange={(e) => handleNestedInputChange('dokumentasi', 'polisi', e.target.value)}
                      className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-yellow-400"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pautan Dokumen / PDF</h4>
                    <button
                      onClick={addLink}
                      className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-[10px] font-black hover:bg-yellow-200 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      TAMBAH PAUTAN
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {formData.integriti.dokumentasi.links.map((link: any, idx: number) => (
                      <div key={idx} className="flex gap-3 items-start group">
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={link.title}
                            onChange={(e) => updateLink(idx, 'title', e.target.value)}
                            placeholder="Tajuk Dokumen (cth: Polisi Whistleblowing)"
                            className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 text-xs focus:ring-2 focus:ring-yellow-400"
                          />
                          <div className="relative">
                            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                            <input
                              type="text"
                              value={link.url}
                              onChange={(e) => updateLink(idx, 'url', e.target.value)}
                              placeholder="https://..."
                              className="w-full bg-gray-50 border-none rounded-xl pl-8 pr-4 py-2 text-xs focus:ring-2 focus:ring-yellow-400"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => removeLink(idx)}
                          className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {formData.integriti.dokumentasi.links.length === 0 && (
                      <div className="text-center py-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                        <p className="text-gray-400 text-[10px] font-bold uppercase">Tiada pautan dokumen</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Inisiatif Kualiti */}
        <div className="pt-8 border-t-4 border-teal-500">
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-8 h-8 text-teal-600" />
            <h2 className="text-2xl font-black text-zus-900 tracking-tight uppercase">Inisiatif Kualiti</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* ISO 9001:2015 Card */}
            <div className="bg-[#0D9488] rounded-3xl shadow-xl overflow-hidden border-b-8 border-teal-900">
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-white" />
                  <h3 className="text-lg font-black text-white uppercase tracking-tight">ISO 9001:2015</h3>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-teal-100 uppercase ml-1">Tarikh Audit</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-200" />
                      <input
                        type="text"
                        value={formData.quality.iso9001.tarikhAudit}
                        onChange={(e) => handleISOChange('iso9001', 'tarikhAudit', e.target.value)}
                        className="w-full bg-white/10 border-none rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-teal-200/50 focus:ring-2 focus:ring-white/20"
                        placeholder="Contoh: 20-21 Mei 2025"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-teal-100 uppercase ml-1">Badan Audit</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-200" />
                      <input
                        type="text"
                        value={formData.quality.iso9001.badanAudit}
                        onChange={(e) => handleISOChange('iso9001', 'badanAudit', e.target.value)}
                        className="w-full bg-white/10 border-none rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-teal-200/50 focus:ring-2 focus:ring-white/20"
                        placeholder="SIRIM QAS..."
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-teal-100 uppercase ml-1">Syor Keputusan</label>
                  <input
                    type="text"
                    value={formData.quality.iso9001.status}
                    onChange={(e) => handleISOChange('iso9001', 'status', e.target.value)}
                    className="w-full bg-white/10 border-none rounded-2xl px-4 py-3 text-sm text-white placeholder:text-teal-200/50 focus:ring-2 focus:ring-white/20"
                    placeholder="Recommended to Continue..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle className="w-4 h-4 text-red-300" />
                      <span className="text-[10px] font-black text-teal-100 uppercase">NCR</span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      value={formData.quality.iso9001.ncr}
                      onChange={(e) => handleISOChange('iso9001', 'ncr', e.target.value)}
                      className="text-2xl font-black text-white bg-transparent border-none p-0 w-full focus:ring-0"
                      placeholder="0"
                    />
                    <p className="text-[8px] text-teal-200/50 mt-1 uppercase">Ref 2024: {QUALITY_INITIATIVES_2024_REFERENCE.iso9001.ncr}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <Lightbulb className="w-4 h-4 text-yellow-300" />
                      <span className="text-[10px] font-black text-teal-100 uppercase">OFI</span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      value={formData.quality.iso9001.ofi}
                      onChange={(e) => handleISOChange('iso9001', 'ofi', e.target.value)}
                      className="text-2xl font-black text-white bg-transparent border-none p-0 w-full focus:ring-0"
                      placeholder="0"
                    />
                    <p className="text-[8px] text-teal-200/50 mt-1 uppercase">Ref 2024: {QUALITY_INITIATIVES_2024_REFERENCE.iso9001.ofi}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ISO 37001:2016 Card */}
            <div className="bg-[#0D9488] rounded-3xl shadow-xl overflow-hidden border-b-8 border-teal-900">
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-white" />
                  <h3 className="text-lg font-black text-white uppercase tracking-tight">ISO 37001:2016 (ABMS)</h3>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-teal-100 uppercase ml-1">Tarikh Audit</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-200" />
                      <input
                        type="text"
                        value={formData.quality.iso37001.tarikhAudit}
                        onChange={(e) => handleISOChange('iso37001', 'tarikhAudit', e.target.value)}
                        className="w-full bg-white/10 border-none rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-teal-200/50 focus:ring-2 focus:ring-white/20"
                        placeholder="Contoh: 23-25 Okt 2025"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-teal-100 uppercase ml-1">Badan Audit</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-200" />
                      <input
                        type="text"
                        value={formData.quality.iso37001.badanAudit}
                        onChange={(e) => handleISOChange('iso37001', 'badanAudit', e.target.value)}
                        className="w-full bg-white/10 border-none rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-teal-200/50 focus:ring-2 focus:ring-white/20"
                        placeholder="SIRIM QAS..."
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-teal-100 uppercase ml-1">Syor Keputusan</label>
                  <input
                    type="text"
                    value={formData.quality.iso37001.status}
                    onChange={(e) => handleISOChange('iso37001', 'status', e.target.value)}
                    className="w-full bg-white/10 border-none rounded-2xl px-4 py-3 text-sm text-white placeholder:text-teal-200/50 focus:ring-2 focus:ring-white/20"
                    placeholder="Recommended to Continue..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle className="w-4 h-4 text-red-300" />
                      <span className="text-[10px] font-black text-teal-100 uppercase">NCR</span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      value={formData.quality.iso37001.ncr}
                      onChange={(e) => handleISOChange('iso37001', 'ncr', e.target.value)}
                      className="text-2xl font-black text-white bg-transparent border-none p-0 w-full focus:ring-0"
                      placeholder="0"
                    />
                    <p className="text-[8px] text-teal-200/50 mt-1 uppercase">Ref 2024: {QUALITY_INITIATIVES_2024_REFERENCE.iso37001.ncr}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <Lightbulb className="w-4 h-4 text-yellow-300" />
                      <span className="text-[10px] font-black text-teal-100 uppercase">OFI</span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      value={formData.quality.iso37001.ofi}
                      onChange={(e) => handleISOChange('iso37001', 'ofi', e.target.value)}
                      className="text-2xl font-black text-white bg-transparent border-none p-0 w-full focus:ring-0"
                      placeholder="0"
                    />
                    <p className="text-[8px] text-teal-200/50 mt-1 uppercase">Ref 2024: {QUALITY_INITIATIVES_2024_REFERENCE.iso37001.ofi}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Frameworks Column */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 bg-gray-50 border-b border-gray-100 flex items-center gap-3">
                  <LayoutDashboard className="w-5 h-5 text-teal-600" />
                  <h3 className="text-sm font-black text-zus-900 uppercase">Frameworks & Prestasi</h3>
                </div>
                <div className="p-6 space-y-4">
                  <button
                    onClick={() => toggleFramework('mbef')}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${formData.quality.frameworks.mbef ? 'bg-teal-50 border-teal-200 text-teal-900' : 'bg-gray-50 border-gray-100 text-gray-400'}`}
                  >
                    <span className="text-xs font-black uppercase tracking-tight">MBEF (Business Excellence)</span>
                    {formData.quality.frameworks.mbef ? <ToggleRight className="w-6 h-6 text-teal-600" /> : <ToggleLeft className="w-6 h-6" />}
                  </button>
                  <button
                    onClick={() => toggleFramework('scsScorecard')}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${formData.quality.frameworks.scsScorecard ? 'bg-teal-50 border-teal-200 text-teal-900' : 'bg-gray-50 border-gray-100 text-gray-400'}`}
                  >
                    <span className="text-xs font-black uppercase tracking-tight">SCS Scorecard</span>
                    {formData.quality.frameworks.scsScorecard ? <ToggleRight className="w-6 h-6 text-teal-600" /> : <ToggleLeft className="w-6 h-6" />}
                  </button>
                  <button
                    onClick={() => toggleFramework('eksa')}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${formData.quality.frameworks.eksa ? 'bg-teal-50 border-teal-200 text-teal-900' : 'bg-gray-50 border-gray-100 text-gray-400'}`}
                  >
                    <span className="text-xs font-black uppercase tracking-tight">EKSA (Persekitaran Kerja)</span>
                    {formData.quality.frameworks.eksa ? <ToggleRight className="w-6 h-6 text-teal-600" /> : <ToggleLeft className="w-6 h-6" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Initiatives Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden h-full">
                <div className="p-6 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-600" />
                    <h3 className="text-sm font-black text-zus-900 uppercase">Inisiatif Kualiti Tambahan</h3>
                  </div>
                  <button
                    onClick={addInitiative}
                    className="flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-700 rounded-lg text-[10px] font-black hover:bg-teal-200 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    TAMBAH INISIATIF
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  {formData.quality.additionalInitiatives.map((init: any, idx: number) => (
                    <div key={idx} className="flex gap-3 items-start group animate-in fade-in slide-in-from-top-2">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={init.title}
                          onChange={(e) => updateInitiative(idx, 'title', e.target.value)}
                          placeholder="Nama Inisiatif (cth: Audit Dalaman)"
                          className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 text-xs focus:ring-2 focus:ring-teal-500"
                        />
                        <input
                          type="text"
                          value={init.status}
                          onChange={(e) => updateInitiative(idx, 'status', e.target.value)}
                          placeholder="Status (cth: Selesai / Dalam Tindakan)"
                          className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 text-xs focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                      <button
                        onClick={() => removeInitiative(idx)}
                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {formData.quality.additionalInitiatives.length === 0 && (
                    <div className="text-center py-12 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-100">
                      <p className="text-gray-400 text-[10px] font-bold uppercase">Tiada inisiatif tambahan dimasukkan</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormLayout>
  );
};

export default IntegritiForm;
