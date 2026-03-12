import React from 'react';
import BkimForm from './forms/BkimForm';
import BpnpForm from './forms/BpnpForm';
import UppForm from './forms/UppForm';
import IntegritiForm from './forms/IntegritiForm';
import DakwahForm from './forms/DakwahForm';
import HrForm from './forms/HrForm';
import BkspForm from './forms/BkspForm';
import BpdsForm from './forms/BpdsForm';
import GenericForm from './forms/GenericForm';

interface FormEntryProps {
  deptName: string;
  onBack: () => void;
}

const FormEntry: React.FC<FormEntryProps> = ({ deptName, onBack }) => {
  // Route to specific form components based on department name
  if (deptName.includes('BKIM')) {
    return <BkimForm deptName={deptName} onBack={onBack} />;
  }
  
  if (deptName.includes('BPNP') || deptName.includes('BPP')) {
    return <BpnpForm deptName={deptName} onBack={onBack} />;
  }

  if (deptName.includes('UPP')) {
    return <UppForm deptName={deptName} onBack={onBack} />;
  }

  if (deptName.includes('INTEGRITI')) {
    return <IntegritiForm deptName={deptName} onBack={onBack} />;
  }

  if (deptName.includes('DAKWAH') || deptName.includes('BDKWH')) {
    return <DakwahForm deptName={deptName} onBack={onBack} />;
  }

  if (deptName.includes('HR & Latihan')) {
    return <HrForm deptName={deptName} onBack={onBack} />;
  }

  if (deptName.includes('BKSP') || deptName.includes('Kaunseling')) {
    return <BkspForm deptName={deptName} onBack={onBack} />;
  }

  if (deptName.includes('BPDS') || deptName.includes('Pendakwaan')) {
    return <BpdsForm deptName={deptName} onBack={onBack} />;
  }

  // Default to generic form for other departments
  return <GenericForm deptName={deptName} onBack={onBack} />;
};

export default FormEntry;
