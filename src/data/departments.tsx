import React from 'react';
import {
  Activity,
  Book,
  BookOpen,
  Briefcase,
  Building2,
  Gavel,
  Globe,
  HardHat,
  Landmark,
  Scale,
  ShieldCheck,
  Users,
  Zap,
} from 'lucide-react';
import { Department } from '../types';

export const DEPARTMENTS: Department[] = [
  { id: '13', name: 'UPP UNIT PENGURUSAN PROJEK', active: true },
  { id: '17', name: 'UNIT INTEGRITI', active: true, completed: true },
  {
    id: '1',
    name: 'Bahagian Pentadbiran & Pengurusan Sumber BPPS',
    active: true,
    subUnits: [
      { id: 'bpps-pentadbiran', name: 'Unit Pentadbiran', active: true },
      { id: 'bpps-akaun', name: 'Unit Akaun', active: true },
      { id: 'bpps-hr', name: 'Unit HR & Latihan', active: true },
    ],
  },
  {
    id: '15',
    name: 'Bahagian Perancangan dan Penyelidikan BPNP',
    active: true,
    subUnits: [
      { id: 'bpnp-penyelidikan', name: 'Unit Penyelidikan', active: true, completed: true },
      { id: 'bpnp-strategik', name: 'Unit Perancangan Strategik', active: true },
      { id: 'bpnp-akidah', name: 'Unit Akidah Tapisan', active: true },
    ],
  },
  {
    id: '2',
    name: 'Bahagian Dakwah BDAKWAH',
    active: true,
    subUnits: [
      { id: 'bdakwah-dashboard', name: 'Dashboard Utama', active: true },
      { id: 'bdakwah-alquran', name: 'Unit Al-Quran', active: true },
    ],
  },
  { id: '3', name: 'Bahagian Kemajuan Institusi Masjid BKIM', active: true },
  { id: '5', name: 'Bahagian Penguatkuasaan Syariah BPKS', active: true },
  { id: '7', name: 'Bahagian Kemajuan Keluarga Islam BKKI', active: true },
  { id: '6', name: 'Bahagian Pengurusan Halal BPH', active: true },
  { id: '14', name: 'Bahagian Pendakwaan Syariah BPDS', active: true },
  { id: '16', name: 'DHQC - Darul Hana Quranic Centre', active: true },
  { id: '11', name: 'Bahagian Kemajuan Saudara Kita BKSK', active: true },
  { id: '8', name: 'Bahagian Pengukuhan Pendidikan Islam BPPI', active: true },
  { id: '12', name: 'Bahagian Kaunseling Syarie & Pembangunan Psikologi BKSPP', active: true },
  {
    id: '9',
    name: 'Unit Komunikasi Korporat UKOKO',
    active: true,
    subUnits: [
      { id: 'ukoko-pr', name: 'Unit Komunikasi dan Pusat Sumber (UKPS)', active: true },
      { id: 'ukoko-perayaan', name: 'Unit Pengurusan Acara', active: true },
      { id: 'ukoko-penerbitan', name: 'Unit Penerbitan', active: true },
    ],
  },
];

export const getIconForDept = (name: string) => {
  const normalizedName = name.toUpperCase();

  if (normalizedName.includes('UPP')) return <HardHat className="w-6 h-6" />;
  if (normalizedName.includes('BPPS') || normalizedName.includes('PENTADBIRAN')) return <Users className="w-6 h-6" />;
  if (normalizedName.includes('AKAUN')) return <Landmark className="w-6 h-6" />;
  if (normalizedName.includes('KUALITI')) return <ShieldCheck className="w-6 h-6" />;
  if (normalizedName.includes('INTEGRITI') || normalizedName.includes(' UI')) return <Scale className="w-6 h-6" />;
  if (normalizedName.includes('UKOKO')) return <Activity className="w-6 h-6" />;
  if (normalizedName.includes('BKKI')) return <Globe className="w-6 h-6" />;
  if (normalizedName.includes('BKSPP')) return <BookOpen className="w-6 h-6" />;
  if (normalizedName.includes('BPKS')) return <Zap className="w-6 h-6" />;
  if (normalizedName.includes('HR')) return <Briefcase className="w-6 h-6" />;
  if (normalizedName.includes('BPDS') || normalizedName.includes('PENDAKWAAN')) return <Gavel className="w-6 h-6" />;
  if (normalizedName.includes('DHQC') || normalizedName.includes('DARUL HANA')) return <Book className="w-6 h-6" />;

  return <Building2 className="w-6 h-6" />;
};
