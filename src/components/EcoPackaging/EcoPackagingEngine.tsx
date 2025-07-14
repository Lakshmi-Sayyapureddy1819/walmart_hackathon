import React, { useState } from 'react';
import { EcoHero } from './EcoHero';
import { ProductInfoInput } from './ProductInfoInput';
import { PackagingRecommendations } from './PackagingRecommendations';
import { EcoCoinsReward } from './EcoCoinsReward';
import { PackagingVisualizer } from './PackagingVisualizer';
import { SpecSheetGenerator } from './SpecSheetGenerator';
import { PackagingAnalytics } from './PackagingAnalytics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Language = "en" | "hi" | "ta" | "te" | "bn";

export interface ProductInfo {
  sku: string;
  productType: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
    weight: number;
  };
  fragility: 'low' | 'medium' | 'high';
  deliveryRoute: string;
  quantity: number;
}

export interface PackagingOption {
  id: string;
  name: string;
  materials: string[];
  co2Footprint: number;
  cost: number;
  recyclability: number;
  compostable: boolean;
  badges: string[];
  description: string;
  ecoCoins: number;
}

export const EcoPackagingEngine: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const [selectedOption, setSelectedOption] = useState<PackagingOption | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [totalEcoCoins, setTotalEcoCoins] = useState(0);

  const handleProductSubmit = (info: ProductInfo) => {
    setProductInfo(info);
  };

  const handleOptionSelect = (option: PackagingOption) => {
    setSelectedOption(option);
    setTotalEcoCoins(prev => prev + option.ecoCoins);
    setShowReward(true);
  };

  const handleRewardClose = () => {
    setShowReward(false);
  };

  return (
    <div className="  ">
      <EcoHero 
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        totalEcoCoins={totalEcoCoins}
      />
      
      <Tabs defaultValue="configurator" className="mt-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="configurator">Packaging Configurator</TabsTrigger>
          <TabsTrigger value="visualizer">Visual Preview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics Dashboard</TabsTrigger>
        </TabsList>
        
        <TabsContent value="configurator" className="space-y-8">
          <ProductInfoInput 
            selectedLanguage={selectedLanguage}
            onSubmit={handleProductSubmit}
          />
          
          {productInfo && (
            <PackagingRecommendations
              productInfo={productInfo}
              selectedLanguage={selectedLanguage}
              onOptionSelect={handleOptionSelect}
            />
          )}
          
          {selectedOption && (
            <SpecSheetGenerator
              productInfo={productInfo!}
              selectedOption={selectedOption}
              selectedLanguage={selectedLanguage}
            />
          )}
        </TabsContent>
        
        <TabsContent value="visualizer">
          {productInfo && selectedOption && (
            <PackagingVisualizer
              productInfo={productInfo}
              selectedOption={selectedOption}
              selectedLanguage={selectedLanguage}
            />
          )}
        </TabsContent>
        
        <TabsContent value="analytics">
          <PackagingAnalytics 
            selectedLanguage={selectedLanguage}
            totalEcoCoins={totalEcoCoins}
          />
        </TabsContent>
      </Tabs>
      
      {showReward && selectedOption && (
        <EcoCoinsReward
          option={selectedOption}
          selectedLanguage={selectedLanguage}
          onClose={handleRewardClose}
        />
      )}
    </div>
  );
};