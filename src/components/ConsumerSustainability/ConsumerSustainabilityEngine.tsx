import React, { useState } from 'react';
import { SustainabilityHero } from './SustainabilityHero';
import { ProductDataManager } from './ProductDataManager';
import { SustainabilityScorecard } from './SustainabilityScorecard';
import { PlasticFreeLocator } from './PlasticFreeLocator';
import { ImpactDashboard } from './ImpactDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ConsumerSustainabilityEngine = () => {
  const [activeTab, setActiveTab] = useState('scorecard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <SustainabilityHero />
      
      <div className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-4xl mx-auto mb-8">
            <TabsTrigger value="scorecard" className="text-sm font-medium">
              Scorecard
            </TabsTrigger>
            {/* <TabsTrigger value="plastic-free" className="text-sm font-medium">
              Plastic-Free Map
            </TabsTrigger> */}
            <TabsTrigger value="impact" className="text-sm font-medium">
              My Impact
            </TabsTrigger>
            <TabsTrigger value="data" className="text-sm font-medium">
              Product Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scorecard" className="mt-8">
            <SustainabilityScorecard />
          </TabsContent>

          {/* <TabsContent value="plastic-free" className="mt-8">
            <PlasticFreeLocator />
          </TabsContent> */}

          <TabsContent value="impact" className="mt-8">
            <ImpactDashboard />
          </TabsContent>

          <TabsContent value="data" className="mt-8">
            <ProductDataManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export { ConsumerSustainabilityEngine };