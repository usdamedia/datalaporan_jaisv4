import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, LayoutDashboard } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, showBack, onBack, title }) => {
  const FONT_SIZE_STORAGE_KEY = 'jais_font_scale_preference';
  const fontScaleOptions = useMemo(
    () => ({
      small: {
        header: '1.8rem',
        subheader: '1rem',
        body: '0.88rem',
      },
      default: {
        header: '2rem',
        subheader: '1.125rem',
        body: '0.95rem',
      },
      large: {
        header: '2.2rem',
        subheader: '1.25rem',
        body: '1.03rem',
      },
    }),
    []
  );
  const [fontScale, setFontScale] = useState<'small' | 'default' | 'large'>(() => {
    if (typeof window === 'undefined') return 'default';
    const saved = window.localStorage.getItem(FONT_SIZE_STORAGE_KEY);
    return saved === 'small' || saved === 'large' || saved === 'default' ? saved : 'default';
  });

  useEffect(() => {
    window.localStorage.setItem(FONT_SIZE_STORAGE_KEY, fontScale);
  }, [fontScale]);

  const appTypographyStyle = useMemo(
    () => ({
      '--app-font-header': fontScaleOptions[fontScale].header,
      '--app-font-subheader': fontScaleOptions[fontScale].subheader,
      '--app-font-body': fontScaleOptions[fontScale].body,
    }) as React.CSSProperties,
    [fontScale, fontScaleOptions]
  );

  return (
    <div className="app-typography min-h-screen flex flex-col" style={appTypographyStyle}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center gap-3 md:gap-4">
              {showBack && (
                <button
                  onClick={onBack}
                  aria-label="Kembali"
                  title="Kembali"
                  className="p-2 -ml-2 text-gray-500 hover:text-zus-900 hover:bg-gray-100 rounded-full transition-all active:scale-90 focus-visible:ring-2 focus-visible:ring-zus-gold outline-none"
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
              <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-1.5 py-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => setFontScale('small')}
                  aria-label="Kecilkan font"
                  title="Kecilkan font"
                  className={`rounded-full px-2 py-1 text-[10px] font-black transition sm:px-2.5 sm:text-[11px] ${
                    fontScale === 'small'
                      ? 'bg-zus-900 text-white'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-zus-900'
                  }`}
                >
                  A-
                </button>
                <button
                  type="button"
                  onClick={() => setFontScale('large')}
                  aria-label="Besarkan font"
                  title="Besarkan font"
                  className={`rounded-full px-2 py-1 text-[10px] font-black transition sm:px-2.5 sm:text-[11px] ${
                    fontScale === 'large'
                      ? 'bg-zus-900 text-white'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-zus-900'
                  }`}
                >
                  A+
                </button>
              </div>
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
