import React from 'react';
import { Navigation } from '@/components/Navigation';
import { EcoPackagingEngine } from '@/components/EcoPackaging/EcoPackagingEngine';

const EcoPackaging = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <EcoPackagingEngine />
    </div>
  );
};

export default EcoPackaging;