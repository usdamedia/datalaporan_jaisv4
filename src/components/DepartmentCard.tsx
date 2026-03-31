import React from 'react';
import { ChevronRight, Layers } from 'lucide-react';
import { getIconForDept } from '../constants';

interface DepartmentCardProps {
  id: string;
  name: string;
  active: boolean;
  hasSubUnits?: boolean;
  onClick: () => void;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ name, active, hasSubUnits, onClick }) => {
  const isIntegriti = name.toUpperCase().includes('INTEGRITI');

  return (
    <button
      onClick={onClick}
      disabled={!active}
      aria-label={`${active ? 'Pilih Bahagian' : 'Akan Datang'} ${name}`}
      className={`
        w-full h-full text-left p-4 md:p-6 rounded-2xl md:rounded-3xl border transition-all duration-300 group relative overflow-hidden
        ${active 
          ? isIntegriti
            ? 'bg-gradient-to-br from-emerald-50 via-white to-emerald-100 border-emerald-200 hover:border-emerald-400 hover:shadow-xl hover:-translate-y-1 cursor-pointer active:scale-[0.98]'
            : 'bg-white border-gray-200 hover:border-zus-gold hover:shadow-xl hover:-translate-y-1 cursor-pointer active:scale-[0.98]'
          : 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed'}
      `}
    >
      {/* Decorative Background Element */}
      <div
        className={`
          absolute -right-4 -bottom-4 h-24 w-24 rounded-full transition-colors duration-300
          ${isIntegriti ? 'bg-emerald-200/40 group-hover:bg-emerald-300/45' : 'bg-gray-50 group-hover:bg-zus-gold/5'}
        `}
      ></div>
      {isIntegriti && active && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 -top-4 text-[120px] leading-none opacity-[0.12] saturate-75"
        >
          ✅
        </div>
      )}

      <div className="relative z-10 flex flex-col h-full">
        <div className={`
          w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 transition-all duration-300
          ${active 
            ? isIntegriti
              ? 'bg-emerald-700 text-white group-hover:bg-emerald-600 group-hover:scale-110 shadow-md'
              : 'bg-zus-900 text-white group-hover:bg-zus-gold group-hover:scale-110 shadow-md'
            : 'bg-gray-200 text-gray-400'}
        `}>
          {getIconForDept(name)}
        </div>

        <div className="flex-grow">
          <h3 className={`font-bold text-sm md:text-lg leading-tight mb-1 md:mb-2 ${active ? (isIntegriti ? 'text-emerald-950' : 'text-zus-900') : 'text-gray-400'}`}>
            {name}
          </h3>
          {hasSubUnits && active && (
            <div className={`flex items-center gap-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider ${isIntegriti ? 'text-emerald-700' : 'text-zus-gold'}`}>
              <Layers className="w-3 h-3" />
              <span>Mempunyai Unit</span>
            </div>
          )}
        </div>

        <div className="mt-4 md:mt-6 flex items-center justify-between">
          <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest ${active ? (isIntegriti ? 'text-emerald-700 group-hover:text-emerald-800' : 'text-gray-400 group-hover:text-zus-gold') : 'text-gray-300'}`}>
            {active ? 'Pilih Bahagian' : 'Akan Datang'}
          </span>
          {active && (
            <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isIntegriti ? 'bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-zus-gold group-hover:text-white'}`}>
              <ChevronRight className="w-4 h-4 md:w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default DepartmentCard;
