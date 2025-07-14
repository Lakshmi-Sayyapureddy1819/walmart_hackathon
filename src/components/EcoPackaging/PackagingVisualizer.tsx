import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Shield, Droplets, Tag, Ruler } from 'lucide-react';
import { ProductInfo, PackagingOption } from './EcoPackagingEngine';

type Language = "en" | "hi" | "ta" | "te" | "bn";

interface PackagingVisualizerProps {
  productInfo: ProductInfo;
  selectedOption: PackagingOption;
  selectedLanguage: Language;
}

const translations = {
  en: {
    title: "Packaging Visualization",
    subtitle: "Preview how your selected packaging will protect and present your product",
    productDimensions: "Product Dimensions",
    packagingLayers: "Packaging Layers",
    protectionRating: "Protection Rating",
    waterResistance: "Water Resistance",
    labelPlacement: "Label Placement Suggestions",
    materialBreakdown: "Material Breakdown",
    fragileProtection: "Fragile Item Protection",
    excellent: "Excellent",
    good: "Good",
    moderate: "Moderate",
    topLabel: "Top Label",
    sideLabel: "Side Label",
    bottomLabel: "Bottom Label"
  },
  hi: {
    title: "पैकेजिंग दृश्यीकरण",
    subtitle: "देखें कि आपकी चुनी गई पैकेजिंग आपके उत्पाद की सुरक्षा और प्रस्तुति कैसे करेगी",
    productDimensions: "उत्पाद आयाम",
    packagingLayers: "पैकेजिंग परतें",
    protectionRating: "सुरक्षा रेटिंग",
    waterResistance: "जल प्रतिरोध",
    labelPlacement: "लेबल प्लेसमेंट सुझाव",
    materialBreakdown: "सामग्री विवरण",
    fragileProtection: "नाजुक वस्तु सुरक्षा",
    excellent: "उत्कृष्ट",
    good: "अच्छा",
    moderate: "मध्यम",
    topLabel: "शीर्ष लेबल",
    sideLabel: "साइड लेबल",
    bottomLabel: "तल लेबल"
  },
  ta: {
    title: "பொதியிடல் காட்சிப்படுத்துதல்",
    subtitle: "நீங்கள் தேர்ந்தெடுத்த பொதியிடல் உங்கள் தயாரிப்பை எப்படி பாதுகாத்து வழங்கும் என்பதைக் காண்க",
    productDimensions: "தயாரிப்பு பரிமாணங்கள்",
    packagingLayers: "பொதியிடல் அடுக்குகள்",
    protectionRating: "பாதுகாப்பு மதிப்பீடு",
    waterResistance: "நீர் எதிர்ப்பு",
    labelPlacement: "லேபிள் இட பரிந்துரைகள்",
    materialBreakdown: "பொருள் பிரிவு",
    fragileProtection: "உடையக்கூடிய பொருள் பாதுகாப்பு",
    excellent: "சிறப்பு",
    good: "நல்ல",
    moderate: "மிதமான",
    topLabel: "மேல் லேபிள்",
    sideLabel: "பக்க லேபிள்",
    bottomLabel: "கீழ் லேபிள்"
  },
  te: {
    title: "ప్యాకేజింగ్ దృశ్యీకరణ",
    subtitle: "మీరు ఎంచుకున్న ప్యాకేజింగ్ మీ ఉత్పత్తిని ఎలా రక్షించి ప్రదర్శిస్తుందో చూడండి",
    productDimensions: "ఉత్పత్తి పరిమాణాలు",
    packagingLayers: "ప్యాకేజింగ్ పొరలు",
    protectionRating: "రక్షణ రేటింగ్",
    waterResistance: "నీటి నిరోధకత",
    labelPlacement: "లేబుల్ ప్లేస్‌మెంట్ సూచనలు",
    materialBreakdown: "మెటీరియల్ వివరణ",
    fragileProtection: "పగిలే వస్తువుల రక్షణ",
    excellent: "అద్భుతమైన",
    good: "మంచి",
    moderate: "మధ్యస్థ",
    topLabel: "టాప్ లేబుల్",
    sideLabel: "సైడ్ లేబుల్",
    bottomLabel: "బాటమ్ లేబుల్"
  },
  bn: {
    title: "প্যাকেজিং ভিজ্যুয়ালাইজেশন",
    subtitle: "দেখুন আপনার নির্বাচিত প্যাকেজিং কীভাবে আপনার পণ্যকে রক্ষা করবে এবং উপস্থাপন করবে",
    productDimensions: "পণ্যের মাত্রা",
    packagingLayers: "প্যাকেজিং স্তর",
    protectionRating: "সুরক্ষা রেটিং",
    waterResistance: "জল প্রতিরোধ",
    labelPlacement: "লেবেল প্লেসমেন্ট পরামর্শ",
    materialBreakdown: "উপাদান বিভাজন",
    fragileProtection: "ভঙ্গুর আইটেম সুরক্ষা",
    excellent: "চমৎকার",
    good: "ভালো",
    moderate: "মাঝারি",
    topLabel: "উপরের লেবেল",
    sideLabel: "পাশের লেবেল",
    bottomLabel: "নিচের লেবেল"
  }
};

