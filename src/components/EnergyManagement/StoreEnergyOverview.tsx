import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Zap, TrendingUp, AlertTriangle } from 'lucide-react';
import { EnergyData } from './EnergyManagementEngine';

type Language = "en" | "hi" | "ta" | "te" | "bn";

interface StoreEnergyOverviewProps {
  selectedLanguage: Language;
  onStoreSelect: (storeId: string) => void;
  energyData: EnergyData[];
}

const translations = {
  en: {
    title: "Store Energy Overview",
    searchPlaceholder: "Search stores...",
    allStores: "All Stores",
    alertOnly: "Alert-Only Stores",
    normal: "Normal",
    warning: "Warning",
    critical: "Critical",
    totalConsumption: "Total Consumption Today",
    overThreshold: "Over Threshold",
    viewDetails: "View Detailed Report",
    liveRefresh: "Live Refresh: 30s",
    kwh: "kWh",
    stores: "stores"
  },
  hi: {
    title: "स्टोर ऊर्जा अवलोकन",
    searchPlaceholder: "स्टोर खोजें...",
    allStores: "सभी स्टोर",
    alertOnly: "केवल अलर्ट स्टोर",
    normal: "सामान्य",
    warning: "चेतावनी",
    critical: "गंभीर",
    totalConsumption: "आज कुल खपत",
    overThreshold: "सीमा से अधिक",
    viewDetails: "विस्तृत रिपोर्ट देखें",
    liveRefresh: "लाइव रिफ्रेश: 30 सेकंड",
    kwh: "kWh",
    stores: "स्टोर"
  },
  ta: {
    title: "கடை ஆற்றல் அவलோகனம்",
    searchPlaceholder: "கடைகளை தேடு...",
    allStores: "அனைத்து கடைகள்",
    alertOnly: "எச்சரிக்கை மட்டும் கடைகள்",
    normal: "சாதாரண",
    warning: "எச்சரிக்கை",
    critical: "முக்கியமான",
    totalConsumption: "இன்று மொத்த நுகர்வு",
    overThreshold: "வரம்புக்கு மேல்",
    viewDetails: "விரிவான அறிக்கையைப் பார்க்கவும்",
    liveRefresh: "நேரடி புதுப்பிப்பு: 30 வி",
    kwh: "kWh",
    stores: "கடைகள்"
  },
  te: {
    title: "స్టోర్ ఎనర్జీ ఓవర్‌వ్యూ",
    searchPlaceholder: "దుకాణాలను వెతకండి...",
    allStores: "అన్ని దుకాణాలు",
    alertOnly: "అలర్ట్-మాత్రమే దుకాణాలు",
    normal: "సాధారణ",
    warning: "హెచ్చరిక",
    critical: "క్లిష్టమైన",
    totalConsumption: "ఈరోజు మొత్తం వినియోగం",
    overThreshold: "థ్రెషోల్డ్ మించి",
    viewDetails: "వివరణాత్మక నివేదికను చూడండి",
    liveRefresh: "లైవ్ రిఫ్రెష్: 30 సె",
    kwh: "kWh",
    stores: "దుకాణాలు"
  },
  bn: {
    title: "স্টোর এনার্জি ওভারভিউ",
    searchPlaceholder: "দোকান খুঁজুন...",
    allStores: "সব দোকান",
    alertOnly: "শুধুমাত্র সতর্কতা দোকান",
    normal: "স্বাভাবিক",
    warning: "সতর্কতা",
    critical: "সংকটজনক",
    totalConsumption: "আজ মোট ব্যবহার",
    overThreshold: "সীমার উপরে",
    viewDetails: "বিস্তারিত রিপোর্ট দেখুন",
    liveRefresh: "লাইভ রিফ্রেশ: ৩০ সে",
    kwh: "kWh",
    stores: "দোকান"
  }
};

// Mock data for demonstration
const mockStoreData = [
  {
    id: "store-001",
    name: "Walmart Supercenter",
    location: "Mumbai, Maharashtra",
    totalConsumption: 1247.5,
    threshold: 1200,
    status: "warning" as const,
    alertCount: 3,
    efficiency: 87
  },
  {
    id: "store-002", 
    name: "Walmart Neighborhood",
    location: "Bangalore, Karnataka",
    totalConsumption: 892.3,
    threshold: 950,
    status: "normal" as const,
    alertCount: 0,
    efficiency: 94
  },
  {
    id: "store-003",
    name: "Walmart Express",
    location: "Chennai, Tamil Nadu", 
    totalConsumption: 1456.8,
    threshold: 1300,
    status: "critical" as const,
    alertCount: 7,
    efficiency: 73
  },
  {
    id: "store-004",
    name: "Walmart Supercenter",
    location: "Hyderabad, Telangana",
    totalConsumption: 1089.2,
    threshold: 1150,
    status: "normal" as const,
    alertCount: 1,
    efficiency: 91
  }
];

export const StoreEnergyOverview: React.FC<StoreEnergyOverviewProps> = ({
  selectedLanguage,
  onStoreSelect
}) => {
  const t = translations[selectedLanguage];
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [refreshTimer, setRefreshTimer] = useState(30);

  // Live refresh timer
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTimer(prev => prev === 1 ? 30 : prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const filteredStores = mockStoreData.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || 
                         (filterType === "alerts" && store.status !== "normal");
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "text-green-600 bg-green-500/10 border-green-500/20";
      case "warning": return "text-orange-600 bg-orange-500/10 border-orange-500/20";
      case "critical": return "text-red-600 bg-red-500/10 border-red-500/20";
      default: return "text-muted-foreground bg-muted";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal": return <div className="w-2 h-2 rounded-full bg-green-500" />;
      case "warning": return <div className="w-2 h-2 rounded-full bg-orange-500" />;
      case "critical": return <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />;
      default: return <div className="w-2 h-2 rounded-full bg-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">{t.title}</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {t.liveRefresh.replace("30s", `${refreshTimer}s`)}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allStores}</SelectItem>
              <SelectItem value="alerts">{t.alertOnly}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredStores.map((store) => (
          <Card key={store.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer" 
                onClick={() => onStoreSelect(store.id)}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg truncate">{store.name}</CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{store.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  {getStatusIcon(store.status)}
                  {store.alertCount > 0 && (
                    <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                      {store.alertCount}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t.totalConsumption}</span>
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="font-semibold">{store.totalConsumption} {t.kwh}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t.overThreshold}</span>
                    <span className={store.totalConsumption > store.threshold ? "text-red-600 font-medium" : "text-green-600"}>
                      {Math.max(0, Math.round(((store.totalConsumption - store.threshold) / store.threshold) * 100))}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        store.totalConsumption > store.threshold 
                          ? "bg-red-500" 
                          : store.totalConsumption > store.threshold * 0.9 
                            ? "bg-orange-500" 
                            : "bg-green-500"
                      }`}
                      style={{ 
                        width: `${Math.min(100, (store.totalConsumption / store.threshold) * 100)}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t">
                <Badge className={getStatusColor(store.status)}>
                  {t[store.status as keyof typeof t]}
                </Badge>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  {t.viewDetails}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredStores.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No stores found matching your criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};