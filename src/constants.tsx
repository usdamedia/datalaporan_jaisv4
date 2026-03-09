import React from 'react';
import { Department } from './types';
import { 
  Building2, 
  Briefcase, 
  Scale, 
  Users, 
  ShieldCheck, 
  FileText, 
  Activity, 
  Globe, 
  Cpu, 
  Landmark,
  Zap,
  BookOpen,
  PenTool,
  HardHat, // Added for UPP
  Gavel, // Added for Pendakwaan
  Book // Added for DHQC
} from 'lucide-react';

export const DEPARTMENTS: Department[] = [
  { id: '1', name: 'BPNP', active: true }, // Renamed from BP&P
  { id: '2', name: 'BDKWH', active: true },
  { id: '3', name: 'BKIM', active: true },
  { 
    id: '4', 
    name: 'BPPS', 
    active: true,
    subUnits: [
      { id: '4a', name: 'U Pentadbiran', active: true },
      { id: '4b', name: 'U Kualiti', active: true },
      { id: '4c', name: 'U HR & Latihan', active: true },
      { id: '4d', name: 'U Akaun', active: true },
    ]
  },
  { id: '5', name: 'BPKS', active: true },
  { id: '6', name: 'BPH', active: true },
  { id: '7', name: 'BKKI', active: true },
  { id: '8', name: 'BPPI', active: true },
  { id: '9', name: 'UKOKO', active: true },
  { id: '10', name: 'U. INTEGRITI', active: true },
  { id: '11', name: 'BKSK', active: true },
  { id: '12', name: 'BKSPP', active: true },
  { id: '13', name: 'UPP', active: true },
  { id: '14', name: 'BPDS', active: true },
  { id: '15', name: 'DHQC', active: true },
];

export const getIconForDept = (name: string) => {
  // Logic icons based on department names (Keywords)
  if (name.includes('UPP')) return <HardHat className="w-6 h-6" />;
  if (name.includes('BPPS') || name.includes('Pentadbiran')) return <Users className="w-6 h-6" />;
  if (name.includes('Akaun')) return <Landmark className="w-6 h-6" />;
  if (name.includes('Kualiti')) return <ShieldCheck className="w-6 h-6" />;
  if (name.includes('INTEGRITI')) return <Scale className="w-6 h-6" />;
  if (name.includes('UKOKO')) return <Activity className="w-6 h-6" />;
  if (name.includes('BKKI')) return <Globe className="w-6 h-6" />;
  if (name.includes('BKSPP')) return <BookOpen className="w-6 h-6" />;
  if (name.includes('BPKS')) return <Zap className="w-6 h-6" />;
  if (name.includes('HR')) return <Briefcase className="w-6 h-6" />;
  if (name.includes('BPDS') || name.includes('Pendakwaan')) return <Gavel className="w-6 h-6" />;
  if (name.includes('DHQC')) return <Book className="w-6 h-6" />;
  
  // Default icon
  return <Building2 className="w-6 h-6" />;
};

export const SARAWAK_DIVISIONS = [
  "Kuching", "Samarahan", "Serian", "Sri Aman", "Betong", 
  "Sarikei", "Sibu", "Kapit", "Mukah", "Bintulu", "Miri", "Limbang"
];

export const SCHOOL_LIST = [
  "SMKA Sheikh Haji Othman Abdul Wahab",
  "SMKA Matang",
  "SMKA Saratok",
  "SMKA Igan",
  "SMKA Sibu",
  "SMKA Miri",
  "SMKA Limbang",
  "SMKA Tun Ahmad Zaidi",
  "SKA MIS Sibu",
  "SMK Pesantren Abdul Taib",
  "SKA (MIS) Datuk Haji Abdul Kadir Hasan",
  "SKA (MIS) Ibnu Khaldun",
  "SKA (MIS) Sarikei",
  "SKA (MIS) Mukah",
  "SKA (MIS) Bintulu",
  "SKA (MIS) Miri",
  "SKA (MIS) Lawas"
];