import React from 'react';
import { Search, BookOpen, Award, Activity, Image, Plus, Trash2, LayoutDashboard, Printer } from 'lucide-react';
import { BPNP_2024_REFERENCE } from '../../constants';
import FormLayout from './FormLayout';
import { BasicInfoSection, NarrativeSection, LawatanSection } from './CommonSections';
import { useFormLogic } from './useFormLogic';
import DataManagementDashboard from '../DataManagementDashboard';
import { usePrintView } from '../../hooks/usePrintView';

interface BpnpFormProps {
  deptName: string;
  onBack: () => void;
}

const KAJIAN_TYPE_OPTIONS = ['Kajian', 'Kaji Selidik'] as const;
const PENULISAN_CATEGORY_OPTIONS = ['Diploma dan ke bawah', 'Ijazah dan ke atas'] as const;
const PENULISAN_RANK_OPTIONS = ['Johan', 'Naib Johan', 'Ketiga', 'Saguhati'] as const;

type KajianEntry = {
  jenis: typeof KAJIAN_TYPE_OPTIONS[number];
  tajuk: string;
  bilangan: number | string;
};

type PenulisanCompetitionEntry = {
  kategori: typeof PENULISAN_CATEGORY_OPTIONS[number];
  namaPemenang: string;
  tempatDimenangi: typeof PENULISAN_RANK_OPTIONS[number];
  tajukKajian: string;
};

const createEmptyKajianEntry = (): KajianEntry => ({
  jenis: 'Kajian',
  tajuk: '',
  bilangan: 1,
});

const createEmptyPenulisanCompetitionEntry = (): PenulisanCompetitionEntry => ({
  kategori: 'Diploma dan ke bawah',
  namaPemenang: '',
  tempatDimenangi: 'Johan',
  tajukKajian: '',
});

const normalizeKajianEntry = (entry: any): KajianEntry => {
  if (typeof entry === 'string') {
    return {
      jenis: entry.toLowerCase().includes('kaji selidik') ? 'Kaji Selidik' : 'Kajian',
      tajuk: entry.replace(/^kajian\s*:|^kaji selidik\s*:/i, '').trim(),
      bilangan: 1,
    };
  }

  return {
    jenis: entry?.jenis === 'Kaji Selidik' ? 'Kaji Selidik' : 'Kajian',
    tajuk: entry?.tajuk || '',
    bilangan: entry?.bilangan ?? 1,
  };
};

const normalizePenulisanCompetitionEntry = (entry: any): PenulisanCompetitionEntry => ({
  kategori: entry?.kategori === 'Ijazah dan ke atas' ? 'Ijazah dan ke atas' : 'Diploma dan ke bawah',
  namaPemenang: entry?.namaPemenang || '',
  tempatDimenangi: PENULISAN_RANK_OPTIONS.includes(entry?.tempatDimenangi) ? entry.tempatDimenangi : 'Johan',
  tajukKajian: entry?.tajukKajian || '',
});

const BPNP_2024_KAJIAN_REFERENCE: KajianEntry[] = BPNP_2024_REFERENCE.kajian.map((tajuk) => ({
  jenis: tajuk.toLowerCase().includes('persepsi') ? 'Kaji Selidik' : 'Kajian',
  tajuk: tajuk.replace(/\.$/, ''),
  bilangan: 1,
}));

const BPNP_2024_PENULISAN_REFERENCE: PenulisanCompetitionEntry[] = [
  {
    kategori: 'Diploma dan ke bawah',
    namaPemenang: BPNP_2024_REFERENCE.penulisan.johan.nama,
    tempatDimenangi: 'Johan',
    tajukKajian: BPNP_2024_REFERENCE.penulisan.johan.tajuk,
  },
  {
    kategori: 'Ijazah dan ke atas',
    namaPemenang: BPNP_2024_REFERENCE.penulisan.naibJohan.nama,
    tempatDimenangi: 'Naib Johan',
    tajukKajian: BPNP_2024_REFERENCE.penulisan.naibJohan.tajuk,
  },
  {
    kategori: 'Ijazah dan ke atas',
    namaPemenang: BPNP_2024_REFERENCE.penulisan.ketiga.nama,
    tempatDimenangi: 'Ketiga',
    tajukKajian: BPNP_2024_REFERENCE.penulisan.ketiga.tajuk,
  },
];

const UNIT_PENYELIDIKAN_CURRENT_2025 = {
  tarikh: '2026-03-30',
  disediakanOleh: 'Lizawati binti Mohamad Masri',
  jawatan: 'Penolong Pegawai Hal Ehwal Islam (S6)',
  bpnp: {
    unitActivityTotal2025: 12,
    kajianList: [
      {
        jenis: 'Kajian' as const,
        tajuk: 'Penilaian Terhadap Prestasi Pencapaian Ujian Penilaian Kelas KAFA (UPKK) Bagi Tahun 2020-2024 di Sarawak',
        bilangan: 1,
      },
      {
        jenis: 'Kaji Selidik' as const,
        tajuk: 'Pandangan Awam Terhadap Imej Kakitangan Jabatan Agama Islam Sarawak (JAIS)',
        bilangan: 1,
      },
      {
        jenis: 'Kaji Selidik' as const,
        tajuk: 'Persepsi Tentang Kaligrafi Masjid & Surau di Sarawak',
        bilangan: 1,
      },
    ],
    penulisanList: [
      {
        kategori: 'Diploma dan ke bawah' as const,
        namaPemenang: 'Shadahtul binti Hamid',
        tempatDimenangi: 'Johan' as const,
        tajukKajian: 'Kefahaman Masyarakat Islam terhadap Larangan Arak dan Penguatkuasaan Undang-Undang Syariah : Satu Kajian Lapangan',
      },
      {
        kategori: 'Diploma dan ke bawah' as const,
        namaPemenang: 'Faizal bin Haji Rasdi',
        tempatDimenangi: 'Naib Johan' as const,
        tajukKajian: 'Keberkesanan Penguatkuasaan Undang-Undang Jenayah Syariah dari Perspektif Cabaran Pelaksanaan oleh Jabatan Agama Islam Sarawak',
      },
      {
        kategori: 'Ijazah dan ke atas' as const,
        namaPemenang: 'Nur Fakhriah binti Haji Rimi',
        tempatDimenangi: 'Johan' as const,
        tajukKajian: 'Persepsi Masyarakat Islam di Sarawak terhadap Penguatkuasaan Jenayah Syariah: Antara Kefahaman, Kepercayaan dan Kepatuhan',
      },
      {
        kategori: 'Ijazah dan ke atas' as const,
        namaPemenang: 'Syamsul Aizan bin Sarkawi',
        tempatDimenangi: 'Naib Johan' as const,
        tajukKajian: 'Poligami Tanpa Kebenaran dalam Undang-Undang Islam di Sarawak: Satu Kajian Hukum dan Implikasi',
      },
    ],
  },
};

