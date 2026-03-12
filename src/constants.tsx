import React from 'react';
import { Department } from './types';
import { 
  Building2, 
  Briefcase, 
  Scale, 
  Users, 
  ShieldCheck, 
  FileText, 
  Activity, 
  Globe, 
  Cpu, 
  Landmark,
  Zap,
  BookOpen,
  PenTool,
  HardHat, // Added for UPP
  Gavel, // Added for Pendakwaan
  Book // Added for DHQC
} from 'lucide-react';

export const DEPARTMENTS: Department[] = [
  { id: '1', name: 'BPNP', active: true }, // Renamed from BP&P
  { id: '2', name: 'BDKWH', active: true },
  { id: '3', name: 'BKIM', active: true },
  { 
    id: '4', 
    name: 'BPPS', 
    active: true,
    subUnits: [
      { id: '4a', name: 'U Pentadbiran', active: true },
      { id: '4b', name: 'U Kualiti', active: true },
      { id: '4c', name: 'U HR & Latihan', active: true },
      { id: '4d', name: 'U Akaun', active: true },
    ]
  },
  { id: '5', name: 'BPKS', active: true },
  { id: '6', name: 'BPH', active: true },
  { id: '7', name: 'BKKI', active: true },
  { id: '8', name: 'BPPI', active: true },
  { id: '9', name: 'UKOKO', active: true },
  { id: '10', name: 'U. INTEGRITI', active: true },
  { id: '11', name: 'BKSK', active: true },
  { id: '12', name: 'BKSPP', active: true },
  { id: '13', name: 'UPP', active: true },
  { id: '14', name: 'BPDS', active: true },
  { id: '15', name: 'DHQC', active: true },
];

export const getIconForDept = (name: string) => {
  // Logic icons based on department names (Keywords)
  if (name.includes('UPP')) return <HardHat className="w-6 h-6" />;
  if (name.includes('BPPS') || name.includes('Pentadbiran')) return <Users className="w-6 h-6" />;
  if (name.includes('Akaun')) return <Landmark className="w-6 h-6" />;
  if (name.includes('Kualiti')) return <ShieldCheck className="w-6 h-6" />;
  if (name.includes('INTEGRITI')) return <Scale className="w-6 h-6" />;
  if (name.includes('UKOKO')) return <Activity className="w-6 h-6" />;
  if (name.includes('BKKI')) return <Globe className="w-6 h-6" />;
  if (name.includes('BKSPP')) return <BookOpen className="w-6 h-6" />;
  if (name.includes('BPKS')) return <Zap className="w-6 h-6" />;
  if (name.includes('HR')) return <Briefcase className="w-6 h-6" />;
  if (name.includes('BPDS') || name.includes('Pendakwaan')) return <Gavel className="w-6 h-6" />;
  if (name.includes('DHQC')) return <Book className="w-6 h-6" />;
  
  // Default icon
  return <Building2 className="w-6 h-6" />;
};

export const DAKWAH_2024_REFERENCE = {
  statistik: {
    jais: 649,
    total: 11370
  },
  tauliahDikeluarkan: {
    seluruhSarawak: 142,
    kuching: 81,
    samarahan: 58,
    serian: 39,
    sriAman: 6,
    betong: 7,
    sarikei: 2,
    sibu: 9,
    mukah: 54,
    kapit: 1,
    bintulu: 14,
    miri: 25,
    limbang: 13,
    lainLain: 33,
    total: 400
  },
  tauliahAktif: 618,
  perbandingan: {
    y2023: { jais: 802, agensi: 3096 },
    y2024: { jais: 649, agensi: 10721 }
  },
  guruWargaAsing: {
    kuching: 39,
    samarahan: 8,
    serian: 2,
    sriAman: 0,
    betong: 1,
    sarikei: 0,
    sibu: 3,
    mukah: 0,
    kapit: 0,
    bintulu: 19,
    miri: 3,
    limbang: 1,
    total: 76
  },
  media: {
    radio: 366,
    internet: 242,
    total: 608
  }
};

