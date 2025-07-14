import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Camera, Calendar, ChefHat, MapPin, Bell } from 'lucide-react';

export const HouseholdFoodWasteAI = () => {
  const [fridgeItems, setFridgeItems] = useState([
    { name: 'Bananas', expiryDays: 2, quantity: 3 },
    { name: 'Lettuce', expiryDays: 1, quantity: 1 },
    { name: 'Milk', expiryDays: 4, quantity: 1 },
    { name: 'Carrots', expiryDays: 7, quantity: 5 }
  ]);
  const [newItem, setNewItem] = useState('');
  const { toast } = useToast();

  const handleScanFridge = () => {
    toast({
      title: "Fridge Scanned! 📱",
      description: "AI identified 12 items. 3 items expiring soon.",
    });
    
    // Simulate adding new items
    setFridgeItems(prev => [
      ...prev,
      { name: 'Tomatoes', expiryDays: 1, quantity: 4 },
      { name: 'Bread', expiryDays: 2, quantity: 1 }
    ]);
  };

  const addManualItem = () => {
    if (!newItem) return;
    
    const randomDays = Math.floor(Math.random() * 7) + 1;
    setFridgeItems(prev => [
      ...prev,
      { name: newItem, expiryDays: randomDays, quantity: 1 }
    ]);
    
    setNewItem('');
    toast({
      title: "Item Added",
      description: `${newItem} added to your fridge tracker`,
    });
  };

  const getRecipeSuggestions = (item: string) => {
    const recipes = {
      'Bananas': ['Banana Bread', 'Smoothie Bowl', 'Banana Pancakes'],
      'Lettuce': ['Caesar Salad', 'Lettuce Wraps', 'Green Smoothie'],
      'Carrots': ['Carrot Soup', 'Roasted Vegetables', 'Carrot Cake'],
      'Tomatoes': ['Pasta Sauce', 'Bruschetta', 'Tomato Soup'],
      'Bread': ['French Toast', 'Breadcrumbs', 'Croutons']
    };
    
    return recipes[item as keyof typeof recipes] || ['Stir Fry', 'Soup', 'Salad'];
  };

  const urgentItems = fridgeItems.filter(item => item.expiryDays <= 2);
  const totalItemsAtRisk = urgentItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Household Food Waste AI</h2>
        <p className="text-muted-foreground mb-4">
          Smart fridge tracking and recipe suggestions to reduce food waste at home
        </p>
        <div className="flex justify-center gap-4">
          <Badge variant="destructive" className="text-lg px-4 py-2">
            🚨 {totalItemsAtRisk} items expiring soon
          </Badge>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            📱 Waste Watcher Active
          </Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Fridge Scanner
            </CardTitle>
            <CardDescription>
              Scan your fridge or manually add items
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleScanFridge} className="w-full" size="lg">
              <Camera className="h-5 w-5 mr-2" />
              Scan Fridge Contents
            </Button>
            
            <div className="border-t pt-4">
              <div className="flex gap-2">
                <Input
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder="Add item manually"
                  onKeyPress={(e) => e.key === 'Enter' && addManualItem()}
                />
                <Button onClick={addManualItem}>Add</Button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Current Fridge Items:</h4>
              {fridgeItems.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex justify-between items-center p-2 rounded ${
                    item.expiryDays <= 2 ? 'bg-red-50 dark:bg-red-950' : 'bg-gray-50 dark:bg-gray-900'
                  }`}
                >
                  <span className="font-medium">{item.name} ({item.quantity})</span>
                  <Badge variant={item.expiryDays <= 2 ? "destructive" : "secondary"}>
                    {item.expiryDays}d left
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChefHat className="h-5 w-5" />
              AI Recipe Suggestions
            </CardTitle>
            <CardDescription>
              Smart recipes using items that expire soon
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {urgentItems.map((item, index) => (
                <div key={index} className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-red-600">Use {item.name} Soon!</h4>
                    <Badge variant="destructive">{item.expiryDays}d left</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Suggested recipes:
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {getRecipeSuggestions(item.name).map((recipe, idx) => (
                      <Badge key={idx} variant="outline" className="cursor-pointer hover:bg-primary/10">
                        {recipe}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
              
              {urgentItems.length === 0 && (
                <div className="text-center p-8 text-muted-foreground">
                  <ChefHat className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Great job! No items expiring soon.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 mx-auto mb-4 text-blue-500" />
            <h3 className="font-semibold mb-2">Expiry Alerts</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get notified 2 days before items expire
            </p>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Set Reminders
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <MapPin className="h-8 w-8 mx-auto mb-4 text-green-500" />
            <h3 className="font-semibold mb-2">Donation Points</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Find nearby food banks for unopened items
            </p>
            <Button variant="outline" size="sm">
              <MapPin className="h-4 w-4 mr-2" />
              Find Locations
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <ChefHat className="h-8 w-8 mx-auto mb-4 text-orange-500" />
            <h3 className="font-semibold mb-2">Meal Planning</h3>
            <p className="text-sm text-muted-foreground mb-4">
              AI-powered weekly meal plans using your fridge items
            </p>
            <Button variant="outline" size="sm">
              <ChefHat className="h-4 w-4 mr-2" />
              Plan Meals
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};