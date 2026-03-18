import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { BKIM_2024_REFERENCE, DAKWAH_2024_REFERENCE, BPNP_2024_REFERENCE, BKSK_2024_REFERENCE, BKSP_2024_REFERENCE, BPDS_2024_REFERENCE, HR_2024_REFERENCE, LEADERSHIP_2024_REFERENCE, FINANCE_2024_REFERENCE, BKKI_2024_REFERENCE, BPPI_2024_REFERENCE, BPH_2024_REFERENCE, BPKS_2024_REFERENCE, UKOKO_2024_REFERENCE, DHQC_2024_REFERENCE, UPP_2024_REFERENCE, INTEGRITI_2024_REFERENCE, QUALITY_INITIATIVES_2024_REFERENCE, LATIHAN_2024_REFERENCE } from '../constants';

// Register fonts if needed, but standard ones are usually fine
// Font.register({ family: 'Helvetica', src: '...' });

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#1f2937',
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  watermark: {
    position: 'absolute',
    top: '45%',
    left: '15%',
    fontSize: 60,
    color: 'rgba(200, 200, 200, 0.1)',
    transform: 'rotate(-45deg)',
    fontWeight: 'bold',
    zIndex: -1,
  },
  simpleHeader: {
    borderBottomWidth: 2,
    borderBottomColor: '#0d9488',
    paddingBottom: 10,
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  reportEyebrow: {
    fontSize: 8,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  simpleDeptName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0d9488',
    textTransform: 'uppercase',
    lineHeight: 1.2,
    marginBottom: 2,
  },
  simpleSubUnit: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#c5a065',
    textTransform: 'uppercase',
    marginTop: 2,
  },
  subtitle: {
    fontSize: 9,
    color: '#6b7280',
    fontWeight: 'medium',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  tarikhKecil: {
    fontSize: 7,
    color: '#9ca3af',
    marginTop: 4,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#0d9488',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
    borderRadius: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  subSectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0d9488',
    marginBottom: 10,
    marginTop: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#c5a065',
    paddingLeft: 10,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  label: {
    width: '35%',
    fontWeight: 'bold',
    color: '#4b5563',
    fontSize: 9,
  },
  value: {
    width: '65%',
    color: '#1f2937',
    fontSize: 9,
    lineHeight: 1.4,
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#d1d5db',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    minHeight: 28,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#f8fafc',
    borderBottomWidth: 2,
    borderBottomColor: '#0d9488',
  },
  tableCell: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 8.5,
    color: '#334155',
    borderRightWidth: 1,
    borderRightColor: '#d1d5db',
    height: '100%',
    justifyContent: 'center',
  },
  tableCellHeader: {
    fontWeight: 'bold',
    color: '#0d9488',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableCellCenter: {
    textAlign: 'center',
  },
  narrativeBox: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginTop: 5,
  },
  narrativeText: {
    fontSize: 9.5,
    lineHeight: 1.6,
    textAlign: 'justify',
    color: '#374151',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  statsColumn: {
    width: '48%',
  },
  infoCard: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  infoCardLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#9ca3af',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  infoCardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0a1e3b',
    marginBottom: 4,
  },
  infoCardRef: {
    fontSize: 8,
    color: '#9ca3af',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#d1d5db',
    paddingTop: 8,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkCard: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  linkTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 3,
  },
  linkUrl: {
    fontSize: 8,
    color: '#2563eb',
  },
  emptyState: {
    fontSize: 8.5,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    borderTopWidth: 1,
    borderTopColor: '#d1d5db',
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 7.5,
    color: '#9ca3af',
  },
  signatureSection: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureBox: {
    width: '40%',
    marginTop: 60,
  },
  signatureLabel: {
    fontSize: 9,
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
    marginVertical: 5,
  },
  signatureDetail: {
    fontSize: 9,
    color: '#1f2937',
    marginTop: 3,
  },
  signatureSubLabel: {
    fontSize: 8,
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 2,
  },
});

interface ReportPDFProps {
  deptName: string;
  formData: any;
}

