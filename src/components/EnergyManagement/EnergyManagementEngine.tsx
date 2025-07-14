
import React, { useState } from 'react';
import { EnergyHero } from './EnergyHero';
import { StoreEnergyOverview } from './StoreEnergyOverview';
import { EnergyMonitoringTable } from './EnergyMonitoringTable';
import { AlertSystem } from './AlertSystem';
import { StoreBenchmarking } from './StoreBenchmarking';
import { SustainabilityDashboard } from './SustainabilityDashboard';
import { ClassificationTable } from '@/components/ReturnsToResource/ClassificationTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Language = "en" | "hi" | "ta" | "te" | "bn";

export interface EnergyData {
  id: string;
  location: string;
  storeName: string;
  sensorId: string;
  block: string;
  productName: string;
  threshold: number;
  currentConsumption: number;
  runTime: number;
  status: 'normal' | 'warning' | 'critical';
  timestamp: Date;
}

export interface Alert {
  id: string;
  storeName: string;
  productName: string;
  block: string;
  type: 'threshold_breach' | 'efficiency_low' | 'maintenance_needed';
  message: string;
  suggestedAction: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  acknowledged: boolean;
}

export const EnergyManagementEngine: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [energyData, setEnergyData] = useState<EnergyData[]>([]);

  const handleStoreSelect = (storeId: string) => {
    setSelectedStore(storeId);
  };

  const handleAlertAcknowledge = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <EnergyHero 
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        totalAlerts={alerts.filter(a => !a.acknowledged).length}
      />
      
      <Tabs defaultValue="overview" className="mt-12">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Store Overview</TabsTrigger>
          <TabsTrigger value="monitoring">Energy Monitoring</TabsTrigger>
          <TabsTrigger value="benchmarking">Benchmarking</TabsTrigger>
          <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-8">
          <StoreEnergyOverview
            selectedLanguage={selectedLanguage}
            onStoreSelect={handleStoreSelect}
            energyData={energyData}
          />
          
          <AlertSystem
            alerts={alerts}
            selectedLanguage={selectedLanguage}
            onAcknowledge={handleAlertAcknowledge}
          />
        </TabsContent>
        
        <TabsContent value="monitoring">
          <EnergyMonitoringTable
            selectedLanguage={selectedLanguage}
            energyData={energyData}
            selectedStore={selectedStore}
          />
        </TabsContent>
        
        <TabsContent value="benchmarking">
          <StoreBenchmarking
            selectedLanguage={selectedLanguage}
            selectedStore={selectedStore}
          />
        </TabsContent>
        
        <TabsContent value="sustainability">
          <SustainabilityDashboard
            selectedLanguage={selectedLanguage}
            energyData={energyData}
          />
        </TabsContent>

        <TabsContent value="returns">
          <ClassificationTable selectedLanguage={selectedLanguage} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
