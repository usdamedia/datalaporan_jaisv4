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
  { id: '13', name: 'UPP UNIT PENGURUSAN PROJEK', active: true },
  { id: '17', name: 'UNIT INTEGRITI', active: true },
  {
    id: '1',
    name: 'Bahagian Pentadbiran & Pengurusan Sumber BPPS',
    active: true,
    subUnits: [
      { id: 'bpps-pentadbiran', name: 'Unit Pentadbiran', active: true },
      { id: 'bpps-akaun', name: 'Unit Akaun', active: true },
      { id: 'bpps-hr', name: 'Unit HR & Latihan', active: true }
    ]
  },
  {
    id: '15',
    name: 'Bahagian Perancangan dan Penyelidikan BPNP',
    active: true,
    subUnits: [
      { id: 'bpnp-penyelidikan', name: 'Unit Penyelidikan', active: true },
      { id: 'bpnp-strategik', name: 'Unit Perancangan Strategik', active: true },
      { id: 'bpnp-akidah', name: 'Unit Akidah Tapisan', active: true }
    ]
  },
  { id: '2', name: 'Bahagian Dakwah BDAKWAH', active: true },
  { id: '3', name: 'Bahagian Kemajuan Institusi Masjid BKIM', active: true },
  { id: '5', name: 'Bahagian Penguatkuasaan Syariah BPKS', active: true },
  { id: '7', name: 'Bahagian Kemajuan Keluarga Islam BKKI', active: true },
  { id: '6', name: 'Bahagian Pengurusan Halal BPH', active: true },
  { id: '14', name: 'Bahagian Pendakwaan Syariah BPDS', active: true },
  { id: '16', name: 'DHQC - Darul Hana Quranic Centre', active: true },
  { id: '11', name: 'Bahagian Kemajuan Saudara Kita BKSK', active: true },
  { id: '8', name: 'Bahagian Pengukuhan Pendidikan Islam BPPI', active: true },
  { id: '12', name: 'Bahagian Kaunseling Syarie & Pembangunan Psikologi BKSPP', active: true },
  {
    id: '9',
    name: 'Unit Komunikasi Korporat UKOKO',
    active: true,
    subUnits: [
      { id: 'ukoko-pr', name: 'Unit Perhubungan Awam', active: true },
      { id: 'ukoko-perayaan', name: 'Unit Perayaan Islam', active: true },
      { id: 'ukoko-lain', name: 'Sub Unit UKOKO (Kemaskini Kemudian)', active: false },
    ]
  },
];

