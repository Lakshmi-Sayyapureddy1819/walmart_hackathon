
import React from 'react';
import { Navigation } from '@/components/Navigation';
import { ReturnsToResourceEngine } from '@/components/ReturnsToResource/ReturnsToResourceEngine';

const ReturnsToResource = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <Navigation />
      <ReturnsToResourceEngine />
    </div>
  );
};

export default ReturnsToResource;
