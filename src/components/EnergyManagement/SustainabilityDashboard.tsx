import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Leaf, Zap, DollarSign, TrendingDown, TrendingUp, Calendar, Filter } from 'lucide-react';
import { EnergyData } from './EnergyManagementEngine';

type Language = "en" | "hi" | "ta" | "te" | "bn";

interface SustainabilityDashboardProps {
  selectedLanguage: Language;
  energyData: EnergyData[];
}

const translations = {
  en: {
    title: "Sustainability Dashboard",
    subtitle: "Track environmental impact and savings",
    totalEnergySaved: "Total Energy Saved",
    co2Reduced: "CO₂ Emissions Reduced",
    costSavings: "Cost Savings",
    efficiencyGains: "Efficiency Gains",
    energyConsumption: "Energy Consumption",
    emissions: "Emissions",
    savings: "Savings",
    timeRange: "Time Range",
    lastWeek: "Last Week",
    lastMonth: "Last Month",
    lastQuarter: "Last Quarter",
    lastYear: "Last Year",
    viewType: "View Type",
    byStore: "By Store",
    byCategory: "By Category",
    byRegion: "By Region",
    kwh: "kWh",
    kg: "kg",
    inr: "₹",
    percent: "%",
    vs: "vs",
    previousPeriod: "previous period",
    energyTrends: "Energy Consumption Trends",
    emissionReduction: "Emission Reduction",
    topContributors: "Top Energy Contributors",
    monthlyProgress: "Monthly Progress",
    storeLikeMine: "Show stores like mine",
    hvac: "HVAC",
    lighting: "Lighting",
    refrigeration: "Refrigeration",
    checkout: "Checkout",
    backroom: "Backroom"
  },
  hi: {
    title: "स्थिरता डैशबोर्ड",
    subtitle: "पर्यावरणीय प्रभाव और बचत को ट्रैक करें",
    totalEnergySaved: "कुल ऊर्जा की बचत",
    co2Reduced: "CO₂ उत्सर्जन में कमी",
    costSavings: "लागत बचत",
    efficiencyGains: "दक्षता लाभ",
    energyConsumption: "ऊर्जा खपत",
    emissions: "उत्सर्जन",
    savings: "बचत",
    timeRange: "समय सीमा",
    lastWeek: "पिछला सप्ताह",
    lastMonth: "पिछला महीना",
    lastQuarter: "पिछली तिमाही",
    lastYear: "पिछला साल",
    viewType: "देखने का प्रकार",
    byStore: "स्टोर के अनुसार",
    byCategory: "श्रेणी के अनुसार",
    byRegion: "क्षेत्र के अनुसार",
    kwh: "kWh",
    kg: "kg",
    inr: "₹",
    percent: "%",
    vs: "बनाम",
    previousPeriod: "पिछला काल",
    energyTrends: "ऊर्जा खपत के रुझान",
    emissionReduction: "उत्सर्जन में कमी",
    topContributors: "शीर्ष ऊर्जा योगदानकर्ता",
    monthlyProgress: "मासिक प्रगति",
    storeLikeMine: "मेरे जैसे स्टोर दिखाएं",
    hvac: "HVAC",
    lighting: "रोशनी",
    refrigeration: "प्रशीतन",
    checkout: "चेकआउट",
    backroom: "बैकरूम"
  },
  ta: {
    title: "நிலைத்தன்மை டாஷ்போர்ட்",
    subtitle: "சுற்றுச்சூழல் தாக்கம் மற்றும் சேமிப்பை கண்காணிக்கவும்",
    totalEnergySaved: "மொத்த ஆற்றல் சேமிப்பு",
    co2Reduced: "CO₂ உமிழ்வு குறைப்பு",
    costSavings: "செலவு சேமிப்பு",
    efficiencyGains: "திறன் ஆதாயங்கள்",
    energyConsumption: "ஆற்றல் நுகர்வு",
    emissions: "உமிழ்வுகள்",
    savings: "சேமிப்பு",
    timeRange: "நேர வரம்பு",
    lastWeek: "கடந்த வாரம்",
    lastMonth: "கடந்த மாதம்",
    lastQuarter: "கடந்த காலாண்டு",
    lastYear: "கடந்த ஆண்டு",
    viewType: "பார்வை வகை",
    byStore: "கடை வாரியாக",
    byCategory: "வகை வாரியாக",
    byRegion: "பகுதி வாரியாக",
    kwh: "kWh",
    kg: "kg",
    inr: "₹",
    percent: "%",
    vs: "vs",
    previousPeriod: "முந்தைய காலம்",
    energyTrends: "ஆற்றல் நுகர்வு போக்குகள்",
    emissionReduction: "உமிழ்வு குறைப்பு",
    topContributors: "முதன்மை ஆற்றல் பங்களிப்பாளர்கள்",
    monthlyProgress: "மாதாந்திர முன்னேற்றம்",
    storeLikeMine: "என்னைப் போன்ற கடைகளைக் காட்டு",
    hvac: "HVAC",
    lighting: "விளக்குகள்",
    refrigeration: "குளிர்சாதனம்",
    checkout: "பணம் செலுத்துதல்",
    backroom: "பின்அறை"
  },
  te: {
    title: "సస్టైనబిలిటీ డాష్‌బోర్డ్",
    subtitle: "పర్యావరణ ప్రభావం మరియు పొదుపులను ట్రాక్ చేయండి",
    totalEnergySaved: "మొత్తం ఎనర్జీ పొదుపు",
    co2Reduced: "CO₂ ఉత్సర్జనల తగ్గింపు",
    costSavings: "ఖర్చు పొదుపులు",
    efficiencyGains: "దక్షత లాభాలు",
    energyConsumption: "ఎనర్జీ వినియోగం",
    emissions: "ఉత్సర్జనలు",
    savings: "పొదుపులు",
    timeRange: "సమయ వ్యవధి",
    lastWeek: "గత వారం",
    lastMonth: "గత నెల",
    lastQuarter: "గత త్రైమాసికం",
    lastYear: "గత సంవత్సరం",
    viewType: "వీక్షణ రకం",
    byStore: "స్టోర్ వారీగా",
    byCategory: "వర్గం వారీగా",
    byRegion: "ప్రాంతం వారీగా",
    kwh: "kWh",
    kg: "kg",
    inr: "₹",
    percent: "%",
    vs: "vs",
    previousPeriod: "మునుపటి కాలం",
    energyTrends: "ఎనర్జీ వినియోగ ట్రెండ్‌లు",
    emissionReduction: "ఉత్సర్జన తగ్గింపు",
    topContributors: "టాప్ ఎనర్జీ కంట్రిబ్యూటర్‌లు",
    monthlyProgress: "నెలవారీ పురోగతి",
    storeLikeMine: "నా లాంటి స్టోర్‌లను చూపించు",
    hvac: "HVAC",
    lighting: "లైటింగ్",
    refrigeration: "రిఫ్రిజరేషన్",
    checkout: "చెక్అవుట్",
    backroom: "బ్యాక్‌రూమ్"
  },
  bn: {
    title: "সাস্টেইনেবিলিটি ড্যাশবোর্ড",
    subtitle: "পরিবেশগত প্রভাব এবং সাশ্রয় ট্র্যাক করুন",
    totalEnergySaved: "মোট শক্তি সাশ্রয়",
    co2Reduced: "CO₂ নিঃসরণ হ্রাস",
    costSavings: "খরচ সাশ্রয়",
    efficiencyGains: "দক্ষতা লাভ",
    energyConsumption: "শক্তি ব্যবহার",
    emissions: "নিঃসরণ",
    savings: "সাশ্রয়",
    timeRange: "সময়ের সীমা",
    lastWeek: "গত সপ্তাহ",
    lastMonth: "গত মাস",
    lastQuarter: "গত ত্রৈমাসিক",
    lastYear: "গত বছর",
    viewType: "দেখার ধরন",
    byStore: "দোকান অনুযায়ী",
    byCategory: "বিভাগ অনুযায়ী",
    byRegion: "অঞ্চল অনুযায়ী",
    kwh: "kWh",
    kg: "kg",
    inr: "₹",
    percent: "%",
    vs: "বনাম",
    previousPeriod: "পূর্ববর্তী সময়",
    energyTrends: "শক্তি ব্যবহারের ট্রেন্ড",
    emissionReduction: "নিঃসরণ হ্রাস",
    topContributors: "শীর্ষ শক্তি অবদানকারী",
    monthlyProgress: "মাসিক অগ্রগতি",
    storeLikeMine: "আমার মতো দোকান দেখান",
    hvac: "HVAC",
    lighting: "আলো",
    refrigeration: "হিমায়ন",
    checkout: "চেকআউট",
    backroom: "ব্যাকরুম"
  }
};

