import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { Truck, Calendar as CalendarIcon, Trophy, MapPin, Leaf } from 'lucide-react';

export const CompostPickupService = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [userStats, setUserStats] = useState({
    thisWeek: 4.2,
    thisMonth: 16.8,
    totalComposted: 127.5,
    rank: 23
  });
  const { toast } = useToast();

  const neighborhoods = [
    { name: 'Downtown', rank: 1, composted: 2847, color: 'text-green-600' },
    { name: 'Riverside', rank: 2, composted: 2234, color: 'text-blue-600' },
    { name: 'Oak Hill', rank: 3, composted: 1987, color: 'text-purple-600' },
    { name: 'Maple Grove', rank: 4, composted: 1756, color: 'text-orange-600' },
  ];

  const handleSchedulePickup = () => {
    if (!selectedDate) return;
    
    toast({
      title: "Pickup Scheduled! 🚛",
      description: `Compost pickup confirmed for ${selectedDate.toLocaleDateString()}`,
    });
    
    setUserStats(prev => ({
      ...prev,
      thisWeek: prev.thisWeek + 2.1
    }));
  };

  const handleOrderKit = () => {
    toast({
      title: "Starter Kit Ordered! 📦",
      description: "Your compost bin and bags will arrive in 2-3 days",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Community Compost Pickup</h2>
        <p className="text-muted-foreground mb-4">
          Convenient curbside collection turning your food scraps into community resources
        </p>
        <div className="flex justify-center gap-4">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            🌱 {userStats.thisWeek} lbs this week
          </Badge>
          <Badge variant="outline" className="text-lg px-4 py-2">
            🏆 Rank #{userStats.rank} in ZIP
          </Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Schedule Pickup
            </CardTitle>
            <CardDescription>
              Select your preferred pickup day
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              disabled={(date) => date < new Date() || date.getDay() !== 0} // Only Sundays
            />
            
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950">
              <h4 className="font-medium mb-2">Pickup Details:</h4>
              <ul className="text-sm space-y-1 text-blue-700 dark:text-blue-300">
                <li>• Weekly pickup every Sunday</li>
                <li>• Place bin curbside by 7 AM</li>
                <li>• Clean bin returned same day</li>
                <li>• Compost directed to local farms</li>
              </ul>
            </div>

            <Button onClick={handleSchedulePickup} className="w-full" size="lg">
              <Truck className="h-5 w-5 mr-2" />
              Schedule Weekly Pickup
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5" />
              Your Composting Impact
            </CardTitle>
            <CardDescription>
              Track your environmental contribution
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-950">
                <div className="text-2xl font-bold text-green-600">{userStats.thisWeek}</div>
                <div className="text-sm text-green-700 dark:text-green-300">lbs this week</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950">
                <div className="text-2xl font-bold text-blue-600">{userStats.thisMonth}</div>
                <div className="text-sm text-blue-700 dark:text-blue-300">lbs this month</div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Monthly Goal Progress</span>
                <span className="text-sm text-muted-foreground">{userStats.thisMonth}/25 lbs</span>
              </div>
              <Progress value={(userStats.thisMonth / 25) * 100} className="h-3" />
            </div>

            <div className="p-4 rounded-lg border">
              <h4 className="font-medium mb-2">Lifetime Impact:</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Total Composted:</span>
                  <span className="font-medium">{userStats.totalComposted} lbs</span>
                </div>
                <div className="flex justify-between">
                  <span>CO₂ Avoided:</span>
                  <span className="font-medium">{Math.round(userStats.totalComposted * 0.7)} lbs</span>
                </div>
                <div className="flex justify-between">
                  <span>Soil Created:</span>
                  <span className="font-medium">{Math.round(userStats.totalComposted * 0.3)} lbs</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Neighborhood Leaderboard
            </CardTitle>
            <CardDescription>
              Top green neighborhoods this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {neighborhoods.map((neighborhood, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      index === 0 ? 'bg-yellow-500 text-white' : 
                      index === 1 ? 'bg-gray-400 text-white' :
                      index === 2 ? 'bg-orange-500 text-white' : 'bg-gray-200'
                    }`}>
                      {neighborhood.rank}
                    </div>
                    <div>
                      <div className="font-medium">{neighborhood.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {neighborhood.composted} lbs composted
                      </div>
                    </div>
                  </div>
                  <Trophy className={`h-5 w-5 ${neighborhood.color}`} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>
              Order your free compost starter kit
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950">
              <h4 className="font-medium mb-2 text-green-700 dark:text-green-300">
                Free Starter Kit Includes:
              </h4>
              <ul className="text-sm space-y-1 text-green-600 dark:text-green-400">
                <li>• 1 labeled compost bin (32 gallon)</li>
                <li>• 20 biodegradable compost bags</li>
                <li>• Composting guide & tips</li>
                <li>• QR code for pickup scheduling</li>
              </ul>
            </div>
            
            <Button onClick={handleOrderKit} className="w-full" size="lg">
              <MapPin className="h-5 w-5 mr-2" />
              Order Free Starter Kit
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Kit delivered in 2-3 business days<br />
                First pickup free, then $8/month
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};