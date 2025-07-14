import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Leaf, Recycle, Package, Coins, Info, ArrowRight } from 'lucide-react';
import { ProductInfo, PackagingOption } from './EcoPackagingEngine';

type Language = "en" | "hi" | "ta" | "te" | "bn";

interface PackagingRecommendationsProps {
  productInfo: ProductInfo;
  selectedLanguage: Language;
  onOptionSelect: (option: PackagingOption) => void;
}

const translations = {
  en: {
    title: "Packaging Recommendations",
    subtitle: "AI-powered suggestions based on your product specifications",
    bestFit: "Best Fit",
    recommended: "Recommended",
    alternative: "Alternative",
    materials: "Materials",
    co2Footprint: "CO₂ Footprint",
    costPerUnit: "Cost per Unit",
    recyclability: "Recyclability",
    ecoCoins: "Eco-Coins",
    whyThisCombo: "Why this combo?",
    selectOption: "Select This Option",
    compostable: "Compostable",
    recyclable: "Recyclable",
    lowCarbon: "Low Carbon",
    costEfficient: "Cost Efficient",
    fullyRecyclable: "Fully Recyclable",
    plasticFree: "Plastic Free"
  },
  hi: {
    title: "पैकेजिंग सिफारिशें",
    subtitle: "आपके उत्पाद विनिर्देशों के आधार पर AI-संचालित सुझाव",
    bestFit: "सबसे अच्छा फिट",
    recommended: "अनुशंसित",
    alternative: "वैकल्पिक",
    materials: "सामग्री",
    co2Footprint: "CO₂ फुटप्रिंट",
    costPerUnit: "प्रति यूनिट लागत",
    recyclability: "पुनर्चक्रण",
    ecoCoins: "इको-कॉइन",
    whyThisCombo: "यह कॉम्बो क्यों?",
    selectOption: "यह विकल्प चुनें",
    compostable: "कम्पोस्टेबल",
    recyclable: "पुनर्चक्रण योग्य",
    lowCarbon: "कम कार्बन",
    costEfficient: "लागत प्रभावी",
    fullyRecyclable: "पूर्णतः पुनर्चक्रण योग्य",
    plasticFree: "प्लास्टिक मुक्त"
  },
  ta: {
    title: "பொதியிடல் பரிந்துரைகள்",
    subtitle: "உங்கள் தயாரிப்பு விவரக்குறிப்புகளின் அடிப்படையில் AI-இயங்கும் பரிந்துரைகள்",
    bestFit: "சிறந்த பொருத்தம்",
    recommended: "பரிந்துரைக்கப்பட்டது",
    alternative: "மாற்று",
    materials: "பொருட்கள்",
    co2Footprint: "CO₂ தடம்",
    costPerUnit: "யூனிட் விலை",
    recyclability: "மறுசுழற்சி",
    ecoCoins: "ஈகோ-நாணயங்கள்",
    whyThisCombo: "ஏன் இந்த கலவை?",
    selectOption: "இந்த விருப்பத்தைத் தேர்ந்தெடுக்கவும்",
    compostable: "உரமாக்கக்கூடிய",
    recyclable: "மறுசுழற்சி செய்யக்கூடிய",
    lowCarbon: "குறைந்த கார்பன்",
    costEfficient: "செலவு திறன்",
    fullyRecyclable: "முழுமையாக மறுசுழற்சி செய்யக்கூடிய",
    plasticFree: "பிளாஸ்டிக் இல்லாத"
  },
  te: {
    title: "ప్యాకేజింగ్ సిఫార్సులు",
    subtitle: "మీ ఉత్పత్తి స్పెసిఫికేషన్ల ఆధారంగా AI-శక్తితో నడిచే సూచనలు",
    bestFit: "ఉత్తమ అనుకూలత",
    recommended: "సిఫార్సు చేయబడింది",
    alternative: "ప్రత్యామ్నాయం",
    materials: "మెటీరియల్స్",
    co2Footprint: "CO₂ పాదముద్ర",
    costPerUnit: "యూనిట్ కు ఖర్చు",
    recyclability: "రీసైక్లింగ్",
    ecoCoins: "ఎకో-కాయిన్లు",
    whyThisCombo: "ఈ కాంబో ఎందుకు?",
    selectOption: "ఈ ఎంపికను ఎంచుకోండి",
    compostable: "కంపోస్ట్ చేయదగిన",
    recyclable: "రీసైకిల్ చేయదగిన",
    lowCarbon: "తక్కువ కార్బన్",
    costEfficient: "ఖర్చు సమర్థవంతమైన",
    fullyRecyclable: "పూర్తిగా రీసైకిల్ చేయదగిన",
    plasticFree: "ప్లాస్టిక్ రహిత"
  },
  bn: {
    title: "প্যাকেজিং সুপারিশ",
    subtitle: "আপনার পণ্যের স্পেসিফিকেশনের উপর ভিত্তি করে AI-চালিত পরামর্শ",
    bestFit: "সেরা ফিট",
    recommended: "সুপারিশকৃত",
    alternative: "বিকল্প",
    materials: "উপকরণ",
    co2Footprint: "CO₂ পদচিহ্ন",
    costPerUnit: "প্রতি ইউনিট খরচ",
    recyclability: "পুনর্ব্যবহার",
    ecoCoins: "ইকো-কয়েন",
    whyThisCombo: "কেন এই কম্বো?",
    selectOption: "এই বিকল্পটি নির্বাচন করুন",
    compostable: "কম্পোস্টযোগ্য",
    recyclable: "পুনর্ব্যবহারযোগ্য",
    lowCarbon: "কম কার্বন",
    costEfficient: "খরচ সাশ্রয়ী",
    fullyRecyclable: "সম্পূর্ণ পুনর্ব্যবহারযোগ্য",
    plasticFree: "প্লাস্টিক মুক্ত"
  }
};