export const getIconForDept = (name: string) => {
  const normalizedName = name.toUpperCase();

  // Logic icons based on department names (Keywords)
  if (normalizedName.includes('UPP')) return <HardHat className="w-6 h-6" />;
  if (normalizedName.includes('BPPS') || normalizedName.includes('PENTADBIRAN')) return <Users className="w-6 h-6" />;
  if (normalizedName.includes('AKAUN')) return <Landmark className="w-6 h-6" />;
  if (normalizedName.includes('KUALITI')) return <ShieldCheck className="w-6 h-6" />;
  if (normalizedName.includes('INTEGRITI') || normalizedName.includes(' UI')) return <Scale className="w-6 h-6" />;
  if (normalizedName.includes('UKOKO')) return <Activity className="w-6 h-6" />;
  if (normalizedName.includes('BKKI')) return <Globe className="w-6 h-6" />;
  if (normalizedName.includes('BKSPP')) return <BookOpen className="w-6 h-6" />;
  if (normalizedName.includes('BPKS')) return <Zap className="w-6 h-6" />;
  if (normalizedName.includes('HR')) return <Briefcase className="w-6 h-6" />;
  if (normalizedName.includes('BPDS') || normalizedName.includes('PENDAKWAAN')) return <Gavel className="w-6 h-6" />;
  if (normalizedName.includes('DHQC') || normalizedName.includes('DARUL HANA')) return <Book className="w-6 h-6" />;
  
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

export const BKSK_2024_REFERENCE = {
  statistik: {
    pendaftaranPengislaman: 1485,
    programAktiviti: 315,
  },
  kelasBimbingan: [
    { name: 'Kuching', kelas: 13, guru: 13 },
    { name: 'Samarahan', kelas: 6, guru: 6 },
    { name: 'Serian', kelas: 0, guru: 0 },
    { name: 'Sri Aman', kelas: 5, guru: 5 },
    { name: 'Betong', kelas: 4, guru: 4 },
    { name: 'Sarikei', kelas: 5, guru: 5 },
    { name: 'Sibu', kelas: 2, guru: 2 },
    { name: 'Mukah', kelas: 5, guru: 5 },
    { name: 'Kapit', kelas: 0, guru: 0 },
    { name: 'Bintulu', kelas: 7, guru: 7 },
    { name: 'Miri', kelas: 6, guru: 6 },
    { name: 'Limbang', kelas: 0, guru: 0 },
  ],
  urusSetiaProkask: [
    { name: 'Kuching', urusSetia: 8, prokask: 1 },
    { name: 'Samarahan', urusSetia: 3, prokask: 1 },
    { name: 'Serian', urusSetia: 5, prokask: 2 },
    { name: 'Sri Aman', urusSetia: 15, prokask: 1 },
    { name: 'Betong', urusSetia: 7, prokask: 1 },
    { name: 'Sarikei', urusSetia: 2, prokask: 1 },
    { name: 'Sibu', urusSetia: 5, prokask: 1 },
    { name: 'Mukah', urusSetia: 5, prokask: 1 },
    { name: 'Kapit', urusSetia: 5, prokask: 1 },
    { name: 'Bintulu', urusSetia: 5, prokask: 2 },
    { name: 'Miri', urusSetia: 9, prokask: 1 },
    { name: 'Limbang', urusSetia: 2, prokask: 1 },
  ],
  kampungNuqaba: [
    { name: 'Kuching', kampungSaudaraKita: 137, nuqabaMualaf: 19 },
    { name: 'Samarahan', kampungSaudaraKita: 103, nuqabaMualaf: 11 },
    { name: 'Serian', kampungSaudaraKita: 78, nuqabaMualaf: 2 },
    { name: 'Sri Aman', kampungSaudaraKita: 161, nuqabaMualaf: 9 },
    { name: 'Betong', kampungSaudaraKita: 102, nuqabaMualaf: 11 },
    { name: 'Sarikei', kampungSaudaraKita: 33, nuqabaMualaf: 10 },
    { name: 'Sibu', kampungSaudaraKita: 45, nuqabaMualaf: 6 },
    { name: 'Mukah', kampungSaudaraKita: 56, nuqabaMualaf: 9 },
    { name: 'Kapit', kampungSaudaraKita: 77, nuqabaMualaf: 0 },
    { name: 'Bintulu', kampungSaudaraKita: 40, nuqabaMualaf: 5 },
    { name: 'Miri', kampungSaudaraKita: 47, nuqabaMualaf: 7 },
    { name: 'Limbang', kampungSaudaraKita: 133, nuqabaMualaf: 5 },
  ],
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
  taburan: {
    ibuPejabat: {
      bpps: 40,
      bpnp: 10,
      dakwah: 19,
      bkim: 18,
      bpks: 13,
      bkki: 13,
      bph: 20,
      bpds: 8,
      bksk: 10,
      bksp: 19,
      kaunseling: 5,
      ukoko: 8,
      upp: 10,
      integriti: 3,
      total: 196
    },
    daerah: [
      { name: 'Limbang', value: 21 },
      { name: 'Lawas', value: 11 },
      { name: 'Miri', value: 24 },
      { name: 'Bintulu', value: 24 },
      { name: 'Mukah', value: 17 },
      { name: 'Daro', value: 11 },
      { name: 'Kapit', value: 16 },
      { name: 'Sibu', value: 22 },
      { name: 'Sarikei', value: 20 },
      { name: 'Betong', value: 21 },
      { name: 'Sri Aman', value: 22 },
      { name: 'Serian', value: 18 },
      { name: 'Samarahan', value: 31 },
      { name: 'Kuching', value: 46 }
    ]
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

export const LEADERSHIP_2024_REFERENCE = {
  jpto: 3,
  mpj: 3,
  pegawaiAgama: 1,
  perhimpunan: {
    tawjihat: 1,
    perdana: 1,
    bulanan: 3,
    total: 5
  },
  aset: 2,
  keselamatan: 2,
  kader: 2,
  kewanganPerolehan: 3,
  panelHR: {
    biasa: 2,
    khas: 4,
    total: 6
  }
};

export const FINANCE_2024_REFERENCE = {
  financeYears: [
    { year: '2021', lulus: 41206385, belanja: 37661253, hasil: 224090 },
    { year: '2022', lulus: 43932531, belanja: 43925152, hasil: 245330 },
    { year: '2023', lulus: 48731072, belanja: 48655736, hasil: 221755 },
    { year: '2024', lulus: 63949076, belanja: 62677064, hasil: 211630 }
  ],
  percentageBelanja: 98.01,
  percentageEcsa: 98.2,
  financeDistricts: [
    { name: 'Kuching', naziran: true, starRating: 5 },
    { name: 'Samarahan', naziran: true, starRating: 5 },
    { name: 'Serian', naziran: true, starRating: 5 },
    { name: 'Sri Aman', naziran: true, starRating: 5 },
    { name: 'Betong', naziran: true, starRating: 5 },
    { name: 'Sarikei', naziran: false, starRating: 5 },
    { name: 'Sibu', naziran: true, starRating: 5 },
    { name: 'Mukah', naziran: true, starRating: 5 },
    { name: 'Kapit', naziran: true, starRating: 5 },
    { name: 'Bintulu', naziran: true, starRating: 5 },
    { name: 'Miri', naziran: true, starRating: 5 },
    { name: 'Limbang', naziran: true, starRating: 4 },
    { name: 'Lawas', naziran: true, starRating: 0 },
    { name: 'Daro', naziran: true, starRating: 0 }
  ]
};

export const BKKI_2024_REFERENCE = {
  stats: {
    bilPerkahwinan: 5807,
    bilPerceraian: 2095,
    bilRuju: 254,
    bilKadNikah: 5152,
    jumPesertaKursus: 10184,
    bilProgram: 67
  },
  registrarTable: [
    { region: 'Seluruh Sarawak', kpncr: 1, pncr: 2, tpncr: 0, ppncr: 0, jurunikah: 7 },
    { region: 'Kuching', kpncr: 0, pncr: 2, tpncr: 2, ppncr: 10, jurunikah: 143 },
    { region: 'Samarahan', kpncr: 0, pncr: 2, tpncr: 1, ppncr: 5, jurunikah: 50 },
    { region: 'Serian', kpncr: 0, pncr: 1, tpncr: 1, ppncr: 3, jurunikah: 18 },
    { region: 'Sri Aman', kpncr: 0, pncr: 1, tpncr: 1, ppncr: 6, jurunikah: 12 },
    { region: 'Betong', kpncr: 0, pncr: 1, tpncr: 1, ppncr: 10, jurunikah: 39 },
    { region: 'Sarikei', kpncr: 0, pncr: 1, tpncr: 1, ppncr: 5, jurunikah: 19 },
    { region: 'Sibu', kpncr: 0, pncr: 1, tpncr: 1, ppncr: 5, jurunikah: 11 },
    { region: 'Kapit', kpncr: 0, pncr: 1, tpncr: 1, ppncr: 5, jurunikah: 10 },
    { region: 'Mukah/ Daro', kpncr: 0, pncr: 2, tpncr: 1, ppncr: 9, jurunikah: 45 },
    { region: 'Bintulu', kpncr: 0, pncr: 1, tpncr: 1, ppncr: 3, jurunikah: 17 },
    { region: 'Miri', kpncr: 0, pncr: 2, tpncr: 1, ppncr: 6, jurunikah: 17 },
    { region: 'Limbang/ Lawas', kpncr: 0, pncr: 2, tpncr: 1, ppncr: 6, jurunikah: 24 }
  ]
};

export const BPPI_2024_REFERENCE = {
  institusi: {
    mis: {
      rendah: 10,
      menengah: 2,
      total: 12
    },
    ipip: {
      tadika: 16,
      kafa: 4,
      srar: 4,
      sra: 6,
      sma: 6,
      tahfizRendah: 5,
      tahfizMenengah: 3,
      tahfizRendahMenengah: 30,
      pondok: 2,
      lepasanSpm: 1,
      dewasa: 1,
      total: 78
    },
    grandTotal: 90
  },
  enrolmenMIS: [
    { name: "Ma'had Tahfiz Tun Abdul Rahman Ya'kub (MATTARY)", value: 352 },
    { name: "SK (A) Datuk Haji Abdul Kadir Hassan", value: 1225 },
    { name: "SK (A) Ibnu Khaldun", value: 519 },
    { name: "SK (A) MIS Sri Aman", value: 387 },
    { name: "SK (A) MIS Sarikei", value: 428 },
    { name: "SK (A) MIS Sibu", value: 508 },
    { name: "SK (A) MIS Mukah", value: 278 },
    { name: "SK (A) MIS Bintulu", value: 559 },
    { name: "SK (A) MIS Miri", value: 658 },
    { name: "SK (A) MIS Lawas", value: 517 },
    { name: "SMK (A) Tun Ahmad Zaidi", value: 716 },
    { name: "SMK Pesantren Abdul Taib Mahmud", value: 492 }
  ],
  kafa: {
    pelajar: 69429,
    guru: 2523,
    penyelia: 36,
    upkk: {
      calon: 12686,
      gps: 2.28
    }
  },
  kad: {
    kelas: 11,
    pelajar: 491,
    guru: {
      lelaki: 37,
      wanita: 14,
      total: 51
    },
    pecahan: [
      { name: "Kuching", kelas: 1, pelajar: 48 },
      { name: "Samarahan", kelas: 1, pelajar: 43 },
      { name: "Serian", kelas: 1, pelajar: 37 },
      { name: "Sri Aman", kelas: 1, pelajar: 39 },
      { name: "Betong", kelas: 1, pelajar: 29 },
      { name: "Sarikei", kelas: 1, pelajar: 23 },
      { name: "Sibu", kelas: 1, pelajar: 68 },
      { name: "Mukah", kelas: 1, pelajar: 25 },
      { name: "Kapit", kelas: 0, pelajar: 0 },
      { name: "Bintulu", kelas: 1, pelajar: 50 },
      { name: "Miri", kelas: 1, pelajar: 84 },
      { name: "Limbang", kelas: 1, pelajar: 45 }
    ]
  }
};

export const BPH_2024_REFERENCE = {
  sphm: {
    permohonan: 722,
    aktif: 935,
    skim: {
      rumahSembelihan: 25,
      produk: 435,
      premis: 439,
      oem: 26,
      logistik: 8,
      barangGunaan: 2
    }
  },
  trend: {
    y2023: { permohonan: 383, aktif: 823 },
    y2024: { permohonan: 722, aktif: 935 }
  },
  pemantauan: {
    patuh: 339,
    amaran: 107,
    gantung: 84,
    tarikBalik: 3,
    lain: 11,
    total: 544
  },
  penguatkuasaan: 22,
  aduan: 37,
  ziarahHalal: 37,
  zonHalal: [
    "Food Court Majma Mall, Kuching",
    "Kubah Ria, Kuching",
    "Medan Selera Lundu, Kuching",
    "Taman Selera Harmoni, Sibu",
    "Medan Selera Daro, Mukah",
    "Medan Selera Taman Seroja, Miri",
    "Anjung Sari dan Medan Selera Lawas, Limbang"
  ],
  aktiviti: {
    taklimat: 22,
    kursus: 48,
    total: 57
  }
};

export const BPKS_2024_REFERENCE = {
  statistik: {
    btam: 219,
    rondaan: 279
  },
  pegawai: {
    ibuPejabat: 12,
    kuching: 39,
    samarahan: 19,
    serian: 15,
    sriAman: 15,
    betong: 11,
    sarikei: 15,
    sibu: 15,
    mukah: 19,
    kapit: 9,
    bintulu: 13,
    miri: 11,
    limbang: 20,
    total: 201
  },
  borang5: {
    bahagian: {
      kuching: 15,
      samarahan: 133,
      serian: 27,
      sriAman: 6,
      betong: 56,
      sarikei: 22,
      sibu: 31,
      mukah: 13,
      kapit: 0,
      bintulu: 21,
      miri: 88,
      limbang: 37
    },
    kategori: {
      matrimoni: 307,
      jenayahSyariah: 142
    },
    total: 449
  },
  kertasSiasatan: {
    matrimoni: 310,
    jenayahSyariah: 94,
    total: 404
  },
  aktiviti: {
    total: 65
  }
};

export const UKOKO_2024_REFERENCE = {
  perayaanIslam: [
    { nama: "Majlis Tilawah dan Menghafaz Al-Quran Peringkat Sarawak Kali ke-63", tarikh: "2024-03-06", tuanRumah: "Limbang", mesyuarat: 3 },
    { nama: "Majlis Sambutan Ma'al Hijrah Peringkat Sarawak", tarikh: "2024-07-07", tuanRumah: "Kuching", mesyuarat: 3 },
    { nama: "Majlis Perhimpunan dan Perarakan Sempena Sambutan Maulidur Rasul Peringkat Sarawak Tahun 1446H/2024M", tarikh: "2024-09-17", tuanRumah: "Mukah", mesyuarat: 3 }
  ],
  majlisKesyukuran: [
    { nama: "Majlis Kesyukuran Nuzul Al-Quran Peringkat Sarawak Tahun 2024M/1445H", tarikh: "2024-03-27", tuanRumah: "Samarahan", mesyuarat: 3 },
    { nama: "Majlis Kesyukuran Ma'al Hijrah Peringkat Sarawak", tarikh: "2024-07-06", tuanRumah: "Kuching", mesyuarat: 3 },
    { nama: "Majlis Kesyukuran Sempena Sambutan Hari Sarawak 2024", tarikh: "2024-07-21", tuanRumah: "Bintulu", mesyuarat: 3 },
    { name: "Majlis Kesyukuran Sambutan Perayaan Hari Keputeraan Rasmi KDYMM SPB YDP Agong ke-XVII Peringkat Sarawak", tarikh: "2024-09-06", tuanRumah: "Samarahan", mesyuarat: 3 },
    { name: "Majlis Kesyukuran Sempena Sambutan Perayaan Hari Malaysia", tarikh: "2024-09-15", tuanRumah: "Sri Aman", mesyuarat: 3 },
    { name: "Majlis Kesyukuran Sambutan Maulidur Rasul Peringkat Sarawak Tahun 1446H/2024M", tarikh: "2024-09-16", tuanRumah: "Mukah", mesyuarat: 3 },
    { name: "Majlis Kesyukuran Sempena Sambutan Hari Lahir ke-78 TYT Yang Di-Pertua Negeri Sarawak", tarikh: "2024-10-10", tuanRumah: "Kuching", mesyuarat: 3 }
  ],
  total: 10
};

export const UKOKO_PR_2024_REFERENCE = {
  aduan: {
    jumlah: 15,
    statusSelesai: 15,
    sumber: {
      talikhidmat: 11,
      lain: 4,
    },
    kategori: {
      kadNikah: 1,
      kafa: 1,
      logoHalal: 1,
      masjid: 7,
      ncr: 1,
      tindakanPenguatkuasaanSyariah: 2,
      tindakanPengukuhanPendidikanIslam: 1,
      usk: 1,
    },
    lokasi: {
      hqBkki: 1,
      paibBintulu: 1,
      paibKuching: 6,
      paibMiri: 2,
      paibSarikei: 1,
      paibSibu: 3,
    },
  },
  maklumBalas: {
    jumlah: 7473,
    queueBee: {
      jumlah: 6533,
      puas: 6453,
      tidakPuas: 80,
    },
    kodQr: {
      jumlah: 940,
      puas: 928,
      tidakPuas: 12,
    },
    qrCode: {
      jumlah: 940,
      puas: 928,
      tidakPuas: 12,
    },
  },
  lawatanLuar: 44,
};

export const DHQC_2024_REFERENCE = {
  pusatPemuliaan: [
    { lokasi: "Masjid Ikhwanul Islam, Taman Sukma", bahagian: "Kuching" },
    { lokasi: "Pejabat Agama Islam Bahagian Samarahan", bahagian: "Samarahan" },
    { lokasi: "Masjid Assyakirin", bahagian: "Bintulu" },
    { lokasi: "Masjid Al-Muttaqin", bahagian: "Sarikei" },
    { lokasi: "Sekolah Kebangsaan Agama Majlis Islam Sibu", bahagian: "Sibu" }
  ],
  statistikDebu: {
    berat: 12.5,
    kekerapan: 5
  },
  guruAlQuran: {
    kuching: 6,
    samarahan: 6,
    serian: 1,
    sriAman: 1,
    betong: 4,
    sarikei: 2,
    sibu: 0,
    mukah: 2,
    kapit: 0,
    bintulu: 2,
    miri: 2,
    limbang: 3,
    total: 29
  },
  penyelia: {
    ibuPejabat: 3,
    bintulu: 1,
    total: 4
  },
  hakim: {
    negeri: 19,
    bahagian: 6,
    daerah: 48,
    total: 73
  },
  qariQariah: {
    kuching: 11,
    samarahan: 6,
    serian: 7,
    sriAman: 8,
    betong: 11,
    sarikei: 12,
    sibu: 12,
    mukah: 13,
    kapit: 8,
    bintulu: 14,
    miri: 7,
    limbang: 12,
    total: 121
  }
};

export const UPP_2024_REFERENCE = {
  kpi: {
    peratusSiap: 48.4
  },
  projekMasjid: [
    { bahagian: "Kuching", perancangan: 24, pelaksanaan: 3, siap: 33, total: 60 },
    { bahagian: "Samarahan", perancangan: 13, pelaksanaan: 1, siap: 9, total: 23 },
    { bahagian: "Serian", perancangan: 3, pelaksanaan: 2, siap: 1, total: 6 },
    { bahagian: "Sri Aman", perancangan: 0, pelaksanaan: 2, siap: 1, total: 3 },
    { bahagian: "Betong", perancangan: 10, pelaksanaan: 3, siap: 2, total: 15 },
    { bahagian: "Sarikei", perancangan: 1, pelaksanaan: 1, siap: 3, total: 5 },
    { bahagian: "Sibu", perancangan: 0, pelaksanaan: 0, siap: 4, total: 4 },
    { bahagian: "Kapit", perancangan: 0, pelaksanaan: 1, siap: 1, total: 2 },
    { bahagian: "Mukah", perancangan: 4, pelaksanaan: 4, siap: 17, total: 25 },
    { bahagian: "Bintulu", perancangan: 9, pelaksanaan: 0, siap: 2, total: 11 },
    { bahagian: "Miri", perancangan: 6, pelaksanaan: 0, siap: 10, total: 16 },
    { bahagian: "Limbang", perancangan: 7, pelaksanaan: 0, siap: 5, total: 12 }
  ],
  mesyuarat: {
    pembangunan: 4,
    teknikal: 4,
    total: 8
  },
  statistikTahunan: {
    dijalankan: 10,
    siap: 4
  },
  projekSekolah: {
    total: 124,
    siap: 120,
    senarai: [
      { nama: "SMKA Sheikh Haji Othman Abdul Wahab", total: 13, siap: 13 },
      { nama: "SMKA Matang", total: 3, siap: 3 },
      { nama: "SMKA Saratok", total: 3, siap: 3 },
      { nama: "SMKA Igan", total: 6, siap: 5 },
      { nama: "SMKA Sibu", total: 4, siap: 8 },
      { nama: "SMKA Miri", total: 8, siap: 8 },
      { nama: "SMKA Limbang", total: 12, siap: 12 },
      { nama: "SMKA Tun Ahmad Zaidi", total: 21, siap: 18 },
      { nama: "SKA MIS Sibu", total: 1, siap: 1 },
      { nama: "SMK Pesantren Abdul Taib", total: 21, siap: 21 },
      { nama: "SKA (MIS) Datuk Haji Abdul Kadir Hassan", total: 22, siap: 19 },
      { nama: "SKA (MIS) Ibnu Khaldun", total: 5, siap: 5 },
      { nama: "SKA (MIS) Sarikei", total: 1, siap: 1 },
      { nama: "SKA (MIS) Mukah", total: 1, siap: 1 },
      { nama: "SKA (MIS) Bintulu", total: 1, siap: 0 },
      { nama: "SKA (MIS) Miri", total: 1, siap: 1 },
      { nama: "SKA (MIS) Lawas", total: 1, siap: 1 }
    ]
  }
};

export const INTEGRITI_2024_REFERENCE = {
  tadbirUrus: {
    mesyuarat: 3,
    program: 31
  },
  multimedia: {
    video: 11
  },
  dokumentasi: {
    manual: 1,
    polisi: 4,
    total: 5
  }
};

export const QUALITY_INITIATIVES_2024_REFERENCE = {
  iso9001: {
    badanAudit: "SIRIM QAS International Sdn. Bhd.",
    tarikhAudit: "20-21 Mei 2024",
    status: "Recommended to Continue Certification",
    ncr: 0,
    ofi: 2
  },
  iso37001: {
    badanAudit: "SIRIM QAS International Sdn. Bhd.",
    tarikhAudit: "23-25 Oktober 2024",
    status: "Recommended to Continue Certification",
    ncr: 0,
    ofi: 2
  },
  frameworks: ["MBEF", "SCS Scorecard", "EKSA"]
};

export const LATIHAN_2024_REFERENCE = {
  ringkasan: {
    jumlah: 40,
    generik: 2,
    spesifik: 20
  },
  pencapaian: {
    mencapai: { pp: 121, sk1: 64, sk2: 207, total: 392, ppPct: 100, sk1Pct: 100, sk2Pct: 100, totalPct: 75 },
    tidakMencapai: { pp: 0, sk1: 0, sk2: 0, total: 0, ppPct: 0, sk1Pct: 0, sk2Pct: 0, totalPct: 0 },
    tiadaRekod: { pp: 0, sk1: 0, sk2: 0, total: 0, ppPct: 0, sk1Pct: 0, sk2Pct: 0, totalPct: 0 }
  }
};