const toBpnpStorageKey = (unitName: string) =>
  `jais_2025_${unitName
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')}`;

const readBpnpUnitActivityTotal = (unitName: string) => {
  if (typeof window === 'undefined') return 0;

  try {
    const savedData = localStorage.getItem(toBpnpStorageKey(unitName));
    if (!savedData) return 0;
    const parsed = JSON.parse(savedData);
    return Number(parsed?.bpnp?.unitActivityTotal2025) || 0;
  } catch (error) {
    console.error('Failed to read BPNP unit activity total', error);
    return 0;
  }
};

const BpnpForm: React.FC<BpnpFormProps> = ({ deptName, onBack }) => {
  const [showDataManagement, setShowDataManagement] = React.useState(false);
  const { contentRef: strategicPrintRef, handlePrint: handleStrategicPrint } = usePrintView<HTMLDivElement>({
    documentTitle: 'BPNP_Unit_Perancangan_Strategik_2025',
  });
  const normalizedDeptName = deptName.toUpperCase();
  const selectedUnit = normalizedDeptName.includes('PERANCANGAN STRATEGIK')
    ? 'UNIT PERANCANGAN STRATEGIK'
    : normalizedDeptName.includes('AKIDAH TAPISAN')
      ? 'UNIT AKIDAH TAPISAN'
      : 'UNIT PENYELIDIKAN';
  const isUnitPenyelidikan = selectedUnit === 'UNIT PENYELIDIKAN';
  const isUnitStrategik = selectedUnit === 'UNIT PERANCANGAN STRATEGIK';
  const isUnitAkidah = selectedUnit === 'UNIT AKIDAH TAPISAN';

  const initialState = {
    tarikh: new Date().toISOString().split('T')[0],
    disediakanOleh: '',
    jawatan: '',
    ringkasan: '',
    isu: '',
    cadangan: '',
    lawatan: [],
    bpnp: {
      unitActivityTotal2025: 0,
      kajianList: [createEmptyKajianEntry()],
      penulisanList: [createEmptyPenulisanCompetitionEntry()],
      statistik: {
        penapisan: 0,
        kluster: 0,
        program: 0,
        infografik: 0
      },
      penerbitanDigital: {
        kandunganUtama: ''
      },
      dataManagement: {
        dtawgMeetings: 0,
        integratedDashboards: 0,
        dataClusters: 0,
        subDataDashboards: 0,
        subDataList: ['']
      },
      strategik: {
        pelanStrategik: {
          total2023: 0,
          total2024: 0,
          total2025: 0,
        },
        rot: {
          aktivitiProgram2023: 0,
          aktivitiProgram2024: 0,
          aktivitiProgram2025: 0,
        },
        data: {
          bilPegawaiData: 0,
          bilDashboardRasmiBaharu2025: 0,
          namaDashboardBaharu: [''],
        },
      }
    }
  };

  const mergedInitialState = React.useMemo(() => {
    if (!isUnitPenyelidikan) return initialState;

    return {
      ...initialState,
      ...UNIT_PENYELIDIKAN_CURRENT_2025,
      bpnp: {
        ...initialState.bpnp,
        ...UNIT_PENYELIDIKAN_CURRENT_2025.bpnp,
      },
    };
  }, [isUnitPenyelidikan]);

  const {
    formData,
    isSaving,
    showSuccess,
    saveError,
    handleInputChange,
    handleSave,
    addLawatan,
    removeLawatan,
    updateLawatan,
    setFormData
  } = useFormLogic(selectedUnit || deptName, mergedInitialState);
  const aggregatedActivityTotals = React.useMemo(() => {
    const penyelidikan = UNIT_PENYELIDIKAN_CURRENT_2025.bpnp.unitActivityTotal2025;
    const strategik = selectedUnit === 'UNIT PERANCANGAN STRATEGIK'
      ? Number(formData.bpnp?.unitActivityTotal2025) || 0
      : readBpnpUnitActivityTotal('UNIT PERANCANGAN STRATEGIK');
    const akidah = selectedUnit === 'UNIT AKIDAH TAPISAN'
      ? Number(formData.bpnp?.unitActivityTotal2025) || 0
      : readBpnpUnitActivityTotal('UNIT AKIDAH TAPISAN');

    return {
      penyelidikan,
      strategik,
      akidah,
      total: penyelidikan + strategik + akidah,
    };
  }, [formData.bpnp?.unitActivityTotal2025, selectedUnit]);

  React.useEffect(() => {
    const kajianList = formData.bpnp?.kajianList;
    const penulisanList = formData.bpnp?.penulisanList;
    const shouldNormalizeKajian =
      !Array.isArray(kajianList) ||
      kajianList.length === 0 ||
      kajianList.some((item: any) => typeof item === 'string' || item?.tajuk === undefined);
    const shouldNormalizePenulisan =
      !Array.isArray(penulisanList) ||
      penulisanList.length === 0 ||
      penulisanList.some((item: any) => item?.namaPemenang === undefined || item?.tempatDimenangi === undefined);

    if (!shouldNormalizeKajian && !shouldNormalizePenulisan) {
      return;
    }

    setFormData((prev: any) => ({
      ...prev,
      bpnp: {
        ...prev.bpnp,
        kajianList: Array.isArray(prev.bpnp?.kajianList) && prev.bpnp.kajianList.length > 0
          ? prev.bpnp.kajianList.map(normalizeKajianEntry)
          : [createEmptyKajianEntry()],
        penulisanList: Array.isArray(prev.bpnp?.penulisanList) && prev.bpnp.penulisanList.length > 0
          ? prev.bpnp.penulisanList.map(normalizePenulisanCompetitionEntry)
          : [createEmptyPenulisanCompetitionEntry()],
      }
    }));
  }, [formData.bpnp?.kajianList, formData.bpnp?.penulisanList, setFormData]);

  React.useEffect(() => {
    if (!isUnitStrategik) return;

    const dashboardList = formData.bpnp?.strategik?.data?.namaDashboardBaharu;
    if (Array.isArray(dashboardList) && dashboardList.length > 0) return;

    setFormData((prev: any) => ({
      ...prev,
      bpnp: {
        ...prev.bpnp,
        strategik: {
          ...prev.bpnp?.strategik,
          pelanStrategik: {
            total2023: prev.bpnp?.strategik?.pelanStrategik?.total2023 || 0,
            total2024: prev.bpnp?.strategik?.pelanStrategik?.total2024 || 0,
            total2025: prev.bpnp?.strategik?.pelanStrategik?.total2025 || 0,
          },
          rot: {
            aktivitiProgram2023: prev.bpnp?.strategik?.rot?.aktivitiProgram2023 || 0,
            aktivitiProgram2024: prev.bpnp?.strategik?.rot?.aktivitiProgram2024 || 0,
            aktivitiProgram2025: prev.bpnp?.strategik?.rot?.aktivitiProgram2025 || 0,
          },
          data: {
            bilPegawaiData: prev.bpnp?.strategik?.data?.bilPegawaiData || 0,
            bilDashboardRasmiBaharu2025: prev.bpnp?.strategik?.data?.bilDashboardRasmiBaharu2025 || 0,
            namaDashboardBaharu: [''],
          },
        },
      },
    }));
  }, [formData.bpnp?.strategik?.data?.namaDashboardBaharu, isUnitStrategik, setFormData]);

  const handleBpnpStatChange = (field: string, value: number) => {
    setFormData((prev: any) => ({
      ...prev,
      bpnp: {
        ...prev.bpnp,
        statistik: { ...prev.bpnp.statistik, [field]: value }
      }
    }));
  };

  const handleBpnpNestedTextChange = (section: string, field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      bpnp: {
        ...prev.bpnp,
        [section]: {
          ...prev.bpnp[section],
          [field]: value
        }
      }
    }));
  };

  const handleStrategikNumberChange = (section: 'pelanStrategik' | 'rot' | 'data', field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      bpnp: {
        ...prev.bpnp,
        strategik: {
          ...prev.bpnp.strategik,
          [section]: {
            ...prev.bpnp.strategik?.[section],
            [field]: value === '' ? 0 : parseFloat(value),
          },
        },
      },
    }));
  };

  const addStrategicDashboardName = () => {
    setFormData((prev: any) => ({
      ...prev,
      bpnp: {
        ...prev.bpnp,
        strategik: {
          ...prev.bpnp.strategik,
          data: {
            ...prev.bpnp.strategik?.data,
            namaDashboardBaharu: [...(prev.bpnp.strategik?.data?.namaDashboardBaharu || []), ''],
          },
        },
      },
    }));
  };

  const removeStrategicDashboardName = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      bpnp: {
        ...prev.bpnp,
        strategik: {
          ...prev.bpnp.strategik,
          data: {
            ...prev.bpnp.strategik?.data,
            namaDashboardBaharu: (prev.bpnp.strategik?.data?.namaDashboardBaharu || []).filter((_: string, currentIndex: number) => currentIndex !== index),
          },
        },
      },
    }));
  };

  const updateStrategicDashboardName = (index: number, value: string) => {
    setFormData((prev: any) => {
      const currentList = [...(prev.bpnp.strategik?.data?.namaDashboardBaharu || [''])];
      currentList[index] = value;

      return {
        ...prev,
        bpnp: {
          ...prev.bpnp,
          strategik: {
            ...prev.bpnp.strategik,
            data: {
              ...prev.bpnp.strategik?.data,
              namaDashboardBaharu: currentList,
            },
          },
        },
      };
    });
  };

  const handleUnitActivityTotalChange = (value: number) => {
    setFormData((prev: any) => ({
      ...prev,
      bpnp: {
        ...prev.bpnp,
        unitActivityTotal2025: value,
      }
    }));
  };

  const addKajian = () => {
    setFormData((prev: any) => ({
      ...prev,
      bpnp: {
        ...prev.bpnp,
        kajianList: [...prev.bpnp.kajianList, createEmptyKajianEntry()]
      }
    }));
  };

  const removeKajian = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      bpnp: {
        ...prev.bpnp,
        kajianList: prev.bpnp.kajianList.filter((_: any, i: number) => i !== index)
      }
    }));
  };

  const updateKajian = (index: number, value: string) => {
    setFormData((prev: any) => {
      const newList = [...prev.bpnp.kajianList];
      newList[index] = {
        ...normalizeKajianEntry(newList[index]),
        tajuk: value
      };
      return {
        ...prev,
        bpnp: { ...prev.bpnp, kajianList: newList }
      };
    });
  };

  const updateKajianField = (index: number, field: keyof KajianEntry, value: string | number) => {
    setFormData((prev: any) => {
      const newList = [...prev.bpnp.kajianList];
      newList[index] = {
        ...normalizeKajianEntry(newList[index]),
        [field]: field === 'bilangan' ? (value === '' ? '' : Number(value)) : value,
      };
      return {
        ...prev,
        bpnp: { ...prev.bpnp, kajianList: newList }
      };
    });
  };

  const addPenulisanCompetition = () => {
    setFormData((prev: any) => ({
      ...prev,
      bpnp: {
        ...prev.bpnp,
        penulisanList: [...(prev.bpnp.penulisanList || []), createEmptyPenulisanCompetitionEntry()]
      }
    }));
  };

  const removePenulisanCompetition = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      bpnp: {
        ...prev.bpnp,
        penulisanList: prev.bpnp.penulisanList.filter((_: any, i: number) => i !== index)
      }
    }));
  };

  const updatePenulisanCompetition = (index: number, field: keyof PenulisanCompetitionEntry, value: string) => {
    setFormData((prev: any) => {
      const newList = [...(prev.bpnp.penulisanList || [])];
      newList[index] = {
        ...normalizePenulisanCompetitionEntry(newList[index]),
        [field]: value
      };
      return {
        ...prev,
        bpnp: { ...prev.bpnp, penulisanList: newList }
      };
    });
  };

  const renderUnitActivitySection = (title: string, description: string, accentClasses: string) => (
    <section className={`bg-white border rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm ${accentClasses}`}>
      <div className="flex items-center gap-3 mb-6 border-b border-current/10 pb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-current/10 text-current">
          <Activity className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-zus-900 sentence-case">{title}</h3>
          <p className="text-sm text-slate-500 font-medium">{description}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_220px] md:items-center">
        <div>
          <label className="text-sm font-black text-slate-500 sentence-case">
            Jumlah program / aktiviti 2025
          </label>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Masukkan angka keseluruhan program atau aktiviti bagi unit ini untuk tahun 2025.
          </p>
        </div>
        <input
          type="number"
          min="0"
          step="any"
          value={formData.bpnp.unitActivityTotal2025 ?? 0}
          onChange={(e) => handleUnitActivityTotalChange(parseFloat(e.target.value) || 0)}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-center text-2xl font-black text-zus-900 outline-none transition-all focus:border-teal-300 focus:ring-4 focus:ring-teal-100"
        />
      </div>
    </section>
  );

  const renderBpnpActivityLinkedSummary = () => (
    <section className="mt-8 overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-sm">
      <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-teal-50 px-6 py-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <p className="text-xs font-black text-emerald-600 sentence-case">Komponen</p>
            <h3 className="mt-1 text-lg font-black tracking-tight text-zus-900 sentence-case">Jumlah aktiviti BPNP mengikut unit</h3>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Data jumlah aktiviti ini linked terus dengan input komponen unit di bawah dan dikira automatik.
            </p>
          </div>
          <div className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-right shadow-sm">
            <p className="text-xs font-black text-emerald-600 sentence-case">Total</p>
            <p className="text-2xl font-black text-emerald-700">{aggregatedActivityTotals.total}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-6 md:grid-cols-4">
        {([
          { label: 'Unit Penyelidikan', value: aggregatedActivityTotals.penyelidikan, tone: 'purple' },
          { label: 'Unit Perancangan Strategik', value: aggregatedActivityTotals.strategik, tone: 'emerald' },
          { label: 'Unit Akidah Tapisan', value: aggregatedActivityTotals.akidah, tone: 'cyan' },
          { label: 'Jumlah Keseluruhan', value: aggregatedActivityTotals.total, tone: 'amber' },
        ] as const).map((item) => {
          const toneClassMap = {
            purple: 'border-purple-100 bg-purple-50/70 text-purple-700',
            emerald: 'border-emerald-100 bg-emerald-50/70 text-emerald-700',
            cyan: 'border-cyan-100 bg-cyan-50/70 text-cyan-700',
            amber: 'border-amber-100 bg-amber-50/80 text-amber-700',
          } as const;

          return (
            <div key={item.label} className={`rounded-[1.5rem] border p-5 ${toneClassMap[item.tone]}`}>
              <p className="text-[11px] font-black sentence-case">{item.label}</p>
              <p className="mt-3 text-4xl font-black leading-none">{item.value}</p>
              {item.label === 'Unit Penyelidikan' && (
                <p className="mt-2 text-[11px] font-bold text-slate-500 sentence-case">
                  Nilai tetap
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );

  return (
    <FormLayout
      deptName={showDataManagement ? 'Data Management' : selectedUnit}
      exportDeptName={deptName}
      onBack={() => {
        if (showDataManagement) {
          setShowDataManagement(false);
        } else {
          onBack();
        }
      }}
      onSave={handleSave}
      isSaving={isSaving}
      showSuccess={showSuccess}
      saveError={saveError}
      formData={formData}
      hideExportButton={isUnitStrategik && !showDataManagement}
    >
      {isUnitPenyelidikan || isUnitStrategik || isUnitAkidah ? (
        showDataManagement ? (
          <DataManagementDashboard 
            data={formData.bpnp.dataManagement} 
            aggregatedActivities={aggregatedActivityTotals}
            onChange={(newData) => setFormData((prev: any) => ({
              ...prev,
              bpnp: {
                ...prev.bpnp,
                dataManagement: newData
              }
            }))}
          />
        ) : (
          <>
            {isUnitStrategik && (
              <div className="mb-8 flex flex-wrap justify-end gap-3 print-hidden" data-print-hidden="true">
                <button
                  onClick={handleStrategicPrint}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-[#134E4A] border border-teal-200 rounded-2xl font-bold hover:bg-teal-50 transition-all shadow-sm active:scale-95"
                >
                  <Printer className="w-5 h-5" />
                  Cetak View Semasa
                </button>
                <button
                  onClick={() => setShowDataManagement(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-[#134E4A] text-white rounded-2xl font-bold hover:bg-teal-900 transition-all shadow-lg active:scale-95"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Buka Data Management Dashboard
                </button>
              </div>
            )}
            <div
              ref={isUnitStrategik ? strategicPrintRef : undefined}
              className={isUnitStrategik ? 'print-view-root print-page' : undefined}
            >
            <BasicInfoSection formData={formData} handleInputChange={handleInputChange} />

            {isUnitPenyelidikan && (
              <>
                {renderUnitActivitySection(
                  'Jumlah Aktiviti Unit Penyelidikan (2025)',
                  'Ringkasan angka keseluruhan aktiviti atau program untuk Unit Penyelidikan.',
                  'border-teal-100 text-teal-600'
                )}

                <section className="bg-white border border-blue-100 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6 border-b border-blue-50 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                        <Search className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-zus-900 sentence-case">Senarai kajian dan kaji selidik dihasilkan (2025)</h3>
                        <p className="text-sm text-slate-500 font-medium">Paparan ini diselaraskan berdasarkan dokumen rujukan Unit Penyelidikan.</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-5 xl:grid-cols-2">
                    <div className="rounded-[2rem] border border-blue-100 bg-blue-50/70 p-5 md:p-6">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h4 className="text-xs font-black text-blue-600 sentence-case">Rujukan data 2024</h4>
                          <p className="mt-1 text-xs font-medium text-slate-500">Gunakan rujukan ini sebagai panduan format pengisian data 2025.</p>
                        </div>
                        <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black text-blue-700 ring-1 ring-blue-100 sentence-case">
                          Jumlah: {BPNP_2024_KAJIAN_REFERENCE.length}
                        </span>
                      </div>
                      <ul className="mt-4 space-y-2">
                        {BPNP_2024_KAJIAN_REFERENCE.map((kajian, index) => (
                          <li key={index} className="rounded-[1.75rem] bg-white px-5 py-4 text-sm text-slate-700 ring-1 ring-blue-100">
                            <div className="flex items-start gap-3">
                              <span className="text-2xl font-black leading-none text-blue-500">{index + 1}.</span>
                              <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-blue-700">{kajian.jenis}</span>
                                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-600">Bilangan: {kajian.bilangan}</span>
                                </div>
                                <p className="mt-3 text-base font-medium leading-8 text-slate-700">{kajian.tajuk}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-[2rem] border border-blue-100 bg-white p-5 md:p-6">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h4 className="text-xs font-black text-blue-600 sentence-case">Data 2025</h4>
                          <p className="mt-1 text-xs font-medium text-slate-500">Data 2025 ini telah ditetapkan dan diluluskan untuk paparan laporan.</p>
                        </div>
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black text-blue-700 ring-1 ring-blue-100 sentence-case">
                          Jumlah: {formData.bpnp.kajianList.length}
                        </span>
                      </div>

                      <ul className="mt-4 space-y-2">
                        {formData.bpnp.kajianList.map((kajian: any, index: number) => {
                          const normalizedKajian = normalizeKajianEntry(kajian);

                          return (
                            <li key={index} className="rounded-[1.75rem] border border-blue-100 bg-blue-50/35 px-5 py-4 text-sm text-slate-700">
                              <div className="flex items-start gap-3">
                                <span className="text-2xl font-black leading-none text-blue-500">{index + 1}.</span>
                                <div className="flex-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-blue-700">{normalizedKajian.jenis}</span>
                                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-600">Bilangan: {normalizedKajian.bilangan}</span>
                                  </div>
                                  <p className="mt-3 text-base font-medium leading-8 text-slate-700">{normalizedKajian.tajuk}</p>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mt-8 bg-white border border-purple-100 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
                  <div className="mb-6 flex flex-col gap-4 border-b border-purple-50 pb-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                        <Award className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold leading-tight text-zus-900 sentence-case">Senarai pemenang pertandingan penulisan ilmiah (2025)</h3>
                        <p className="mt-1 text-sm font-medium leading-5 text-slate-500">Isikan kategori, nama pemenang, tempat dimenangi dan tajuk kajian.</p>
                      </div>
                    </div>
                    <button 
                      onClick={addPenulisanCompetition}
                      className="inline-flex items-center justify-center gap-1.5 self-start rounded-xl border border-purple-200 bg-purple-50 px-4 py-2 text-[10px] font-black text-purple-700 transition-colors hover:bg-purple-100 sentence-case"
                    >
                      <Plus className="w-4 h-4" /> Tambah pemenang
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-2xl border border-purple-100 bg-purple-50/70 p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h4 className="text-xs font-black text-purple-600 sentence-case">Rujukan data 2024</h4>
                          <p className="mt-1 text-xs font-medium text-slate-500">Semak format rujukan pemenang sebelum isi data baharu untuk 2025.</p>
                        </div>
                        <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black text-purple-700 ring-1 ring-purple-100 sentence-case">
                          Jumlah: {BPNP_2024_PENULISAN_REFERENCE.length}
                        </span>
                      </div>
                      <ul className="mt-4 space-y-2">
                        {BPNP_2024_PENULISAN_REFERENCE.map((penulisan, index) => (
                          <li key={index} className="rounded-xl bg-white px-4 py-3 text-sm text-slate-700 ring-1 ring-purple-100">
                            <div className="flex items-start gap-3">
                              <span className="font-black text-purple-500">{index + 1}.</span>
                              <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="rounded-full bg-purple-100 px-2.5 py-1 text-[10px] font-black text-purple-700 sentence-case">{penulisan.kategori}</span>
                                  <span className="rounded-full bg-cyan-100 px-2.5 py-1 text-[10px] font-black text-cyan-700 sentence-case">{penulisan.tempatDimenangi}</span>
                                </div>
                                <p className="mt-2 break-words font-black text-zus-900">{penulisan.namaPemenang}</p>
                                <p className="mt-1 break-words text-sm font-medium leading-6 text-slate-600">Tajuk Kajian: {penulisan.tajukKajian}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5">
                      <p className="text-xs font-black text-slate-500 sentence-case">Panduan ringkas pengisian</p>
                      <div className="mt-4 space-y-3 text-sm text-slate-600">
                        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                          <p className="font-black text-zus-900">Kategori</p>
                          <p className="mt-1 text-xs font-medium">Pilih kategori yang tepat, sama ada <strong>Diploma dan ke bawah</strong> atau <strong>Ijazah dan ke atas</strong>.</p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                          <p className="font-black text-zus-900">Tempat Dimenangi</p>
                          <p className="mt-1 text-xs font-medium">Nyatakan kedudukan sebenar seperti <strong>Johan</strong>, <strong>Naib Johan</strong>, <strong>Ketiga</strong> atau <strong>Saguhati</strong>.</p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                          <p className="font-black text-zus-900">Nama & Tajuk Kajian</p>
                          <p className="mt-1 text-xs font-medium">Masukkan nama pemenang dan tajuk penuh kerana maklumat ini akan dipaparkan semula dalam laporan eksport.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-[2rem] border border-purple-100 bg-purple-50/45 p-5 md:p-6">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h4 className="text-sm font-black text-purple-700 sentence-case">Senarai pemenang 2025</h4>
                        <p className="mt-1 text-xs font-medium text-slate-500">Tambahkan satu baris bagi setiap pemenang yang perlu direkodkan untuk laporan tahunan.</p>
                      </div>
                      <span className="rounded-full bg-white px-4 py-1.5 text-[10px] font-black text-purple-700 ring-1 ring-purple-100 sentence-case">
                        Baris aktif: {(formData.bpnp.penulisanList || []).length}
                      </span>
                    </div>

                    <div className="mt-5 hidden md:grid md:grid-cols-[56px_200px_180px_minmax(0,1fr)_56px] md:gap-4 md:px-4">
                      <div className="text-[11px] font-black text-purple-500 sentence-case">Bil.</div>
                      <div className="text-[11px] font-black text-purple-500 sentence-case">Kategori</div>
                      <div className="text-[11px] font-black text-cyan-600 sentence-case">Tempat</div>
                      <div className="text-[11px] font-black text-slate-500 sentence-case">Nama pemenang & tajuk kajian</div>
                    </div>

                    <div className="mt-3 space-y-3">
                      {(formData.bpnp.penulisanList || []).map((penulisan: any, index: number) => (
                        <div key={index} className="rounded-[1.75rem] border border-purple-100 bg-white px-5 py-5 shadow-sm">
                          <div className="grid gap-4 md:grid-cols-[56px_200px_180px_minmax(0,1fr)_56px] md:items-start">
                            <div className="flex items-center justify-between md:block">
                              <span className="text-2xl font-black leading-none text-purple-500">{index + 1}.</span>
                              {(formData.bpnp.penulisanList || []).length > 1 && (
                                <button 
                                  onClick={() => removePenulisanCompetition(index)}
                                  className="rounded-xl p-2.5 text-gray-300 transition-all hover:bg-red-50 hover:text-red-500 md:hidden"
                                  title="Padam baris pemenang"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              )}
                            </div>

                            <label className="space-y-2">
                              <span className="text-[11px] font-black text-slate-500 md:hidden sentence-case">Kategori</span>
                              <select
                                value={normalizePenulisanCompetitionEntry(penulisan).kategori}
                                onChange={(e) => updatePenulisanCompetition(index, 'kategori', e.target.value)}
                                className="rounded-full border border-purple-100 bg-purple-100/70 px-5 py-3 text-sm font-black text-purple-700 outline-none transition-all focus:border-purple-300 focus:ring-2 focus:ring-purple-100 sentence-case"
                              >
                                {PENULISAN_CATEGORY_OPTIONS.map((option) => (
                                  <option key={option} value={option}>{option}</option>
                                ))}
                              </select>
                            </label>

                            <label className="space-y-2">
                              <span className="text-[11px] font-black text-slate-500 md:hidden sentence-case">Tempat dimenangi</span>
                              <select
                                value={normalizePenulisanCompetitionEntry(penulisan).tempatDimenangi}
                                onChange={(e) => updatePenulisanCompetition(index, 'tempatDimenangi', e.target.value)}
                                className="rounded-full border border-cyan-100 bg-cyan-100/70 px-5 py-3 text-sm font-black text-cyan-700 outline-none transition-all focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 sentence-case"
                              >
                                {PENULISAN_RANK_OPTIONS.map((option) => (
                                  <option key={option} value={option}>{option}</option>
                                ))}
                              </select>
                            </label>

                            <div className="grid gap-3">
                              <label className="space-y-2">
                                <span className="text-[11px] font-black text-slate-500 md:hidden sentence-case">Nama pemenang</span>
                                <textarea
                                  value={normalizePenulisanCompetitionEntry(penulisan).namaPemenang}
                                  onChange={(e) => updatePenulisanCompetition(index, 'namaPemenang', e.target.value)}
                                  placeholder="Contoh: Ustaz / Puan ..."
                                  rows={2}
                                  className="min-h-[88px] w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-black leading-6 text-zus-900 outline-none transition-all focus:border-purple-300 focus:ring-2 focus:ring-purple-100"
                                />
                              </label>
                              <label className="space-y-2">
                                <span className="text-[11px] font-black text-slate-500 md:hidden sentence-case">Tajuk kajian</span>
                                <textarea
                                  value={normalizePenulisanCompetitionEntry(penulisan).tajukKajian}
                                  onChange={(e) => updatePenulisanCompetition(index, 'tajukKajian', e.target.value)}
                                  placeholder="Masukkan tajuk kajian atau penulisan"
                                  rows={4}
                                  className="min-h-[132px] w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium leading-7 text-slate-600 outline-none transition-all focus:border-purple-300 focus:ring-2 focus:ring-purple-100"
                                />
                              </label>
                            </div>

                            <div className="hidden items-start justify-end md:flex">
                              {(formData.bpnp.penulisanList || []).length > 1 && (
                                <button 
                                  onClick={() => removePenulisanCompetition(index)}
                                  className="rounded-xl p-2.5 text-gray-300 transition-all hover:bg-red-50 hover:text-red-500"
                                  title="Padam baris pemenang"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <NarrativeSection formData={formData} handleInputChange={handleInputChange} />
                <LawatanSection 
                  formData={formData} 
                  addLawatan={addLawatan} 
                  removeLawatan={removeLawatan} 
                  updateLawatan={updateLawatan} 
                  handleSave={handleSave}
                  isSaving={isSaving}
                />
              </>
            )}

            {isUnitStrategik && (
              <>
          {renderUnitActivitySection(
            'Jumlah Aktiviti Unit Perancangan Strategik (2025)',
            'Masukkan total program atau aktiviti yang dilaksanakan oleh Unit Perancangan Strategik.',
            'border-emerald-100 text-emerald-600'
          )}

          {renderBpnpActivityLinkedSummary()}

          <section className="overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-sm">
            <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-teal-50 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight text-zus-900 sentence-case">Maklumat diperlukan</h3>
                  <p className="text-sm font-medium text-slate-500">
                    Lengkapkan data utama bagi Unit Perancangan Strategik mengikut tahun dan senarai dashboard rasmi baharu.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 p-6 lg:grid-cols-3">
              <div className="rounded-[1.75rem] border border-emerald-100 bg-emerald-50/60 p-5">
                <h4 className="text-sm font-black text-emerald-900 sentence-case">Pelan strategik jabatan</h4>
                <div className="mt-5 space-y-4">
                  {[
                    { field: 'total2023', label: 'Pencapaian Total 2023' },
                    { field: 'total2024', label: 'Pencapaian Total 2024' },
                    { field: 'total2025', label: 'Pencapaian Total 2025' },
                  ].map((item) => (
                    <div key={item.field} className="rounded-2xl border border-emerald-100 bg-white p-4">
                      <label className="text-xs font-black text-slate-500 sentence-case">{item.label}</label>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={formData.bpnp.strategik?.pelanStrategik?.[item.field] ?? 0}
                        onChange={(e) => handleStrategikNumberChange('pelanStrategik', item.field, e.target.value)}
                        className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-xl font-black text-zus-900 outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-sky-100 bg-sky-50/60 p-5">
                <h4 className="text-sm font-black text-sky-900 sentence-case">Rancangan operasi tahunan</h4>
                <div className="mt-5 space-y-4">
                  {[
                    { field: 'aktivitiProgram2023', label: 'Aktiviti Program 2023' },
                    { field: 'aktivitiProgram2024', label: 'Aktiviti Program 2024' },
                    { field: 'aktivitiProgram2025', label: 'Aktiviti Program 2025' },
                  ].map((item) => (
                    <div key={item.field} className="rounded-2xl border border-sky-100 bg-white p-4">
                      <label className="text-xs font-black text-slate-500 sentence-case">{item.label}</label>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={formData.bpnp.strategik?.rot?.[item.field] ?? 0}
                        onChange={(e) => handleStrategikNumberChange('rot', item.field, e.target.value)}
                        className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-xl font-black text-zus-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-violet-100 bg-violet-50/60 p-5">
                <h4 className="text-sm font-black text-violet-900 sentence-case">Data</h4>
                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl border border-violet-100 bg-white p-4">
                    <label className="text-xs font-black text-slate-500 sentence-case">Bilangan pegawai data</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={formData.bpnp.strategik?.data?.bilPegawaiData ?? 0}
                      onChange={(e) => handleStrategikNumberChange('data', 'bilPegawaiData', e.target.value)}
                      className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-xl font-black text-zus-900 outline-none transition focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
                    />
                  </div>

                  <div className="rounded-2xl border border-violet-100 bg-white p-4">
                    <label className="text-xs font-black text-slate-500 sentence-case">
                      Bilangan dashboard rasmi baharu yang telah disahkan 2025
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={formData.bpnp.strategik?.data?.bilDashboardRasmiBaharu2025 ?? 0}
                      onChange={(e) => handleStrategikNumberChange('data', 'bilDashboardRasmiBaharu2025', e.target.value)}
                      className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-xl font-black text-zus-900 outline-none transition focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-black tracking-tight text-zus-900 sentence-case">Nama dashboard rasmi baharu</h3>
                <p className="mt-1 text-sm font-medium text-slate-500">Masukkan nama dashboard yang telah disahkan bagi tahun 2025.</p>
              </div>
              <button
                onClick={addStrategicDashboardName}
                className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-black text-white transition hover:bg-violet-700 active:scale-[0.98]"
              >
                <Plus className="h-4 w-4" />
                Tambah Nama Dashboard
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {(formData.bpnp.strategik?.data?.namaDashboardBaharu || ['']).map((item: string, index: number) => (
                <div key={`strategik-dashboard-${index}`} className="flex gap-3 rounded-[1.5rem] border border-slate-100 bg-slate-50/70 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-sm font-black text-violet-700">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-black text-slate-500 sentence-case">
                      {index + 1}. Masukkan nama dashboard
                    </label>
                    <input
                      type="text"
                      value={item || ''}
                      onChange={(e) => updateStrategicDashboardName(index, e.target.value)}
                      placeholder="Masukkan nama dashboard rasmi"
                      className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
                    />
                  </div>
                  {(formData.bpnp.strategik?.data?.namaDashboardBaharu || []).length > 1 && (
                    <button
                      onClick={() => removeStrategicDashboardName(index)}
                      className="self-start rounded-2xl bg-rose-50 p-3 text-rose-500 transition hover:bg-rose-100"
                      title="Padam nama dashboard"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Kajian & Kaji Selidik */}
              </>
            )}

            {isUnitAkidah && (
              <>
          {renderUnitActivitySection(
            'Jumlah Aktiviti Unit Akidah Tapisan (2025)',
            'Nilai ini akan dicampurkan bersama Unit Penyelidikan dan Unit Perancangan Strategik dalam dashboard BPNP.',
            'border-cyan-100 text-cyan-600'
          )}

          {/* Statistik & Penerbitan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-zus-900">Statistik Aktiviti & Operasi (2025)</h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Penapisan Bahan Berunsur Islam', field: 'penapisan', ref: BPNP_2024_REFERENCE.statistik.penapisan },
                  { label: 'Kluster Data Bersepadu', field: 'kluster', ref: BPNP_2024_REFERENCE.statistik.kluster },
                  { label: 'Program / Aktiviti', field: 'program', ref: BPNP_2024_REFERENCE.statistik.program },
                ].map((item) => (
                  <div key={item.field} className="grid grid-cols-2 items-center gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500">{item.label}</label>
                      <div className="text-[10px] font-bold text-gray-400">2024: {item.ref}</div>
                    </div>
                    <input 
                      type="number"
                      value={formData.bpnp.statistik[item.field]}
                      onChange={(e) => handleBpnpStatChange(item.field, parseInt(e.target.value) || 0)}
                      className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-center focus:ring-2 focus:ring-zus-gold/20 outline-none transition-all"
                    />
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                  <Image className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-zus-900">Penerbitan Digital (2025)</h3>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-4">
                  <div className="space-y-4 rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500">Infografik Akidah</label>
                      <div className="text-[10px] font-bold text-indigo-400">2024: {BPNP_2024_REFERENCE.statistik.infografik}</div>
                    </div>
                    <input 
                      type="number"
                      value={formData.bpnp.statistik.infografik}
                      onChange={(e) => handleBpnpStatChange('infografik', parseInt(e.target.value) || 0)}
                      className="w-full p-3 bg-white border border-indigo-100 rounded-xl text-sm font-bold text-center focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    />
                  </div>
                  <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4">
                    <h4 className="text-[10px] font-black text-indigo-500 sentence-case mb-1">Kandungan utama / tajuk koleksi</h4>
                    <p className="mb-3 text-[10px] font-medium italic text-slate-500">
                      Rujukan 2024: Ulangkaji Sifat 20, Koleksi Bahan Infografik Islamik (untuk paparan TV Masjid & Surau).
                    </p>
                    <textarea
                      rows={5}
                      value={formData.bpnp.penerbitanDigital?.kandunganUtama || ''}
                      onChange={(e) => handleBpnpNestedTextChange('penerbitanDigital', 'kandunganUtama', e.target.value)}
                      placeholder="Masukkan kandungan utama atau tajuk koleksi untuk tahun 2025"
                      className="w-full resize-y rounded-xl border border-indigo-100 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition-all focus:ring-2 focus:ring-indigo-200"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
              </>
            )}

          {!isUnitPenyelidikan && (
            <>
              <NarrativeSection formData={formData} handleInputChange={handleInputChange} />
              <LawatanSection 
                formData={formData} 
                addLawatan={addLawatan} 
                removeLawatan={removeLawatan} 
                updateLawatan={updateLawatan} 
                handleSave={handleSave}
                isSaving={isSaving}
              />
            </>
          )}
          </div>
        </>)
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
            <BookOpen className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-black text-zus-900 mb-2 uppercase tracking-tight">{selectedUnit}</h3>
          <p className="text-slate-500 font-medium max-w-md mx-auto">
            Borang untuk unit ini sedang dalam pembangunan atau tiada data khusus yang diperlukan buat masa ini.
          </p>
        </div>
      )}
    </FormLayout>
  );
};

export default BpnpForm;
