import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="animate-fade-in-up">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl md:rounded-[2rem] border border-gray-200 shadow-sm p-6 md:p-10 mb-8">
        <h1 className="text-2xl md:text-4xl font-extrabold text-zus-900 mb-6 border-b border-gray-100 pb-4">
          DASAR PRIVASI DAN KESELAMATAN DATA
        </h1>
        
        <p className="text-sm md:text-base text-gray-600 font-medium mb-8 uppercase tracking-wider">
          Penyediaan Laporan Tahunan Jabatan Agama Islam Sarawak (JAIS) 2025
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-lg md:text-xl font-bold text-zus-900 mb-3 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-zus-gold/10 text-zus-gold text-sm">1</span>
              Pengenalan dan Objektif
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed pl-8">
              Dasar ini menetapkan garis panduan dan prosedur kawalan keselamatan bagi pengumpulan, pemprosesan, dan penyimpanan data yang digunakan dalam penyediaan Laporan Tahunan Jabatan Agama Islam Sarawak (JAIS) bagi tahun 2025. Objektif utama dasar ini adalah untuk memastikan kerahsiaan maklumat jabatan terpelihara sepenuhnya sebelum penerbitan rasmi.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-zus-900 mb-3 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-zus-gold/10 text-zus-gold text-sm">2</span>
              Pematuhan Kepada Akta Rahsia Rasmi 1972
            </h2>
            <div className="text-gray-600 text-sm md:text-base leading-relaxed pl-8 space-y-3">
              <p>Semua bentuk data mentah, maklumat jabatan, statistik awal, dan draf laporan yang dikumpulkan bagi tujuan penyediaan Laporan Tahunan 2025 adalah diklasifikasikan sebagai dokumen terperingkat.</p>
              <p>Maklumat ini tertakluk sepenuhnya di bawah peruntukan Akta Rahsia Rasmi 1972 (Akta 88).</p>
              <p>Mana-mana pegawai atau pihak yang mengendalikan data ini terikat dengan kerahsiaan dan dilarang sama sekali daripada mendedahkan maklumat tersebut kepada pihak yang tidak diberi kuasa.</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-zus-900 mb-3 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-zus-gold/10 text-zus-gold text-sm">3</span>
              Pemilikan dan Sekatan Perkongsian Data
            </h2>
            <div className="text-gray-600 text-sm md:text-base leading-relaxed pl-8 space-y-3">
              <p>Segala data yang disimpan sepanjang proses penyusunan dan penggubalan laporan adalah hak milik mutlak Jabatan Agama Islam Sarawak (JAIS).</p>
              <p>Data ini sama sekali tidak boleh diserahkan, dikongsi, atau dipindahkan kepada mana-mana pihak ketiga, agensi luar, atau individu lain.</p>
              <p>Sebarang keperluan luar jangka untuk mengakses atau berkongsi data yang belum diterbitkan mesti mendapat kebenaran rasmi secara bertulis daripada Pengarah Jabatan Agama Islam Sarawak terlebih dahulu.</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-zus-900 mb-3 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-zus-gold/10 text-zus-gold text-sm">4</span>
              Status Data Selepas Penerbitan
            </h2>
            <div className="text-gray-600 text-sm md:text-base leading-relaxed pl-8 space-y-3">
              <p>Kerahsiaan data akan kekal berkuat kuasa sehinggalah Laporan Tahunan JAIS 2025 diluluskan dan diterbitkan secara rasmi kepada umum.</p>
              <p>Hanya data dan maklumat yang telah dicetak dan diterbitkan di dalam laporan akhir tersebut sahaja akan diiktiraf sebagai data rasmi jabatan dan boleh dirujuk oleh domain awam.</p>
              <p>Sebarang data mentah, jadual perincian asal, atau maklumat yang digugurkan daripada naskhah akhir laporan akan terus kekal sulit dan tertakluk di bawah Akta Rahsia Rasmi.</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-zus-900 mb-3 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-zus-gold/10 text-zus-gold text-sm">5</span>
              Tanggungjawab Pengendali Data
            </h2>
            <div className="text-gray-600 text-sm md:text-base leading-relaxed pl-8 space-y-3">
              <p>Pegawai yang dipertanggungjawabkan dalam pengumpulan dan penyusunan laporan perlu memastikan penyimpanan data dilakukan di dalam pelayan atau peranti yang mematuhi tahap keselamatan ICT kerajaan.</p>
              <p>Langkah keselamatan yang wajar harus diambil untuk mengelakkan ketirisan maklumat, pencerobohan data, atau kehilangan dokumen sepanjang tempoh penyediaan laporan.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
