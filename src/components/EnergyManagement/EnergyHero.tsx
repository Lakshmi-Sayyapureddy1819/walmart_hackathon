import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Zap, TrendingDown, Leaf, Bell } from 'lucide-react';

type Language = "en" | "hi" | "ta" | "te" | "bn";

interface EnergyHeroProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
  totalAlerts: number;
}

const translations = {
  en: {
    title: "Energy Management System",
    subtitle: "Smart monitoring for sustainable store operations",
    description: "AI-powered energy optimization across all store locations with real-time monitoring, predictive maintenance, and sustainability insights.",
    energySaved: "Energy Saved Today",
    co2Reduced: "CO₂ Reduced",
    activeAlerts: "Active Alerts",
    storesMonitored: "Stores Monitored"
  },
  hi: {
    title: "ऊर्जा प्रबंधन प्रणाली",
    subtitle: "टिकाऊ स्टोर संचालन के लिए स्मार्ट निगरानी",
    description: "रियल-टाइम निगरानी, भविष्यसूचक रखरखाव और स्थिरता अंतर्दृष्टि के साथ सभी स्टोर स्थानों में AI-संचालित ऊर्जा अनुकूलन।",
    energySaved: "आज बचाई गई ऊर्जा",
    co2Reduced: "CO₂ कमी",
    activeAlerts: "सक्रिय अलर्ट",
    storesMonitored: "निगरानी किए गए स्टोर"
  },
  ta: {
    title: "ஆற்றல் மேலாண்மை அமைப்பு",
    subtitle: "நிலையான கடை செயல்பாடுகளுக்கான ஸ்மார்ட் கண்காணிப்பு",
    description: "நிகழ்நேர கண்காணிப்பு, முன்கணிப்பு பராமரிப்பு மற்றும் நிலைத்தன்மை நுண்ணறிவுகளுடன் அனைத்து கடை இடங்களிலும் AI-இயங்கும் ஆற்றல் உகப்பாக்கம்।",
    energySaved: "இன்று சேமிக்கப்பட்ட ஆற்றல்",
    co2Reduced: "CO₂ குறைப்பு",
    activeAlerts: "செயலில் உள்ள எச்சரிக்கைகள்",
    storesMonitored: "கண்காணிக்கப்பட்ட கடைகள்"
  },
  te: {
    title: "శక్తి నిర్వహణ వ్యవస్థ",
    subtitle: "స్థిరమైన స్టోర్ కార్యకలాపాల కోసం స్మార్ట్ పర్యవేక్షణ",
    description: "రియల్-టైమ్ మానిటరింగ్, ప్రిడిక్టివ్ మెయింటెనెన్స్ మరియు సస్టైనబిలిటీ ఇన్‌సైట్‌లతో అన్ని స్టోర్ లొకేషన్‌లలో AI-పవర్డ్ ఎనర్జీ ఆప్టిమైజేషన్.",
    energySaved: "ఈరోజు ఆదా చేసిన శక్తి",
    co2Reduced: "CO₂ తగ్గింపు",
    activeAlerts: "క్రియాశీల హెచ్చరికలు",
    storesMonitored: "పర్యవేక్షించబడిన దుకాణాలు"
  },
  bn: {
    title: "শক্তি ব্যবস্থাপনা সিস্টেম",
    subtitle: "টেকসই দোকান পরিচালনার জন্য স্মার্ট পর্যবেক্ষণ",
    description: "রিয়েল-টাইম মনিটরিং, প্রেডিক্টিভ মেইনটেনেন্স এবং সাস্টেইনেবিলিটি ইনসাইট সহ সমস্ত স্টোর অবস্থানে AI-চালিত শক্তি অপ্টিমাইজেশন।",
    energySaved: "আজ সাশ্রয় হওয়া শক্তি",
    co2Reduced: "CO₂ হ্রাস",
    activeAlerts: "সক্রিয় সতর্কতা",
    storesMonitored: "পর্যবেক্ষণ করা দোকান"
  }
};

export const EnergyHero: React.FC<EnergyHeroProps> = ({
  selectedLanguage,
  onLanguageChange,
  totalAlerts
}) => {
  const t = translations[selectedLanguage];

  return (
    <div className="relative">
      {/* Language Selector */}
      <div className="absolute top-0 right-0 z-10">
        <Select value={selectedLanguage} onValueChange={onLanguageChange}>
          <SelectTrigger className="w-32 bg-card border-primary/20">
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

      {/* Hero Content */}
      <div className="text-center space-y-6 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
          <Zap className="w-5 h-5" />
          <span className="text-sm font-medium">Energy Management</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold gradient-text">
          {t.title}
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t.subtitle}
        </p>
        
        <p className="text-muted-foreground max-w-4xl mx-auto">
          {t.description}
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-6 text-center">
              <TrendingDown className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">928 kWh</div>
              <div className="text-sm text-muted-foreground">{t.energySaved}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20">
            <CardContent className="p-6 text-center">
              <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">92 kg</div>
              <div className="text-sm text-muted-foreground">{t.co2Reduced}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-500/5 to-orange-500/10 border-orange-500/20">
            <CardContent className="p-6 text-center">
              <Bell className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">{totalAlerts}</div>
              <div className="text-sm text-muted-foreground">{t.activeAlerts}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20">
            <CardContent className="p-6 text-center">
              <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">147</div>
              <div className="text-sm text-muted-foreground">{t.storesMonitored}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};