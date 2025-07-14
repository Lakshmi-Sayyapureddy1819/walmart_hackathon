import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, Leaf, Coins, Award, ArrowRight, Recycle } from 'lucide-react';
import Image from "../../assests/mod3.jpg"
type Language = "en" | "hi" | "ta" | "te" | "bn";

interface EcoHeroProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
  totalEcoCoins: number;
}

const translations = {
  en: {
    title: "Eco-Packaging Configurator",
    subtitle: "AI-guided decisions for low-impact, high-performance packaging",
    description: "Packaging doesn't have to be a sustainability blind spot. Our AI-powered assistant recommends optimal packaging based on product traits, transit demands, environmental impact, and cost.",
    startConfig: "Start Configuration",
    viewAnalytics: "View Analytics",
    ecoCoins: "Eco-Coins Earned",
    impactStats: "Today's Impact"
  },
  hi: {
    title: "इको-पैकेजिंग कॉन्फ़िगरेटर",
    subtitle: "कम प्रभाव, उच्च-प्रदर्शन पैकेजिंग के लिए AI-निर्देशित निर्णय",
    description: "पैकेजिंग को स्थिरता की अंधी जगह नहीं होना चाहिए। हमारा AI-संचालित सहायक उत्पाद गुणों के आधार पर इष्टतम पैकेजिंग की सिफारिश करता है।",
    startConfig: "कॉन्फ़िगरेशन शुरू करें",
    viewAnalytics: "एनालिटिक्स देखें",
    ecoCoins: "अर्जित इको-कॉइन",
    impactStats: "आज का प्रभाव"
  },
  ta: {
    title: "சுற்றுச்சூழல் பொதி உள்ளமைப்பு",
    subtitle: "குறைந்த தாக்கம், உயர் செயல்திறன் பொதியிடலுக்கான AI-வழிகாட்டும் முடிவுகள்",
    description: "பொதியிடல் நிலைத்தன்மையின் குருட்டு இடமாக இருக்க வேண்டியதில்லை। எங்கள் AI-இயங்கும் உதவி உதவியாளர் தயாரிப்பு அம்சங்களின் அடிப்படையில் உகந்த பொதியிடலை பரிந்துரைக्छ।",
    startConfig: "உள்ளமைப்பைத் தொடங்கவும்",
    viewAnalytics: "பகுப்பாய்வைப் பார்க்கவும்",
    ecoCoins: "சம்பாதித்த சுற்றுச்சூழல் நாணயங்கள்",
    impactStats: "இன்றைய தாக்கம்"
  },
  te: {
    title: "ఎకో-ప్యాకేజింగ్ కాన్ఫిగురేటర్",
    subtitle: "తక్కువ ప్రభావం, అధిక-పనితీరు ప్యాకేజింగ్ కోసం AI-మార్గదర్శక నిర్ణయాలు",
    description: "ప్యాకేజింగ్ స్థిరత్వం యొక్క అంధ స్థలం కాకూడదు. మా AI-శక్తితో నడిచే సహాయకుడు ఉత్పత్తి లక్షణాల ఆధారంగా సరైన ప్యాకేజింగ్‌ను సిఫార్సు చేస్తుంది।",
    startConfig: "కాన్ఫిగరేషన్ ప్రారంభించండి",
    viewAnalytics: "అనలిటిక్స్ చూడండి",
    ecoCoins: "సంపాదించిన ఎకో-కాయిన్లు",
    impactStats: "నేటి ప్రభావం"
  },
  bn: {
    title: "ইকো-প্যাকেজিং কনফিগারেটর",
    subtitle: "কম প্রভাব, উচ্চ-পারফরমেন্স প্যাকেজিংয়ের জন্য AI-নির্দেশিত সিদ্ধান্ত",
    description: "প্যাকেজিং টেকসইতার একটি অন্ধ স্থান হতে হবে না। আমাদের AI-চালিত সহায়ক পণ্যের বৈশিষ্ট্যের ভিত্তিতে সর্বোত্তম প্যাকেজিং সুপারিশ করে।",
    startConfig: "কনফিগারেশন শুরু করুন",
    viewAnalytics: "অ্যানালিটিক্স দেখুন",
    ecoCoins: "অর্জিত ইকো-কয়েন",
    impactStats: "আজকের প্রভাব"
  }
};

export const EcoHero: React.FC<EcoHeroProps> = ({ 
  selectedLanguage, 
  onLanguageChange,
  totalEcoCoins 
}) => {
  const t = translations[selectedLanguage];

  const scrollToConfigurator = () => {
    const element = document.querySelector('[data-tab="configurator"]');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-green-600 via-blue-600 to-teal-600 text-white overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 animate-pulse">
          <Package className="h-16 w-16" />
        </div>
        <div className="absolute top-40 right-20 animate-pulse delay-1000">
          <Leaf className="h-12 w-12" />
        </div>
        <div className="absolute bottom-20 left-1/4 animate-pulse delay-2000">
          <Recycle className="h-20 w-20" />
        </div>
      </div>
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="flex justify-end mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20 flex items-center gap-2">
              <Coins className="h-5 w-5 text-yellow-300" />
              <span className="font-semibold">{totalEcoCoins}</span>
              <span className="text-sm text-green-100">{t.ecoCoins}</span>
            </div>
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
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {t.title}
              </h1>
              
              <p className="text-xl md:text-2xl mb-6 text-green-100 leading-relaxed">
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
                  <div className="text-2xl font-bold text-white">156kg</div>
                  <div className="text-sm text-green-100">CO₂ Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">89%</div>
                  <div className="text-sm text-green-100">Recyclable</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">₹3.2K</div>
                  <div className="text-sm text-green-100">Cost Saved</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-green-600 hover:bg-green-50 px-8 group"
                onClick={scrollToConfigurator}
              >
                <Package className="mr-2 h-5 w-5" />
                {t.startConfig}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white bg-white/10 px-8"
              >
                <Award className="mr-2 h-5 w-5" />
                {t.viewAnalytics}
              </Button>
            </div>
          </div>

          {/* Right Side - Animated Illustration */}
          <div className="relative">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
                <img src={Image} alt="Smart Farming" className="rounded-2xl shadow-xl" />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};