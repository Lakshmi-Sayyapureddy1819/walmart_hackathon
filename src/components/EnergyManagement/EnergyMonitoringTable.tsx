
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Download, RefreshCw, ArrowUpDown } from 'lucide-react';
import { EnergyData } from './EnergyManagementEngine';
import { DynamicCardSlider } from './DynamicCardSlider';
import { AutoScrollTable } from './AutoScrollTable';

type Language = "en" | "hi" | "ta" | "te" | "bn";
type SortField = 'storeName' | 'currentConsumption' | 'runTime' | 'threshold';
type SortDirection = 'asc' | 'desc';

interface EnergyMonitoringTableProps {
  selectedLanguage: Language;
  energyData: EnergyData[];
  selectedStore: string | null;
}

const translations = {
  en: {
    title: "Energy Monitoring Table",
    searchPlaceholder: "Search by store, product, or sensor...",
    allStores: "All Stores",
    allBlocks: "All Blocks", 
    allProducts: "All Products",
    location: "Location",
    storeName: "Store Name",
    sensorId: "Sensor ID",
    block: "Block",
    productName: "Product Name",
    threshold: "Threshold (kWh)",
    current: "Current (kWh)",
    runtime: "Runtime (hrs)",
    status: "Status",
    actions: "Actions",
    normal: "Normal",
    warning: "Warning", 
    critical: "Critical",
    export: "Export",
    refresh: "Refresh",
    filters: "Filters",
    overThreshold: "Over Threshold",
    liveUpdate: "Live updating every 30s"
  },
  hi: {
    title: "ऊर्जा निगरानी तालिका",
    searchPlaceholder: "स्टोर, उत्पाद या सेंसर के द्वारा खोजें...",
    allStores: "सभी स्टोर",
    allBlocks: "सभी ब्लॉक",
    allProducts: "सभी उत्पाद",
    location: "स्थान",
    storeName: "स्टोर का नाम",
    sensorId: "सेंसर ID",
    block: "ब्लॉक",
    productName: "उत्पाद का नाम",
    threshold: "सीमा (kWh)",
    current: "वर्तमान (kWh)",
    runtime: "रनटाइम (घंटे)",
    status: "स्थिति",
    actions: "कार्य",
    normal: "सामान्य",
    warning: "चेतावनी",
    critical: "गंभीर",
    export: "निर्यात",
    refresh: "रिफ्रेश",
    filters: "फिल्टर",
    overThreshold: "सीमा से अधिक",
    liveUpdate: "हर 30 सेकंड में लाइव अपडेट"
  },
  ta: {
    title: "ஆற்றல் கண்காணிப்பு அட்டவணை",
    searchPlaceholder: "கடை, தயாரிப்பு அல்லது சென்சார் மூலம் தேடு...",
    allStores: "அனைத்து கடைகள்",
    allBlocks: "அனைத்து தொகுதிகள்",
    allProducts: "அனைத்து தயாரிப்புகள்",
    location: "இடம்",
    storeName: "கடையின் பெயர்",
    sensorId: "சென்சார் ID",
    block: "தொகுதி",
    productName: "தயாரிப்பு பெயர்",
    threshold: "வரம்பு (kWh)",
    current: "தற்போதைய (kWh)",
    runtime: "இயக்க நேரம் (மணிகள்)",
    status: "நிலை",
    actions: "செயல்கள்",
    normal: "சாதாரண",
    warning: "எச்சரிக்கை",
    critical: "முக்கியமான",
    export: "ஏற்றுமதி",
    refresh: "புதுப்பிப்பு",
    filters: "வடிகட்டிகள்",
    overThreshold: "வரம்புக்கு மேல்",
    liveUpdate: "ஒவ்வொரு 30 வினாடிகளுக்கும் நேரடி புதுப்பிப்பு"
  },
  te: {
    title: "ఎనర్జీ మానిటరింగ్ టేబుల్",
    searchPlaceholder: "స్టోర్, ఉత్పత్తి లేదా సెన్సార్ ద్వారా వెతకండి...",
    allStores: "అన్ని దుకాణాలు",
    allBlocks: "అన్ని బ్లాక్‌లు",
    allProducts: "అన్ని ఉత్పత్తులు", 
    location: "స్థానం",
    storeName: "దుకాణం పేరు",
    sensorId: "సెన్సార్ ID",
    block: "బ్లాక్",
    productName: "ఉత్పత్తి పేరు",
    threshold: "థ్రెషోల్డ్ (kWh)",
    current: "ప్రస్తుత (kWh)",
    runtime: "రన్‌టైమ్ (గంటలు)",
    status: "స్థితి",
    actions: "చర్యలు",
    normal: "సాధారణ",
    warning: "హెచ్చరిక",
    critical: "క్లిష్టమైన",
    export: "ఎగుమతి",
    refresh: "రిఫ్రెష్",
    filters: "ఫిల్టర్‌లు",
    overThreshold: "థ్రెషోల్డ్ మించి",
    liveUpdate: "ప్రతి 30 సెకన్లకు లైవ్ అప్‌డేట్"
  },
  bn: {
    title: "এনার্জি মনিটরিং টেবিল",
    searchPlaceholder: "দোকান, পণ্য বা সেন্সর দিয়ে খুঁজুন...",
    allStores: "সব দোকান",
    allBlocks: "সব ব্লক",
    allProducts: "সব পণ্য",
    location: "অবস্থান",
    storeName: "দোকানের নাম",
    sensorId: "সেন্সর ID",
    block: "ব্লক",
    productName: "পণ্যের নাম",
    threshold: "সীমা (kWh)",
    current: "বর্তমান (kWh)",
    runtime: "রানটাইম (ঘন্টা)",
    status: "অবস্থা",
    actions: "ক্রিয়াকলাপ",
    normal: "স্বাভাবিক",
    warning: "সতর্কতা",
    critical: "সংকটজনক",
    export: "রপ্তানি",
    refresh: "রিফ্রেশ",
    filters: "ফিল্টার",
    overThreshold: "সীমার উপরে",
    liveUpdate: "প্রতি ৩০ সেকেন্ডে লাইভ আপডেট"
  }
};

