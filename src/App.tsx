import React, { useEffect, useRef, useState } from 'react';
import { getTodayIsoMY } from './utils/dateFormat';
import Layout from './components/Layout';
import DepartmentCard from './components/DepartmentCard';
import FormEntry from './components/FormEntry';
import DigitalizationPage from './components/DigitalizationPage';
import ProgressTrackerPage from './components/ProgressTrackerPage';
import AnnualReportContentsPage from './components/AnnualReportContentsPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import MaintenanceGuard from './components/MaintenanceGuard';
import WebViewOnlyGuard from './components/WebViewOnlyGuard';
import DraftLoadingOverlay from './components/DraftLoadingOverlay';
import { CONTENT_SEARCH_INDEX } from './data/searchIndex';
import { Department, SubUnit } from './types';
import { X, ChevronRight, MousePointerClick, FileText, Save, FileCheck, Info, Cpu, CheckCircle2, BarChart3, LayoutList, Sparkles, Search } from 'lucide-react';

const NAVIGATION_STORAGE_KEY = 'jais_active_navigation_2025';
const PROGRESS_TRACKER_PASSWORD = 'bpnpj@is2026';

export default function App() {
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [selectedSubUnit, setSelectedSubUnit] = useState<SubUnit | null>(null);
  const [showSubUnitModal, setShowSubUnitModal] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showDigitalization, setShowDigitalization] = useState(false);
  const [showProgressTracker, setShowProgressTracker] = useState(false);
  const [showAnnualContents, setShowAnnualContents] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [homeSearchQuery, setHomeSearchQuery] = useState('');
  const pendingSearchTargetRef = useRef<string | null>(null);

  // Auto-show tutorial logic (max 3 times per day)
  useEffect(() => {
    const TUTORIAL_VIEW_KEY = 'jais_tutorial_views_2025';
    const today = getTodayIsoMY();
    
    try {
      const stored = localStorage.getItem(TUTORIAL_VIEW_KEY);
      let viewData = { date: '', count: 0 };
      
      if (stored) {
        viewData = JSON.parse(stored);
      }
      
      if (viewData.date === today) {
        if (viewData.count < 3) {
          setShowTutorial(true);
          localStorage.setItem(TUTORIAL_VIEW_KEY, JSON.stringify({
            date: today,
            count: viewData.count + 1
          }));
        }
      } else {
        // New day or first time
        setShowTutorial(true);
        localStorage.setItem(TUTORIAL_VIEW_KEY, JSON.stringify({
          date: today,
          count: 1
        }));
      }
    } catch (e) {
      console.error('Tutorial storage error', e);
      // Fallback: show it anyway if storage fails
      setShowTutorial(true);
    }
  }, []);

  useEffect(() => {
    try {
      const savedNavigation = sessionStorage.getItem(NAVIGATION_STORAGE_KEY);
      if (!savedNavigation) return;

      const parsed = JSON.parse(savedNavigation) as {
        selectedDeptId?: string;
        selectedSubUnitId?: string | null;
        showSubUnitModal?: boolean;
        showDigitalization?: boolean;
        showProgressTracker?: boolean;
        showAnnualContents?: boolean;
        showPrivacyPolicy?: boolean;
      };

      if (parsed.showPrivacyPolicy) {
        setShowPrivacyPolicy(true);
        return;
      }

      if (parsed.showDigitalization) {
        setShowDigitalization(true);
        return;
      }

      if (parsed.showProgressTracker) {
        setShowProgressTracker(true);
        return;
      }

      if (parsed.showAnnualContents) {
        setShowAnnualContents(true);
        return;
      }

      if (!parsed.selectedDeptId) return;

      const restoredDept = DEPARTMENTS.find((dept) => dept.id === parsed.selectedDeptId && dept.active);
      if (!restoredDept) return;

      setSelectedDept(restoredDept);

      if (parsed.selectedSubUnitId) {
        const restoredSubUnit = restoredDept.subUnits?.find((unit) => unit.id === parsed.selectedSubUnitId && unit.active);
        if (restoredSubUnit) {
          setSelectedSubUnit(restoredSubUnit);
          setShowSubUnitModal(false);
          return;
        }
      }

      setSelectedSubUnit(null);
      setShowSubUnitModal(Boolean(parsed.showSubUnitModal && restoredDept.subUnits?.length));
    } catch (error) {
      console.error('Failed to restore navigation state', error);
      sessionStorage.removeItem(NAVIGATION_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    try {
      if (showDigitalization) {
        sessionStorage.setItem(
          NAVIGATION_STORAGE_KEY,
          JSON.stringify({
            showDigitalization: true,
            showProgressTracker: false,
            showAnnualContents: false,
            showPrivacyPolicy: false,
          })
        );
        return;
      }

      if (showProgressTracker) {
        sessionStorage.setItem(
          NAVIGATION_STORAGE_KEY,
          JSON.stringify({
            showDigitalization: false,
            showProgressTracker: true,
            showAnnualContents: false,
            showPrivacyPolicy: false,
          })
        );
        return;
      }

      if (showAnnualContents) {
        sessionStorage.setItem(
          NAVIGATION_STORAGE_KEY,
          JSON.stringify({
            showDigitalization: false,
            showProgressTracker: false,
            showAnnualContents: true,
            showPrivacyPolicy: false,
          })
        );
        return;
      }

      if (showPrivacyPolicy) {
        sessionStorage.setItem(
          NAVIGATION_STORAGE_KEY,
          JSON.stringify({
            showDigitalization: false,
            showProgressTracker: false,
            showAnnualContents: false,
            showPrivacyPolicy: true,
          })
        );
        return;
      }

      if (!selectedDept) {
        sessionStorage.removeItem(NAVIGATION_STORAGE_KEY);
        return;
      }

      sessionStorage.setItem(
        NAVIGATION_STORAGE_KEY,
        JSON.stringify({
          selectedDeptId: selectedDept.id,
          selectedSubUnitId: selectedSubUnit?.id || null,
          showSubUnitModal,
          showDigitalization: false,
          showProgressTracker: false,
          showAnnualContents: false,
          showPrivacyPolicy: false,
        })
      );
    } catch (error) {
      console.error('Failed to persist navigation state', error);
    }
  }, [selectedDept, selectedSubUnit, showSubUnitModal, showDigitalization, showProgressTracker, showAnnualContents, showPrivacyPolicy]);

  const handleDeptClick = (dept: Department) => {
    if (!dept.active) return;

    if (dept.subUnits && dept.subUnits.length > 0) {
      setSelectedDept(dept);
      setShowSubUnitModal(true);
    } else {
      setSelectedDept(dept);
      setSelectedSubUnit(null); 
    }
  };

  const handleSubUnitClick = (unit: SubUnit) => {
    if(!unit.active) return;
    
    setSelectedSubUnit(unit);
    setShowSubUnitModal(false);
  };

  const normalizedHomeSearchQuery = homeSearchQuery.trim().toLowerCase();
  const filteredDepartments = React.useMemo(() => {
    if (!normalizedHomeSearchQuery) return DEPARTMENTS;

    return DEPARTMENTS.filter((dept) => {
      const deptMatch = dept.name.toLowerCase().includes(normalizedHomeSearchQuery);
      const subUnitMatch = dept.subUnits?.some((unit) => unit.name.toLowerCase().includes(normalizedHomeSearchQuery));
      const contentMatch = CONTENT_SEARCH_INDEX.some((entry) => {
        if (entry.deptId !== dept.id) return false;
        return [entry.title, entry.context, ...entry.keywords].join(' ').toLowerCase().includes(normalizedHomeSearchQuery);
      });
      return deptMatch || subUnitMatch || contentMatch;
    });
  }, [normalizedHomeSearchQuery]);

  const homeSearchResults = React.useMemo(() => {
    if (!normalizedHomeSearchQuery) return [];

    const navigationResults = DEPARTMENTS.flatMap((dept) => {
      const results: Array<{ id: string; label: string; context: string; dept: Department; subUnit?: SubUnit; targetId?: string; type: 'navigation' | 'content' }> = [];
      if (dept.name.toLowerCase().includes(normalizedHomeSearchQuery)) {
        results.push({
          id: `dept-${dept.id}`,
          label: dept.name,
          context: dept.subUnits?.length ? 'Bahagian dengan unit' : 'Bahagian',
          dept,
          type: 'navigation',
        });
      }

      dept.subUnits?.forEach((unit) => {
        if (unit.name.toLowerCase().includes(normalizedHomeSearchQuery)) {
          results.push({
            id: `unit-${unit.id}`,
            label: unit.name,
            context: dept.name,
            dept,
            subUnit: unit,
            type: 'navigation',
          });
        }
      });

      return results;
    });

    const contentResults = CONTENT_SEARCH_INDEX.flatMap((entry) => {
      const haystack = [entry.title, entry.context, ...entry.keywords].join(' ').toLowerCase();
      if (!haystack.includes(normalizedHomeSearchQuery)) return [];

      const dept = DEPARTMENTS.find((item) => item.id === entry.deptId);
      if (!dept) return [];

      const subUnit = entry.subUnitId
        ? dept.subUnits?.find((unit) => unit.id === entry.subUnitId)
        : undefined;

      return [{
        id: `content-${entry.id}`,
        label: entry.title,
        context: entry.context,
        dept,
        subUnit,
        targetId: entry.targetId,
        type: 'content' as const,
      }];
    });

    return [...contentResults, ...navigationResults];
  }, [normalizedHomeSearchQuery]);

  const handleSearchResultClick = (dept: Department, subUnit?: SubUnit, targetId?: string) => {
    if (!dept.active || (subUnit && !subUnit.active)) return;

    pendingSearchTargetRef.current = targetId || null;
    setShowDigitalization(false);
    setShowProgressTracker(false);
    setShowAnnualContents(false);
    setShowPrivacyPolicy(false);
    setHomeSearchQuery('');
    setSelectedDept(dept);
    if (subUnit) {
      setSelectedSubUnit(subUnit);
      setShowSubUnitModal(false);
      return;
    }

    setSelectedSubUnit(null);
    setShowSubUnitModal(Boolean(dept.subUnits?.length));
  };

  // Logic: Show form if a leaf-node department/unit is selected
  const isFormMode = !!selectedDept && (!selectedDept.subUnits || !!selectedSubUnit);

  useEffect(() => {
    if (!isFormMode || !pendingSearchTargetRef.current) return;

    let attempts = 0;
    const scrollToPendingTarget = () => {
      const targetId = pendingSearchTargetRef.current;
      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.classList.add('ring-4', 'ring-zus-gold/40', 'transition-shadow');
        window.setTimeout(() => target.classList.remove('ring-4', 'ring-zus-gold/40', 'transition-shadow'), 2200);
        pendingSearchTargetRef.current = null;
        return;
      }

      attempts += 1;
      if (attempts < 12) {
        window.setTimeout(scrollToPendingTarget, 180);
      }
    };

    window.setTimeout(scrollToPendingTarget, 250);
  }, [isFormMode, selectedDept, selectedSubUnit]);

  const resetSelection = () => {
    setSelectedDept(null);
    setSelectedSubUnit(null);
    setShowSubUnitModal(false);
    setShowDigitalization(false);
    setShowProgressTracker(false);
    setShowAnnualContents(false);
    setShowPrivacyPolicy(false);
  };

  const handleOpenProgressTracker = () => {
    const enteredPassword = window.prompt('Masukkan kata laluan untuk akses Progress Tracker:');
    if (enteredPassword === null) return;

    if (enteredPassword !== PROGRESS_TRACKER_PASSWORD) {
      window.alert('Kata laluan tidak tepat.');
      return;
    }

	    setShowProgressTracker(true);
	  };
	  
	  // Title for Form Entry
  const formTitle = selectedSubUnit 
    ? `${selectedDept?.name} : ${selectedSubUnit.name}` 
    : selectedDept?.name;

  return (
    <WebViewOnlyGuard>
      <MaintenanceGuard>
        <DraftLoadingOverlay />
        <Layout 
          showBack={isFormMode || showSubUnitModal || showDigitalization || showProgressTracker || showAnnualContents || showPrivacyPolicy} 
          onBack={resetSelection}
          title={isFormMode ? 'Isi Data' : showDigitalization ? 'Digitalisasi' : showProgressTracker ? 'Progress Tracker' : showAnnualContents ? 'Isi Kandungan' : showPrivacyPolicy ? 'Dasar Privasi' : 'Utama'}
          onPrivacyPolicyClick={() => {
            resetSelection();
            setShowPrivacyPolicy(true);
          }}
        >
        {showTutorial && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4">
            <div
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
              onClick={() => setShowTutorial(false)}
            ></div>

            <div className="relative w-full max-w-5xl max-h-[84vh] overflow-hidden rounded-[1.75rem] border border-cyan-100 bg-white shadow-2xl animate-scale-in sm:max-h-[90vh] sm:rounded-[2rem]">
              <div className="relative overflow-hidden border-b border-cyan-100 bg-gradient-to-r from-cyan-700 via-teal-600 to-blue-600 px-5 py-4 text-white md:px-8 md:py-6">
                <div className="absolute inset-y-0 right-0 w-40 bg-white/10 blur-3xl"></div>
                <button
                  onClick={() => setShowTutorial(false)}
                  className="absolute right-3 top-3 rounded-full bg-white/15 p-2 text-white transition hover:bg-white/25 md:right-4 md:top-4"
                  aria-label="Tutup panduan"
                >
                  <X className="h-5 w-5" />
                </button>

                <p className="mb-2 text-[11px] font-black uppercase tracking-[0.28em] text-cyan-100">Panduan Pengguna</p>
                <h2 className="max-w-2xl pr-10 text-xl font-black leading-tight sm:text-2xl md:text-3xl">
                  Ikut 5 langkah ringkas ini sebelum mula mengisi data.
                </h2>
                <p className="mt-2 max-w-2xl text-xs text-cyan-50/90 sm:text-sm md:mt-3 md:text-base">
                  Popup ini akan muncul setiap kali sistem dibuka supaya pengguna terus nampak panduan utama.
                </p>
              </div>

              <div className="max-h-[calc(84vh-8.5rem)] overflow-y-auto bg-gradient-to-b from-cyan-50 via-white to-blue-50 px-4 py-4 md:max-h-[calc(90vh-10rem)] md:px-8 md:py-8">
                <div className="grid grid-cols-1 gap-3 text-left sm:grid-cols-2 xl:grid-cols-5 md:gap-4">
                  <div className="relative overflow-hidden rounded-2xl border border-cyan-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-5">
                    <div className="absolute right-3 top-2 text-5xl font-black text-cyan-100">1</div>
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
                      <MousePointerClick className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <h3 className="mb-1 text-sm font-bold text-zus-900 md:text-base">Pilih Bahagian</h3>
                    <p className="text-xs leading-relaxed text-slate-600">Klik kad jabatan di senarai bawah untuk mula mengisi.</p>
                  </div>

                  <div className="relative overflow-hidden rounded-2xl border border-teal-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-5">
                    <div className="absolute right-3 top-2 text-5xl font-black text-teal-100">2</div>
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                      <FileText className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <h3 className="mb-1 text-sm font-bold text-zus-900 md:text-base">Isi Maklumat</h3>
                    <p className="text-xs leading-relaxed text-slate-600">Lengkapkan borang data yang disediakan mengikut bahagian masing-masing.</p>
                  </div>

                  <div className="relative overflow-hidden rounded-2xl border border-sky-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-5">
                    <div className="absolute right-3 top-2 text-5xl font-black text-sky-100">3</div>
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                      <Save className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <h3 className="mb-1 text-sm font-bold text-zus-900 md:text-base">Simpan Draf</h3>
                    <p className="text-xs leading-relaxed text-slate-600">Data disimpan secara lokal di pelayar anda supaya kerja boleh disambung semula.</p>
                  </div>

                  <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-5">
                    <div className="absolute right-3 top-2 text-5xl font-black text-emerald-100">4</div>
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                      <FileCheck className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <h3 className="mb-1 text-sm font-bold text-zus-900 md:text-base">Export PDF</h3>
                    <p className="text-xs leading-relaxed text-slate-600">Muat turun laporan PDF untuk semakan dan pengesahan akhir.</p>
                  </div>

                  <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-5">
                    <div className="absolute right-3 top-2 text-5xl font-black text-blue-100">5</div>
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                      <FileCheck className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <h3 className="mb-1 text-sm font-bold text-zus-900 md:text-base">Tandatangan Pengesahan</h3>
                    <p className="text-xs leading-relaxed text-slate-600">
                      Print PDF tadi dan mohon tandatangan Ketua Unit dan Ketua Bahagian / Pemangku Ketua Bahagian.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex justify-end pb-1">
                  <button
                    onClick={() => setShowTutorial(false)}
                  className="w-full rounded-full bg-cyan-700 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-200 transition hover:bg-cyan-800 active:scale-95 sm:w-auto"
                  >
                    Faham, tutup panduan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 1. Modal for Sub Units (Glassmorphism Overlay) */}
        {showSubUnitModal && selectedDept && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onClick={resetSelection}></div>
            <div className="relative bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-5 md:p-8 max-w-md w-full shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
              <button 
                onClick={resetSelection}
                className="absolute top-3 right-3 md:top-4 md:right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="text-lg md:text-xl font-bold text-zus-900 mb-1 flex items-center gap-2">
                  <span className="text-zus-gold">►</span> {selectedDept.name}
              </h2>
              <p className="text-gray-500 text-xs md:text-sm mb-5 border-b border-gray-100 pb-4">
                  Sila pilih unit spesifik untuk meneruskan:
              </p>
              
              <div className="space-y-2 md:space-y-3">
                {selectedDept.subUnits?.map((unit, index) => {
                  const getUnitColor = (unit: SubUnit) => {
                    if (unit.completed) {
                      return 'border-emerald-200 bg-emerald-50 text-emerald-900 hover:bg-emerald-600 hover:border-emerald-600 hover:text-white';
                    }

                    return 'hover:bg-zus-gold hover:border-zus-gold hover:text-white border-gray-200 bg-white';
                  };

                  return (
                    <button
                      key={unit.id}
                      onClick={() => handleSubUnitClick(unit)}
                      disabled={!unit.active}
                      className={`
                        w-full p-3 md:p-4 rounded-xl text-left border flex items-center justify-between group transition-all duration-200
                        ${unit.active 
                          ? `${getUnitColor(unit)} shadow-sm hover:shadow-lg active:scale-[0.98]`
                          : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'}
                      `}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center gap-2">
                        {unit.completed && <CheckCircle2 className="w-4 h-4 text-emerald-600 group-hover:text-white" />}
                        <span className="font-bold text-sm md:text-base">{unit.name}</span>
                      </div>
                      {unit.active && (
                        <ChevronRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:text-white transition-all group-hover:translate-x-1" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 2. Main View Handling */}
        {showDigitalization ? (
          <DigitalizationPage />
        ) : showProgressTracker ? (
          <ProgressTrackerPage />
        ) : showAnnualContents ? (
          <AnnualReportContentsPage />
        ) : showPrivacyPolicy ? (
          <PrivacyPolicyPage />
        ) : isFormMode ? (
          <FormEntry 
            deptName={formTitle || ''} 
            onBack={resetSelection} 
          />
        ) : (
          <div className="animate-fade-in-up space-y-6 md:space-y-12">
            <div className="sticky top-[4.75rem] z-40 md:top-[5.75rem]">
              <div className="rounded-2xl border border-slate-200 bg-white/95 px-4 py-4 shadow-[0_16px_40px_rgba(15,23,42,0.10)] backdrop-blur md:rounded-[1.75rem] md:px-6">
                <div className="flex items-start gap-3 md:items-center md:gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 md:h-11 md:w-11">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <p className="min-w-0 text-sm font-semibold leading-relaxed text-slate-700 md:text-base">
                    <span className="font-black text-zus-900">Kemaskini :</span>{' '}
                    Data kini disegerakkan (synchronize) dalam mana-mana komputer. Simpan progress anda untuk lihat dan edit di mana sahaja!
                  </p>
                </div>
              </div>
            </div>
            
            {/* HERO HEADER & INSTRUCTIONS */}
            <div className="text-center max-w-5xl mx-auto pt-4 md:pt-8 px-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-blue-50 border border-blue-100 text-zus-900 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4 md:mb-6 animate-scale-in shadow-sm">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-zus-gold"></span> Edisi 2025
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-3 md:mb-4 text-zus-900 leading-tight">
                KEPERLUAN DATA LAPORAN TAHUNAN <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zus-900 via-zus-700 to-zus-gold">
                  JAIS 2025
                </span>
              </h1>
              
              <p className="text-sm md:text-xl text-gray-500 font-medium max-w-2xl mx-auto mb-6 md:mb-8 px-4 leading-relaxed">
                Sistem pengumpulan data berpusat untuk penerbitan buku laporan tahunan Jabatan Agama Islam Sarawak.
              </p>

              <div className="mx-auto mb-6 max-w-3xl text-left">
                <label htmlFor="homepage-search" className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">
                  Cari bahagian / unit / kandungan borang
                </label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    id="homepage-search"
                    type="search"
                    value={homeSearchQuery}
                    onChange={(event) => setHomeSearchQuery(event.target.value)}
                    placeholder="Cari contoh: OEM, pengilang, akidah, halal, BPNP, HR"
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-12 text-sm font-bold text-slate-800 shadow-sm outline-none transition-all focus:border-zus-gold/60 focus:ring-4 focus:ring-zus-gold/10"
                  />
                  {homeSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setHomeSearchQuery('')}
                      aria-label="Kosongkan carian"
                      title="Kosongkan carian"
                      className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {normalizedHomeSearchQuery && (
                  <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                    {homeSearchResults.length > 0 ? (
                      <div className="grid gap-2 sm:grid-cols-2">
                        {homeSearchResults.slice(0, 6).map((result) => (
                          <button
                            key={result.id}
                            type="button"
                            onClick={() => handleSearchResultClick(result.dept, result.subUnit, result.targetId)}
                            className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-left transition hover:border-zus-gold/40 hover:bg-white hover:shadow-sm"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <p className="text-sm font-black text-zus-900">{result.label}</p>
                              {result.type === 'content' && (
                                <span className="shrink-0 rounded-full bg-zus-gold/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-zus-gold">
                                  Kandungan
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-[11px] font-bold text-slate-500">{result.context}</p>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="px-2 py-3 text-sm font-bold text-slate-500">
                        Tiada padanan dijumpai untuk "{homeSearchQuery}".
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="mb-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <button 
                  onClick={() => setShowTutorial(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-cyan-600 bg-cyan-700 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-cyan-200 transition-all hover:border-cyan-700 hover:bg-cyan-800 active:scale-95 sm:w-auto md:px-8 md:py-2 md:text-sm"
                >
                  <Info className="w-4 h-4" />
                  Panduan Pengguna
                </button>

                {/* Digitalization Page Button */}
                <button 
                  onClick={() => setShowDigitalization(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-teal-500 bg-teal-600 px-5 py-2 text-xs font-bold text-white shadow-lg transition-all hover:bg-teal-700 active:scale-95 sm:w-auto md:px-8 md:py-2 md:text-sm"
                >
                  <Cpu className="w-4 h-4" />
                  Digitalisasi JAIS
                </button>

                <button 
                  onClick={handleOpenProgressTracker}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-blue-700 bg-blue-700 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-blue-200 transition-all hover:border-blue-800 hover:bg-blue-800 active:scale-95 sm:w-auto md:px-8 md:py-2 md:text-sm"
                >
                  <BarChart3 className="w-4 h-4" />
                  Progress Tracker
                </button>

                <button
                  onClick={() => setShowAnnualContents(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-indigo-600 bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:border-indigo-700 hover:bg-indigo-700 active:scale-95 sm:w-auto md:px-8 md:py-2 md:text-sm"
                >
                  <LayoutList className="w-4 h-4" />
                  Isi Kandungan Laporan
                </button>
              </div>

            </div>
            <div className="border-t border-gray-200 pt-6 md:pt-10">
              <div className="mb-4 flex flex-col gap-2 px-2 md:mb-6 md:flex-row md:items-end md:justify-between">
                <h2 className="border-l-4 border-zus-gold pl-3 text-lg font-bold text-zus-900 md:text-2xl">Senarai Bahagian</h2>
                {normalizedHomeSearchQuery && (
                  <p className="text-xs font-bold text-slate-500">
                    {filteredDepartments.length} padanan bahagian/unit dijumpai
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 pb-8">
                  {filteredDepartments.map((dept, index) => (
                  <div key={dept.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-fade-in-up">
                      <DepartmentCard
                      id={dept.id}
                      name={dept.name}
                      active={dept.active}
                      completed={dept.completed}
                      hasSubUnits={!!dept.subUnits}
                      onClick={() => handleDeptClick(dept)}
                      />
                      {normalizedHomeSearchQuery && dept.subUnits?.some((unit) => unit.name.toLowerCase().includes(normalizedHomeSearchQuery)) && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {dept.subUnits
                            .filter((unit) => unit.name.toLowerCase().includes(normalizedHomeSearchQuery))
                            .map((unit) => (
                              <button
                                key={unit.id}
                                type="button"
                                onClick={() => handleSearchResultClick(dept, unit)}
                                className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-[10px] font-black text-cyan-700 transition hover:border-cyan-300 hover:bg-white"
                              >
                                {unit.name}
                              </button>
                            ))}
                        </div>
                      )}
                  </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        </Layout>
      </MaintenanceGuard>
    </WebViewOnlyGuard>
  );
}
