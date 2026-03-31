import React from 'react';
import { BKIM_2024_REFERENCE, DAKWAH_2024_REFERENCE, BPNP_2024_REFERENCE, BKSK_2024_REFERENCE, BKSP_2024_REFERENCE, BPDS_2024_REFERENCE, HR_2024_REFERENCE, LEADERSHIP_2024_REFERENCE, FINANCE_2024_REFERENCE, BKKI_2024_REFERENCE, BPPI_2024_REFERENCE, BPH_2024_REFERENCE, BPKS_2024_REFERENCE, UKOKO_2024_REFERENCE, UKOKO_PR_2024_REFERENCE, DHQC_2024_REFERENCE, SARAWAK_DIVISIONS, UPP_2024_REFERENCE, QUALITY_INITIATIVES_2024_REFERENCE, LATIHAN_2024_REFERENCE } from '../constants';

interface PrintableReportProps {
  deptName: string;
  formData: any;
}

const normalizeKajianReportEntry = (entry: any) => {
  if (typeof entry === 'string') {
    return {
      jenis: entry.toLowerCase().includes('kaji selidik') ? 'Kaji Selidik' : 'Kajian',
      tajuk: entry.replace(/^kajian\s*:|^kaji selidik\s*:/i, '').trim(),
      bilangan: 1,
    };
  }

  return {
    jenis: entry?.jenis === 'Kaji Selidik' ? 'Kaji Selidik' : 'Kajian',
    tajuk: entry?.tajuk || '',
    bilangan: entry?.bilangan ?? 1,
  };
};

const normalizePenulisanCompetitionReportEntry = (entry: any) => ({
  kategori: entry?.kategori || 'Diploma dan ke bawah',
  namaPemenang: entry?.namaPemenang || '',
  tempatDimenangi: entry?.tempatDimenangi || 'Johan',
  tajukKajian: entry?.tajukKajian || '',
});

const isCompletedProgress = (value: unknown) => Number(value) >= 100;

