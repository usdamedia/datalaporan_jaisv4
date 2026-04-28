import React, { useRef, useState } from 'react';
import { CalendarDays, Clock, Home, MapPin, Presentation, Sparkles, Target } from 'lucide-react';

const slides = [
  { id: 'utama', label: 'Slaid 1' },
  { id: 'fokus', label: 'Slaid 2' },
  { id: 'pagi', label: 'Slaid 3' },
  { id: 'petang', label: 'Slaid 5' },
];

const AturcaraPage: React.FC = () => {
  const slideDeckRef = useRef<HTMLDivElement | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

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

  return (
    <div className="aturcara-page relative -mx-4 -my-8 overflow-hidden bg-slate-950 text-white sm:-mx-8 md:-my-12 lg:-mx-12 xl:-mx-16">
      <div className="aturcara-particles" aria-hidden="true">
        {Array.from({ length: 26 }).map((_, index) => (
          <span key={index} className="aturcara-particle" style={{ ['--i' as string]: index }} />
        ))}
      </div>

      <div className="relative z-10 min-h-[calc(100vh-4rem)] px-4 py-5 sm:px-8 md:min-h-[calc(100vh-5rem)] md:px-10 md:py-7">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="aturcara-page-title">Aturcara</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => goToSlide(0)}
              className="aturcara-main-button"
            >
              <Home className="h-4 w-4" />
              Kembali Ke Slaid Utama
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

        <div
          ref={slideDeckRef}
          onScroll={handleScroll}
          className="aturcara-slide-deck"
        >
          <section className="aturcara-slide aturcara-title-slide">
            <div className="aturcara-hero-copy">
              <p className="aturcara-kicker">Bengkel Pemurnian Draf</p>
              <h2>ATURACARA BENGKEL PEMURNIAN DRAF LAPORAN JAIS TAHUN 2025</h2>
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
                <p>Bangunan TAHMS</p>
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
                <h2>Aturacara Sesi Pagi</h2>
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
                <p>Bahagian yang telah siap sedia boleh terus membuat pembentangan ringkas kepada urus setia.</p>
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
                <h2>Aturacara Sesi Petang</h2>
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
