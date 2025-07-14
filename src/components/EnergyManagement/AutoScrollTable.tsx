
import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Activity, Zap, AlertTriangle } from 'lucide-react';

type Language = "en" | "hi" | "ta" | "te" | "bn";

interface AutoScrollTableProps {
  selectedLanguage: Language;
}

interface EnergyUpdate {
  id: number;
  timestamp: Date;
  storeName: string;
  deviceName: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  message: string;
}

const translations = {
  en: {
    title: "Real-Time Energy Updates",
    timestamp: "Time",
    store: "Store",
    device: "Device",
    value: "Value",
    status: "Status",
    message: "Message",
    normal: "Normal",
    warning: "Warning",
    critical: "Critical",
    noUpdates: "No updates yet..."
  },
  hi: {
    title: "रियल-टाइम एनर्जी अपडेट",
    timestamp: "समय",
    store: "स्टोर",
    device: "उपकरण",
    value: "मान",
    status: "स्थिति",
    message: "संदेश",
    normal: "सामान्य",
    warning: "चेतावनी",
    critical: "गंभीर",
    noUpdates: "अभी तक कोई अपडेट नहीं..."
  },
  ta: {
    title: "உண்மை நேர ஆற்றல் புதுப்பிப்புகள்",
    timestamp: "நேரம்",
    store: "கடை",
    device: "சாதனம்",
    value: "மதிப்பு",
    status: "நிலை",
    message: "செய்தி",
    normal: "சாதாரண",
    warning: "எச்சரிக்கை",
    critical: "முக்கியமான",
    noUpdates: "இன்னும் புதுப்பிப்புகள் இல்லை..."
  },
  te: {
    title: "రియల్ టైమ్ ఎనర్జీ అప్‌డేట్‌లు",
    timestamp: "సమయం",
    store: "స్టోర్",
    device: "పరికరం",
    value: "విలువ",
    status: "స్థితి",
    message: "సందేశం",
    normal: "సాధారణ",
    warning: "హెచ్చరిక",
    critical: "క్లిష్టమైన",
    noUpdates: "ఇంకా అప్‌డేట్‌లు లేవు..."
  },
  bn: {
    title: "রিয়েল টাইম এনার্জি আপডেট",
    timestamp: "সময়",
    store: "দোকান",
    device: "যন্ত্র",
    value: "মান",
    status: "অবস্থা",
    message: "বার্তা",
    normal: "স্বাভাবিক",
    warning: "সতর্কতা",
    critical: "সংকটজনক",
    noUpdates: "এখনও কোন আপডেট নেই..."
  }
};

const deviceNames = [
  "HVAC Unit A1", "LED Panel B2", "Freezer Bank C3", "Chiller D4", 
  "Lighting Zone E5", "Compressor F6", "Air Handler G7", "Refrigerator H8"
];

const storeNames = [
  "Walmart Supercenter Mumbai", "Walmart Express Chennai", 
  "Walmart Neighborhood Bangalore", "Walmart Supercenter Hyderabad"
];

const generateMessages = (status: string, value: number, threshold: number) => {
  const messages = {
    normal: [
      "Operating within normal parameters",
      "Energy consumption stable",
      "Performance optimal",
      "All systems functioning normally"
    ],
    warning: [
      `Consumption ${((value/threshold) * 100).toFixed(0)}% of threshold`,
      "Monitor energy usage closely",
      "Consider efficiency optimization",
      "Performance slightly elevated"
    ],
    critical: [
      `ALERT: Threshold exceeded by ${((value - threshold)/threshold * 100).toFixed(0)}%`,
      "Immediate attention required",
      "Check system for issues",
      "Emergency maintenance needed"
    ]
  };
  return messages[status as keyof typeof messages][Math.floor(Math.random() * 4)];
};

export const AutoScrollTable: React.FC<AutoScrollTableProps> = ({ selectedLanguage }) => {
  const t = translations[selectedLanguage];
  const [data, setData] = useState<EnergyUpdate[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastRowRef = useRef<HTMLTableRowElement | null>(null);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        if (prev.length >= 20) {
          return prev; // Stop at 20 entries
        }

        const threshold = 100 + Math.random() * 50;
        const value = 50 + Math.random() * 100;
        const status = value > threshold * 1.1 ? 'critical' : 
                      value > threshold * 0.9 ? 'warning' : 'normal';

        const newUpdate: EnergyUpdate = {
          id: prev.length + 1,
          timestamp: new Date(),
          storeName: storeNames[Math.floor(Math.random() * storeNames.length)],
          deviceName: deviceNames[Math.floor(Math.random() * deviceNames.length)],
          value: Math.round(value * 10) / 10,
          unit: "kWh",
          status,
          message: generateMessages(status, value, threshold)
        };

        return [...prev, newUpdate];
      });
    }, 2000); // Add new entry every 2 seconds

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to the latest entry when data updates
  useEffect(() => {
    if (lastRowRef.current) {
      lastRowRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [data]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning': return <Zap className="w-4 h-4 text-orange-500" />;
      default: return <Activity className="w-4 h-4 text-green-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      normal: "bg-green-500/10 text-green-600 border-green-500/20",
      warning: "bg-orange-500/10 text-orange-600 border-orange-500/20",
      critical: "bg-red-500/10 text-red-600 border-red-500/20 animate-pulse"
    };

    return (
      <Badge className={colors[status as keyof typeof colors]}>
        {getStatusIcon(status)}
        <span className="ml-1">{t[status as keyof typeof t]}</span>
      </Badge>
    );
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          {t.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div
          ref={containerRef}
          className="h-96 overflow-y-auto border rounded-lg"
        >
          {data.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>{t.noUpdates}</p>
            </div>
          ) : (
            <Table>
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                  <TableHead className="w-20">{t.timestamp}</TableHead>
                  <TableHead>{t.store}</TableHead>
                  <TableHead>{t.device}</TableHead>
                  <TableHead className="text-right">{t.value}</TableHead>
                  <TableHead>{t.status}</TableHead>
                  <TableHead>{t.message}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, idx) => (
                  <TableRow
                    key={item.id}
                    ref={idx === data.length - 1 ? lastRowRef : null}
                    className={`${
                      item.status === 'critical' ? 'bg-red-500/5 border-red-500/20' :
                      item.status === 'warning' ? 'bg-orange-500/5 border-orange-500/20' :
                      'hover:bg-muted/50'
                    } transition-colors duration-200`}
                  >
                    <TableCell className="font-mono text-xs">
                      {formatTime(item.timestamp)}
                    </TableCell>
                    <TableCell className="font-medium text-sm">{item.storeName}</TableCell>
                    <TableCell className="text-sm">{item.deviceName}</TableCell>
                    <TableCell className="text-right font-mono">
                      <span className={
                        item.status === 'critical' ? 'text-red-600 font-semibold' :
                        item.status === 'warning' ? 'text-orange-600 font-medium' :
                        'text-foreground'
                      }>
                        {item.value} {item.unit}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs">
                      {item.message}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
        
        {data.length > 0 && (
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Showing {data.length} of 20 maximum entries
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AutoScrollTable;
