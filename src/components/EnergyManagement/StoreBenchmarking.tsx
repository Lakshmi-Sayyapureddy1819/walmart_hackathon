import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Award, Target, MapPin, Zap } from 'lucide-react';

type Language = "en" | "hi" | "ta" | "te" | "bn";

interface StoreBenchmarkingProps {
  selectedLanguage: Language;
  selectedStore: string | null;
}

const translations = {
  en: {
    title: "Store Benchmarking",
    subtitle: "Compare performance against peer stores",
    selectStore: "Select Store",
    allStores: "All Stores",
    yourStore: "Your Store",
    peerAverage: "Peer Average",
    topPerformers: "Top 5% Performers",
    benchmarkCategory: "Benchmark Category",
    similarFormat: "Similar Format",
    similarClimate: "Similar Climate", 
    similarProfile: "Similar Energy Profile",
    efficiencyRank: "Efficiency Percentile",
    potentialSavings: "Potential Savings",
    adoptConfig: "Adopt This Config",
    bestPractices: "Best Practices",
    leaderboard: "Performance Leaderboard",
    energyIntensity: "Energy Intensity",
    co2Emissions: "CO₂ Emissions",
    costEfficiency: "Cost Efficiency",
    overallScore: "Overall Score",
    kwh: "kWh",
    perSqft: "per sqft",
    kg: "kg",
    perMonth: "per month",
    rank: "Rank",
    store: "Store",
    location: "Location",
    score: "Score",
    trend: "Trend",
    viewDetails: "View Details"
  },
  hi: {
    title: "स्टोर बेंचमार्किंग",
    subtitle: "साथी स्टोर्स के मुकाबले प्रदर्शन की तुलना करें",
    selectStore: "स्टोर चुनें",
    allStores: "सभी स्टोर",
    yourStore: "आपका स्टोर",
    peerAverage: "साथी औसत",
    topPerformers: "शीर्ष 5% प्रदर्शनकर्ता",
    benchmarkCategory: "बेंचमार्क श्रेणी",
    similarFormat: "समान प्रारूप",
    similarClimate: "समान जलवायु",
    similarProfile: "समान ऊर्जा प्रोफ़ाइल",
    efficiencyRank: "दक्षता प्रतिशतक",
    potentialSavings: "संभावित बचत",
    adoptConfig: "इस कॉन्फ़िग को अपनाएं",
    bestPractices: "सर्वोत्तम प्रथाएं",
    leaderboard: "प्रदर्शन लीडरबोर्ड",
    energyIntensity: "ऊर्जा तीव्रता",
    co2Emissions: "CO₂ उत्सर्जन",
    costEfficiency: "लागत दक्षता",
    overallScore: "समग्र स्कोर",
    kwh: "kWh",
    perSqft: "प्रति वर्ग फुट",
    kg: "kg",
    perMonth: "प्रति माह",
    rank: "रैंक",
    store: "स्टोर",
    location: "स्थान",
    score: "स्कोर",
    trend: "रुझान",
    viewDetails: "विवरण देखें"
  },
  ta: {
    title: "கடை செயல்திறன் ஒப்பீடு",
    subtitle: "சக கடைகளுடன் செயல்திறனை ஒப்பிடுக",
    selectStore: "கடையைத் தேர்ந்தெடுக்கவும்",
    allStores: "அனைத்து கடைகள்",
    yourStore: "உங்கள் கடை",
    peerAverage: "சக சராசரி",
    topPerformers: "முதல் 5% செயல்படுபவர்கள்",
    benchmarkCategory: "ஒப்பீட்டு வகை",
    similarFormat: "ஒத்த வடிவம்",
    similarClimate: "ஒத்த காலநிலை",
    similarProfile: "ஒத்த ஆற்றல் விவரம்",
    efficiencyRank: "திறன் சதவீதம்",
    potentialSavings: "சாத்தியமான சேமிப்பு",
    adoptConfig: "இந்த கட்டமைப்பை ஏற்று",
    bestPractices: "சிறந்த நடைமுறைகள்",
    leaderboard: "செயல்திறன் தலைமை பலகை",
    energyIntensity: "ஆற்றல் தீவிரம்",
    co2Emissions: "CO₂ உமிழ்வுகள்",
    costEfficiency: "செலவு திறன்",
    overallScore: "ஒட்டுமொத்த மதிப்பெண்",
    kwh: "kWh",
    perSqft: "ஒரு சதுர அடிக்கு",
    kg: "kg",
    perMonth: "மாதத்திற்கு",
    rank: "தரம்",
    store: "கடை",
    location: "இடம்",
    score: "மதிப்பெண்",
    trend: "போக்கு",
    viewDetails: "விவரங்களைப் பார்க்கவும்"
  },
  te: {
    title: "స్టోర్ బెంచ్‌మార్కింగ్",
    subtitle: "పీర్ స్టోర్‌లతో పనితీరును పోల్చండి",
    selectStore: "స్టోర్ ఎంచుకోండి",
    allStores: "అన్ని స్టోర్‌లు",
    yourStore: "మీ స్టోర్",
    peerAverage: "పీర్ సగటు",
    topPerformers: "టాప్ 5% పెర్ఫార్మర్స్",
    benchmarkCategory: "బెంచ్‌మార్క్ వర్గం",
    similarFormat: "సారూప్య ఫార్మాట్",
    similarClimate: "సారూప్య వాతావరణం",
    similarProfile: "సారూప్య ఎనర్జీ ప్రొఫైల్",
    efficiencyRank: "దక్షత శాతం",
    potentialSavings: "సంభావ్య పొదుపులు",
    adoptConfig: "ఈ కాన్ఫిగ్‌ను అనుసరించండి",
    bestPractices: "ఉత్తమ పద్ధతులు",
    leaderboard: "పనితీరు లీడర్‌బోర్డ్",
    energyIntensity: "ఎనర్జీ తీవ్రత",
    co2Emissions: "CO₂ ఉత్సర్జనలు",
    costEfficiency: "వ్యయ దక్షత",
    overallScore: "మొత్తం స్కోర్",
    kwh: "kWh",
    perSqft: "చ.అ.కి",
    kg: "kg",
    perMonth: "నెలకు",
    rank: "ర్యాంక్",
    store: "స్టోర్",
    location: "స్థానం",
    score: "స్కోర్",
    trend: "ట్రెండ్",
    viewDetails: "వివరాలు చూడండి"
  },
  bn: {
    title: "স্টোর বেঞ্চমার্কিং",
    subtitle: "সমকক্ষ দোকানের সাথে কর্মক্ষমতা তুলনা করুন",
    selectStore: "দোকান নির্বাচন করুন",
    allStores: "সব দোকান",
    yourStore: "আপনার দোকান",
    peerAverage: "সমকক্ষ গড়",  
    topPerformers: "শীর্ষ ৫% পারফরমার",
    benchmarkCategory: "বেঞ্চমার্ক বিভাগ",
    similarFormat: "অনুরূপ ফরম্যাট",
    similarClimate: "অনুরূপ জলবায়ু",
    similarProfile: "অনুরূপ শক্তি প্রোফাইল",
    efficiencyRank: "দক্ষতা শতাংশ",
    potentialSavings: "সম্ভাব্য সাশ্রয়",
    adoptConfig: "এই কনফিগ গ্রহণ করুন",
    bestPractices: "সেরা অনুশীলন",
    leaderboard: "কর্মক্ষমতা লিডারবোর্ড",
    energyIntensity: "শক্তির তীব্রতা",
    co2Emissions: "CO₂ নিঃসরণ",
    costEfficiency: "ব্যয় দক্ষতা",
    overallScore: "সামগ্রিক স্কোর",
    kwh: "kWh",
    perSqft: "বর্গফুট প্রতি",
    kg: "kg", 
    perMonth: "মাসে",
    rank: "র‍্যাঙ্ক",
    store: "দোকান",
    location: "অবস্থান",
    score: "স্কোর",
    trend: "প্রবণতা",
    viewDetails: "বিস্তারিত দেখুন"
  }
};