const ReportPDF: React.FC<ReportPDFProps> = ({ deptName, formData }) => {
  const [mainDept, unitName] = deptName.split(' : ');
  const targetName = unitName || deptName;
  const isBKIM = deptName.includes('BKIM');
  const isBPP = deptName.includes('BPNP');
  const isUPP = deptName.includes('UPP');
  const isIntegriti = deptName.includes('INTEGRITI');
  const isBKSK = deptName.includes('BKSK') || deptName.includes('SAUDARA KITA');
  const isBKKI = deptName.includes('BKKI') || deptName.includes('Keluarga Islam');
  const isBPH = deptName.includes('BPH') || deptName.includes('Halal');
  const isBPKS = deptName.includes('BPKS') || deptName.includes('Penguatkuasaan');
  const isBPPI = deptName.includes('BPPI');
  const isUKOKO = deptName.includes('UKOKO');
  const isDHQC = deptName.includes('DHQC');
  const isDakwah = deptName.includes('DAKWAH') || deptName.includes('BDKWH');
  const isBKSP = deptName.includes('BKSP') || deptName.includes('Kaunseling');
  const isBPDS = deptName.includes('BPDS') || deptName.includes('Pendakwaan');
  const isHR = deptName.includes('HR & Latihan');
  const isPentadbiran = targetName.includes('Pentadbiran');
  const isFinance = targetName.includes('Kewangan') || targetName.includes('Akaun');
  const integritiLinks = formData.integriti?.dokumentasi?.links || [];
  const totalDokumentasiIntegriti =
    (parseInt(formData.integriti?.dokumentasi?.manual) || 0) +
    (parseInt(formData.integriti?.dokumentasi?.polisi) || 0);
  const iso9001Status = formData.quality?.iso9001?.status?.trim() || '';
  const iso37001Status = formData.quality?.iso37001?.status?.trim() || '';
  const integritiCertificationStatus =
    iso9001Status.toLowerCase().includes('recommend') ||
    iso37001Status.toLowerCase().includes('recommend')
      ? 'CERTIFIED'
      : 'PENDING';
  const activeIntegritiFrameworks = [
    formData.quality?.frameworks?.mbef ? 'MBEF' : null,
    formData.quality?.frameworks?.scsScorecard ? 'SCS Scorecard' : null,
    formData.quality?.frameworks?.eksa ? 'EKSA' : null,
  ].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Watermark */}
        <Text style={styles.watermark}>DOKUMEN RASMI</Text>

        {/* Simple Header */}
        <View style={styles.simpleHeader}>
          <Text style={styles.reportEyebrow}>Data Laporan Tahunan JAIS 2025</Text>
          <Text style={styles.simpleDeptName}>{mainDept}</Text>
          {unitName && <Text style={styles.simpleSubUnit}>{unitName}</Text>}
          <Text style={styles.tarikhKecil}>Tarikh Cetakan: {new Date().toLocaleDateString('ms-MY')}</Text>
        </View>

        {/* Maklumat Asas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Maklumat Asas</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Disediakan Oleh:</Text>
            <Text style={styles.value}>{formData.disediakanOleh || '-'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Jawatan:</Text>
            <Text style={styles.value}>{formData.jawatan || '-'}</Text>
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
              <Text style={styles.sectionTitle}>Pemenang Penulisan Ilmiah (2025)</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '25%' }]}><Text style={styles.tableCellHeader}>Kategori</Text></View>
                  <View style={[styles.tableCell, { width: '25%' }]}><Text style={styles.tableCellHeader}>Kedudukan</Text></View>
                  <View style={[styles.tableCell, { width: '50%' }]}><Text style={styles.tableCellHeader}>Nama & Tajuk</Text></View>
                </View>
                
                {/* Diploma */}
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '25%' }]}><Text style={{ fontWeight: 'bold' }}>DIPLOMA</Text></View>
                  <View style={[styles.tableCell, { width: '25%' }]}><Text>JOHAN</Text></View>
                  <View style={[styles.tableCell, { width: '50%' }]}>
                    <Text style={{ fontWeight: 'bold' }}>{formData.bpnp.penulisan.diploma.johan.nama || '-'}</Text>
                    <Text style={{ fontSize: 7, color: '#6b7280', marginTop: 2 }}>{formData.bpnp.penulisan.diploma.johan.tajuk || '-'}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '25%' }]}></View>
                  <View style={[styles.tableCell, { width: '25%' }]}><Text>NAIB JOHAN</Text></View>
                  <View style={[styles.tableCell, { width: '50%' }]}>
                    <Text style={{ fontWeight: 'bold' }}>{formData.bpnp.penulisan.diploma.naibJohan.nama || '-'}</Text>
                    <Text style={{ fontSize: 7, color: '#6b7280', marginTop: 2 }}>{formData.bpnp.penulisan.diploma.naibJohan.tajuk || '-'}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '25%' }]}></View>
                  <View style={[styles.tableCell, { width: '25%' }]}><Text>TEMPAT KETIGA</Text></View>
                  <View style={[styles.tableCell, { width: '50%' }]}>
                    <Text style={{ fontWeight: 'bold' }}>{formData.bpnp.penulisan.diploma.ketiga.nama || '-'}</Text>
                    <Text style={{ fontSize: 7, color: '#6b7280', marginTop: 2 }}>{formData.bpnp.penulisan.diploma.ketiga.tajuk || '-'}</Text>
                  </View>
                </View>

                {/* Sarjana Muda */}
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '25%' }]}><Text style={{ fontWeight: 'bold' }}>SARJANA MUDA</Text></View>
                  <View style={[styles.tableCell, { width: '25%' }]}><Text>JOHAN</Text></View>
                  <View style={[styles.tableCell, { width: '50%' }]}>
                    <Text style={{ fontWeight: 'bold' }}>{formData.bpnp.penulisan.sarjanaMuda.johan.nama || '-'}</Text>
                    <Text style={{ fontSize: 7, color: '#6b7280', marginTop: 2 }}>{formData.bpnp.penulisan.sarjanaMuda.johan.tajuk || '-'}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '25%' }]}></View>
                  <View style={[styles.tableCell, { width: '25%' }]}><Text>NAIB JOHAN</Text></View>
                  <View style={[styles.tableCell, { width: '50%' }]}>
                    <Text style={{ fontWeight: 'bold' }}>{formData.bpnp.penulisan.sarjanaMuda.naibJohan.nama || '-'}</Text>
                    <Text style={{ fontSize: 7, color: '#6b7280', marginTop: 2 }}>{formData.bpnp.penulisan.sarjanaMuda.naibJohan.tajuk || '-'}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '25%' }]}></View>
                  <View style={[styles.tableCell, { width: '25%' }]}><Text>TEMPAT KETIGA</Text></View>
                  <View style={[styles.tableCell, { width: '50%' }]}>
                    <Text style={{ fontWeight: 'bold' }}>{formData.bpnp.penulisan.sarjanaMuda.ketiga.nama || '-'}</Text>
                    <Text style={{ fontSize: 7, color: '#6b7280', marginTop: 2 }}>{formData.bpnp.penulisan.sarjanaMuda.ketiga.tajuk || '-'}</Text>
                  </View>
                </View>
                <View style={[styles.tableRow, { backgroundColor: '#f8fafc' }]}>
                  <View style={[styles.tableCell, { width: '25%' }]}></View>
                  <View style={[styles.tableCell, { width: '25%' }]}><Text style={{ fontWeight: 'bold' }}>PESERTA LAIN</Text></View>
                  <View style={[styles.tableCell, { width: '50%' }]}><Text style={{ fontWeight: 'bold' }}>{formData.bpnp.penulisan.sarjanaMuda.pesertaLain} Orang</Text></View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Statistik Operasi</Text>
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
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Penerbitan Digital</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Kategori</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>2024</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>2025</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Infografik Akidah</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BPNP_2024_REFERENCE.statistik.infografik}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bpnp.statistik.infografik}</Text></View>
                </View>
              </View>
            </View>

            {/* Data Management Dashboard Section */}
            {formData.bpnp.dataManagement && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Pengurusan Data (Data Management Dashboard)</Text>
                <View style={styles.table}>
                  <View style={[styles.tableRow, styles.tableHeader]}>
                    <View style={[styles.tableCell, { width: '60%' }]}><Text>Kategori Pengurusan Data</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>2024</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>2025</Text></View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '60%' }]}><Text>Bilangan Mesyuarat DTAWG</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>1</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{formData.bpnp.dataManagement.dtawgMeetings}</Text></View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '60%' }]}><Text>Integrated Data Management Dashboard</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>1</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{formData.bpnp.dataManagement.integratedDashboards}</Text></View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '60%' }]}><Text>Bilangan Kluster Data</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>26</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{formData.bpnp.dataManagement.dataClusters}</Text></View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '60%' }]}><Text>Bilangan Sub-Data Dashboard</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>3</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{formData.bpnp.dataManagement.subDataDashboards}</Text></View>
                  </View>
                </View>

                {formData.bpnp.dataManagement.subDataList && formData.bpnp.dataManagement.subDataList.length > 0 && (
                  <View style={{ marginTop: 5 }}>
                    <Text style={{ fontSize: 9, fontWeight: 'bold', marginBottom: 5 }}>Senarai Sub-Data Dashboard (2025):</Text>
                    {formData.bpnp.dataManagement.subDataList.map((item: string, i: number) => item && (
                      <View key={i} style={{ flexDirection: 'row', marginLeft: 10, marginBottom: 2 }}>
                        <Text style={{ width: 10 }}>•</Text>
                        <Text style={{ flex: 1 }}>{item}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            )}
          </>
        )}

        {/* UPP Specific Data */}
        {isUPP && formData.upp && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Status Projek Masjid Mengikut Bahagian</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Bahagian</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>Rancang</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>Laksana</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>Siap</Text></View>
                </View>
                {Object.entries(formData.upp.projekMasjid).map(([name, data]: [string, any], idx: number) => (
                  <View key={idx} style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '40%' }]}><Text>{name}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{data.perancangan || 0}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{data.pelaksanaan || 0}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{data.siap || 0}</Text></View>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Status Projek Sekolah Agama</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '60%' }]}><Text>Nama Sekolah</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>Jumlah Projek</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>Siap</Text></View>
                </View>
                {Object.entries(formData.upp.projekSekolah).map(([name, data]: [string, any], idx: number) => (
                  <View key={idx} style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '60%' }]}><Text>{name}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{data.total || 0}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{data.siap || 0}</Text></View>
                  </View>
                ))}
              </View>
            </View>
          </>
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
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Imam I</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKIM_2024_REFERENCE.perjawatan.imam1}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bkim.imam1}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Imam II</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKIM_2024_REFERENCE.perjawatan.imam2}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bkim.imam2}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Imam III</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKIM_2024_REFERENCE.perjawatan.imam3}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bkim.imam3}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Bilal</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKIM_2024_REFERENCE.perjawatan.bilal}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bkim.bilal}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Marbot</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKIM_2024_REFERENCE.perjawatan.marbot}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bkim.marbot}</Text></View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tanah Perkuburan & Penarafan Bintang</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Kategori</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>2024</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>2025</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>MIS</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKIM_2024_REFERENCE.kubur.mis}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bkim.kuburMis}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Tanah Kerajaan</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKIM_2024_REFERENCE.kubur.kerajaan}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bkim.kuburKerajaan}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>LAK</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKIM_2024_REFERENCE.kubur.lak}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bkim.kuburLak}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Lain-Lain</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKIM_2024_REFERENCE.kubur.lain}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bkim.kuburLain}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>5 Bintang</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKIM_2024_REFERENCE.bintang.star5}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bkim.star5}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>4 Bintang</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKIM_2024_REFERENCE.bintang.star4}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bkim.star4}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>3 Bintang</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKIM_2024_REFERENCE.bintang.star3}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bkim.star3}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>2 Bintang</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKIM_2024_REFERENCE.bintang.star2}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bkim.star2}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>1 Bintang</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKIM_2024_REFERENCE.bintang.star1}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bkim.star1}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Tiada Bintang</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKIM_2024_REFERENCE.bintang.star0}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bkim.star0}</Text></View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pecahan Mengikut Bahagian (2025)</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '28%' }]}><Text>Bahagian</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '12%' }]}><Text>Program 2024</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '12%' }]}><Text>Program 2025</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '16%' }]}><Text>Guru Takmir 2024</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '16%' }]}><Text>Guru Takmir 2025</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '8%' }]}><Text>LAK 2024</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '8%' }]}><Text>LAK 2025</Text></View>
                </View>
                {formData.bkim.bkimDivisions.map((div: any, idx: number) => (
                  <View key={idx} style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '28%' }]}><Text>{div.name}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '12%' }]}><Text>{BKIM_2024_REFERENCE.divisions[idx]?.program || 0}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '12%' }]}><Text>{div.program}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '16%' }]}><Text>{BKIM_2024_REFERENCE.divisions[idx]?.guruTakmir || 0}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '16%' }]}><Text>{div.guruTakmir}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '8%' }]}><Text>{BKIM_2024_REFERENCE.divisions[idx]?.lak || 0}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '8%' }]}><Text>{div.lak}</Text></View>
                  </View>
                ))}
              </View>
            </View>
          </>
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

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pecahan Tauliah Mengikut Bahagian</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text>Bahagian</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>Tauliah Aktif</Text></View>
                </View>
                {formData.dakwah.tauliahDivisions.map((div: any, idx: number) => (
                  <View key={idx} style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '70%' }]}><Text>{div.name}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{div.val2025 || 0}</Text></View>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pecahan Guru Asing Mengikut Bahagian</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text>Bahagian</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>Bil. Guru</Text></View>
                </View>
                {formData.dakwah.guruAsingDivisions.map((div: any, idx: number) => (
                  <View key={idx} style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '70%' }]}><Text>{div.name}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{div.val2025 || 0}</Text></View>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}




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
                {(formData.bpds.derafUndangUndangList || []).map((item: any, idx: number) => {
                  const draftItem = typeof item === 'string' ? { name: item, value: 0 } : item;
                  return (
                    <View key={`draft-${idx}`} style={styles.tableRow}>
                      <View style={[styles.tableCell, { width: '70%' }]}><Text>{draftItem.name}</Text></View>
                      <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{draftItem.value || 0}%</Text></View>
                    </View>
                  );
                })}
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

        {/* BKKI Data */}
        {isBKKI && formData.stats && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Statistik Utama Munakahat 2025</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Kategori</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>Ref 2024</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>2025</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Perkahwinan Didaftar</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKKI_2024_REFERENCE.stats.bilPerkahwinan}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.stats.bilPerkahwinan || 0}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Perceraian Didaftar</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKKI_2024_REFERENCE.stats.bilPerceraian}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.stats.bilPerceraian || 0}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Ruju' Didaftar</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKKI_2024_REFERENCE.stats.bilRuju}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.stats.bilRuju || 0}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Kad Nikah Dikeluarkan</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKKI_2024_REFERENCE.stats.bilKadNikah}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.stats.bilKadNikah || 0}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Peserta Kursus Pra-Nikah</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKKI_2024_REFERENCE.stats.jumPesertaKursus}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.stats.jumPesertaKursus || 0}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Program / Aktiviti</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BKKI_2024_REFERENCE.stats.bilProgram}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.stats.bilProgram || 0}</Text></View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Jadual Pendaftar & Jurunikah 2025</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '25%' }]}><Text>Bahagian</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '12%' }]}><Text>KPNCR</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '12%' }]}><Text>PNCR</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '12%' }]}><Text>TPNCR</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '12%' }]}><Text>PPNCR</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '12%' }]}><Text>Jurunikah</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '15%' }]}><Text>Jumlah</Text></View>
                </View>
                {formData.registrarTable.map((row: any) => {
                  const total = (parseInt(row.kpncr) || 0) + (parseInt(row.pncr) || 0) + (parseInt(row.tpncr) || 0) + (parseInt(row.ppncr) || 0) + (parseInt(row.jurunikah) || 0);
                  return (
                    <View key={row.region} style={styles.tableRow}>
                      <View style={[styles.tableCell, { width: '25%' }]}><Text>{row.region}</Text></View>
                      <View style={[styles.tableCell, styles.tableCellCenter, { width: '12%' }]}><Text>{row.kpncr || 0}</Text></View>
                      <View style={[styles.tableCell, styles.tableCellCenter, { width: '12%' }]}><Text>{row.pncr || 0}</Text></View>
                      <View style={[styles.tableCell, styles.tableCellCenter, { width: '12%' }]}><Text>{row.tpncr || 0}</Text></View>
                      <View style={[styles.tableCell, styles.tableCellCenter, { width: '12%' }]}><Text>{row.ppncr || 0}</Text></View>
                      <View style={[styles.tableCell, styles.tableCellCenter, { width: '12%' }]}><Text>{row.jurunikah || 0}</Text></View>
                      <View style={[styles.tableCell, styles.tableCellCenter, { width: '15%', backgroundColor: '#f3f4f6' }]}><Text>{total}</Text></View>
                    </View>
                  );
                })}
              </View>
            </View>
          </>
        )}

        {/* BPH Data */}
        {isBPH && formData.bph && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Statistik SPHM 2025</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Kategori</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>Ref 2024</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>2025</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Permohonan Sijil</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BPH_2024_REFERENCE.sphm.permohonan}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bph.sphm.permohonan || 0}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Pemilik Sijil Aktif</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BPH_2024_REFERENCE.sphm.aktif}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{String(Object.values(formData.bph.sphm.skim || {}).reduce((a: any, b: any) => a + (parseInt(b) || 0), 0))}</Text></View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Hasil Pemantauan 2025</Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '70%', backgroundColor: '#f9fafb' }]}><Text>Mematuhi Piawaian</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bph.pemantauan.patuh || 0}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '70%', backgroundColor: '#f9fafb' }]}><Text>Diberi Amaran</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bph.pemantauan.amaran || 0}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '70%', backgroundColor: '#f9fafb' }]}><Text>Digantung SPHM</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bph.pemantauan.gantung || 0}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '70%', backgroundColor: '#f9fafb' }]}><Text>Ditarik Balik SPHM</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bph.pemantauan.tarikBalik || 0}</Text></View>
                </View>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text>JUMLAH PEMANTAUAN</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{String(Object.values(formData.bph.pemantauan || {}).reduce((a: any, b: any) => a + (parseInt(b) || 0), 0))}</Text></View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Zon Halal 2025</Text>
              {formData.bph.zonHalal.map((zon: string, idx: number) => (
                <View key={idx} style={[styles.row, { marginBottom: 2 }]}>
                  <Text style={{ width: '5%', color: '#5A5A40' }}>•</Text>
                  <Text style={{ width: '95%', fontSize: 9 }}>{zon}</Text>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Program & Aktiviti 2025</Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '70%', backgroundColor: '#f9fafb' }]}><Text>Ziarah Halal</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bph.ziarahHalal || 0}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '70%', backgroundColor: '#f9fafb' }]}><Text>Taklimat Halal</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bph.aktiviti.taklimat || 0}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '70%', backgroundColor: '#f9fafb' }]}><Text>Kursus Kesedaran</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bph.aktiviti.kursus || 0}</Text></View>
                </View>
                <View style={[styles.tableRow, { backgroundColor: '#c5a065' }]}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text style={{ fontWeight: 'bold' }}>JUMLAH BESAR AKTIVITI</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text style={{ fontWeight: 'bold' }}>{formData.bph.aktiviti.total || 0}</Text></View>
                </View>
              </View>
            </View>
          </>
        )}

        {/* BPKS Data */}
        {isBPKS && formData.bpks && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Statistik Operasi 2025</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text style={styles.tableCellHeader}>Kategori</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text style={styles.tableCellHeader}>Ref 2024</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text style={styles.tableCellHeader}>2025</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>BTAM Diterima</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BPKS_2024_REFERENCE.statistik.btam}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text style={{ fontWeight: 'bold' }}>{formData.bpks.statistik.btam || 0}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Rondaan & Operasi</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BPKS_2024_REFERENCE.statistik.rondaan}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text style={{ fontWeight: 'bold' }}>{formData.bpks.statistik.rondaan || 0}</Text></View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sumber Manusia 2025</Text>
              <View style={[styles.table, { backgroundColor: '#0D9488' }]}>
                <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text style={{ color: 'white', fontWeight: 'bold', fontSize: 10 }}>JUMLAH PEGAWAI PENGUATKUASA</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>{String(Object.values(formData.bpks.pegawai).reduce((acc: number, val: any) => acc + (parseInt(val) || 0), 0))}</Text></View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Borang 5 Didaftar 2025</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text style={styles.tableCellHeader}>Bahagian</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text style={styles.tableCellHeader}>Ref 2024</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text style={styles.tableCellHeader}>2025</Text></View>
                </View>
                {Object.keys(formData.bpks.borang5.bahagian).map(div => (
                  <View key={div} style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '40%' }]}><Text>{div.toUpperCase()}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BPKS_2024_REFERENCE.borang5.bahagian[div as keyof typeof BPKS_2024_REFERENCE.borang5.bahagian] || 0}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text style={{ fontWeight: 'bold' }}>{formData.bpks.borang5.bahagian[div] || 0}</Text></View>
                  </View>
                ))}
                <View style={[styles.tableRow, { backgroundColor: '#111827', borderBottomWidth: 0 }]}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text style={{ color: 'white', fontWeight: 'bold' }}>JUMLAH BESAR BORANG 5</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text style={{ color: 'white', fontWeight: 'bold', fontSize: 11 }}>{String(Object.values(formData.bpks.borang5.bahagian).reduce((acc: number, val: any) => acc + (parseInt(val) || 0), 0))}</Text></View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pecahan Kategori & Kertas Siasatan</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text style={styles.tableCellHeader}>Kategori</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text style={styles.tableCellHeader}>Borang 5</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text style={styles.tableCellHeader}>Kertas Siasatan</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Matrimoni</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bpks.borang5.kategori.matrimoni || 0}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text style={{ fontWeight: 'bold' }}>{formData.bpks.kertasSiasatan.matrimoni || 0}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Jenayah Syariah</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bpks.borang5.kategori.jenayahSyariah || 0}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text style={{ fontWeight: 'bold' }}>{formData.bpks.kertasSiasatan.jenayahSyariah || 0}</Text></View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <View style={[styles.table, { backgroundColor: '#f8fafc', borderLeftWidth: 4, borderLeftColor: '#0D9488' }]}>
                <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text style={{ fontWeight: 'bold', color: '#0D9488' }}>JUMLAH PROGRAM / AKTIVITI</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text style={{ fontWeight: 'bold', fontSize: 12, color: '#0D9488' }}>{formData.bpks.aktiviti.total || 0}</Text></View>
                </View>
              </View>
            </View>
          </>
        )}

        {/* UKOKO Data */}
        {isUKOKO && formData.ukoko && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Laporan Perayaan Islam & Majlis Kesyukuran 2025</Text>
              <View style={[styles.table, { backgroundColor: '#064e3b', borderLeftWidth: 4, borderLeftColor: '#c5a065' }]}>
                <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text style={{ color: 'white', fontWeight: 'bold', fontSize: 10 }}>JUMLAH KESELURUHAN ACARA</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>{String((formData.ukoko.perayaanIslam?.length || 0) + (formData.ukoko.majlisKesyukuran?.length || 0))}</Text></View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Senarai Perayaan Islam 2025</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text style={styles.tableCellHeader}>Nama Majlis</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text style={styles.tableCellHeader}>Tarikh</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text style={styles.tableCellHeader}>Tuan Rumah</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text style={styles.tableCellHeader}>Mesyuarat</Text></View>
                </View>
                {formData.ukoko.perayaanIslam.map((event: any, idx: number) => (
                  <View key={idx} style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '40%' }]}><Text style={{ fontWeight: 'bold' }}>{event.nama}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{event.tarikh}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{event.tuanRumah}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{event.mesyuarat}</Text></View>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Senarai Majlis Kesyukuran 2025</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text style={styles.tableCellHeader}>Nama Majlis</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text style={styles.tableCellHeader}>Tarikh</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text style={styles.tableCellHeader}>Tuan Rumah</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text style={styles.tableCellHeader}>Mesyuarat</Text></View>
                </View>
                {formData.ukoko.majlisKesyukuran.map((event: any, idx: number) => (
                  <View key={idx} style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '40%' }]}><Text style={{ fontWeight: 'bold' }}>{event.nama}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{event.tarikh}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{event.tuanRumah}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{event.mesyuarat}</Text></View>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}

        {/* DHQC Data */}
        {isDHQC && formData.dhqc && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Laporan Darul Hana Quran Centre (DHQC) 2025</Text>
              <View style={[styles.table, { backgroundColor: '#0a1e3b' }]}>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text style={{ color: 'white', fontWeight: 'bold' }}>JUMLAH GURU AL-QURAN (GAQMIS)</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text style={{ color: 'white', fontWeight: 'bold' }}>{String(Object.values(formData.dhqc.guruAlQuran).reduce((acc: number, val: any) => acc + (parseFloat(val) || 0), 0))}</Text></View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Statistik Pemuliaan Debu & Penyelia</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '50%' }]}><Text>Kategori</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '50%' }]}><Text>Nilai</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '50%' }]}><Text>Berat Debu (Tan)</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '50%' }]}><Text>{formData.dhqc.statistikDebu.berat || 0}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '50%' }]}><Text>Kekerapan Pemuliaan</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '50%' }]}><Text>{formData.dhqc.statistikDebu.kekerapan || 0}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '50%' }]}><Text>Penyelia (Ibu Pejabat)</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '50%' }]}><Text>{formData.dhqc.penyelia.ibuPejabat || 0}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '50%' }]}><Text>Penyelia (Bintulu)</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '50%' }]}><Text>{formData.dhqc.penyelia.bintulu || 0}</Text></View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pusat Pemuliaan Al-Quran</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text>Lokasi / Masjid</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>Bahagian</Text></View>
                </View>
                {formData.dhqc.pusatPemuliaan.map((item: any, idx: number) => (
                  <View key={idx} style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '70%' }]}><Text>{item.lokasi}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{item.bahagian}</Text></View>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}

        {/* UPP Data */}
        {isUPP && formData.upp && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Laporan Unit Pengurusan Projek (UPP) 2025</Text>
              <View style={[styles.table, { backgroundColor: '#0d9488' }]}>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text style={{ color: 'white', fontWeight: 'bold' }}>KPI PERATUS SIAP PROJEK TAHUNAN</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text style={{ color: 'white', fontWeight: 'bold' }}>{String(((parseInt(formData.upp.statistikTahunan.siap) || 0) / (parseInt(formData.upp.statistikTahunan.dijalankan) || 1) * 100).toFixed(1))}%</Text></View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Statistik Projek & Mesyuarat</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statsColumn}>
                  <View style={styles.infoCard}>
                    <Text style={styles.infoCardLabel}>Projek Dijalankan</Text>
                    <Text style={styles.infoCardValue}>{String(formData.upp.statistikTahunan.dijalankan || 0)}</Text>
                    <Text style={styles.infoCardRef}>REF 2024: {String(UPP_2024_REFERENCE.statistikTahunan.dijalankan)}</Text>
                  </View>
                </View>
                <View style={styles.statsColumn}>
                  <View style={styles.infoCard}>
                    <Text style={styles.infoCardLabel}>Projek Siap</Text>
                    <Text style={styles.infoCardValue}>{String(formData.upp.statistikTahunan.siap || 0)}</Text>
                    <Text style={styles.infoCardRef}>REF 2024: {String(UPP_2024_REFERENCE.statistikTahunan.siap)}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.infoCard}>
                <View style={[styles.row, { marginBottom: 6 }]}>
                  <Text style={styles.infoCardLabel}>Jawatankuasa Pembangunan</Text>
                  <Text style={[styles.value, { textAlign: 'right', fontWeight: 'bold', color: '#0a1e3b' }]}>{String(formData.upp.mesyuarat.pembangunan || 0)}</Text>
                </View>
                <View style={[styles.row, { marginBottom: 0 }]}>
                  <Text style={styles.infoCardLabel}>Jawatankuasa Teknikal</Text>
                  <Text style={[styles.value, { textAlign: 'right', fontWeight: 'bold', color: '#0a1e3b' }]}>{String(formData.upp.mesyuarat.teknikal || 0)}</Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#0a1e3b', textTransform: 'uppercase' }}>Jumlah Mesyuarat</Text>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#0a1e3b' }}>
                    {String((parseInt(formData.upp.mesyuarat.pembangunan) || 0) + (parseInt(formData.upp.mesyuarat.teknikal) || 0))}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pembangunan Masjid, Surau & Perkuburan</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Bahagian</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>Rancang</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>Laksana</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>Siap</Text></View>
                </View>
                {Object.entries(formData.upp.projekMasjid).map(([div, data]: [string, any], idx: number) => (
                  <View key={idx} style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '40%' }]}><Text>{div}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{data.perancangan || 0}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{data.pelaksanaan || 0}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{data.siap || 0}</Text></View>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pembangunan Sekolah (SABK & SMKA)</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '60%' }]}><Text>Nama Sekolah</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>Jumlah</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>Siap</Text></View>
                </View>
                {Object.entries(formData.upp.projekSekolah).map(([school, data]: [string, any], idx: number) => (
                  <View key={idx} style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '60%' }]}><Text>{school}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{data.total || 0}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{data.siap || 0}</Text></View>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}

        {/* Integriti Data */}
        {isIntegriti && formData.integriti && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Laporan Unit Integriti (UI) 2025</Text>
              <View style={[styles.table, { backgroundColor: '#FDE047' }]}>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text style={{ color: '#0a1e3b', fontWeight: 'bold' }}>JUMLAH PROGRAM / AKTIVITI INTEGRITI</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text style={{ color: '#0a1e3b', fontWeight: 'bold' }}>{String(formData.integriti.tadbirUrus.program || 0)}</Text></View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tadbir Urus & Multimedia</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statsColumn}>
                  <View style={styles.infoCard}>
                    <Text style={styles.infoCardLabel}>Mesyuarat Tatakelola</Text>
                    <Text style={styles.infoCardValue}>{String(formData.integriti.tadbirUrus.mesyuarat || 0)}</Text>
                    <Text style={styles.infoCardRef}>REF 2024: {String(INTEGRITI_2024_REFERENCE.tadbirUrus.mesyuarat)}</Text>
                  </View>
                </View>
                <View style={styles.statsColumn}>
                  <View style={styles.infoCard}>
                    <Text style={styles.infoCardLabel}>Video Dihasilkan</Text>
                    <Text style={styles.infoCardValue}>{String(formData.integriti.multimedia.video || 0)}</Text>
                    <Text style={styles.infoCardRef}>REF 2024: {String(INTEGRITI_2024_REFERENCE.multimedia.video)}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Dokumentasi Integriti</Text>
              <View style={styles.infoCard}>
                <View style={[styles.row, { marginBottom: 6 }]}>
                  <Text style={styles.infoCardLabel}>Manual</Text>
                  <Text style={[styles.value, { textAlign: 'right', fontWeight: 'bold', color: '#0a1e3b' }]}>{String(formData.integriti.dokumentasi.manual || 0)}</Text>
                </View>
                <View style={[styles.row, { marginBottom: 0 }]}>
                  <Text style={styles.infoCardLabel}>Polisi</Text>
                  <Text style={[styles.value, { textAlign: 'right', fontWeight: 'bold', color: '#0a1e3b' }]}>{String(formData.integriti.dokumentasi.polisi || 0)}</Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#0a1e3b', textTransform: 'uppercase' }}>Jumlah Besar</Text>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#0a1e3b' }}>{String(totalDokumentasiIntegriti)}</Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pautan Dokumen Integriti</Text>
              {integritiLinks.length > 0 ? (
                integritiLinks.map((link: any, idx: number) => (
                  <View key={idx} style={styles.linkCard}>
                    <Text style={styles.linkTitle}>{link.title || `Dokumen ${idx + 1}`}</Text>
                    <Text style={styles.linkUrl}>{link.url || '-'}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.emptyState}>Tiada pautan dokumen dimasukkan.</Text>
              )}
            </View>

            {/* Quality Initiatives inside Integriti */}
            {formData.quality && (
              <>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Inisiatif Kualiti</Text>
                  <View style={[styles.table, { backgroundColor: '#0D9488' }]}>
                    <View style={styles.tableRow}>
                      <View style={[styles.tableCell, { width: '70%' }]}><Text style={{ color: 'white', fontWeight: 'bold' }}>STATUS PENSIJILAN ISO</Text></View>
                      <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text style={{ color: 'white', fontWeight: 'bold' }}>{integritiCertificationStatus}</Text></View>
                    </View>
                  </View>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Audit ISO 9001:2015</Text>
                  <View style={styles.table}>
                    <View style={[styles.tableRow, styles.tableHeader]}>
                      <View style={[styles.tableCell, { width: '40%' }]}><Text>Kategori</Text></View>
                      <View style={[styles.tableCell, styles.tableCellCenter, { width: '60%' }]}><Text>Maklumat</Text></View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={[styles.tableCell, { width: '40%' }]}><Text>Badan Audit</Text></View>
                      <View style={[styles.tableCell, styles.tableCellCenter, { width: '60%' }]}><Text>{formData.quality.iso9001.badanAudit || '-'}</Text></View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={[styles.tableCell, { width: '40%' }]}><Text>Tarikh Audit</Text></View>
                      <View style={[styles.tableCell, styles.tableCellCenter, { width: '60%' }]}><Text>{formData.quality.iso9001.tarikhAudit || '-'}</Text></View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={[styles.tableCell, { width: '40%' }]}><Text>Syor Keputusan</Text></View>
                      <View style={[styles.tableCell, styles.tableCellCenter, { width: '60%' }]}><Text>{iso9001Status || '-'}</Text></View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={[styles.tableCell, { width: '40%' }]}><Text>NCR / OFI</Text></View>
                      <View style={[styles.tableCell, styles.tableCellCenter, { width: '60%' }]}><Text>{formData.quality.iso9001.ncr || 0} / {formData.quality.iso9001.ofi || 0}</Text></View>
                    </View>
                  </View>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Audit ISO 37001:2016 (ABMS)</Text>
                  <View style={styles.table}>
                    <View style={[styles.tableRow, styles.tableHeader]}>
                      <View style={[styles.tableCell, { width: '40%' }]}><Text>Kategori</Text></View>
                      <View style={[styles.tableCell, styles.tableCellCenter, { width: '60%' }]}><Text>Maklumat</Text></View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={[styles.tableCell, { width: '40%' }]}><Text>Badan Audit</Text></View>
                      <View style={[styles.tableCell, styles.tableCellCenter, { width: '60%' }]}><Text>{formData.quality.iso37001.badanAudit || '-'}</Text></View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={[styles.tableCell, { width: '40%' }]}><Text>Tarikh Audit</Text></View>
                      <View style={[styles.tableCell, styles.tableCellCenter, { width: '60%' }]}><Text>{formData.quality.iso37001.tarikhAudit || '-'}</Text></View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={[styles.tableCell, { width: '40%' }]}><Text>Syor Keputusan</Text></View>
                      <View style={[styles.tableCell, styles.tableCellCenter, { width: '60%' }]}><Text>{iso37001Status || '-'}</Text></View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={[styles.tableCell, { width: '40%' }]}><Text>NCR / OFI</Text></View>
                      <View style={[styles.tableCell, styles.tableCellCenter, { width: '60%' }]}><Text>{formData.quality.iso37001.ncr || 0} / {formData.quality.iso37001.ofi || 0}</Text></View>
                    </View>
                  </View>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Frameworks & Prestasi</Text>
                  {activeIntegritiFrameworks.length > 0 ? (
                    activeIntegritiFrameworks.map((framework) => (
                      <View key={framework} style={styles.linkCard}>
                        <Text style={styles.linkTitle}>{framework}</Text>
                      </View>
                    ))
                  ) : (
                    <Text style={styles.emptyState}>Tiada framework dipilih.</Text>
                  )}
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Inisiatif Kualiti Tambahan</Text>
                  {formData.quality.additionalInitiatives.length > 0 ? (
                    formData.quality.additionalInitiatives.map((initiative: any, idx: number) => (
                      <View key={idx} style={styles.linkCard}>
                        <Text style={styles.linkTitle}>{initiative.title || `Inisiatif ${idx + 1}`}</Text>
                        <Text style={styles.value}>{initiative.status || '-'}</Text>
                      </View>
                    ))
                  ) : (
                    <Text style={styles.emptyState}>Tiada inisiatif tambahan dimasukkan.</Text>
                  )}
                </View>
              </>
            )}
          </>
        )}

        {isBKSK && formData.bksk && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Laporan Pengislaman dan Saudara Kita 2025</Text>
              <View style={[styles.narrativeBox, { backgroundColor: '#0f766e', borderColor: '#0f766e', marginBottom: 12 }]}>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#ffffff', textTransform: 'uppercase', marginBottom: 4 }}>
                  Bahagian Kemajuan Saudara Kita (BKSK)
                </Text>
                <Text style={{ fontSize: 8.5, color: '#ccfbf1', textTransform: 'uppercase', letterSpacing: 1 }}>
                  Input data tahun 2025
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>1. Statistik Utama</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statsColumn}>
                  <View style={[styles.infoCard, { backgroundColor: '#ecfeff', borderColor: '#99f6e4' }]}>
                    <Text style={[styles.infoCardLabel, { color: '#0f766e' }]}>Pendaftaran Pengislaman</Text>
                    <Text style={styles.infoCardValue}>{String(formData.bksk.statistik.pendaftaranPengislaman || 0)}</Text>
                    <Text style={styles.infoCardRef}>Data 2025</Text>
                  </View>
                </View>
                <View style={styles.statsColumn}>
                  <View style={[styles.infoCard, { backgroundColor: '#f5efe3', borderColor: '#e7d8ba' }]}>
                    <Text style={[styles.infoCardLabel, { color: '#92400e' }]}>Program / Aktiviti</Text>
                    <Text style={styles.infoCardValue}>{String(formData.bksk.statistik.programAktiviti || 0)}</Text>
                    <Text style={styles.infoCardRef}>Data 2025</Text>
                  </View>
                </View>
              </View>
            </View>

            {[
              {
                title: '2. Kelas Bimbingan Saudara Kita',
                rows2025: formData.bksk.kelasBimbingan,
                columns: [
                  { key: 'kelas', label: 'Kelas' },
                  { key: 'guru', label: 'Guru' },
                ],
              },
              {
                title: '3. Urus Setia & Program Angkat (PROKASK)',
                rows2025: formData.bksk.urusSetiaProkask,
                columns: [
                  { key: 'urusSetia', label: 'Urus Setia' },
                  { key: 'prokask', label: 'PROKASK' },
                ],
              },
              {
                title: '4. Kampung Saudara Kita & Nuqaba Mualaf',
                rows2025: formData.bksk.kampungNuqaba,
                columns: [
                  { key: 'kampungSaudaraKita', label: 'Kg Saudara Kita' },
                  { key: 'nuqabaMualaf', label: 'Nuqaba Mualaf' },
                ],
              },
            ].map((section) => (
              <View key={section.title} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <View style={styles.table}>
                  <View style={[styles.tableRow, styles.tableHeader]}>
                    <View style={[styles.tableCell, { width: '40%' }]}><Text>Bahagian</Text></View>
                    {section.columns.map((column) => (
                      <View key={column.key} style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{column.label} 2025</Text></View>
                    ))}
                  </View>
                  {section.rows2025.map((row: any, index: number) => (
                    <View key={row.name} style={styles.tableRow}>
                      <View style={[styles.tableCell, { width: '40%' }]}><Text>{row.name}</Text></View>
                      {section.columns.map((column) => (
                        <View key={column.key} style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{row[column.key] || 0}</Text></View>
                      ))}
                    </View>
                  ))}
                  <View style={[styles.tableRow, styles.tableHeader]}>
                    <View style={[styles.tableCell, { width: '40%' }]}><Text>JUMLAH</Text></View>
                    {section.columns.map((column) => (
                      <View key={column.key} style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}>
                        <Text>{section.rows2025.reduce((sum: number, row: any) => sum + (parseInt(row[column.key]) || 0), 0)}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </>
        )}

        {/* BPPI Data */}
        {isBPPI && formData.bppi && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>1. Institusi Pendidikan Islam 2025</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Kategori</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>Ref 2024</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>2025</Text></View>
                </View>
                {/* MIS Breakdown */}
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>MIS (Rendah)</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BPPI_2024_REFERENCE.institusi.mis.rendah}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bppi.institusi.mis.rendah || 0}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>MIS (Menengah)</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BPPI_2024_REFERENCE.institusi.mis.menengah}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bppi.institusi.mis.menengah || 0}</Text></View>
                </View>
                {/* IPIP Breakdown */}
                {[
                  { label: 'Tadika Islam', field: 'tadika', ref: BPPI_2024_REFERENCE.institusi.ipip.tadika },
                  { label: 'Sekolah Agama Rakyat (KAFA)', field: 'kafa', ref: BPPI_2024_REFERENCE.institusi.ipip.kafa },
                  { label: 'Sekolah Rendah Agama Rakyat (SRAR)', field: 'srar', ref: BPPI_2024_REFERENCE.institusi.ipip.srar },
                  { label: 'Sekolah Rendah Agama', field: 'sra', ref: BPPI_2024_REFERENCE.institusi.ipip.sra },
                  { label: 'Sekolah Menengah Agama', field: 'sma', ref: BPPI_2024_REFERENCE.institusi.ipip.sma },
                  { label: 'Tahfiz Rendah', field: 'tahfizRendah', ref: BPPI_2024_REFERENCE.institusi.ipip.tahfizRendah },
                  { label: 'Tahfiz Menengah', field: 'tahfizMenengah', ref: BPPI_2024_REFERENCE.institusi.ipip.tahfizMenengah },
                  { label: 'Tahfiz Rendah & Menengah', field: 'tahfizRendahMenengah', ref: BPPI_2024_REFERENCE.institusi.ipip.tahfizRendahMenengah },
                  { label: 'Pondok', field: 'pondok', ref: BPPI_2024_REFERENCE.institusi.ipip.pondok },
                  { label: 'Lepasan SPM', field: 'lepasanSpm', ref: BPPI_2024_REFERENCE.institusi.ipip.lepasanSpm },
                  { label: 'Kelas Dewasa', field: 'dewasa', ref: BPPI_2024_REFERENCE.institusi.ipip.dewasa },
                ].map(item => (
                  <View key={item.field} style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '40%' }]}><Text>{item.label}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{item.ref}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bppi.institusi.ipip[item.field] || 0}</Text></View>
                  </View>
                ))}
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>JUMLAH BESAR INSTITUSI</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BPPI_2024_REFERENCE.institusi.grandTotal}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{(parseInt(formData.bppi.institusi.mis.rendah) || 0) + (parseInt(formData.bppi.institusi.mis.menengah) || 0) + Object.values(formData.bppi.institusi.ipip || {}).reduce((a: number, b: any) => a + (parseInt(b) || 0), 0)}</Text></View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>2. Enrolmen Pelajar Sekolah Agama MIS 2025</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '50%' }]}><Text>Nama Sekolah</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '25%' }]}><Text>Ref 2024</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '25%' }]}><Text>2025</Text></View>
                </View>
                {formData.bppi.enrolmenMIS.map((school: any, idx: number) => (
                  <View key={idx} style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '50%' }]}><Text>{school.name}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '25%' }]}><Text>{BPPI_2024_REFERENCE.enrolmenMIS[idx].value.toLocaleString()}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '25%' }]}><Text>{(parseInt(school.value) || 0).toLocaleString()}</Text></View>
                  </View>
                ))}
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '50%' }]}><Text>JUMLAH ENROLMEN</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '25%' }]}><Text>{BPPI_2024_REFERENCE.enrolmenMIS.reduce((a,b)=>a+b.value,0).toLocaleString()}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '25%' }]}><Text>{formData.bppi.enrolmenMIS.reduce((acc: number, s: any) => acc + (parseInt(s.value) || 0), 0).toLocaleString()}</Text></View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>3. Kelas al-Quran dan Fardu Ain (KAFA)</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Kategori</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>Ref 2024</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>2025</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Bilangan Pelajar</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BPPI_2024_REFERENCE.kafa.pelajar.toLocaleString()}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{(parseInt(formData.bppi.kafa.pelajar) || 0).toLocaleString()}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Bilangan Guru</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BPPI_2024_REFERENCE.kafa.guru.toLocaleString()}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{(parseInt(formData.bppi.kafa.guru) || 0).toLocaleString()}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Bilangan Penyelia</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{BPPI_2024_REFERENCE.kafa.penyelia.toLocaleString()}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{(parseInt(formData.bppi.kafa.penyelia) || 0).toLocaleString()}</Text></View>
                </View>
              </View>

              <Text style={[styles.subtitle, { fontWeight: 'bold', marginTop: 10, marginBottom: 5 }]}>Statistik UPKK 2025</Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '50%', backgroundColor: '#f9fafb' }]}><Text>Bilangan Calon UPKK</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '25%' }]}><Text>Ref 24: {BPPI_2024_REFERENCE.kafa.upkk.calon.toLocaleString()}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '25%' }]}><Text>{formData.bppi.kafa.upkk.calon || 0}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '50%', backgroundColor: '#f9fafb' }]}><Text>Gred Purata Skor (GPS)</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '25%' }]}><Text>Ref 24: {BPPI_2024_REFERENCE.kafa.upkk.gps}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '25%', color: '#2563eb', fontWeight: 'bold' }]}><Text>{String(formData.bppi.kafa.upkk.gps || '0.00')}</Text></View>
                </View>
              </View>

              <Text style={[styles.subtitle, { fontWeight: 'bold', marginTop: 10, marginBottom: 5 }]}>Trend Tahunan UPKK</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '34%' }]}><Text>Tahun</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '33%' }]}><Text>Bil. Calon</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '33%' }]}><Text>GPS</Text></View>
                </View>
                {formData.bppi.kafa.trendUPKK.map((t: any) => (
                  <View key={t.year} style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '34%' }]}><Text>{t.year}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '33%' }]}><Text>{t.calon || '-'}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '33%' }]}><Text>{t.gps || '-'}</Text></View>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>4. Kelas Agama Dewasa (KAD) 2025</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Bilangan Guru (Lelaki):</Text>
                <Text style={styles.value}>{formData.bppi.kad.guruLelaki || 0} (Ref 24: {BPPI_2024_REFERENCE.kad.guru.lelaki})</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Bilangan Guru (Wanita):</Text>
                <Text style={styles.value}>{formData.bppi.kad.guruWanita || 0} (Ref 24: {BPPI_2024_REFERENCE.kad.guru.wanita})</Text>
              </View>
              <View style={[styles.row, { marginBottom: 10 }]}>
                <Text style={styles.label}>Jumlah Guru KAD:</Text>
                <Text style={[styles.value, { fontWeight: 'bold' }]}>{(parseInt(formData.bppi.kad.guruLelaki) || 0) + (parseInt(formData.bppi.kad.guruWanita) || 0)}</Text>
              </View>

              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Bahagian</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>Bil. Kelas</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>Bil. Pelajar</Text></View>
                </View>
                {formData.bppi.kad.pecahan.map((p: any) => (
                  <View key={p.name} style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '40%' }]}><Text>{p.name}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{p.kelas || 0}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{p.pelajar || 0}</Text></View>
                  </View>
                ))}
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>JUMLAH KESELURUHAN</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bppi.kad.pecahan.reduce((a:any, b:any) => a + (parseInt(b.kelas) || 0), 0)}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.bppi.kad.pecahan.reduce((a:any, b:any) => a + (parseInt(b.pelajar) || 0), 0)}</Text></View>
                </View>
              </View>
            </View>
          </>
        )}

        {/* Finance Data */}
        {isFinance && formData.finance && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Bajet & Belanjawan 2025</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Kategori</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>Ref 2024 (RM)</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>2025 (RM)</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Peruntukan Lulus</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{FINANCE_2024_REFERENCE.financeYears[3].lulus.toLocaleString()}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{parseInt(formData.finance.financeYears[0].lulus || 0).toLocaleString()}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Perbelanjaan</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{FINANCE_2024_REFERENCE.financeYears[3].belanja.toLocaleString()}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{parseInt(formData.finance.financeYears[0].belanja || 0).toLocaleString()}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Baki</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{(FINANCE_2024_REFERENCE.financeYears[3].lulus - FINANCE_2024_REFERENCE.financeYears[3].belanja).toLocaleString()}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{( (parseInt(formData.finance.financeYears[0].lulus) || 0) - (parseInt(formData.finance.financeYears[0].belanja) || 0) ).toLocaleString()}</Text></View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Prestasi & Hasil</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Kutipan Hasil (RM):</Text>
                <Text style={styles.value}>{parseInt(formData.finance.financeYears[0].hasil || 0).toLocaleString()} (Ref 24: {FINANCE_2024_REFERENCE.financeYears[3].hasil.toLocaleString()})</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Prestasi Belanja (%):</Text>
                <Text style={styles.value}>{formData.finance.percentageBelanja || 0}% (Ref 24: {FINANCE_2024_REFERENCE.percentageBelanja}%)</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Pencapaian eCSA (%):</Text>
                <Text style={styles.value}>{formData.finance.percentageEcsa || 0}% (Ref 24: {FINANCE_2024_REFERENCE.percentageEcsa}%)</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Naziran & Inspektorat Perbendaharaan</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Bahagian</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>Naziran</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>Rating</Text></View>
                </View>
                {formData.finance.financeDistricts.map((district: any) => (
                  <View key={district.name} style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '40%' }]}><Text>{district.name}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{district.naziran ? 'Selesai' : 'Belum'}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{district.starRating}/5</Text></View>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}

        {/* Pentadbiran Leadership Data */}
        {isPentadbiran && formData.leadership && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Unit Pentadbiran - Kepimpinan (2025)</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Mesyuarat / Perhimpunan</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>Ref 2024</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>2025</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>J.P.T.O</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{LEADERSHIP_2024_REFERENCE.jpto}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.leadership.jpto}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>M.P.J</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{LEADERSHIP_2024_REFERENCE.mpj}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.leadership.mpj}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Pegawai Agama Bahagian</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{LEADERSHIP_2024_REFERENCE.pegawaiAgama}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.leadership.pegawaiAgama}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Perhimpunan Bersama Pengurusan</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{LEADERSHIP_2024_REFERENCE.perhimpunan.total}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.leadership.perhimpunan.total}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Pengurusan Aset Alih</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{LEADERSHIP_2024_REFERENCE.aset}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.leadership.aset}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Keselamatan</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{LEADERSHIP_2024_REFERENCE.keselamatan}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.leadership.keselamatan}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Kader (HEI)</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{LEADERSHIP_2024_REFERENCE.kader}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.leadership.kader}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Kewangan & Perolehan</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{LEADERSHIP_2024_REFERENCE.kewanganPerolehan}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.leadership.kewanganPerolehan}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Panel HR Agensi</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{LEADERSHIP_2024_REFERENCE.panelHR.total}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.leadership.panelHR.total}</Text></View>
                </View>
              </View>
            </View>
          </>
        )}

        {/* HR Specific Data */}
        {isHR && formData.hr && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ringkasan Perjawatan (2025)</Text>
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
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Jumlah Warga Kerja</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{HR_2024_REFERENCE.ringkasan.jumlahWargaKerja}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.hr.ringkasan.jumlahWargaKerja}</Text></View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Demografi & Skim Perkhidmatan (2025)</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Kategori</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>2024</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>2025</Text></View>
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
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>JUSA</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{HR_2024_REFERENCE.skim.jusa}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.hr.skim.jusa}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Hal Ehwal Islam</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{HR_2024_REFERENCE.skim.halEhwalIslam}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.hr.skim.halEhwalIslam}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Perundangan</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{HR_2024_REFERENCE.skim.perundangan}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.hr.skim.perundangan}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Kewangan</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{HR_2024_REFERENCE.skim.kewangan}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.hr.skim.kewangan}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Pendidikan</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{HR_2024_REFERENCE.skim.pendidikan}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.hr.skim.pendidikan}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '40%' }]}><Text>Pentadbiran</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{HR_2024_REFERENCE.skim.pentadbiran}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.hr.skim.pentadbiran}</Text></View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Kakitangan Sangkutan & Persaraan (2025)</Text>
              <View style={styles.row}><Text style={styles.label}>Pekhidmat MIS:</Text><Text style={styles.value}>{formData.hr.sangkutan.mis}</Text></View>
              <View style={styles.row}><Text style={styles.label}>Penyelia KAFA:</Text><Text style={styles.value}>{formData.hr.sangkutan.jakim.penyeliaKafa}</Text></View>
              <View style={styles.row}><Text style={styles.label}>Jumlah Bersara:</Text><Text style={styles.value}>{formData.hr.bersara}</Text></View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Kakitangan Naik Pangkat (2025)</Text>
              {formData.hr.naikPangkat && formData.hr.naikPangkat.length > 0 ? (
                <View style={styles.table}>
                  <View style={[styles.tableRow, styles.tableHeader]}>
                    <View style={[styles.tableCell, { width: '36%' }]}><Text>Nama Kakitangan</Text></View>
                    <View style={[styles.tableCell, { width: '32%' }]}><Text>Pangkat Semasa</Text></View>
                    <View style={[styles.tableCell, { width: '32%' }]}><Text>Pangkat Baru</Text></View>
                  </View>
                  {formData.hr.naikPangkat.map((item: any, index: number) => (
                    <View key={index} style={styles.tableRow}>
                      <View style={[styles.tableCell, { width: '36%' }]}><Text>{item.nama || '-'}</Text></View>
                      <View style={[styles.tableCell, { width: '32%' }]}><Text>{item.pangkatSemasa || '-'}</Text></View>
                      <View style={[styles.tableCell, { width: '32%' }]}><Text>{item.pangkatBaru || '-'}</Text></View>
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={styles.emptyState}>Tiada rekod kenaikan pangkat.</Text>
              )}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Kakitangan HLDP / Menyambung Pengajian 2025</Text>
              {formData.hr.hldp && formData.hr.hldp.length > 0 ? (
                <View style={styles.table}>
                  <View style={[styles.tableRow, styles.tableHeader]}>
                    <View style={[styles.tableCell, { width: '34%' }]}><Text>Nama</Text></View>
                    <View style={[styles.tableCell, { width: '33%' }]}><Text>Jawatan</Text></View>
                    <View style={[styles.tableCell, { width: '33%' }]}><Text>Jenis Pengajian</Text></View>
                  </View>
                  {formData.hr.hldp.map((item: any, index: number) => (
                    <View key={index} style={styles.tableRow}>
                      <View style={[styles.tableCell, { width: '34%' }]}><Text>{item.nama || '-'}</Text></View>
                      <View style={[styles.tableCell, { width: '33%' }]}><Text>{item.jawatan || '-'}</Text></View>
                      <View style={[styles.tableCell, { width: '33%' }]}><Text>{item.jenisPengajian || '-'}</Text></View>
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={styles.emptyState}>Tiada rekod HLDP / pengajian.</Text>
              )}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Taburan Kakitangan Ibu Pejabat (2025)</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text>Bahagian / Unit</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>Jumlah</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text>BPPS</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.hr.taburan.ibuPejabat.bpps}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text>BPNP</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.hr.taburan.ibuPejabat.bpnp}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text>Dakwah</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.hr.taburan.ibuPejabat.dakwah}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text>BKIM</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.hr.taburan.ibuPejabat.bkim}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text>BPKS</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.hr.taburan.ibuPejabat.bpks}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text>BKKI</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.hr.taburan.ibuPejabat.bkki}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text>BPH</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.hr.taburan.ibuPejabat.bph}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text>BPDS</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.hr.taburan.ibuPejabat.bpds}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text>BKSK</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.hr.taburan.ibuPejabat.bksk}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text>BKSP</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.hr.taburan.ibuPejabat.bksp}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text>Kaunseling</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.hr.taburan.ibuPejabat.kaunseling}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text>UKOKO</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.hr.taburan.ibuPejabat.ukoko}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text>UPP</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.hr.taburan.ibuPejabat.upp}</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text>Integriti</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.hr.taburan.ibuPejabat.integriti}</Text></View>
                </View>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text>JUMLAH IBU PEJABAT</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.hr.taburan.ibuPejabat.total}</Text></View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Taburan Kakitangan Mengikut Daerah (2025)</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text>Daerah</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>Jumlah</Text></View>
                </View>
                {formData.hr.taburan.daerah.map((daerah: any) => (
                  <View key={daerah.name} style={styles.tableRow}>
                    <View style={[styles.tableCell, { width: '70%' }]}><Text>{daerah.name}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{daerah.value}</Text></View>
                  </View>
                ))}
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <View style={[styles.tableCell, { width: '70%' }]}><Text>JUMLAH DAERAH</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '30%' }]}><Text>{formData.hr.taburan.totalDaerah}</Text></View>
                </View>
              </View>
            </View>

            <View style={[styles.section, { backgroundColor: '#f0fdfa', padding: 10, borderRadius: 5 }]}>
              <View style={styles.row}>
                <Text style={[styles.label, { fontSize: 12, color: '#134e4a' }]}>JUMLAH BESAR KESELURUHAN:</Text>
                <Text style={[styles.value, { fontSize: 14, color: '#0f766e', fontWeight: 'bold' }]}>{formData.hr.taburan.grandTotal}</Text>
              </View>
            </View>

            {formData.latihan && (
              <View style={styles.section} break>
                <Text style={styles.sectionTitle}>Latihan Sumber Manusia (2025)</Text>
                <View style={styles.row}>
                  <Text style={styles.label}>Jumlah Latihan:</Text>
                  <Text style={styles.value}>{formData.latihan.ringkasan.jumlah}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Pecahan (Generik / Spesifik):</Text>
                  <Text style={styles.value}>{formData.latihan.ringkasan.generik} / {formData.latihan.ringkasan.spesifik}</Text>
                </View>

                <Text style={[styles.sectionTitle, { marginTop: 10 }]}>Pencapaian Jam Latihan Kakitangan</Text>
                <View style={styles.table}>
                  <View style={[styles.tableRow, styles.tableHeader]}>
                    <View style={[styles.tableCell, { width: '40%' }]}><Text>Rekod Pencapaian</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '15%' }]}><Text>P&P</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '15%' }]}><Text>SK 1</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '15%' }]}><Text>SK 2</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '15%' }]}><Text>Jumlah</Text></View>
                  </View>
                  {[
                    { label: 'Telah Mencapai', key: 'mencapai' },
                    { label: 'Tidak Mencapai', key: 'tidakMencapai' },
                    { label: 'Tiada Rekod', key: 'tiadaRekod' },
                  ].map((row) => (
                    <View key={row.key} style={styles.tableRow}>
                      <View style={[styles.tableCell, { width: '40%' }]}><Text>{row.label}</Text></View>
                      <View style={[styles.tableCell, styles.tableCellCenter, { width: '15%' }]}><Text>{formData.latihan.pencapaian[row.key].pp} ({formData.latihan.pencapaian[row.key].ppPct}%)</Text></View>
                      <View style={[styles.tableCell, styles.tableCellCenter, { width: '15%' }]}><Text>{formData.latihan.pencapaian[row.key].sk1} ({formData.latihan.pencapaian[row.key].sk1Pct}%)</Text></View>
                      <View style={[styles.tableCell, styles.tableCellCenter, { width: '15%' }]}><Text>{formData.latihan.pencapaian[row.key].sk2} ({formData.latihan.pencapaian[row.key].sk2Pct}%)</Text></View>
                      <View style={[styles.tableCell, styles.tableCellCenter, { width: '15%' }]}><Text>{formData.latihan.pencapaian[row.key].total} ({formData.latihan.pencapaian[row.key].totalPct}%)</Text></View>
                    </View>
                  ))}
                  <View style={[styles.tableRow, styles.tableHeader]}>
                    <View style={[styles.tableCell, { width: '40%' }]}><Text>JUMLAH KESELURUHAN</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '15%' }]}><Text>{formData.latihan.pencapaian.jumlahKeseluruhan.pp}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '15%' }]}><Text>{formData.latihan.pencapaian.jumlahKeseluruhan.sk1}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '15%' }]}><Text>{formData.latihan.pencapaian.jumlahKeseluruhan.sk2}</Text></View>
                    <View style={[styles.tableCell, styles.tableCellCenter, { width: '15%' }]}><Text>{formData.latihan.pencapaian.jumlahKeseluruhan.total}</Text></View>
                  </View>
                </View>
              </View>
            )}
          </>
        )}

        {/* Narrative Sections */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Ringkasan Pencapaian Utama 2025</Text>
          <View style={styles.narrativeBox}>
            <Text style={styles.narrativeText}>{formData.ringkasan || 'Tiada maklumat disediakan.'}</Text>
          </View>
        </View>

        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Isu & Cabaran</Text>
          <View style={styles.narrativeBox}>
            <Text style={styles.narrativeText}>{formData.isu || 'Tiada maklumat disediakan.'}</Text>
          </View>
        </View>

        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Cadangan Penambahbaikan</Text>
          <View style={styles.narrativeBox}>
            <Text style={styles.narrativeText}>{formData.cadangan || 'Tiada maklumat disediakan.'}</Text>
          </View>
        </View>

        {/* Lawatan */}
        {formData.lawatan && formData.lawatan.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rekod Lawatan</Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <View style={[styles.tableCell, { width: '15%' }]}><Text style={styles.tableCellHeader}>Jenis</Text></View>
                <View style={[styles.tableCell, { width: '35%' }]}><Text style={styles.tableCellHeader}>Tajuk/Agensi</Text></View>
                <View style={[styles.tableCell, { width: '25%' }]}><Text style={styles.tableCellHeader}>Tarikh/Tempat</Text></View>
                <View style={[styles.tableCell, { width: '25%' }]}><Text style={styles.tableCellHeader}>Objektif</Text></View>
              </View>
              {formData.lawatan.map((item: any, idx: number) => (
                <View key={idx} style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '15%' }]}><Text>{item.jenis}</Text></View>
                  <View style={[styles.tableCell, { width: '35%' }]}><Text style={{ fontWeight: 'bold' }}>{item.tajukAgensi}</Text></View>
                  <View style={[styles.tableCell, { width: '25%' }]}><Text>{item.tarikh} @ {item.tempat}</Text></View>
                  <View style={[styles.tableCell, { width: '25%' }]}><Text>{item.objektif}</Text></View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Signature Section */}
        <View style={styles.signatureSection} wrap={false}>
          {/* Left: Disediakan Oleh */}
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>DISEDIAKAN OLEH:</Text>
            <View style={{ height: 40 }} />
            <View style={styles.signatureLine} />
            <Text style={styles.signatureDetail}>Nama: {formData.disediakanOleh || '................................'}</Text>
            <Text style={styles.signatureDetail}>Jawatan: {formData.jawatan || '................................'}</Text>
            <Text style={styles.signatureDetail}>Tarikh: {formData.tarikh || '................................'}</Text>
          </View>

          {/* Right: Disahkan Oleh */}
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>DISAHKAN OLEH:</Text>
            <View style={{ height: 40 }} />
            <View style={styles.signatureLine} />
            <Text style={styles.signatureDetail}>Nama: ................................</Text>
            <Text style={styles.signatureDetail}>Jawatan: ................................</Text>
            <Text style={styles.signatureDetail}>Tarikh: ................................</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Jabatan Agama Islam Sarawak (JAIS)</Text>
          <Text style={styles.footerText} render={({ pageNumber, totalPages }) => (
            `Halaman ${pageNumber} dari ${totalPages}`
          )} />
        </View>
      </Page>
    </Document>
  );
};

export default ReportPDF;
