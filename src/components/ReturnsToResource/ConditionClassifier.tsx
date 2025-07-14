
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Camera, Recycle, Package, Wrench, Heart, Trash2, HelpCircle, TrendingUp, Table } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ClassificationTable } from './ClassificationTable';

type Language = "en" | "hi" | "ta" | "te" | "bn";

interface ConditionClassifierProps {
  selectedLanguage: Language;
}

const translations = {
  en: {
    title: "AI-Powered Condition Classification",
    singleItem: "Single Item Analysis",
    batchTable: "Batch Classification Table",
    uploadImage: "Upload Item Image",
    analyzing: "Analyzing condition...",
    condition: "Condition Assessment",
    recommendation: "Smart Recommendation", 
    confidence: "Confidence Score",
    recoveryScore: "Recovery Score",
    likeNew: "Like New",
    minorDamage: "Minor Damage (Functional)",
    repairable: "Repairable",
    majorDamage: "Major Damage (Non-Functional)",
    resell: "Resell as Open-Box",
    repair: "Send for Repair",
    donate: "Donate to NGO",
    recycle: "Send to Recycling",
    dispose: "Dispose Safely",
    processItem: "Process Item",
    whyThis: "Why this recommendation?",
    aiExplanation: "Based on image analysis and return data, this is the most sustainable and profitable action.",
    valueSaved: "Value Saved",
    carbonSaved: "Carbon Saved",
    override: "Override Recommendation"
  },
  hi: {
    title: "AI-संचालित स्थिति वर्गीकरण",
    singleItem: "एकल आइटम विश्लेषण",
    batchTable: "बैच वर्गीकरण तालिका",
    uploadImage: "आइटम इमेज अपलोड करें",
    analyzing: "स्थिति का विश्लेषण कर रहे हैं...",
    condition: "स्थिति आकलन",
    recommendation: "स्मार्ट सिफारिश",
    confidence: "विश्वास स्कोर",
    recoveryScore: "रिकवरी स्कोर",
    likeNew: "नए जैसा",
    minorDamage: "मामूली नुकसान (कार्यात्मक)",
    repairable: "मरम्मत योग्य",
    majorDamage: "बड़ा नुकसान (गैर-कार्यात्मक)",
    resell: "ओपन-बॉक्स के रूप में फिर से बेचें",
    repair: "मरम्मत के लिए भेजें",
    donate: "NGO को दान करें",
    recycle: "रीसाइक्लिंग के लिए भेजें",
    dispose: "सुरक्षित रूप से निपटान",
    processItem: "आइटम प्रोसेस करें",
    whyThis: "यह सिफारिश क्यों?",
    aiExplanation: "छवि विश्लेषण और वापसी डेटा के आधार पर, यह सबसे टिकाऊ और लाभदायक कार्य है।",
    valueSaved: "मूल्य बचाया",
    carbonSaved: "कार्बन बचाया",
    override: "सिफारिश ओवरराइड करें"
  },
  ta: {
    title: "AI-இயங்கும் நிலை வகைப்பாடு",
    singleItem: "ஒற்றை பொருள் பகுப்பாய்வு",
    batchTable: "பேட்ச் வகைப்பாடு அட்டவணை",
    uploadImage: "பொருள் படத்தை பதிவேற்று",
    analyzing: "நிலையை பகுப்பாய்வு செய்கிறது...",
    condition: "நிலை மதிப்பீடு",
    recommendation: "ஸ்மார்ட் பரிந்துரை",
    confidence: "நம்பிக்கை மதிப்பெண்",
    recoveryScore: "மீட்பு மதிப்பெண்",
    likeNew: "புதியது போல",
    minorDamage: "சிறிய சேதம் (செயல்பாட்டு)",
    repairable: "பழுதுபார்க்கக்கூடிய",
    majorDamage: "பெரிய சேதம் (செயல்படாத)",
    resell: "ஓபன்-பாக்ஸாக மீண்டும் விற்க",
    repair: "பழுதுபார்ப்புக்கு அனுப்பு",
    donate: "NGO க்கு தானம்",
    recycle: "மறுசுழற்சிக்கு அனுப்பு",
    dispose: "பாதுகாப்பாக அகற்று",
    processItem: "பொருளை செயலாக்கு",
    whyThis: "இந்த பரிந்துரை ஏன்?",
    aiExplanation: "படம் பகுப்பாய்வு மற்றும் திரும்பல் தரவின் அடிப்படையில், இது மிகவும் நிலையான மற்றும் லாபகரமான நடவடிக்கை।",
    valueSaved: "மதிப்பு சேமிக்கப்பட்டது",
    carbonSaved: "கார்பன் சேமிக்கப்பட்டது",
    override: "பரிந்துரையை மீறு"
  },
  te: {
    title: "AI-శక్తితో నడిచే పరిస్థితి వర్గీకరణ",
    singleItem: "ఒకే వస్తువు విశ్లేషణ",
    batchTable: "బ్యాచ్ వర్గీకరణ టేబుల్",
    uploadImage: "వస్తువు చిత్రాన్ని అప్‌లోడ్ చేయండి",
    analyzing: "పరిస్థితిని విశ్లేషించడం...",
    condition: "పరిస్థితి అంచనా",
    recommendation: "స్మార్ట్ సిఫార్సు",
    confidence: "విశ్వాస స్కోర్",
    recoveryScore: "రికవరీ స్కోర్",
    likeNew: "కొత్తలాగా",
    minorDamage: "చిన్న నష్టం (క్రియాత్మక)",
    repairable: "మరమ్మత్తు చేయదగిన",
    majorDamage: "పెద్ద నష్టం (పనిచేయని)",
    resell: "ఓపెన్-బాక్స్‌గా మళ్లీ అమ్మండి",
    repair: "మరమ్మత్తుకు పంపండి",
    donate: "NGO కి దానం చేయండి",
    recycle: "రీసైక్లింగ్‌కు పంపండి",
    dispose: "సురక్షితంగా పారవేయండి",
    processItem: "వస్తువును ప్రాసెస్ చేయండి",
    whyThis: "ఈ సిఫార్సు ఎందుకు?",
    aiExplanation: "చిత్రం విశ్లేషణ మరియు రిటర్న్ డేటా ఆధారంగా, ఇది అత్యంత స్థిరమైన మరియు లాభదాయకమైన చర్య।",
    valueSaved: "విలువ సేవ్ చేయబడింది",
    carbonSaved: "కార్బన్ సేవ్ చేయబడింది",
    override: "సిఫార్సును ఓవర్‌రైడ్ చేయండి"
  },
  bn: {
    title: "AI-চালিত অবস্থা শ্রেণীবিভাগ",
    singleItem: "একক আইটেম বিশ্লেষণ",
    batchTable: "ব্যাচ শ্রেণীবিভাগ টেবিল",
    uploadImage: "আইটেম ছবি আপলোড করুন",
    analyzing: "অবস্থা বিশ্লেষণ করা হচ্ছে...",
    condition: "অবস্থা মূল্যায়ন",
    recommendation: "স্মার্ট সুপারিশ",
    confidence: "আত্মবিশ্বাস স্কোর",
    recoveryScore: "পুনরুদ্ধার স্কোর",
    likeNew: "নতুনের মতো",
    minorDamage: "সামান্য ক্ষতি (কার্যকর)",
    repairable: "মেরামতযোগ্য",
    majorDamage: "বড় ক্ষতি (অকার্যকর)",
    resell: "ওপেন-বক্স হিসেবে পুনরায় বিক্রয়",
    repair: "মেরামতের জন্য পাঠান",
    donate: "NGO তে দান করুন",
    recycle: "পুনর্ব্যবহারের জন্য পাঠান",
    dispose: "নিরাপদে নিষ্পত্তি",
    processItem: "আইটেম প্রক্রিয়া করুন",
    whyThis: "এই সুপারিশ কেন?",
    aiExplanation: "ছবি বিশ্লেষণ এবং রিটার্ন ডেটার ভিত্তিতে, এটি সবচেয়ে টেকসই এবং লাভজনক পদক্ষেপ।",
    valueSaved: "মূল্য সংরক্ষিত",
    carbonSaved: "কার্বন সংরক্ষিত",
    override: "সুপারিশ ওভাররাইড করুন"
  }
};

