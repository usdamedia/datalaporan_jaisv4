import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { BKIM_2024_REFERENCE, DAKWAH_2024_REFERENCE, BPNP_2024_REFERENCE, HR_2024_REFERENCE, BKSP_2024_REFERENCE, BPDS_2024_REFERENCE } from '../constants';

// Register fonts if needed, but standard ones are usually fine
// Font.register({ family: 'Helvetica', src: '...' });

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#0a1e3b',
    paddingBottom: 10,
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0a1e3b',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  deptName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0a1e3b',
    textAlign: 'right',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0a1e3b',
    backgroundColor: '#f3f4f6',
    padding: 5,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#c5a065',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: '40%',
    fontWeight: 'bold',
    color: '#4b5563',
  },
  value: {
    width: '60%',
  },
  table: {
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tableHeader: {
    backgroundColor: '#f9fafb',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  tableCellCenter: {
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 8,
    color: '#9ca3af',
  },
  signatureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    paddingHorizontal: 10,
  },
  signatureBox: {
    width: '40%',
    flexDirection: 'column',
  },
  signatureTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 5,
  },
  signatureDetail: {
    fontSize: 8,
    marginBottom: 2,
  },
});

interface ReportPDFProps {
  deptName: string;
  formData: any;
}

const ReportPDF: React.FC<ReportPDFProps> = ({ deptName, formData }) => {
  const isBKIM = deptName.includes('BKIM');
  const isBPP = deptName.includes('BPNP');
  const isUPP = deptName.includes('UPP');
  const isIntegriti = deptName.includes('INTEGRITI');
  const isAkaun = deptName.includes('Akaun');
  const isBKKI = deptName.includes('BKKI') || deptName.includes('Keluarga Islam');
  const isUKOKO = deptName.includes('UKOKO');
  const isDakwah = deptName.includes('DAKWAH') || deptName.includes('BDKWH');
  const isHR = deptName.includes('HR & Latihan');
  const isBKSP = deptName.includes('BKSP') || deptName.includes('Kaunseling');
  const isBPDS = deptName.includes('BPDS') || deptName.includes('Pendakwaan');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Laporan Tahunan 2025</Text>
            <Text style={styles.subtitle}>Jabatan Agama Islam Sarawak (JAIS)</Text>
          </View>
          <View>
            <Text style={styles.deptName}>{deptName}</Text>
            <Text style={[styles.subtitle, { textAlign: 'right' }]}>Tarikh: {formData.tarikh}</Text>
          </View>
        </View>

        {/* Maklumat Asas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Maklumat Asas</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Disediakan Oleh:</Text>
            <Text style={styles.value}>{formData.disediakanOleh || '-'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tarikh Laporan:</Text>
            <Text style={styles.value}>{formData.tarikh || '-'}</Text>
          </View>
        </View>

        {/* BPNP Specific Data */}
        {isBPP && formData.bpnp && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Kajian & Kaji Selidik 2025</Text>
              {formData.bpnp.kajianList.map((k: string, i: number) => (
                <View key={i} style={styles.row}>
                  <Text style={{ width: '10%', fontWeight: 'bold' }}>{i+1}.</Text>
                  <Text style={{ width: '90%' }}>{k || '................................'}</Text>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pemenang Penulisan Ilmiah</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '30%' }]}><Text>Kedudukan</Text></View>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text>Nama & Tajuk</Text></View>
                </View>
                {['johan', 'naibJohan', 'ketiga'].map((rank) => (
                  <View key={rank} style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '30%', fontWeight: 'bold' }]}><Text>{rank === 'ketiga' ? 'Tempat Ketiga' : rank.toUpperCase()}</Text></View>
                    <View style={[styles.tableCell, { width: '70%' }]}>
                      <Text style={{ fontWeight: 'bold' }}>{formData.bpnp.penulisan[rank].nama || '................................'}</Text>
                      <Text style={{ fontStyle: 'italic', color: '#666' }}>{formData.bpnp.penulisan[rank].tajuk || '................................'}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Statistik Operasi & Penerbitan</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Kategori</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>2024</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>2025</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Penapisan Bahan</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BPNP_2024_REFERENCE.statistik.penapisan}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bpnp.statistik.penapisan}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Kluster Data</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BPNP_2024_REFERENCE.statistik.kluster}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bpnp.statistik.kluster}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Program / Aktiviti</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BPNP_2024_REFERENCE.statistik.program}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bpnp.statistik.program}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Infografik Akidah</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BPNP_2024_REFERENCE.statistik.infografik}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bpnp.statistik.infografik}</Text></View>
                </View>
              </View>
            </View>
          </>
        )}

        {/* UPP Specific Data */}
        {isUPP && formData.uppDivisions && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Status Projek Mengikut Bahagian</Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <View style={[styles.tableCell, { width: '40%' }]}><Text>Bahagian</Text></View>
                <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>Rancang</Text></View>
                <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>Laksana</Text></View>
                <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>Siap</Text></View>
              </View>
              {formData.uppDivisions.map((div: any, idx: number) => (
                <View key={idx} style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>{div.name}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{div.fasaPerancangan}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{div.fasaPelaksanaan}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{div.siapSepenuhnya}</Text></View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* INTEGRITI Specific Data */}
        {isIntegriti && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Inisiatif Integriti & Kualiti</Text>
            <View style={styles.row}><Text style={styles.label}>Mesyuarat Tatakelola:</Text><Text style={styles.value}>{formData.bilMesyuaratTatakelola || 0}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Program Integriti:</Text><Text style={styles.value}>{formData.bilProgramIntegriti || 0}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Audit ISO 9001:</Text><Text style={styles.value}>{formData.iso9001Finding || '-'}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Audit ABMS:</Text><Text style={styles.value}>{formData.abmsFinding || '-'}</Text></View>
          </View>
        )}

        {/* BKIM Specific Data */}
        {isBKIM && formData.bkim && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Statistik Fasiliti & Perjawatan</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Kategori</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>2024</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>2025</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Masjid</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKIM_2024_REFERENCE.fasiliti.masjid}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bkim.bilMasjid}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Surau</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKIM_2024_REFERENCE.fasiliti.surau}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bkim.bilSurau}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Musolla</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKIM_2024_REFERENCE.fasiliti.musolla}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bkim.bilMusolla}</Text></View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pecahan Mengikut Bahagian (2025)</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '25%' }]}><Text>Bahagian</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '25%' }]}><Text>Program</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '25%' }]}><Text>Guru Takmir</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '25%' }]}><Text>LAK</Text></View>
                </View>
                {formData.bkim.bkimDivisions.map((div: any, idx: number) => (
                  <View key={idx} style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '25%' }]}><Text>{div.name}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '25%' }]}><Text>{div.program}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '25%' }]}><Text>{div.guruTakmir}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '25%' }]}><Text>{div.lak}</Text></View>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}

        {/* AKAUN Specific Data */}
        {isAkaun && formData.finance && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Prestasi Kewangan</Text>
            <View style={styles.row}><Text style={styles.label}>Peratus Perbelanjaan:</Text><Text style={styles.value}>{formData.finance.percentageBelanja || 0}%</Text></View>
            <View style={styles.row}><Text style={styles.label}>Peratus ECSA:</Text><Text style={styles.value}>{formData.finance.percentageEcsa || 0}%</Text></View>
          </View>
        )}

        {/* BKKI Specific Data */}
        {isBKKI && formData.bkki && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Statistik Keluarga Islam</Text>
            <View style={styles.row}><Text style={styles.label}>Bilangan Perkahwinan:</Text><Text style={styles.value}>{formData.bkki.stats?.bilPerkahwinan || 0}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Bilangan Perceraian:</Text><Text style={styles.value}>{formData.bkki.stats?.bilPerceraian || 0}</Text></View>
          </View>
        )}

        {/* UKOKO Specific Data */}
        {isUKOKO && formData.socialMedia && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Statistik Media Sosial & Komunikasi</Text>
            <View style={styles.row}><Text style={styles.label}>FB Followers:</Text><Text style={styles.value}>{formData.socialMedia.fbFollowers || 0}</Text></View>
            <View style={styles.row}><Text style={styles.label}>TikTok Followers:</Text><Text style={styles.value}>{formData.socialMedia.tiktokFollowers || 0}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Aduan Diterima:</Text><Text style={styles.value}>{formData.aduan?.diterima || 0}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Aduan Diselesaikan:</Text><Text style={styles.value}>{formData.aduan?.diselesaikan || 0}</Text></View>
          </View>
        )}

        {/* DAKWAH Specific Data */}
        {isDakwah && formData.dakwah && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Statistik Program & Tauliah (2025)</Text>
              <View style={styles.row}><Text style={styles.label}>Program JAIS:</Text><Text style={styles.value}>{formData.dakwah.progJais2025 || 0}</Text></View>
              <View style={styles.row}><Text style={styles.label}>Program Agensi/NGO:</Text><Text style={styles.value}>{formData.dakwah.progAgensi2025 || 0}</Text></View>
              <View style={styles.row}><Text style={styles.label}>Tauliah Aktif:</Text><Text style={styles.value}>{formData.dakwah.tauliahAktif2025 || 0}</Text></View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Dakwah Melalui Media (2025)</Text>
              <View style={styles.row}><Text style={styles.label}>Radio:</Text><Text style={styles.value}>{formData.dakwah.mediaRadio2025 || 0}</Text></View>
              <View style={styles.row}><Text style={styles.label}>Internet:</Text><Text style={styles.value}>{formData.dakwah.mediaInternet2025 || 0}</Text></View>
            </View>
          </>
        )}

        {/* HR Specific Data */}
        {isHR && formData.hr && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ringkasan Perjawatan & Demografi (2025)</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Kategori</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>2024</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>2025</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Perjawatan (Bajet)</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{HR_2024_REFERENCE.ringkasan.perjawatanBajet}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.hr.ringkasan.perjawatanBajet}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Perjawatan Diisi</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{HR_2024_REFERENCE.ringkasan.perjawatanDiisi}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.hr.ringkasan.perjawatanDiisi}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Lelaki</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{HR_2024_REFERENCE.demografi.lelaki}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.hr.demografi.lelaki}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Wanita</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{HR_2024_REFERENCE.demografi.wanita}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.hr.demografi.wanita}</Text></View>
                </View>
                <View style={[styles.tableRow, { backgroundColor: '#f0fdf4' }]}>
                  <View style={[styles.tableCell, { width: '40%', fontWeight: 'bold' }]}><Text>Jumlah Warga Kerja</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%', fontWeight: 'bold' }]}><Text>{HR_2024_REFERENCE.ringkasan.jumlahWargaKerja}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%', fontWeight: 'bold' }]}><Text>{formData.hr.ringkasan.jumlahWargaKerja}</Text></View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pecahan Skim Perkhidmatan (2025)</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '60%' }]}><Text>Skim / Kategori</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>2024</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>2025</Text></View>
                </View>
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
                  <View key={item.field} style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '60%' }]}><Text>{item.label}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{item.ref}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{formData.hr.skim[item.field as keyof typeof formData.hr.skim]}</Text></View>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Kakitangan Sangkutan & Persaraan</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '60%' }]}><Text>Kategori</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>2024</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>2025</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '60%' }]}><Text>Pekhidmat MIS</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{HR_2024_REFERENCE.sangkutan.mis}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{formData.hr.sangkutan.mis}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '60%' }]}><Text>JAKIM (Penyelia KAFA)</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{HR_2024_REFERENCE.sangkutan.jakim.penyeliaKafa}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{formData.hr.sangkutan.jakim.penyeliaKafa}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '60%' }]}><Text>JAKIM (Penggerak)</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{HR_2024_REFERENCE.sangkutan.jakim.penggerak}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{formData.hr.sangkutan.jakim.penggerak}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '60%' }]}><Text>JAKIM (Takmir)</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{HR_2024_REFERENCE.sangkutan.jakim.takmir}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{formData.hr.sangkutan.jakim.takmir}</Text></View>
                </View>
                <View style={[styles.tableRow, { backgroundColor: '#fef2f2' }]}>
                  <View style={[styles.tableCell, { width: '60%', fontWeight: 'bold' }]}><Text>Jumlah Bersara</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%', fontWeight: 'bold' }]}><Text>{HR_2024_REFERENCE.bersara}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%', fontWeight: 'bold' }]}><Text>{formData.hr.bersara}</Text></View>
                </View>
              </View>
            </View>
          </>
        )}

        {/* BKSP Specific Data */}
        {isBKSP && formData.bksp && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Permohonan Runding Cara (2025)</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Bahagian</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>2024</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>2025</Text></View>
                </View>
                {formData.bksp.permohonan.map((item: any, idx: number) => (
                  <View key={item.name} style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '40%' }]}><Text>{item.name}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKSP_2024_REFERENCE.permohonan[idx].value}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{item.value}</Text></View>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pegawai Runding Cara (2025)</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Bahagian</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>2024</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>2025</Text></View>
                </View>
                {formData.bksp.pegawai.map((item: any, idx: number) => (
                  <View key={item.name} style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '40%' }]}><Text>{item.name}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKSP_2024_REFERENCE.pegawai[idx].value}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{item.value}</Text></View>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Statistik Program & Status Kes (2025)</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Kategori</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>2024</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>2025</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Kaunseling Syarie</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKSP_2024_REFERENCE.statistik.kaunselingSyarie}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bksp.statistik.kaunselingSyarie}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Psikologi</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKSP_2024_REFERENCE.statistik.psikologi}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bksp.statistik.psikologi}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Kes Diterima</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKSP_2024_REFERENCE.statusKes.diterima}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bksp.statusKes.diterima}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Kes Diselesaikan</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKSP_2024_REFERENCE.statusKes.diselesaikan}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bksp.statusKes.diselesaikan}</Text></View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Punca Krisis (2025)</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text>Punca Krisis</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>Jumlah Kes</Text></View>
                </View>
                {formData.bksp.puncaKrisis.filter((p: any) => (p.value || 0) > 0).map((item: any) => (
                  <View key={item.name} style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '70%' }]}><Text>{item.name}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{item.value}</Text></View>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}

        {/* BPDS Specific Data */}
        {isBPDS && formData.bpds && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Kertas Siasatan & Pendaftaran Kes (2025)</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Kategori</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>IP 2025</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>Daftar 2025</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Matrimoni</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bpds.kertasSiasatan.matrimoni}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bpds.pendaftaranKes.matrimoni}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Jenayah Syariah</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bpds.kertasSiasatan.jenayahSyariah}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bpds.pendaftaranKes.jenayahSyariah}</Text></View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Kes Selesai Mengikut Bahagian (2025)</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Bahagian</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>2024</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>2025</Text></View>
                </View>
                {formData.bpds.kesSelesai.map((item: any, idx: number) => (
                  <View key={item.name} style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '40%' }]}><Text>{item.name}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BPDS_2024_REFERENCE.kesSelesai[idx].value}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{item.value}</Text></View>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Penggubalan Kaedah (2025)</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text>Jenis Kaedah</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>Kemajuan (%)</Text></View>
                </View>
                {formData.bpds.penggubalanKaedah.map((item: any) => (
                  <View key={item.name} style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '70%' }]}><Text>{item.name}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{item.value}%</Text></View>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Program / Aktiviti (2025)</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text>Kategori</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>Jumlah</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text>Jumlah Program / Aktiviti</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bpds.aktiviti}</Text></View>
                </View>
              </View>
            </View>
          </>
        )}

        {/* Narrative Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ringkasan Pencapaian Utama 2025</Text>
          <Text style={{ textAlign: 'justify', lineHeight: 1.5 }}>{formData.ringkasan || 'Tiada maklumat disediakan.'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Isu & Cabaran</Text>
          <Text style={{ textAlign: 'justify', lineHeight: 1.5 }}>{formData.isu || 'Tiada maklumat disediakan.'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cadangan Penambahbaikan</Text>
          <Text style={{ textAlign: 'justify', lineHeight: 1.5 }}>{formData.cadangan || 'Tiada maklumat disediakan.'}</Text>
        </View>

        {/* Lawatan */}
        {formData.lawatan && formData.lawatan.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rekod Lawatan</Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <View style={[styles.tableCell, { width: '15%' }]}><Text>Jenis</Text></View>
                <View style={[styles.tableCell, { width: '35%' }]}><Text>Tajuk/Agensi</Text></View>
                <View style={[styles.tableCell, { width: '25%' }]}><Text>Tarikh/Tempat</Text></View>
                <View style={[styles.tableCell, { width: '25%' }]}><Text>Objektif</Text></View>
              </View>
              {formData.lawatan.map((item: any, idx: number) => (
                <View key={idx} style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '15%' }]}><Text>{item.jenis}</Text></View>
                  <View style={[styles.tableCell, { width: '35%' }]}><Text>{item.tajukAgensi}</Text></View>
                  <View style={[styles.tableCell, { width: '25%' }]}><Text>{item.tarikh} @ {item.tempat}</Text></View>
                  <View style={[styles.tableCell, { width: '25%' }]}><Text>{item.objektif}</Text></View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Signature Section */}
        <View style={styles.signatureContainer}>
          {/* Left: Disediakan Oleh */}
          <View style={styles.signatureBox}>
            <Text style={styles.signatureTitle}>Disediakan oleh:</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureDetail}>Nama: {formData.disediakanOleh || '................................'}</Text>
            <Text style={styles.signatureDetail}>Jawatan: {formData.jawatan || '................................'}</Text>
            <Text style={styles.signatureDetail}>Tarikh: {formData.tarikh || '................................'}</Text>
          </View>

          {/* Right: Disahkan Oleh */}
          <View style={styles.signatureBox}>
            <Text style={styles.signatureTitle}>Disahkan oleh:</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureDetail}>Nama: ................................</Text>
            <Text style={styles.signatureDetail}>Jawatan: ................................</Text>
            <Text style={styles.signatureDetail}>Tarikh: ................................</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Jabatan Agama Islam Sarawak (JAIS)</Text>
          <Text style={styles.footerText}>Halaman 1 dari 1</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ReportPDF;
