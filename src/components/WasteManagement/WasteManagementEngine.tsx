import React, { useState } from 'react';
import { WasteHero } from './WasteHero';
import { ZWIBItemRegistration } from './ZWIBItemRegistration';
import { SmartWasteBins } from './SmartWasteBins';
import { HouseholdFoodWasteAI } from './HouseholdFoodWasteAI';
import { CompostPickupService } from './CompostPickupService';
import { WasteAnalyticsDashboard } from './WasteAnalyticsDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const WasteManagementEngine = () => {
  const [greenPoints, setGreenPoints] = useState(85);
  const [wasteData, setWasteData] = useState({
    totalDiverted: 1247,
    composted: 423,
    recycled: 564,
    donated: 260
  });

  const handleItemRegistered = (points: number) => {
    setGreenPoints(prev => prev + points);
    setWasteData(prev => ({
      ...prev,
      totalDiverted: prev.totalDiverted + 1
    }));
  };

  const handleWasteSorted = (type: string, points: number) => {
    setGreenPoints(prev => prev + points);
    setWasteData(prev => ({
      ...prev,
      [type]: prev[type as keyof typeof prev] + 1,
      totalDiverted: prev.totalDiverted + 1
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background">
      <WasteHero />
      
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="zwib" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="zwib">📦 ZWIB Registry</TabsTrigger>
            <TabsTrigger value="smart-bins">🤖 Smart Bins</TabsTrigger>
            <TabsTrigger value="household">🏠 Home Waste AI</TabsTrigger>
            <TabsTrigger value="compost">🚛 Compost Pickup</TabsTrigger>
            <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="zwib" className="space-y-8">
            <ZWIBItemRegistration 
              onItemRegistered={handleItemRegistered}
              greenPoints={greenPoints}
            />
          </TabsContent>

          <TabsContent value="smart-bins" className="space-y-8">
            <SmartWasteBins 
              onWasteSorted={handleWasteSorted}
              greenPoints={greenPoints}
            />
          </TabsContent>

          <TabsContent value="household" className="space-y-8">
            <HouseholdFoodWasteAI />
          </TabsContent>

          <TabsContent value="compost" className="space-y-8">
            <CompostPickupService />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            <WasteAnalyticsDashboard wasteData={wasteData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};