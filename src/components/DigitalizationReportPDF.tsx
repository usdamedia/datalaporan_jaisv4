import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#0d9488',
    paddingBottom: 20,
    marginBottom: 30,
  },
  logoContainer: {
    width: 65,
    height: 65,
    backgroundColor: '#0d9488',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0d9488',
    letterSpacing: 1,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 9,
    color: '#6b7280',
    fontWeight: 'medium',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  deptInfo: {
    alignItems: 'flex-end',
  },
  deptName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#c5a065',
    textAlign: 'right',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  tarikhText: {
    fontSize: 8,
    color: '#9ca3af',
    textAlign: 'right',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#0d9488',
    padding: '8 12',
    marginBottom: 15,
    borderRadius: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 0,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e5e7eb',
    minHeight: 28,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#f8fafc',
    borderBottomWidth: 2,
    borderBottomColor: '#0d9488',
  },
  tableCell: {
    padding: '8 10',
    fontSize: 8.5,
    color: '#334155',
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
});

interface DigitalizationReportPDFProps {
  data2025: any;
}

const DigitalizationReportPDF: React.FC<DigitalizationReportPDFProps> = ({ data2025 }) => {
  const platforms = [
    { id: 'fb', name: 'Facebook', v23: 152400, v24: 185600 },
    { id: 'ig', name: 'Instagram', v23: 45200, v24: 62800 },
    { id: 'tt', name: 'TikTok', v23: 21500, v24: 88400 },
    { id: 'yt', name: 'YouTube', v23: 12800, v24: 19200 },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.watermark}>DOKUMEN RASMI</Text>
        
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>JAIS</Text>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Laporan Tahunan 2025</Text>
              <Text style={styles.subtitle}>Jabatan Agama Islam Sarawak</Text>
            </View>
          </View>
          <View style={styles.deptInfo}>
            <Text style={styles.deptName}>DIGITALISASI</Text>
            <Text style={styles.tarikhText}>Tarikh Cetakan: {new Date().toLocaleDateString('ms-MY')}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistik Pertumbuhan Media Sosial</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={[styles.tableCell, { width: '20%' }]}><Text style={styles.tableCellHeader}>Platform</Text></View>
              <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text style={styles.tableCellHeader}>2023</Text></View>
              <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text style={styles.tableCellHeader}>2024</Text></View>
              <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text style={styles.tableCellHeader}>2025</Text></View>
              <View style={[styles.tableCell, { width: '20%' }]}><Text style={styles.tableCellHeader}>Catatan</Text></View>
            </View>
            
            {platforms.map(p => {
              const pData = data2025[p.id];
              return (
                <View key={p.id} style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '20%' }]}><Text style={{ fontWeight: 'bold' }}>{p.name}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{p.v23.toLocaleString()}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{p.v24.toLocaleString()}</Text></View>
                  <View style={[styles.tableCell, styles.tableCellCenter, { width: '20%' }]}><Text>{pData?.value?.toLocaleString() || '0'}</Text></View>
                  <View style={[styles.tableCell, { width: '20%' }]}><Text>{pData?.remark || '-'}</Text></View>
                </View>
              );
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default DigitalizationReportPDF;
