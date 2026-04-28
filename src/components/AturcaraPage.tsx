import React, { useEffect, useRef, useState } from 'react';
import { CalendarDays, Clock, Heart, Home, MapPin, Maximize2, Megaphone, Minimize2, Presentation, Sparkles, Target, XCircle } from 'lucide-react';
import { LiveAnnouncementState } from '../hooks/useLiveAnnouncement';
import borangDataQr from '../assets/borang-data-qr.jpg';

interface AturcaraPageProps {
  liveAnnouncement: LiveAnnouncementState;
  liveAnnouncementError?: string;
  isLiveAdminDevice: boolean;
  onStartLiveAnnouncement: () => Promise<void>;
  onStopLiveAnnouncement: () => Promise<void>;
}

const slides = [
  { id: 'utama', label: '1' },
  { id: 'fokus', label: '2' },
  { id: 'pagi', label: '3' },
  { id: 'petang', label: '4' },
];

const AturcaraPage: React.FC<AturcaraPageProps> = ({
  liveAnnouncement,
  liveAnnouncementError,
  isLiveAdminDevice,
  onStartLiveAnnouncement,
  onStopLiveAnnouncement,
}) => {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const slideDeckRef = useRef<HTMLDivElement | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [adminLoveBursts, setAdminLoveBursts] = useState<Array<{ id: string; x: number; y: number }>>([]);
  const lastReactionIdRef = useRef<string | null>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const nextIsFullscreen = document.fullscreenElement === pageRef.current;
      setIsFullscreen(nextIsFullscreen);
      setIsMaximized(nextIsFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const reactionId = liveAnnouncement.lastReaction?.id;
    if (!isLiveAdminDevice || !reactionId || reactionId === lastReactionIdRef.current) return;

    lastReactionIdRef.current = reactionId;
    setAdminLoveBursts((items) => [
      ...items.slice(-18),
      {
        id: reactionId,
        x: liveAnnouncement.lastReaction?.x ?? 0.92,
        y: liveAnnouncement.lastReaction?.y ?? 0.86,
      },
    ]);
    window.setTimeout(() => {
      setAdminLoveBursts((items) => items.filter((item) => item.id !== reactionId));
    }, 1400);
  }, [isLiveAdminDevice, liveAnnouncement.lastReaction?.id, liveAnnouncement.lastReaction?.x, liveAnnouncement.lastReaction?.y]);

  const goToSlide = (index: number) => {
    const deck = slideDeckRef.current;
    const slide = deck?.children[index] as HTMLElement | undefined;
    if (!slide) return;

    slide.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    setActiveSlide(index);
  };

  const handleScroll = () => {
    const deck = slideDeckRef.current;
    if (!deck) return;

    const nextIndex = Math.round(deck.scrollLeft / deck.clientWidth);
    setActiveSlide(Math.max(0, Math.min(slides.length - 1, nextIndex)));
  };

  const toggleFullscreen = async () => {
    try {
      if (isFullscreen && document.fullscreenElement) {
        await document.exitFullscreen();
        setIsMaximized(false);
        return;
      }

      if (document.fullscreenEnabled && pageRef.current?.requestFullscreen) {
        await pageRef.current.requestFullscreen();
        setIsMaximized(true);
        return;
      }

      setIsMaximized((current) => !current);
    } catch (error) {
      console.error('Aturcara fullscreen failed', error);
      setIsMaximized((current) => !current);
    }
  };

  const handleLiveAnnouncement = async () => {
    if (liveAnnouncement.active && isLiveAdminDevice) {
      await onStopLiveAnnouncement();
      return;
    }

    const enteredCode = window.prompt('Masukkan kod admin untuk mulakan pengumuman:');
    if (enteredCode === null) return;

    if (enteredCode.trim().toUpperCase() !== 'LIVE') {
      window.alert('Kod tidak tepat.');
      return;
    }

    await onStartLiveAnnouncement();
  };

  return (
    <div
      ref={pageRef}
      className={`aturcara-page relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-slate-950 text-white md:min-h-[calc(100vh-5rem)] ${isMaximized ? 'aturcara-page-maximized' : ''}`}
    >
      <div className="aturcara-particles" aria-hidden="true">
        {Array.from({ length: 26 }).map((_, index) => (
          <span key={index} className="aturcara-particle" style={{ ['--i' as string]: index }} />
        ))}
      </div>
      {adminLoveBursts.length > 0 && (
        <div className="aturcara-admin-love-stream" aria-hidden="true">
          {adminLoveBursts.map((burst) => (
            <span
              key={burst.id}
              style={{
                left: `${burst.x * 100}%`,
                top: `${burst.y * 100}%`,
              }}
            >
              <Heart className="h-8 w-8 fill-rose-500 text-rose-500" />
            </span>
          ))}
        </div>
      )}

      <div className="relative z-10 min-h-[calc(100vh-4rem)] px-4 py-5 sm:px-8 md:min-h-[calc(100vh-5rem)] md:px-10 md:py-7">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="aturcara-page-title">Aturcara</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => goToSlide(0)}
              aria-label="Kembali ke slaid utama"
              title="Kembali ke slaid utama"
              className="aturcara-home-button"
            >
              <Home className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isMaximized ? 'Keluar maximize' : 'Maximize slaid'}
              title={isMaximized ? 'Keluar maximize' : 'Maximize slaid'}
              className="aturcara-icon-button"
            >
              {isMaximized ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </button>
            <button
              type="button"
              onClick={handleLiveAnnouncement}
              aria-label={liveAnnouncement.active && isLiveAdminDevice ? 'Tamatkan pengumuman' : 'Mulakan pengumuman live'}
              title={liveAnnouncement.active && isLiveAdminDevice ? 'Tamatkan pengumuman' : 'Mulakan pengumuman live'}
              className={`aturcara-live-button ${liveAnnouncement.active ? 'is-live' : ''}`}
            >
              {liveAnnouncement.active && isLiveAdminDevice ? <XCircle className="h-5 w-5" /> : <Megaphone className="h-5 w-5" />}
              <span>{liveAnnouncement.active && isLiveAdminDevice ? 'Stop Live' : 'Live'}</span>
              {liveAnnouncement.active && (
                <span className="aturcara-live-love">
                  <Heart className="h-3.5 w-3.5 fill-current" />
                  {liveAnnouncement.loveCount.toLocaleString('ms-MY')}
                </span>
              )}
            </button>
            <div className="aturcara-tabs">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={activeSlide === index ? 'is-active' : ''}
                >
                  {slide.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {liveAnnouncementError && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            {liveAnnouncementError}
          </div>
        )}

        <div
          ref={slideDeckRef}
          onScroll={handleScroll}
          className="aturcara-slide-deck"
        >
          <section className="aturcara-slide aturcara-title-slide">
            <div className="aturcara-hero-copy">
              <p className="aturcara-kicker">Bengkel Pemurnian Draf</p>
              <h2 className="aturcara-main-heading">ATURCARA BENGKEL PEMURNIAN DRAF LAPORAN JAIS TAHUN 2025</h2>
              <div className="aturcara-qr-card">
                <img src={borangDataQr} alt="Kod QR Borang Data JAIS" />
                <div>
                  <span>Kod QR Borang Data</span>
                  <strong>Scan Untuk Akses Borang</strong>
                </div>
              </div>
              <p className="aturcara-subtitle">Sesi penyelarasan akhir untuk paparan, semakan dan pengesahan data laporan tahunan.</p>
            </div>

            <div className="aturcara-bento aturcara-bento-hero">
              <div className="aturcara-panel aturcara-panel-large">
                <CalendarDays className="h-10 w-10" />
                <span>Tarikh</span>
                <strong>29 April 2026</strong>
                <p>Rabu</p>
              </div>
              <div className="aturcara-panel">
                <Clock className="h-9 w-9" />
                <span>Masa</span>
                <strong>08.30 Pagi - 04.00 Petang</strong>
              </div>
              <div className="aturcara-panel">
                <MapPin className="h-9 w-9" />
                <span>Tempat</span>
                <strong>Dewan Ijtima' Aras 11</strong>
                <p>Bangunan Majma' Tuanku Abdul Halim Mu'adzam Shah</p>
              </div>
            </div>
          </section>

          <section className="aturcara-slide">
            <div className="aturcara-slide-header">
              <Target className="h-10 w-10" />
              <div>
                <p className="aturcara-kicker">Objektif Bengkel</p>
                <h2>Objektif & Fokus Gerak Kerja</h2>
              </div>
            </div>

            <div className="aturcara-bento aturcara-bento-focus">
              <div className="aturcara-panel aturcara-panel-large">
                <span>Kerangka Laporan</span>
                <strong>Malaysian Business Excellence Framework (MBEF)</strong>
                <p>
                  Penyediaan Laporan Tahunan JAIS 2025 adalah berdasarkan format MBEF mengikut mesyuarat pengurusan.
                </p>
              </div>
              <div className="aturcara-panel">
                <Sparkles className="h-8 w-8" />
                <strong>Memurnikan Draf</strong>
                <p>Memurnikan draf dan menyelaraskan format akhir Laporan JAIS 2025.</p>
              </div>
              <div className="aturcara-panel">
                <Presentation className="h-8 w-8" />
                <strong>Ketepatan Data</strong>
                <p>Memastikan data dan maklumat setiap bahagian adalah tepat dan terkini.</p>
              </div>
              <div className="aturcara-panel aturcara-panel-wide">
                <Clock className="h-8 w-8" />
                <strong>Semakan Fast-Track</strong>
                <p>Memudahkan semakan pantas bersama urus setia bagi unit yang telah melengkapkan data.</p>
              </div>
            </div>
          </section>

          <section className="aturcara-slide">
            <div className="aturcara-slide-header">
              <Clock className="h-10 w-10" />
              <div>
                <p className="aturcara-kicker">08.30 Pagi - 11.00 Pagi</p>
                <h2>Aturcara Sesi Pagi</h2>
              </div>
            </div>

            <div className="aturcara-bento aturcara-bento-schedule">
              <div className="aturcara-panel aturcara-panel-large">
                <span>08.30 Pagi</span>
                <strong>Taklimat Gerak Kerja</strong>
                <p>Penerangan ringkas mengenai apa yang perlu dipinda dan diselaraskan.</p>
              </div>
              <div className="aturcara-panel aturcara-panel-wide">
                <span>09.00 Pagi - 12.30 T/Hari</span>
                <strong>Pemurnian & Pembentangan Data Ekspres</strong>
                <p>Bahagian yang telah siap sedia boleh terus membuat serahan data yang telah ditandatangani dan pembentangan ringkas kepada urus setia.</p>
              </div>
              <div className="aturcara-panel">
                <span>12.30 T/Hari - 2.00 Petang</span>
                <strong>Solat Zohor & Rehat</strong>
              </div>
              <div className="aturcara-highlight">
                <span>Nota Khas</span>
                <strong>UI, Psikologi, HR (BPPS), dan BPH</strong>
                <p>Tumpuan semakan awal bagi data yang telah diterima.</p>
              </div>
            </div>
          </section>

          <section className="aturcara-slide">
            <div className="aturcara-slide-header">
              <Presentation className="h-10 w-10" />
              <div>
                <p className="aturcara-kicker">02.00 Petang - 04.00 Petang</p>
                <h2>Aturcara Sesi Petang</h2>
              </div>
            </div>

            <div className="aturcara-bento aturcara-bento-afternoon">
              <div className="aturcara-panel aturcara-panel-large">
                <span>02.00 Petang</span>
                <strong>Pemurnian & Pembentangan Data Ekspres</strong>
                <p>Semakan silang terakhir dan pengesahan muktamad oleh pegawai data setiap bahagian.</p>
              </div>
              <div className="aturcara-panel aturcara-panel-wide">
                <strong>Kembali Ke Stesen Masing-Masing</strong>
                <p>Mana-mana bahagian yang sudah menghantar data disahkan kepada urus setia boleh kembali ke stesen masing-masing.</p>
              </div>
              <div className="aturcara-panel aturcara-finale">
                <span>04.00 Petang</span>
                <strong>Bersurai</strong>
                <p>Penyerahan data akhir dan bersurai.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AturcaraPage;