export const SARAWAK_DIVISIONS = [
  "Kuching", "Samarahan", "Serian", "Sri Aman", "Betong", 
  "Sarikei", "Sibu", "Kapit", "Mukah", "Bintulu", "Miri", "Limbang"
];

export const SCHOOL_LIST = [
  "SMKA Sheikh Haji Othman Abdul Wahab",
  "SMKA Matang",
  "SMKA Saratok",
  "SMKA Igan",
  "SMKA Sibu",
  "SMKA Miri",
  "SMKA Limbang",
  "SMKA Tun Ahmad Zaidi",
  "SKA MIS Sibu",
  "SMK Pesantren Abdul Taib",
  "SKA (MIS) Datuk Haji Abdul Kadir Hasan",
  "SKA (MIS) Ibnu Khaldun",
  "SKA (MIS) Sarikei",
  "SKA (MIS) Mukah",
  "SKA (MIS) Bintulu",
  "SKA (MIS) Miri",
  "SKA (MIS) Lawas"
];

export const BKIM_2024_REFERENCE = {
  fasiliti: {
    masjid: 473,
    surau: 1112,
    musolla: 45
  },
  perjawatan: {
    imam1: 1468,
    imam2: 1630,
    imam3: 361,
    bilal: 345,
    marbot: 46
  },
  kubur: {
    mis: 40,
    kerajaan: 362,
    lak: 23,
    lain: 28,
    total: 453
  },
  bintang: {
    star5: 4,
    star4: 16,
    star3: 42,
    star2: 102,
    star1: 151,
    star0: 158,
    total: 473
  },
  divisions: [
    { name: 'Kuching', program: 124, guruTakmir: 42, lak: 8 },
    { name: 'Samarahan', program: 108, guruTakmir: 22, lak: 11 },
    { name: 'Serian', program: 56, guruTakmir: 9, lak: 3 },
    { name: 'Sri Aman', program: 11, guruTakmir: 1, lak: 4 },
    { name: 'Betong', program: 12, guruTakmir: 8, lak: 14 },
    { name: 'Sarikei', program: 41, guruTakmir: 11, lak: 3 },
    { name: 'Sibu', program: 7, guruTakmir: 3, lak: 3 },
    { name: 'Mukah', program: 16, guruTakmir: 4, lak: 9 },
    { name: 'Kapit', program: 34, guruTakmir: 14, lak: 8 },
    { name: 'Bintulu', program: 6, guruTakmir: 3, lak: 0 },
    { name: 'Miri', program: 19, guruTakmir: 3, lak: 0 },
    { name: 'Limbang', program: 33, guruTakmir: 9, lak: 55 }
  ]
};

export const BPNP_2024_REFERENCE = {
  kajian: [
    "Keperluan Orang Kurang Upaya (OKU) Terhadap Program Kefahaman Islam di Jabatan Agama Islam Sarawak.",
    "Persepsi Masyarakat Terhadap Perkhidmatan Runding Cara Perkahwinan di Jabatan Agama Islam Sarawak.",
    "Persepsi Jemaah Terhadap Teks Khutbah Jumaat Majlis Islam Sarawak (MIS) Di Masjid-masjid Di Sarawak."
  ],
  penulisan: {
    johan: { nama: "Ustaz Muhammad Khatib bin Anuar", tajuk: "Peranan Masjid Dalam Penyebaran Dakwah Islamiah" },
    naibJohan: { nama: "Puan Hanim binti Ismawi", tajuk: "Keperluan Halal di Sarawak: Proses, Cabaran dan Langkah Penyelesaian" },
    ketiga: { nama: "Puan Erma Wilma binti Idris", tajuk: "Kembalikan Ledakan Kegemilangan Remaja Perspektif Islam" }
  },
  statistik: {
    penapisan: 28,
    kluster: 26,
    program: 29,
    infografik: 26
  }
};

export const HR_2024_REFERENCE = {
  ringkasan: {
    perjawatanBajet: 471,
    perjawatanDiisi: 387,
    jumlahWargaKerja: 500
  },
  demografi: {
    lelaki: 271,
    wanita: 229
  },
  skim: {
    jusa: 1,
    halEhwalIslam: 228,
    perundangan: 6,
    kewangan: 20,
    keselamatan: 17,
    pendidikan: 3,
    kejuruteraan: 1,
    pentadbiran: 58,
    pembantuAm: 53
  },
  sangkutan: {
    mis: 36,
    jakim: {
      penyeliaKafa: 35,
      penggerak: 11,
      takmir: 31
    },
    total: 113
  },
  bersara: 9
};

