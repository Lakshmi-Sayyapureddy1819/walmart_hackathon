
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, MapPin, Thermometer, Droplets, TrendingUp, Volume2, ThumbsUp, ThumbsDown } from 'lucide-react';

interface LiveAIPanelProps {
  language: 'en' | 'hi' | 'ta' | 'te' | 'bn';
}

export const LiveAIPanel: React.FC<LiveAIPanelProps> = ({ language }) => {
  const [activeScenario, setActiveScenario] = useState(0);
  const [freshnessScore, setFreshnessScore] = useState(85);
  const [userFeedback, setUserFeedback] = useState<{[key: string]: 'up' | 'down' | null}>({});

  const translations = {
    en: {
      title: "Live AI Assistant Panel",
      subtitle: "Real-time farming intelligence at your fingertips",
      freshnessScore: "Freshness Score",
      harvestWindow: "Harvest Window",
      optimalRoute: "Optimal Route",
      weatherRisk: "Weather Risk",
      helpful: "Helpful?",
      scenarios: "Farming Scenarios",
      listenToResult: "Listen to Result"
    },
    hi: {
      title: "लाइव AI सहायक पैनल",
      subtitle: "आपकी उंगलियों पर रियल-टाइम खेती की बुद्धिमत्ता",
      freshnessScore: "ताजगी स्कोर",
      harvestWindow: "फसल की अवधि",
      optimalRoute: "इष्टतम मार्ग",
      weatherRisk: "मौसम जोखिम",
      helpful: "सहायक?",
      scenarios: "खेती के परिदृश्य",
      listenToResult: "परिणाम सुनें"
    },
    ta: {
      title: "லைவ் AI உதவியாளர் பேனல்",
      subtitle: "உங்கள் விரல் நுனியில் நிஜ நேர வேளாண்மை நுண்ணறிவு",
      freshnessScore: "புத்துணர்ச்சி மதிப்பெண்",
      harvestWindow: "அறுவடை காலம்",
      optimalRoute: "உகந்த பாதை",
      weatherRisk: "வானிலை அபாயம்",
      helpful: "உதவிகரமானதா?",
      scenarios: "வேளாண்மை காட்சிகள்",
      listenToResult: "முடிவைக் கேளுங்கள்"
    },
    te: {
      title: "లైవ్ AI అసిస్టెంట్ ప్యానెల్",
      subtitle: "మీ చేతుల అంత్య వేళల్లో రియల్-టైమ్ వ్యవసాయ తెలివితేటలు",
      freshnessScore: "తాజా స్కోర్",
      harvestWindow: "పంట కిటికీ",
      optimalRoute: "ఉత్తమ మార్గం",
      weatherRisk: "వాతావరణ ప్రమాదం",
      helpful: "సహాయకరమైనదా?",
      scenarios: "వ్యవసాయ దృశ్యాలు",
      listenToResult: "ఫలితాన్ని వినండి"
    },
    bn: {
      title: "লাইভ AI সহায়ক প্যানেল",
      subtitle: "আপনার হাতের মুঠোয় রিয়েল-টাইম কৃষি বুদ্ধিমত্তা",
      freshnessScore: "সতেজতা স্কোর",
      harvestWindow: "ফসল কাটার সময়",
      optimalRoute: "সর্বোত্তম রুট",
      weatherRisk: "আবহাওয়া ঝুঁকি",
      helpful: "সহায়ক?",
      scenarios: "কৃষি দৃশ্যপট",
      listenToResult: "ফলাফল শুনুন"
    }
  };

  const scenarios = [
    {
      role: "👨‍🌾 Farmer",
      title: "Spinach Harvest Alert",
      message: "Your spinach is 90% ready. Harvest now?",
      voiceMessage: "Your spinach is ninety percent ready. You can harvest by June twenty-fifth.",
      action: "Harvest June 25",
      animation: "🌱 → 🌿 → 🥬"
    },
    {
      role: "🚚 Driver",
      title: "Route Planning",
      message: "You have 3 pickups, 2 need cold storage.",
      voiceMessage: "Plan route now to reach within freshness window.",
      action: "Plan Cold Route",
      animation: "🚚 → 🧊 → 🏪"
    },
    {
      role: "🏪 Store",
      title: "Incoming Delivery",
      message: "You'll receive tomato crates in 6 hrs.",
      voiceMessage: "Tomatoes arriving soon. Shelf them immediately.",
      action: "Prepare Shelving",
      animation: "📦 → 🍅 → 🛒"
    }
  ];

  const miniDashboards = [
    {
      title: translations[language].freshnessScore,
      value: freshnessScore,
      max: 100,
      color: freshnessScore >= 80 ? "green" : freshnessScore >= 60 ? "yellow" : "red",
      icon: Droplets
    },
    {
      title: translations[language].harvestWindow,
      value: "June 23-25",
      subtitle: "3 days optimal",
      icon: Calendar
    },
    {
      title: translations[language].optimalRoute,
      value: "47 km",
      subtitle: "2.5 hours",
      icon: MapPin
    },
    {
      title: translations[language].weatherRisk,
      value: "Low",
      subtitle: "Favorable conditions",
      icon: Thermometer
    }
  ];

  const playVoiceMessage = (message: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = language === 'en' ? 'en-US' : 'hi-IN';
      speechSynthesis.speak(utterance);
    }
  };

  const handleFeedback = (scenarioIndex: number, feedback: 'up' | 'down') => {
    setUserFeedback(prev => ({
      ...prev,
      [scenarioIndex]: feedback
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScenario((prev) => (prev + 1) % scenarios.length);
      setFreshnessScore(prev => Math.max(70, prev + Math.random() * 6 - 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {translations[language].title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {translations[language].subtitle}
          </p>
        </div>

        {/* Mini Dashboards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {miniDashboards.map((dashboard, index) => {
            const Icon = dashboard.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5 text-gray-600" />
                    <Badge variant="secondary" className="text-xs">Live</Badge>
                  </div>
                  <CardTitle className="text-sm text-gray-600">
                    {dashboard.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {typeof dashboard.value === 'number' ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{dashboard.value}%</span>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </div>
                      <Progress 
                        value={dashboard.value} 
                        className="h-2"
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {dashboard.value}
                      </div>
                      {dashboard.subtitle && (
                        <div className="text-sm text-gray-600">
                          {dashboard.subtitle}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Real-life Scenario Cards */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-center mb-8">
            {translations[language].scenarios}
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {scenarios.map((scenario, index) => (
              <Card
                key={index}
                className={`transition-all duration-500 hover:shadow-xl ${
                  activeScenario === index 
                    ? 'scale-105 ring-2 ring-green-400 bg-green-50' 
                    : 'hover:scale-102'
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{scenario.role}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => playVoiceMessage(scenario.voiceMessage)}
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription className="text-base font-medium">
                    {scenario.title}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{scenario.message}</p>
                  
                  <div className="text-center text-2xl py-2">
                    {scenario.animation}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {scenario.action}
                    </Button>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {translations[language].helpful}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFeedback(index, 'up')}
                        className={userFeedback[index] === 'up' ? 'text-green-600' : ''}
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFeedback(index, 'down')}
                        className={userFeedback[index] === 'down' ? 'text-red-600' : ''}
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Interactive Heatmap Placeholder */}
        <Card className="bg-gradient-to-r from-green-100 to-blue-100 border-green-200">
          <CardContent className="p-8">
            <div className="text-center">
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                Interactive Farm Heatmap
              </h4>
              <div className="bg-white/60 rounded-lg p-6 border-2 border-dashed border-green-300">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-1"></div>
                    <div className="text-xs">Fresh Zones</div>
                  </div>
                  <div className="text-center">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto mb-1"></div>
                    <div className="text-xs">Moderate Risk</div>
                  </div>
                  <div className="text-center">
                    <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mb-1"></div>
                    <div className="text-xs">High Spoilage</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Real-time spoilage risk visualization across delivery routes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
