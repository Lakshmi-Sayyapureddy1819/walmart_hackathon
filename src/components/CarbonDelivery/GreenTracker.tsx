import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Leaf, 
  TrendingUp, 
  Award, 
  Share2, 
  Target, 
  Calendar,
  Zap,
  Package,
  Trophy,
  Star
} from 'lucide-react';

interface GreenTrackerProps {
  greenPoints: number;
  carbonSaved: number;
}

const achievements = [
  {
    id: 1,
    title: 'Eco Warrior',
    description: 'Saved 100kg CO₂ through green choices',
    icon: Leaf,
    progress: 82,
    unlocked: false,
    points: 100
  },
  {
    id: 2,
    title: 'Package Hero',
    description: 'Returned 10 reusable packages',
    icon: Package,
    progress: 70,
    unlocked: false,
    points: 50
  },
  {
    id: 3,
    title: 'Pickup Champion',
    description: 'Chose store pickup 5 times',
    icon: Trophy,
    progress: 100,
    unlocked: true,
    points: 25
  }
];

const weeklyGoals = [
  {
    title: 'Green Delivery Week',
    description: 'Choose eco-friendly delivery 3 times',
    progress: 67,
    current: 2,
    target: 3,
    reward: 15
  },
  {
    title: 'Package Return Goal',
    description: 'Return 2 reusable packages',
    progress: 50,
    current: 1,
    target: 2,
    reward: 20
  }
];

const impactData = [
  {
    period: 'This Week',
    carbon: 12,
    packages: 2,
    points: 28
  },
  {
    period: 'This Month',
    carbon: 48,
    packages: 8,
    points: 124
  },
  {
    period: 'All Time',
    carbon: 185,
    packages: 23,
    points: 342
  }
];

export const GreenTracker: React.FC<GreenTrackerProps> = ({
  greenPoints,
  carbonSaved
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Green Impact',
        text: `I've saved ${carbonSaved}kg of CO₂ and earned ${greenPoints} Green Points with Walmart's sustainable delivery choices! 🌱`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const text = `I've saved ${carbonSaved}kg of CO₂ and earned ${greenPoints} Green Points with Walmart's sustainable delivery choices! 🌱`;
      navigator.clipboard.writeText(text);
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">My Green Tracker</h2>
        <p className="text-xl text-gray-600">
          Track your environmental impact and earn rewards for sustainable choices
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Leaf className="h-5 w-5" />
              Green Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">{greenPoints}</div>
            <p className="text-sm text-green-700">+12 this week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Zap className="h-5 w-5" />
              CO₂ Saved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">{carbonSaved}kg</div>
            <p className="text-sm text-blue-700">Equivalent to 98 miles not driven</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <Trophy className="h-5 w-5" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {achievements.filter(a => a.unlocked).length}/{achievements.length}
            </div>
            <p className="text-sm text-purple-700">Badges earned</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-gray-600" />
            Impact Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="goals">Weekly Goals</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                {impactData.map((data, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg text-center"
                  >
                    <h4 className="font-semibold text-gray-900 mb-3">{data.period}</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="text-2xl font-bold text-green-600">{data.carbon}kg</div>
                        <div className="text-xs text-gray-600">CO₂ Saved</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-blue-600">{data.packages}</div>
                        <div className="text-xs text-gray-600">Packages Returned</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-purple-600">{data.points}</div>
                        <div className="text-xs text-gray-600">Points Earned</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button onClick={handleShare} className="bg-green-600 hover:bg-green-700">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share My Impact
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div 
                    key={achievement.id}
                    className={`p-4 rounded-lg border ${
                      achievement.unlocked 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        achievement.unlocked 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold flex items-center gap-2">
                          {achievement.title}
                          {achievement.unlocked && (
                            <Badge className="bg-green-100 text-green-700">
                              <Star className="h-3 w-3 mr-1" />
                              Unlocked
                            </Badge>
                          )}
                        </h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-purple-600">
                          {achievement.points} pts
                        </div>
                      </div>
                    </div>
                    
                    {!achievement.unlocked && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <Progress 
                          value={achievement.progress} 
                          className="h-2"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </TabsContent>

            <TabsContent value="goals" className="space-y-4">
              {weeklyGoals.map((goal, index) => (
                <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-blue-900">{goal.title}</h4>
                      <p className="text-sm text-blue-700">{goal.description}</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700">
                      +{goal.reward} points
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress: {goal.current}/{goal.target}</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <Progress 
                      value={goal.progress} 
                      className="h-2"
                    />
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Weekly Insights */}
      <Card className="bg-gradient-to-r from-green-900 to-blue-900 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            This Week's Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">🎉 Great Job!</h4>
              <p className="text-green-100 text-sm mb-4">
                You chose store pickup 3 times this week, saving 21kg of CO₂ compared to express delivery. 
                That's like taking a car off the road for 52 miles!
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">💡 Suggestion</h4>
              <p className="text-blue-100 text-sm">
                Try returning 1 more reusable package this week to unlock the "Package Hero" achievement 
                and earn 50 bonus points!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};