import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Leaf, Truck, Zap, Calculator, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CarbonFootprintEstimatorProps {
  selectedDelivery: any;
}

export const CarbonFootprintEstimator: React.FC<CarbonFootprintEstimatorProps> = ({
  selectedDelivery
}) => {
  const calculateFootprint = (deliveryType: string, distance: number = 15, weight: number = 2.5) => {
    const baseEmissions = {
      pickup: 1,
      standard: 8,
      express: 15,
      reusable: 6
    };

    const vehicleEmissions = {
      pickup: { type: 'Walking/Driving', factor: 0.1 },
      standard: { type: 'Electric Van', factor: 0.3 },
      express: { type: 'Gas Van', factor: 0.8 },
      reusable: { type: 'Electric Van', factor: 0.25 }
    };

    const base = baseEmissions[deliveryType as keyof typeof baseEmissions] || 8;
    const vehicle = vehicleEmissions[deliveryType as keyof typeof vehicleEmissions] || vehicleEmissions.standard;
    
    return {
      total: base + (distance * vehicle.factor) + (weight * 0.2),
      breakdown: {
        distance: distance * vehicle.factor,
        weight: weight * 0.2,
        vehicle: vehicle.type,
        base: base
      }
    };
  };

  const getImpactLevel = (carbon: number) => {
    if (carbon <= 3) return { level: 'Very Low', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (carbon <= 8) return { level: 'Low', color: 'text-green-500', bgColor: 'bg-green-50' };
    if (carbon <= 12) return { level: 'Moderate', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { level: 'High', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const allOptions = [
    { id: 'pickup', name: 'Store Pickup', type: 'pickup' },
    { id: 'standard', name: 'Standard Delivery', type: 'standard' },
    { id: 'express', name: 'Express Delivery', type: 'express' },
    { id: 'reusable', name: 'Reusable Package', type: 'reusable' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Carbon Footprint Calculator</h2>
        <p className="text-xl text-gray-600">
          Understand the environmental impact of each delivery option
        </p>
      </div>

      {/* Selected Delivery Analysis */}
      {selectedDelivery && (
        <Card className="mb-6 border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-600" />
              Your Selected Option: {selectedDelivery.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Leaf className="h-4 w-4 text-green-600" />
                  Carbon Breakdown
                </h4>
                {(() => {
                  const footprint = calculateFootprint(selectedDelivery.type);
                  const impact = getImpactLevel(footprint.total);
                  
                  return (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Total CO₂ Emissions:</span>
                        <Badge className={`${impact.bgColor} ${impact.color}`}>
                          {footprint.total.toFixed(1)} kg CO₂e
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Base emissions:</span>
                          <span>{footprint.breakdown.base} kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Distance factor:</span>
                          <span>{footprint.breakdown.distance.toFixed(1)} kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Package weight:</span>
                          <span>{footprint.breakdown.weight.toFixed(1)} kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Vehicle type:</span>
                          <span>{footprint.breakdown.vehicle}</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Environmental Context</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Equivalent to {(selectedDelivery.carbon * 0.8).toFixed(1)} miles of car driving</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Powers a LED bulb for {(selectedDelivery.carbon * 12).toFixed(0)} hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Impact level: {getImpactLevel(selectedDelivery.carbon).level}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-gray-600" />
            Delivery Options Comparison
          </CardTitle>
          <CardDescription>
            Compare carbon emissions across all available delivery methods
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {allOptions.map((option) => {
              const footprint = calculateFootprint(option.type);
              const impact = getImpactLevel(footprint.total);
              const maxCarbon = 18; // For progress bar scaling
              
              return (
                <div key={option.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{option.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge className={`${impact.bgColor} ${impact.color}`}>
                        {footprint.total.toFixed(1)} kg CO₂e
                      </Badge>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-sm">
                              <p>Vehicle: {footprint.breakdown.vehicle}</p>
                              <p>Impact: {impact.level}</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <Progress 
                    value={(footprint.total / maxCarbon) * 100} 
                    className="h-2"
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tips for Reducing Carbon Footprint */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Leaf className="h-5 w-5" />
            Tips to Reduce Your Carbon Footprint
          </CardTitle>
        </CardHeader>
        <CardContent className="text-green-700">
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
              Choose store pickup when possible - it has the lowest carbon impact
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
              Consolidate orders to reduce multiple deliveries
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
              Opt for reusable packaging to support circular economy
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
              Plan ahead to avoid express delivery when possible
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};