export const BKSP_2024_REFERENCE = {
  permohonan: [
    { name: 'Kuching', value: 1477 },
    { name: 'Samarahan', value: 408 },
    { name: 'Serian', value: 29 },
    { name: 'Sri Aman', value: 82 },
    { name: 'Betong', value: 195 },
    { name: 'Sarikei', value: 78 },
    { name: 'Sibu', value: 326 },
    { name: 'Mukah', value: 181 },
    { name: 'Kapit', value: 14 },
    { name: 'Bintulu', value: 173 },
    { name: 'Miri', value: 352 },
    { name: 'Limbang', value: 135 }
  ],
  pegawai: [
    { name: 'Kuching', value: 11 },
    { name: 'Samarahan', value: 3 },
    { name: 'Serian', value: 8 },
    { name: 'Sri Aman', value: 2 },
    { name: 'Betong', value: 5 },
    { name: 'Sarikei', value: 6 },
    { name: 'Sibu', value: 3 },
    { name: 'Mukah', value: 5 },
    { name: 'Kapit', value: 4 },
    { name: 'Bintulu', value: 4 },
    { name: 'Miri', value: 3 },
    { name: 'Limbang', value: 8 }
  ],
  statistik: {
    kaunselingSyarie: 35,
    psikologi: 50
  },
  statusKes: {
    diterima: 3450,
    diselesaikan: 2139
  },
  puncaKrisis: [
    "Tiada Persefahaman", "Abai Nafkah", "Tidak Bertanggungjawab", "Disyaki Curang",
    "Tinggalkan Rumah", "Bengis/Mendera", "Cemburu", "Masalah Dadah", "Hutang",
    "Masalah Agama", "Masalah Judi", "Tidak Taat", "Lain-lain", "Masalah Arak",
    "Campur Tangan Keluarga Suami", "Keluar Rumah Tanpa Izin", "Masalah Seksual",
    "Campur Tangan Keluarga Isteri", "Ingin Berpoligami", "Gangguan Spiritual", "Enggan Bermadu"
  ]
};

export const BPDS_2024_REFERENCE = {
  kertasSiasatan: {
    matrimoni: 307,
    jenayahSyariah: 101,
    total: 408
  },
  kesSelesai: [
    { name: 'Kuching', value: 13 },
    { name: 'Samarahan', value: 91 },
    { name: 'Serian', value: 0 },
    { name: 'Sri Aman', value: 4 },
    { name: 'Betong', value: 35 },
    { name: 'Sarikei', value: 19 },
    { name: 'Sibu', value: 15 },
    { name: 'Mukah', value: 3 },
    { name: 'Kapit', value: 0 },
    { name: 'Bintulu', value: 7 },
    { name: 'Miri', value: 23 },
    { name: 'Limbang', value: 30 }
  ],
  pendakwaSyarie: {
    pegawaiSyariah: 3,
    penolongPegawaiSyariah: 3,
    penolongPegawaiHalEhwalIslam: 1,
    total: 7
  },
  pendaftaranKes: {
    matrimoni: 305,
    jenayahSyariah: 91,
    total: 396
  },
  penggubalanKaedah: [
    { name: 'Persijilan Halal', value: 100 },
    { name: 'Pentadbiran Institusi Pendidikan Islam', value: 100 },
    { name: 'Pentauliahan Mengajar Agama Islam', value: 16.66 },
    { name: 'Hal Ehwal Pengislaman', value: 16.66 },
    { name: 'Hal Ehwal Masjid', value: 16.66 },
    { name: 'Prosiding Hal Ehwal Suami Isteri, Borang-borang dan Fi', value: 58.31 },
    { name: 'Kahwin Bawah Umur', value: 8.34 },
    { name: 'Pengurusan Tanah Perkuburan Islam', value: 16.66 }
  ],
  aktiviti: 35
};
