import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Leaf, Package, Award, Globe, Coins, Users, Calendar } from 'lucide-react';

type Language = "en" | "hi" | "ta" | "te" | "bn";

interface PackagingAnalyticsProps {
  selectedLanguage: Language;
  totalEcoCoins: number;
}

const translations = {
  en: {
    title: "Packaging Analytics Dashboard",
    subtitle: "Track your sustainability impact and packaging performance",
    impactFeed: "Real-time Impact Feed",
    supplierScorecard: "Supplier Scorecard",
    materialUsage: "Material Usage Trends",
    co2Savings: "CO₂ Emissions Saved",
    costSavings: "Cost Savings",
    recyclabilityRate: "Recyclability Rate",
    supplierRank: "Supplier Rank",
    ecoCoinsEarned: "Eco-Coins Earned",
    packagesOptimized: "Packages Optimized",
    carbonFootprint: "Carbon Footprint",
    thisMonth: "This Month",
    thisWeek: "This Week",
    vs: "vs",
    lastQuarter: "last quarter",
    plasticFreeShipments: "Plastic-free shipments",
    topPerformer: "Top Performer",
    category: "Category",
    regional: "Regional",
    materials: "Materials",
    performance: "Performance",
    benchmarkVsPeers: "Benchmark vs Peers",
    excellent: "Excellent",
    good: "Good",
    average: "Average",
    leaderboard: "Leaderboard Position"
  },
  hi: {
    title: "पैकेजिंग एनालिटिक्स डैशबोर्ड",
    subtitle: "अपनी स्थिरता प्रभाव और पैकेजिंग प्रदर्शन को ट्रैक करें",
    impactFeed: "रियल-टाइम प्रभाव फीड",
    supplierScorecard: "आपूर्तिकर्ता स्कोरकार्ड",
    materialUsage: "सामग्री उपयोग ट्रेंड",
    co2Savings: "बचाए गए CO₂ उत्सर्जन",
    costSavings: "लागत बचत",
    recyclabilityRate: "पुनर्चक्रण दर",
    supplierRank: "आपूर्तिकर्ता रैंक",
    ecoCoinsEarned: "अर्जित इको-कॉइन",
    packagesOptimized: "अनुकूलित पैकेज",
    carbonFootprint: "कार्बन फुटप्रिंट",
    thisMonth: "इस महीने",
    thisWeek: "इस सप्ताह",
    vs: "बनाम",
    lastQuarter: "पिछली तिमाही",
    plasticFreeShipments: "प्लास्टिक मुक्त शिपमेंट",
    topPerformer: "शीर्ष प्रदर्शनकर्ता",
    category: "श्रेणी",
    regional: "क्षेत्रीय",
    materials: "सामग्री",
    performance: "प्रदर्शन",
    benchmarkVsPeers: "साथियों के मुकाबले बेंचमार्क",
    excellent: "उत्कृष्ट",
    good: "अच्छा",
    average: "औसत",
    leaderboard: "लीडरबोर्ड स्थिति"
  },
  ta: {
    title: "பொதியிடல் பகுப்பாய்வு டாஷ்போர்டு",
    subtitle: "உங்கள் நிலைத்தன்மை தாக்கம் மற்றும் பொதியிடல் செயல்திறனைக் கண்காணிக்கவும்",
    impactFeed: "நேரடி தாக்க ஊட்டம்",
    supplierScorecard: "சப்ளையர் ஸ்கோர்கார்டு",
    materialUsage: "பொருள் பயன்பாட்டு போக்குகள்",
    co2Savings: "சேமித்த CO₂ உமிழ்வுகள்",
    costSavings: "செலவு சேமிப்பு",
    recyclabilityRate: "மறுசுழற்சி விகிதம்",
    supplierRank: "சப்ளையர் தரம்",
    ecoCoinsEarned: "சம்பாதித்த ஈகோ-நாணயங்கள்",
    packagesOptimized: "உகந்த பொதிகள்",
    carbonFootprint: "கார்பன் தடம்",
    thisMonth: "இந்த மாதம்",
    thisWeek: "இந்த வாரம்",
    vs: "எதிராக",
    lastQuarter: "கடந்த காலாண்டு",
    plasticFreeShipments: "பிளாஸ்டிக் இல்லாத கப்பல்கள்",
    topPerformer: "சிறந்த செயல்திறன்",
    category: "வகை",
    regional: "பிராந்திய",
    materials: "பொருட்கள்",
    performance: "செயல்திறன்",
    benchmarkVsPeers: "சகாக்களுடன் ஒப்பிடும் அளவுகோல்",
    excellent: "சிறப்பு",
    good: "நல்ல",
    average: "சராசரி",
    leaderboard: "தலைமை பலகை நிலை"
  },
  te: {
    title: "ప్యాకేజింగ్ అనలిటిక్స్ డ్యాష్‌బోర్డ్",
    subtitle: "మీ స్థిరత్వ ప్రభావం మరియు ప్యాకేజింగ్ పనితీరును ట్రాక్ చేయండి",
    impactFeed: "రియల్-టైమ్ ఇంపాక్ట్ ఫీడ్",
    supplierScorecard: "సప్లయర్ స్కోర్‌కార్డ్",
    materialUsage: "మెటీరియల్ వినియోగ పోకడలు",
    co2Savings: "సేవ్ చేసిన CO₂ ఉద్గారాలు",
    costSavings: "వ్యయ ఆదాయాలు",
    recyclabilityRate: "రీసైక్లింగ్ రేట్",
    supplierRank: "సప్లయర్ ర్యాంక్",
    ecoCoinsEarned: "సంపాదించిన ఎకో-కాయిన్లు",
    packagesOptimized: "ఆప్టిమైజ్ చేసిన ప్యాకేజీలు",
    carbonFootprint: "కార్బన్ ఫుట్‌ప్రింట్",
    thisMonth: "ఈ నెల",
    thisWeek: "ఈ వారం",
    vs: "వర్సస్",
    lastQuarter: "గత క్వార్టర్",
    plasticFreeShipments: "ప్లాస్టిక్ రహిత షిప్‌మెంట్లు",
    topPerformer: "టాప్ పర్ఫార్మర్",
    category: "వర్గం",
    regional: "ప్రాంతీయ",
    materials: "మెటీరియల్స్",
    performance: "పనితీరు",
    benchmarkVsPeers: "సహచరులతో బెంచ్‌మార్క్",
    excellent: "అద్భుతమైన",
    good: "మంచి",
    average: "సగటు",
    leaderboard: "లీడర్‌బోర్డ్ స్థానం"
  },
  bn: {
    title: "প্যাকেজিং অ্যানালিটিক্স ড্যাশবোর্ড",
    subtitle: "আপনার স্থায়িত্ব প্রভাব এবং প্যাকেজিং কর্মক্ষমতা ট্র্যাক করুন",
    impactFeed: "রিয়েল-টাইম ইমপ্যাক্ট ফিড",
    supplierScorecard: "সাপ্লায়ার স্কোরকার্ড",
    materialUsage: "উপাদান ব্যবহারের প্রবণতা",
    co2Savings: "সংরক্ষিত CO₂ নির্গমন",
    costSavings: "খরচ সাশ্রয়",
    recyclabilityRate: "পুনর্ব্যবহার হার",
    supplierRank: "সাপ্লায়ার র‍্যাঙ্ক",
    ecoCoinsEarned: "অর্জিত ইকো-কয়েন",
    packagesOptimized: "অপ্টিমাইজড প্যাকেজ",
    carbonFootprint: "কার্বন ফুটপ্রিন্ট",
    thisMonth: "এই মাসে",
    thisWeek: "এই সপ্তাহে",
    vs: "বনাম",
    lastQuarter: "গত ত্রৈমাসিক",
    plasticFreeShipments: "প্লাস্টিক মুক্ত চালান",
    topPerformer: "শীর্ষ পারফরমার",
    category: "বিভাগ",
    regional: "আঞ্চলিক",
    materials: "উপকরণ",
    performance: "কর্মক্ষমতা",
    benchmarkVsPeers: "সমকক্ষদের সাথে বেঞ্চমার্ক",
    excellent: "চমৎকার",
    good: "ভালো",
    average: "গড়",
    leaderboard: "লিডারবোর্ড অবস্থান"
  }
};