// Mock benchmarking data
const mockBenchmarkData = {
  currentStore: {
    name: "Walmart Supercenter Mumbai",
    energyIntensity: 28.5, // kWh per sqft
    co2Emissions: 3420, // kg per month
    costEfficiency: 0.12, // $ per kWh
    overallScore: 72,
    rank: 147
  },
  totalStores: 847,
  peerAverage: {
    energyIntensity: 24.2,
    co2Emissions: 2890,
    costEfficiency: 0.10,
    overallScore: 78
  },
  topPerformers: {
    energyIntensity: 18.7,
    co2Emissions: 2230,
    costEfficiency: 0.08,
    overallScore: 94
  },
  potentialSavings: {
    energy: 412, // kWh per month
    cost: 4940, // $ per month
    co2: 530 // kg per month
  }
};

const mockLeaderboard = [
  { rank: 1, name: "Walmart Supercenter Pune", location: "Pune, MH", score: 96, trend: "up", energyIntensity: 17.2 },
  { rank: 2, name: "Walmart Neighborhood Kochi", location: "Kochi, KL", score: 94, trend: "up", energyIntensity: 18.1 },
  { rank: 3, name: "Walmart Express Coimbatore", location: "Coimbatore, TN", score: 93, trend: "stable", energyIntensity: 18.9 },
  { rank: 4, name: "Walmart Supercenter Gurgaon", location: "Gurgaon, HR", score: 91, trend: "up", energyIntensity: 19.4 },
  { rank: 5, name: "Walmart Neighborhood Indore", location: "Indore, MP", score: 89, trend: "down", energyIntensity: 20.1 }
];

