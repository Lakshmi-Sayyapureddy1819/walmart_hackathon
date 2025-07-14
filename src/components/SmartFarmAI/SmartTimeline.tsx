
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, AlertCircle, Calendar, Volume2 } from 'lucide-react';

interface SmartTimelineProps {
  language: 'en' | 'hi' | 'ta' | 'te' | 'bn';
}

export const SmartTimeline: React.FC<SmartTimelineProps> = ({ language }) => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const translations = {
    en: {
      title: "Smart Farm Timeline",
      subtitle: "Your personalized farming schedule",
      completed: "Completed",
      inProgress: "In Progress",
      upcoming: "Upcoming",
      overdue: "Overdue",
      listenDetails: "Listen to details"
    },
    hi: {
      title: "स्मार्ट फार्म टाइमलाइन",
      subtitle: "आपका व्यक्तिगत खेती का कार्यक्रम",
      completed: "पूर्ण",
      inProgress: "प्रगति में",
      upcoming: "आगामी",
      overdue: "विलंबित",
      listenDetails: "विवरण सुनें"
    },
    ta: {
      title: "ஸ்மார்ட் ஃபார்ம் காலவரிசை",
      subtitle: "உங்கள் தனிப்பட்ட வேளாண் அட்டவணை",
      completed: "முடிந்தது",
      inProgress: "நடந்து கொண்டிருக்கிறது",
      upcoming: "வரவிருக்கும்",
      overdue: "தாமதமானது",
      listenDetails: "விவரங்களைக் கேளுங்கள்"
    },
    te: {
      title: "స్మార్ట్ ఫార్మ్ టైమ్‌లైన్",
      subtitle: "మీ వ్యక్తిగత వ్యవసాయ షెడ్యూల్",
      completed: "పూర్తయింది",
      inProgress: "పురోగతిలో",
      upcoming: "రాబోయే",
      overdue: "ఆలస్యం",
      listenDetails: "వివరాలను వినండి"
    },
    bn: {
      title: "স্মার্ট ফার্ম টাইমলাইন",
      subtitle: "আপনার ব্যক্তিগত কৃষি সময়সূচী",
      completed: "সম্পন্ন",
      inProgress: "চলমান",
      upcoming: "আসন্ন",
      overdue: "বিলম্বিত",
      listenDetails: "বিস্তারিত শুনুন"
    }
  };

  const timelineActions = [
    {
      id: '1',
      title: 'Soil Testing',
      description: 'Complete soil pH and nutrient analysis',
      date: 'March 15, 2024',
      status: 'completed',
      icon: '🧪',
      details: 'Soil pH is 6.5, nitrogen levels are optimal. Phosphorus slightly low - consider adding bone meal.'
    },
    {
      id: '2',
      title: 'Seed Planting',
      description: 'Plant tomato seeds in greenhouse',
      date: 'March 22, 2024',
      status: 'completed',
      icon: '🌱',
      details: 'Planted 200 tomato seeds. Germination rate expected at 85%. Keep soil moist but not waterlogged.'
    },
    {
      id: '3',
      title: 'First Watering',
      description: 'Initial irrigation setup',
      date: 'March 25, 2024',
      status: 'in-progress',
      icon: '💧',
      details: 'Water early morning between 5-7 AM. Use drip irrigation for 15 minutes daily.'
    },
    {
      id: '4',
      title: 'Fertilizer Application',
      description: 'Apply organic compost',
      date: 'April 1, 2024',
      status: 'upcoming',
      icon: '🌿',
      details: 'Apply 2kg organic compost per square meter. Mix gently into top soil layer.'
    },
    {
      id: '5',
      title: 'Pest Inspection',
      description: 'Check for early pest signs',
      date: 'March 28, 2024',
      status: 'overdue',
      icon: '🔍',
      details: 'Inspect leaves for aphids, whiteflies, or fungal spots. Take photos for AI analysis if issues found.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'upcoming':
        return 'bg-gray-100 text-gray-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'upcoming':
        return <Calendar className="h-5 w-5 text-gray-600" />;
      case 'overdue':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const playDetails = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'en' ? 'en-US' : 'hi-IN';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {translations[language].title}
          </h2>
          <p className="text-xl text-gray-600">
            {translations[language].subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-blue-600" />
                Farm Activities Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timelineActions.map((action, index) => (
                  <div
                    key={action.id}
                    className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-all duration-300 ${
                      selectedAction === action.id
                        ? 'border-blue-300 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-xl">
                        {action.icon}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{action.title}</h3>
                        {getStatusIcon(action.status)}
                        <Badge className={getStatusColor(action.status)}>
                          {translations[language][action.status as keyof typeof translations[typeof language]]}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-2">{action.description}</p>
                      <p className="text-sm text-gray-500 mb-3">{action.date}</p>
                      
                      {selectedAction === action.id && (
                        <div className="bg-white p-4 rounded-lg border border-gray-200 animate-fade-in">
                          <p className="text-gray-700 mb-3">{action.details}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => playDetails(action.details)}
                            className="flex items-center gap-2"
                          >
                            <Volume2 className="h-4 w-4" />
                            {translations[language].listenDetails}
                          </Button>
                        </div>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedAction(
                          selectedAction === action.id ? null : action.id
                        )}
                        className="mt-2"
                      >
                        {selectedAction === action.id ? 'Hide Details' : 'Show Details'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
