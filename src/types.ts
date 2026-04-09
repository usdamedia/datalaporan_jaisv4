export interface SubUnit {
  id: string;
  name: string;
  active: boolean;
  completed?: boolean;
}

export interface Department {
  id: string;
  name: string;
  active: boolean;
  completed?: boolean;
  subUnits?: SubUnit[];
}

export interface LawatanItem {
  jenis: 'keluar' | 'masuk';
  tajukAgensi: string;
  tarikh: string;
  tempat: string;
  objektif: string;
}

// Data asas untuk report umum
export interface ReportData {
  tarikh: string;
  disediakanOleh: string;
  ringkasan: string;
  isu: string;
  cadangan: string;
  lawatan?: LawatanItem[];
}

export interface PenulisanItem {
  kategori: string;
  penulis: string;
  tajuk: string;
}

// Data spesifik untuk BP&P
export interface BppData extends ReportData {
  bilKajian: number | string;
  tajukKajian: string;
  senaraiPenulisan: PenulisanItem[];
  bilBahanTapis: number | string;
  bilKlusterData: number | string;
  bilProgram: number | string;
  bilInfografik: number | string;
}

// Data spesifik untuk UPP
export interface UppDivisionRow {
  name: string;
  fasaPerancangan: number;
  fasaPelaksanaan: number;
  siapSepenuhnya: number;
}

export interface UppSchoolRow {
  name: string;
  jumlahProjek: number;
  projekSelesai: number;
}

export interface UppData extends ReportData {
  // Projek Masjid/Surau by Division
  uppDivisions: UppDivisionRow[];
  
  // Mesyuarat
  bilMesyuaratJawatankuasa: number;
  bilMesyuaratTeknikal: number;

  // Status Tahunan 2025
  projekDijalankan2025: number;
  projekSiap2025: number;

  // Sekolah
  uppSchools: UppSchoolRow[];
}

export interface VideoItem {
  tajuk: string;
  pautan: string;
}

// Data spesifik untuk UNIT INTEGRITI
export interface IntegritiData extends ReportData {
  bilMesyuaratTatakelola: number;
  bilVideoIntegriti: number;
  senaraiVideo: VideoItem[];
  linkVideoQr: string; // URL for Video Competition QR Code
  bilProgramIntegriti: number;
  bilManual: number;
  bilPolisi: number;
  linkBukti: string; // URL for Document QR Code
  
  // Inisiatif Kualiti - ISO 9001
  iso9001Date: string;
  iso9001AuditDetail: string; // e.g. "Audit Pematuhan oleh SIRIM..."
  iso9001Finding: string;     // e.g. "Recommended to Continue Certification"
  iso9001Ncr: number;
  iso9001Ofi: number;
  
  // Inisiatif Kualiti - ABMS
  abmsDate: string;
  abmsAuditDetail: string;
  abmsFinding: string;
  abmsNcr: number;
  abmsOfi: number;
  
  // Inisiatif Kualiti - MBEF
  mbefStatus: string; // Text field for MBEF details
}

export interface RetiredStaff {
  nama: string;
  jawatan: string;
  tarikhBersara: string;
  stesenTerakhir: string;
}

export interface StaffingStats {
  perjawatanDiisi: number;
  lelaki: number;
  wanita: number;
  
  // Kumpulan
  jusa: number;
  halEhwalIslam: number;
  perundangan: number;
  kewangan: number;
  keselamatan: number;
  pendidikan: number;
  kejuruteraan: number;
  pentadbiranSokongan: number;
  pembantuAm: number;

  // Kakitangan Sangkutan
  pekhidmatMis: number;
  penggerakMasyarakat: number;
  penyeliaKafa: number;
  pegawaiTakmir: number;
}

export interface HqDepartmentStats {
  pentadbiran: number;
  perancangan: number;
  dakwah: number;
  institusiMasjid: number;
  penguatkuasaan: number;
  keluargaIslam: number;
  halal: number;
  pendakwaan: number;
  saudaraKita: number;
  pendidikanIslam: number;
  kaunseling: number;
  komunikasi: number;
  pengurusanProjek: number;
  integriti: number;
}

