import React, { useEffect, useMemo, useState } from 'react';
import { getTodayIsoMY } from '../utils/dateFormat';
import { ChevronLeft, LayoutDashboard } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, showBack, onBack, title }) => {
  const FONT_SIZE_STORAGE_KEY = 'jais_font_scale_preference';
  const ANNOUNCEMENT_VIEW_KEY = 'jais_announcement_views_2025';
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const announcementMessages = [
    {
      text: 'Data Tidak Ada Disimpan Di Mana-Mana Google Sheet, Anda Perlu Save -> Download PDF -> Tandatangan -> Serah kepada Urus Setia',
      style: { fontSize: '18.67px', fontWeight: 700, fontStyle: 'normal' } as React.CSSProperties,
    },
    {
      text: 'Dialek Sarawak: Data sik disimpan di mana mana google sheet, save progress di browser tuan puan, kakya boleh edit balit nya disimpan dalam broswer ktk jak, dah ready kakya download PDF print, kakya sign KB/PKB dan serahkan kepada urus setia.',
      style: { fontSize: '13.33px', fontWeight: 400, fontStyle: 'italic' } as React.CSSProperties,
    },
  ];
  const fontScaleOptions = useMemo(
    () => ({
      small: {
        header: '12pt',
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
        subheader: '11pt',
        body: '11pt',
      },
      extraLarge: {
        header: '20pt', // A+ requirement (step 2)
        subheader: '12pt',
        body: '12pt',
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
    const today = getTodayIsoMY();

    try {
      const stored = window.localStorage.getItem(ANNOUNCEMENT_VIEW_KEY);
      let viewData = { date: '', count: 0 };

      if (stored) {
        viewData = JSON.parse(stored);
      }

      if (viewData.date === today) {
        if (viewData.count < 3) {
          setShowAnnouncement(true);
          window.localStorage.setItem(
            ANNOUNCEMENT_VIEW_KEY,
            JSON.stringify({ date: today, count: viewData.count + 1 })
          );
        } else {
          setShowAnnouncement(false);
        }
      } else {
        setShowAnnouncement(true);
        window.localStorage.setItem(
          ANNOUNCEMENT_VIEW_KEY,
          JSON.stringify({ date: today, count: 1 })
        );
      }
    } catch (error) {
      console.error('Announcement storage error', error);
      setShowAnnouncement(true);
    }
  }, []);

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
        <div className="mx-auto max-w-[112rem] px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex justify-between items-center h-16 md:h-20 lg:h-22">
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
              <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-1.5 py-1 shadow-sm font-sans">
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
        {showAnnouncement && (
          <div className="w-full bg-red-700 px-4 py-2 text-white">
            <div className="mx-auto flex max-w-[112rem] items-start gap-3 sm:gap-4">
              <div className="flex flex-1 flex-wrap items-center justify-center gap-3 text-center leading-tight sm:gap-4">
                {announcementMessages.map((message, index) => (
                  <React.Fragment key={message.text}>
                    {index > 0 && <span className="hidden sm:inline text-red-200">|</span>}
                    <p style={message.style} className="tracking-[0.01em]">
                      {message.text}
                    </p>
                  </React.Fragment>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setShowAnnouncement(false)}
                aria-label="Tutup pengumuman"
                title="Tutup pengumuman"
                className="mt-0.5 rounded-full border border-white/40 px-2 py-0.5 text-sm font-bold text-white transition hover:bg-white/20"
              >
                X
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="mx-auto max-w-[112rem] px-5 py-8 sm:px-8 md:py-12 lg:px-12 xl:px-16">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 md:py-8">
        <div className="mx-auto max-w-[112rem] px-5 sm:px-8 lg:px-12 xl:px-16">
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
