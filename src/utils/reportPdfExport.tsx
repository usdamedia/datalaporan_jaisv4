import React from 'react';
import { pdf } from '@react-pdf/renderer';
import ReportPDF from '../components/ReportPDF';

export type PdfExportScope = 'current-page' | 'all-filtered';

export interface PdfExportMeta {
  searchQuery?: string;
  filters?: Record<string, string | number | boolean | null | undefined>;
  sort?: {
    key: string;
    direction: 'asc' | 'desc';
  } | null;
  pagination?: {
    scope: PdfExportScope;
    currentPage?: number;
    pageSize?: number;
    totalItems?: number;
    exportedItems?: number;
  } | null;
}

export interface PdfExportState<T = any> {
  data: T;
  meta?: PdfExportMeta;
}

const cloneExportData = <T,>(data: T): T => JSON.parse(JSON.stringify(data));

const toInt = (value: unknown) => parseInt(String(value ?? ''), 10) || 0;

const toFixedPercentage = (numerator: number, denominator: number, digits = 2) => {
  if (denominator <= 0) return '';
  return ((numerator / denominator) * 100).toFixed(digits);
};

const normalizeBppsExportData = (data: any) => {
  const leadership = data.leadership || {};
  const perhimpunan = leadership.perhimpunan || {};
  const panelHR = leadership.panelHR || {};
  const finance = data.finance || {};
  const financeYear2025 = finance.financeYears?.[0] || {};

  return {
    ...data,
    leadership: {
      ...leadership,
      perhimpunan: {
        ...perhimpunan,
        total: toInt(perhimpunan.tawjihat) + toInt(perhimpunan.perdana) + toInt(perhimpunan.bulanan),
      },
      panelHR: {
        ...panelHR,
        total: toInt(panelHR.biasa) + toInt(panelHR.khas),
      },
    },
    finance: {
      ...finance,
      percentageBelanja:
        finance.percentageBelanja !== ''
          ? toFixedPercentage(toInt(financeYear2025.belanja), toInt(financeYear2025.lulus))
          : finance.percentageBelanja,
    },
  };
};

const normalizeHrExportData = (data: any) => {
  const hr = data.hr || {};
  const demografi = hr.demografi || {};
  const taburan = hr.taburan || {};
  const ibuPejabat = taburan.ibuPejabat || {};
  const daerah = Array.isArray(taburan.daerah) ? taburan.daerah : [];
  const latihan = data.latihan || {};
  const pencapaian = latihan.pencapaian || {};

  const jumlahWargaKerja = toInt(demografi.lelaki) + toInt(demografi.wanita);
  const jumlahIbuPejabat = Object.entries(ibuPejabat).reduce((total, [key, value]) => {
    if (key === 'total') return total;
    return total + toInt(value);
  }, 0);
  const jumlahDaerah = daerah.reduce((total: number, item: any) => total + toInt(item?.value), 0);
  const grandTotal = jumlahIbuPejabat + jumlahDaerah;

  const calcTrainingRowTotal = (row: any) => toInt(row?.pp) + toInt(row?.sk1) + toInt(row?.sk2);
  const mencapaiTotal = calcTrainingRowTotal(pencapaian.mencapai);
  const tidakMencapaiTotal = calcTrainingRowTotal(pencapaian.tidakMencapai);
  const tiadaRekodTotal = calcTrainingRowTotal(pencapaian.tiadaRekod);
  const jumlahKeseluruhan = {
    pp: toInt(pencapaian.mencapai?.pp) + toInt(pencapaian.tidakMencapai?.pp) + toInt(pencapaian.tiadaRekod?.pp),
    sk1: toInt(pencapaian.mencapai?.sk1) + toInt(pencapaian.tidakMencapai?.sk1) + toInt(pencapaian.tiadaRekod?.sk1),
    sk2: toInt(pencapaian.mencapai?.sk2) + toInt(pencapaian.tidakMencapai?.sk2) + toInt(pencapaian.tiadaRekod?.sk2),
  };

  return {
    ...data,
    hr: {
      ...hr,
      ringkasan: {
        ...(hr.ringkasan || {}),
        jumlahWargaKerja: String(jumlahWargaKerja),
      },
      taburan: {
        ...taburan,
        ibuPejabat: {
          ...ibuPejabat,
          total: String(jumlahIbuPejabat),
        },
        totalDaerah: String(jumlahDaerah),
        grandTotal: String(grandTotal),
      },
    },
    latihan: {
      ...latihan,
      pencapaian: {
        ...pencapaian,
        mencapai: {
          ...(pencapaian.mencapai || {}),
          total: String(mencapaiTotal),
        },
        tidakMencapai: {
          ...(pencapaian.tidakMencapai || {}),
          total: String(tidakMencapaiTotal),
        },
        tiadaRekod: {
          ...(pencapaian.tiadaRekod || {}),
          total: String(tiadaRekodTotal),
        },
        jumlahKeseluruhan: {
          ...(pencapaian.jumlahKeseluruhan || {}),
          pp: String(jumlahKeseluruhan.pp),
          sk1: String(jumlahKeseluruhan.sk1),
          sk2: String(jumlahKeseluruhan.sk2),
          total: String(jumlahKeseluruhan.pp + jumlahKeseluruhan.sk1 + jumlahKeseluruhan.sk2),
        },
      },
    },
  };
};

const normalizeReportExportData = (deptName: string, formData: any) => {
  let normalizedData = cloneExportData(formData);
  const normalizedDeptName = deptName.toUpperCase();

  if (normalizedDeptName.includes('BPPS') || normalizedDeptName.includes('PENTADBIRAN') || normalizedDeptName.includes('KEWANGAN') || normalizedDeptName.includes('AKAUN')) {
    normalizedData = normalizeBppsExportData(normalizedData);
  }

  if (normalizedDeptName.includes('HR')) {
    normalizedData = normalizeHrExportData(normalizedData);
  }

  return normalizedData;
};

export const buildReportExportState = (
  deptName: string,
  formData: any,
  meta?: PdfExportMeta
): PdfExportState => ({
  data: normalizeReportExportData(deptName, formData),
  meta: meta || {
    pagination: {
      scope: 'all-filtered',
    },
  },
});

export const exportReportPdf = async (deptName: string, exportState: PdfExportState) => {
  const blob = await pdf(<ReportPDF deptName={deptName} formData={exportState.data} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `Laporan_JAIS_2025_${deptName.replace(/\s+/g, '_')}.pdf`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
