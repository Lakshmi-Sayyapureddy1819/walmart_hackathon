import React from 'react';
import { Navigation } from '@/components/Navigation';
import { WasteManagementEngine } from '@/components/WasteManagement/WasteManagementEngine';

const WasteManagement = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <WasteManagementEngine />
    </div>
  );
};

export default WasteManagement;