import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Camera, Scan, Mic, Package } from 'lucide-react';

interface ZWIBItemRegistrationProps {
  onItemRegistered: (points: number) => void;
  greenPoints: number;
}

export const ZWIBItemRegistration = ({ onItemRegistered, greenPoints }: ZWIBItemRegistrationProps) => {
  const [productId, setProductId] = useState('');
  const [condition, setCondition] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();

  const handleScan = () => {
    // Simulate barcode scan
    setProductId('WM-DAIRY-001' + Math.floor(Math.random() * 1000));
    toast({
      title: "Product Scanned",
      description: "Barcode successfully read",
    });
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    // Simulate voice input
    setTimeout(() => {
      setIsListening(false);
      setProductId('WM-PRODUCE-' + Math.floor(Math.random() * 1000));
      toast({
        title: "Voice Input Captured",
        description: "Product ID recorded via voice",
      });
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || !condition) return;

    const actions = {
      'damaged': { action: 'Compost', points: 5, color: 'bg-green-500' },
      'near-expiry': { action: 'Markdown', points: 3, color: 'bg-yellow-500' },
      'expired': { action: 'Donate', points: 7, color: 'bg-blue-500' },
      'defective': { action: 'Dispose', points: 2, color: 'bg-red-500' }
    };

    const recommendation = actions[condition as keyof typeof actions];
    
    onItemRegistered(recommendation.points);
    
    toast({
      title: "Item Registered Successfully! 🎉",
      description: `AI Recommends: ${recommendation.action} • +${recommendation.points} Green Points`,
    });

    // Reset form
    setProductId('');
    setCondition('');
    setExpiryDate('');
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">ZWIB Item Registration</h2>
        <p className="text-muted-foreground mb-4">
          Log damaged or near-expiry items for AI-powered sustainable action recommendations
        </p>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          🏆 Green Points: {greenPoints}
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Item Registration Form
            </CardTitle>
            <CardDescription>
              Scan, input, or use voice to register waste items
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="productId">Product ID</Label>
                <div className="flex gap-2">
                  <Input
                    id="productId"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    placeholder="Enter or scan product ID"
                    className="flex-1"
                  />
                  <Button type="button" onClick={handleScan} size="sm">
                    <Scan className="h-4 w-4" />
                  </Button>
                  <Button 
                    type="button" 
                    onClick={handleVoiceInput} 
                    size="sm"
                    variant={isListening ? "destructive" : "outline"}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">Item Condition</Label>
                <Select value={condition} onValueChange={setCondition}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="damaged">🔴 Damaged</SelectItem>
                    <SelectItem value="near-expiry">🟡 Near Expiry</SelectItem>
                    <SelectItem value="expired">🟠 Expired</SelectItem>
                    <SelectItem value="defective">⚫ Defective</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Register Item
                </Button>
                <Button type="button" variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  Photo
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
            <CardDescription>
              Recent AI-powered action suggestions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { product: 'Organic Bananas', action: 'Compost', points: 5, color: 'bg-green-500' },
                { product: 'Greek Yogurt', action: 'Markdown', points: 3, color: 'bg-yellow-500' },
                { product: 'Bread Loaves', action: 'Donate', points: 7, color: 'bg-blue-500' },
                { product: 'Milk Cartons', action: 'Dispose', points: 2, color: 'bg-red-500' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="font-medium">{item.product}</div>
                    <div className="text-sm text-muted-foreground">
                      Recommended: {item.action}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${item.color} text-white`}>
                      +{item.points} pts
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};