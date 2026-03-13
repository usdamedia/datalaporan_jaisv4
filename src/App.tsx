import React, { useState } from 'react';
import Layout from './components/Layout';
import DepartmentCard from './components/DepartmentCard';
import FormEntry from './components/FormEntry';
import DigitalizationPage from './components/DigitalizationPage';
import DataManagementDashboard from './components/DataManagementDashboard';
import MaintenanceGuard from './components/MaintenanceGuard';
import { DEPARTMENTS } from './constants';
import { Department, SubUnit } from './types';
import { X, ChevronRight, MousePointerClick, FileText, Save, FileCheck, Info, ChevronUp, Cpu, Database } from 'lucide-react';

export default function App() {
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [selectedSubUnit, setSelectedSubUnit] = useState<SubUnit | null>(null);
  const [showSubUnitModal, setShowSubUnitModal] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showDigitalization, setShowDigitalization] = useState(false);
  const [showDataDashboard, setShowDataDashboard] = useState(false);

  const handleDeptClick = (dept: Department) => {
    if (!dept.active) return;

    if (dept.id === 'data-dashboard') {
      setShowDataDashboard(true);
      return;
    }

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
    setShowDataDashboard(false);
  };

  // Logic: Show form if a leaf-node department/unit is selected
  const isFormMode = !!selectedDept && (!selectedDept.subUnits || !!selectedSubUnit) && selectedDept.id !== 'data-dashboard';
  
  // Title for Form Entry
  const formTitle = selectedSubUnit 
    ? `${selectedDept?.name} : ${selectedSubUnit.name}` 
    : selectedDept?.name;

  return (
    <MaintenanceGuard>
      <Layout 
        showBack={isFormMode || showSubUnitModal || showDigitalization || showDataDashboard} 
        onBack={resetSelection}
        title={isFormMode ? 'Isi Data' : showDigitalization ? 'Digitalisasi' : showDataDashboard ? 'Data Management' : 'Utama'}
      >
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
                  const getUnitColor = (name: string) => {
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
                          ? `${getUnitColor(unit.name)} shadow-sm hover:shadow-lg text-gray-700 active:scale-[0.98]` 
                          : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'}
                      `}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <span className="font-bold text-sm md:text-base">{unit.name}</span>
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
        ) : showDataDashboard ? (
          <DataManagementDashboard />
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
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-zus-gold animate-pulse"></span> Edisi 2025
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-3 md:mb-4 text-zus-900 leading-tight">
                DATA LAPORAN TAHUNAN <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zus-900 via-zus-700 to-zus-gold">
                  JAIS 2025
                </span>
              </h1>
              
              <p className="text-sm md:text-xl text-gray-500 font-medium max-w-2xl mx-auto mb-6 md:mb-8 px-4 leading-relaxed">
                Sistem pengumpulan data berpusat untuk penerbitan buku laporan tahunan Jabatan Agama Islam Sarawak.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-8">
                {/* Toggle Tutorial Button */}
                <button 
                  onClick={() => setShowTutorial(!showTutorial)}
                  className={`
                    flex items-center gap-2 px-5 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-bold transition-all
                    ${showTutorial 
                      ? 'bg-zus-900 text-white shadow-lg ring-2 ring-zus-gold ring-offset-2' 
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-zus-gold hover:text-zus-900 shadow-sm'}
                  `}
                >
                  {showTutorial ? <ChevronUp className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                  {showTutorial ? 'Tutup Panduan' : 'Panduan Pengguna'}
                </button>

                {/* Data Dashboard Button */}
                <button 
                  onClick={() => setShowDataDashboard(true)}
                  className="flex items-center gap-2 px-5 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-bold bg-[#134E4A] text-white shadow-lg hover:bg-teal-900 transition-all active:scale-95 border border-teal-800"
                >
                  <Database className="w-4 h-4" />
                  Data Management
                </button>

                {/* Digitalization Page Button */}
                <button 
                  onClick={() => setShowDigitalization(true)}
                  className="flex items-center gap-2 px-5 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-bold bg-teal-600 text-white shadow-lg hover:bg-teal-700 transition-all active:scale-95 border border-teal-500"
                >
                  <Cpu className="w-4 h-4" />
                  Digitalisasi JAIS
                </button>
              </div>

              {/* CREATIVE INSTRUCTION CARDS (Collapsible) */}
              {showTutorial && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-left animate-fade-in-up">
                    {/* Step 1 */}
                    <div className="bg-white border border-gray-200 p-4 md:p-5 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 md:p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="text-4xl md:text-6xl font-bold text-gray-400">1</span>
                        </div>
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-3 md:mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <MousePointerClick className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <h3 className="font-bold text-zus-900 mb-1 text-sm md:text-base">Pilih Bahagian</h3>
                        <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed line-clamp-3">Klik kad jabatan di senarai bawah untuk mula mengisi.</p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white border border-gray-200 p-4 md:p-5 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 md:p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="text-4xl md:text-6xl font-bold text-gray-400">2</span>
                        </div>
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-3 md:mb-4 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                            <FileText className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <h3 className="font-bold text-zus-900 mb-1 text-sm md:text-base">Isi Maklumat</h3>
                        <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed line-clamp-3">Lengkapkan borang data yang disediakan.</p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white border border-gray-200 p-4 md:p-5 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 md:p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="text-4xl md:text-6xl font-bold text-gray-400">3</span>
                        </div>
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-50 rounded-xl flex items-center justify-center mb-3 md:mb-4 text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                            <Save className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <h3 className="font-bold text-zus-900 mb-1 text-sm md:text-base">Simpan Draf</h3>
                        <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed line-clamp-3">
                            Data disimpan secara lokal di pelayar anda.
                        </p>
                    </div>

                    {/* Step 4 */}
                    <div className="bg-white border border-gray-200 p-4 md:p-5 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 md:p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="text-4xl md:text-6xl font-bold text-gray-400">4</span>
                        </div>
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-xl flex items-center justify-center mb-3 md:mb-4 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                            <FileCheck className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <h3 className="font-bold text-zus-900 mb-1 text-sm md:text-base">Export PDF</h3>
                        <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed line-clamp-3">
                            Muat turun laporan PDF untuk disahkan.
                        </p>
                    </div>
                </div>
              )}
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
  );
}
