import React from 'react';
import { Navigation } from '@/components/Navigation';
import { CarbonDeliveryEngine } from '@/components/CarbonDelivery/CarbonDeliveryEngine';

const CarbonDelivery = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <CarbonDeliveryEngine />
    </div>
  );
};

export default CarbonDelivery;