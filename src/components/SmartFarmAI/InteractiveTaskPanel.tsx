
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Volume2, Camera, FileText, Zap, ArrowRight, Mic, MicOff } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  icon: string;
  description: string;
  detailedDescription: string;
  inputType: 'image' | 'text' | 'both';
  demoResult: string;
  voiceDemo: string;
  contextualHelp: string;
}

interface InteractiveTaskPanelProps {
  language: 'en' | 'hi' | 'ta' | 'te' | 'bn';
  onTaskSelect: (task: Task) => void;
}

export const InteractiveTaskPanel: React.FC<InteractiveTaskPanelProps> = ({
  language,
  onTaskSelect
}) => {
  const [hoveredTask, setHoveredTask] = useState<string | null>(null);
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [isListening, setIsListening] = useState<string | null>(null);

  const translations = {
    en: {
      title: "Choose Your Farming Challenge",
      subtitle: "Select a task and let AI help you make smarter decisions",
      tryTask: "Try Task",
      viewDemo: "View Demo",
      listenDescription: "Listen to Description",
      uploadPhoto: "Take Photo",
      enterText: "Enter Details",
      bothOptions: "Photo & Voice",
      voiceInput: "Voice Input",
      whenToUse: "When to use:",
      howItHelps: "How it helps:"
    },
    hi: {
      title: "अपनी खेती की चुनौती चुनें",
      subtitle: "एक कार्य चुनें और AI को स्मार्ट निर्णय लेने में मदद करने दें",
      tryTask: "कार्य आज़माएं",
      viewDemo: "डेमो देखें",
      listenDescription: "विवरण सुनें",
      uploadPhoto: "फोटो लें",
      enterText: "विवरण दर्ज करें",
      bothOptions: "फोटो और आवाज़",
      voiceInput: "आवाज़ इनपुट",
      whenToUse: "कब उपयोग करें:",
      howItHelps: "यह कैसे मदद करता है:"
    },
    ta: {
      title: "உங்கள் வேளாண்மை சவாலைத் தேர்ந்தெடுக்கவும்",
      subtitle: "ஒரு பணியைத் தேர்ந்தெடுத்து, AI உங்களுக்கு சிறந்த முடிவுகளை எடுக்க உதவ அனுமதிக்கவும்",
      tryTask: "பணியை முயற்சிக்கவும்",
      viewDemo: "டெமோவைப் பார்க்கவும்",
      listenDescription: "விளக்கத்தைக் கேளுங்கள்",
      uploadPhoto: "புகைப்படம் எடுக்கவும்",
      enterText: "விவரங்களை உள்ளிடவும்",
      bothOptions: "புகைப்படம் மற்றும் குரல்",
      voiceInput: "குரல் உள்ளீடு",
      whenToUse: "எப்போது பயன்படுத்த வேண்டும்:",
      howItHelps: "இது எப்படி உதவுகிறது:"
    },
    te: {
      title: "మీ వ్యవసాయ సవాలును ఎంచుకోండి",
      subtitle: "ఒక పనిని ఎంచుకోండి మరియు AI మీకు మెరుగైన నిర్ణయాలు తీసుకోవడంలో సహాయపడనివ్వండి",
      tryTask: "పనిని ప్రయత్నించండి",
      viewDemo: "డెమోను చూడండి",
      listenDescription: "వివరణను వినండి",
      uploadPhoto: "ఫోటో తీయండి",
      enterText: "వివరాలను నమోదు చేయండి",
      bothOptions: "ఫోటో మరియు వాయిస్",
      voiceInput: "వాయిస్ ఇన్‌పుట్",
      whenToUse: "ఎప్పుడు ఉపయోగించాలి:",
      howItHelps: "ఇది ఎలా సహాయపడుతుంది:"
    },
    bn: {
      title: "আপনার কৃষি চ্যালেঞ্জ বেছে নিন",
      subtitle: "একটি কাজ বেছে নিন এবং AI কে আপনার স্মার্ট সিদ্ধান্ত নিতে সাহায্য করতে দিন",
      tryTask: "কাজ চেষ্টা করুন",
      viewDemo: "ডেমো দেখুন",
      listenDescription: "বর্ণনা শুনুন",
      uploadPhoto: "ফটো তুলুন",
      enterText: "বিস্তারিত লিখুন",
      bothOptions: "ফটো এবং ভয়েস",
      voiceInput: "ভয়েস ইনপুট",
      whenToUse: "কখন ব্যবহার করবেন:",
      howItHelps: "এটি কীভাবে সাহায্য করে:"
    }
  };

  const tasks: Task[] = [
    // {
    //   id: 'harvest',
    //   title: '🌾 Harvest Readiness',
    //   icon: '🌾',
    //   description: 'Know the perfect time to harvest',
    //   detailedDescription: 'Upload a photo of your crop and get AI-powered recommendations on the optimal harvest timing to maximize yield and quality.',
    //   inputType: 'image',
    //   demoResult: 'Ready in 3-5 days - 92% maturity',
    //   voiceDemo: 'Your crop is ninety-two percent ready. Harvest in three to five days for best results.',
    //   contextualHelp: 'Best used when crops appear to be nearing maturity. Take photos in good lighting, showing leaves, fruits, and overall plant condition.'
    // },
    {
      id: 'freshness',
      title: '❄️ Freshness Prediction',
      icon: '❄️',
      description: 'Predict shelf life and quality',
      detailedDescription: 'Analyze your produce to predict how long it will stay fresh and get storage recommendations.',
      inputType: 'image',
      demoResult: '85% Fresh - 4 days shelf life',
      voiceDemo: 'Your produce is eighty-five percent fresh with four days shelf life remaining.',
      contextualHelp: 'Use this after harvest to determine optimal storage and selling timeline. Take clear photos of the produce showing any signs of ripeness or damage.'
    },
    {
      id: 'route',
      title: '🚚 Route Optimization',
      icon: '🚚',
      description: 'Find the fastest delivery path',
      detailedDescription: 'Enter pickup and delivery locations to get the most efficient route that preserves freshness.',
      inputType: 'both',
      demoResult: '47 km route - 2.5 hours delivery',
      voiceDemo: 'Recommended route is forty-seven kilometers taking two and half hours for delivery.',
      contextualHelp: 'Perfect for planning deliveries to markets or distribution centers. Provide both locations and any special requirements like refrigeration needs.'
    },
    // {
    //   id: 'yield',
    //   title: '📊 Yield Estimation',
    //   icon: '📊',
    //   description: 'Predict crop production',
    //   detailedDescription: 'Provide crop details to get accurate yield predictions and planning recommendations.',
    //   inputType: 'both',
    //   demoResult: '2,340 kg/acre expected yield',
    //   voiceDemo: 'Expected yield is two thousand three hundred forty kilograms per acre.',
    //   contextualHelp: 'Use early in the growing season for planning. Provide field photos and speak about crop variety, planting date, and current conditions.'
    // },
    // {
    //   id: 'disease',
    //   title: '🦠 Disease Detection',
    //   icon: '🦠',
    //   description: 'Identify crop health issues',
    //   detailedDescription: 'Upload photos of affected plants to get instant disease identification and treatment suggestions.',
    //   inputType: 'image',
    //   demoResult: 'Healthy crop - No disease detected',
    //   voiceDemo: 'Your crop appears healthy. No disease detected in the uploaded image.',
    //   contextualHelp: 'Use when you notice unusual spots, discoloration, or wilting. Take close-up photos of affected leaves and overall plant condition.'
    // },
    {
      id: 'weather',
      title: '🌧️ Weather Impact',
      icon: '🌧️',
      description: 'Assess weather risks',
      detailedDescription: 'Get weather impact analysis and recommendations for your specific crop and location.',
      inputType: 'both',
      demoResult: 'Low risk - Favorable conditions',
      voiceDemo: 'Weather conditions are favorable with low risk for your crop.',
      contextualHelp: 'Best used when weather changes are expected. Provide your location and describe your crop type and growth stage.'
    }
  ];

  const getInputTypeIcon = (inputType: string) => {
    switch (inputType) {
      case 'image':
        return <Camera className="h-4 w-4" />;
      case 'text':
        return <Mic className="h-4 w-4" />;
      case 'both':
        return <Zap className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getInputTypeLabel = (inputType: string) => {
    const labels = {
      image: translations[language].uploadPhoto,
      text: translations[language].voiceInput,
      both: translations[language].bothOptions
    };
    return labels[inputType as keyof typeof labels] || inputType;
  };

  const playTaskDescription = (task: Task) => {
    if ('speechSynthesis' in window) {
      setIsListening(task.id);
      const fullDescription = `${task.description}. ${task.contextualHelp}`;
      const utterance = new SpeechSynthesisUtterance(fullDescription);
      utterance.lang = language === 'en' ? 'en-US' : 'hi-IN';
      utterance.onend = () => setIsListening(null);
      speechSynthesis.speak(utterance);
    }
  };

  const playVoiceDemo = (task: Task) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(task.voiceDemo);
      utterance.lang = language === 'en' ? 'en-US' : 'hi-IN';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {translations[language].title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {translations[language].subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <Card
              key={task.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 ${
                hoveredTask === task.id ? 'ring-2 ring-green-400 shadow-lg border-green-300' : 'border-gray-200'
              } ${
                expandedTask === task.id ? 'col-span-full bg-green-50' : ''
              }`}
              onMouseEnter={() => setHoveredTask(task.id)}
              onMouseLeave={() => setHoveredTask(null)}
            >
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">{task.icon}</div>
                <CardTitle className="text-lg flex items-center justify-center gap-2">
                  {task.title}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      playTaskDescription(task);
                    }}
                    className="p-1 h-auto"
                  >
                    {isListening === task.id ? (
                      <MicOff className="h-4 w-4 animate-pulse text-red-500" />
                    ) : (
                      <Volume2 className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </CardTitle>
                <CardDescription className="text-sm">
                  {task.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <Badge variant="secondary" className="w-full justify-center gap-2 text-sm py-2">
                  {getInputTypeIcon(task.inputType)}
                  {getInputTypeLabel(task.inputType)}
                </Badge>

                {/* Hover/Expanded Content */}
                {(hoveredTask === task.id || expandedTask === task.id) && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-800 font-medium mb-2">
                        {translations[language].whenToUse}
                      </p>
                      <p className="text-xs text-blue-700">
                        {task.contextualHelp}
                      </p>
                    </div>
                    
                    <p className="text-sm text-gray-600">
                      {task.detailedDescription}
                    </p>
                    
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Demo Result:
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            playVoiceDemo(task);
                          }}
                          className="p-1 h-auto"
                        >
                          <Volume2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-green-600 font-medium">
                        {task.demoResult}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => onTaskSelect(task)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        {translations[language].tryTask}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedTask(
                            expandedTask === task.id ? null : task.id
                          );
                        }}
                      >
                        {translations[language].viewDemo}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Default State */}
                {hoveredTask !== task.id && expandedTask !== task.id && (
                  <Button
                    onClick={() => onTaskSelect(task)}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {translations[language].tryTask}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
