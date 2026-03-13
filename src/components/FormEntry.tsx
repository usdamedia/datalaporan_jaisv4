import React from 'react';
import BkimForm from './forms/BkimForm';
import BpnpForm from './forms/BpnpForm';
import UppForm from './forms/UppForm';
import IntegritiForm from './forms/IntegritiForm';
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
import UkokoPublicRelationsForm from './forms/UkokoPublicRelationsForm';
import DhqcForm from './forms/DhqcForm';
import GenericForm from './forms/GenericForm';

interface FormEntryProps {
  deptName: string;
  onBack: () => void;
}

const FormEntry: React.FC<FormEntryProps> = ({ deptName, onBack }) => {
  // Route to specific form components based on department name
  
  // Explicitly handle BPPS sub-units first to avoid conflict with BPNP/BPP check
  if (deptName.includes('BPPS')) {
    if (deptName.includes('HR')) {
      return <HrForm deptName={deptName} onBack={onBack} />;
    }
    return <BppsForm deptName={deptName} onBack={onBack} />;
  }

  if (deptName.includes('BKIM')) {
    return <BkimForm deptName={deptName} onBack={onBack} />;
  }

  if (deptName.includes('BKKI')) {
    return <BkkiForm deptName={deptName} onBack={onBack} />;
  }
  
  if (deptName.includes('BPH')) {
    return <BphForm deptName={deptName} onBack={onBack} />;
  }
  
  if (deptName.includes('BPKS')) {
    return <BpksForm onBack={onBack} />;
  }

  if (deptName.includes('UKOKO')) {
    if (deptName.includes('Komunikasi dan Pusat Sumber')) {
      return <UkokoPublicRelationsForm deptName={deptName} onBack={onBack} />;
    }
    return <UkokoForm deptName={deptName} onBack={onBack} />;
  }
  
  if (deptName.includes('BPPI')) {
    return <BppiForm deptName={deptName} onBack={onBack} />;
  }
  
  if (deptName.includes('BPNP') || deptName.includes('BPP')) {
    return <BpnpForm deptName={deptName} onBack={onBack} />;
  }

  if (deptName.includes('UPP')) {
    return <UppForm deptName={deptName} onBack={onBack} />;
  }

  if (deptName.includes('INTEGRITI') || deptName.includes('Kualiti')) {
    return <IntegritiForm deptName={deptName} onBack={onBack} />;
  }

  if (deptName.includes('DAKWAH') || deptName.includes('BDKWH')) {
    return <DakwahForm deptName={deptName} onBack={onBack} />;
  }

  if (deptName.includes('BKSP') || deptName.includes('Kaunseling')) {
    return <BkspForm deptName={deptName} onBack={onBack} />;
  }

  if (deptName.includes('BPDS') || deptName.includes('Pendakwaan')) {
    return <BpdsForm deptName={deptName} onBack={onBack} />;
  }

  if (deptName.includes('DHQC')) {
    return <DhqcForm onBack={onBack} />;
  }

  // Default to generic form for other departments
  return <GenericForm deptName={deptName} onBack={onBack} />;
};

export default FormEntry;
