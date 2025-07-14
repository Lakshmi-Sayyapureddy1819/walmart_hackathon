import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Circle, Star, Droplet } from 'lucide-react';

interface UserImpact {
  totalPlasticAvoided: number;
  co2Saved: number;
  sustainableProductsPurchased: number;
  ecoCoinsEarned: number;
  currentStreak: number;
  monthlyGoal: number;
  achievements: Achievement[];
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate?: string;
  progress?: number;
  target?: number;
}

const mockUserImpact: UserImpact = {
  totalPlasticAvoided: 2.3,
  co2Saved: 15.7,
  sustainableProductsPurchased: 47,
  ecoCoinsEarned: 285,
  currentStreak: 7,
  monthlyGoal: 75,
  achievements: [
    {
      id: '1',
      name: 'Plastic-Free Pioneer',
      description: 'Avoided 1 lb of plastic waste',
      icon: '🧴',
      earnedDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Eco Champion',
      description: 'Saved 10 kg CO₂ emissions',
      icon: '🌱',
      earnedDate: '2024-01-20'
    },
    {
      id: '3',
      name: 'Refill Master',
      description: 'Used refill stations 25 times',
      icon: '🔄',
      progress: 18,
      target: 25
    },
    {
      id: '4',
      name: 'Sustainable Shopper',
      description: 'Buy 100 sustainable products',
      icon: '🛒',
      progress: 47,
      target: 100
    }
  ]
};

const weeklyData = [
  { day: 'Mon', plastic: 0.2, co2: 1.2 },
  { day: 'Tue', plastic: 0.4, co2: 2.1 },
  { day: 'Wed', plastic: 0.1, co2: 0.8 },
  { day: 'Thu', plastic: 0.3, co2: 1.9 },
  { day: 'Fri', plastic: 0.5, co2: 3.2 },
  { day: 'Sat', plastic: 0.6, co2: 4.1 },
  { day: 'Sun', plastic: 0.2, co2: 1.4 }
];

const ImpactDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userImpact] = useState<UserImpact>(mockUserImpact);
  
  const progressToGoal = (userImpact.sustainableProductsPurchased / userImpact.monthlyGoal) * 100;

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Personal Impact Ring (Apple Fitness Style) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Circle className="w-5 h-5 text-primary" />
                Your Sustainability Impact
              </CardTitle>
              <CardDescription>
                Track your positive environmental contributions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Impact Rings */}
                <div className="relative flex justify-center">
                  <div className="relative w-64 h-64">
                    {/* Outer Ring - Plastic Avoided */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        className="text-muted/20"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="283"
                        strokeDashoffset={283 - (283 * 0.76)}
                        className="text-green-500 transition-all duration-1000 ease-out"
                        style={{ strokeLinecap: 'round' }}
                      />
                    </svg>
                    
                    {/* Middle Ring - CO2 Saved */}
                    <svg className="absolute inset-4 w-56 h-56 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-muted/20"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray="251"
                        strokeDashoffset={251 - (251 * 0.63)}
                        className="text-blue-500 transition-all duration-1000 ease-out delay-300"
                        style={{ strokeLinecap: 'round' }}
                      />
                    </svg>
                    
                    {/* Inner Ring - Monthly Goal */}
                    <svg className="absolute inset-8 w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        stroke="currentColor"
                        strokeWidth="5"
                        fill="none"
                        className="text-muted/20"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        stroke="currentColor"
                        strokeWidth="5"
                        fill="none"
                        strokeDasharray="220"
                        strokeDashoffset={220 - (220 * (progressToGoal / 100))}
                        className="text-primary transition-all duration-1000 ease-out delay-600"
                        style={{ strokeLinecap: 'round' }}
                      />
                    </svg>
                    
                    {/* Center Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-1">{userImpact.currentStreak}</div>
                        <div className="text-sm text-muted-foreground">Day Streak</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Impact Stats */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-green-500 rounded-full" />
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {userImpact.totalPlasticAvoided} lbs
                      </div>
                      <div className="text-sm text-muted-foreground">Plastic Avoided</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-blue-500 rounded-full" />
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {userImpact.co2Saved} kg
                      </div>
                      <div className="text-sm text-muted-foreground">CO₂ Saved</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-primary rounded-full" />
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {userImpact.sustainableProductsPurchased}/{userImpact.monthlyGoal}
                      </div>
                      <div className="text-sm text-muted-foreground">Monthly Goal Progress</div>
                    </div>
                  </div>

                  <Button className="w-full mt-6">
                    Share My Impact 🌱
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplet className="w-5 h-5 text-primary" />
                This Week's Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.map((day, index) => (
                  <div key={day.day} className="flex items-center gap-4">
                    <div className="w-12 text-sm font-medium">{day.day}</div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Plastic: {day.plastic} lbs</span>
                        <span>CO₂: {day.co2} kg</span>
                      </div>
                      <div className="flex gap-1">
                        <Progress value={day.plastic * 200} className="flex-1 h-2" />
                        <Progress value={day.co2 * 25} className="flex-1 h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* EcoCoins Balance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                EcoCoins Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold text-yellow-600">
                  {userImpact.ecoCoinsEarned}
                </div>
                <div className="text-muted-foreground">Total EcoCoins Earned</div>
                <Button variant="outline" className="w-full">
                  Redeem Rewards
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                Your Achievements
              </CardTitle>
              <CardDescription>
                Badges and milestones you've unlocked
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userImpact.achievements.map((achievement) => (
                  <Card key={achievement.id} className={achievement.earnedDate ? 'bg-primary/5' : 'opacity-60'}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{achievement.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {achievement.description}
                          </p>
                          
                          {achievement.earnedDate ? (
                            <Badge variant="outline" className="bg-green-500/10 text-green-700">
                              Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                            </Badge>
                          ) : achievement.progress !== undefined ? (
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>Progress</span>
                                <span>{achievement.progress}/{achievement.target}</span>
                              </div>
                              <Progress value={(achievement.progress! / achievement.target!) * 100} className="h-2" />
                            </div>
                          ) : (
                            <Badge variant="outline">
                              Not Earned
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Circle className="w-5 h-5 text-primary" />
                Community Impact
              </CardTitle>
              <CardDescription>
                See how you compare with other eco-conscious shoppers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Leaderboard */}
                <div>
                  <h4 className="font-semibold mb-4">This Month's Leaders</h4>
                  <div className="space-y-3">
                    {[
                      { rank: 1, name: 'You', plastic: 2.3, co2: 15.7, isUser: true },
                      { rank: 2, name: 'Sarah M.', plastic: 2.1, co2: 14.2 },
                      { rank: 3, name: 'Mike R.', plastic: 1.9, co2: 13.1 },
                      { rank: 4, name: 'Lisa K.', plastic: 1.7, co2: 12.5 },
                      { rank: 5, name: 'Tom D.', plastic: 1.5, co2: 11.8 }
                    ].map((user) => (
                      <div
                        key={user.rank}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          user.isUser ? 'bg-primary/10 border border-primary/20' : 'bg-muted/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            user.rank === 1 ? 'bg-yellow-500 text-white' :
                            user.rank === 2 ? 'bg-gray-400 text-white' :
                            user.rank === 3 ? 'bg-amber-600 text-white' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {user.rank}
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {user.plastic} lbs plastic • {user.co2} kg CO₂
                            </div>
                          </div>
                        </div>
                        {user.isUser && (
                          <Badge variant="outline">You</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Share Options */}
                <div className="pt-6 border-t">
                  <h4 className="font-semibold mb-4">Share Your Impact</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="w-full">
                      📱 Share to Social
                    </Button>
                    <Button variant="outline" className="w-full">
                      📧 Email Friends
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { ImpactDashboard };