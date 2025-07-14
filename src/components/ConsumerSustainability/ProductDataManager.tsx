import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Circle, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EcoRewardModal } from './EcoRewardModal';
import { EcoCoinCounter } from './EcoCoinCounter';
import { calculateEcoReward } from './ecoRewardService';

interface ProductData {
  id: string;
  name: string;
  category: string;
  recycledContent: number;
  waterUsage: number;
  chemicalFree: boolean;
  organic: boolean;
  plasticFree: boolean;
  sustainabilityScore: string;
}

const mockProducts: ProductData[] = [
  {
    id: '1',
    name: 'Eco-Friendly Laundry Detergent',
    category: 'Cleaning',
    recycledContent: 90,
    waterUsage: 2.5,
    chemicalFree: true,
    organic: true,
    plasticFree: true,
    sustainabilityScore: 'A+'
  },
  {
    id: '2',
    name: 'Organic Coconut Oil',
    category: 'Food',
    recycledContent: 0,
    waterUsage: 1.2,
    chemicalFree: true,
    organic: true,
    plasticFree: false,
    sustainabilityScore: 'A'
  },
  {
    id: '3',
    name: 'Bamboo Toothbrush',
    category: 'Personal Care',
    recycledContent: 100,
    waterUsage: 0.1,
    chemicalFree: true,
    organic: false,
    plasticFree: true,
    sustainabilityScore: 'A+'
  },
  {
    id: '4',
    name: 'Conventional Shampoo',
    category: 'Personal Care',
    recycledContent: 20,
    waterUsage: 5.0,
    chemicalFree: false,
    organic: false,
    plasticFree: false,
    sustainabilityScore: 'C'
  }
];

const ProductDataManager = () => {
  const [products, setProducts] = useState<ProductData[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [totalEcoCoins, setTotalEcoCoins] = useState(0);
  const [rewardModal, setRewardModal] = useState<{
    isOpen: boolean;
    reward: any;
  }>({ isOpen: false, reward: null });
  
  const { toast } = useToast();

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
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

  const handlePurchase = (product: ProductData) => {
    // Calculate eco-reward
    const reward = calculateEcoReward(product);
    
    // Update total coins
    const newTotal = totalEcoCoins + reward.ecoCoinValue;
    setTotalEcoCoins(newTotal);
    
    // Show reward modal
    setRewardModal({
      isOpen: true,
      reward
    });

    // Show toast notification
    toast({
      title: "Sustainable Purchase! 🌱",
      description: `You earned ${reward.ecoCoinValue} Eco-Coins for choosing ${product.name}!`,
    });
  };

  const closeRewardModal = () => {
    setRewardModal({ isOpen: false, reward: null });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Circle className="w-5 h-5 text-primary" />
                Product Sustainability Database
              </CardTitle>
              <CardDescription>
                Manage and organize sustainability attributes for every product
              </CardDescription>
            </div>
            <EcoCoinCounter totalCoins={totalEcoCoins} />
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <div className="flex gap-2 flex-wrap">
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
          </div>

          {/* Products Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Sustainability Attributes</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">
                          ♻️ {product.recycledContent}%
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          💧 {product.waterUsage}L
                        </Badge>
                        {product.chemicalFree && (
                          <Badge variant="outline" className="text-xs">
                            🧪 Chemical-Free
                          </Badge>
                        )}
                        {product.organic && (
                          <Badge variant="outline" className="text-xs">
                            🌱 Organic
                          </Badge>
                        )}
                        {product.plasticFree && (
                          <Badge variant="outline" className="text-xs">
                            🧴 Plastic-Free
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getScoreColor(product.sustainabilityScore)}>
                        {product.sustainabilityScore}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handlePurchase(product)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Buy
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No products found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Circle className="w-4 h-4 text-green-500" />
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {products.filter(p => p.sustainabilityScore.startsWith('A')).length}
                </div>
                <div className="text-sm text-muted-foreground">Grade A Products</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Circle className="w-4 h-4 text-primary" />
              <div>
                <div className="text-2xl font-bold text-primary">
                  {products.filter(p => p.plasticFree).length}
                </div>
                <div className="text-sm text-muted-foreground">Plastic-Free Items</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {products.filter(p => p.organic).length}
                </div>
                <div className="text-sm text-muted-foreground">Organic Products</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Circle className="w-4 h-4 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(products.reduce((acc, p) => acc + p.recycledContent, 0) / products.length)}%
                </div>
                <div className="text-sm text-muted-foreground">Avg. Recycled Content</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reward Modal */}
      <EcoRewardModal
        isOpen={rewardModal.isOpen}
        onClose={closeRewardModal}
        reward={rewardModal.reward}
      />
    </div>
  );
};

export { ProductDataManager };