export const ConditionClassifier: React.FC<ConditionClassifierProps> = ({ selectedLanguage }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [condition, setCondition] = useState<string>('');
  const [recommendation, setRecommendation] = useState<string>('');
  const [confidence, setConfidence] = useState<number>(0);
  const [recoveryScore, setRecoveryScore] = useState<number>(0);
  const { toast } = useToast();
  
  const t = translations[selectedLanguage];

  const mockAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    
    setTimeout(() => {
      const conditions = ['likeNew', 'minorDamage', 'repairable', 'majorDamage'];
      const recommendations = ['resell', 'repair', 'donate', 'recycle'];
      
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      const randomRecommendation = recommendations[Math.floor(Math.random() * recommendations.length)];
      const randomConfidence = Math.floor(Math.random() * 30) + 70; // 70-100%
      const randomRecoveryScore = Math.floor(Math.random() * 40) + 60; // 60-100%
      
      setCondition(randomCondition);
      setRecommendation(randomRecommendation);
      setConfidence(randomConfidence);
      setRecoveryScore(randomRecoveryScore);
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };

  const getConditionColor = (cond: string) => {
    switch (cond) {
      case 'likeNew': return 'bg-green-500';
      case 'minorDamage': return 'bg-yellow-500';
      case 'repairable': return 'bg-orange-500';
      case 'majorDamage': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'resell': return 'bg-green-600';
      case 'repair': return 'bg-blue-600';
      case 'donate': return 'bg-purple-600';
      case 'recycle': return 'bg-teal-600';
      default: return 'bg-gray-600';
    }
  };

  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case 'resell': return Package;
      case 'repair': return Wrench;
      case 'donate': return Heart;
      case 'recycle': return Recycle;
      default: return Trash2;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center text-blue-800">{t.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="single" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="single" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                {t.singleItem}
              </TabsTrigger>
              <TabsTrigger value="batch" className="flex items-center gap-2">
                <Table className="h-4 w-4" />
                {t.batchTable}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="single" className="space-y-6">
              <div className="text-center">
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="inline-flex items-center gap-2 p-8 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400 transition-colors bg-blue-50">
                    <Camera className="h-12 w-12 text-blue-500" />
                    <div className="text-center">
                      <div className="text-lg font-medium text-blue-700">{t.uploadImage}</div>
                      <div className="text-sm text-gray-600">AI will analyze condition and recommend action</div>
                    </div>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={mockAnalysis}
                    className="hidden"
                  />
                </label>
              </div>

              {isAnalyzing && (
                <div className="text-center space-y-6">
                  <div className="relative w-32 h-32 mx-auto">
                    <div className="w-32 h-32 border-8 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Camera className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg font-medium text-blue-600">{t.analyzing}</div>
                    <Progress value={66} className="w-full max-w-md mx-auto" />
                    <div className="text-sm text-gray-600">Processing image and analyzing condition...</div>
                  </div>
                </div>
              )}

              {analysisComplete && (
                <div className="space-y-6">
                  {/* AI Results */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-2 border-blue-200">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          {t.condition}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Badge className={`${getConditionColor(condition)} text-white text-lg px-4 py-2`}>
                          {t[condition as keyof typeof t] || condition}
                        </Badge>
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{t.confidence}</span>
                            <span className="font-bold">{confidence}%</span>
                          </div>
                          <Progress value={confidence} className="w-full" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-green-200">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-blue-600" />
                          {t.recommendation}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-3 mb-4">
                          {React.createElement(getRecommendationIcon(recommendation), {
                            className: "h-8 w-8 text-white",
                          })}
                          <Badge className={`${getRecommendationColor(recommendation)} text-white text-lg px-4 py-2`}>
                            {t[recommendation as keyof typeof t] || recommendation}
                          </Badge>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            toast({
                              title: "AI Explanation",
                              description: t.aiExplanation
                            });
                          }}
                        >
                          <HelpCircle className="mr-2 h-4 w-4" />
                          {t.whyThis}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recovery Score */}
                  <Card className="bg-gradient-to-r from-green-50 to-blue-50">
                    <CardHeader>
                      <CardTitle className="text-lg text-center">{t.recoveryScore}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center space-y-4">
                        <div className="relative w-40 h-40 mx-auto">
                          <svg className="w-40 h-40 transform -rotate-90">
                            <circle cx="80" cy="80" r="70" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                            <circle cx="80" cy="80" r="70" stroke="#10b981" strokeWidth="12" fill="none"
                                    strokeDasharray={`${recoveryScore * 4.4} 440`} strokeLinecap="round" />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold text-green-600">{recoveryScore}%</span>
                            <span className="text-sm text-gray-600">Impact Score</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-green-600">₹120</div>
                            <div className="text-sm text-gray-600">{t.valueSaved}</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-teal-600">0.7kg</div>
                            <div className="text-sm text-gray-600">{t.carbonSaved}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      onClick={() => {
                        toast({
                          title: "Item Processed",
                          description: "Item has been processed according to AI recommendation"
                        });
                        setAnalysisComplete(false);
                      }}
                      className="flex-1 bg-green-600 hover:bg-green-700 h-12"
                    >
                      <CheckCircle className="mr-2 h-5 w-5" />
                      {t.processItem}
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => {
                        toast({
                          title: "Override Requested",
                          description: "Please provide reason for manual override"
                        });
                      }}
                      className="flex-1 h-12"
                    >
                      {t.override}
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="batch" className="space-y-6">
              <ClassificationTable selectedLanguage={selectedLanguage} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
