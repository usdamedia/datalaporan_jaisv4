import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  Smartphone, 
  Globe, 
  CreditCard, 
  Users, 
  ShieldCheck, 
  Database, 
  Zap,
  ArrowRight,
  Monitor,
  Cpu,
  MousePointer2,
  Activity,
  Save,
  Lock,
  Unlock,
  MessageSquare,
  Loader2
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const timelineData = [
  {
    year: '2000',
    title: 'SINAR',
    description: "Sistem Pengurusan Nikah Cerai dan Ruju'.",
    icon: <Users className="w-5 h-5" />,
    color: 'bg-[#14b8a6]'
  },
  {
    year: '2005',
    title: 'e-Masjid',
    description: 'Sistem Pengurusan Masjid.',
    icon: <Zap className="w-5 h-5" />,
    color: 'bg-[#10b981]'
  },
  {
    year: '2012',
    title: 'e-Hidayah',
    description: 'Sistem Pengurusan Pengislaman.',
    icon: <Globe className="w-5 h-5" />,
    color: 'bg-[#06b6d4]'
  },
  {
    year: '2014',
    title: 'e-Munakahat & e-Dakwah',
    description: "Sistem Pengurusan Nikah Cerai dan Ruju' & Sistem Pengurusan Dakwah.",
    icon: <Database className="w-5 h-5" />,
    color: 'bg-[#0d9488]'
  },
  {
    year: '2020',
    title: 'KISWA',
    description: 'Khidmat Islam Sarawak (KISWA): Platform Perkhidmatan Bersepadu JAIS (Sarawak ID).',
    icon: <Smartphone className="w-5 h-5" />,
    color: 'bg-[#0f766e]',
    highlight: true
  },
  {
    year: '2023',
    title: 'KISWA Expansion',
    description: 'Kluster Perundangan (Pendakwaan), Kluster Tauliah, Kluster Pendidikan & Pembayaran Sarawak Pay.',
    icon: <CreditCard className="w-5 h-5" />,
    color: 'bg-[#115e59]'
  },
  {
    year: '2024',
    title: 'KISWA Modernization',
    description: 'Kluster Perundangan (Penguatkuasaan) & Pembayaran FPX (Kad Kredit/Debit & Perbankan Internet).',
    icon: <Monitor className="w-5 h-5" />,
    color: 'bg-[#134e4a]'
  }
];

const INITIAL_2025_DATA = {
  fb: { value: 210000 as number | '', remark: '' },
  ig: { value: 85000 as number | '', remark: '' },
  tt: { value: 125000 as number | '', remark: '' },
  yt: { value: 25000 as number | '', remark: '' },
};

