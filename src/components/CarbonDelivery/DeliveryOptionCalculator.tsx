import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Truck, Clock, MapPin, Leaf, Zap, Store, Package } from 'lucide-react';

const deliveryOptions = [
  {
    id: 'pickup',
    type: 'pickup',
    name: 'Store Pickup',
    icon: Store,
    eta: '2 hours',
    cost: '$0',
    carbon: 1,
    description: 'Pick up at your nearest Walmart store',
    recommended: true,
    available: true
  },
  {
    id: 'standard',
    type: 'standard',
    name: 'Standard Delivery',
    icon: Truck,
    eta: '3-5 days',
    cost: '$0',
    carbon: 8,
    description: 'Consolidated, eco-friendly delivery',
    recommended: false,
    available: true
  },
  {
    id: 'express',
    type: 'express',
    name: 'Express Delivery',
    icon: Zap,
    eta: '1-2 days',
    cost: '$10',
    carbon: 15,
    description: 'Fast delivery, higher carbon impact',
    recommended: false,
    available: true
  },
  {
    id: 'reusable',
    type: 'reusable',
    name: 'Reusable Package',
    icon: Package,
    eta: '3-5 days',
    cost: '$2',
    carbon: 6,
    description: 'Eco-friendly reusable packaging',
    recommended: false,
    available: true,
    special: 'reusable'
  }
];

interface DeliveryOptionCalculatorProps {
  onDeliverySelect: (option: any) => void;
  selectedDelivery: any;
}

export const DeliveryOptionCalculator: React.FC<DeliveryOptionCalculatorProps> = ({
  onDeliverySelect,
  selectedDelivery
}) => {
  const [zipCode, setZipCode] = useState('');
  const [packageWeight, setPackageWeight] = useState('2.5');
  const [availableOptions, setAvailableOptions] = useState(deliveryOptions);
  const [sortBy, setSortBy] = useState('carbon');

  useEffect(() => {
    // Simulate delivery option calculation based on inputs
    const calculateOptions = () => {
      let options = [...deliveryOptions];
      
      // Simple logic for demo purposes
      if (zipCode && zipCode.length === 5) {
        // All options available for valid zip codes
        options = options.map(opt => ({ ...opt, available: true }));
      }
      
      // Sort options
      if (sortBy === 'carbon') {
        options.sort((a, b) => a.carbon - b.carbon);
      } else if (sortBy === 'time') {
        const timeOrder = ['pickup', 'express', 'standard', 'reusable'];
        options.sort((a, b) => timeOrder.indexOf(a.type) - timeOrder.indexOf(b.type));
      }
      
      setAvailableOptions(options);
    };

    calculateOptions();
  }, [zipCode, packageWeight, sortBy]);

  const getCarbonColor = (carbon: number) => {
    if (carbon <= 2) return 'text-green-600';
    if (carbon <= 8) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCarbonBadgeColor = (carbon: number) => {
    if (carbon <= 2) return 'bg-green-100 text-green-700';
    if (carbon <= 8) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Delivery Method</h2>
        <p className="text-xl text-gray-600">
          Compare carbon impact, cost, and delivery time for your order
        </p>
      </div>

      {/* Input Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            Delivery Details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              placeholder="Enter ZIP code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="weight">Package Weight (lbs)</Label>
            <Input
              id="weight"
              type="number"
              value={packageWeight}
              onChange={(e) => setPackageWeight(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="sortBy">Sort By</Label>
            <select
              id="sortBy"
              className="w-full p-2 border rounded-md"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="carbon">Lowest Carbon</option>
              <option value="time">Fastest</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Options Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {availableOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedDelivery?.id === option.id;
          
          return (
            <Card 
              key={option.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
              } ${option.available ? '' : 'opacity-50'}`}
              onClick={() => option.available && onDeliverySelect(option)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center`}>
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  {option.recommended && (
                    <Badge className="bg-green-100 text-green-700">
                      Recommended
                    </Badge>
                  )}
                  {option.special === 'reusable' && (
                    <Badge className="bg-purple-100 text-purple-700">
                      Eco-Friendly
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{option.name}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    {option.eta}
                  </span>
                  <span className="font-semibold">{option.cost}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Carbon Impact</span>
                  <Badge className={getCarbonBadgeColor(option.carbon)}>
                    {option.carbon} kg CO₂e
                  </Badge>
                </div>
                
                <div className="flex items-center justify-center pt-2">
                  <div className={`flex items-center gap-1 ${getCarbonColor(option.carbon)}`}>
                    <Leaf className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {option.carbon <= 2 ? 'Very Low' : option.carbon <= 8 ? 'Moderate' : 'High'} Impact
                    </span>
                  </div>
                </div>
                
                {option.available && (
                  <Button 
                    className="w-full mt-4"
                    variant={isSelected ? 'default' : 'outline'}
                  >
                    {isSelected ? 'Selected' : 'Select Option'}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {zipCode && zipCode.length === 5 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 text-blue-800">
            <MapPin className="h-5 w-5" />
            <span className="font-medium">
              Delivery options calculated for ZIP code {zipCode}
            </span>
          </div>
          <p className="text-sm text-blue-600 mt-1">
            All delivery methods are available in your area
          </p>
        </div>
      )}
    </div>
  );
};