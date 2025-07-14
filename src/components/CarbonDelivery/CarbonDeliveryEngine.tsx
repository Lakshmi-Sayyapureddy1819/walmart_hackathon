import React, { useState } from 'react';
import { CarbonDeliveryHero } from './CarbonDeliveryHero';
import { DeliveryOptionCalculator } from './DeliveryOptionCalculator';
import { CarbonFootprintEstimator } from './CarbonFootprintEstimator';
import { CustomerChoicePresentation } from './CustomerChoicePresentation';
import { ReusablePackagingReturn } from './ReusablePackagingReturn';
import { GreenTracker } from './GreenTracker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const CarbonDeliveryEngine = () => {
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [userGreenPoints, setUserGreenPoints] = useState(45);
  const [carbonSaved, setCarbonSaved] = useState(124);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background">
      <CarbonDeliveryHero />
      
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="delivery" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="delivery">🚚 Delivery Options</TabsTrigger>
            <TabsTrigger value="calculator">🌱 Carbon Calculator</TabsTrigger>
            <TabsTrigger value="returns">♻️ Package Returns</TabsTrigger>
            <TabsTrigger value="tracker">📊 Green Tracker</TabsTrigger>
          </TabsList>

          <TabsContent value="delivery" className="space-y-8">
            <DeliveryOptionCalculator 
              onDeliverySelect={setSelectedDelivery}
              selectedDelivery={selectedDelivery}
            />
            <CustomerChoicePresentation 
              selectedDelivery={selectedDelivery}
              onConfirmChoice={(choice) => {
                console.log('Choice confirmed:', choice);
                // Update carbon savings based on choice
                if (choice.type === 'pickup') {
                  setCarbonSaved(prev => prev + 7);
                } else if (choice.type === 'standard') {
                  setCarbonSaved(prev => prev + 2);
                }
              }}
            />
          </TabsContent>

          <TabsContent value="calculator" className="space-y-8">
            <CarbonFootprintEstimator selectedDelivery={selectedDelivery} />
          </TabsContent>

          <TabsContent value="returns" className="space-y-8">
            <ReusablePackagingReturn 
              userGreenPoints={userGreenPoints}
              onPointsEarned={(points) => setUserGreenPoints(prev => prev + points)}
            />
          </TabsContent>

          <TabsContent value="tracker" className="space-y-8">
            <GreenTracker 
              greenPoints={userGreenPoints}
              carbonSaved={carbonSaved}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};