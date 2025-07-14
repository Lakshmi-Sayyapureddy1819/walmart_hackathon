
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Volume2, Globe, TrendingUp, Users, MapPin } from 'lucide-react';

interface EnhancedHeroProps {
  language: 'en' | 'hi' | 'ta' | 'te' | 'bn';
  onLanguageChange: (lang: 'en' | 'hi' | 'ta' | 'te' | 'bn') => void;
  onGetStarted: () => void;
}

export const EnhancedHero: React.FC<EnhancedHeroProps> = ({
  language,
  onLanguageChange,
  onGetStarted
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStats, setActiveStats] = useState(0);

  const translations = {
    en: {
      title: "Smart Farm-to-Shelf AI Assistant",
      subtitle: "Transform farming with AI-powered decisions for every crop, route, and harvest",
      voiceWelcome: "Welcome to Smart Farming! Choose your language and start solving problems with AI.",
      getStarted: "Get Started with AI",
      tryNow: "Try AI Now",
      languages: "Languages"
    },
    hi: {
      title: "स्मार्ट फार्म-टू-शेल्फ AI सहायक",
      subtitle: "हर फसल, मार्ग और फसल के लिए AI-संचालित निर्णयों के साथ खेती को बदलें",
      voiceWelcome: "स्मार्ट फार्मिंग में आपका स्वागत है! अपनी भाषा चुनें और AI से समस्याओं को हल करना शुरू करें।",
      getStarted: "AI के साथ शुरू करें",
      tryNow: "अभी AI आज़माएं",
      languages: "भाषाएं"
    },
    ta: {
      title: "ஸ்மார்ட் ஃபார்ம்-டு-ஷெல்ஃப் AI உதவியாளர்",
      subtitle: "ஒவ்வொரு பயிர், வழி மற்றும் அறுவடைக்கும் AI-இயங்கும் முடிவுகளுடன் வேளாண்மையை மாற்றுங்கள்",
      voiceWelcome: "ஸ்மார்ட் ஃபார்மிங்கிற்கு வரவேற்கிறோம்! உங்கள் மொழியைத் தேர்ந்தெடுத்து AI மூலம் சிக்கல்களைத் தீர்க்கத் தொடங்குங்கள்.",
      getStarted: "AI உடன் தொடங்குங்கள்",
      tryNow: "இப்போது AI ஐ முயற்சிக்கவும்",
      languages: "மொழிகள்"
    },
    te: {
      title: "స్మార్ట్ ఫార్మ్-టు-షెల్ఫ్ AI సహాయకుడు",
      subtitle: "ప్రతి పంట, మార్గం మరియు పంట కోసం AI-శక్తితో కూడిన నిర్ణయాలతో వ్యవసాయాన్ని మార్చండి",
      voiceWelcome: "స్మార్ట్ ఫార్మింగ్‌కు స్వాగతం! మీ భాషను ఎంచుకోండి మరియు AI తో సమస్యలను పరిష్కరించడం ప్రారంభించండి.",
      getStarted: "AI తో ప్రారంభించండి",
      tryNow: "ఇప్పుడు AI ని ప్రయత్నించండి",
      languages: "భాషలు"
    },
    bn: {
      title: "স্মার্ট ফার্ম-টু-শেল্ফ AI সহায়ক",
      subtitle: "প্রতিটি ফসল, রুট এবং ফসলের জন্য AI-চালিত সিদ্ধান্তের সাথে কৃষিকাজকে রূপান্তরিত করুন",
      voiceWelcome: "স্মার্ট ফার্মিং এ স্বাগতম! আপনার ভাষা বেছে নিন এবং AI দিয়ে সমস্যা সমাধান শুরু করুন।",
      getStarted: "AI দিয়ে শুরু করুন",
      tryNow: "এখনই AI চেষ্টা করুন",
      languages: "ভাষা"
    }
  };

  const stats = [
    { icon: Users, value: "2.5M+", label: "Active Farmers" },
    { icon: TrendingUp, value: "+48%", label: "Yield Increase" },
    { icon: MapPin, value: "12 States", label: "Coverage" }
  ];

  const languageOptions = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' }
  ];

  const playVoiceWelcome = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(translations[language].voiceWelcome);
      utterance.lang = language === 'en' ? 'en-US' : 'hi-IN';
      setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStats((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Language Selector */}
            <div className="flex flex-wrap gap-2">
              {languageOptions.map((lang) => (
                <Button
                  key={lang.code}
                  variant={language === lang.code ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onLanguageChange(lang.code as any)}
                  className="text-xs"
                >
                  <span className="mr-1">{lang.flag}</span>
                  {lang.name}
                </Button>
              ))}
            </div>

            {/* Title with Voice */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    {translations[language].title}
                  </h1>
                  <p className="text-xl text-gray-600 mb-6">
                    {translations[language].subtitle}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={playVoiceWelcome}
                  disabled={isPlaying}
                  className="flex-shrink-0"
                >
                  {isPlaying ? (
                    <Play className="h-4 w-4 animate-pulse" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={onGetStarted}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg animate-pulse"
                >
                  {translations[language].getStarted}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={onGetStarted}
                  className="border-green-600 text-green-600 hover:bg-green-50"
                >
                  {translations[language].tryNow}
                </Button>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            {/* Live Stats Cards */}
            <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg border border-green-200">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className={`text-center p-3 rounded-lg transition-all duration-500 ${
                        activeStats === index
                          ? 'bg-green-100 transform scale-105'
                          : 'bg-gray-50'
                      }`}
                    >
                      <Icon className="h-6 w-6 mx-auto mb-2 text-green-600" />
                      <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Animated Heatmap Placeholder */}
              <div className="h-32 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg flex items-center justify-center border-2 border-dashed border-green-300">
                <div className="text-center">
                  <div className="text-green-600 font-medium mb-1">Live Farm Activity</div>
                  <div className="text-sm text-gray-600">India Coverage Map</div>
                </div>
              </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute -top-4 -right-4 space-y-2">
              <Badge className="bg-green-100 text-green-800 animate-bounce">
                AI Powered
              </Badge>
              <Badge className="bg-blue-100 text-blue-800">
                Voice Enabled
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
