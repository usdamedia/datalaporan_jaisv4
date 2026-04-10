import React from 'react';
import { BookOpen, LayoutList, PieChart, BarChart3, Users, Briefcase, CheckCircle2 } from 'lucide-react';

const tocItems = [
  { no: '01', title: 'Kepimpinan', anchor: 'kepimpinan' },
  { no: '02', title: 'Strategi & Pencapaian', anchor: 'strategi' },
  { no: '03', title: 'Pelanggan & Maklumat', anchor: 'pelanggan' },
  { no: '04', title: 'Pembangunan Sumber Manusia (Tenaga Kerja)', anchor: 'sumber-manusia' },
  { no: '05', title: 'Pengurusan Proses & Rantaian Bekalan', anchor: 'proses-rantaian' },
  { no: '06', title: 'Hasil & Pembuktian (Outcomes)', anchor: 'hasil-pembuktian' },
];

const AnnualReportContentsPage: React.FC = () => {
  return (
    <div className="space-y-8 md:space-y-10">
      <section className="overflow-hidden rounded-[2rem] border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-sky-50 p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-4xl space-y-3">
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-700">
              <BookOpen className="h-3.5 w-3.5" />
              Single Page Summary
            </p>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 md:text-4xl">
              Isi Kandungan Laporan Tahunan JAIS 2025
            </h1>
            <p className="text-sm font-medium leading-7 text-slate-600 md:text-base">
              Disusun sebagai ringkasan satu halaman yang kemas, moden, formal, dan mudah diimbas untuk rujukan pengurusan.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Peranan</p>
            <p className="mt-1 text-xs font-bold text-slate-700">
              Pakar Penyusun Kandungan Korporat
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-5 flex items-center gap-2">
          <LayoutList className="h-5 w-5 text-slate-700" />
          <h2 className="text-xl font-black text-slate-900 md:text-2xl">Table Of Contents</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {tocItems.map((item) => (
            <a
              key={item.no}
              href={`#${item.anchor}`}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-xs font-black text-white">
                {item.no}
              </span>
              <span className="text-sm font-bold text-slate-800">{item.title}</span>
            </a>
          ))}
        </div>
      </section>

      <section id="kepimpinan" className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-xl font-black text-slate-900 md:text-2xl">1. Kepimpinan</h2>
        <h3 className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-slate-500">Komponen Kandungan</h3>
        <ul className="mt-3 space-y-2 text-sm font-medium text-slate-700">
          <li>• 1 set dummy display kepimpinan.</li>
          <li>• 6 shared value, visi dan misi jabatan.</li>
        </ul>
        <p className="mt-4 inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-700">
          <Users className="h-4 w-4" />
          Cadangan visual: Hero leadership panel + grid 6 nilai teras.
        </p>
      </section>

      <section id="strategi" className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-xl font-black text-slate-900 md:text-2xl">2. Strategi & Pencapaian</h2>
        <h3 className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-slate-500">Komponen Kandungan</h3>
        <ul className="mt-3 space-y-2 text-sm font-medium text-slate-700">
          <li>• 7 Teras dan Isu Strategik.</li>
          <li>• Dashboard Pelaksanaan (Status PSJ semasa).</li>
          <li>• Perbandingan 3 tahun kejayaan semasa.</li>
          <li>• KPI tercapai (dalam bentuk takwim jabatan / infografik).</li>
          <li>• Analisis Program: Program Tercapai, Program Dirancang, Program Ad Hoc (Perbandingan 2024 & 2025).</li>
        </ul>
        <p className="mt-4 inline-flex items-center gap-2 rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-bold text-cyan-700">
          <BarChart3 className="h-4 w-4" />
          Cadangan visual: blok dashboard PSJ di atas, diikuti carta perbandingan 3 tahun dan infografik KPI.
        </p>
      </section>

      <section id="pelanggan" className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-xl font-black text-slate-900 md:text-2xl">3. Pelanggan & Maklumat</h2>
        <h3 className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-slate-500">Komponen Kandungan</h3>
        <ul className="mt-3 space-y-2 text-sm font-medium text-slate-700">
          <li>• Pengurusan Maklumat: Mindscapping dan Vision Board jabatan.</li>
          <li>• Profil Pelanggan: Pelanggan Dalaman dan Pelanggan Luaran.</li>
          <li>• Makluman Kepuasan Pelanggan: Penghargaan, Aduan, Tahap Kepuasan.</li>
          <li>• BSC - Result Piagam Pelanggan.</li>
        </ul>
        <p className="mt-4 inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700">
          <PieChart className="h-4 w-4" />
          Cadangan visual: pie chart kepuasan + matriks aduan/penghargaan + panel BSC.
        </p>
      </section>

      <section id="sumber-manusia" className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-xl font-black text-slate-900 md:text-2xl">4. Pembangunan Sumber Manusia (Tenaga Kerja)</h2>
        <h3 className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-slate-500">Komponen Kandungan</h3>
        <ul className="mt-3 space-y-2 text-sm font-medium text-slate-700">
          <li>• Hala tuju pembangunan sumber manusia.</li>
          <li>• Kajian kepuasan kakitangan.</li>
          <li>• Laluan kerjaya kakitangan (kenaikan pangkat/kemajuan/sambung belajar).</li>
          <li>• Anugerah: Pekerja kaunter terbaik.</li>
          <li>• Data latihan: jumlah jam training (infografik).</li>
          <li>• Keselamatan & kesihatan: keputusan DASS (ISO, fizikal, kesejahteraan mental).</li>
        </ul>
        <p className="mt-4 inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
          <Briefcase className="h-4 w-4" />
          Cadangan visual: funnel laluan kerjaya + kad anugerah + infografik latihan dan DASS.
        </p>
      </section>

      <section id="proses-rantaian" className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-xl font-black text-slate-900 md:text-2xl">5. Pengurusan Proses & Rantaian Bekalan</h2>
        <h3 className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-slate-500">Komponen Kandungan</h3>
        <ul className="mt-3 space-y-2 text-sm font-medium text-slate-700">
          <li>• Proses bekalan dan vendor.</li>
          <li>• Peningkatan fasa KISWA.</li>
          <li>• Penilaian vendor (berasaskan data akaun).</li>
        </ul>
        <p className="mt-4 inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-xs font-bold text-violet-700">
          <CheckCircle2 className="h-4 w-4" />
          Cadangan visual: flow proses bekalan dan scorecard vendor mengikut kategori.
        </p>
      </section>

      <section id="hasil-pembuktian" className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-xl font-black text-slate-900 md:text-2xl">6. Hasil & Pembuktian (Outcomes)</h2>
        <h3 className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-slate-500">Komponen Kandungan</h3>
        <ul className="mt-3 space-y-2 text-sm font-medium text-slate-700">
          <li>• Hasil Kajian Kepuasan (disokong pembuktian visual Power BI).</li>
          <li>• Penilaian Program: tahap kepuasan pelanggan dan cadangan penambahbaikan.</li>
          <li>• Hasil Proses: EKSA, AKPAN, AIGA, pensijilan semula ISO, dan laporan internal audit.</li>
          <li>• Hasil Kewangan: pencapaian dan sokongan kewangan jabatan.</li>
        </ul>
        <p className="mt-4 inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700">
          <PieChart className="h-4 w-4" />
          Cadangan visual: panel Power BI outcomes + ringkasan audit/proses + prestasi kewangan.
        </p>
      </section>
    </div>
  );
};

export default AnnualReportContentsPage;
