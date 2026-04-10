import React, { useMemo } from 'react';
import { 
  HardHat, 
  Building2, 
  School, 
  TrendingUp, 
  LayoutDashboard
} from 'lucide-react';
import FormLayout from './FormLayout';
import { useFormLogic } from './useFormLogic';
import { BasicInfoSection, NarrativeSection, LawatanSection } from './CommonSections';
import { SARAWAK_DIVISIONS, SCHOOL_LIST, UPP_2024_REFERENCE } from '../../constants';

const UppForm: React.FC<{ deptName: string; onBack: () => void }> = ({ deptName, onBack }) => {
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
  } = useFormLogic('UPP', {
    upp: {
      mesyuarat: {
        pembangunan: '',
        teknikal: ''
      },
      statistikTahunan: {
        dijalankan: '',
        siap: ''
      },
      projekMasjid: SARAWAK_DIVISIONS.reduce((acc, div) => ({
        ...acc,
        [div]: { perancangan: '', pelaksanaan: '', siap: '' }
      }), {}),
      projekSekolah: SCHOOL_LIST.reduce((acc, school) => ({
        ...acc,
        [school]: { total: '', siap: '' }
      }), {})
    }
  });

  const handleNestedInputChange = (section: string, field: string, value: string) => {
    const numValue = value === '' ? '' : Math.max(0, parseInt(value));
    setFormData((prev: any) => ({
      ...prev,
      upp: {
        ...prev.upp,
        [section]: {
          ...prev.upp[section],
          [field]: numValue
        }
      }
    }));
  };

  const handleDeepNestedInputChange = (section: string, subSection: string, field: string, value: string) => {
    const numValue = value === '' ? '' : Math.max(0, parseInt(value));
    setFormData((prev: any) => ({
      ...prev,
      upp: {
        ...prev.upp,
        [section]: {
          ...prev.upp[section],
          [subSection]: {
            ...prev.upp[section][subSection],
            [field]: numValue
          }
        }
      }
    }));
  };

  // Calculations
  const totalMesyuarat = useMemo(() => {
    return (parseInt(formData.upp.mesyuarat.pembangunan) || 0) + (parseInt(formData.upp.mesyuarat.teknikal) || 0);
  }, [formData.upp.mesyuarat]);

  const masjidTotals = useMemo(() => {
    return Object.values(formData.upp.projekMasjid).reduce((acc: { perancangan: number; pelaksanaan: number; siap: number }, curr: any) => ({
      perancangan: acc.perancangan + (parseInt(curr.perancangan) || 0),
      pelaksanaan: acc.pelaksanaan + (parseInt(curr.pelaksanaan) || 0),
      siap: acc.siap + (parseInt(curr.siap) || 0)
    }), { perancangan: 0, pelaksanaan: 0, siap: 0 });
  }, [formData.upp.projekMasjid]);

  const totalMasjidProjek = masjidTotals.perancangan + masjidTotals.pelaksanaan + masjidTotals.siap;

  const sekolahTotals = useMemo(() => {
    return Object.values(formData.upp.projekSekolah).reduce((acc: { total: number; siap: number }, curr: any) => ({
      total: acc.total + (parseInt(curr.total) || 0),
      siap: acc.siap + (parseInt(curr.siap) || 0)
    }), { total: 0, siap: 0 });
  }, [formData.upp.projekSekolah]);

  const peratusSiapSekolah = sekolahTotals.total > 0 
    ? ((sekolahTotals.siap / sekolahTotals.total) * 100).toFixed(1) 
    : '0';

  const peratusSiapTahunan = (parseInt(formData.upp.statistikTahunan.dijalankan) || 0) > 0
    ? (((parseInt(formData.upp.statistikTahunan.siap) || 0) / (parseInt(formData.upp.statistikTahunan.dijalankan) || 0)) * 100).toFixed(1)
    : '0';

  return (
    <FormLayout
      deptName="Unit Pengurusan Projek (UPP)"
      onBack={onBack}
      onSave={handleSave}
      isSaving={isSaving}
      isAutoSaving={isAutoSaving}
      showSuccess={showSuccess}
      saveError={saveError}
      formData={formData}
    >
      <BasicInfoSection formData={formData} handleInputChange={handleInputChange} />

      {/* Ringkasan 2024 vs 2025 */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6 bg-gray-50 border-b border-gray-100 flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-teal-600" />
          <h3 className="text-sm font-black text-zus-900 uppercase">Ringkasan KPI 2024 & Input 2025</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-widest text-gray-500">Perkara</th>
                <th className="px-6 py-4 text-center text-[11px] font-black uppercase tracking-widest text-gray-500">Rujukan 2024</th>
                <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-widest text-gray-500">Input 2025</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-6 py-4 font-semibold text-zus-900">KPI Peratus Siap (%)</td>
                <td className="px-6 py-4 text-center font-black text-teal-700">{UPP_2024_REFERENCE.kpi.peratusSiap}%</td>
                <td className="px-6 py-4">
                  <div className="font-black text-zus-900">{peratusSiapTahunan}%</div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-semibold text-zus-900">Jumlah Mesyuarat</td>
                <td className="px-6 py-4 text-center font-black text-zus-900">{UPP_2024_REFERENCE.mesyuarat.total}</td>
                <td className="px-6 py-4">
                  <div className="font-black text-zus-900">{totalMesyuarat}</div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-semibold text-zus-900">Projek Dijalankan</td>
                <td className="px-6 py-4 text-center font-black text-zus-900">{UPP_2024_REFERENCE.statistikTahunan.dijalankan}</td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    min="0"
                    value={formData.upp.statistikTahunan.dijalankan}
                    onChange={(e) => handleNestedInputChange('statistikTahunan', 'dijalankan', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-zus-900 focus:ring-2 focus:ring-teal-500"
                    placeholder="0"
                  />
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-semibold text-zus-900">Projek Siap</td>
                <td className="px-6 py-4 text-center font-black text-zus-900">{UPP_2024_REFERENCE.statistikTahunan.siap}</td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    min="0"
                    value={formData.upp.statistikTahunan.siap}
                    onChange={(e) => handleNestedInputChange('statistikTahunan', 'siap', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-zus-900 focus:ring-2 focus:ring-teal-500"
                    placeholder="0"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Mesyuarat Details */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6 bg-gray-50 border-b border-gray-100 flex items-center gap-3">
          <LayoutDashboard className="w-5 h-5 text-teal-600" />
          <h3 className="text-sm font-black text-zus-900 uppercase">Perincian Mesyuarat</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Jawatankuasa Pembangunan</label>
            <input
              type="number"
              min="0"
              value={formData.upp.mesyuarat.pembangunan}
              onChange={(e) => handleNestedInputChange('mesyuarat', 'pembangunan', e.target.value)}
              className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-teal-500"
              placeholder="0"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Jawatankuasa Teknikal</label>
            <input
              type="number"
              min="0"
              value={formData.upp.mesyuarat.teknikal}
              onChange={(e) => handleNestedInputChange('mesyuarat', 'teknikal', e.target.value)}
              className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-teal-500"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* F-Pattern: Masjid/Surau Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6 bg-teal-600 flex items-center gap-3">
          <Building2 className="w-6 h-6 text-white" />
          <h3 className="text-lg font-black text-white uppercase tracking-tight">Projek Pembangunan Masjid, Surau & Perkuburan</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="sticky top-0 bg-white shadow-sm z-10">
              <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                <th className="px-6 py-4">Bahagian</th>
                <th className="px-6 py-4 text-center">Perancangan</th>
                <th className="px-6 py-4 text-center">Pelaksanaan</th>
                <th className="px-6 py-4 text-center">Siap Sepenuhnya</th>
                <th className="px-6 py-4 text-right">Jumlah Projek</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {SARAWAK_DIVISIONS.map((div) => {
                const data = formData.upp.projekMasjid[div];
                const total = (parseInt(data.perancangan) || 0) + (parseInt(data.pelaksanaan) || 0) + (parseInt(data.siap) || 0);
                return (
                  <tr key={div} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-zus-900">{div}</td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="0"
                        value={data.perancangan}
                        onChange={(e) => handleDeepNestedInputChange('projekMasjid', div, 'perancangan', e.target.value)}
                        className="w-20 mx-auto block bg-gray-50 border-none rounded-lg px-3 py-2 text-sm text-center focus:ring-2 focus:ring-teal-500"
                        placeholder="0"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="0"
                        value={data.pelaksanaan}
                        onChange={(e) => handleDeepNestedInputChange('projekMasjid', div, 'pelaksanaan', e.target.value)}
                        className="w-20 mx-auto block bg-gray-50 border-none rounded-lg px-3 py-2 text-sm text-center focus:ring-2 focus:ring-teal-500"
                        placeholder="0"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="0"
                        value={data.siap}
                        onChange={(e) => handleDeepNestedInputChange('projekMasjid', div, 'siap', e.target.value)}
                        className="w-20 mx-auto block bg-gray-50 border-none rounded-lg px-3 py-2 text-sm text-center focus:ring-2 focus:ring-teal-500"
                        placeholder="0"
                      />
                    </td>
                    <td className="px-6 py-4 text-right font-black text-teal-600">{total}</td>
                  </tr>
                );
              })}
              <tr className="bg-teal-50 font-black">
                <td className="px-6 py-4 text-teal-900 uppercase tracking-widest">Jumlah Keseluruhan</td>
                <td className="px-6 py-4 text-center text-teal-600">{masjidTotals.perancangan}</td>
                <td className="px-6 py-4 text-center text-teal-600">{masjidTotals.pelaksanaan}</td>
                <td className="px-6 py-4 text-center text-teal-600">{masjidTotals.siap}</td>
                <td className="px-6 py-4 text-right text-teal-800 text-lg">{totalMasjidProjek}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* F-Pattern: School Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6 bg-zus-gold flex items-center justify-between">
          <div className="flex items-center gap-3">
            <School className="w-6 h-6 text-zus-900" />
            <h3 className="text-lg font-black text-zus-900 uppercase tracking-tight">Projek Pembangunan Sekolah (SABK & SMKA)</h3>
          </div>
          <div className="bg-zus-900 text-white px-4 py-1.5 rounded-full text-xs font-black">
            {peratusSiapSekolah}% SIAP
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="sticky top-0 bg-white shadow-sm z-10">
              <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                <th className="px-6 py-4">Nama Sekolah</th>
                <th className="px-6 py-4 text-center">Jumlah Projek</th>
                <th className="px-6 py-4 text-center">Projek Selesai</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {SCHOOL_LIST.map((school) => {
                const data = formData.upp.projekSekolah[school];
                const peratus = (parseInt(data.total) || 0) > 0 
                  ? ((parseInt(data.siap) || 0) / (parseInt(data.total) || 0) * 100).toFixed(0)
                  : '0';
                return (
                  <tr key={school} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-zus-900 text-xs">{school}</td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="0"
                        value={data.total}
                        onChange={(e) => handleDeepNestedInputChange('projekSekolah', school, 'total', e.target.value)}
                        className="w-24 mx-auto block bg-gray-50 border-none rounded-lg px-3 py-2 text-sm text-center focus:ring-2 focus:ring-zus-gold"
                        placeholder="0"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="0"
                        value={data.siap}
                        onChange={(e) => handleDeepNestedInputChange('projekSekolah', school, 'siap', e.target.value)}
                        className="w-24 mx-auto block bg-gray-50 border-none rounded-lg px-3 py-2 text-sm text-center focus:ring-2 focus:ring-zus-gold"
                        placeholder="0"
                      />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-[10px] font-black px-2 py-1 rounded-md ${parseInt(peratus) === 100 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {peratus}%
                      </span>
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-zus-gold/10 font-black">
                <td className="px-6 py-4 text-zus-900 uppercase tracking-widest">Jumlah Keseluruhan</td>
                <td className="px-6 py-4 text-center text-zus-900">{sekolahTotals.total}</td>
                <td className="px-6 py-4 text-center text-zus-900">{sekolahTotals.siap}</td>
                <td className="px-6 py-4 text-right text-zus-900 text-lg">{peratusSiapSekolah}%</td>
              </tr>
            </tbody>
          </table>
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
    </FormLayout>
  );
};

export default UppForm;
