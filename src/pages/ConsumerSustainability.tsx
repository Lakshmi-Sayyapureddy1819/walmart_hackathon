import React from 'react';
import { Navigation } from '@/components/Navigation';
import { ConsumerSustainabilityEngine } from '@/components/ConsumerSustainability/ConsumerSustainabilityEngine';

const ConsumerSustainability = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ConsumerSustainabilityEngine />
    </div>
  );
};

export default ConsumerSustainability;