export const PackagingVisualizer: React.FC<PackagingVisualizerProps> = ({
  productInfo,
  selectedOption,
  selectedLanguage
}) => {
  const t = translations[selectedLanguage];

  // Calculate protection ratings based on fragility and materials
  const getProtectionRating = (fragility: string, materials: string[]) => {
    let rating = 'moderate';
    if (materials.some(m => m.toLowerCase().includes('bubble') || m.toLowerCase().includes('honeycomb'))) {
      rating = fragility === 'high' ? 'excellent' : 'good';
    } else if (materials.some(m => m.toLowerCase().includes('cardboard'))) {
      rating = fragility === 'low' ? 'good' : 'moderate';
    }
    return rating;
  };

  const getWaterResistance = (materials: string[]) => {
    if (materials.some(m => m.toLowerCase().includes('film') || m.toLowerCase().includes('coating'))) {
      return 'excellent';
    }
    return 'moderate';
  };

  const protectionRating = getProtectionRating(productInfo.fragility, selectedOption.materials);
  const waterResistance = getWaterResistance(selectedOption.materials);

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getRatingText = (rating: string) => {
    switch (rating) {
      case 'excellent': return t.excellent;
      case 'good': return t.good;
      default: return t.moderate;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">{t.title}</h2>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Product & Packaging Visualization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              {selectedOption.name}
            </CardTitle>
            <CardDescription>{t.productDimensions}: {productInfo.dimensions.length} × {productInfo.dimensions.width} × {productInfo.dimensions.height} cm</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Simple 3D-like representation */}
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-8 mb-6">
              <div className="relative mx-auto" style={{ 
                width: '200px', 
                height: '150px',
                transform: 'perspective(400px) rotateX(20deg) rotateY(-10deg)',
                transformStyle: 'preserve-3d'
              }}>
                {/* Outer packaging */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-amber-300 rounded-lg border-2 border-amber-400 shadow-lg"></div>
                
                {/* Inner product */}
                <div className="absolute top-4 left-4 right-4 bottom-4 bg-gradient-to-br from-blue-300 to-blue-400 rounded opacity-70"></div>
                
                {/* Padding indication */}
                <div className="absolute top-2 left-2 right-2 bottom-2 border-2 border-dashed border-gray-400 rounded"></div>
              </div>
              
              {/* Labels */}
              <div className="flex justify-center mt-4">
                <Badge className="bg-primary text-primary-foreground">
                  <Tag className="h-3 w-3 mr-1" />
                  {productInfo.productType}
                </Badge>
              </div>
            </div>

            {/* Packaging Layers */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">{t.packagingLayers}</h4>
              {selectedOption.materials.map((material, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <div className="w-4 h-4 rounded-full" style={{ 
                    backgroundColor: `hsl(${(index * 60) % 360}, 50%, 70%)` 
                  }}></div>
                  <span className="text-sm">{material}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Protection & Features */}
        <div className="space-y-6">
          {/* Protection Ratings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                {t.protectionRating}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">{t.fragileProtection}</span>
                <Badge className={getRatingColor(protectionRating)}>
                  {getRatingText(protectionRating)}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-1">
                  <Droplets className="h-3 w-3" />
                  {t.waterResistance}
                </span>
                <Badge className={getRatingColor(waterResistance)}>
                  {getRatingText(waterResistance)}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Label Placement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                {t.labelPlacement}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-3 bg-blue-50 rounded border-2 border-blue-200">
                  <div className="text-xs font-medium text-blue-700">{t.topLabel}</div>
                  <div className="w-full h-4 bg-blue-300 rounded mt-2"></div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded border-2 border-green-200">
                  <div className="text-xs font-medium text-green-700">{t.sideLabel}</div>
                  <div className="w-full h-4 bg-green-300 rounded mt-2"></div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded border border-gray-200">
                  <div className="text-xs font-medium text-gray-700">{t.bottomLabel}</div>
                  <div className="w-full h-4 bg-gray-300 rounded mt-2"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Material Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ruler className="h-5 w-5" />
                {t.materialBreakdown}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedOption.materials.map((material, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{material}</span>
                    <div className="flex items-center gap-2">
                      {selectedOption.compostable && material.toLowerCase().includes('biodegradable') && (
                        <Badge variant="outline" className="text-xs text-green-600">Compostable</Badge>
                      )}
                      {selectedOption.recyclability > 80 && material.toLowerCase().includes('cardboard') && (
                        <Badge variant="outline" className="text-xs text-blue-600">Recyclable</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};