import React from 'react';

interface MaintenanceGuardProps {
  children: React.ReactNode;
}

const MaintenanceGuard: React.FC<MaintenanceGuardProps> = ({ children }) => {
  return <>{children}</>;
};

export default MaintenanceGuard;
