import React from 'react';
import { Bus, Car, Truck, ChevronRight, Save } from 'lucide-react';
import { motion } from 'motion/react';

interface TransportData {
  van: number;
  mpv: number;
  suv: number;
  bus: number;
}

interface TransportManagementProps {
  data2025: TransportData;
  onChange: (field: keyof TransportData, value: string) => void;
  onSave: () => void;
}

const TransportManagement: React.FC<TransportManagementProps> = ({ data2025, onChange, onSave }) => {
  const stats2024 = [
    { label: 'Van', value: 2, icon: <Truck className="w-8 h-8" />, color: 'bg-teal-600' },
    { label: 'MPV', value: 3, icon: <Car className="w-8 h-8" />, color: 'bg-teal-600' },
    { label: 'SUV', value: 11, icon: <Car className="w-8 h-8" />, color: 'bg-teal-600' },
    { label: 'Bas', value: 1, icon: <Bus className="w-8 h-8" />, color: 'bg-teal-600' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
        <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">
          <Bus className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-zus-900">Pengurusan Pengangkutan</h3>
          <p className="text-xs text-gray-400 font-medium">Statistik Kenderaan Jabatan (BPPS - Unit Pentadbiran)</p>
        </div>
      </div>

      {/* Z-Pattern Visual Grid (2024 Stats) */}
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        {stats2024.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${stat.color} rounded-3xl p-6 text-white shadow-lg relative overflow-hidden group h-40 flex flex-col justify-between`}
          >
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-30 transition-opacity">
              {stat.icon}
            </div>
            
            {/* Image Placeholder */}
            <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
            
            <p className="text-xs font-black uppercase tracking-widest text-teal-100">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h4 className="text-5xl font-black text-[#FDE047] tracking-tighter">{stat.value}</h4>
              <span className="text-[10px] font-bold text-teal-100/60 uppercase">Data 2024</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* F-Pattern Data Input (2025 Form) */}
      <div className="bg-gray-50 rounded-3xl p-6 md:p-8 border border-gray-100">
        <h4 className="text-sm font-black text-zus-900 uppercase tracking-widest mb-6 flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-teal-600" />
          Input Data Tahun 2025
        </h4>
        
        <div className="space-y-4">
          {[
            { id: 'van', label: 'Bilangan Van', icon: <Truck className="w-4 h-4" /> },
            { id: 'mpv', label: 'Bilangan MPV', icon: <Car className="w-4 h-4" /> },
            { id: 'suv', label: 'Bilangan SUV', icon: <Car className="w-4 h-4" /> },
            { id: 'bus', label: 'Bilangan Bas', icon: <Bus className="w-4 h-4" /> },
          ].map((field) => (
            <div key={field.id} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 group">
              <label className="md:w-1/3 flex items-center gap-3 text-xs font-black text-gray-500 uppercase tracking-tight group-hover:text-teal-700 transition-colors">
                <div className="p-2 bg-white rounded-lg text-gray-300 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors border border-gray-100">
                  {field.icon}
                </div>
                {field.label}
              </label>
              <div className="md:w-2/3">
                <input 
                  type="number" 
                  value={data2025[field.id as keyof TransportData]}
                  onChange={(e) => onChange(field.id as keyof TransportData, e.target.value)}
                  placeholder="0"
                  className="w-full px-5 py-3 rounded-xl border-2 border-gray-100 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-bold text-lg text-zus-900 bg-white"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-8 py-4 bg-teal-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-teal-500 hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] transition-all active:scale-95 group"
          >
            <Save className="w-5 h-5 group-hover:animate-pulse" />
            Simpan Data 2025
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransportManagement;
