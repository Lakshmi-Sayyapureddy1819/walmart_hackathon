import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coins, Leaf, Recycle, X, Sparkles } from 'lucide-react';
import { PackagingOption } from './EcoPackagingEngine';

type Language = "en" | "hi" | "ta" | "te" | "bn";

interface EcoCoinsRewardProps {
  option: PackagingOption;
  selectedLanguage: Language;
  onClose: () => void;
}

const translations = {
  en: {
    congratulations: "Congratulations!",
    coinsEarned: "Eco-Coins Earned",
    impactMessage: "Your sustainable choice made a difference!",
    co2Saved: "CO₂ Saved",
    benefits: "Environmental Benefits",
    lowCarbon: "Low carbon footprint",
    compostable: "Compostable materials",
    recyclable: "Fully recyclable",
    plasticFree: "Plastic-free option",
    continue: "Continue",
    bonusRewards: "Bonus Rewards"
  },
  hi: {
    congratulations: "बधाई हो!",
    coinsEarned: "अर्जित इको-कॉइन",
    impactMessage: "आपकी टिकाऊ पसंद ने फर्क पैदा किया!",
    co2Saved: "बचाया गया CO₂",
    benefits: "पर्यावरणीय लाभ",
    lowCarbon: "कम कार्बन फुटप्रिंट",
    compostable: "कम्पोस्टेबल सामग्री",
    recyclable: "पूर्णतः पुनर्चक्रण योग्य",
    plasticFree: "प्लास्टिक मुक्त विकल्प",
    continue: "जारी रखें",
    bonusRewards: "बोनस रिवार्ड्स"
  },
  ta: {
    congratulations: "வாழ்த்துக்கள்!",
    coinsEarned: "சம்பாதித்த ஈகோ-நாணயங்கள்",
    impactMessage: "உங்கள் நிலையான தேர்வு மாற்றத்தை ஏற்படுத்தியது!",
    co2Saved: "சேமித்த CO₂",
    benefits: "சுற்றுச்சூழல் நன்மைகள்",
    lowCarbon: "குறைந்த கார்பன் தடம்",
    compostable: "உரமாக்கக்கூடிய பொருட்கள்",
    recyclable: "முழுமையாக மறுசுழற்சி செய்யக்கூடிய",
    plasticFree: "பிளாஸ்டிக் இல்லாத விருப்பம்",
    continue: "தொடரவும்",
    bonusRewards: "போனஸ் வெகுமதிகள்"
  },
  te: {
    congratulations: "అభినందనలు!",
    coinsEarned: "సంపాదించిన ఎకో-కాయిన్లు",
    impactMessage: "మీ స్థిరమైన ఎంపిక మార్పును తీసుకొచ్చింది!",
    co2Saved: "ఆదా చేసిన CO₂",
    benefits: "పర్యావరణ ప్రయోజనాలు",
    lowCarbon: "తక్కువ కార్బన్ పాదముద్ర",
    compostable: "కంపోస్ట్ చేయదగిన మెటీరియల్స్",
    recyclable: "పూర్తిగా రీసైకిల్ చేయదగిన",
    plasticFree: "ప్లాస్టిక్ రహిత ఎంపిక",
    continue: "కొనసాగించు",
    bonusRewards: "బోనస్ రివార్డ్లు"
  },
  bn: {
    congratulations: "অভিনন্দন!",
    coinsEarned: "অর্জিত ইকো-কয়েন",
    impactMessage: "আপনার টেকসই পছন্দ পার্থক্য এনেছে!",
    co2Saved: "সংরক্ষিত CO₂",
    benefits: "পরিবেশগত সুবিধা",
    lowCarbon: "কম কার্বন পদচিহ্ন",
    compostable: "কম্পোস্টযোগ্য উপকরণ",
    recyclable: "সম্পূর্ণ পুনর্ব্যবহারযোগ্য",
    plasticFree: "প্লাস্টিক মুক্ত বিকল্প",
    continue: "চালিয়ে যান",
    bonusRewards: "বোনাস পুরস্কার"
  }
};

export const EcoCoinsReward: React.FC<EcoCoinsRewardProps> = ({
  option,
  selectedLanguage,
  onClose
}) => {
  const t = translations[selectedLanguage];

  // Calculate CO2 savings compared to standard packaging
  const standardCO2 = 120; // baseline CO2 for standard packaging
  const co2Saved = Math.max(0, standardCO2 - option.co2Footprint);

  // Calculate bonus points based on attributes
  const bonusPoints = [
    { condition: option.co2Footprint < 50, points: 10, label: t.lowCarbon },
    { condition: option.compostable, points: 8, label: t.compostable },
    { condition: option.recyclability >= 90, points: 5, label: t.recyclable },
    { condition: !option.materials.some(m => m.toLowerCase().includes('plastic')), points: 5, label: t.plasticFree }
  ].filter(bonus => bonus.condition);

  useEffect(() => {
    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full bg-gradient-to-br from-green-50 to-blue-50 border-green-200 relative overflow-hidden">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Celebration Animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-4 animate-bounce">
            <Sparkles className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="absolute top-8 right-8 animate-bounce delay-300">
            <Sparkles className="h-4 w-4 text-green-500" />
          </div>
          <div className="absolute bottom-8 left-8 animate-bounce delay-700">
            <Sparkles className="h-5 w-5 text-blue-500" />
          </div>
        </div>

        <CardContent className="p-8 text-center space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="text-4xl animate-bounce">🎉</div>
            <h2 className="text-2xl font-bold text-green-700">{t.congratulations}</h2>
            <p className="text-gray-600">{t.impactMessage}</p>
          </div>

          {/* Main Reward */}
          <div className="bg-white rounded-xl p-6 border-2 border-green-200 shadow-lg">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-yellow-100 rounded-full p-3">
                <Coins className="h-8 w-8 text-yellow-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-600 animate-pulse">
                  +{option.ecoCoins}
                </div>
                <div className="text-sm text-gray-600">{t.coinsEarned}</div>
              </div>
            </div>

            {/* CO2 Impact */}
            <div className="flex items-center justify-center gap-2 text-green-600">
              <Leaf className="h-5 w-5" />
              <span className="font-medium">{co2Saved}g {t.co2Saved}</span>
            </div>
          </div>

          {/* Bonus Breakdown */}
          {bonusPoints.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-700">{t.bonusRewards}</h3>
              <div className="space-y-2">
                {bonusPoints.map((bonus, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-white/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">{bonus.label}</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">
                      +{bonus.points}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Environmental Benefits */}
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h4 className="text-sm font-medium text-green-700 mb-2 flex items-center gap-1">
              <Recycle className="h-4 w-4" />
              {t.benefits}
            </h4>
            <div className="flex flex-wrap gap-1">
              {option.badges.map((badge, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-700">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>

          {/* Continue Button */}
          <Button onClick={onClose} className="w-full bg-green-600 hover:bg-green-700">
            {t.continue}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};