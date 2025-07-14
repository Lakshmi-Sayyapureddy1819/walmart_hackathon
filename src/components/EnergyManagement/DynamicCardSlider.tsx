
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, AlertTriangle, Activity, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Language = "en" | "hi" | "ta" | "te" | "bn";

interface EnergyData {
  id: string;
  location: string;
  storeName: string;
  sensorId: string;
  block: string;
  productName: string;
  threshold: number;
  currentConsumption: number;
  runTime: number;
  status: 'normal' | 'warning' | 'critical';
  timestamp: Date;
}

interface DynamicCardSliderProps {
  selectedLanguage: Language;
  energyData?: EnergyData[];
}

const translations = {
  en: {
    title: "Energy Monitoring Cards",
    location: "Location",
    storeName: "Store Name",
    sensorId: "Sensor ID",
    block: "Block",
    productName: "Product Name",
    threshold: "Threshold (kWh)",
    current: "Current (kWh)",
    runtime: "Runtime (hrs)",
    status: "Status",
    normal: "Normal",
    warning: "Warning",
    critical: "Critical",
    alertTitle: "Threshold Alert!",
    alertMessage: "exceeds threshold in",
    showing: "Showing",
    of: "of",
    cards: "cards"
  },
  hi: {
    title: "ऊर्जा निगरानी कार्ड",
    location: "स्थान",
    storeName: "स्टोर का नाम",
    sensorId: "सेंसर ID",
    block: "ब्लॉक",
    productName: "उत्पाद का नाम",
    threshold: "सीमा (kWh)",
    current: "वर्तमान (kWh)",
    runtime: "रनटाइम (घंटे)",
    status: "स्थिति",
    normal: "सामान्य",
    warning: "चेतावनी",
    critical: "गंभीर",
    alertTitle: "सीमा चेतावनी!",
    alertMessage: "में सीमा से अधिक",
    showing: "दिखा रहे हैं",
    of: "में से",
    cards: "कार्ड"
  },
  ta: {
    title: "ஆற்றல் கண்காணிப்பு அட்டைகள்",
    location: "இடம்",
    storeName: "கடையின் பெயர்",
    sensorId: "சென்சார் ID",
    block: "தொகுதி",
    productName: "தயாரிப்பு பெயர்",
    threshold: "வரம்பு (kWh)",
    current: "தற்போதைய (kWh)",
    runtime: "இயக்க நேரம் (மணிகள்)",
    status: "நிலை",
    normal: "சாதாரண",
    warning: "எச்சரிக்கை",
    critical: "முக்கியமான",
    alertTitle: "வரம்பு எச்சரிக்கை!",
    alertMessage: "வரம்புக்கு மேல்",
    showing: "காட்டுகிறது",
    of: "இல்",
    cards: "அட்டைகள்"
  },
  te: {
    title: "ఎనర్జీ మానిటరింగ్ కార్డులు",
    location: "స్థానం",
    storeName: "దుకాణం పేరు",
    sensorId: "సెన్సార్ ID",
    block: "బ్లాక్",
    productName: "ఉత్పత్తి పేరు",
    threshold: "థ్రెషోల్డ్ (kWh)",
    current: "ప్రస్తుత (kWh)",
    runtime: "రన్‌టైమ్ (గంటలు)",
    status: "స్థితి",
    normal: "సాధారణ",
    warning: "హెచ్చరిక",
    critical: "క్లిష్టమైన",
    alertTitle: "థ్రెషోల్డ్ అలర్ట్!",
    alertMessage: "థ్రెషోల్డ్ మించింది",
    showing: "చూపిస్తోంది",
    of: "లో",
    cards: "కార్డులు"
  },
  bn: {
    title: "এনার্জি মনিটরিং কার্ড",
    location: "অবস্থান",
    storeName: "দোকানের নাম",
    sensorId: "সেন্সর ID",
    block: "ব্লক",
    productName: "পণ্যের নাম",
    threshold: "সীমা (kWh)",
    current: "বর্তমান (kWh)",
    runtime: "রানটাইম (ঘন্টা)",
    status: "অবস্থা",
    normal: "স্বাভাবিক",
    warning: "সতর্কতা",
    critical: "সংকটজনক",
    alertTitle: "সীমা সতর্কতা!",
    alertMessage: "সীমা অতিক্রম করেছে",
    showing: "দেখাচ্ছে",
    of: "এর",
    cards: "কার্ড"
  }
};