// Mock data for charts
const energyTrendData = [
  { month: 'Jan', consumption: 45200, target: 42000, saved: 2800 },
  { month: 'Feb', consumption: 44100, target: 42000, saved: 3200 },
  { month: 'Mar', consumption: 43800, target: 42000, saved: 3600 },
  { month: 'Apr', consumption: 42900, target: 42000, saved: 4100 },
  { month: 'May', consumption: 41800, target: 42000, saved: 4800 },
  { month: 'Jun', consumption: 40200, target: 42000, saved: 5300 }
];

const emissionData = [
  { category: 'HVAC', current: 1850, baseline: 2200, reduction: 350 },
  { category: 'Lighting', current: 680, baseline: 820, reduction: 140 },
  { category: 'Refrigeration', current: 1420, baseline: 1580, reduction: 160 },
  { category: 'Checkout', current: 290, baseline: 340, reduction: 50 },
  { category: 'Backroom', current: 180, baseline: 210, reduction: 30 }
];

const contributorData = [
  { name: 'HVAC', value: 42, color: '#3b82f6' },
  { name: 'Refrigeration', value: 28, color: '#10b981' },
  { name: 'Lighting', value: 18, color: '#f59e0b' },
  { name: 'Checkout', value: 8, color: '#ef4444' },
  { name: 'Backroom', value: 4, color: '#8b5cf6' }
];

