import React, { useEffect, useState } from 'react';
import { getTodayIsoMY } from './utils/dateFormat';
import Layout from './components/Layout';
import DepartmentCard from './components/DepartmentCard';
import FormEntry from './components/FormEntry';
import DigitalizationPage from './components/DigitalizationPage';
import ProgressTrackerPage from './components/ProgressTrackerPage';
import MaintenanceGuard from './components/MaintenanceGuard';
import WebViewOnlyGuard from './components/WebViewOnlyGuard';
import { DEPARTMENTS } from './data/departments';
import { Department, SubUnit } from './types';
import { X, ChevronRight, MousePointerClick, FileText, Save, FileCheck, Info, Cpu, CheckCircle2, BarChart3 } from 'lucide-react';

const NAVIGATION_STORAGE_KEY = 'jais_active_navigation_2025';
const PROGRESS_TRACKER_PASSWORD = 'bpnpj@is2026';

export default function App() {
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [selectedSubUnit, setSelectedSubUnit] = useState<SubUnit | null>(null);
  const [showSubUnitModal, setShowSubUnitModal] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showDigitalization, setShowDigitalization] = useState(false);
  const [showProgressTracker, setShowProgressTracker] = useState(false);

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
      };

      if (parsed.showDigitalization) {
        setShowDigitalization(true);
        return;
      }

      if (parsed.showProgressTracker) {
        setShowProgressTracker(true);
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
        })
      );
    } catch (error) {
      console.error('Failed to persist navigation state', error);
    }
  }, [selectedDept, selectedSubUnit, showSubUnitModal, showDigitalization, showProgressTracker]);

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

  const resetSelection = () => {
    setSelectedDept(null);
    setSelectedSubUnit(null);
    setShowSubUnitModal(false);
    setShowDigitalization(false);
    setShowProgressTracker(false);
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

  // Logic: Show form if a leaf-node department/unit is selected
  const isFormMode = !!selectedDept && (!selectedDept.subUnits || !!selectedSubUnit);
  
  // Title for Form Entry
  const formTitle = selectedSubUnit 
    ? `${selectedDept?.name} : ${selectedSubUnit.name}` 
    : selectedDept?.name;

  return (
    <WebViewOnlyGuard>
      <MaintenanceGuard>
        <Layout 
          showBack={isFormMode || showSubUnitModal || showDigitalization || showProgressTracker} 
          onBack={resetSelection}
          title={isFormMode ? 'Isi Data' : showDigitalization ? 'Digitalisasi' : showProgressTracker ? 'Progress Tracker' : 'Utama'}
        >
        {showTutorial && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
              onClick={() => setShowTutorial(false)}
            ></div>

            <div className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-red-100 bg-white shadow-2xl animate-scale-in">
              <div className="relative overflow-hidden border-b border-red-100 bg-gradient-to-r from-red-700 via-red-600 to-rose-500 px-6 py-5 text-white md:px-8 md:py-6">
                <div className="absolute inset-y-0 right-0 w-40 bg-white/10 blur-3xl"></div>
                <button
                  onClick={() => setShowTutorial(false)}
                  className="absolute right-4 top-4 rounded-full bg-white/15 p-2 text-white transition hover:bg-white/25"
                  aria-label="Tutup panduan"
                >
                  <X className="h-5 w-5" />
                </button>

                <p className="mb-2 text-[11px] font-black uppercase tracking-[0.28em] text-red-100">Panduan Pengguna</p>
                <h2 className="max-w-2xl pr-10 text-2xl font-black leading-tight md:text-3xl">
                  Ikut 5 langkah ringkas ini sebelum mula mengisi data.
                </h2>
                <p className="mt-3 max-w-2xl text-sm text-red-50/90 md:text-base">
                  Popup ini akan muncul setiap kali sistem dibuka supaya pengguna terus nampak panduan utama.
                </p>
              </div>

              <div className="bg-gradient-to-b from-red-50 via-white to-rose-50 px-5 py-5 md:px-8 md:py-7">
                <div className="grid grid-cols-1 gap-3 text-left sm:grid-cols-2 xl:grid-cols-5 md:gap-4">
                  <div className="relative overflow-hidden rounded-2xl border border-red-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-5">
                    <div className="absolute right-3 top-2 text-5xl font-black text-red-100">1</div>
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600">
                      <MousePointerClick className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <h3 className="mb-1 text-sm font-bold text-zus-900 md:text-base">Pilih Bahagian</h3>
                    <p className="text-xs leading-relaxed text-slate-600">Klik kad jabatan di senarai bawah untuk mula mengisi.</p>
                  </div>

                  <div className="relative overflow-hidden rounded-2xl border border-orange-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-5">
                    <div className="absolute right-3 top-2 text-5xl font-black text-orange-100">2</div>
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                      <FileText className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <h3 className="mb-1 text-sm font-bold text-zus-900 md:text-base">Isi Maklumat</h3>
                    <p className="text-xs leading-relaxed text-slate-600">Lengkapkan borang data yang disediakan mengikut bahagian masing-masing.</p>
                  </div>

                  <div className="relative overflow-hidden rounded-2xl border border-amber-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-5">
                    <div className="absolute right-3 top-2 text-5xl font-black text-amber-100">3</div>
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                      <Save className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <h3 className="mb-1 text-sm font-bold text-zus-900 md:text-base">Simpan Draf</h3>
                    <p className="text-xs leading-relaxed text-slate-600">Data disimpan secara lokal di pelayar anda supaya kerja boleh disambung semula.</p>
                  </div>

                  <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-5">
                    <div className="absolute right-3 top-2 text-5xl font-black text-emerald-100">4</div>
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                      <FileCheck className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <h3 className="mb-1 text-sm font-bold text-zus-900 md:text-base">Export PDF</h3>
                    <p className="text-xs leading-relaxed text-slate-600">Muat turun laporan PDF untuk semakan dan pengesahan akhir.</p>
                  </div>

                  <div className="relative overflow-hidden rounded-2xl border border-rose-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-5">
                    <div className="absolute right-3 top-2 text-5xl font-black text-rose-100">5</div>
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                      <FileCheck className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <h3 className="mb-1 text-sm font-bold text-zus-900 md:text-base">Tandatangan Pengesahan</h3>
                    <p className="text-xs leading-relaxed text-slate-600">
                      Print PDF tadi dan mohon tandatangan Ketua Unit dan Ketua Bahagian / Pemangku Ketua Bahagian.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex justify-end">
                  <button
                    onClick={() => setShowTutorial(false)}
                    className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-200 transition hover:bg-red-700 active:scale-95"
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
        ) : isFormMode ? (
          <FormEntry 
            deptName={formTitle || ''} 
            onBack={resetSelection} 
          />
        ) : (
          <div className="animate-fade-in-up space-y-6 md:space-y-12">
            
            {/* HERO HEADER & INSTRUCTIONS */}
            <div className="text-center max-w-5xl mx-auto pt-2 md:pt-6 px-2">
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

              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-8">
                <button 
                  onClick={() => setShowTutorial(true)}
                  className="flex items-center gap-2 rounded-full border border-red-500 bg-red-600 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-red-200 transition-all hover:bg-red-700 hover:border-red-700 active:scale-95 md:px-6 md:py-2.5 md:text-sm"
                >
                  <Info className="w-4 h-4" />
                  Panduan Pengguna
                </button>

                {/* Digitalization Page Button */}
                <button 
                  onClick={() => setShowDigitalization(true)}
                  className="flex items-center gap-2 px-5 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-bold bg-teal-600 text-white shadow-lg hover:bg-teal-700 transition-all active:scale-95 border border-teal-500"
                >
                  <Cpu className="w-4 h-4" />
                  Digitalisasi JAIS
                </button>

                <button 
                  onClick={handleOpenProgressTracker}
                  className="flex items-center gap-2 rounded-full border border-blue-700 bg-blue-700 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-800 hover:border-blue-800 active:scale-95 md:px-6 md:py-2.5 md:text-sm"
                >
                  <BarChart3 className="w-4 h-4" />
                  Progress Tracker
                </button>
              </div>

            </div>

            <div className="border-t border-gray-200 pt-6 md:pt-10">
              <h2 className="text-lg md:text-2xl font-bold text-zus-900 mb-4 md:mb-6 px-2 border-l-4 border-zus-gold ml-1">Senarai Bahagian</h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 pb-10">
                  {DEPARTMENTS.map((dept, index) => (
                  <div key={dept.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-fade-in-up">
                      <DepartmentCard
                      id={dept.id}
                      name={dept.name}
                      active={dept.active}
                      completed={dept.completed}
                      hasSubUnits={!!dept.subUnits}
                      onClick={() => handleDeptClick(dept)}
                      />
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
