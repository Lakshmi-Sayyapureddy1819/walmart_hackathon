import React from 'react';
import { Navigation } from '@/components/Navigation';
import { EnergyManagementEngine } from '@/components/EnergyManagement/EnergyManagementEngine';

const EnergyManagement = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <EnergyManagementEngine />
    </div>
  );
};

export default EnergyManagement;