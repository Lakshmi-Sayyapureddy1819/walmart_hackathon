import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Recycle, Trash2, Leaf, ArrowRight } from 'lucide-react';

interface SmartWasteBinsProps {
  onWasteSorted: (type: string, points: number) => void;
  greenPoints: number;
}

export const SmartWasteBins = ({ onWasteSorted, greenPoints }: SmartWasteBinsProps) => {
  const [selectedItem, setSelectedItem] = useState('');
  const [weeklyStats, setWeeklyStats] = useState({
    composted: 67,
    recycled: 89,
    landfill: 23
  });
  const { toast } = useToast();

  const wasteItems = [
    { name: 'Apple Core', type: 'compost', points: 3 },
    { name: 'Plastic Bottle', type: 'recycled', points: 2 },
    { name: 'Food Wrapper', type: 'landfill', points: 1 },
    { name: 'Cardboard Box', type: 'recycled', points: 2 },
    { name: 'Banana Peel', type: 'compost', points: 3 },
    { name: 'Glass Jar', type: 'recycled', points: 4 }
  ];

  const bins = [
    { 
      type: 'compost', 
      label: 'Compost', 
      icon: Leaf, 
      color: 'bg-green-500', 
      description: 'Organic waste & food scraps',
      slot: 'green'
    },
    { 
      type: 'recycled', 
      label: 'Recycle', 
      icon: Recycle, 
      color: 'bg-blue-500', 
      description: 'Paper, plastic, glass & metal',
      slot: 'blue'
    },
    { 
      type: 'landfill', 
      label: 'Landfill', 
      icon: Trash2, 
      color: 'bg-gray-500', 
      description: 'Non-recyclable waste',
      slot: 'gray'
    }
  ];

  const handleItemSort = (binType: string) => {
    if (!selectedItem) return;

    const item = wasteItems.find(i => i.name === selectedItem);
    if (!item) return;

    const isCorrect = item.type === binType;
    const points = isCorrect ? item.points : Math.max(1, item.points - 1);

    onWasteSorted(binType, points);
    
    setWeeklyStats(prev => ({
      ...prev,
      [binType]: prev[binType as keyof typeof prev] + 1
    }));

    toast({
      title: isCorrect ? "Perfect Sort! 🎉" : "Good Try! 👍",
      description: isCorrect 
        ? `Correctly sorted ${selectedItem} • +${points} Green Points`
        : `${selectedItem} sorted • +${points} Green Point (partial credit)`,
    });

    setSelectedItem('');
  };

  const totalWaste = weeklyStats.composted + weeklyStats.recycled + weeklyStats.landfill;
  const diversionRate = Math.round(((weeklyStats.composted + weeklyStats.recycled) / totalWaste) * 100);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">AI-Powered Smart Waste Bins</h2>
        <p className="text-muted-foreground mb-4">
          Interactive waste sorting with computer vision guidance and gamified rewards
        </p>
        <div className="flex justify-center gap-4">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            🏆 Green Points: {greenPoints}
          </Badge>
          <Badge variant="outline" className="text-lg px-4 py-2">
            📊 Diversion Rate: {diversionRate}%
          </Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Waste Item Simulator</CardTitle>
            <CardDescription>
              Select an item to sort into the correct bin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm font-medium mb-2">Select Item to Sort:</div>
              <div className="grid grid-cols-2 gap-2">
                {wasteItems.map((item, index) => (
                  <Button
                    key={index}
                    variant={selectedItem === item.name ? "default" : "outline"}
                    onClick={() => setSelectedItem(item.name)}
                    className="text-left justify-start"
                  >
                    {item.name}
                  </Button>
                ))}
              </div>
              
              {selectedItem && (
                <div className="mt-4 p-4 rounded-lg bg-muted">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="font-medium">Selected: {selectedItem}</div>
                    <ArrowRight className="h-4 w-4" />
                    <div className="text-sm text-muted-foreground">Choose bin below</div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>This Week's Impact</CardTitle>
            <CardDescription>
              Your waste sorting performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-950">
                <div className="text-2xl font-bold text-green-600">
                  {weeklyStats.composted + weeklyStats.recycled} lbs
                </div>
                <div className="text-sm text-green-700 dark:text-green-300">
                  Diverted from Landfill
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Composted</span>
                  <span className="text-sm font-medium">{weeklyStats.composted} lbs</span>
                </div>
                <Progress value={(weeklyStats.composted / totalWaste) * 100} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Recycled</span>
                  <span className="text-sm font-medium">{weeklyStats.recycled} lbs</span>
                </div>
                <Progress value={(weeklyStats.recycled / totalWaste) * 100} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Landfill</span>
                  <span className="text-sm font-medium">{weeklyStats.landfill} lbs</span>
                </div>
                <Progress value={(weeklyStats.landfill / totalWaste) * 100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {bins.map((bin, index) => {
          const Icon = bin.icon;
          return (
            <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 rounded-full ${bin.color} flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{bin.label}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {bin.description}
                </p>
                <Button 
                  onClick={() => handleItemSort(bin.type)}
                  disabled={!selectedItem}
                  className="w-full"
                  variant={selectedItem ? "default" : "outline"}
                >
                  Drop in {bin.slot} slot
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};