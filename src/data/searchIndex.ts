export interface ContentSearchEntry {
  id: string;
  deptId: string;
  subUnitId?: string;
  title: string;
  context: string;
  keywords: string[];
  targetId: string;
}

export const CONTENT_SEARCH_INDEX: ContentSearchEntry[] = [
  {
    id: 'bph-oem-permohonan',
    deptId: '6',
    title: 'Skim Pengilangan Kontrak (OEM)',
    context: 'Bahagian Pengurusan Halal BPH - Statistik Permohonan SPHM',
    keywords: ['oem', 'pengilang', 'pengilangan', 'kontrak', 'skim pengilangan kontrak', 'sphm', 'halal'],
    targetId: 'bph-oem-permohonan',
  },
  {
    id: 'bph-oem-aktif',
    deptId: '6',
    title: 'Skim Pengilangan Kontrak (OEM)',
    context: 'Bahagian Pengurusan Halal BPH - Pemilik Sijil SPHM Aktif',
    keywords: ['oem', 'pengilang', 'pengilangan', 'kontrak', 'pemilik sijil', 'sijil aktif', 'sphm', 'halal'],
    targetId: 'bph-oem-aktif',
  },
  {
    id: 'bph-sphm',
    deptId: '6',
    title: 'Statistik Sijil Pengesahan Halal Malaysia (SPHM)',
    context: 'Bahagian Pengurusan Halal BPH',
    keywords: ['sphm', 'sijil pengesahan halal', 'permohonan halal', 'pemilik sijil', 'halal'],
    targetId: 'bph-sphm-section',
  },
  {
    id: 'bph-zon-halal',
    deptId: '6',
    title: 'Zon Halal 2025',
    context: 'Bahagian Pengurusan Halal BPH',
    keywords: ['zon halal', 'halal zone', 'zon', 'halal'],
    targetId: 'bph-zon-halal-section',
  },
  {
    id: 'bpnp-akidah-entry',
    deptId: '15',
    subUnitId: 'bpnp-akidah',
    title: 'Entry Data Utama Unit Akidah Tapisan',
    context: 'BPNP - Unit Akidah Tapisan',
    keywords: ['akidah', 'tapisan', 'penapisan', 'ajaran sesat', 'penerbitan digital', 'program aktiviti'],
    targetId: 'bpnp-akidah-entry-section',
  },
];