export const StoreBenchmarking: React.FC<StoreBenchmarkingProps> = ({
  selectedLanguage
}) => {
  const t = translations[selectedLanguage];
  const [selectedCategory, setSelectedCategory] = useState("similarFormat");
  const [selectedStoreId, setSelectedStoreId] = useState("store-001");

  const data = mockBenchmarkData;

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down": return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <div className="w-4 h-4 rounded-full bg-yellow-500" />;
    }
  };

  const getPercentileColor = (percentile: number) => {
    if (percentile >= 90) return "text-green-600 bg-green-500/10";
    if (percentile >= 70) return "text-yellow-600 bg-yellow-500/10";
    return "text-red-600 bg-red-500/10";
  };

  const currentPercentile = Math.round(((data.totalStores - data.currentStore.rank) / data.totalStores) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">{t.title}</h2>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>
        
        <div className="flex gap-3">
          <Select value={selectedStoreId} onValueChange={setSelectedStoreId}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder={t.selectStore} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="store-001">Walmart Supercenter Mumbai</SelectItem>
              <SelectItem value="store-002">Walmart Neighborhood Bangalore</SelectItem>
              <SelectItem value="store-003">Walmart Express Chennai</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="similarFormat">{t.similarFormat}</SelectItem>
              <SelectItem value="similarClimate">{t.similarClimate}</SelectItem>
              <SelectItem value="similarProfile">{t.similarProfile}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">{t.energyIntensity}</CardTitle>
              <Zap className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{data.currentStore.energyIntensity}</span>
                <span className="text-sm text-muted-foreground">{t.kwh} {t.perSqft}</span>
              </div>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.peerAverage}:</span>
                  <span>{data.peerAverage.energyIntensity} {t.kwh}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.topPerformers}:</span>
                  <span className="text-green-600">{data.topPerformers.energyIntensity} {t.kwh}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">{t.co2Emissions}</CardTitle>
              <TrendingDown className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{data.currentStore.co2Emissions}</span>
                <span className="text-sm text-muted-foreground">{t.kg} {t.perMonth}</span>
              </div>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.peerAverage}:</span>
                  <span>{data.peerAverage.co2Emissions} {t.kg}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.topPerformers}:</span>
                  <span className="text-green-600">{data.topPerformers.co2Emissions} {t.kg}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">{t.efficiencyRank}</CardTitle>
              <Target className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{currentPercentile}%</span>
                <Badge className={getPercentileColor(currentPercentile)}>
                  {t.rank} {data.currentStore.rank}/{data.totalStores}
                </Badge>
              </div>
              <Progress value={currentPercentile} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {currentPercentile >= 75 ? "Excellent performance" : 
                 currentPercentile >= 50 ? "Above average" : "Needs improvement"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">{t.potentialSavings}</CardTitle>
              <Award className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Energy:</span>
                  <span className="font-medium text-green-600">-{data.potentialSavings.energy} {t.kwh}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cost:</span>
                  <span className="font-medium text-green-600">-₹{data.potentialSavings.cost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CO₂:</span>
                  <span className="font-medium text-green-600">-{data.potentialSavings.co2} {t.kg}</span>
                </div>
              </div>
              <Button size="sm" className="w-full mt-2">
                {t.adoptConfig}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            {t.leaderboard}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockLeaderboard.map((store, index) => (
              <div key={store.rank} className={`flex items-center justify-between p-3 rounded-lg border ${
                index === 0 ? 'bg-yellow-500/5 border-yellow-500/20' :
                index < 3 ? 'bg-primary/5 border-primary/20' : 'bg-muted/20'
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-yellow-500 text-white' :
                    index < 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {store.rank}
                  </div>
                  <div>
                    <p className="font-medium">{store.name}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{store.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <p className="font-medium">{store.score}</p>
                    <p className="text-xs text-muted-foreground">{t.score}</p>
                  </div>
                  <div>
                    <p className="font-medium">{store.energyIntensity}</p>
                    <p className="text-xs text-muted-foreground">{t.kwh} {t.perSqft}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(store.trend)}
                    <Button variant="ghost" size="sm">
                      {t.viewDetails}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};