// Mock data generator for packaging recommendations
const generateRecommendations = (productInfo: ProductInfo): PackagingOption[] => {
  const baseOptions: PackagingOption[] = [
    {
      id: 'option-a',
      name: 'Eco-Optimized Combo',
      materials: ['Recycled Cardboard', 'Biodegradable Bubble Wrap', 'Water-based Adhesive'],
      co2Footprint: 45,
      cost: 12,
      recyclability: 95,
      compostable: true,
      badges: ['Low Carbon', 'Compostable', 'Fully Recyclable'],
      description: 'Best environmental choice with excellent protection for most product types.',
      ecoCoins: 18
    },
    {
      id: 'option-b',
      name: 'Cost-Efficient Standard',
      materials: ['Standard Cardboard', 'Recycled Paper Fill', 'Eco-Tape'],
      co2Footprint: 68,
      cost: 8,
      recyclability: 85,
      compostable: false,
      badges: ['Cost Efficient', 'Recyclable'],
      description: 'Balanced choice offering good protection at lower cost.',
      ecoCoins: 12
    },
    {
      id: 'option-c',
      name: 'Premium Protection',
      materials: ['Kraft Paper', 'Honeycomb Padding', 'Compostable Film'],
      co2Footprint: 52,
      cost: 18,
      recyclability: 90,
      compostable: true,
      badges: ['Premium Protection', 'Compostable', 'Plastic Free'],
      description: 'Maximum protection for fragile items with sustainable materials.',
      ecoCoins: 15
    }
  ];

  // Adjust recommendations based on product characteristics
  if (productInfo.fragility === 'high') {
    baseOptions[0].ecoCoins += 3;
    baseOptions[2].ecoCoins += 5;
  }

  if (productInfo.dimensions.weight > 5) {
    baseOptions.forEach(option => {
      option.cost += 2;
      option.co2Footprint += 5;
    });
  }

  return baseOptions;
};

export const PackagingRecommendations: React.FC<PackagingRecommendationsProps> = ({
  productInfo,
  selectedLanguage,
  onOptionSelect
}) => {
  const t = translations[selectedLanguage];
  const recommendations = generateRecommendations(productInfo);

  const getOptionLabel = (index: number) => {
    if (index === 0) return t.bestFit;
    return `${t.alternative} ${String.fromCharCode(65 + index)}`;
  };

  const getOptionColor = (index: number) => {
    if (index === 0) return 'bg-green-50 border-green-200';
    return 'bg-gray-50 border-gray-200';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">{t.title}</h2>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((option, index) => (
          <Card key={option.id} className={`relative ${getOptionColor(index)} hover:shadow-lg transition-shadow`}>
            {index === 0 && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-green-600 text-white px-3 py-1">
                  <Leaf className="h-3 w-3 mr-1" />
                  {t.recommended}
                </Badge>
              </div>
            )}
            
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{option.name}</CardTitle>
                <Badge variant="outline">{getOptionLabel(index)}</Badge>
              </div>
              <CardDescription className="text-sm">{option.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Materials */}
              <div>
                <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                  <Package className="h-3 w-3" />
                  {t.materials}
                </h4>
                <div className="space-y-1">
                  {option.materials.map((material, i) => (
                    <Badge key={i} variant="secondary" className="text-xs mr-1 mb-1">
                      {material}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">{t.co2Footprint}</span>
                  <div className="font-semibold text-lg">{option.co2Footprint}g</div>
                </div>
                <div>
                  <span className="text-muted-foreground">{t.costPerUnit}</span>
                  <div className="font-semibold text-lg">₹{option.cost}</div>
                </div>
              </div>

              {/* Recyclability */}
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="flex items-center gap-1">
                    <Recycle className="h-3 w-3" />
                    {t.recyclability}
                  </span>
                  <span className="font-medium">{option.recyclability}%</span>
                </div>
                <Progress value={option.recyclability} className="h-2" />
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1">
                {option.badges.map((badge, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>

              {/* Eco-Coins */}
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium">{t.ecoCoins}</span>
                </div>
                <span className="font-bold text-yellow-600">+{option.ecoCoins}</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button 
                  onClick={() => onOptionSelect(option)}
                  className="w-full"
                  variant={index === 0 ? "default" : "outline"}
                >
                  {t.selectOption}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  <Info className="mr-1 h-3 w-3" />
                  {t.whyThisCombo}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};