// Mock data for the table
const mockEnergyData: EnergyData[] = [
  {
    id: "1",
    location: "Mumbai, MH",
    storeName: "Walmart Supercenter",
    sensorId: "HVAC-001",
    block: "Cold Storage A",
    productName: "Industrial Chiller",
    threshold: 125.5,
    currentConsumption: 142.3,
    runTime: 18.5,
    status: "critical",
    timestamp: new Date()
  },
  {
    id: "2", 
    location: "Bangalore, KA",
    storeName: "Walmart Neighborhood",
    sensorId: "LIGHT-002",
    block: "Lighting Zone B",
    productName: "LED Panel Array",
    threshold: 45.0,
    currentConsumption: 38.7,
    runTime: 12.0,
    status: "normal",
    timestamp: new Date()
  },
  {
    id: "3",
    location: "Chennai, TN", 
    storeName: "Walmart Express",
    sensorId: "HVAC-003",
    block: "HVAC Central",
    productName: "Climate Control Unit",
    threshold: 95.0,
    currentConsumption: 101.2,
    runTime: 16.3,
    status: "warning",
    timestamp: new Date()
  },
  {
    id: "4",
    location: "Hyderabad, TS",
    storeName: "Walmart Supercenter",
    sensorId: "REFR-004",
    block: "Frozen Foods",
    productName: "Freezer Bank",
    threshold: 200.0,
    currentConsumption: 189.5,
    runTime: 24.0,
    status: "normal",
    timestamp: new Date()
  }
];