const PrintableReport: React.FC<PrintableReportProps> = ({ deptName, formData }) => {
  const [mainDept, unitName] = deptName.split(' : ');
  const targetName = unitName || deptName;
  const isBKIM = deptName.includes('BKIM');
  const isDakwah = deptName.includes('DAKWAH') || deptName.includes('BDKWH');
  const isDakwahUnitAlQuran = targetName.toUpperCase().includes('AL-QURAN');
  const isBPNP = deptName.includes('BPNP');
  const isBpnPenyelidikan = targetName.toUpperCase().includes('UNIT PENYELIDIKAN');
  const isBpnStrategik = targetName.toUpperCase().includes('UNIT PERANCANGAN STRATEGIK');
  const isBpnAkidah = targetName.toUpperCase().includes('UNIT AKIDAH TAPISAN');
  const isBKSP = deptName.includes('BKSP') || deptName.includes('Kaunseling');
  const isBPDS = deptName.includes('BPDS') || deptName.includes('Pendakwaan');
  const isHR = deptName.includes('HR & Latihan');
  const isBKKI = deptName.includes('BKKI');
  const isBPH = deptName.includes('BPH') || deptName.includes('Halal');
  const isBPKS = deptName.includes('BPKS') || deptName.includes('Penguatkuasaan');
  const isBPPI = deptName.includes('BPPI');
  const isUKOKO = deptName.includes('UKOKO');
  const isUkokoPR = targetName.toUpperCase().includes('UNIT KOMUNIKASI DAN PUSAT SUMBER') || targetName.toUpperCase().includes('(UKPS)');
  const isUkokoPerayaan = targetName.toUpperCase().includes('UNIT PENGURUSAN ACARA');
  const isDHQC = deptName.includes('DHQC');
  const isUPP = deptName.includes('UPP');
  const isBKSK = deptName.includes('BKSK') || deptName.includes('SAUDARA KITA');
  const isPentadbiran = targetName.includes('Pentadbiran');
  const isFinance = targetName.includes('Kewangan') || targetName.includes('Akaun');
  const bphPermohonanTotal = Object.values(formData.bph?.sphm?.permohonanSkim || {}).reduce((a: number, b: any) => a + (parseInt(b) || 0), 0) || (parseInt(formData.bph?.sphm?.permohonan) || 0);
  const bkspPuncaKrisisData = (formData.bksp?.puncaKrisis || [])
    .filter((p: any) => (p.value || 0) > 0)
    .sort((a: any, b: any) => (b.value || 0) - (a.value || 0));
  const bkspPuncaKrisisMax = bkspPuncaKrisisData.reduce((max: number, item: any) => Math.max(max, item.value || 0), 0);
  const ukokoPrData = formData.pr || {};
  const ukokoPrKategoriEntries = Object.entries(ukokoPrData.aduan?.kategori || {});
  const ukokoPrCustomKategori = ukokoPrData.aduan?.customKategori || [];
  const ukokoPrLokasiEntries = Object.entries(ukokoPrData.aduan?.lokasi || {});
  const ukokoPrCustomLokasi = ukokoPrData.aduan?.customLokasi || [];
  const ukokoPrTotalSumber =
    (ukokoPrData.aduan?.sumber?.talikhidmat || 0) +
    (ukokoPrData.aduan?.sumber?.lain || 0);
  const ukokoPrTotalKategori =
    ukokoPrKategoriEntries.reduce((sum: number, [, value]: any) => sum + (value || 0), 0) +
    ukokoPrCustomKategori.reduce((sum: number, item: any) => sum + (item.value || 0), 0);
  const ukokoPrTotalLokasi =
    ukokoPrLokasiEntries.reduce((sum: number, [, value]: any) => sum + (value || 0), 0) +
    ukokoPrCustomLokasi.reduce((sum: number, item: any) => sum + (item.value || 0), 0);
  const ukokoPrTotalMaklumBalas =
    (ukokoPrData.maklumBalas?.queueBee?.puas || 0) +
    (ukokoPrData.maklumBalas?.queueBee?.tidakPuas || 0) +
    (ukokoPrData.maklumBalas?.qrCode?.puas || 0) +
    (ukokoPrData.maklumBalas?.qrCode?.tidakPuas || 0);
  const ukokoPrBookPurchase = formData.pr?.pembelianBukuBaharu || {};
  const ukokoPrBookCategories = Array.isArray(ukokoPrBookPurchase.kategoriBukuBaharu)
    ? ukokoPrBookPurchase.kategoriBukuBaharu
    : [];
  const ukokoPrKategoriLabels: Record<string, string> = {
    kadNikah: 'Kad Nikah',
    kafa: 'KAFA',
    logoHalal: 'Logo Halal',
    masjid: 'Masjid',
    ncr: 'NCR',
    tindakanPenguatkuasaanSyariah: 'Tindakan Penguatkuasaan Syariah',
    tindakanPengukuhanPendidikanIslam: 'Tindakan Pengukuhan Pendidikan Islam',
    usk: 'USIK',
  };
  const ukokoPrLokasiLabels: Record<string, string> = {
    hqBkki: 'HQ BKKI',
    paibBintulu: 'PAIB Bintulu',
    paibKuching: 'PAIB Kuching',
    paibMiri: 'PAIB Miri',
    paibSarikei: 'PAIB Sarikei',
    paibSibu: 'PAIB Sibu',
  };
  const shouldRenderCommonNarrative = !(isUkokoPR || isUkokoPerayaan);
  const bpnpKajian2025 = (formData.bpnp?.kajianList || []).map(normalizeKajianReportEntry);
  const bpnpPenulisan2025 = (formData.bpnp?.penulisanList || []).map(normalizePenulisanCompetitionReportEntry);
  const bpnpKajian2024 = BPNP_2024_REFERENCE.kajian.map((kajian) => normalizeKajianReportEntry(kajian));
  const bpnpUnitActivityTotal2025 = Number(formData.bpnp?.unitActivityTotal2025) || 0;
  const bpnpPenulisan2024 = [
    {
      kategori: 'Diploma dan ke bawah',
      namaPemenang: BPNP_2024_REFERENCE.penulisan.johan.nama,
      tempatDimenangi: 'Johan',
      tajukKajian: BPNP_2024_REFERENCE.penulisan.johan.tajuk,
    },
    {
      kategori: 'Ijazah dan ke atas',
      namaPemenang: BPNP_2024_REFERENCE.penulisan.naibJohan.nama,
      tempatDimenangi: 'Naib Johan',
      tajukKajian: BPNP_2024_REFERENCE.penulisan.naibJohan.tajuk,
    },
    {
      kategori: 'Ijazah dan ke atas',
      namaPemenang: BPNP_2024_REFERENCE.penulisan.ketiga.nama,
      tempatDimenangi: 'Ketiga',
      tajukKajian: BPNP_2024_REFERENCE.penulisan.ketiga.tajuk,
    },
  ];

  return (
    <div id="print-container" className="bg-white text-slate-900 p-12 font-sans">
      {/* Simple Header */}
      <div className="border-b-4 border-zus-900 pb-6 mb-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-zus-900 uppercase leading-tight break-words">
            {mainDept}
          </h1>
          {unitName && (
            <h2 className="text-xl font-bold text-gray-600 uppercase tracking-wide break-words">
              {unitName}
            </h2>
          )}
          <div className="flex justify-between items-end mt-4">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Laporan Tahunan 2025 • Jabatan Agama Islam Sarawak
            </p>
            <p className="text-[10px] font-bold text-gray-400 uppercase">
              Tarikh Cetakan: {new Date().toLocaleDateString('ms-MY')}
            </p>
          </div>
        </div>
      </div>

      {/* BKKI Specific Layout */}
      {isBKKI && formData.stats && (
        <div className="space-y-8 mb-8">
          <div className="grid grid-cols-3 gap-6">
            {[
              { label: 'Perkahwinan', value: formData.stats.bilPerkahwinan, ref: BKKI_2024_REFERENCE.stats.bilPerkahwinan, color: 'emerald' },
              { label: 'Perceraian', value: formData.stats.bilPerceraian, ref: BKKI_2024_REFERENCE.stats.bilPerceraian, color: 'rose' },
              { label: 'Ruju\'', value: formData.stats.bilRuju, ref: BKKI_2024_REFERENCE.stats.bilRuju, color: 'teal' },
              { label: 'Kad Nikah', value: formData.stats.bilKadNikah, ref: BKKI_2024_REFERENCE.stats.bilKadNikah, color: 'blue' },
              { label: 'Peserta Kursus', value: formData.stats.jumPesertaKursus, ref: BKKI_2024_REFERENCE.stats.jumPesertaKursus, color: 'indigo' },
              { label: 'Program/Aktiviti', value: formData.stats.bilProgram, ref: BKKI_2024_REFERENCE.stats.bilProgram, color: 'amber' },
            ].map(item => (
              <div key={item.label} className={`p-4 bg-${item.color}-50 border border-${item.color}-100 rounded-2xl text-center`}>
                <div className={`text-[10px] font-black text-${item.color}-900 uppercase`}>{item.label}</div>
                <div className={`text-2xl font-black text-${item.color}-700`}>{item.value || 0}</div>
                <div className="text-[8px] font-bold text-gray-400">REF 24: {item.ref}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-teal-600 pl-2">
              Jadual Pendaftar & Jurunikah 2025
            </h3>
            <table className="w-full text-[10px] border-collapse">
              <thead>
                <tr className="bg-teal-50">
                  <th className="border border-teal-100 p-2 text-left">Bahagian</th>
                  <th className="border border-teal-100 p-2 text-center">KPNCR</th>
                  <th className="border border-teal-100 p-2 text-center">PNCR</th>
                  <th className="border border-teal-100 p-2 text-center">TPNCR</th>
                  <th className="border border-teal-100 p-2 text-center">PPNCR</th>
                  <th className="border border-teal-100 p-2 text-center">Jurunikah</th>
                  <th className="border border-teal-100 p-2 text-center bg-teal-100">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {formData.registrarTable.map((row: any, idx: number) => {
                  const total = (parseInt(row.kpncr) || 0) + (parseInt(row.pncr) || 0) + (parseInt(row.tpncr) || 0) + (parseInt(row.ppncr) || 0) + (parseInt(row.jurunikah) || 0);
                  return (
                    <tr key={row.region}>
                      <td className="border border-teal-100 p-2 font-bold">{row.region}</td>
                      <td className="border border-teal-100 p-2 text-center">{row.kpncr || 0}</td>
                      <td className="border border-teal-100 p-2 text-center">{row.pncr || 0}</td>
                      <td className="border border-teal-100 p-2 text-center">{row.tpncr || 0}</td>
                      <td className="border border-teal-100 p-2 text-center">{row.ppncr || 0}</td>
                      <td className="border border-teal-100 p-2 text-center">{row.jurunikah || 0}</td>
                      <td className="border border-teal-100 p-2 text-center font-black bg-teal-50">{total}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* BPH Specific Layout */}
      {isBPH && formData.bph && (
        <div className="space-y-8 mb-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-[#5A5A40] pl-2">
                Statistik SPHM 2025
              </h3>
              <table className="w-full text-[10px] border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border p-2 text-left">Kategori</th>
                    <th className="border p-2 text-center">2024</th>
                    <th className="border p-2 text-center bg-olive-50">2025</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 font-bold">Permohonan Sijil</td>
                    <td className="border p-2 text-center">{BPH_2024_REFERENCE.sphm.permohonan}</td>
                    <td className="border p-2 text-center font-black bg-olive-50">{bphPermohonanTotal}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Pemilik Sijil Aktif</td>
                    <td className="border p-2 text-center">{BPH_2024_REFERENCE.sphm.aktif}</td>
                    <td className="border p-2 text-center font-black bg-olive-50">
                      {Number(Object.values(formData.bph.sphm.skim || {}).reduce((a: any, b: any) => a + (parseInt(b) || 0), 0))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-[#5A5A40] pl-2">
                Hasil Pemantauan 2025
              </h3>
              <table className="w-full text-[10px] border-collapse">
                <tbody>
                  <tr>
                    <td className="border p-2 font-bold bg-gray-50">Mematuhi Piawaian</td>
                    <td className="border p-2 text-center">{formData.bph.pemantauan.patuh || 0}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold bg-gray-50">Diberi Amaran</td>
                    <td className="border p-2 text-center">{formData.bph.pemantauan.amaran || 0}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold bg-gray-50">Digantung SPHM</td>
                    <td className="border p-2 text-center">{formData.bph.pemantauan.gantung || 0}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold bg-gray-50">Ditarik Balik SPHM</td>
                    <td className="border p-2 text-center">{formData.bph.pemantauan.tarikBalik || 0}</td>
                  </tr>
                  <tr className="bg-[#5A5A40] text-white">
                    <td className="border border-[#5A5A40] p-2 font-black">JUMLAH PEMANTAUAN</td>
                    <td className="border border-[#5A5A40] p-2 text-center font-black">
                      {Number(Object.values(formData.bph.pemantauan || {}).reduce((a: any, b: any) => a + (parseInt(b) || 0), 0))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-[#5A5A40] pl-2">
                Zon Halal 2025
              </h3>
              <div className="grid grid-cols-1 gap-1">
                {(formData.bph.zonHalal || []).map((zon: string, idx: number) => (
                  <div key={idx} className="p-2 border border-gray-100 rounded bg-gray-50 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-olive-500"></div>
                    <span className="text-[9px] font-bold text-gray-700 uppercase">{zon}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-[#5A5A40] pl-2">
                Program & Aktiviti 2025
              </h3>
              <table className="w-full text-[10px] border-collapse">
                <tbody>
                  <tr>
                    <td className="border p-2 font-bold bg-gray-50">Ziarah Halal</td>
                    <td className="border p-2 text-center">{formData.bph.ziarahHalal || 0}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold bg-gray-50">Taklimat Halal</td>
                    <td className="border p-2 text-center">{formData.bph.aktiviti.taklimat || 0}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold bg-gray-50">Kursus Kesedaran</td>
                    <td className="border p-2 text-center">{formData.bph.aktiviti.kursus || 0}</td>
                  </tr>
                  <tr className="bg-zus-gold text-zus-900">
                    <td className="border border-zus-gold p-2 font-black">JUMLAH BESAR AKTIVITI</td>
                    <td className="border border-zus-gold p-2 text-center font-black">{formData.bph.aktiviti.total || 0}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* BPKS Specific Layout */}
      {isBPKS && formData.bpks && (
        <div className="space-y-8 mb-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-teal-600 pl-2">
                Statistik Operasi 2025
              </h3>
              <table className="w-full text-[10px] border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border p-2 text-left">Kategori</th>
                    <th className="border p-2 text-center">Ref 2024</th>
                    <th className="border p-2 text-center bg-teal-50">2025</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 font-bold">BTAM Diterima</td>
                    <td className="border p-2 text-center">{BPKS_2024_REFERENCE.statistik.btam}</td>
                    <td className="border p-2 text-center font-black bg-teal-50">{formData.bpks.statistik.btam || 0}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Rondaan & Operasi</td>
                    <td className="border p-2 text-center">{BPKS_2024_REFERENCE.statistik.rondaan}</td>
                    <td className="border p-2 text-center font-black bg-teal-50">{formData.bpks.statistik.rondaan || 0}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-teal-600 pl-2">
                Sumber Manusia 2025
              </h3>
              <div className="p-4 bg-teal-600 text-white rounded-xl text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Jumlah Pegawai</p>
                <p className="text-2xl font-black">
                  {Object.values(formData.bpks.pegawai).reduce((acc: number, val: any) => acc + (parseInt(val) || 0), 0)}
                </p>
                <p className="text-[8px] mt-1 opacity-70">Ref 2024: {BPKS_2024_REFERENCE.pegawai.total}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-teal-600 pl-2">
              Borang 5 Didaftar 2025
            </h3>
            <div className="grid grid-cols-2 gap-8">
              <table className="w-full text-[10px] border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border p-2 text-left">Bahagian</th>
                    <th className="border p-2 text-center">Ref 2024</th>
                    <th className="border p-2 text-center bg-teal-50">2025</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(formData.bpks.borang5.bahagian).map(div => (
                    <tr key={div}>
                      <td className="border p-2 font-bold uppercase">{div}</td>
                      <td className="border p-2 text-center">{BPKS_2024_REFERENCE.borang5.bahagian[div as keyof typeof BPKS_2024_REFERENCE.borang5.bahagian] || 0}</td>
                      <td className="border p-2 text-center font-black bg-teal-50">{formData.bpks.borang5.bahagian[div] || 0}</td>
                    </tr>
                  ))}
                  <tr className="bg-teal-900 text-white">
                    <td className="border border-teal-900 p-2 font-black">JUMLAH BESAR</td>
                    <td className="border border-teal-900 p-2 text-center font-black">{BPKS_2024_REFERENCE.borang5.total}</td>
                    <td className="border border-teal-900 p-2 text-center font-black">
                      {Object.values(formData.bpks.borang5.bahagian).reduce((acc: number, val: any) => acc + (parseInt(val) || 0), 0)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-2xl border border-teal-100">
                  <h4 className="text-[10px] font-black text-teal-900 uppercase mb-3">Pecahan Kategori</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-bold text-gray-600">Matrimoni</span>
                      <span className="font-black text-teal-600">{formData.bpks.borang5.kategori.matrimoni || 0}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-teal-600 h-1.5 rounded-full" 
                        style={{ width: `${(parseInt(formData.bpks.borang5.kategori.matrimoni) || 0) / (Object.values(formData.bpks.borang5.bahagian).reduce((acc: number, val: any) => acc + (parseInt(val) || 0), 0) || 1) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] mt-2">
                      <span className="font-bold text-gray-600">Jenayah Syariah</span>
                      <span className="font-black text-teal-600">{formData.bpks.borang5.kategori.jenayahSyariah || 0}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-teal-400 h-1.5 rounded-full" 
                        style={{ width: `${(parseInt(formData.bpks.borang5.kategori.jenayahSyariah) || 0) / (Object.values(formData.bpks.borang5.bahagian).reduce((acc: number, val: any) => acc + (parseInt(val) || 0), 0) || 1) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100">
                  <h4 className="text-[10px] font-black text-teal-900 uppercase mb-3">Kertas Siasatan (I.P)</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-[8px] font-bold text-gray-400 uppercase">Matrimoni</p>
                      <p className="text-lg font-black text-teal-600">{formData.bpks.kertasSiasatan.matrimoni || 0}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[8px] font-bold text-gray-400 uppercase">Jenayah Syariah</p>
                      <p className="text-lg font-black text-teal-600">{formData.bpks.kertasSiasatan.jenayahSyariah || 0}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex justify-between items-center">
            <div>
              <h4 className="text-[10px] font-black text-gray-900 uppercase">Program / Aktiviti 2025</h4>
              <p className="text-[8px] text-gray-500">Jumlah keseluruhan program dan aktiviti kesedaran</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-teal-600">{formData.bpks.aktiviti.total || 0}</p>
              <p className="text-[8px] font-bold text-gray-400">REF 2024: {BPKS_2024_REFERENCE.aktiviti.total}</p>
            </div>
          </div>
        </div>
      )}

      {/* UKOKO Specific Layout */}
      {isUkokoPerayaan && formData.ukoko && (
        <div className="space-y-8 mb-8">
          <div className="p-6 bg-emerald-900 text-white rounded-3xl flex justify-between items-center">
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight">Laporan Perayaan Islam & Majlis Kesyukuran 2025</h3>
              <p className="text-emerald-300 text-xs font-bold uppercase tracking-widest mt-1">Unit Komunikasi Korporat (UKOKO)</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black">{(formData.ukoko.perayaanIslam?.length || 0) + (formData.ukoko.majlisKesyukuran?.length || 0)}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Jumlah Acara 2025</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-emerald-600 pl-2 flex items-center justify-between">
                <span>Senarai Perayaan Islam 2025</span>
                <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-1 rounded-lg">Ref 2024: {UKOKO_2024_REFERENCE.perayaanIslam.length}</span>
              </h3>
              <table className="w-full text-[10px] border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border p-2 text-left">Nama Majlis</th>
                    <th className="border p-2 text-center">Tarikh</th>
                    <th className="border p-2 text-center">Tuan Rumah</th>
                    <th className="border p-2 text-center">Bil. Mesyuarat</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.ukoko.perayaanIslam.map((event: any, idx: number) => (
                    <tr key={idx}>
                      <td className="border p-2 font-bold">{event.nama}</td>
                      <td className="border p-2 text-center">{event.tarikh}</td>
                      <td className="border p-2 text-center font-bold text-emerald-600">{event.tuanRumah}</td>
                      <td className="border p-2 text-center">{event.mesyuarat}</td>
                    </tr>
                  ))}
                  {formData.ukoko.perayaanIslam.length === 0 && (
                    <tr>
                      <td colSpan={4} className="border p-4 text-center text-gray-400 italic">Tiada data dimasukkan</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-teal-600 pl-2 flex items-center justify-between">
                <span>Senarai Majlis Kesyukuran 2025</span>
                <span className="text-[10px] bg-teal-50 text-teal-600 px-2 py-1 rounded-lg">Ref 2024: {UKOKO_2024_REFERENCE.majlisKesyukuran.length}</span>
              </h3>
              <table className="w-full text-[10px] border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border p-2 text-left">Nama Majlis</th>
                    <th className="border p-2 text-center">Tarikh</th>
                    <th className="border p-2 text-center">Tuan Rumah</th>
                    <th className="border p-2 text-center">Bil. Mesyuarat</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.ukoko.majlisKesyukuran.map((event: any, idx: number) => (
                    <tr key={idx}>
                      <td className="border p-2 font-bold">{event.nama}</td>
                      <td className="border p-2 text-center">{event.tarikh}</td>
                      <td className="border p-2 text-center font-bold text-teal-600">{event.tuanRumah}</td>
                      <td className="border p-2 text-center">{event.mesyuarat}</td>
                    </tr>
                  ))}
                  {formData.ukoko.majlisKesyukuran.length === 0 && (
                    <tr>
                      <td colSpan={4} className="border p-4 text-center text-gray-400 italic">Tiada data dimasukkan</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* DHQC Specific Layout */}
      {isDHQC && formData.dhqc && (
        <div className="space-y-8 mb-8">
          <div className="p-6 bg-[#0a1e3b] text-white rounded-3xl flex justify-between items-center border-b-4 border-[#c5a065]">
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight">Laporan Darul Hana Quran Centre (DHQC) 2025</h3>
              <p className="text-[#c5a065] text-xs font-bold uppercase tracking-widest mt-1">Jabatan Agama Islam Sarawak</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-[#c5a065]">{Object.values(formData.dhqc.guruAlQuran).reduce((acc: number, val: any) => acc + (parseFloat(val) || 0), 0)}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Jumlah Guru al-Quran</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-[#0a1e3b] uppercase border-l-4 border-[#c5a065] pl-2">
                Penyelia GAQMIS
              </h3>
              <div className="p-4 bg-[#0a1e3b] text-white rounded-2xl">
                <p className="text-[8px] font-black text-[#c5a065] uppercase mb-2">Penyelia GAQMIS</p>
                <div className="flex justify-between text-[10px] mb-1">
                  <span>Ibu Pejabat</span>
                  <span className="font-bold">{formData.dhqc.penyelia.ibuPejabat || 0}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span>Bintulu</span>
                  <span className="font-bold">{formData.dhqc.penyelia.bintulu || 0}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-[#0a1e3b] uppercase border-l-4 border-[#c5a065] pl-2">
                Hakim Tilawah
              </h3>
              <div className="p-4 bg-[#fffaf0] border border-[#f5e8bb] rounded-2xl text-[#7b5c0c] space-y-2">
                <div className="flex justify-between text-[10px]">
                  <span>Peringkat Negeri</span>
                  <span className="font-bold">{formData.dhqc.hakim.negeri || 0}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span>Peringkat Bahagian</span>
                  <span className="font-bold">{formData.dhqc.hakim.bahagian || 0}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span>Peringkat Daerah</span>
                  <span className="font-bold">{formData.dhqc.hakim.daerah || 0}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-black text-[#0a1e3b] uppercase border-l-4 border-[#c5a065] pl-2">
              Pecahan Mengikut Bahagian
            </h3>
            <table className="w-full text-[10px] border-collapse">
              <thead>
                <tr className="bg-[#0a1e3b] text-white">
                  <th className="border border-gray-200 p-2 text-left">Bahagian</th>
                  <th className="border border-gray-200 p-2 text-center">Guru al-Quran</th>
                  <th className="border border-gray-200 p-2 text-center">Qari/Qariah</th>
                </tr>
              </thead>
              <tbody>
                {SARAWAK_DIVISIONS.map((div) => {
                  const key = div.charAt(0).toLowerCase() + div.slice(1).replace(/\s+/g, '');
                  return (
                    <tr key={div}>
                      <td className="border border-gray-200 p-2 font-bold">{div}</td>
                      <td className="border border-gray-200 p-2 text-center">{formData.dhqc.guruAlQuran[key] || 0}</td>
                      <td className="border border-gray-200 p-2 text-center">{formData.dhqc.qariQariah[key] || 0}</td>
                    </tr>
                  );
                })}
                <tr className="bg-gray-50 font-black">
                  <td className="border border-gray-200 p-2 uppercase">Jumlah Besar</td>
                  <td className="border border-gray-200 p-2 text-center text-[#0a1e3b]">{Object.values(formData.dhqc.guruAlQuran).reduce((acc: number, val: any) => acc + (parseFloat(val) || 0), 0)}</td>
                  <td className="border border-gray-200 p-2 text-center text-[#0a1e3b]">{Object.values(formData.dhqc.qariQariah).reduce((acc: number, val: any) => acc + (parseFloat(val) || 0), 0)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* UPP Specific Layout */}
      {isUPP && formData.upp && (
        <div className="space-y-8 mb-8">
          <div className="p-6 bg-teal-600 text-white rounded-3xl flex justify-between items-center border-b-4 border-teal-800">
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight">Laporan Unit Pengurusan Projek (UPP) 2025</h3>
              <p className="text-teal-100 text-xs font-bold uppercase tracking-widest mt-1">Jabatan Agama Islam Sarawak</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-white">
                {((parseInt(formData.upp.statistikTahunan.siap) || 0) / (parseInt(formData.upp.statistikTahunan.dijalankan) || 1) * 100).toFixed(1)}%
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">KPI Peratus Siap 2025</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-teal-600 pl-2">
                Statistik Projek & Mesyuarat
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-[8px] font-black text-gray-400 uppercase">Projek Dijalankan</p>
                  <p className="text-xl font-black text-teal-600">{formData.upp.statistikTahunan.dijalankan || 0}</p>
                  <p className="text-[8px] text-gray-400">REF 2024: {UPP_2024_REFERENCE.statistikTahunan.dijalankan}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-[8px] font-black text-gray-400 uppercase">Projek Siap</p>
                  <p className="text-xl font-black text-teal-600">{formData.upp.statistikTahunan.siap || 0}</p>
                  <p className="text-[8px] text-gray-400">REF 2024: {UPP_2024_REFERENCE.statistikTahunan.siap}</p>
                </div>
              </div>
              <div className="p-4 bg-zus-gold text-zus-900 rounded-2xl">
                <p className="text-[8px] font-black uppercase mb-2">Jumlah Mesyuarat: {(parseInt(formData.upp.mesyuarat.pembangunan) || 0) + (parseInt(formData.upp.mesyuarat.teknikal) || 0)}</p>
                <div className="flex justify-between text-[10px] mb-1">
                  <span>J/Kuasa Pembangunan</span>
                  <span className="font-bold">{formData.upp.mesyuarat.pembangunan || 0}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span>J/Kuasa Teknikal</span>
                  <span className="font-bold">{formData.upp.mesyuarat.teknikal || 0}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-teal-600 pl-2">
                Pembangunan Masjid & Surau
              </h3>
              <table className="w-full text-[8px] border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border p-1 text-left">Bahagian</th>
                    <th className="border p-1 text-center">Rancang</th>
                    <th className="border p-1 text-center">Laksana</th>
                    <th className="border p-1 text-center">Siap</th>
                  </tr>
                </thead>
                <tbody>
                  {SARAWAK_DIVISIONS.map((div) => (
                    <tr key={div}>
                      <td className="border p-1 font-bold">{div}</td>
                      <td className="border p-1 text-center">{formData.upp.projekMasjid[div]?.perancangan || 0}</td>
                      <td className="border p-1 text-center">{formData.upp.projekMasjid[div]?.pelaksanaan || 0}</td>
                      <td className="border p-1 text-center">{formData.upp.projekMasjid[div]?.siap || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
              Pembangunan Sekolah (SABK & SMKA)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(formData.upp.projekSekolah).map(([school, data]: [string, any]) => (
                <div key={school} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg border border-gray-100">
                  <span className="text-[8px] font-bold text-gray-700 truncate mr-2">{school}</span>
                  <div className="flex gap-2 items-center">
                    <span className="text-[8px] text-gray-400">{data.siap || 0}/{data.total || 0}</span>
                    <span className={`text-[8px] font-black px-1 rounded ${parseInt(data.siap) === parseInt(data.total) && parseInt(data.total) > 0 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {data.total > 0 ? ((data.siap / data.total) * 100).toFixed(0) : 0}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BPPI Specific Layout */}
      {isBPPI && formData.bppi && (
        <div className="space-y-8 mb-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
                Institusi Pendidikan Islam 2025
              </h3>
              <table className="w-full text-[10px] border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border p-2 text-left">Kategori</th>
                    <th className="border p-2 text-center">2024</th>
                    <th className="border p-2 text-center bg-blue-50">2025</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 font-bold">Sekolah Agama MIS</td>
                    <td className="border p-2 text-center">{BPPI_2024_REFERENCE.institusi.mis.total}</td>
                    <td className="border p-2 text-center font-black bg-blue-50">
                      {(parseInt(formData.bppi.institusi.mis.rendah) || 0) + (parseInt(formData.bppi.institusi.mis.menengah) || 0)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Institusi Persendirian (IPIP)</td>
                    <td className="border p-2 text-center">{BPPI_2024_REFERENCE.institusi.ipip.total}</td>
                    <td className="border p-2 text-center font-black bg-blue-50">
                      {Number(Object.values(formData.bppi.institusi.ipip || {}).reduce((a: number, b: any) => a + (parseInt(b) || 0), 0))}
                    </td>
                  </tr>
                  <tr className="bg-zus-900 text-white">
                    <td className="border border-zus-900 p-2 font-black">JUMLAH BESAR</td>
                    <td className="border border-zus-900 p-2 text-center font-black">{BPPI_2024_REFERENCE.institusi.grandTotal}</td>
                    <td className="border border-zus-900 p-2 text-center font-black">
                      {(parseInt(formData.bppi.institusi.mis.rendah) || 0) + 
                       (parseInt(formData.bppi.institusi.mis.menengah) || 0) +
                       Number(Object.values(formData.bppi.institusi.ipip || {}).reduce((a: number, b: any) => a + (parseInt(b) || 0), 0))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
                Data KAFA & UPKK 2025
              </h3>
              <table className="w-full text-[10px] border-collapse">
                <tbody>
                  <tr>
                    <td className="border p-2 font-bold bg-gray-50">Bilangan Pelajar KAFA</td>
                    <td className="border p-2 text-center">{formData.bppi.kafa.pelajar || 0}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold bg-gray-50">Bilangan Guru KAFA</td>
                    <td className="border p-2 text-center">{formData.bppi.kafa.guru || 0}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold bg-gray-50">Bilangan Calon UPKK</td>
                    <td className="border p-2 text-center">{Number(formData.bppi.kafa.upkk.calon || 0)}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold bg-gray-50">GPS UPKK</td>
                    <td className="border p-2 text-center font-black text-blue-600">{String(formData.bppi.kafa.upkk.gps || '0.00')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
              Enrolmen Pelajar Sekolah Agama MIS 2025
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {formData.bppi.enrolmenMIS.map((s: any, idx: number) => (
                <div key={idx} className="p-2 border border-gray-100 rounded bg-gray-50 flex justify-between items-center">
                  <span className="text-[8px] font-bold text-gray-500 uppercase truncate pr-2">{s.name}</span>
                  <span className="text-[10px] font-black text-zus-900">{s.value || 0}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
              Kelas Agama Dewasa (KAD) 2025
            </h3>
            <table className="w-full text-[9px] border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-1.5 text-left">Bahagian</th>
                  <th className="border p-1.5 text-center">Bil. Kelas</th>
                  <th className="border p-1.5 text-center">Bil. Pelajar</th>
                </tr>
              </thead>
              <tbody>
                {formData.bppi.kad.pecahan.map((p: any) => (
                  <tr key={p.name}>
                    <td className="border p-1.5 font-bold">{p.name}</td>
                    <td className="border p-1.5 text-center">{p.kelas || 0}</td>
                    <td className="border p-1.5 text-center">{p.pelajar || 0}</td>
                  </tr>
                ))}
                <tr className="bg-zus-900 text-white font-black">
                  <td className="border border-zus-900 p-1.5">JUMLAH KESELURUHAN</td>
                  <td className="border border-zus-900 p-1.5 text-center">
                    {formData.bppi.kad.pecahan.reduce((a:any, b:any) => a + (parseInt(b.kelas) || 0), 0)}
                  </td>
                  <td className="border border-zus-900 p-1.5 text-center">
                    {formData.bppi.kad.pecahan.reduce((a:any, b:any) => a + (parseInt(b.pelajar) || 0), 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* BKIM Specific Layout */}
      {isBKIM && formData.bkim && (
        <div className="space-y-8">
          {/* Fasiliti & Perjawatan Table */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
                Statistik Fasiliti
              </h3>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Kategori</th>
                    <th className="border p-2 text-center">2024</th>
                    <th className="border p-2 text-center bg-blue-50">2025</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 font-bold">Masjid</td>
                    <td className="border p-2 text-center">{BKIM_2024_REFERENCE.fasiliti.masjid}</td>
                    <td className="border p-2 text-center font-black bg-blue-50">{formData.bkim.bilMasjid}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Surau</td>
                    <td className="border p-2 text-center">{BKIM_2024_REFERENCE.fasiliti.surau}</td>
                    <td className="border p-2 text-center font-black bg-blue-50">{formData.bkim.bilSurau}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Musolla</td>
                    <td className="border p-2 text-center">{BKIM_2024_REFERENCE.fasiliti.musolla}</td>
                    <td className="border p-2 text-center font-black bg-blue-50">{formData.bkim.bilMusolla}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
                Pegawai Masjid
              </h3>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Jawatan</th>
                    <th className="border p-2 text-center">2024</th>
                    <th className="border p-2 text-center bg-blue-50">2025</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 font-bold">Imam I</td>
                    <td className="border p-2 text-center">{BKIM_2024_REFERENCE.perjawatan.imam1}</td>
                    <td className="border p-2 text-center font-black bg-blue-50">{formData.bkim.imam1}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Imam II</td>
                    <td className="border p-2 text-center">{BKIM_2024_REFERENCE.perjawatan.imam2}</td>
                    <td className="border p-2 text-center font-black bg-blue-50">{formData.bkim.imam2}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Imam III</td>
                    <td className="border p-2 text-center">{BKIM_2024_REFERENCE.perjawatan.imam3}</td>
                    <td className="border p-2 text-center font-black bg-blue-50">{formData.bkim.imam3}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Bilal</td>
                    <td className="border p-2 text-center">{BKIM_2024_REFERENCE.perjawatan.bilal}</td>
                    <td className="border p-2 text-center font-black bg-blue-50">{formData.bkim.bilal}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Marbot</td>
                    <td className="border p-2 text-center">{BKIM_2024_REFERENCE.perjawatan.marbot}</td>
                    <td className="border p-2 text-center font-black bg-blue-50">{formData.bkim.marbot}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Tanah Perkuburan & Penarafan */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
                Tanah Perkuburan
              </h3>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Status Hakmilik</th>
                    <th className="border p-2 text-center">2024</th>
                    <th className="border p-2 text-center bg-blue-50">2025</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 font-bold">MIS</td>
                    <td className="border p-2 text-center">{BKIM_2024_REFERENCE.kubur.mis}</td>
                    <td className="border p-2 text-center font-black bg-blue-50">{formData.bkim.kuburMis}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Tanah Kerajaan</td>
                    <td className="border p-2 text-center">{BKIM_2024_REFERENCE.kubur.kerajaan}</td>
                    <td className="border p-2 text-center font-black bg-blue-50">{formData.bkim.kuburKerajaan}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">LAK</td>
                    <td className="border p-2 text-center">{BKIM_2024_REFERENCE.kubur.lak}</td>
                    <td className="border p-2 text-center font-black bg-blue-50">{formData.bkim.kuburLak}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Lain-Lain</td>
                    <td className="border p-2 text-center">{BKIM_2024_REFERENCE.kubur.lain}</td>
                    <td className="border p-2 text-center font-black bg-blue-50">{formData.bkim.kuburLain}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
                Penarafan Bintang
              </h3>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Bintang</th>
                    <th className="border p-2 text-center">2024</th>
                    <th className="border p-2 text-center bg-blue-50">2025</th>
                  </tr>
                </thead>
                <tbody>
                  {[5, 4, 3, 2, 1, 0].map(star => (
                    <tr key={star}>
                      <td className="border p-2 font-bold">{star} Bintang</td>
                      <td className="border p-2 text-center">{(BKIM_2024_REFERENCE.bintang as any)[`star${star}`]}</td>
                      <td className="border p-2 text-center font-black bg-blue-50">{formData.bkim[`star${star}`]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Division Table */}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
              Statistik Mengikut Bahagian (2025)
            </h3>
            <table className="w-full text-[10px] border-collapse">
              <thead>
                <tr className="bg-zus-900 text-white">
                  <th className="border border-zus-900 p-2 text-left">Bahagian</th>
                  <th className="border border-zus-900 p-2 text-center" colSpan={2}>Program/Aktiviti</th>
                  <th className="border border-zus-900 p-2 text-center" colSpan={2}>Guru Takmir</th>
                  <th className="border border-zus-900 p-2 text-center" colSpan={2}>LAK</th>
                </tr>
                <tr className="bg-gray-100">
                  <th className="border p-1"></th>
                  <th className="border p-1 text-center">2024</th>
                  <th className="border p-1 text-center bg-blue-50">2025</th>
                  <th className="border p-1 text-center">2024</th>
                  <th className="border p-1 text-center bg-blue-50">2025</th>
                  <th className="border p-1 text-center">2024</th>
                  <th className="border p-1 text-center bg-blue-50">2025</th>
                </tr>
              </thead>
              <tbody>
                {formData.bkim.bkimDivisions.map((div: any, idx: number) => (
                  <tr key={div.name}>
                    <td className="border p-1 font-bold">{div.name}</td>
                    <td className="border p-1 text-center">{BKIM_2024_REFERENCE.divisions[idx]?.program || 0}</td>
                    <td className="border p-1 text-center font-black bg-blue-50">{div.program}</td>
                    <td className="border p-1 text-center">{BKIM_2024_REFERENCE.divisions[idx]?.guruTakmir || 0}</td>
                    <td className="border p-1 text-center font-black bg-blue-50">{div.guruTakmir}</td>
                    <td className="border p-1 text-center">{BKIM_2024_REFERENCE.divisions[idx]?.lak || 0}</td>
                    <td className="border p-1 text-center font-black bg-blue-50">{div.lak}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Dakwah Specific Layout */}
      {isDakwah && formData.dakwah && (
        <div className="space-y-8">
          {isDakwahUnitAlQuran ? (
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
                  Pusat Pemuliaan Al-Quran
                </h3>
                <div className="space-y-2">
                  {DHQC_2024_REFERENCE.pusatPemuliaan.map((item: any, idx: number) => (
                    <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl">
                      <div className="text-[10px] font-black uppercase text-slate-400">Rujukan 2024</div>
                      <div className="mt-1 font-bold">{item.lokasi}</div>
                      <div className="text-[10px] font-black uppercase text-[#947225]">{item.bahagian}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {(formData.dakwah.alQuran?.pusatPemuliaan || []).map((item: any, idx: number) => (
                    <div key={idx} className="p-3 bg-gray-50 border border-gray-100 rounded-xl flex justify-between items-center">
                      <span className="text-[10px] font-bold text-gray-700">{item.lokasi || '................................'}</span>
                      <span className="text-[8px] font-black text-[#c5a065] uppercase">{item.bahagian || '...'}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
                  Statistik Debu Al-Quran
                </h3>
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Kategori</th>
                      <th className="border p-2 text-center">2024</th>
                      <th className="border p-2 text-center bg-blue-50">2025</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2 font-bold">Berat Debu Al-Quran (Tan)</td>
                      <td className="border p-2 text-center">{DHQC_2024_REFERENCE.statistikDebu.berat}</td>
                      <td className="border p-2 text-center font-black bg-blue-50">{formData.dakwah.alQuran?.statistikDebu?.berat || 0}</td>
                    </tr>
                    <tr>
                      <td className="border p-2 font-bold">Kekerapan Pemuliaan</td>
                      <td className="border p-2 text-center">{DHQC_2024_REFERENCE.statistikDebu.kekerapan}</td>
                      <td className="border p-2 text-center font-black bg-blue-50">{formData.dakwah.alQuran?.statistikDebu?.kekerapan || 0}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
                Statistik Program & Tauliah
              </h3>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Kategori</th>
                    <th className="border p-2 text-center">2024</th>
                    <th className="border p-2 text-center bg-blue-50">2025</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 font-bold">Program JAIS</td>
                    <td className="border p-2 text-center">{DAKWAH_2024_REFERENCE.statistik.jais}</td>
                    <td className="border p-2 text-center font-black bg-blue-50">{formData.dakwah.progJais2025}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Program Agensi/NGO</td>
                    <td className="border p-2 text-center">{DAKWAH_2024_REFERENCE.perbandingan.y2024.agensi}</td>
                    <td className="border p-2 text-center font-black bg-blue-50">{formData.dakwah.progAgensi2025}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Tauliah Aktif</td>
                    <td className="border p-2 text-center">{DAKWAH_2024_REFERENCE.tauliahAktif}</td>
                    <td className="border p-2 text-center font-black bg-blue-50">{formData.dakwah.tauliahAktif2025}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
                Dakwah Melalui Media
              </h3>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Media</th>
                    <th className="border p-2 text-center">2024</th>
                    <th className="border p-2 text-center bg-blue-50">2025</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 font-bold">Radio</td>
                    <td className="border p-2 text-center">{DAKWAH_2024_REFERENCE.media.radio}</td>
                    <td className="border p-2 text-center font-black bg-blue-50">{formData.dakwah.mediaRadio2025}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Internet</td>
                    <td className="border p-2 text-center">{DAKWAH_2024_REFERENCE.media.internet}</td>
                    <td className="border p-2 text-center font-black bg-blue-50">{formData.dakwah.mediaInternet2025}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Facebook</td>
                    <td className="border p-2 text-center">-</td>
                    <td className="border p-2 text-center font-black bg-blue-50">{formData.dakwah.mediaSosial?.facebook ?? 0}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Instagram</td>
                    <td className="border p-2 text-center">-</td>
                    <td className="border p-2 text-center font-black bg-blue-50">{formData.dakwah.mediaSosial?.instagram ?? 0}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Thread</td>
                    <td className="border p-2 text-center">-</td>
                    <td className="border p-2 text-center font-black bg-blue-50">{formData.dakwah.mediaSosial?.thread ?? 0}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Tiktok</td>
                    <td className="border p-2 text-center">-</td>
                    <td className="border p-2 text-center font-black bg-blue-50">{formData.dakwah.mediaSosial?.tiktok ?? 0}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Telegram Channel</td>
                    <td className="border p-2 text-center">-</td>
                    <td className="border p-2 text-center font-black bg-blue-50">{formData.dakwah.mediaSosial?.telegramChannel ?? 0}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Whatsap Channel</td>
                    <td className="border p-2 text-center">-</td>
                    <td className="border p-2 text-center font-black bg-blue-50">{formData.dakwah.mediaSosial?.whatsappChannel ?? 0}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          )}
        </div>
      )}

      {/* BPNP Specific Layout */}
      {isBPNP && formData.bpnp && (
        <div className="space-y-8">
          {isBpnPenyelidikan && (
            <div className="space-y-6">
              <div className="rounded-3xl border border-teal-100 bg-teal-50/70 p-6">
                <h3 className="text-sm font-black text-teal-800 uppercase tracking-widest">Jumlah Aktiviti Unit Penyelidikan 2025</h3>
                <p className="mt-3 text-4xl font-black text-zus-900">{bpnpUnitActivityTotal2025}</p>
              </div>

              <div className="rounded-3xl border border-blue-100 bg-blue-50/70 p-6">
                <h3 className="text-sm font-black text-blue-800 uppercase tracking-widest">Rujukan Data 2024 (Jumlah: {bpnpKajian2024.length})</h3>
                <div className="mt-4 space-y-2">
                  {bpnpKajian2024.map((k, i) => (
                    <div key={i} className="rounded-2xl border border-blue-100 bg-white px-4 py-3 text-xs text-slate-700">
                      <div className="flex gap-3">
                      <span className="font-black text-blue-500">{i + 1}.</span>
                        <div className="space-y-1">
                          <div className="flex flex-wrap gap-2">
                            <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-black uppercase text-blue-700">{k.jenis}</span>
                            <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-black uppercase text-slate-600">Bilangan: {k.bilangan}</span>
                          </div>
                          <span className="font-medium">{k.tajuk || '................................'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
                  Senarai Kajian dan Kaji Selidik Dihasilkan (2025)
                </h3>
                <div className="hidden grid-cols-[120px_1fr_120px] gap-3 rounded-xl bg-slate-100 px-4 py-3 md:grid">
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Jenis Kajian</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Nama Kajian / Kaji Selidik</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Bilangan</span>
                </div>
                <div className="space-y-2">
                  {bpnpKajian2025.map((k: any, i: number) => (
                    <div key={i} className="text-xs p-3 bg-white border border-slate-200 rounded-xl">
                      <div className="hidden grid-cols-[120px_1fr_120px] gap-3 md:grid">
                        <span className="font-bold text-slate-700">{k.jenis}</span>
                        <span>{k.tajuk || '................................'}</span>
                        <span className="font-bold text-slate-700">{k.bilangan}</span>
                      </div>
                      <div className="flex gap-2 md:hidden">
                        <span className="font-bold text-gray-400">{i+1}.</span>
                        <div className="space-y-1">
                          <div className="flex flex-wrap gap-2">
                            <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-black uppercase text-blue-700">{k.jenis}</span>
                            <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-black uppercase text-slate-600">Bilangan: {k.bilangan}</span>
                          </div>
                          <span>{k.tajuk || '................................'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-purple-100 bg-purple-50/70 p-6">
                <h3 className="text-sm font-black text-purple-800 uppercase tracking-widest">Rujukan Data 2024 (Jumlah: {bpnpPenulisan2024.length})</h3>
                <div className="mt-4 space-y-2">
                  {bpnpPenulisan2024.map((item, i) => (
                    <div key={i} className="rounded-2xl border border-purple-100 bg-white px-4 py-3 text-xs text-slate-700">
                      <div className="flex gap-3">
                        <span className="font-black text-purple-500">{i + 1}.</span>
                        <div className="space-y-1">
                          <div className="flex flex-wrap gap-2">
                            <span className="rounded-full bg-purple-100 px-2 py-1 text-[10px] font-black uppercase text-purple-700">{item.kategori}</span>
                            <span className="rounded-full bg-cyan-100 px-2 py-1 text-[10px] font-black uppercase text-cyan-700">{item.tempatDimenangi}</span>
                          </div>
                          <div className="font-bold">{item.namaPemenang || '................................'}</div>
                          <div>{item.tajukKajian || '................................'}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
                  Senarai Pemenang Pertandingan Penulisan Ilmiah (2025)
                </h3>
                <div className="hidden grid-cols-[180px_140px_1fr] gap-3 rounded-xl bg-slate-100 px-4 py-3 md:grid">
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Kategori / Tempat</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Nama Pemenang</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Tajuk Kajian</span>
                </div>
                <div className="space-y-2">
                  {bpnpPenulisan2025.map((item: any, i: number) => (
                    <div key={i} className="text-xs p-3 bg-white border border-slate-200 rounded-xl">
                      <div className="hidden grid-cols-[180px_140px_1fr] gap-3 md:grid">
                        <div className="space-y-1">
                          <div className="font-bold text-slate-700">{item.kategori}</div>
                          <div className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-700">{item.tempatDimenangi}</div>
                        </div>
                        <div className="font-bold">{item.namaPemenang || '................................'}</div>
                        <div>{item.tajukKajian || '................................'}</div>
                      </div>
                      <div className="flex gap-2 md:hidden">
                        <span className="font-bold text-gray-400">{i+1}.</span>
                        <div className="space-y-1">
                          <div className="flex flex-wrap gap-2">
                            <span className="rounded-full bg-purple-100 px-2 py-1 text-[10px] font-black uppercase text-purple-700">{item.kategori}</span>
                            <span className="rounded-full bg-cyan-100 px-2 py-1 text-[10px] font-black uppercase text-cyan-700">{item.tempatDimenangi}</span>
                          </div>
                          <div className="font-bold">{item.namaPemenang || '................................'}</div>
                          <div>{item.tajukKajian || '................................'}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {isBpnStrategik && (
            <>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6">
                    <h3 className="text-sm font-black text-emerald-800 uppercase tracking-widest">Jumlah Aktiviti Unit Perancangan Strategik 2025</h3>
                    <p className="mt-3 text-4xl font-black text-zus-900">{bpnpUnitActivityTotal2025}</p>
                  </div>

                  <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-emerald-600 pl-2">
                    Pelan Strategik Jabatan
                  </h3>
                  <table className="w-full text-xs border-collapse">
                    <tbody>
                      <tr>
                        <td className="border p-2 font-bold">Pencapaian Total 2023</td>
                        <td className="border p-2 text-center font-black bg-emerald-50">{formData.bpnp.strategik?.pelanStrategik?.total2023 ?? 0}</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-bold">Pencapaian Total 2024</td>
                        <td className="border p-2 text-center font-black bg-emerald-50">{formData.bpnp.strategik?.pelanStrategik?.total2024 ?? 0}</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-bold">Pencapaian Total 2025</td>
                        <td className="border p-2 text-center font-black bg-emerald-50">{formData.bpnp.strategik?.pelanStrategik?.total2025 ?? 0}</td>
                      </tr>
                    </tbody>
                  </table>

                  <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-sky-600 pl-2">
                    Rancangan Operasi Tahunan
                  </h3>
                  <table className="w-full text-xs border-collapse">
                    <tbody>
                      <tr>
                        <td className="border p-2 font-bold">Aktiviti Program 2023</td>
                        <td className="border p-2 text-center font-black bg-sky-50">{formData.bpnp.strategik?.rot?.aktivitiProgram2023 ?? 0}</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-bold">Aktiviti Program 2024</td>
                        <td className="border p-2 text-center font-black bg-sky-50">{formData.bpnp.strategik?.rot?.aktivitiProgram2024 ?? 0}</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-bold">Aktiviti Program 2025</td>
                        <td className="border p-2 text-center font-black bg-sky-50">{formData.bpnp.strategik?.rot?.aktivitiProgram2025 ?? 0}</td>
                      </tr>
                    </tbody>
                  </table>

                  <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-violet-600 pl-2">
                    Data
                  </h3>
                  <table className="w-full text-xs border-collapse">
                    <tbody>
                      <tr>
                        <td className="border p-2 font-bold">Bilangan Pegawai Data</td>
                        <td className="border p-2 text-center font-black bg-violet-50">{formData.bpnp.strategik?.data?.bilPegawaiData ?? 0}</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-bold">Bilangan Dashboard Rasmi Baharu Yang Telah Disahkan 2025</td>
                        <td className="border p-2 text-center font-black bg-violet-50">{formData.bpnp.strategik?.data?.bilDashboardRasmiBaharu2025 ?? 0}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="space-y-2">
                    <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-violet-600 pl-2">
                      Nama Dashboard Rasmi Baharu
                    </h3>
                    {(formData.bpnp.strategik?.data?.namaDashboardBaharu || []).filter((item: string) => item).length > 0 ? (
                      (formData.bpnp.strategik?.data?.namaDashboardBaharu || []).map((item: string, index: number) =>
                        item ? (
                          <div key={index} className="text-xs p-2 bg-violet-50 border border-violet-100 rounded flex gap-2">
                            <span className="font-bold text-violet-500">{index + 1}.</span>
                            <span>{item}</span>
                          </div>
                        ) : null
                      )
                    ) : (
                      <div className="text-xs p-2 bg-gray-50 border border-gray-100 rounded text-gray-500">Tiada nama dashboard diisi.</div>
                    )}
                  </div>

                  <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
                    Kajian & Kaji Selidik 2025
                  </h3>
                  <div className="space-y-2">
                    {bpnpKajian2025.map((k: any, i: number) => (
                      <div key={i} className="text-xs p-2 bg-gray-50 border border-gray-100 rounded flex gap-2">
                        <span className="font-bold text-gray-400">{i+1}.</span>
                        <span>{`${k.jenis}: ${k.tajuk || '................................'} (Bilangan: ${k.bilangan})`}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
                    Pemenang Penulisan Ilmiah
                  </h3>
                  <table className="w-full text-[9px] border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Kategori</th>
                        <th className="border p-2 text-left">Kedudukan</th>
                        <th className="border p-2 text-left">Nama & Tajuk</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td rowSpan={4} className="border p-2 font-black text-blue-600 bg-blue-50 text-center">DIPLOMA</td>
                        <td className="border p-2 font-bold uppercase">Johan</td>
                        <td className="border p-2">
                          <div className="font-black">{formData.bpnp.penulisan.diploma.johan.nama || '................................'}</div>
                          <div className="italic text-gray-500">{formData.bpnp.penulisan.diploma.johan.tajuk || '................................'}</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-bold uppercase">Naib Johan</td>
                        <td className="border p-2">
                          <div className="font-black">{formData.bpnp.penulisan.diploma.naibJohan.nama || '................................'}</div>
                          <div className="italic text-gray-500">{formData.bpnp.penulisan.diploma.naibJohan.tajuk || '................................'}</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-bold uppercase">Tempat Ketiga</td>
                        <td className="border p-2">
                          <div className="font-black">{formData.bpnp.penulisan.diploma.ketiga.nama || '................................'}</div>
                          <div className="italic text-gray-500">{formData.bpnp.penulisan.diploma.ketiga.tajuk || '................................'}</div>
                        </td>
                      </tr>
                      <tr className="bg-blue-50">
                        <td className="border p-2 font-bold uppercase">Peserta Lain</td>
                        <td className="border p-2 font-black text-blue-700">{formData.bpnp.penulisan.diploma.pesertaLain} Orang</td>
                      </tr>
                      <tr>
                        <td rowSpan={4} className="border p-2 font-black text-indigo-600 bg-indigo-50 text-center">SARJANA MUDA & KEATAS</td>
                        <td className="border p-2 font-bold uppercase">Johan</td>
                        <td className="border p-2">
                          <div className="font-black">{formData.bpnp.penulisan.sarjanaMuda.johan.nama || '................................'}</div>
                          <div className="italic text-gray-500">{formData.bpnp.penulisan.sarjanaMuda.johan.tajuk || '................................'}</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-bold uppercase">Naib Johan</td>
                        <td className="border p-2">
                          <div className="font-black">{formData.bpnp.penulisan.sarjanaMuda.naibJohan.nama || '................................'}</div>
                          <div className="italic text-gray-500">{formData.bpnp.penulisan.sarjanaMuda.naibJohan.tajuk || '................................'}</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-bold uppercase">Tempat Ketiga</td>
                        <td className="border p-2">
                          <div className="font-black">{formData.bpnp.penulisan.sarjanaMuda.ketiga.nama || '................................'}</div>
                          <div className="italic text-gray-500">{formData.bpnp.penulisan.sarjanaMuda.ketiga.tajuk || '................................'}</div>
                        </td>
                      </tr>
                      <tr className="bg-indigo-50">
                        <td className="border p-2 font-bold uppercase">Peserta Lain</td>
                        <td className="border p-2 font-black text-indigo-700">{formData.bpnp.penulisan.sarjanaMuda.pesertaLain} Orang</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {isBpnAkidah && (
            <div className="space-y-6">
              <div className="rounded-3xl border border-cyan-100 bg-cyan-50/70 p-6">
                <h3 className="text-sm font-black text-cyan-800 uppercase tracking-widest">Jumlah Aktiviti Unit Akidah Tapisan 2025</h3>
                <p className="mt-3 text-4xl font-black text-zus-900">{bpnpUnitActivityTotal2025}</p>
              </div>

              <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
                  Statistik Aktiviti & Operasi (2025)
                </h3>
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Kategori</th>
                      <th className="border p-2 text-center">2024</th>
                      <th className="border p-2 text-center bg-blue-50">2025</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2 font-bold">Penapisan Bahan</td>
                      <td className="border p-2 text-center">{BPNP_2024_REFERENCE.statistik.penapisan}</td>
                      <td className="border p-2 text-center font-black bg-blue-50">{formData.bpnp.statistik.penapisan}</td>
                    </tr>
                    <tr>
                      <td className="border p-2 font-bold">Kluster Data</td>
                      <td className="border p-2 text-center">{BPNP_2024_REFERENCE.statistik.kluster}</td>
                      <td className="border p-2 text-center font-black bg-blue-50">{formData.bpnp.statistik.kluster}</td>
                    </tr>
                    <tr>
                      <td className="border p-2 font-bold">Program / Aktiviti</td>
                      <td className="border p-2 text-center">{BPNP_2024_REFERENCE.statistik.program}</td>
                      <td className="border p-2 text-center font-black bg-blue-50">{formData.bpnp.statistik.program}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
                  Penerbitan Digital (2025)
                </h3>
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Kategori</th>
                      <th className="border p-2 text-center">2024</th>
                      <th className="border p-2 text-center bg-blue-50">2025</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2 font-bold">Infografik Akidah</td>
                      <td className="border p-2 text-center">{BPNP_2024_REFERENCE.statistik.infografik}</td>
                      <td className="border p-2 text-center font-black bg-blue-50">{formData.bpnp.statistik.infografik}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="p-3 bg-indigo-50 border border-indigo-100 rounded text-[10px] space-y-2">
                  <div>
                    <span className="font-black text-indigo-900 uppercase">Rujukan 2024:</span>
                    <p className="text-indigo-700">Ulangkaji Sifat 20, Koleksi Bahan Infografik Islamik (untuk paparan TV Masjid & Surau).</p>
                  </div>
                  <div>
                    <span className="font-black text-indigo-900 uppercase">Kandungan Utama / Tajuk Koleksi 2025:</span>
                    <p className="text-slate-700">{formData.bpnp.penerbitanDigital?.kandunganUtama || '................................'}</p>
                  </div>
                </div>
              </div>
              </div>
            </div>
          )}
        </div>
      )}

      {isBKSK && formData.bksk && (
        <div className="space-y-8 mb-8">
          <div className="rounded-3xl border-b-4 border-teal-900 bg-[#0F766E] p-6 text-white">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight">Laporan Pengislaman dan Saudara Kita 2025</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-teal-100">Bahagian Kemajuan Saudara Kita (BKSK)</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black">{formData.bksk.statistik.pendaftaranPengislaman || 0}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Pendaftaran Pengislaman</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-2xl border border-teal-100 bg-teal-50 p-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-teal-700">Pendaftaran Pengislaman</p>
              <p className="mt-2 text-3xl font-black text-slate-900">{formData.bksk.statistik.pendaftaranPengislaman || 0}</p>
              <p className="mt-1 text-[10px] font-bold text-slate-400">Data 2025</p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-[#F5EFE3] p-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-700">Program / Aktiviti</p>
              <p className="mt-2 text-3xl font-black text-slate-900">{formData.bksk.statistik.programAktiviti || 0}</p>
              <p className="mt-1 text-[10px] font-bold text-slate-400">Data 2025</p>
            </div>
          </div>

          {[
            {
              title: '2. Kelas Bimbingan Saudara Kita',
              rows2025: formData.bksk.kelasBimbingan,
              columns: [
                { label: 'Kelas', key: 'kelas' },
                { label: 'Guru', key: 'guru' },
              ],
            },
            {
              title: '3. Urus Setia & Program Angkat (PROKASK)',
              rows2025: formData.bksk.urusSetiaProkask,
              columns: [
                { label: 'Urus Setia', key: 'urusSetia' },
                { label: 'PROKASK', key: 'prokask' },
              ],
            },
            {
              title: '4. Kampung Saudara Kita & Nuqaba Mualaf',
              rows2025: formData.bksk.kampungNuqaba,
              columns: [
                { label: 'Kg Saudara Kita', key: 'kampungSaudaraKita' },
                { label: 'Nuqaba Mualaf', key: 'nuqabaMualaf' },
              ],
            },
          ].map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="border-l-4 border-teal-600 pl-2 text-sm font-black uppercase text-zus-900">{section.title}</h3>
              <table className="w-full border-collapse text-[10px]">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Bahagian</th>
                    {section.columns.map((column) => (
                      <th key={column.key} className="border p-2 text-center bg-teal-50">{column.label} 2025</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.rows2025.map((row: any, index: number) => (
                    <tr key={row.name}>
                      <td className="border p-2 font-bold">{row.name}</td>
                      {section.columns.map((column) => (
                        <td key={column.key} className="border p-2 text-center font-black bg-teal-50">{row[column.key] || 0}</td>
                      ))}
                    </tr>
                  ))}
                  <tr className="bg-zus-900 text-white">
                    <td className="border border-zus-900 p-2 font-black">JUMLAH</td>
                    {section.columns.map((column) => (
                      <td key={column.key} className="border border-zus-900 p-2 text-center font-black">
                        {section.rows2025.reduce((sum: number, row: any) => sum + (parseInt(row[column.key]) || 0), 0)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}





      {/* BKSP Specific Layout */}
      {isBKSP && formData.bksp && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-pink-600 pl-2">
                Permohonan Runding Cara 2025
              </h3>
              <table className="w-full text-[10px] border-collapse">
                <thead>
                  <tr className="bg-pink-50">
                    <th className="border border-pink-100 p-2 text-left">Bahagian</th>
                    <th className="border border-pink-100 p-2 text-center">2024</th>
                    <th className="border border-pink-100 p-2 text-center bg-pink-100">2025</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.bksp.permohonan.map((item: any, idx: number) => (
                    <tr key={item.name}>
                      <td className="border border-pink-100 p-1.5 font-bold">{item.name}</td>
                      <td className="border border-pink-100 p-1.5 text-center">{BKSP_2024_REFERENCE.permohonan[idx].value}</td>
                      <td className="border border-pink-100 p-1.5 text-center font-black bg-pink-50">{item.value}</td>
                    </tr>
                  ))}
                  <tr className="bg-pink-600 text-white">
                    <td className="border border-pink-600 p-1.5 font-black">JUMLAH KESELURUHAN</td>
                    <td className="border border-pink-600 p-1.5 text-center font-black">3,450</td>
                    <td className="border border-pink-600 p-1.5 text-center font-black">
                      {formData.bksp.permohonan.reduce((acc: number, curr: any) => acc + (curr.value || 0), 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-pink-600 pl-2">
                Pegawai Runding Cara 2025
              </h3>
              <table className="w-full text-[10px] border-collapse">
                <thead>
                  <tr className="bg-pink-50">
                    <th className="border border-pink-100 p-2 text-left">Bahagian</th>
                    <th className="border border-pink-100 p-2 text-center">2024</th>
                    <th className="border border-pink-100 p-2 text-center bg-pink-100">2025</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.bksp.pegawai.map((item: any, idx: number) => (
                    <tr key={item.name}>
                      <td className="border border-pink-100 p-1.5 font-bold">{item.name}</td>
                      <td className="border border-pink-100 p-1.5 text-center">{BKSP_2024_REFERENCE.pegawai[idx].value}</td>
                      <td className="border border-pink-100 p-1.5 text-center font-black bg-pink-50">{item.value}</td>
                    </tr>
                  ))}
                  <tr className="bg-pink-600 text-white">
                    <td className="border border-pink-600 p-1.5 font-black">JUMLAH KESELURUHAN</td>
                    <td className="border border-pink-600 p-1.5 text-center font-black">62</td>
                    <td className="border border-pink-600 p-1.5 text-center font-black">
                      {formData.bksp.pegawai.reduce((acc: number, curr: any) => acc + (curr.value || 0), 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-pink-600 pl-2">
                Statistik Program & Status Kes
              </h3>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Kategori</th>
                    <th className="border p-2 text-center">2024</th>
                    <th className="border p-2 text-center bg-pink-50">2025</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 font-bold">Program Kaunseling Syarie</td>
                    <td className="border p-2 text-center">{BKSP_2024_REFERENCE.statistik.kaunselingSyarie}</td>
                    <td className="border p-2 text-center font-black bg-pink-50">{formData.bksp.statistik.kaunselingSyarie}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Program Psikologi</td>
                    <td className="border p-2 text-center">{BKSP_2024_REFERENCE.statistik.psikologi}</td>
                    <td className="border p-2 text-center font-black bg-pink-50">{formData.bksp.statistik.psikologi}</td>
                  </tr>
                  <tr className="bg-emerald-50">
                    <td className="border p-2 font-bold">Kes Diterima</td>
                    <td className="border p-2 text-center">{BKSP_2024_REFERENCE.statusKes.diterima}</td>
                    <td className="border p-2 text-center font-black">{formData.bksp.statusKes.diterima}</td>
                  </tr>
                  <tr className="bg-emerald-100">
                    <td className="border p-2 font-bold">Kes Diselesaikan</td>
                    <td className="border p-2 text-center">{BKSP_2024_REFERENCE.statusKes.diselesaikan}</td>
                    <td className="border p-2 text-center font-black">{formData.bksp.statusKes.diselesaikan}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-pink-600 pl-2">
                Punca Krisis (Data 2025)
              </h3>
              <table className="w-full text-[10px] border-collapse">
                <thead>
                  <tr className="bg-pink-50">
                    <th className="border border-pink-100 p-2 text-left">Punca Krisis</th>
                    <th className="border border-pink-100 p-2 text-center bg-pink-100">Jumlah Kes 2025</th>
                  </tr>
                </thead>
                <tbody>
                  {bkspPuncaKrisisData.map((item: any) => (
                    <tr key={item.name}>
                      <td className="border border-pink-100 p-2 font-bold text-pink-900">{item.name}</td>
                      <td className="border border-pink-100 p-2 text-center font-black bg-pink-50 text-pink-700">{item.value}</td>
                    </tr>
                  ))}
                  {bkspPuncaKrisisData.length === 0 && (
                    <tr>
                      <td colSpan={2} className="border border-pink-100 p-3 text-center text-xs italic text-gray-400">
                        Tiada data punca krisis dimasukkan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="rounded-2xl border border-pink-100 bg-gradient-to-br from-pink-50 via-white to-rose-50 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-widest text-pink-800">Bar Chart Punca Krisis 2025</h4>
                  <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black text-pink-500 ring-1 ring-pink-100">
                    {bkspPuncaKrisisData.length} kategori aktif
                  </span>
                </div>

                {bkspPuncaKrisisData.length > 0 ? (
                  <div className="space-y-3">
                    {bkspPuncaKrisisData.map((item: any) => (
                      <div key={`print-chart-${item.name}`} className="grid grid-cols-[220px_1fr_48px] items-center gap-3">
                        <div className="text-[10px] font-bold text-pink-900">{item.name}</div>
                        <div className="h-4 overflow-hidden rounded-full bg-pink-100">
                          <div
                            className="h-full rounded-full bg-pink-500"
                            style={{ width: `${bkspPuncaKrisisMax > 0 ? ((item.value || 0) / bkspPuncaKrisisMax) * 100 : 0}%` }}
                          />
                        </div>
                        <div className="text-right text-[10px] font-black text-pink-600">{item.value}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs italic text-gray-400">Carta akan dipaparkan apabila nilai punca krisis melebihi 0.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BPDS Specific Layout */}
      {isBPDS && formData.bpds && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-stone-600 pl-2">
                Kertas Siasatan (IP) & Pendaftaran Kes
              </h3>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-100">
                    <th className="border border-stone-200 p-2 text-left">Kategori</th>
                    <th className="border border-stone-200 p-2 text-center">IP 2024</th>
                    <th className="border border-stone-200 p-2 text-center bg-stone-50">IP 2025</th>
                    <th className="border border-stone-200 p-2 text-center">Daftar 2024</th>
                    <th className="border border-stone-200 p-2 text-center bg-stone-50">Daftar 2025</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-stone-200 p-2 font-bold">Matrimoni</td>
                    <td className="border border-stone-200 p-2 text-center">{BPDS_2024_REFERENCE.kertasSiasatan.matrimoni}</td>
                    <td className="border border-stone-200 p-2 text-center font-black bg-stone-50">{formData.bpds.kertasSiasatan.matrimoni}</td>
                    <td className="border border-stone-200 p-2 text-center">{BPDS_2024_REFERENCE.pendaftaranKes.matrimoni}</td>
                    <td className="border border-stone-200 p-2 text-center font-black bg-stone-50">{formData.bpds.pendaftaranKes.matrimoni}</td>
                  </tr>
                  <tr>
                    <td className="border border-stone-200 p-2 font-bold">Jenayah Syariah</td>
                    <td className="border border-stone-200 p-2 text-center">{BPDS_2024_REFERENCE.kertasSiasatan.jenayahSyariah}</td>
                    <td className="border border-stone-200 p-2 text-center font-black bg-stone-50">{formData.bpds.kertasSiasatan.jenayahSyariah}</td>
                    <td className="border border-stone-200 p-2 text-center">{BPDS_2024_REFERENCE.pendaftaranKes.jenayahSyariah}</td>
                    <td className="border border-stone-200 p-2 text-center font-black bg-stone-50">{formData.bpds.pendaftaranKes.jenayahSyariah}</td>
                  </tr>
                  <tr className="bg-stone-800 text-white">
                    <td className="border border-stone-800 p-2 font-black">JUMLAH</td>
                    <td className="border border-stone-800 p-2 text-center font-black">{BPDS_2024_REFERENCE.kertasSiasatan.total}</td>
                    <td className="border border-stone-800 p-2 text-center font-black">
                      {formData.bpds.kertasSiasatan.matrimoni + formData.bpds.kertasSiasatan.jenayahSyariah}
                    </td>
                    <td className="border border-stone-800 p-2 text-center font-black">{BPDS_2024_REFERENCE.pendaftaranKes.total}</td>
                    <td className="border border-stone-800 p-2 text-center font-black">
                      {formData.bpds.pendaftaranKes.matrimoni + formData.bpds.pendaftaranKes.jenayahSyariah}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-stone-600 pl-2">
                Sumber Manusia (Pendakwa Syarie)
              </h3>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-100">
                    <th className="border border-stone-200 p-2 text-left">Jawatan</th>
                    <th className="border border-stone-200 p-2 text-center">2024</th>
                    <th className="border border-stone-200 p-2 text-center bg-stone-50">2025</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-stone-200 p-2 font-bold">Pegawai Syariah</td>
                    <td className="border border-stone-200 p-2 text-center">{BPDS_2024_REFERENCE.pendakwaSyarie.pegawaiSyariah}</td>
                    <td className="border border-stone-200 p-2 text-center font-black bg-stone-50">{formData.bpds.pendakwaSyarie.pegawaiSyariah}</td>
                  </tr>
                  <tr>
                    <td className="border border-stone-200 p-2 font-bold">Penolong Pegawai Syariah</td>
                    <td className="border border-stone-200 p-2 text-center">{BPDS_2024_REFERENCE.pendakwaSyarie.penolongPegawaiSyariah}</td>
                    <td className="border border-stone-200 p-2 text-center font-black bg-stone-50">{formData.bpds.pendakwaSyarie.penolongPegawaiSyariah}</td>
                  </tr>
                  <tr>
                    <td className="border border-stone-200 p-2 font-bold">Penolong Pegawai HEI</td>
                    <td className="border border-stone-200 p-2 text-center">{BPDS_2024_REFERENCE.pendakwaSyarie.penolongPegawaiHalEhwalIslam}</td>
                    <td className="border border-stone-200 p-2 text-center font-black bg-stone-50">{formData.bpds.pendakwaSyarie.penolongPegawaiHalEhwalIslam}</td>
                  </tr>
                  <tr className="bg-stone-800 text-white">
                    <td className="border border-stone-800 p-2 font-black">JUMLAH</td>
                    <td className="border border-stone-800 p-2 text-center font-black">{BPDS_2024_REFERENCE.pendakwaSyarie.total}</td>
                    <td className="border border-stone-800 p-2 text-center font-black">
                      {formData.bpds.pendakwaSyarie.pegawaiSyariah + formData.bpds.pendakwaSyarie.penolongPegawaiSyariah + formData.bpds.pendakwaSyarie.penolongPegawaiHalEhwalIslam}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-stone-600 pl-2">
                Kes Selesai Mengikut Bahagian
              </h3>
              <table className="w-full text-[10px] border-collapse">
                <thead>
                  <tr className="bg-stone-50">
                    <th className="border border-stone-200 p-1.5 text-left">Bahagian</th>
                    <th className="border border-stone-200 p-1.5 text-center">2024</th>
                    <th className="border border-stone-200 p-1.5 text-center bg-stone-100">2025</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.bpds.kesSelesai.map((item: any, idx: number) => (
                    <tr key={item.name}>
                      <td className="border border-stone-200 p-1 font-bold">{item.name}</td>
                      <td className="border border-stone-200 p-1 text-center">{BPDS_2024_REFERENCE.kesSelesai[idx].value}</td>
                      <td className="border border-stone-200 p-1 text-center font-black bg-stone-50">{item.value}</td>
                    </tr>
                  ))}
                  <tr className="bg-stone-800 text-white">
                    <td className="border border-stone-800 p-1.5 font-black">JUMLAH</td>
                    <td className="border border-stone-800 p-1.5 text-center font-black">240</td>
                    <td className="border border-stone-800 p-1.5 text-center font-black">
                      {formData.bpds.kesSelesai.reduce((acc: number, curr: any) => acc + (curr.value || 0), 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-stone-600 pl-2">
                Penggubalan Kaedah (Kemajuan 2025)
              </h3>
              <div className="space-y-3">
                {formData.bpds.penggubalanKaedah.map((item: any, idx: number) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between text-[9px] font-bold uppercase text-stone-700">
                      <span>{item.name}</span>
                      <span className="flex items-center gap-2">
                        <span>{item.value}%</span>
                        {isCompletedProgress(item.value) && (
                          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[8px] font-black text-emerald-700 normal-case">
                            ✓ Lengkap
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-1.5">
                      <div 
                        className="bg-stone-600 h-1.5 rounded-full" 
                        style={{ width: `${Math.min(item.value, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
                {(formData.bpds.derafUndangUndangList || []).map((item: any, idx: number) => {
                  const draftItem = typeof item === 'string' ? { name: item, value: 0 } : item;
                  return (
                    <div key={`draft-${idx}`} className="space-y-1">
                      <div className="flex justify-between text-[9px] font-bold uppercase text-stone-700">
                        <span>{draftItem.name}</span>
                        <span className="flex items-center gap-2">
                          <span>{draftItem.value || 0}%</span>
                          {isCompletedProgress(draftItem.value) && (
                            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[8px] font-black text-emerald-700 normal-case">
                              ✓ Lengkap
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="w-full bg-stone-100 rounded-full h-1.5">
                        <div 
                          className="bg-stone-400 h-1.5 rounded-full" 
                          style={{ width: `${Math.min(draftItem.value || 0, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-stone-600 pl-2">
              Program / Aktiviti 2025
            </h3>
            <div className="p-4 bg-stone-50 border border-stone-100 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-stone-900 uppercase">Jumlah Program / Aktiviti Keseluruhan</span>
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-[10px] font-bold text-stone-400 uppercase">Tahun 2024</div>
                    <div className="text-lg font-black text-stone-500">{BPDS_2024_REFERENCE.aktiviti}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] font-bold text-stone-400 uppercase">Tahun 2025</div>
                    <div className="text-lg font-black text-stone-800">{formData.bpds.aktiviti}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BKKI Specific Layout */}
      {isBKKI && formData.bkki && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
                Statistik Keluarga Islam (2025)
              </h3>
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-blue-900 uppercase">Bilangan Perkahwinan</span>
                  <span className="text-xl font-black text-blue-700">{formData.bkki.stats?.bilPerkahwinan || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-blue-900 uppercase">Bilangan Perceraian</span>
                  <span className="text-xl font-black text-blue-700">{formData.bkki.stats?.bilPerceraian || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UKOKO Specific Layout */}
      {isUkokoPR && ukokoPrData.aduan && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-sky-600 pl-2">
                Pembelian Buku Baharu
              </h3>
              <div className="rounded-xl border border-sky-100 bg-sky-50 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-sky-900 uppercase">Bilangan</span>
                  <span className="text-xl font-black text-sky-700">{ukokoPrBookPurchase.bilangan || 0}</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-slate-600 pl-2">
                Kategori Buku Baharu
              </h3>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                {ukokoPrBookCategories.length > 0 ? (
                  <ul className="space-y-2">
                    {ukokoPrBookCategories.map((item: any, index: number) => (
                      <li key={item.id || index} className="text-sm font-bold text-slate-700">
                        {index + 1}. {item.name || 'Kategori tanpa nama'}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm font-medium text-slate-500">Tiada kategori buku baharu dimasukkan.</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-indigo-600 pl-2">
                Statistik Aduan (2025)
              </h3>
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-indigo-900 uppercase">Jumlah Aduan</span>
                  <span className="text-xl font-black text-indigo-700">{ukokoPrTotalSumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-indigo-900 uppercase">Status Selesai</span>
                  <span className="text-xl font-black text-indigo-700">{ukokoPrData.aduan.statusSelesai || 0}</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
                Maklum Balas Pelanggan (2025)
              </h3>
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-emerald-900 uppercase">Jumlah Maklum Balas</span>
                  <span className="text-xl font-black text-emerald-700">{ukokoPrTotalMaklumBalas.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-emerald-900 uppercase">Ref 2024</span>
                  <span className="text-xl font-black text-emerald-700">{UKOKO_PR_2024_REFERENCE.maklumBalas.jumlah.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-purple-600 pl-2">
                Lawatan Luar (2025)
              </h3>
              <div className="p-4 bg-purple-50 border border-purple-100 rounded-xl space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-purple-900 uppercase">Jumlah Lawatan</span>
                  <span className="text-xl font-black text-purple-700">{ukokoPrData.lawatanLuar || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-purple-900 uppercase">Ref 2024</span>
                  <span className="text-xl font-black text-purple-700">{UKOKO_PR_2024_REFERENCE.lawatanLuar}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-indigo-600 pl-2">
                Ringkasan Aduan & Sumber
              </h3>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-indigo-50">
                    <th className="border border-indigo-100 p-2 text-left">Komponen</th>
                    <th className="border border-indigo-100 p-2 text-center">2024</th>
                    <th className="border border-indigo-100 p-2 text-center bg-indigo-100">2025</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-indigo-100 p-2 font-bold">Jumlah Aduan</td>
                    <td className="border border-indigo-100 p-2 text-center">{UKOKO_PR_2024_REFERENCE.aduan.jumlah}</td>
                    <td className="border border-indigo-100 p-2 text-center font-black bg-indigo-50">{ukokoPrTotalSumber}</td>
                  </tr>
                  <tr>
                    <td className="border border-indigo-100 p-2 font-bold">SCS Talikhidmat</td>
                    <td className="border border-indigo-100 p-2 text-center">{UKOKO_PR_2024_REFERENCE.aduan.sumber.talikhidmat}</td>
                    <td className="border border-indigo-100 p-2 text-center">{ukokoPrData.aduan.sumber?.talikhidmat || 0}</td>
                  </tr>
                  <tr>
                    <td className="border border-indigo-100 p-2 font-bold">Email / Emel / Surat</td>
                    <td className="border border-indigo-100 p-2 text-center">{UKOKO_PR_2024_REFERENCE.aduan.sumber.lain}</td>
                    <td className="border border-indigo-100 p-2 text-center">{ukokoPrData.aduan.sumber?.lain || 0}</td>
                  </tr>
                  <tr>
                    <td className="border border-indigo-100 p-2 font-bold">Status Selesai</td>
                    <td className="border border-indigo-100 p-2 text-center">{UKOKO_PR_2024_REFERENCE.aduan.statusSelesai}</td>
                    <td className="border border-indigo-100 p-2 text-center">{ukokoPrData.aduan.statusSelesai || 0}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-emerald-600 pl-2">
                Maklum Balas Pelanggan
              </h3>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-emerald-50">
                    <th className="border border-emerald-100 p-2 text-left">Platform</th>
                    <th className="border border-emerald-100 p-2 text-center">Ref 2024</th>
                    <th className="border border-emerald-100 p-2 text-center bg-emerald-100">2025</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-emerald-100 p-2 font-bold">Queue Bee - Puas</td>
                    <td className="border border-emerald-100 p-2 text-center">{UKOKO_PR_2024_REFERENCE.maklumBalas.queueBee.puas.toLocaleString()}</td>
                    <td className="border border-emerald-100 p-2 text-center">{(ukokoPrData.maklumBalas?.queueBee?.puas || 0).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="border border-emerald-100 p-2 font-bold">Queue Bee - Tidak Puas</td>
                    <td className="border border-emerald-100 p-2 text-center">{UKOKO_PR_2024_REFERENCE.maklumBalas.queueBee.tidakPuas.toLocaleString()}</td>
                    <td className="border border-emerald-100 p-2 text-center">{(ukokoPrData.maklumBalas?.queueBee?.tidakPuas || 0).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="border border-emerald-100 p-2 font-bold">Kod QR - Puas</td>
                    <td className="border border-emerald-100 p-2 text-center">{UKOKO_PR_2024_REFERENCE.maklumBalas.qrCode.puas.toLocaleString()}</td>
                    <td className="border border-emerald-100 p-2 text-center">{(ukokoPrData.maklumBalas?.qrCode?.puas || 0).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="border border-emerald-100 p-2 font-bold">Kod QR - Tidak Puas</td>
                    <td className="border border-emerald-100 p-2 text-center">{UKOKO_PR_2024_REFERENCE.maklumBalas.qrCode.tidakPuas.toLocaleString()}</td>
                    <td className="border border-emerald-100 p-2 text-center">{(ukokoPrData.maklumBalas?.qrCode?.tidakPuas || 0).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-slate-600 pl-2">
                Aduan Mengikut Kategori
              </h3>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border border-slate-100 p-2 text-left">Kategori</th>
                    <th className="border border-slate-100 p-2 text-center">2024</th>
                    <th className="border border-slate-100 p-2 text-center bg-slate-100">2025</th>
                  </tr>
                </thead>
                <tbody>
                  {ukokoPrKategoriEntries.map(([key, value]: any) => (
                    <tr key={key}>
                      <td className="border border-slate-100 p-2 font-bold">{ukokoPrKategoriLabels[key] || key}</td>
                      <td className="border border-slate-100 p-2 text-center">{UKOKO_PR_2024_REFERENCE.aduan.kategori[key as keyof typeof UKOKO_PR_2024_REFERENCE.aduan.kategori] || 0}</td>
                      <td className="border border-slate-100 p-2 text-center">{value || 0}</td>
                    </tr>
                  ))}
                  {ukokoPrCustomKategori.map((item: any) => (
                    <tr key={item.id}>
                      <td className="border border-slate-100 p-2 font-bold">{item.name || 'Kategori Tambahan'}</td>
                      <td className="border border-slate-100 p-2 text-center">-</td>
                      <td className="border border-slate-100 p-2 text-center">{item.value || 0}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50">
                    <td className="border border-slate-100 p-2 font-black">JUMLAH</td>
                    <td className="border border-slate-100 p-2 text-center font-black">{UKOKO_PR_2024_REFERENCE.aduan.jumlah}</td>
                    <td className="border border-slate-100 p-2 text-center font-black">{ukokoPrTotalKategori}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-purple-600 pl-2">
                Aduan Mengikut Bahagian / PAIB
              </h3>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-purple-50">
                    <th className="border border-purple-100 p-2 text-left">Bahagian / PAIB</th>
                    <th className="border border-purple-100 p-2 text-center">2024</th>
                    <th className="border border-purple-100 p-2 text-center bg-purple-100">2025</th>
                  </tr>
                </thead>
                <tbody>
                  {ukokoPrLokasiEntries.map(([key, value]: any) => (
                    <tr key={key}>
                      <td className="border border-purple-100 p-2 font-bold">{ukokoPrLokasiLabels[key] || key}</td>
                      <td className="border border-purple-100 p-2 text-center">{UKOKO_PR_2024_REFERENCE.aduan.lokasi[key as keyof typeof UKOKO_PR_2024_REFERENCE.aduan.lokasi] || 0}</td>
                      <td className="border border-purple-100 p-2 text-center">{value || 0}</td>
                    </tr>
                  ))}
                  {ukokoPrCustomLokasi.map((item: any) => (
                    <tr key={item.id}>
                      <td className="border border-purple-100 p-2 font-bold">{item.name || 'Bahagian / PAIB Tambahan'}</td>
                      <td className="border border-purple-100 p-2 text-center">-</td>
                      <td className="border border-purple-100 p-2 text-center">{item.value || 0}</td>
                    </tr>
                  ))}
                  <tr className="bg-purple-50">
                    <td className="border border-purple-100 p-2 font-black">JUMLAH</td>
                    <td className="border border-purple-100 p-2 text-center font-black">{UKOKO_PR_2024_REFERENCE.aduan.jumlah}</td>
                    <td className="border border-purple-100 p-2 text-center font-black">{ukokoPrTotalLokasi}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {isUKOKO && !isUkokoPR && !isUkokoPerayaan && (
        <div className="space-y-8">
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
            <h3 className="text-lg font-black uppercase text-amber-900">Sub Unit UKOKO</h3>
            <p className="mt-2 text-sm font-medium text-amber-800">
              Maklumat diperlukan sedang dikemaskini. PDF ini belum mempunyai kandungan khusus untuk sub-unit ini.
            </p>
          </div>
        </div>
      )}

      {/* Finance Specific Layout */}
      {isFinance && formData.finance && (
        <div className="space-y-8 mb-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-purple-600 pl-2">
                Bajet & Belanjawan 2025
              </h3>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-purple-50">
                    <th className="border border-purple-100 p-2 text-left">Kategori</th>
                    <th className="border border-purple-100 p-2 text-center">2024 (RM)</th>
                    <th className="border border-purple-100 p-2 text-center bg-purple-100">2025 (RM)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-purple-100 p-2 font-bold">Peruntukan Lulus</td>
                    <td className="border border-purple-100 p-2 text-center">{FINANCE_2024_REFERENCE.financeYears[3].lulus.toLocaleString()}</td>
                    <td className="border border-purple-100 p-2 text-center font-black bg-purple-50">{parseInt(formData.finance.financeYears[0].lulus || 0).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="border border-purple-100 p-2 font-bold">Perbelanjaan</td>
                    <td className="border border-purple-100 p-2 text-center">{FINANCE_2024_REFERENCE.financeYears[3].belanja.toLocaleString()}</td>
                    <td className="border border-purple-100 p-2 text-center font-black bg-purple-50">{parseInt(formData.finance.financeYears[0].belanja || 0).toLocaleString()}</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-blue-100 p-2 font-bold">Baki</td>
                    <td className="border border-blue-100 p-2 text-center">{(FINANCE_2024_REFERENCE.financeYears[3].lulus - FINANCE_2024_REFERENCE.financeYears[3].belanja).toLocaleString()}</td>
                    <td className="border border-blue-100 p-2 text-center font-black">{( (parseInt(formData.finance.financeYears[0].lulus) || 0) - (parseInt(formData.finance.financeYears[0].belanja) || 0) ).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-emerald-600 pl-2">
                Prestasi & Hasil
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-center">
                  <div className="text-[10px] font-black text-emerald-900 uppercase">Kutipan Hasil</div>
                  <div className="text-xl font-black text-emerald-700">RM {parseInt(formData.finance.financeYears[0].hasil || 0).toLocaleString()}</div>
                  <div className="text-[8px] font-bold text-emerald-400">REF 24: RM {FINANCE_2024_REFERENCE.financeYears[3].hasil.toLocaleString()}</div>
                </div>
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-center">
                  <div className="text-[10px] font-black text-rose-900 uppercase">Prestasi Belanja</div>
                  <div className="text-xl font-black text-rose-700">{formData.finance.percentageBelanja || 0}%</div>
                  <div className="text-[8px] font-bold text-rose-400">REF 24: {FINANCE_2024_REFERENCE.percentageBelanja}%</div>
                </div>
                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-center col-span-2">
                  <div className="text-[10px] font-black text-indigo-900 uppercase">Pencapaian eCSA</div>
                  <div className="text-xl font-black text-indigo-700">{formData.finance.percentageEcsa || 0}%</div>
                  <div className="text-[8px] font-bold text-indigo-400">REF 24: {FINANCE_2024_REFERENCE.percentageEcsa}%</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
              Naziran Kewangan & Inspektorat Perbendaharaan (2025)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {formData.finance.financeDistricts.map((district: any) => (
                <div key={district.name} className="p-3 bg-gray-50 border border-gray-100 rounded-xl flex flex-col items-center justify-center gap-2">
                  <div className="text-[10px] font-black text-zus-900 uppercase">{district.name}</div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${district.naziran ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                    <span className="text-[8px] font-bold text-gray-500 uppercase">{district.naziran ? 'Naziran ✔' : 'Naziran ✘'}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(star => (
                      <div key={star} className={`w-2 h-2 rounded-full ${star <= district.starRating ? 'bg-zus-gold' : 'bg-gray-200'}`}></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pentadbiran Leadership Layout */}
      {isPentadbiran && formData.leadership && (
        <div className="space-y-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-indigo-600 pl-2">
              Unit Pentadbiran - Kepimpinan (Mesyuarat & Perhimpunan 2025)
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'J.P.T.O', value: formData.leadership.jpto, ref: LEADERSHIP_2024_REFERENCE.jpto, color: 'blue' },
                { label: 'M.P.J', value: formData.leadership.mpj, ref: LEADERSHIP_2024_REFERENCE.mpj, color: 'emerald' },
                { label: 'Pegawai Agama', value: formData.leadership.pegawaiAgama, ref: LEADERSHIP_2024_REFERENCE.pegawaiAgama, color: 'purple' },
                { label: 'Aset Alih', value: formData.leadership.aset, ref: LEADERSHIP_2024_REFERENCE.aset, color: 'slate' },
                { label: 'Keselamatan', value: formData.leadership.keselamatan, ref: LEADERSHIP_2024_REFERENCE.keselamatan, color: 'red' },
                { label: 'Kader (HEI)', value: formData.leadership.kader, ref: LEADERSHIP_2024_REFERENCE.kader, color: 'teal' },
                { label: 'Kewangan', value: formData.leadership.kewanganPerolehan, ref: LEADERSHIP_2024_REFERENCE.kewanganPerolehan, color: 'amber' },
              ].map(item => (
                <div key={item.label} className={`p-3 bg-${item.color}-50 border border-${item.color}-100 rounded-xl text-center`}>
                  <div className={`text-[8px] font-black text-${item.color}-900 uppercase`}>{item.label}</div>
                  <div className={`text-lg font-black text-${item.color}-700`}>{item.value || 0}</div>
                  <div className="text-[7px] font-bold text-gray-400">REF 24: {item.ref}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xs font-black text-zus-900 uppercase border-l-4 border-orange-600 pl-2">
                Perhimpunan Bersama Pengurusan
              </h3>
              <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl space-y-3">
                <div className="flex justify-between items-center border-b border-orange-100 pb-2">
                  <span className="text-[10px] font-black text-orange-900 uppercase">Jumlah Keseluruhan</span>
                  <span className="text-xl font-black text-orange-700">{formData.leadership.perhimpunan.total}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="text-[7px] font-bold text-orange-400 uppercase">Tawjihat</div>
                    <div className="text-xs font-black text-orange-600">{formData.leadership.perhimpunan.tawjihat || 0}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[7px] font-bold text-orange-400 uppercase">Perdana</div>
                    <div className="text-xs font-black text-orange-600">{formData.leadership.perhimpunan.perdana || 0}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[7px] font-bold text-orange-400 uppercase">Bulanan</div>
                    <div className="text-xs font-black text-orange-600">{formData.leadership.perhimpunan.bulanan || 0}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-black text-zus-900 uppercase border-l-4 border-rose-600 pl-2">
                Panel Pengurusan Sumber Manusia
              </h3>
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl space-y-3">
                <div className="flex justify-between items-center border-b border-rose-100 pb-2">
                  <span className="text-[10px] font-black text-rose-900 uppercase">Jumlah Keseluruhan</span>
                  <span className="text-xl font-black text-rose-700">{formData.leadership.panelHR.total}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center">
                    <div className="text-[7px] font-bold text-rose-400 uppercase">Biasa</div>
                    <div className="text-xs font-black text-rose-600">{formData.leadership.panelHR.biasa || 0}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[7px] font-bold text-rose-400 uppercase">Khas</div>
                    <div className="text-xs font-black text-rose-600">{formData.leadership.panelHR.khas || 0}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HR Specific Layout */}
      {isHR && formData.hr && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
                Ringkasan Perjawatan (2025)
              </h3>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 p-2 text-left">Kategori</th>
                    <th className="border border-gray-200 p-2 text-center">2024</th>
                    <th className="border border-gray-200 p-2 text-center bg-blue-50">2025</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 p-2 font-bold">Perjawatan (Bajet)</td>
                    <td className="border border-gray-200 p-2 text-center">{HR_2024_REFERENCE.ringkasan.perjawatanBajet}</td>
                    <td className="border border-gray-200 p-2 text-center font-black bg-blue-50">{formData.hr.ringkasan.perjawatanBajet}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-2 font-bold">Perjawatan Diisi</td>
                    <td className="border border-gray-200 p-2 text-center">{HR_2024_REFERENCE.ringkasan.perjawatanDiisi}</td>
                    <td className="border border-gray-200 p-2 text-center font-black bg-blue-50">{formData.hr.ringkasan.perjawatanDiisi}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-2 font-bold">Jumlah Warga Kerja</td>
                    <td className="border border-gray-200 p-2 text-center">{HR_2024_REFERENCE.ringkasan.jumlahWargaKerja}</td>
                    <td className="border border-gray-200 p-2 text-center font-black bg-blue-50">{formData.hr.ringkasan.jumlahWargaKerja}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
                Demografi Jantina (2025)
              </h3>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 p-2 text-left">Jantina</th>
                    <th className="border border-gray-200 p-2 text-center">2024</th>
                    <th className="border border-gray-200 p-2 text-center bg-blue-50">2025</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 p-2 font-bold">Lelaki</td>
                    <td className="border border-gray-200 p-2 text-center">{HR_2024_REFERENCE.demografi.lelaki}</td>
                    <td className="border border-gray-200 p-2 text-center font-black bg-blue-50">{formData.hr.demografi.lelaki}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-2 font-bold">Wanita</td>
                    <td className="border border-gray-200 p-2 text-center">{HR_2024_REFERENCE.demografi.wanita}</td>
                    <td className="border border-gray-200 p-2 text-center font-black bg-blue-50">{formData.hr.demografi.wanita}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
              Pecahan Skim Perkhidmatan (2025)
            </h3>
            <table className="w-full text-[10px] border-collapse">
              <thead>
                <tr className="bg-zus-900 text-white">
                  <th className="border border-zus-900 p-2 text-left">Skim / Kategori</th>
                  <th className="border border-zus-900 p-2 text-center">2024</th>
                  <th className="border border-zus-900 p-2 text-center bg-zus-800">2025</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'JUSA', field: 'jusa', ref: HR_2024_REFERENCE.skim.jusa },
                  { label: 'Hal Ehwal Islam', field: 'halEhwalIslam', ref: HR_2024_REFERENCE.skim.halEhwalIslam },
                  { label: 'Perundangan & Kehakiman', field: 'perundangan', ref: HR_2024_REFERENCE.skim.perundangan },
                  { label: 'Kewangan', field: 'kewangan', ref: HR_2024_REFERENCE.skim.kewangan },
                  { label: 'Keselamatan', field: 'keselamatan', ref: HR_2024_REFERENCE.skim.keselamatan },
                  { label: 'Pendidikan', field: 'pendidikan', ref: HR_2024_REFERENCE.skim.pendidikan },
                  { label: 'Kejuruteraan', field: 'kejuruteraan', ref: HR_2024_REFERENCE.skim.kejuruteraan },
                  { label: 'Pentadbiran & Sokongan', field: 'pentadbiran', ref: HR_2024_REFERENCE.skim.pentadbiran },
                  { label: 'Pembantu Am & Pemandu', field: 'pembantuAm', ref: HR_2024_REFERENCE.skim.pembantuAm },
                ].map((item) => (
                  <tr key={item.field}>
                    <td className="border border-gray-200 p-1.5 font-bold">{item.label}</td>
                    <td className="border border-gray-200 p-1.5 text-center">{item.ref}</td>
                    <td className="border border-gray-200 p-1.5 text-center font-black bg-blue-50">{formData.hr.skim[item.field as keyof typeof formData.hr.skim]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
                Kakitangan Sangkutan
              </h3>
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-indigo-900 uppercase">Pekhidmat MIS</span>
                  <span className="text-lg font-black text-indigo-700">{formData.hr.sangkutan.mis}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-indigo-900 uppercase">Penyelia KAFA (JAKIM)</span>
                  <span className="text-lg font-black text-indigo-700">{formData.hr.sangkutan.jakim.penyeliaKafa}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
                Persaraan 2025
              </h3>
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-black text-red-400 uppercase">Jumlah Bersara</div>
                  <div className="text-2xl font-black text-red-700">{formData.hr.bersara}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-gray-400 uppercase">Ref 2024</div>
                  <div className="text-lg font-bold text-gray-500">{HR_2024_REFERENCE.bersara}</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-blue-600 pl-2">
                Kakitangan Naik Pangkat (2025)
              </h3>
              {formData.hr.naikPangkat && formData.hr.naikPangkat.length > 0 ? (
                <table className="w-full text-[10px] border-collapse">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="border border-blue-100 p-2 text-left">Nama Kakitangan</th>
                      <th className="border border-blue-100 p-2 text-left">Pangkat Semasa</th>
                      <th className="border border-blue-100 p-2 text-left">Pangkat Baru</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.hr.naikPangkat.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="border border-blue-100 p-2">{item.nama || '-'}</td>
                        <td className="border border-blue-100 p-2">{item.pangkatSemasa || '-'}</td>
                        <td className="border border-blue-100 p-2">{item.pangkatBaru || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-[10px] text-gray-400 italic">Tiada rekod kenaikan pangkat.</div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-purple-600 pl-2">
                Kakitangan HLDP / Menyambung Pengajian (2025)
              </h3>
              {formData.hr.hldp && formData.hr.hldp.length > 0 ? (
                <table className="w-full text-[10px] border-collapse">
                  <thead>
                    <tr className="bg-purple-50">
                      <th className="border border-purple-100 p-2 text-left">Nama</th>
                      <th className="border border-purple-100 p-2 text-left">Jawatan</th>
                      <th className="border border-purple-100 p-2 text-left">Jenis Pengajian</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.hr.hldp.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="border border-purple-100 p-2">{item.nama || '-'}</td>
                        <td className="border border-purple-100 p-2">{item.jawatan || '-'}</td>
                        <td className="border border-purple-100 p-2">{item.jenisPengajian || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-[10px] text-gray-400 italic">Tiada rekod HLDP / pengajian.</div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-teal-600 pl-2">
              Taburan Kakitangan Ibu Pejabat (2025)
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'BPPS', field: 'bpps' },
                { label: 'BPNP', field: 'bpnp' },
                { label: 'Dakwah', field: 'dakwah' },
                { label: 'BKIM', field: 'bkim' },
                { label: 'BPKS', field: 'bpks' },
                { label: 'BKKI', field: 'bkki' },
                { label: 'BPH', field: 'bph' },
                { label: 'BPDS', field: 'bpds' },
                { label: 'BKSK', field: 'bksk' },
                { label: 'BKSP', field: 'bksp' },
                { label: 'Kaunseling', field: 'kaunseling' },
                { label: 'UKOKO', field: 'ukoko' },
                { label: 'UPP', field: 'upp' },
                { label: 'Integriti', field: 'integriti' },
              ].map(item => (
                <div key={item.field} className="p-2 bg-teal-50 border border-teal-100 rounded-lg text-center">
                  <div className="text-[8px] font-black text-teal-900 uppercase">{item.label}</div>
                  <div className="text-sm font-black text-teal-700">{formData.hr.taburan.ibuPejabat[item.field as keyof typeof formData.hr.taburan.ibuPejabat]}</div>
                </div>
              ))}
              <div className="p-2 bg-teal-900 text-white rounded-lg text-center col-span-4">
                <div className="text-[10px] font-black uppercase">Jumlah Besar Ibu Pejabat</div>
                <div className="text-xl font-black">{formData.hr.taburan.ibuPejabat.total}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-teal-600 pl-2">
              Taburan Kakitangan Mengikut Daerah (2025)
            </h3>
            <div className="grid grid-cols-7 gap-2">
              {formData.hr.taburan.daerah.map((daerah: any) => (
                <div key={daerah.name} className="p-2 border border-gray-100 rounded text-center">
                  <div className="text-[8px] font-bold text-gray-400 uppercase">{daerah.name}</div>
                  <div className="text-xs font-black text-teal-900">{daerah.value}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-2 bg-teal-100 border border-teal-200 rounded-lg text-center">
                <div className="text-[10px] font-black text-teal-900 uppercase">Jumlah Daerah</div>
                <div className="text-xl font-black text-teal-700">{formData.hr.taburan.totalDaerah}</div>
              </div>
              <div className="p-2 bg-teal-900 text-white rounded-lg text-center">
                <div className="text-[10px] font-black uppercase">Jumlah Besar Keseluruhan</div>
                <div className="text-xl font-black">{formData.hr.taburan.grandTotal}</div>
              </div>
            </div>
          </div>

          {/* Latihan Sumber Manusia Section */}
          {formData.latihan && (
            <div className="space-y-6 pt-8 border-t-2 border-teal-500 border-dashed mt-8">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-xl font-black text-zus-900 uppercase tracking-tighter">Latihan Sumber Manusia</h3>
                  <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">Unit Latihan BPPS</p>
                </div>
                <div className="bg-teal-900 text-white p-4 rounded-2xl text-right min-w-[200px]">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Jumlah Latihan 2025</p>
                  <p className="text-3xl font-black">{formData.latihan.ringkasan.jumlah || 0}</p>
                  <div className="flex justify-end gap-4 mt-2 border-t border-white/20 pt-2">
                    <div className="text-right">
                      <p className="text-[8px] font-bold uppercase opacity-60">Generik</p>
                      <p className="text-xs font-black">{formData.latihan.ringkasan.generik || 0}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] font-bold uppercase opacity-60">Spesifik</p>
                      <p className="text-xs font-black">{formData.latihan.ringkasan.spesifik || 0}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-teal-600 pl-2">
                  Pencapaian Jam Latihan Kakitangan
                </h3>
                <table className="w-full text-[9px] border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-[#0D9488] text-white">
                      <th className="border border-teal-800 p-2 text-left">REKOD PENCAPAIAN</th>
                      <th className="border border-teal-800 p-2 text-center">P&P</th>
                      <th className="border border-teal-800 p-2 text-center">SK 1</th>
                      <th className="border border-teal-800 p-2 text-center">SK 2</th>
                      <th className="border border-teal-800 p-2 text-center">JUMLAH</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: 'Pegawai Telah Mencapai', key: 'mencapai' },
                      { label: 'Pegawai Tidak Mencapai', key: 'tidakMencapai' },
                      { label: 'Tiada Rekod Log Latihan', key: 'tiadaRekod' },
                    ].map((row) => (
                      <tr key={row.key}>
                        <td className="border border-gray-200 p-2 font-bold">{row.label}</td>
                        {['pp', 'sk1', 'sk2'].map((col) => (
                          <td key={col} className="border border-gray-200 p-2 text-center">
                            <span className="font-black text-zus-900">{formData.latihan.pencapaian[row.key][col] || 0}</span>
                            <span className="text-gray-400 ml-1">({formData.latihan.pencapaian[row.key][`${col}Pct`] || 0}%)</span>
                          </td>
                        ))}
                        <td className="border border-gray-200 p-2 text-center bg-teal-50">
                          <span className="font-black text-teal-700">{formData.latihan.pencapaian[row.key].total || 0}</span>
                          <span className="text-teal-400 ml-1">({formData.latihan.pencapaian[row.key].totalPct || 0}%)</span>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-100 font-black">
                      <td className="border border-gray-200 p-2 uppercase">JUMLAH KESELURUHAN</td>
                      <td className="border border-gray-200 p-2 text-center">{formData.latihan.pencapaian.jumlahKeseluruhan.pp}</td>
                      <td className="border border-gray-200 p-2 text-center">{formData.latihan.pencapaian.jumlahKeseluruhan.sk1}</td>
                      <td className="border border-gray-200 p-2 text-center">{formData.latihan.pencapaian.jumlahKeseluruhan.sk2}</td>
                      <td className="border border-gray-200 p-2 text-center bg-teal-900 text-white">{formData.latihan.pencapaian.jumlahKeseluruhan.total}</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-[8px] text-gray-400 italic">
                  * P&P: Pengurusan dan Profesional | SK: Sokongan (SK 1 & SK 2)
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Narrative Sections (Common) */}
      {shouldRenderCommonNarrative && (
      <div className="mt-8 space-y-6">
        <div className="space-y-2">
          <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
            Ringkasan Pencapaian Utama 2025
          </h3>
          <p className="text-xs text-gray-700 leading-relaxed text-justify">
            {formData.ringkasan || 'Tiada maklumat disediakan.'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
              Isu & Cabaran
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed text-justify">
              {formData.isu || 'Tiada maklumat disediakan.'}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
              Cadangan Penambahbaikan
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed text-justify">
              {formData.cadangan || 'Tiada maklumat disediakan.'}
            </p>
          </div>
        </div>
      </div>
      )}

      {/* Lawatan Section */}
      {shouldRenderCommonNarrative && formData.lawatan && formData.lawatan.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
            Rekod Lawatan / Penandaarasan
          </h3>
          <table className="w-full text-[10px] border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left w-1/6">Jenis</th>
                <th className="border p-2 text-left w-1/3">Tajuk / Agensi</th>
                <th className="border p-2 text-left w-1/4">Tarikh & Tempat</th>
                <th className="border p-2 text-left w-1/4">Objektif</th>
              </tr>
            </thead>
            <tbody>
              {formData.lawatan.map((item: any, idx: number) => (
                <tr key={idx}>
                  <td className="border p-2 font-bold uppercase text-zus-900">{item.jenis}</td>
                  <td className="border p-2">{item.tajukAgensi}</td>
                  <td className="border p-2">{item.tarikh} @ {item.tempat}</td>
                  <td className="border p-2">{item.objektif}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Signature Section */}
      <div className="mt-12 grid grid-cols-2 gap-16">
        {/* Left: Disediakan Oleh */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-zus-900 uppercase tracking-widest">
            Disediakan oleh
          </h3>
          <div className="h-16 border-b border-gray-300"></div>
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-zus-900">Nama: <span className="font-medium">{formData.disediakanOleh || '................................'}</span></div>
            <div className="text-[10px] font-bold text-zus-900">Jawatan: <span className="font-medium">{formData.jawatan || '................................'}</span></div>
            <div className="text-[10px] font-bold text-zus-900">Tarikh: <span className="font-medium">{formData.tarikh || '................................'}</span></div>
          </div>
        </div>

        {/* Right: Disahkan Oleh */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-zus-900 uppercase tracking-widest">
            Disahkan oleh
          </h3>
          <div className="h-16 border-b border-gray-300"></div>
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-zus-900">Nama: <span className="font-medium">................................</span></div>
            <div className="text-[10px] font-bold text-zus-900">Jawatan: <span className="font-medium">................................</span></div>
            <div className="text-[10px] font-bold text-zus-900">Tarikh: <span className="font-medium">................................</span></div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between items-end">
        <div className="text-[10px] text-gray-400 font-bold">
          © 2025 Jabatan Agama Islam Sarawak (JAIS)<br/>
          Laporan ini dijana secara digital.
        </div>
      </div>
    </div>
  );
};

export default PrintableReport;
