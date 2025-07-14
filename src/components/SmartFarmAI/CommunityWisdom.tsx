
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Volume2, Play } from 'lucide-react';

interface CommunityWisdomProps {
  language: 'en' | 'hi' | 'ta' | 'te' | 'bn';
}

export const CommunityWisdom: React.FC<CommunityWisdomProps> = ({ language }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const translations = {
    en: {
      title: "Community Wisdom",
      subtitle: "Learn from fellow farmers' experiences",
      playTip: "Play tip",
      listenStory: "Listen to story"
    },
    hi: {
      title: "सामुदायिक ज्ञान",
      subtitle: "साथी किसानों के अनुभवों से सीखें",
      playTip: "सुझाव चलाएं",
      listenStory: "कहानी सुनें"
    },
    ta: {
      title: "சமூக அறிவு",
      subtitle: "சக விவசாயிகளின் அனுபவங்களிலிருந்து கற்றுக்கொள்ளுங்கள்",
      playTip: "குறிப்பை இயக்கவும்",
      listenStory: "கதையைக் கேளுங்கள்"
    },
    te: {
      title: "కమ్యూనిటీ జ్ఞానం",
      subtitle: "తోటి రైతుల అనుభవాల నుండి నేర్చుకోండి",
      playTip: "చిట్కాను ప్లే చేయండి",
      listenStory: "కథను వినండి"
    },
    bn: {
      title: "কমিউনিটি জ্ঞান",
      subtitle: "সহযোগী কৃষকদের অভিজ্ঞতা থেকে শিখুন",
      playTip: "টিপ চালান",
      listenStory: "গল্প শুনুন"
    }
  };

  const stories = [
    {
      id: 1,
      farmer: "Priya Sharma",
      location: "Punjab",
      avatar: "👩‍🌾",
      tip: "Water early morning to reduce evaporation by 30%",
      story: "I started watering my crops at 5 AM instead of afternoon. My water usage dropped significantly and crops grew healthier.",
      success: "+25% yield increase"
    },
    {
      id: 2,
      farmer: "Ravi Kumar",
      location: "Karnataka",
      avatar: "👨‍🌾",
      tip: "Mix neem oil with soap for natural pest control",
      story: "Chemical pesticides were expensive. This natural solution saved money and improved soil health.",
      success: "₹15,000 saved annually"
    },
    {
      id: 3,
      farmer: "Meera Patel",
      location: "Gujarat",
      avatar: "👩‍🌾",
      tip: "Plant marigolds around tomatoes to repel insects",
      story: "Companion planting reduced pest damage by 60% without any chemicals.",
      success: "60% less pest damage"
    }
  ];

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const playStory = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'en' ? 'en-US' : 'hi-IN';
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    const interval = setInterval(nextStory, 8000);
    return () => clearInterval(interval);
  }, []);

  const currentStory = stories[currentIndex];

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
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
          <Card className="relative overflow-hidden bg-gradient-to-r from-white to-orange-50 border-2 border-orange-200">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{currentStory.avatar}</div>
                    <div>
                      <h3 className="text-xl font-semibold">{currentStory.farmer}</h3>
                      <p className="text-gray-600">{currentStory.location}</p>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
                    <p className="font-medium text-yellow-800">{currentStory.tip}</p>
                  </div>
                  
                  <p className="text-gray-700">{currentStory.story}</p>
                  
                  <div className="bg-green-100 px-4 py-2 rounded-full inline-block">
                    <span className="text-green-800 font-medium">{currentStory.success}</span>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto flex items-center justify-center text-white text-4xl shadow-lg">
                      {currentStory.avatar}
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => playStory(currentStory.story)}
                    disabled={isPlaying}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    {isPlaying ? (
                      <Play className="h-4 w-4 mr-2 animate-pulse" />
                    ) : (
                      <Volume2 className="h-4 w-4 mr-2" />
                    )}
                    {translations[language].listenStory}
                  </Button>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-6">
                <Button variant="outline" size="sm" onClick={prevStory}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex gap-2">
                  {stories.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentIndex ? 'bg-orange-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <Button variant="outline" size="sm" onClick={nextStory}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