// Mock data based on the Energy Monitoring Table structure
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
  },
  {
    id: "5",
    location: "Delhi, DL",
    storeName: "Walmart Neighborhood",
    sensorId: "HVAC-005",
    block: "Main Floor",
    productName: "Central AC Unit",
    threshold: 150.0,
    currentConsumption: 145.2,
    runTime: 20.0,
    status: "normal",
    timestamp: new Date()
  },
  {
    id: "6",
    location: "Pune, MH",
    storeName: "Walmart Express",
    sensorId: "LIGHT-006",
    block: "Retail Zone",
    productName: "Smart Lighting",
    threshold: 60.0,
    currentConsumption: 55.8,
    runTime: 14.5,
    status: "normal",
    timestamp: new Date()
  },
  {
    id: "7",
    location: "Kolkata, WB",
    storeName: "Walmart Supercenter",
    sensorId: "HVAC-007",
    block: "Cold Storage B",
    productName: "Industrial Freezer",
    threshold: 180.0,
    currentConsumption: 195.5, // Exceeds threshold - will trigger alert
    runTime: 22.3,
    status: "critical",
    timestamp: new Date()
  },
  {
    id: "8",
    location: "Ahmedabad, GJ",
    storeName: "Walmart Neighborhood",
    sensorId: "COMP-008",
    block: "Equipment Room",
    productName: "Air Compressor",
    threshold: 85.0,
    currentConsumption: 78.2,
    runTime: 16.8,
    status: "normal",
    timestamp: new Date()
  },
  {
    id: "9",
    location: "Jaipur, RJ",
    storeName: "Walmart Express",
    sensorId: "HVAC-009",
    block: "Storage Area",
    productName: "Ventilation System",
    threshold: 70.0,
    currentConsumption: 68.5,
    runTime: 18.2,
    status: "normal",
    timestamp: new Date()
  },
  {
    id: "10",
    location: "Lucknow, UP",
    storeName: "Walmart Supercenter",
    sensorId: "REFR-010",
    block: "Dairy Section",
    productName: "Refrigeration Unit",
    threshold: 120.0,
    currentConsumption: 115.3,
    runTime: 21.7,
    status: "normal",
    timestamp: new Date()
  },
  {
    id: "11",
    location: "Surat, GJ",
    storeName: "Walmart Neighborhood",
    sensorId: "LIGHT-011",
    block: "Parking Lot",
    productName: "Outdoor LED",
    threshold: 35.0,
    currentConsumption: 32.1,
    runTime: 10.5,
    status: "normal",
    timestamp: new Date()
  },
  {
    id: "12",
    location: "Indore, MP",
    storeName: "Walmart Express",
    sensorId: "HVAC-012",
    block: "Electronics Section",
    productName: "Climate Control",
    threshold: 90.0,
    currentConsumption: 98.7, // Exceeds threshold - will trigger alert
    runTime: 19.4,
    status: "warning",
    timestamp: new Date()
  }
];

