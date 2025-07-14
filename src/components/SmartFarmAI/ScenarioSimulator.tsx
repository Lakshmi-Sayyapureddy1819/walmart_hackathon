
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Volume2, CloudRain, Bug, TrendingUp, Zap } from 'lucide-react';

interface ScenarioSimulatorProps {
  language: 'en' | 'hi' | 'ta' | 'te' | 'bn';
}

export const ScenarioSimulator: React.FC<ScenarioSimulatorProps> = ({ language }) => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const translations = {
    en: {
      title: "AI Scenario Simulator",
      subtitle: "Test different farming scenarios and get instant AI recommendations",
      simulate: "Simulate",
      reset: "Try Another",
      simulating: "Analyzing...",
      listen: "Listen to recommendation"
    },
    hi: {
      title: "AI परिदृश्य सिमुलेटर",
      subtitle: "विभिन्न खेती परिदृश्यों का परीक्षण करें और तत्काल AI सिफारिशें प्राप्त करें",
      simulate: "अनुकरण करें",
      reset: "दूसरा प्रयास करें",
      simulating: "विश्लेषण कर रहे हैं...",
      listen: "सिफारिश सुनें"
    },
    ta: {
      title: "AI காட்சி सिमुलेटर்",
      subtitle: "பல்வேறு வேளாண்மை காட்சிகளை சோதித்து உடனடி AI பரிந்துரைகளைப் பெறுங்கள்",
      simulate: "अनुकरण करें",
      reset: "மற்றொன்றை முயற்சிக்கவும்",
      simulating: "विश्लेषण कर रहे हैं...",
      listen: "सिफारिश सुनें"
    },
    te: {
      title: "AI దృश్య సిమ్యులేటర్",
      subtitle: "వివిధ వ్యవసాయ దృశ్యాలను పరీక్షించి తక్షణ AI సిఫార్సులను పొందండి",
      simulate: "అనుకరణ చేయండి",
      reset: "మరొకటి ప్రయత్నించండి",
      simulating: "విశ్లేషిస్తోంది...",
      listen: "సిఫార్సును వినండి"
    },
    bn: {
      title: "AI দৃশ্য সিমুলেটর",
      subtitle: "বিভিন্ন কৃষি দৃশ্য পরীক্ষা করুন এবং তাৎক্ষণিক AI সুপারিশ পান",
      simulate: "অনুকরণ করুন",
      reset: "অন্য চেষ্টা করুন",
      simulating: "বিশ্লেষণ করছে...",
      listen: "সুপারিশ শুনুন"
    }
  };

  const scenarios = [
    {
      id: 'weather',
      icon: CloudRain,
      title: '🌧️ Heavy Rain Alert',
      description: 'Unexpected rainfall predicted',
      result: 'Harvest immediately. Cover crops. Install drainage.',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'pest',
      icon: Bug,
      title: '🐛 Pest Outbreak',
      description: 'Aphid infestation detected',
      result: 'Apply neem oil spray. Introduce ladybugs. Monitor daily.',
      color: 'bg-red-100 text-red-800'
    },
    {
      id: 'market',
      icon: TrendingUp,
      title: '📈 Price Surge',
      description: 'Crop prices increased 40%',
      result: 'Delay harvest by 3 days. Quality check. Premium pricing.',
      color: 'bg-green-100 text-green-800'
    }
  ];

  const handleSimulate = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setIsSimulating(true);
    
    setTimeout(() => {
      const scenario = scenarios.find(s => s.id === scenarioId);
      setResult(scenario?.result || '');
      setIsSimulating(false);
    }, 2000);
  };

  const playRecommendation = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'en' ? 'en-US' : 'hi-IN';
      speechSynthesis.speak(utterance);
    }
  };

  const reset = () => {
    setSelectedScenario(null);
    setResult(null);
    setIsSimulating(false);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Zap className="h-6 w-6 text-yellow-500" />
          {translations[language].title}
        </CardTitle>
        <CardDescription className="text-lg">
          {translations[language].subtitle}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {!selectedScenario ? (
          <div className="grid md:grid-cols-3 gap-4">
            {scenarios.map((scenario) => {
              const Icon = scenario.icon;
              return (
                <Card
                  key={scenario.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                  onClick={() => handleSimulate(scenario.id)}
                >
                  <CardContent className="p-6 text-center">
                    <Icon className="h-8 w-8 mx-auto mb-3 text-gray-600" />
                    <h3 className="font-semibold mb-2">{scenario.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{scenario.description}</p>
                    <Badge className={scenario.color}>
                      {translations[language].simulate}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center space-y-4">
            {isSimulating ? (
              <div className="py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-lg">{translations[language].simulating}</p>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-green-800">
                  AI Recommendation:
                </h3>
                <p className="text-green-700 mb-4">{result}</p>
                <div className="flex gap-2 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => playRecommendation(result || '')}
                    className="flex items-center gap-2"
                  >
                    <Volume2 className="h-4 w-4" />
                    {translations[language].listen}
                  </Button>
                  <Button onClick={reset}>
                    {translations[language].reset}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
