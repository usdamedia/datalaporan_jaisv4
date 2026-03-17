import React from 'react';
import { ChevronLeft, LayoutDashboard } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, showBack, onBack, title }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center gap-3 md:gap-4">
              {showBack && (
                <button
                  onClick={onBack}
                  className="p-2 -ml-2 text-gray-500 hover:text-zus-900 hover:bg-gray-100 rounded-full transition-all active:scale-90"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              )}
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-zus-900 rounded-lg flex items-center justify-center text-white shadow-lg">
                  <LayoutDashboard className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h1 className="text-sm md:text-lg font-bold text-zus-900 leading-tight">
                    KEPERLUAN DATA
                  </h1>
                  <p className="text-[10px] md:text-xs text-gray-500 font-medium">
                    Laporan Tahunan JAIS 2025
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:block text-right mr-3">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Status Sistem</p>
                <p className="text-xs text-green-600 font-bold flex items-center justify-end gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  Aktif
                </p>
              </div>
              <div className="h-8 w-[1px] bg-gray-200 mx-2 hidden sm:block"></div>
              <div className="bg-zus-gold/10 px-3 py-1 rounded-full border border-zus-gold/20">
                <span className="text-[10px] md:text-xs font-bold text-zus-gold uppercase tracking-wider">
                  {title || 'Utama'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-xs md:text-sm text-gray-500 font-medium">
                © 2025 Jabatan Agama Islam Sarawak (JAIS). Hak Cipta Terpelihara.
              </p>
            </div>
            <div className="flex items-center gap-4 md:gap-6">
              <a href="#" className="text-xs text-gray-400 hover:text-zus-gold transition-colors">Dasar Privasi</a>
              <a href="#" className="text-xs text-gray-400 hover:text-zus-gold transition-colors">Terma Penggunaan</a>
              <a href="#" className="text-xs text-gray-400 hover:text-zus-gold transition-colors">Bantuan</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