// Mock data for analytics
const co2SavingsData = [
  { month: 'Jan', savings: 120 },
  { month: 'Feb', savings: 145 },
  { month: 'Mar', savings: 167 },
  { month: 'Apr', savings: 189 },
  { month: 'May', savings: 210 },
  { month: 'Jun', savings: 156 }
];

const materialUsageData = [
  { name: 'Recycled Cardboard', value: 45, color: '#10B981' },
  { name: 'Biodegradable Film', value: 25, color: '#3B82F6' },
  { name: 'Compostable Fill', value: 20, color: '#F59E0B' },
  { name: 'Other Sustainable', value: 10, color: '#8B5CF6' }
];

const performanceData = [
  { category: 'Electronics', co2: 45, cost: 12, recyclability: 95 },
  { category: 'Clothing', co2: 32, cost: 8, recyclability: 88 },
  { category: 'Food', co2: 28, cost: 6, recyclability: 92 },
  { category: 'Books', co2: 15, cost: 4, recyclability: 98 }
];

export const PackagingAnalytics: React.FC<PackagingAnalyticsProps> = ({
  selectedLanguage,
  totalEcoCoins
}) => {
  const t = translations[selectedLanguage];

  const currentMetrics = {
    co2SavedThisMonth: 156,
    costSavingsThisMonth: 3200,
    recyclabilityRate: 91,
    supplierRank: 3,
    packagesOptimized: 1247,
    plasticFreeRate: 63
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">{t.title}</h2>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-700">{t.co2Savings}</span>
            </div>
            <div className="text-2xl font-bold text-green-800">{currentMetrics.co2SavedThisMonth}kg</div>
            <div className="text-xs text-green-600">{t.thisMonth}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">{t.costSavings}</span>
            </div>
            <div className="text-2xl font-bold text-blue-800">₹{currentMetrics.costSavingsThisMonth}</div>
            <div className="text-xs text-blue-600">{t.thisMonth}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Coins className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-700">{t.ecoCoinsEarned}</span>
            </div>
            <div className="text-2xl font-bold text-yellow-800">{totalEcoCoins}</div>
            <div className="text-xs text-yellow-600">{t.thisWeek}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Package className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">{t.packagesOptimized}</span>
            </div>
            <div className="text-2xl font-bold text-purple-800">{currentMetrics.packagesOptimized}</div>
            <div className="text-xs text-purple-600">{t.thisMonth}</div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Impact Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-green-600" />
            {t.impactFeed}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <span className="text-green-700">You've saved <strong>{currentMetrics.co2SavedThisMonth} kg CO₂</strong> this month!</span>
              <Badge className="bg-green-100 text-green-700">🌱 +15% {t.vs} {t.lastQuarter}</Badge>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-blue-700">{t.plasticFreeShipments}: <strong>{currentMetrics.plasticFreeRate}%</strong></span>
              <Badge className="bg-blue-100 text-blue-700">📈 +9% {t.vs} {t.lastQuarter}</Badge>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-center justify-between">
              <span className="text-yellow-700">Eco-Coins Balance: <strong>{totalEcoCoins}</strong> earned this week</span>
              <Badge className="bg-yellow-100 text-yellow-700">{t.leaderboard}: #3</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* CO2 Savings Trend */}
        <Card>
          <CardHeader>
            <CardTitle>{t.co2Savings} {t.vs} {t.lastQuarter}</CardTitle>
            <CardDescription>Monthly CO₂ emissions reduction</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={co2SavingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Line type="monotone" dataKey="savings" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Material Usage */}
        <Card>
          <CardHeader>
            <CardTitle>{t.materialUsage}</CardTitle>
            <CardDescription>Distribution of sustainable materials</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={materialUsageData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {materialUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Supplier Scorecard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-gold" />
            {t.supplierScorecard}
          </CardTitle>
          <CardDescription>Performance metrics and benchmark comparison</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{t.recyclabilityRate}</span>
                <span className="text-lg font-bold text-green-600">{currentMetrics.recyclabilityRate}%</span>
              </div>
              <Progress value={currentMetrics.recyclabilityRate} className="h-3" />
              <div className="text-xs text-muted-foreground mt-1">{t.excellent}</div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{t.supplierRank}</span>
                <span className="text-lg font-bold text-blue-600">#{currentMetrics.supplierRank}</span>
              </div>
              <Progress value={85} className="h-3" />
              <div className="text-xs text-muted-foreground mt-1">{t.topPerformer} {t.category}</div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Plastic-Free Rate</span>
                <span className="text-lg font-bold text-purple-600">{currentMetrics.plasticFreeRate}%</span>
              </div>
              <Progress value={currentMetrics.plasticFreeRate} className="h-3" />
              <div className="text-xs text-muted-foreground mt-1">{t.good} {t.regional}</div>
            </div>
          </div>

          {/* Category Performance */}
          <div>
            <h4 className="font-medium mb-4">{t.performance} by {t.category}</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Bar dataKey="recyclability" fill="#10B981" name="Recyclability %" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Leaderboard */}
          <div className="bg-gradient-to-r from-gold-50 to-yellow-50 p-4 rounded-lg border border-gold-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-gold-600" />
                </div>
                <div>
                  <div className="font-medium text-gold-800">{t.benchmarkVsPeers}</div>
                  <div className="text-sm text-gold-600">Top 15% in sustainability metrics</div>
                </div>
              </div>
              <Badge className="bg-gold-100 text-gold-700 text-lg px-4 py-2">
                🏆 Rank #{currentMetrics.supplierRank}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};