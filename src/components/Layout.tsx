import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronUp, LayoutDashboard } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, showBack, onBack, title }) => {
  const FONT_SIZE_STORAGE_KEY = 'jais_font_scale_preference';
  const [showGoTop, setShowGoTop] = useState(false);
  const fontScaleOptions = useMemo(
    () => ({
      small: {
        header: '14pt', // title kekal normal, a- hanya untuk subtajuk/isi
        subheader: '8pt', // a- requirement
        body: '8pt',
      },
      default: {
        header: '14pt', // normal requirement
        subheader: '10pt', // normal requirement
        body: '10pt',
      },
      large: {
        header: '16pt', // A+ requirement (step 1)
        subheader: '10pt', // subtajuk kekal 10pt ikut guideline
        body: '10pt',
      },
      extraLarge: {
        header: '20pt', // A+ requirement (step 2)
        subheader: '10pt', // subtajuk kekal 10pt ikut guideline
        body: '10pt',
      },
    }),
    []
  );
  const [fontScale, setFontScale] = useState<'small' | 'default' | 'large' | 'extraLarge'>(() => {
    if (typeof window === 'undefined') return 'default';
    const saved = window.localStorage.getItem(FONT_SIZE_STORAGE_KEY);
    return saved === 'small' || saved === 'large' || saved === 'extraLarge' || saved === 'default'
      ? saved
      : 'default';
  });

  useEffect(() => {
    window.localStorage.setItem(FONT_SIZE_STORAGE_KEY, fontScale);
  }, [fontScale]);

  useEffect(() => {
    const applyNumberInputPlaceholder = () => {
      const numberInputs = document.querySelectorAll<HTMLInputElement>('input[type="number"]');
      numberInputs.forEach((input) => {
        if (!input.getAttribute('placeholder')) {
          input.setAttribute('placeholder', '0');
        }
      });
    };

    applyNumberInputPlaceholder();
    const observer = new MutationObserver(applyNumberInputPlaceholder);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowGoTop(window.scrollY > 320);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        <div className="mx-auto max-w-[62.5rem] px-3 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex h-16 items-center justify-between gap-2 md:h-20 lg:h-22">
            <div className="flex items-center gap-4">
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
              <div className="flex items-center gap-4">
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

            <div className="flex items-center gap-1 sm:gap-2">
              <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-1 py-1 shadow-sm font-sans sm:px-1.5">
                <button
                  type="button"
                  onClick={() => setFontScale('small')}
                  aria-label="Kecilkan font (a-)"
                  title="a- (8pt)"
                  className={`rounded-full px-2 py-1 text-[10px] font-black transition sm:px-2.5 sm:text-[11px] ${fontScale === 'small'
                    ? 'bg-zus-900 text-white'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-zus-900'
                    }`}
                >
                  a-
                </button>
                <button
                  type="button"
                  onClick={() => setFontScale('default')}
                  aria-label="Saiz Normal"
                  title="Normal (14pt/10pt)"
                  className={`rounded-full px-2 py-1 text-[10px] font-black transition sm:px-2.5 sm:text-[11px] ${fontScale === 'default'
                    ? 'bg-zus-900 text-white'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-zus-900'
                    }`}
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (fontScale === 'large') setFontScale('extraLarge');
                    else setFontScale('large');
                  }}
                  aria-label="Besarkan font (A+)"
                  title={fontScale === 'large' ? "A++ (20pt)" : "A+ (16pt)"}
                  className={`rounded-full px-2 py-1 text-[10px] font-black transition sm:px-2.5 sm:text-[11px] ${fontScale === 'large' || fontScale === 'extraLarge'
                    ? 'bg-zus-900 text-white'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-zus-900'
                    }`}
                >
                  {fontScale === 'extraLarge' ? 'A++' : 'A+'}
                </button>
              </div>
              <div className="hidden md:block text-right mr-2 lg:mr-3">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Status Sistem</p>
                <p className="text-xs text-green-600 font-bold flex items-center justify-end gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Aktif
                </p>
              </div>
              <div className="h-8 w-[1px] bg-gray-200 mx-1 hidden md:block"></div>
              <div className="bg-zus-gold/10 px-2 py-1 rounded-full border border-zus-gold/20 sm:px-3">
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
        <div className="mx-auto max-w-[62.5rem] px-4 py-8 sm:px-8 md:py-12 lg:px-12 xl:px-16">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 md:py-8">
        <div className="mx-auto max-w-[62.5rem] px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-xs md:text-sm text-gray-500 font-medium">
                © 2025 Jabatan Agama Islam Sarawak (JAIS). Hak Cipta Terpelihara.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
              <a href="#" className="text-xs text-gray-400 hover:text-zus-gold transition-colors">Dasar Privasi</a>
              <a href="#" className="text-xs text-gray-400 hover:text-zus-gold transition-colors">Terma Penggunaan</a>
              <a href="#" className="text-xs text-gray-400 hover:text-zus-gold transition-colors">Bantuan</a>
            </div>
          </div>
        </div>
      </footer>

      {showGoTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Go to top"
          title="Go to top"
          className="print-hidden fixed bottom-5 right-4 z-[70] inline-flex h-12 w-12 items-center justify-center rounded-full border border-zus-gold/40 bg-zus-900 text-white shadow-[0_14px_30px_rgba(15,35,64,0.3)] transition-all hover:-translate-y-1 hover:bg-zus-800 hover:shadow-[0_18px_34px_rgba(15,35,64,0.35)] active:scale-95 sm:bottom-6 sm:right-6"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default Layout;
