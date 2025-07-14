
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Recycle, Database, Search, ArrowRight, TreePine, Package } from 'lucide-react';
import Image from "../../assests/rtr2.jpg"

type Language = "en" | "hi" | "ta" | "te" | "bn";

interface ReturnsHeroProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const translations = {
  en: {
    title: "Returns-to-Resource Engine",
    subtitle: "Transform returns into recovery — an AI-powered module for smarter, greener reverse logistics.",
    description: "Every returned item is an opportunity — to recover value, reduce waste, and give products a second life. Our AI-driven solution helps retailers make sustainable decisions with simple, intuitive tools.",
    seeInAction: "See the Engine in Action",
    viewAnalytics: "View Analytics",
    simulateReturn: "Simulate Return",
    impactStats: "Real Impact"
  },
  hi: {
    title: "रिटर्न-टू-रिसोर्स इंजन",
    subtitle: "रिटर्न को रिकवरी में बदलें — स्मार्ट, हरित रिवर्स लॉजिस्टिक्स के लिए AI-संचालित मॉड्यूल।",
    description: "हर वापस किया गया आइटम एक अवसर है — मूल्य वसूलने का, कचरा कम करने का, और उत्पादों को दूसरा जीवन देने का।",
    seeInAction: "एक्शन में इंजन देखें",
    viewAnalytics: "एनालिटिक्स देखें",
    simulateReturn: "रिटर्न सिमुलेट करें",
    impactStats: "वास्तविक प्रभाव"
  },
  ta: {
    title: "திரும்ப-வளம் என்ஜின்",
    subtitle: "திரும்புவதை மீட்டெடுப்பாக மாற்றுங்கள் — ஸ்மார்ட், பசுமையான ரிவர்ஸ் லாஜிஸ்டிக்ஸ்க்கான AI-இயங்கும் மாட்யூல்।",
    description: "ஒவ்வொரு திரும்பிய பொருளும் ஒரு வாய்ப்பு — மதிப்பை மீட்டெடுக்க, கழிவுகளை குறைக்க, மற்றும் தயாரிப்புகளுக்கு இரண்டாவது வாழ்க்கை கொடுக்க।",
    seeInAction: "செயலில் இன்ஜினைப் பார்க்கவும்",
    viewAnalytics: "அனலிட்டிக்ஸ் பார்க்க",
    simulateReturn: "ரிட்டர்ன் சிமுலேட்",
    impactStats: "உண்மையான தாக்கம்"
  },
  te: {
    title: "రిటర్న్స్-టు-రిసోర్స్ ఇంజిన్",
    subtitle: "రిటర్న్స్‌ను రికవరీగా మార్చండి — స్మార్ట్, పచ్చని రివర్స్ లాజిస్టిక్స్ కోసం AI-శక్తితో నడిచే మాడ్యూల్।",
    description: "తిరిగి వచ్చిన ప్రతి వస్తువు ఒక అవకాశం — విలువను తిరిగి పొందడానికి, వ్యర్థాలను తగ్గించడానికి మరియు ఉత్పత్తులకు రెండవ జీవితాన్ని ఇవ్వడానికి।",
    seeInAction: "ఇంజిన్‌ను చర్యలో చూడండి",
    viewAnalytics: "అనలిటిక్స్ చూడండి",
    simulateReturn: "రిటర్న్ సిమ్యులేట్",
    impactStats: "నిజమైన ప్రభావం"
  },
  bn: {
    title: "রিটার্নস-টু-রিসোর্স ইঞ্জিন",
    subtitle: "রিটার্নকে পুনরুদ্ধারে রূপান্তরিত করুন — স্মার্ট, সবুজ রিভার্স লজিস্টিক্সের জন্য AI-চালিত মডিউল।",
    description: "প্রতিটি ফেরত দেওয়া আইটেম একটি সুযোগ — মূল্য পুনরুদ্ধার করার, বর্জ্য কমানোর এবং পণ্যগুলিকে দ্বিতীয় জীবন দেওয়ার।",
    seeInAction: "ইঞ্জিনকে কর্মে দেখুন",
    viewAnalytics: "অ্যানালিটিক্স দেখুন",
    simulateReturn: "রিটার্ন সিমুলেট",
    impactStats: "প্রকৃত প্রভাব"
  }
};

export const ReturnsHero: React.FC<ReturnsHeroProps> = ({ 
  selectedLanguage, 
  onLanguageChange 
}) => {
  const t = translations[selectedLanguage];

  const scrollToDemo = () => {
    const element = document.querySelector('[data-tab="tablist"]');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-green-600 to-teal-600 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 animate-pulse">
          <Package className="h-16 w-16" />
        </div>
        <div className="absolute top-40 right-20 animate-pulse delay-1000">
          <Recycle className="h-12 w-12" />
        </div>
        <div className="absolute bottom-20 left-1/4 animate-pulse delay-2000">
          <TreePine className="h-20 w-20" />
        </div>
      </div>
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="flex justify-end mb-8">
          <Select value={selectedLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिंदी</SelectItem>
              <SelectItem value="ta">தமிழ்</SelectItem>
              <SelectItem value="te">తెలుగు</SelectItem>
              <SelectItem value="bn">বাংলা</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {t.title}
              </h1>
              
              <p className="text-xl md:text-2xl mb-6 text-blue-100 leading-relaxed">
                {t.subtitle}
              </p>
              
              <p className="text-lg mb-8 text-white/90 leading-relaxed">
                {t.description}
              </p>
            </div>

            {/* Impact Stats */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold mb-4 text-green-100">{t.impactStats}</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">87%</div>
                  <div className="text-sm text-blue-100">Recovery Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">₹2.3L</div>
                  <div className="text-sm text-blue-100">Value Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">1.2T</div>
                  <div className="text-sm text-blue-100">CO₂ Saved</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 group"
                onClick={scrollToDemo}
              >
                <Database className="mr-2 h-5 w-5" />
                {t.seeInAction}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white bg-white/10 px-8"
              >
                <Search className="mr-2 h-5 w-5" />
                {t.simulateReturn}
              </Button>
            </div>
          </div>

          {/* Right Side - Animated Illustration */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <img src={Image} alt="Returns to Resource" className="rounded-2xl shadow-xl" />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