const DigitalizationPage: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [data2025, setData2025] = useState(INITIAL_2025_DATA);
  const [isSaved, setIsSaved] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('jais_digital_2025');
    if (saved) {
      setData2025(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('jais_digital_2025', JSON.stringify(data2025));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const updateValue = (platform: keyof typeof INITIAL_2025_DATA, field: 'value' | 'remark', val: any) => {
    setData2025(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: val
      }
    }));
  };

  const handleExportPdf = async () => {
    alert('Fungsi eksport PDF untuk halaman ini sedang dikemaskini menggunakan @react-pdf/renderer.');
  };


  const chartData = [
    { name: 'FB', '2023': 152400, '2024': 185600, '2025': Number(data2025.fb.value) || 0 },
    { name: 'IG', '2023': 45200, '2024': 62800, '2025': Number(data2025.ig.value) || 0 },
    { name: 'TT', '2023': 21500, '2024': 88400, '2025': Number(data2025.tt.value) || 0 },
    { name: 'YT', '2023': 12800, '2024': 19200, '2025': Number(data2025.yt.value) || 0 },
  ];

  return (
    <div ref={pageRef} id="print-container" className="space-y-12 animate-fade-in p-4 md:p-8 bg-gray-50 rounded-[2.5rem]">
      {/* Header Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="flex justify-center items-center gap-3 mb-4" data-pdf-ignore="true">
          <button 
            onClick={() => setIsAdmin(!isAdmin)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${isAdmin ? 'bg-zus-900 text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'}`}
          >
            {isAdmin ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
            {isAdmin ? 'Admin Mode: On' : 'Admin Mode: Off'}
          </button>

          <button
            onClick={handleExportPdf}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-white text-teal-700 border border-teal-100 hover:bg-teal-50 transition-all shadow-sm"
          >
            <Loader2 className="w-3 h-3" />
            Export PDF
          </button>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-bold uppercase tracking-widest"
        >
          <Cpu className="w-3.5 h-3.5" />
          Digitalisasi JAIS
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black text-zus-900 tracking-tighter"
        >
          Transformasi Digital <span className="text-teal-600">JAIS</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 text-sm md:text-base leading-relaxed"
        >
          Sejarah dan evolusi sistem digital di Jabatan Agama Islam Sarawak (JAIS) dari tahun 2000 hingga 2024, memacu kecemerlangan perkhidmatan melalui inovasi.
        </motion.p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative max-w-4xl mx-auto py-10">
        {/* Central Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-50 via-teal-200 to-teal-50 md:-translate-x-1/2"></div>

        <div className="space-y-12">
          {timelineData.map((item, index) => (
            <motion.div 
              key={item.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex items-center gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Content Card */}
              <div className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                <div className={`p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:border-teal-200 transition-all duration-300 group ${item.highlight ? 'ring-2 ring-teal-500 ring-offset-4' : ''}`}>
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${item.color} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-black text-zus-900 mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>

              {/* Year Marker */}
              <div className="absolute left-0 md:left-1/2 top-1/2 -translate-y-1/2 md:-translate-x-1/2 flex items-center justify-center">
                <div className={`w-8 h-8 rounded-full ${item.color} border-4 border-white shadow-md z-10 flex items-center justify-center`}>
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                </div>
                <div className={`absolute hidden md:block whitespace-nowrap text-lg font-black text-teal-900 ${index % 2 === 0 ? 'left-12' : 'right-12'}`}>
                  {item.year}
                </div>
                <div className="absolute md:hidden left-12 whitespace-nowrap text-lg font-black text-teal-900">
                  {item.year}
                </div>
              </div>

              {/* Spacer for desktop */}
              <div className="hidden md:block flex-1"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* KISWA Highlight Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="group relative overflow-hidden rounded-[2rem] bg-[#0D9488] p-6 text-white shadow-2xl shadow-teal-900/40 md:p-12">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/10 transition-all duration-700"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/10 rounded-full -ml-24 -mb-24 blur-2xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                <Smartphone className="w-6 h-6 text-teal-200" />
                <span className="text-xl font-black tracking-widest">KISWA</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-black leading-tight">Platform Perkhidmatan <br />Bersepadu JAIS</h2>
                <p className="text-teal-100 text-sm font-medium opacity-80">Menghubungkan masyarakat dengan perkhidmatan Islam Sarawak secara digital.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
              <div className="rounded-3xl border border-white/20 bg-white/10 p-5 text-center backdrop-blur-md transition-colors hover:bg-white/20 md:p-6">
                <div className="p-3 bg-teal-400/20 rounded-2xl inline-flex mb-3">
                  <Database className="w-6 h-6 text-teal-200" />
                </div>
                <p className="mb-1 text-4xl font-black sm:text-5xl">8</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-teal-200">Kluster</p>
              </div>
              <div className="rounded-3xl border border-white/20 bg-white/10 p-5 text-center backdrop-blur-md transition-colors hover:bg-white/20 md:p-6">
                <div className="p-3 bg-teal-400/20 rounded-2xl inline-flex mb-3">
                  <MousePointer2 className="w-6 h-6 text-teal-200" />
                </div>
                <p className="mb-1 text-4xl font-black tracking-tighter sm:text-5xl">617k</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-teal-200">Pelawat</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0D9488] bg-teal-700 flex items-center justify-center text-[10px] font-bold">
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-xs font-bold text-teal-100">617,080 Pelawat Keseluruhan (2024)</p>
            </div>
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-black text-teal-900 shadow-lg transition-colors hover:bg-teal-50 active:scale-95 sm:w-auto">
              Layari KISWA
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Analyzing Digital Growth Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200"></div>
          <h2 className="text-2xl font-black text-zus-900 uppercase tracking-tighter">Analyzing Digital Growth</h2>
          <div className="h-px flex-1 bg-gray-200"></div>
        </div>

        <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest">
                <Activity className="w-3 h-3" />
                Social Media Insights
              </div>
              <h3 className="text-xl font-black text-zus-900 leading-tight">Pertumbuhan Media Sosial JAIS (2023-2025)</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Analisis statistik media sosial JAIS merentas pelbagai platform, membandingkan data 2023, 2024 dan unjuran 2025.
              </p>
              <div className="space-y-3 pt-4">
                {[
                  { platform: 'Facebook', growth: '+21.8%', color: 'text-blue-600', remark: data2025.fb.remark },
                  { platform: 'Instagram', growth: '+38.9%', color: 'text-pink-600', remark: data2025.ig.remark },
                  { platform: 'TikTok', growth: '+311.2%', color: 'text-black', remark: data2025.tt.remark },
                  { platform: 'YouTube', growth: '+50.0%', color: 'text-red-600', remark: data2025.yt.remark },
                ].map((item) => (
                  <div key={item.platform} className="space-y-1">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50 border border-gray-100">
                      <span className="text-xs font-bold text-gray-600">{item.platform}</span>
                      <span className={`text-xs font-black ${item.color}`}>{item.growth}</span>
                    </div>
                    {item.remark && (
                      <p className="text-[10px] text-gray-400 italic px-2 flex items-center gap-1">
                        <MessageSquare className="w-2.5 h-2.5" />
                        {item.remark}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fontWeight: 700, fill: '#6b7280' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 500, fill: '#9ca3af' }}
                    tickFormatter={(value) => `${value / 1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    cursor={{ fill: '#f9fafb' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 700 }} />
                  <Bar dataKey="2023" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={15} />
                  <Bar dataKey="2024" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={15} />
                  <Bar dataKey="2025" fill="#0D9488" radius={[4, 4, 0, 0]} barSize={15} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Admin Entry Form */}
          {isAdmin && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-10 pt-10 border-t border-gray-100 space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-zus-900 flex items-center gap-2">
                  <Save className="w-5 h-5 text-teal-600" />
                  Kemaskini Data 2025 (Admin)
                </h3>
                <button 
                  onClick={handleSave}
                  className={`px-6 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${isSaved ? 'bg-green-500 text-white' : 'bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-600/20'}`}
                >
                  {isSaved ? 'Berjaya Disimpan!' : 'Simpan Perubahan'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { id: 'fb', label: 'Facebook', color: 'border-blue-200' },
                  { id: 'ig', label: 'Instagram', color: 'border-pink-200' },
                  { id: 'tt', label: 'TikTok', color: 'border-gray-200' },
                  { id: 'yt', label: 'YouTube', color: 'border-red-200' },
                ].map((platform) => (
                  <div key={platform.id} className={`p-4 rounded-2xl border ${platform.color} bg-gray-50 space-y-4`}>
                    <div className="font-black text-xs uppercase tracking-widest text-gray-500">{platform.label}</div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Jumlah Pengikut</label>
                      <input 
                        type="number" 
                        placeholder="0"
                        value={data2025[platform.id as keyof typeof INITIAL_2025_DATA].value === 0 ? '' : data2025[platform.id as keyof typeof INITIAL_2025_DATA].value}
                        onChange={(e) => updateValue(platform.id as any, 'value', e.target.value === '' ? '' : parseInt(e.target.value, 10))}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-sm font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Catatan / Remark</label>
                      <textarea 
                        value={data2025[platform.id as keyof typeof INITIAL_2025_DATA].remark}
                        onChange={(e) => updateValue(platform.id as any, 'remark', e.target.value)}
                        placeholder="Masukkan catatan..."
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-xs min-h-[60px] resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Footer Note */}
      <div className="text-center py-10">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Digitalisasi Memacu Kecemerlangan Ummah</p>
      </div>
    </div>
  );
};

export default DigitalizationPage;