const chartConfig = {
  consumption: { label: "Consumption", color: "hsl(var(--primary))" },
  target: { label: "Target", color: "hsl(var(--muted-foreground))" },
  saved: { label: "Saved", color: "hsl(var(--chart-2))" },
  current: { label: "Current", color: "hsl(var(--primary))" },
  baseline: { label: "Baseline", color: "hsl(var(--muted-foreground))" },
  reduction: { label: "Reduction", color: "hsl(var(--chart-2))" }
};

export const SustainabilityDashboard: React.FC<SustainabilityDashboardProps> = ({
  selectedLanguage
}) => {
  const t = translations[selectedLanguage];
  const [timeRange, setTimeRange] = useState("lastMonth");
  const [viewType, setViewType] = useState("byStore");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">{t.title}</h2>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>
        
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lastWeek">{t.lastWeek}</SelectItem>
              <SelectItem value="lastMonth">{t.lastMonth}</SelectItem>
              <SelectItem value="lastQuarter">{t.lastQuarter}</SelectItem>
              <SelectItem value="lastYear">{t.lastYear}</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={viewType} onValueChange={setViewType}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="byStore">{t.byStore}</SelectItem>
              <SelectItem value="byCategory">{t.byCategory}</SelectItem>
              <SelectItem value="byRegion">{t.byRegion}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">{t.totalEnergySaved}</CardTitle>
              <Zap className="w-4 h-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-green-600">20,347</span>
                <span className="text-sm text-muted-foreground">{t.kwh}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-green-600">+12.5%</span>
                <span className="text-muted-foreground">{t.vs} {t.previousPeriod}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">{t.co2Reduced}</CardTitle>
              <Leaf className="w-4 h-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-blue-600">10,230</span>
                <span className="text-sm text-muted-foreground">{t.kg}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span className="text-blue-600">+8.3%</span>
                <span className="text-muted-foreground">{t.vs} {t.previousPeriod}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/5 to-yellow-500/10 border-yellow-500/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">{t.costSavings}</CardTitle>
              <DollarSign className="w-4 h-4 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-yellow-600">₹1,42,150</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="w-4 h-4 text-yellow-500" />
                <span className="text-yellow-600">+15.7%</span>
                <span className="text-muted-foreground">{t.vs} {t.previousPeriod}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/5 to-purple-500/10 border-purple-500/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">{t.efficiencyGains}</CardTitle>
              <TrendingUp className="w-4 h-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-purple-600">18.4</span>
                <span className="text-sm text-muted-foreground">{t.percent}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="w-4 h-4 text-purple-500" />
                <span className="text-purple-600">+3.2%</span>
                <span className="text-muted-foreground">{t.vs} {t.previousPeriod}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trends">{t.energyTrends}</TabsTrigger>
          <TabsTrigger value="emissions">{t.emissionReduction}</TabsTrigger>
          <TabsTrigger value="contributors">{t.topContributors}</TabsTrigger>
        </TabsList>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{t.energyTrends}</CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  {t.storeLikeMine}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={energyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="consumption" 
                      stroke="var(--color-consumption)" 
                      strokeWidth={2}
                      dot={{ fill: "var(--color-consumption)", strokeWidth: 2 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="target" 
                      stroke="var(--color-target)" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: "var(--color-target)", strokeWidth: 2 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="saved" 
                      stroke="var(--color-saved)" 
                      strokeWidth={2}
                      dot={{ fill: "var(--color-saved)", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emissions">
          <Card>
            <CardHeader>
              <CardTitle>{t.emissionReduction}</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={emissionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="baseline" fill="var(--color-baseline)" name="Baseline" />
                    <Bar dataKey="current" fill="var(--color-current)" name="Current" />
                    <Bar dataKey="reduction" fill="var(--color-reduction)" name="Reduction" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
                {emissionData.map((item) => (
                  <div key={item.category} className="text-center">
                    <Badge variant="outline" className="mb-2">
                      {t[item.category.toLowerCase() as keyof typeof t]}
                    </Badge>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-green-600">
                        -{item.reduction} {t.kg}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {Math.round((item.reduction / item.baseline) * 100)}{t.percent} reduction
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contributors">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.topContributors}</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={contributorData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {contributorData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-background border rounded-lg p-3 shadow-lg">
                                <p className="font-medium">{data.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {data.value}% of total consumption
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.monthlyProgress}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contributorData.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-medium">
                          {t[item.name.toLowerCase() as keyof typeof t]}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold">{item.value}%</span>
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          <TrendingDown className="w-3 h-3" />
                          <span>-2.3%</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${item.value}%`,
                          backgroundColor: item.color
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};