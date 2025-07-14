
import React, { useState } from 'react';
import { ReturnsHero } from './ReturnsHero';
import { ItemLogging } from './ItemLogging';
import { ConditionClassifier } from './ConditionClassifier';
import { RecoveryDashboard } from './RecoveryDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Package, Search, BarChart3, Recycle, Smartphone, TreePine } from 'lucide-react';

type Language = "en" | "hi" | "ta" | "te" | "bn";

export const ReturnsToResourceEngine = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");
  const [activeTab, setActiveTab] = useState("overview");

  const translations = {
    en: {
      overview: "Overview",
      itemLogging: "Item Logging",
      aiClassification: "AI Classification", 
      analytics: "Analytics",
      itemLoggingDesc: "Scan, photograph, and log returned items with intelligent data capture and voice input capabilities.",
      aiClassificationDesc: "AI-powered condition assessment that categorizes items and recommends optimal recovery actions.",
      analyticsDesc: "Real-time insights into recovery rates, value recovered, and environmental impact metrics.",
      impactMeter: "Impact Meter",
      recoveryRate: "Recovery Rate",
      valueSaved: "Value Saved",
      carbonOffset: "Carbon Offset"
    },
    hi: {
      overview: "अवलोकन",
      itemLogging: "आइटम लॉगिंग",
      aiClassification: "AI वर्गीकरण",
      analytics: "विश्लेषणात्मकता",
      itemLoggingDesc: "बुद्धिमान डेटा कैप्चर और वॉयस इनपुट क्षमताओं के साथ वापस किए गए आइटम को स्कैन, फोटो और लॉग करें।",
      aiClassificationDesc: "AI-संचालित स्थिति मूल्यांकन जो आइटम को वर्गीकृत करता है और इष्टतम रिकवरी कार्यों की सिफारिश करता है।",
      analyticsDesc: "रिकवरी दरों, बचाए गए मूल्य और पर्यावरणीय प्रभाव मेट्रिक्स में वास्तविक समय की अंतर्दृष्टि।",
      impactMeter: "प्रभाव मीटर",
      recoveryRate: "रिकवरी दर",
      valueSaved: "मूल्य बचाया",
      carbonOffset: "कार्बन ऑफसेट"
    },
    ta: {
      overview: "கண்ணோட்டம்",
      itemLogging: "பொருள் பதிவு",
      aiClassification: "AI வகைப்பாடு",
      analytics: "பகுப்பாய்வு",
      itemLoggingDesc: "புத்திசாலித்தனமான தரவு பிடிப்பு மற்றும் குரல் உள்ளீட்டு திறன்களுடன் திரும்பிய பொருட்களை ஸ்கேன், புகைப்படம் மற்றும் பதிவு செய்யுங்கள்।",
      aiClassificationDesc: "AI-இயங்கும் நிலை மதிப்பீடு பொருட்களை வகைப்படுத்துகிறது மற்றும் உகந்த மீட்பு நடவடிக்கைகளை பரிந்துரைக்கிறது।",
      analyticsDesc: "மீட்பு விகிதங்கள், சேமிக்கப்பட்ட மதிப்பு மற்றும் சுற்றுச்சூழல் தாக்க அளவீடுகளில் நிகழ்நேர நுண்ணறிவுகள்।",
      impactMeter: "தாக்க மீட்டர்",
      recoveryRate: "மீட்பு விகிதம்",
      valueSaved: "மதிப்பு சேமிக்கப்பட்டது",
      carbonOffset: "கார்பன் ஆஃப்செட்"
    },
    te: {
      overview: "అవలోకనం",
      itemLogging: "వస్తువు లాగింగ్",
      aiClassification: "AI వర్గీకరణ",
      analytics: "విశ్లేషణలు",
      itemLoggingDesc: "తెలివైన డేటా క్యాప్చర్ మరియు వాయిస్ ఇన్‌పుట్ సామర్థ్యాలతో తిరిగి వచ్చిన వస్తువులను స్కాన్, ఫోటో మరియు లాగ్ చేయండి।",
      aiClassificationDesc: "AI-శక్తితో నడిచే పరిస్థితి అంచనా వస్తువులను వర్గీకరిస్తుంది మరియు సరైన రికవరీ చర్యలను సిఫార్సు చేస్తుంది।",
      analyticsDesc: "రికవరీ రేట్లు, సేవ్ చేసిన విలువ మరియు పర్యావరణ ప్రభావ మెట్రిక్స్‌లో రియల్ టైమ్ అంతర్దృష్టులు।",
      impactMeter: "ప్రభావ మీటర్",
      recoveryRate: "రికవరీ రేట్",
      valueSaved: "విలువ సేవ్ చేయబడింది",
      carbonOffset: "కార్బన్ ఆఫ్‌సెట్"
    },
    bn: {
      overview: "সংক্ষিপ্ত বিবরণ",
      itemLogging: "আইটেম লগিং",
      aiClassification: "AI শ্রেণীবিভাগ", 
      analytics: "বিশ্লেষণ",
      itemLoggingDesc: "বুদ্ধিমান ডেটা ক্যাপচার এবং ভয়েস ইনপুট ক্ষমতা সহ ফেরত দেওয়া আইটেমগুলি স্ক্যান, ফটো এবং লগ করুন।",
      aiClassificationDesc: "AI-চালিত অবস্থা মূল্যায়ন যা আইটেমগুলিকে শ্রেণীবদ্ধ করে এবং সর্বোত্তম পুনরুদ্ধার কর্মের সুপারিশ করে।",
      analyticsDesc: "পুনরুদ্ধারের হার, সংরক্ষিত মূল্য এবং পরিবেশগত প্রভাব মেট্রিক্সে রিয়েল-টাইম অন্তর্দৃষ্টি।",
      impactMeter: "প্রভাব মিটার",
      recoveryRate: "পুনরুদ্ধারের হার",
      valueSaved: "মূল্য সংরক্ষিত",
      carbonOffset: "কার্বন অফসেট"
    }
  };

  const t = translations[selectedLanguage];

  return (
    <div className="min-h-screen">
      <ReturnsHero 
        selectedLanguage={selectedLanguage} 
        onLanguageChange={setSelectedLanguage}
      />
      
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">{t.overview}</TabsTrigger>
            <TabsTrigger value="logging">{t.itemLogging}</TabsTrigger>
            <TabsTrigger value="classification">{t.aiClassification}</TabsTrigger>
            <TabsTrigger value="analytics">{t.analytics}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-8">
            {/* Impact Meter Section */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6 text-center text-blue-800">{t.impactMeter}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                      <circle cx="64" cy="64" r="56" stroke="#3b82f6" strokeWidth="8" fill="none"
                              strokeDasharray={`${87 * 3.51} 351`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-blue-600">82%</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{t.recoveryRate}</p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">₹1.3L</div>
                  <p className="text-sm text-gray-600">{t.valueSaved}</p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-2">0.8T</div>
                  <p className="text-sm text-gray-600">{t.carbonOffset}</p>
                </div>
              </div>
            </div>

            {/* New Task Cards */}
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab("logging")}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Package className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl text-blue-700">{t.itemLogging}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{t.itemLoggingDesc}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      <Smartphone className="h-3 w-3 mr-1" />
                      Mobile Ready
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab("classification")}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Search className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-xl text-green-700">{t.aiClassification}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{t.aiClassificationDesc}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      <Recycle className="h-3 w-3 mr-1" />
                      AI Powered
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab("analytics")}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <BarChart3 className="h-8 w-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl text-purple-700">{t.analytics}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{t.analyticsDesc}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <Badge variant="outline" className="bg-purple-50 text-purple-700">
                      <TreePine className="h-3 w-3 mr-1" />
                      Sustainable
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="logging">
            <ItemLogging selectedLanguage={selectedLanguage} />
          </TabsContent>
          
          <TabsContent value="classification">
            <ConditionClassifier selectedLanguage={selectedLanguage} />
          </TabsContent>
          
          <TabsContent value="analytics">
            <RecoveryDashboard selectedLanguage={selectedLanguage} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
