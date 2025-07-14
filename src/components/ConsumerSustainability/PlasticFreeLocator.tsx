import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Circle, Star } from 'lucide-react';

interface PlasticFreeProduct {
  id: string;
  name: string;
  category: string;
  aisle: string;
  shelf: string;
  isRefillable: boolean;
  plasticFree: boolean;
  price: number;
  sustainabilityScore: string;
  image?: string;
}

interface RefillStation {
  id: string;
  name: string;
  location: string;
  products: string[];
  coordinates: { x: number; y: number };
  status: 'active' | 'maintenance' | 'full';
}

const mockPlasticFreeProducts: PlasticFreeProduct[] = [
  {
    id: '1',
    name: 'Bamboo Toothbrush',
    category: 'Personal Care',
    aisle: 'A12',
    shelf: 'Top',
    isRefillable: false,
    plasticFree: true,
    price: 3.99,
    sustainabilityScore: 'A+'
  },
  {
    id: '2',
    name: 'Glass Food Containers',
    category: 'Kitchen',
    aisle: 'B8',
    shelf: 'Middle',
    isRefillable: false,
    plasticFree: true,
    price: 12.99,
    sustainabilityScore: 'A'
  },
  {
    id: '3',
    name: 'Bulk Organic Oats',
    category: 'Food',
    aisle: 'C5',
    shelf: 'Bulk Dispenser',
    isRefillable: true,
    plasticFree: true,
    price: 2.49,
    sustainabilityScore: 'A+'
  },
  {
    id: '4',
    name: 'Refillable Hand Soap',
    category: 'Personal Care',
    aisle: 'A15',
    shelf: 'Refill Station',
    isRefillable: true,
    plasticFree: false,
    price: 1.99,
    sustainabilityScore: 'A'
  }
];

const mockRefillStations: RefillStation[] = [
  {
    id: '1',
    name: 'Bulk Foods Station',
    location: 'Aisle C5',
    products: ['Organic Oats', 'Quinoa', 'Brown Rice', 'Lentils'],
    coordinates: { x: 30, y: 60 },
    status: 'active'
  },
  {
    id: '2',
    name: 'Personal Care Refills',
    location: 'Aisle A15',
    products: ['Hand Soap', 'Body Wash', 'Shampoo'],
    coordinates: { x: 70, y: 20 },
    status: 'active'
  },
  {
    id: '3',
    name: 'Cleaning Products',
    location: 'Aisle D2',
    products: ['All-Purpose Cleaner', 'Dish Soap', 'Laundry Detergent'],
    coordinates: { x: 50, y: 80 },
    status: 'maintenance'
  }
];

const PlasticFreeLocator = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showOnlyRefillable, setShowOnlyRefillable] = useState(false);

  const categories = ['All', ...Array.from(new Set(mockPlasticFreeProducts.map(p => p.category)))];

  const filteredProducts = mockPlasticFreeProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesRefillable = !showOnlyRefillable || product.isRefillable;
    return matchesSearch && matchesCategory && matchesRefillable;
  });

  const getScoreColor = (score: string) => {
    switch (score) {
      case 'A+':
      case 'A':
        return 'bg-green-500/10 text-green-700 border-green-500/20';
      case 'B':
        return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      case 'C':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
      default:
        return 'bg-red-500/10 text-red-700 border-red-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'maintenance':
        return 'bg-yellow-500';
      case 'full':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="products">Plastic-Free Products</TabsTrigger>
          <TabsTrigger value="map">Store Map</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Circle className="w-5 h-5 text-primary" />
                Find Plastic-Free Products
              </CardTitle>
              <CardDescription>
                Discover sustainable alternatives throughout the store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={showOnlyRefillable ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowOnlyRefillable(!showOnlyRefillable)}
                  >
                    🔄 Refillable Only
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription>{product.category}</CardDescription>
                    </div>
                    <Badge className={getScoreColor(product.sustainabilityScore)}>
                      {product.sustainabilityScore}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>Aisle {product.aisle}, {product.shelf}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {product.plasticFree && (
                        <Badge variant="outline" className="text-xs">
                          🧴 Plastic-Free
                        </Badge>
                      )}
                      {product.isRefillable && (
                        <Badge variant="outline" className="text-xs">
                          🔄 Refillable
                        </Badge>
                      )}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-lg font-bold text-primary">
                        ${product.price}
                      </span>
                      <Button size="sm">
                        Navigate to Product
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <div className="text-muted-foreground">
                  No products found matching your criteria.
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="map" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Interactive Store Map
              </CardTitle>
              <CardDescription>
                Find plastic-free aisles and refill stations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Store Map */}
              <div className="relative bg-muted/20 rounded-lg p-6 min-h-[400px] border-2 border-dashed border-muted">
                <div className="absolute inset-4">
                  {/* Store Layout Grid */}
                  <div className="grid grid-cols-4 grid-rows-4 gap-4 h-full">
                    {Array.from({ length: 16 }, (_, i) => (
                      <div
                        key={i}
                        className="bg-muted/30 rounded flex items-center justify-center text-xs text-muted-foreground"
                      >
                        Aisle {String.fromCharCode(65 + Math.floor(i / 4))}{(i % 4) + 1}
                      </div>
                    ))}
                  </div>

                  {/* Refill Stations */}
                  {mockRefillStations.map((station) => (
                    <div
                      key={station.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                      style={{
                        left: `${station.coordinates.x}%`,
                        top: `${station.coordinates.y}%`
                      }}
                    >
                      <div className={`w-4 h-4 rounded-full ${getStatusColor(station.status)} animate-pulse`} />
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-popover border rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                        <div className="font-medium text-sm">{station.name}</div>
                        <div className="text-xs text-muted-foreground">{station.location}</div>
                        <div className="text-xs text-muted-foreground">
                          Status: {station.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map Legend */}
                <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm border rounded-lg p-3">
                  <h4 className="font-medium text-sm mb-2">Legend</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span>Active Refill Station</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <span>Maintenance</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <span>Full/Unavailable</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Refill Stations List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockRefillStations.map((station) => (
              <Card key={station.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{station.name}</CardTitle>
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(station.status)}`} />
                  </div>
                  <CardDescription>{station.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-sm mb-1">Available Products:</h5>
                      <div className="flex flex-wrap gap-1">
                        {station.products.map((product, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button size="sm" className="w-full">
                      <MapPin className="w-4 h-4 mr-2" />
                      Navigate Here
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { PlasticFreeLocator };