export interface DistrictStats {
  limbang: number;
  lawas: number;
  miri: number;
  bintulu: number;
  mukah: number;
  daro: number;
  kapit: number;
  sibu: number;
  sarikei: number;
  betong: number;
  sriAman: number;
  serian: number;
  samarahan: number;
  kuching: number;
}

// Data spesifik untuk Unit Akaun
export interface FinanceYearRow {
  year: string;
  lulus: number;
  belanja: number;
  // Baki calculated automatically
  hasil: number;
}

export interface FinanceDistrictRow {
  name: string;
  naziran: boolean; // true = tick, false = x
  starRating: number; // 0-5 stars
}

export interface FinanceData {
    financeYears: FinanceYearRow[];
    percentageBelanja: number;
    percentageEcsa: number;
    financeDistricts: FinanceDistrictRow[];
}

// Data spesifik untuk BKKI (Keluarga Islam)
export interface BkkiStatRow {
  region: string;
  kpncr: number;
  pncr: number;
  tpncr: number;
  ppncr: number;
  jurunikah: number;
}

export interface BkkiData {
  stats: {
    bilPerkahwinan: number;
    bilPerceraian: number;
    bilRuju: number;
    bilKadNikah: number;
    jumPesertaKursus: number;
    bilProgram: number;
  };
  registrarTable: BkkiStatRow[];
}

// Data spesifik untuk BKIM (Institusi Masjid)
export interface BkimDivisionRow {
  name: string;
  program: number;
  guruTakmir: number;
  lak: number;
}

export interface BkimData {
  // Fasiliti
  bilMasjid: number;
  bilSurau: number;
  bilMusolla: number;

  // Perjawatan
  imam1: number;
  imam2: number;
  imam3: number;
  bilal: number;
  marbot: number;

  // Pengurusan Jenazah (Tanah Perkuburan)
  kuburMis: number;
  kuburKerajaan: number;
  kuburLak: number;
  kuburLain: number;

  // Penarafan Bintang
  star5: number;
  star4: number;
  star3: number;
  star2: number;
  star1: number;
  star0: number;

  // Data by Division
  bkimDivisions: BkimDivisionRow[];
}

export interface LeadershipData {
  jpto: number;
  mpj: number;
  pegawaiAgama: number;
  perhimpunan: {
    tawjihat: number;
    perdana: number;
    bulanan: number;
    total: number;
  };
  aset: number;
  keselamatan: number;
  kader: number;
  kewanganPerolehan: number;
  panelHR: {
    biasa: number;
    khas: number;
    total: number;
  };
}

// Data spesifik untuk BPPS
export interface BppsData extends ReportData {
  senaraiBersara: RetiredStaff[];
  statistik: StaffingStats;
  taburanKakitangan: {
    ibuPejabat: HqDepartmentStats;
    daerah: DistrictStats;
  };
  finance?: FinanceData;
  bkki?: BkkiData;
  bkim?: BkimData;
  leadership?: LeadershipData;
}

export interface AduanCategory {
    name: string;
    value: number;
}

export interface AduanDivision {
    name: string;
    value: number;
}

export interface BookCategory {
    nama: string;
    jumlah: number | string;
}

// Data spesifik untuk UKOKO
export interface UkokoData extends ReportData {
    socialMedia: {
        fbFollowers: number;
        fbReach: number;
        igFollowers: number;
        tiktokFollowers: number;
        youtubeSubs: number;
    };
    content: {
        kenyataanMedia: number;
        infografik: number;
        video: number;
        liputanBerita: number;
    };
    aduan: {
        diterima: number;
        diselesaikan: number;
        dalamTindakan: number;
    };
    perayaan?: {
        nama: string;
        tarikh: string;
        tuanRumah: string;
        mesyuarat: string | number;
    }[];
    // New Section: Perhubungan Awam
    perhubunganAwam?: {
        sumberAduan: {
            talikhidmat: number;
            suratEmail: number;
        };
        kategoriAduan: AduanCategory[];
        bahagianAduan: AduanDivision[];
        maklumBalas: {
            queueBee: { happy: number; unhappy: number };
            qrCode: { happy: number; unhappy: number };
        };
        lawatanAgensi: number;
    };
    // New Section: Penerbitan
    penerbitan?: {
        kategoriBuku: BookCategory[];
    };
}
