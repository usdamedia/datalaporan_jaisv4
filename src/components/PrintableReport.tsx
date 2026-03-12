import React from 'react';
import { BKIM_2024_REFERENCE, DAKWAH_2024_REFERENCE, BPNP_2024_REFERENCE, HR_2024_REFERENCE, BKSP_2024_REFERENCE, BPDS_2024_REFERENCE } from '../constants';

interface PrintableReportProps {
  deptName: string;
  formData: any;
}

const PrintableReport: React.FC<PrintableReportProps> = ({ deptName, formData }) => {
  const isBKIM = deptName.includes('BKIM');
  const isDakwah = deptName.includes('DAKWAH') || deptName.includes('BDKWH');
  const isBPNP = deptName.includes('BPNP');
  const isHR = deptName.includes('HR & Latihan');
  const isBKSP = deptName.includes('BKSP') || deptName.includes('Kaunseling');
  const isBPDS = deptName.includes('BPDS') || deptName.includes('Pendakwaan');

  return (
    <div id="print-container" className="bg-white text-slate-900 p-12 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b-4 border-zus-900 pb-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-zus-900 text-zus-gold p-3 rounded-full font-bold text-2xl">
            JAIS
          </div>
          <div>
            <h1 className="text-2xl font-black text-zus-900 uppercase tracking-tighter">
              Laporan Tahunan 2025
            </h1>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
              Jabatan Agama Islam Sarawak
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-black text-zus-900">{deptName}</div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Tarikh: {formData.tarikh}
          </div>
        </div>
      </div>

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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* BPNP Specific Layout */}
      {isBPNP && formData.bpnp && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
                Kajian & Kaji Selidik 2025
              </h3>
              <div className="space-y-2">
                {formData.bpnp.kajianList.map((k: string, i: number) => (
                  <div key={i} className="text-xs p-2 bg-gray-50 border border-gray-100 rounded flex gap-2">
                    <span className="font-bold text-gray-400">{i+1}.</span>
                    <span>{k || '................................'}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
                Pemenang Penulisan Ilmiah
              </h3>
              <table className="w-full text-[10px] border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Kedudukan</th>
                    <th className="border p-2 text-left">Nama & Tajuk</th>
                  </tr>
                </thead>
                <tbody>
                  {['johan', 'naibJohan', 'ketiga'].map((rank) => (
                    <tr key={rank}>
                      <td className="border p-2 font-bold uppercase">{rank === 'ketiga' ? 'Tempat Ketiga' : rank}</td>
                      <td className="border p-2">
                        <div className="font-black">{formData.bpnp.penulisan[rank].nama || '................................'}</div>
                        <div className="italic text-gray-500">{formData.bpnp.penulisan[rank].tajuk || '................................'}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
                Statistik Operasi
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
                Penerbitan Digital
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
              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded text-[10px]">
                <span className="font-black text-indigo-900 uppercase">Kandungan Utama:</span>
                <p className="text-indigo-700">Ulangkaji Sifat 20, Koleksi Bahan Infografik Islamik (untuk paparan TV Masjid & Surau).</p>
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
                Ringkasan Perjawatan 2025
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
                    <td className="border p-2 font-bold">Perjawatan (Bajet)</td>
                    <td className="border p-2 text-center">{HR_2024_REFERENCE.ringkasan.perjawatanBajet}</td>
                    <td className="border p-2 text-center font-black bg-blue-50">{formData.hr.ringkasan.perjawatanBajet}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Perjawatan Diisi</td>
                    <td className="border p-2 text-center">{HR_2024_REFERENCE.ringkasan.perjawatanDiisi}</td>
                    <td className="border p-2 text-center font-black bg-blue-50">{formData.hr.ringkasan.perjawatanDiisi}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Jumlah Warga Kerja</td>
                    <td className="border p-2 text-center">{HR_2024_REFERENCE.ringkasan.jumlahWargaKerja}</td>
                    <td className="border p-2 text-center font-black bg-blue-50">{formData.hr.ringkasan.jumlahWargaKerja}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
                Pecahan Jantina
              </h3>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Jantina</th>
                    <th className="border p-2 text-center">2024</th>
                    <th className="border p-2 text-center bg-blue-50">2025</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 font-bold">Lelaki</td>
                    <td className="border p-2 text-center">{HR_2024_REFERENCE.demografi.lelaki}</td>
                    <td className="border p-2 text-center font-black bg-blue-50">{formData.hr.demografi.lelaki}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Wanita</td>
                    <td className="border p-2 text-center">{HR_2024_REFERENCE.demografi.wanita}</td>
                    <td className="border p-2 text-center font-black bg-blue-50">{formData.hr.demografi.wanita}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
              Pecahan Skim Perkhidmatan
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
                    <td className="border p-1.5 font-bold">{item.label}</td>
                    <td className="border p-1.5 text-center">{item.ref}</td>
                    <td className="border p-1.5 text-center font-black bg-blue-50">{formData.hr.skim[item.field as keyof typeof formData.hr.skim]}</td>
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
              <table className="w-full text-[10px] border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Agensi / Kategori</th>
                    <th className="border p-2 text-center">2024</th>
                    <th className="border p-2 text-center bg-blue-50">2025</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-indigo-50/50">
                    <td className="border p-1.5 font-black" colSpan={3}>Majlis Islam Sarawak (MIS)</td>
                  </tr>
                  <tr>
                    <td className="border p-1.5 pl-4">Pekhidmat MIS</td>
                    <td className="border p-1.5 text-center">{HR_2024_REFERENCE.sangkutan.mis}</td>
                    <td className="border p-1.5 text-center font-black bg-blue-50">{formData.hr.sangkutan.mis}</td>
                  </tr>
                  <tr className="bg-zus-50/50">
                    <td className="border p-1.5 font-black" colSpan={3}>JAKIM</td>
                  </tr>
                  <tr>
                    <td className="border p-1.5 pl-4">Penyelia KAFA</td>
                    <td className="border p-1.5 text-center">{HR_2024_REFERENCE.sangkutan.jakim.penyeliaKafa}</td>
                    <td className="border p-1.5 text-center font-black bg-blue-50">{formData.hr.sangkutan.jakim.penyeliaKafa}</td>
                  </tr>
                  <tr>
                    <td className="border p-1.5 pl-4">Penggerak Masyarakat</td>
                    <td className="border p-1.5 text-center">{HR_2024_REFERENCE.sangkutan.jakim.penggerak}</td>
                    <td className="border p-1.5 text-center font-black bg-blue-50">{formData.hr.sangkutan.jakim.penggerak}</td>
                  </tr>
                  <tr>
                    <td className="border p-1.5 pl-4">Takmir & Penyelaras</td>
                    <td className="border p-1.5 text-center">{HR_2024_REFERENCE.sangkutan.jakim.takmir}</td>
                    <td className="border p-1.5 text-center font-black bg-blue-50">{formData.hr.sangkutan.jakim.takmir}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-zus-900 uppercase border-l-4 border-zus-gold pl-2">
                Persaraan
              </h3>
              <div className="p-6 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-black text-red-400 uppercase tracking-widest">Jumlah Bersara 2025</div>
                  <div className="text-2xl font-black text-red-700">{formData.hr.bersara}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-gray-400 uppercase">Rujukan 2024</div>
                  <div className="text-lg font-bold text-gray-500">{HR_2024_REFERENCE.bersara}</div>
                </div>
              </div>
            </div>
          </div>
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
              <div className="grid grid-cols-2 gap-2">
                {formData.bksp.puncaKrisis.filter((p: any) => (p.value || 0) > 0).map((item: any) => (
                  <div key={item.name} className="flex justify-between items-center p-2 bg-pink-50 border border-pink-100 rounded-lg">
                    <span className="text-[9px] font-bold text-pink-900 uppercase">{item.name}</span>
                    <span className="text-[10px] font-black text-pink-600">{item.value}</span>
                  </div>
                ))}
                {formData.bksp.puncaKrisis.filter((p: any) => (p.value || 0) > 0).length === 0 && (
                  <p className="text-xs italic text-gray-400 col-span-2">Tiada data punca krisis dimasukkan.</p>
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
                      <span>{item.value}%</span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-1.5">
                      <div 
                        className="bg-stone-600 h-1.5 rounded-full" 
                        style={{ width: `${Math.min(item.value, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
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

      {/* Narrative Sections (Common) */}
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
