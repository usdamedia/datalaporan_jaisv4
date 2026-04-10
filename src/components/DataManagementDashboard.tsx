import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Layers, 
  MonitorDot, 
  Plus, 
  Trash2, 
  Save, 
  ArrowRight,
  Info,
  Database,
  CalendarCheck
} from 'lucide-react';
import { motion } from 'motion/react';

interface Data2025 {
  dtawgMeetings: number | '';
  integratedDashboards: number | '';
  dataClusters: number | '';
  subDataDashboards: number | '';
  subDataList: string[];
}

interface DataManagementDashboardProps {
  data?: Data2025;
  aggregatedActivities?: {
    penyelidikan: number;
    strategik: number;
    akidah: number;
    total: number;
  };
  onChange?: (data: Data2025) => void;
}

const INITIAL_2025_DATA: Data2025 = {
  dtawgMeetings: '',
  integratedDashboards: '',
  dataClusters: '',
  subDataDashboards: '',
  subDataList: ['']
};

const DataManagementDashboard: React.FC<DataManagementDashboardProps> = ({ data, aggregatedActivities, onChange }) => {
  const [localData, setLocalData] = useState<Data2025>(data || INITIAL_2025_DATA);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (data) {
      setLocalData(data);
    }
  }, [data]);

  const handleDataChange = (newData: Data2025) => {
    setLocalData(newData);
    if (onChange) {
      onChange(newData);
    }
  };

  const handleSave = () => {
    localStorage.setItem('jais_data_management_2025', JSON.stringify(localData));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const addSubDataItem = () => {
    const newData = {
      ...localData,
      subDataList: [...localData.subDataList, ''],
      subDataDashboards: (Number(localData.subDataDashboards) || 0) + 1
    };
    handleDataChange(newData);
  };

  const removeSubDataItem = (index: number) => {
    const newList = localData.subDataList.filter((_, i) => i !== index);
    const newData = {
      ...localData,
      subDataList: newList,
      subDataDashboards: newList.length
    };
    handleDataChange(newData);
  };

  const updateSubDataItem = (index: number, value: string) => {
    const newList = [...localData.subDataList];
    newList[index] = value;
    const newData = { ...localData, subDataList: newList };
    handleDataChange(newData);
  };

  const stats2024 = [
    { label: 'Mesyuarat DTAWG', value: 1, icon: <Users className="w-6 h-6" /> },
    { label: 'Integrated Dashboard', value: 1, icon: <LayoutDashboard className="w-6 h-6" /> },
    { label: 'Kluster Data', value: 26, icon: <Layers className="w-6 h-6" /> },
    { label: 'Sub-Data Dashboard', value: 3, icon: <MonitorDot className="w-6 h-6" /> },
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      {/* Header */}
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-bold sentence-case"
        >
          <Database className="w-3.5 h-3.5" />
          Pengurusan data JAIS
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-black tracking-tighter text-zus-900 sm:text-4xl md:text-5xl"
        >
          Data Management <span className="text-teal-600">Dashboard</span>
        </motion.h1>
      </div>

      {/* Z-Pattern Overview (2024 Stats) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
        {stats2024.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-[2rem] bg-[#134E4A] p-6 text-white shadow-xl shadow-teal-900/20 sm:p-8"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              {stat.icon}
            </div>
            <p className="text-xs font-bold text-teal-200 mb-2 sentence-case">{stat.label}</p>
            <h3 className="text-4xl font-black tracking-tighter text-[#FDE047] sm:text-5xl">{stat.value}</h3>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-teal-100/60 sentence-case">
              <CalendarCheck className="w-3 h-3" />
              Data tahun 2024
            </div>
          </motion.div>
        ))}
      </div>

      {aggregatedActivities && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#0f766e] via-[#0d9488] to-[#14b8a6] p-6 text-white shadow-xl shadow-teal-900/20 sm:p-8"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black text-teal-100 sentence-case">Jumlah program / aktiviti BPNP 2025</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-[#FDE047] sm:text-5xl">{aggregatedActivities.total}</h2>
              <p className="mt-3 max-w-2xl text-sm font-medium text-white/85">
                Jumlah ini ialah campuran input daripada Unit Penyelidikan, Unit Perancangan Strategik dan Unit Akidah Tapisan.
              </p>
            </div>

            <div className="grid min-w-0 gap-4 sm:grid-cols-3 lg:min-w-[560px]">
              {[
                { label: 'Unit Penyelidikan', value: aggregatedActivities.penyelidikan },
                { label: 'Perancangan Strategik', value: aggregatedActivities.strategik },
                { label: 'Akidah Tapisan', value: aggregatedActivities.akidah },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                  <p className="text-[10px] font-black text-teal-100 sentence-case">{item.label}</p>
                  <p className="mt-3 text-3xl font-black text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* 2024 Sub-Data List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
      >
        <h3 className="text-lg font-black text-zus-900 mb-6 flex items-center gap-2">
          <Info className="w-5 h-5 text-teal-600" />
          Senarai Sub-Data Dashboard (2024)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Pelaporan Takwim Aktiviti', 'Pelaporan Penilaian Aktiviti', 'Pengurusan Projek'].map((item) => (
            <div key={item} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-2 h-2 rounded-full bg-teal-500"></div>
              <span className="text-sm font-bold text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* F-Pattern Data Entry Form (2025) */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:p-12"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-zus-900 tracking-tight">Borang Data Tahun 2025</h2>
            <p className="text-gray-500 text-sm font-medium">Sila masukkan unjuran atau data terkini bagi tahun 2025.</p>
          </div>
          <button 
            onClick={handleSave}
            className={`flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-black shadow-lg transition-all md:w-auto md:px-8 ${isSaved ? 'bg-green-500 text-white' : 'bg-[#134E4A] text-white hover:bg-teal-900 active:scale-95'}`}
          >
            {isSaved ? 'Berjaya Disimpan!' : 'Simpan Data 2025'}
            <Save className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-8 max-w-4xl">
          {/* Numeric Inputs */}
          {[
            { id: 'dtawgMeetings', label: 'Bilangan Mesyuarat DTAWG', icon: <Users className="w-4 h-4" /> },
            { id: 'integratedDashboards', label: 'Bilangan Integrated Data Management Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'dataClusters', label: 'Bilangan Kluster Data', icon: <Layers className="w-4 h-4" /> },
            { id: 'subDataDashboards', label: 'Bilangan Sub-Data Dashboard', icon: <MonitorDot className="w-4 h-4" />, readOnly: true },
          ].map((field) => (
            <div key={field.id} className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 group">
              <label className="md:w-1/2 flex items-center gap-3 text-sm font-black text-gray-600 tracking-tight group-hover:text-teal-700 transition-colors sentence-case">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-400 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                  {field.icon}
                </div>
                {field.label}
              </label>
              <div className="md:w-1/2">
                <input 
                  type="number" 
                  step="any"
                  placeholder="0"
                  value={localData[field.id as keyof Data2025] === 0 ? '' : localData[field.id as keyof Data2025]}
                  readOnly={field.readOnly}
                  onChange={(e) => handleDataChange({ ...localData, [field.id]: e.target.value === '' ? '' : parseFloat(e.target.value) })}
                  className={`w-full rounded-2xl border-2 border-gray-100 px-4 py-3 text-base font-black outline-none transition-all focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 md:px-6 md:py-4 md:text-lg ${field.readOnly ? 'bg-gray-50 text-gray-400' : 'bg-white text-zus-900'}`}
                />
              </div>
            </div>
          ))}

          {/* Dynamic List Input */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-10 pt-4">
            <label className="md:w-1/2 flex flex-col gap-1 text-sm font-black text-gray-600 tracking-tight sentence-case">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-400">
                  <MonitorDot className="w-4 h-4" />
                </div>
                Senarai Sub-Data Dashboard
              </div>
              <p className="ml-11 text-[10px] font-bold text-gray-400 lowercase">Tambah atau edit nama dashboard secara dinamik</p>
            </label>
            <div className="md:w-1/2 space-y-3">
              {localData.subDataList.map((item, index) => (
                <div key={index} className="flex items-center gap-2 group">
                  <input 
                    type="text" 
                    value={item}
                    onChange={(e) => updateSubDataItem(index, e.target.value)}
                    placeholder={`Nama Dashboard #${index + 1}`}
                    className="flex-1 px-5 py-3 rounded-xl border-2 border-gray-100 focus:border-teal-500 outline-none transition-all font-bold text-sm"
                  />
                  <button 
                    onClick={() => removeSubDataItem(index)}
                    className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button 
                onClick={addSubDataItem}
                className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:text-teal-600 hover:border-teal-500 hover:bg-teal-50 transition-all text-xs font-black flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Tambah Dashboard Baru
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="text-center">
        <p className="text-xs font-bold text-gray-400 sentence-case">Integriti data memacu kecemerlangan organisasi</p>
      </div>
    </div>
  );
};

export default DataManagementDashboard;