export const DynamicCardSlider: React.FC<DynamicCardSliderProps> = ({
  selectedLanguage,
  energyData = mockEnergyData
}) => {
  const t = translations[selectedLanguage];
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [alertTriggered, setAlertTriggered] = useState<Set<number>>(new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const cardsPerView = 4;
  const totalCards = energyData.length;
  const maxIndex = Math.max(0, totalCards - cardsPerView);

  // Auto-advance cards every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  // Check for threshold alerts on cards 7 and 12 (indices 6 and 11)
  useEffect(() => {
    const alertPositions = [6, 11]; // 7th and 12th cards (0-indexed)
    
    alertPositions.forEach(position => {
      if (position < energyData.length && !alertTriggered.has(position)) {
        const card = energyData[position];
        if (card.currentConsumption > card.threshold) {
          triggerAlert(card, position + 1);
          setAlertTriggered(prev => new Set(prev).add(position));
        }
      }
    });
  }, [energyData, alertTriggered]);

  const triggerAlert = (card: EnergyData, cardNumber: number) => {
    // Play buzzing sound
    if (!audioRef.current) {
      audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSMFl2+z9eGVQQsYVqnh9q1fGAg+ltryxnklBSuBzvLZiTYIG2m98OWdTgwOUarm7bdkGAU7k9n10HQiBQwkN');
      audioRef.current.volume = 0.3;
    }
    audioRef.current?.play().catch(() => {
      // Fallback if audio play fails
      console.log('Audio play failed - user interaction may be required');
    });

    // Show toast alert
    toast({
      title: t.alertTitle,
      description: `${card.productName} ${t.alertMessage} ${card.storeName} (${card.block}) - ${card.currentConsumption.toFixed(1)}kWh > ${card.threshold.toFixed(1)}kWh`,
      variant: "destructive",
    });
  };

  const nextCards = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevCards = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
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
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning': return <Zap className="w-4 h-4 text-orange-500" />;
      default: return <Activity className="w-4 h-4 text-green-500" />;
    }
  };

  const visibleCards = energyData.slice(currentIndex, currentIndex + cardsPerView);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            {t.title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {t.showing} {currentIndex + 1}-{Math.min(currentIndex + cardsPerView, totalCards)} {t.of} {totalCards} {t.cards}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={prevCards}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextCards}
              disabled={currentIndex >= maxIndex}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-500 ease-in-out"
        >
          {visibleCards.map((card, index) => {
            const actualIndex = currentIndex + index;
            const isAlertCard = actualIndex === 6 || actualIndex === 11; // 7th and 12th cards
            const isThresholdExceeded = card.currentConsumption > card.threshold;
            const shouldAlert = isAlertCard && isThresholdExceeded;

            return (
              <Card
                key={card.id}
                className={`transition-all duration-300 transform hover:scale-105 ${
                  shouldAlert 
                    ? 'bg-red-500/10 border-red-500 animate-pulse shadow-lg shadow-red-500/20' 
                    : 'hover:shadow-md'
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium flex items-center gap-1">
                      {getStatusIcon(card.status)}
                      {card.productName}
                    </CardTitle>
                    {shouldAlert && (
                      <AlertTriangle className="w-5 h-5 text-red-500 animate-bounce" />
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-muted-foreground">{t.location}</p>
                      <p className="font-medium">{card.location}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t.storeName}</p>
                      <p className="font-medium">{card.storeName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t.sensorId}</p>
                      <p className="font-mono">{card.sensorId}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t.block}</p>
                      <p className="font-medium">{card.block}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-xs pt-2 border-t">
                    <div>
                      <p className="text-muted-foreground">{t.threshold}</p>
                      <p className="font-mono">{card.threshold.toFixed(1)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t.current}</p>
                      <p className={`font-mono font-semibold ${
                        card.currentConsumption > card.threshold ? 'text-red-600' : ''
                      }`}>
                        {card.currentConsumption.toFixed(1)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t.runtime}</p>
                      <p className="font-mono">{card.runTime.toFixed(1)}</p>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    {getStatusBadge(card.status, card.currentConsumption, card.threshold)}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center mt-4 space-x-1">
          {Array.from({ length: Math.ceil(totalCards / cardsPerView) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * cardsPerView)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                Math.floor(currentIndex / cardsPerView) === index
                  ? 'bg-primary w-4'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DynamicCardSlider;
