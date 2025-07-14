import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Circle, Star, Droplet } from 'lucide-react';

interface ProductScorecard {
  id: string;
  name: string;
  overallScore: string;
  scoreValue: number;
  category: string;
  highlights: string[];
  attributes: {
    packaging: { score: number; weight: 30 };
    ingredients: { score: number; weight: 40 };
    certifications: { score: number; weight: 30 };
  };
  comparison: string;
  aiExplanation: string;
}

const mockScorecards: ProductScorecard[] = [
  {
    id: '1',
    name: 'Eco-Friendly Laundry Detergent',
    overallScore: 'A+',
    scoreValue: 95,
    category: 'Cleaning Products',
    highlights: [
      'Made with 90% recycled plastic bottle',
      'Plant-based formula with no harsh chemicals',
      'Certified by EPA Safer Choice program'
    ],
    attributes: {
      packaging: { score: 90, weight: 30 },
      ingredients: { score: 95, weight: 40 },
      certifications: { score: 100, weight: 30 }
    },
    comparison: 'Better than 92% of similar cleaning products',
    aiExplanation: 'This product scores A+ due to its exceptional use of recycled materials, plant-based ingredients, and multiple environmental certifications. The packaging impact is minimized through recycled content, while the formula avoids harmful chemicals found in conventional detergents.'
  },
  {
    id: '2',
    name: 'Organic Coconut Oil',
    overallScore: 'A',
    scoreValue: 88,
    category: 'Food & Cooking',
    highlights: [
      'USDA Organic certified',
      'Fair Trade sourced',
      'Glass jar packaging (recyclable)'
    ],
    attributes: {
      packaging: { score: 80, weight: 30 },
      ingredients: { score: 95, weight: 40 },
      certifications: { score: 85, weight: 30 }
    },
    comparison: 'Better than 78% of similar food products',
    aiExplanation: 'High score due to organic certification and fair trade practices. Glass packaging is more sustainable than plastic alternatives, though it has higher transport emissions. The organic production methods significantly reduce environmental impact.'
  }
];

const SustainabilityScorecard = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductScorecard>(mockScorecards[0]);
  const [showExplanation, setShowExplanation] = useState(false);

  const getScoreColor = (score: string) => {
    switch (score) {
      case 'A+':
        return 'text-green-700 bg-green-500/10';
      case 'A':
        return 'text-green-600 bg-green-500/10';
      case 'B':
        return 'text-blue-600 bg-blue-500/10';
      case 'C':
        return 'text-yellow-600 bg-yellow-500/10';
      default:
        return 'text-red-600 bg-red-500/10';
    }
  };

  const getProgressColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Product Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        {mockScorecards.map((product) => (
          <Button
            key={product.id}
            variant={selectedProduct.id === product.id ? "default" : "outline"}
            onClick={() => setSelectedProduct(product)}
            className="text-sm"
          >
            {product.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Scorecard */}
        <Card className="relative overflow-hidden">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl">{selectedProduct.name}</CardTitle>
                <CardDescription>{selectedProduct.category}</CardDescription>
              </div>
              <div className="text-right">
                <div className={`text-4xl font-bold px-4 py-2 rounded-lg ${getScoreColor(selectedProduct.overallScore)}`}>
                  {selectedProduct.overallScore}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {selectedProduct.scoreValue}/100
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Highlights */}
            <div className="space-y-3 mb-6">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Key Highlights
              </h4>
              {selectedProduct.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Circle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{highlight}</span>
                </div>
              ))}
            </div>

            {/* Comparison Badge */}
            <Badge variant="outline" className="mb-4">
              <Star className="w-3 h-3 mr-1" />
              {selectedProduct.comparison}
            </Badge>

            {/* AI Explanation Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowExplanation(!showExplanation)}
              className="w-full"
            >
              {showExplanation ? 'Hide' : 'Show'} AI Explanation
            </Button>

            {showExplanation && (
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <h5 className="font-medium mb-2 flex items-center gap-2">
                  <Circle className="w-4 h-4 text-primary" />
                  Why is this {selectedProduct.overallScore}?
                </h5>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedProduct.aiExplanation}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detailed Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplet className="w-5 h-5 text-primary" />
              Score Breakdown
            </CardTitle>
            <CardDescription>
              How we calculate the sustainability score
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Packaging Impact */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Packaging Impact ({selectedProduct.attributes.packaging.weight}%)</span>
                  <span className="text-sm font-bold">{selectedProduct.attributes.packaging.score}/100</span>
                </div>
                <Progress 
                  value={selectedProduct.attributes.packaging.score} 
                  className="h-2"
                />
              </div>

              {/* Product Ingredients */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Product Contents ({selectedProduct.attributes.ingredients.weight}%)</span>
                  <span className="text-sm font-bold">{selectedProduct.attributes.ingredients.score}/100</span>
                </div>
                <Progress 
                  value={selectedProduct.attributes.ingredients.score} 
                  className="h-2"
                />
              </div>

              {/* Certifications */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Certifications ({selectedProduct.attributes.certifications.weight}%)</span>
                  <span className="text-sm font-bold">{selectedProduct.attributes.certifications.score}/100</span>
                </div>
                <Progress 
                  value={selectedProduct.attributes.certifications.score} 
                  className="h-2"
                />
              </div>
            </div>

            {/* Trust Signals */}
            <div className="mt-6 pt-6 border-t">
              <h5 className="font-medium mb-3 text-sm">Trust Signals</h5>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  🔬 Third-party verified
                </Badge>
                <Badge variant="outline" className="text-xs">
                  📊 Real supplier data
                </Badge>
                <Badge variant="outline" className="text-xs">
                  🌍 Global standards compliance
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comparison with Similar Products */}
      <Card>
        <CardHeader>
          <CardTitle>Compare with Similar Products</CardTitle>
          <CardDescription>
            See how this product stacks up against alternatives in the same category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-500/10 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">Top 10%</div>
              <div className="text-sm text-muted-foreground">Environmental Impact</div>
            </div>
            <div className="text-center p-4 bg-blue-500/10 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">15%</div>
              <div className="text-sm text-muted-foreground">Lower Carbon Footprint</div>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">3x</div>
              <div className="text-sm text-muted-foreground">More Certifications</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { SustainabilityScorecard };