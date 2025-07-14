
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, ArrowRight, Truck, Store, Leaf } from 'lucide-react';

interface ProgressCardsProps {
  language: 'en' | 'hi' | 'ta' | 'te' | 'bn';
}

export const ProgressCards: React.FC<ProgressCardsProps> = ({ language }) => {
  const [activeCard, setActiveCard] = useState(0);

  const translations = {
    en: {
      title: "Track Your Progress",
      subtitle: "Monitor your farming journey in real-time",
      farmer: "Farmer Progress",
      logistics: "Logistics Progress", 
      store: "Store Progress",
      completed: "Completed",
      inProgress: "In Progress",
      pending: "Pending",
      swipeToView: "Swipe to view different roles"
    },
    hi: {
      title: "अपनी प्रगति ट्रैक करें",
      subtitle: "अपनी खेती की यात्रा को रियल-टाइम में मॉनिटर करें",
      farmer: "किसान प्रगति",
      logistics: "रसद प्रगति",
      store: "स्टोर प्रगति",
      completed: "पूर्ण",
      inProgress: "प्रगति में",
      pending: "लंबित",
      swipeToView: "विभिन्न भूमिकाओं को देखने के लिए स्वाइप करें"
    },
    ta: {
      title: "உங்கள் முன்னேற்றத்தைக் கண்காணிக்கவும்",
      subtitle: "உங்கள் வேளாண்மை பயணத்தை நிஜ நேரத்தில் கண்காணிக்கவும்",
      farmer: "விவசாயி முன்னேற்றம்",
      logistics: "தளவாட முன்னேற்றம்",
      store: "கடை முன்னேற்றம்",
      completed: "முடிந்தது",
      inProgress: "முன்னேற்றத்தில்",
      pending: "நிலுவையில்",
      swipeToView: "வெவ்வேறு பாத்திரங்களைப் பார்க்க ஸ்வைப் செய்யவும்"
    },
    te: {
      title: "మీ పురోగతిని ట్రాక్ చేయండి",
      subtitle: "మీ వ్యవసాయ ప్రయాణాన్ని రియల్-టైమ్‌లో పర్యవేక్షించండి",
      farmer: "రైతు పురోగతి",
      logistics: "లాజిస్టిక్స్ పురోగతి",
      store: "స్టోర్ పురోగతి",
      completed: "పూర్తయింది",
      inProgress: "పురోగతిలో",
      pending: "పెండింగ్",
      swipeToView: "వేర్వేరు పాత్రలను చూడటానికి స్వైప్ చేయండి"
    },
    bn: {
      title: "আপনার অগ্রগতি ট্র্যাক করুন",
      subtitle: "রিয়েল-টাইমে আপনার কৃষি যাত্রা মনিটর করুন",
      farmer: "কৃষক অগ্রগতি",
      logistics: "লজিস্টিক্স অগ্রগতি",
      store: "স্টোর অগ্রগতি",
      completed: "সম্পন্ন",
      inProgress: "চলমান",
      pending: "মুলতুবি",
      swipeToView: "বিভিন্ন ভূমিকা দেখতে স্বাইপ করুন"
    }
  };

  const progressData = [
    {
      id: 'farmer',
      title: translations[language].farmer,
      icon: Leaf,
      color: 'green',
      steps: [
        { name: 'Crop Registration', status: 'completed', progress: 100 },
        { name: 'AI Health Check', status: 'completed', progress: 100 },
        { name: 'Harvest Alert', status: 'inProgress', progress: 75 },
        { name: 'Pickup Scheduled', status: 'pending', progress: 0 }
      ]
    },
    {
      id: 'logistics',
      title: translations[language].logistics,
      icon: Truck,
      color: 'blue',
      steps: [
        { name: 'Route Planning', status: 'completed', progress: 100 },
        { name: 'Temperature Monitoring', status: 'inProgress', progress: 60 },
        { name: 'ETA Updates', status: 'inProgress', progress: 45 },
        { name: 'Delivery Confirmation', status: 'pending', progress: 0 }
      ]
    },
    {
      id: 'store',
      title: translations[language].store,
      icon: Store,
      color: 'purple',
      steps: [
        { name: 'Arrival Notification', status: 'completed', progress: 100 },
        { name: 'Quality Inspection', status: 'inProgress', progress: 80 },
        { name: 'Shelf Stocking', status: 'pending', progress: 0 },
        { name: 'Sales Tracking', status: 'pending', progress: 0 }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'inProgress':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return translations[language].completed;
      case 'inProgress':
        return translations[language].inProgress;
      default:
        return translations[language].pending;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'inProgress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {translations[language].title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {translations[language].subtitle}
          </p>
        </div>

        {/* Card Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-md">
            {progressData.map((data, index) => {
              const Icon = data.icon;
              return (
                <Button
                  key={data.id}
                  variant={activeCard === index ? 'default' : 'ghost'}
                  onClick={() => setActiveCard(index)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{data.title}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Active Card Display */}
        <div className="max-w-2xl mx-auto">
          {progressData.map((data, index) => {
            const Icon = data.icon;
            return (
              <Card
                key={data.id}
                className={`transition-all duration-500 transform ${
                  activeCard === index 
                    ? 'scale-100 opacity-100 translate-y-0' 
                    : 'scale-95 opacity-0 absolute pointer-events-none translate-y-4'
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <Icon className={`h-6 w-6 text-${data.color}-600`} />
                      {data.title}
                    </CardTitle>
                    <Badge variant="outline">
                      {data.steps.filter(step => step.status === 'completed').length} / {data.steps.length}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {data.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(step.status)}
                          <span className="font-medium">{step.name}</span>
                        </div>
                        <Badge className={getStatusColor(step.status)}>
                          {getStatusLabel(step.status)}
                        </Badge>
                      </div>
                      
                      {step.progress > 0 && (
                        <Progress 
                          value={step.progress} 
                          className="h-2 bg-gray-200"
                        />
                      )}
                    </div>
                  ))}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => setActiveCard(Math.max(0, activeCard - 1))}
                      disabled={activeCard === 0}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setActiveCard(Math.min(progressData.length - 1, activeCard + 1))}
                      disabled={activeCard === progressData.length - 1}
                    >
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="text-center mt-8 text-sm text-gray-600">
          {translations[language].swipeToView}
        </div>
      </div>
    </section>
  );
};
