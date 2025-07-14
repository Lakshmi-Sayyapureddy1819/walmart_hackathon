
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, X, Volume2, MessageCircle, Book, Phone } from 'lucide-react';

interface QuickHelpProps {
  language: 'en' | 'hi' | 'ta' | 'te' | 'bn';
}

export const QuickHelp: React.FC<QuickHelpProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHelp, setSelectedHelp] = useState<string | null>(null);

  const translations = {
    en: {
      quickHelp: "Quick Help",
      voiceGuide: "Voice Guide",
      chatSupport: "Chat Support",
      tutorials: "Tutorials",
      callExpert: "Call Expert",
      close: "Close",
      voiceGuideDesc: "Step-by-step voice instructions for any farming task",
      chatDesc: "Chat with AI assistant in your local language",
      tutorialDesc: "Watch video tutorials with voice narration",
      expertDesc: "Connect with local farming experts",
      startVoiceGuide: "Start Voice Guide",
      startChat: "Start Chat",
      watchTutorials: "Watch Tutorials",
      callNow: "Call Now"
    },
    hi: {
      quickHelp: "त्वरित सहायता",
      voiceGuide: "आवाज़ गाइड",
      chatSupport: "चैट सहायता",
      tutorials: "ट्यूटोरियल",
      callExpert: "विशेषज्ञ को कॉल करें",
      close: "बंद करें",
      voiceGuideDesc: "किसी भी खेती के काम के लिए चरणबद्ध आवाज़ निर्देश",
      chatDesc: "अपनी स्थानीय भाषा में AI सहायक से चैट करें",
      tutorialDesc: "आवाज़ कथन के साथ वीडियो ट्यूटोरियल देखें",
      expertDesc: "स्थानीय कृषि विशेषज्ञों से जुड़ें",
      startVoiceGuide: "आवाज़ गाइड शुरू करें",
      startChat: "चैट शुरू करें",
      watchTutorials: "ट्यूटोरियल देखें",
      callNow: "अभी कॉल करें"
    },
    ta: {
      quickHelp: "விரைவு உதவி",
      voiceGuide: "குரல் வழிகாட்டி",
      chatSupport: "அரட்டை ஆதரவு",
      tutorials: "பயிற்சி",
      callExpert: "நிபுணரை அழைக்கவும்",
      close: "மூடு",
      voiceGuideDesc: "எந்த வேளாண் பணிக்கும் படிப்படியான குரல் வழிமுறைகள்",
      chatDesc: "உங்கள் உள்ளூர் மொழியில் AI உதவியாளருடன் அரட்டை அடிக்கவும்",
      tutorialDesc: "குரல் விவரணையுடன் வீडியோ பயிற்சிகளைப் பார்க்கவும்",
      expertDesc: "உள்ளூர் வேளாண் நிபுணர்களுடன் இணைக்கவும்",
      startVoiceGuide: "குரல் வழிகாட்டியைத் தொடக்கவும்",
      startChat: "அரட்டையைத் தொடங்கவும்",
      watchTutorials: "பயிற்சிகளைப் பார்க்கவும்",
      callNow: "இப்போது அழைக்கவும்"
    },
    te: {
      quickHelp: "త్వరిత సహాయం",
      voiceGuide: "వాయిస్ గైడ్",
      chatSupport: "చాట్ మద్దతు",
      tutorials: "ట్యుటోరియల్స్",
      callExpert: "నిపుణుడిని కాల్ చేయండి",
      close: "మూసివేయండి",
      voiceGuideDesc: "ఏదైనా వ్యవసాయ పని కోసం దశలవారీ వాయిస్ సూచనలు",
      chatDesc: "మీ స్థానిక భాషలో AI అసిస్టెంట్‌తో చాట్ చేయండి",
      tutorialDesc: "వాయిస్ వర్ణనతో వీడియో ట్యుటోరియల్స్ చూడండి",
      expertDesc: "స్థానిక వ్యవసాయ నిపుణులతో కనెక్ట్ అవ్వండి",
      startVoiceGuide: "వాయిస్ గైడ్ ప్రారంభించండి",
      startChat: "చాట్ ప్రారంభించండి",
      watchTutorials: "ట్యుటోరియల్స్ చూడండి",
      callNow: "ఇప్పుడు కాల్ చేయండి"
    },
    bn: {
      quickHelp: "দ্রুত সাহায্য",
      voiceGuide: "ভয়েস গাইড",
      chatSupport: "চ্যাট সাপোর্ট",
      tutorials: "টিউটোরিয়াল",
      callExpert: "বিশেষজ্ঞকে কল করুন",
      close: "বন্ধ করুন",
      voiceGuideDesc: "যেকোনো কৃষি কাজের জন্য ধাপে ধাপে ভয়েস নির্দেশনা",
      chatDesc: "আপনার স্থানীয় ভাষায় AI সহায়কের সাথে চ্যাট করুন",
      tutorialDesc: "ভয়েস বর্ণনা সহ ভিডিও টিউটোরিয়াল দেখুন",
      expertDesc: "স্থানীয় কৃষি বিশেষজ্ঞদের সাথে সংযোগ করুন",
      startVoiceGuide: "ভয়েস গাইড শুরু করুন",
      startChat: "চ্যাট শুরু করুন",
      watchTutorials: "টিউটোরিয়াল দেখুন",
      callNow: "এখনই কল করুন"
    }
  };

  const helpOptions = [
    {
      id: 'voice',
      icon: Volume2,
      title: translations[language].voiceGuide,
      description: translations[language].voiceGuideDesc,
      action: translations[language].startVoiceGuide,
      color: 'bg-blue-500'
    },
    {
      id: 'chat',
      icon: MessageCircle,
      title: translations[language].chatSupport,
      description: translations[language].chatDesc,
      action: translations[language].startChat,
      color: 'bg-green-500'
    },
    {
      id: 'tutorials',
      icon: Book,
      title: translations[language].tutorials,
      description: translations[language].tutorialDesc,
      action: translations[language].watchTutorials,
      color: 'bg-purple-500'
    },
    {
      id: 'expert',
      icon: Phone,
      title: translations[language].callExpert,
      description: translations[language].expertDesc,
      action: translations[language].callNow,
      color: 'bg-orange-500'
    }
  ];

  const handleAction = (optionId: string) => {
    // In a real implementation, these would trigger actual functionality
    switch (optionId) {
      case 'voice':
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance('Welcome to voice guided farming assistance. Please tell me what you need help with.');
          utterance.lang = language === 'en' ? 'en-US' : 'hi-IN';
          speechSynthesis.speak(utterance);
        }
        break;
      case 'chat':
        alert('Opening chat support...');
        break;
      case 'tutorials':
        alert('Opening video tutorials...');
        break;
      case 'expert':
        alert('Connecting to expert... Phone: +91-1800-FARM-HELP');
        break;
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Help Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          size="lg"
        >
          <HelpCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Help Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl">
                {translations[language].quickHelp}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {helpOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <Card
                      key={option.id}
                      className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-green-300"
                      onClick={() => handleAction(option.id)}
                    >
                      <CardContent className="p-6 text-center">
                        <div className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{option.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                        <Button className="w-full">
                          {option.action}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};