export const EnergyMonitoringTable: React.FC<EnergyMonitoringTableProps> = ({
  selectedLanguage,
  selectedStore
}) => {
  const t = translations[selectedLanguage];
  const [searchTerm, setSearchTerm] = useState("");
  const [storeFilter, setStoreFilter] = useState("all");
  const [blockFilter, setBlockFilter] = useState("all");
  const [productFilter, setProductFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>('currentConsumption');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [refreshTimer, setRefreshTimer] = useState(30);

  // Live refresh timer
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTimer(prev => prev === 1 ? 30 : prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredData = mockEnergyData.filter(item => {
    const matchesSearch = 
      item.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sensorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.block.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStore = storeFilter === "all" || item.storeName.includes(storeFilter);
    const matchesBlock = blockFilter === "all" || item.block === blockFilter;
    const matchesProduct = productFilter === "all" || item.productName === productFilter;
    
    return matchesSearch && matchesStore && matchesBlock && matchesProduct;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = (bValue as string).toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getStatusBadge = (status: string, consumption: number, threshold: number) => {
    const isOverThreshold = consumption > threshold;
    let variant: "default" | "secondary" | "destructive" | "outline" = "default";
    let className = "";
    
    if (status === "critical" || isOverThreshold) {
      variant = "destructive";
      className = "animate-pulse";
    } else if (status === "warning") {
      className = "bg-orange-500/10 text-orange-600 border-orange-500/20";
    } else {
      className = "bg-green-500/10 text-green-600 border-green-500/20";
    }
    
    return (
      <Badge variant={variant} className={className}>
        {t[status as keyof typeof t]}
        {isOverThreshold && ` (${t.overThreshold})`}
      </Badge>
    );
  };

  return (
    <div className="space-y-8">
      {/* Dynamic Card Slider - Enhanced with actual data */}
      <DynamicCardSlider 
        selectedLanguage={selectedLanguage} 
        energyData={sortedData}
      />
      
      {/* Auto-Scroll Table */}
      <AutoScrollTable selectedLanguage={selectedLanguage} />
      
      {/* Original Energy Monitoring Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl">{t.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {t.liveUpdate.replace("30s", `${refreshTimer}s`)}
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                {t.export}
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                {t.refresh}
              </Button>
            </div>
          </div>
          
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={storeFilter} onValueChange={setStoreFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t.allStores} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.allStores}</SelectItem>
                <SelectItem value="Supercenter">Supercenter</SelectItem>
                <SelectItem value="Neighborhood">Neighborhood</SelectItem>
                <SelectItem value="Express">Express</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={blockFilter} onValueChange={setBlockFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t.allBlocks} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.allBlocks}</SelectItem>
                <SelectItem value="Cold Storage A">Cold Storage A</SelectItem>
                <SelectItem value="Lighting Zone B">Lighting Zone B</SelectItem>
                <SelectItem value="HVAC Central">HVAC Central</SelectItem>
                <SelectItem value="Frozen Foods">Frozen Foods</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={productFilter} onValueChange={setProductFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t.allProducts} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.allProducts}</SelectItem>
                <SelectItem value="Industrial Chiller">Industrial Chiller</SelectItem>
                <SelectItem value="LED Panel Array">LED Panel Array</SelectItem>
                <SelectItem value="Climate Control Unit">Climate Control Unit</SelectItem>
                <SelectItem value="Freezer Bank">Freezer Bank</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.location}</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('storeName')}>
                    <div className="flex items-center gap-1">
                      {t.storeName}
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead>{t.sensorId}</TableHead>
                  <TableHead>{t.block}</TableHead>
                  <TableHead>{t.productName}</TableHead>
                  <TableHead className="text-right cursor-pointer" onClick={() => handleSort('threshold')}>
                    <div className="flex items-center gap-1 justify-end">
                      {t.threshold}
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right cursor-pointer" onClick={() => handleSort('currentConsumption')}>
                    <div className="flex items-center gap-1 justify-end">
                      {t.current}
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right cursor-pointer" onClick={() => handleSort('runTime')}>
                    <div className="flex items-center gap-1 justify-end">
                      {t.runtime}
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead>{t.status}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((item) => (
                  <TableRow 
                    key={item.id} 
                    className={`${item.currentConsumption > item.threshold ? 'bg-red-500/5 border-red-500/20' : 'hover:bg-muted/50'}`}
                  >
                    <TableCell className="font-medium">{item.location}</TableCell>
                    <TableCell>{item.storeName}</TableCell>
                    <TableCell className="font-mono text-sm">{item.sensorId}</TableCell>
                    <TableCell>{item.block}</TableCell>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell className="text-right font-mono">{item.threshold.toFixed(1)}</TableCell>
                    <TableCell className="text-right font-mono font-semibold">
                      <span className={item.currentConsumption > item.threshold ? 'text-red-600' : 'text-foreground'}>
                        {item.currentConsumption.toFixed(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-mono">{item.runTime.toFixed(1)}</TableCell>
                    <TableCell>
                      {getStatusBadge(item.status, item.currentConsumption, item.threshold)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {sortedData.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Filter className="w-12 h-12 mx-auto mb-4" />
              <p>No data matches your current filters</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
