import React from 'react';
import BkimForm from './forms/BkimForm';
import BpnpForm from './forms/BpnpForm';
import UppForm from './forms/UppForm';
import DakwahForm from './forms/DakwahForm';
import BkspForm from './forms/BkspForm';
import BpdsForm from './forms/BpdsForm';
import HrForm from './forms/HrForm';
import BppsForm from './forms/BppsForm';
import BkkiForm from './forms/BkkiForm';
import BppiForm from './forms/BppiForm';
import BphForm from './forms/BphForm';
import BpksForm from './forms/BpksForm';
import UkokoForm from './forms/UkokoForm';
import UkokoPenerbitanForm from './forms/UkokoPenerbitanForm';
import UkokoPublicRelationsForm from './forms/UkokoPublicRelationsForm';
import DhqcForm from './forms/DhqcForm';
import BkskForm from './forms/BkskForm';
import GenericForm from './forms/GenericForm';
import IntegritiForm from './forms/IntegritiForm';

interface FormEntryProps {
  deptName: string;
  onBack: () => void;
}

const BKSK_FORM_PASSWORD = 'BKSKJ@IS';
const BKSK_FORM_UNLOCK_KEY = 'jais_bksk_form_unlocked';

const FormEntry: React.FC<FormEntryProps> = ({ deptName, onBack }) => {
  const normalizedDeptName = deptName.toUpperCase();
  const [isBkskUnlocked, setIsBkskUnlocked] = React.useState(() => {
    if (typeof window === 'undefined') return false;

    try {
      return window.sessionStorage.getItem(BKSK_FORM_UNLOCK_KEY) === 'true';
    } catch (error) {
      console.error('Failed to read BKSK form access state', error);
      return false;
    }
  });

  React.useEffect(() => {
    const isBkskPage = normalizedDeptName.includes('BKSK') || normalizedDeptName.includes('SAUDARA KITA');
    if (!isBkskPage || isBkskUnlocked) return;

    const enteredPassword = window.prompt('Masukkan kata laluan untuk akses Bahagian Kemajuan Saudara Kita (BKSK):');

    if (enteredPassword === BKSK_FORM_PASSWORD) {
      try {
        window.sessionStorage.setItem(BKSK_FORM_UNLOCK_KEY, 'true');
      } catch (error) {
        console.error('Failed to persist BKSK form access state', error);
      }

      setIsBkskUnlocked(true);
      return;
    }

    if (enteredPassword !== null) {
      window.alert('Kata laluan tidak tepat.');
    }

    onBack();
  }, [isBkskUnlocked, normalizedDeptName, onBack]);

  const isBkskPage = normalizedDeptName.includes('BKSK') || normalizedDeptName.includes('SAUDARA KITA');

  if (isBkskPage && !isBkskUnlocked) {
    return null;
  }

  // Route to specific form components based on department name
  
  // Explicitly handle BPPS sub-units first to avoid conflict with BPNP/BPP check
  if (normalizedDeptName.includes('BPPS')) {
    if (normalizedDeptName.includes('HR')) {
      return <HrForm deptName={deptName} onBack={onBack} />;
    }
    return <BppsForm deptName={deptName} onBack={onBack} />;
  }

  if (normalizedDeptName.includes('BKIM')) {
    return <BkimForm deptName={deptName} onBack={onBack} />;
  }

  if (normalizedDeptName.includes('BKKI')) {
    return <BkkiForm deptName={deptName} onBack={onBack} />;
  }

  if (normalizedDeptName.includes('INTEGRITI')) {
    return <IntegritiForm deptName={deptName} onBack={onBack} />;
  }
  
  if (normalizedDeptName.includes('BPH')) {
    return <BphForm deptName={deptName} onBack={onBack} />;
  }

  if (normalizedDeptName.includes('BKSK') || normalizedDeptName.includes('SAUDARA KITA')) {
    return <BkskForm deptName={deptName} onBack={onBack} />;
  }
  
  if (normalizedDeptName.includes('BPKS')) {
    return <BpksForm onBack={onBack} />;
  }

  if (normalizedDeptName.includes('UKOKO')) {
    if (normalizedDeptName.includes('KOMUNIKASI DAN PUSAT SUMBER') || normalizedDeptName.includes('UKPS')) {
      return <UkokoPublicRelationsForm deptName={deptName} onBack={onBack} />;
    }
    if (normalizedDeptName.includes('PENGURUSAN ACARA')) {
      return <UkokoForm deptName={deptName} onBack={onBack} />;
    }
    if (normalizedDeptName.includes('PENERBITAN')) {
      return <UkokoPenerbitanForm deptName={deptName} onBack={onBack} />;
    }
    return <UkokoForm deptName={deptName} onBack={onBack} />;
  }
  
  if (normalizedDeptName.includes('BPPI')) {
    return <BppiForm deptName={deptName} onBack={onBack} />;
  }
  
  if (normalizedDeptName.includes('BPNP') || normalizedDeptName.includes('BPP')) {
    return <BpnpForm deptName={deptName} onBack={onBack} />;
  }

  if (normalizedDeptName.includes('UPP')) {
    return <UppForm deptName={deptName} onBack={onBack} />;
  }

  if (normalizedDeptName.includes('DAKWAH') || normalizedDeptName.includes('BDKWH')) {
    return <DakwahForm deptName={deptName} onBack={onBack} />;
  }

  if (normalizedDeptName.includes('BKSP') || normalizedDeptName.includes('KAUNSELING')) {
    return <BkspForm deptName={deptName} onBack={onBack} />;
  }

  if (normalizedDeptName.includes('BPDS') || normalizedDeptName.includes('PENDAKWAAN')) {
    return <BpdsForm deptName={deptName} onBack={onBack} />;
  }

  if (normalizedDeptName.includes('DHQC')) {
    return <DhqcForm onBack={onBack} />;
  }

  // Default to generic form for other departments
  return <GenericForm deptName={deptName} onBack={onBack} />;
};

export default FormEntry;
