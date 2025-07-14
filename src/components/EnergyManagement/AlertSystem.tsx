import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Bell, AlertTriangle, Clock, CheckCircle, X, TrendingDown } from 'lucide-react';
import { Alert } from './EnergyManagementEngine';

type Language = "en" | "hi" | "ta" | "te" | "bn";

interface AlertSystemProps {
  alerts: Alert[];
  selectedLanguage: Language;
  onAcknowledge: (alertId: string) => void;
}

const translations = {
  en: {
    title: "Active Alerts",
    noAlerts: "No active alerts",
    allGood: "All systems operating normally",
    acknowledge: "Acknowledge",
    acknowledgeAll: "Acknowledge All",
    viewDetails: "View Details",
    suggestedAction: "Suggested Action",
    priority: "Priority",
    timestamp: "Time",
    dispatchMaintenance: "Dispatch Maintenance",
    reviewSettings: "Review Settings",
    checkEquipment: "Check Equipment",
    high: "High",
    medium: "Medium", 
    low: "Low",
    critical: "Critical",
    thresholdBreach: "Threshold Breach",
    efficiencyLow: "Low Efficiency",
    maintenanceNeeded: "Maintenance Needed",
    confirmAcknowledge: "Acknowledge Alert",
    confirmAcknowledgeDesc: "Are you sure you want to acknowledge this alert? This action cannot be undone.",
    cancel: "Cancel",
    confirm: "Confirm"
  },
  hi: {
    title: "सक्रिय अलर्ट",
    noAlerts: "कोई सक्रिय अलर्ट नहीं",
    allGood: "सभी सिस्टम सामान्य रूप से काम कर रहे हैं",
    acknowledge: "स्वीकार करें",
    acknowledgeAll: "सभी को स्वीकार करें",
    viewDetails: "विवरण देखें",
    suggestedAction: "सुझावित कार्य",
    priority: "प्राथमिकता",
    timestamp: "समय",
    dispatchMaintenance: "रखरखाव भेजें",
    reviewSettings: "सेटिंग्स की समीक्षा करें",
    checkEquipment: "उपकरण जांचें",
    high: "उच्च",
    medium: "मध्यम",
    low: "निम्न",
    critical: "गंभीर",
    thresholdBreach: "सीमा का उल्लंघन",
    efficiencyLow: "कम दक्षता",
    maintenanceNeeded: "रखरखाव की आवश्यकता",
    confirmAcknowledge: "अलर्ट स्वीकार करें",
    confirmAcknowledgeDesc: "क्या आप वाकई इस अलर्ट को स्वीकार करना चाहते हैं? यह कार्रवाई पूर्ववत नहीं की जा सकती।",
    cancel: "रद्द करें",
    confirm: "पुष्टि करें"
  },
  ta: {
    title: "செயலில் உள்ள எச்சரிக்கைகள்",
    noAlerts: "செயலில் உள்ள எச்சரிக்கைகள் இல்லை",
    allGood: "அனைத்து அமைப்புகளும் சாதாரணமாக இயங்குகின்றன",
    acknowledge: "ஒப்புக்கொள்",
    acknowledgeAll: "அனைத்தையும் ஒப்புக்கொள்",
    viewDetails: "விவரங்களைப் பார்க்கவும்",
    suggestedAction: "பரிந்துரைக்கப்பட்ட நடவடிக்கை",
    priority: "முன்னுரிமை",
    timestamp: "நேரம்",
    dispatchMaintenance: "பராமரிப்பு அனுப்பு",
    reviewSettings: "அமைப்புகளை மறுபரிசீலனை செய்",
    checkEquipment: "உபகரணங்களை சரிபார்",
    high: "உயர்",
    medium: "நடுத்தர",
    low: "குறைந்த",
    critical: "முக்கியமான",
    thresholdBreach: "வரம்பு மீறல்",
    efficiencyLow: "குறைந்த திறன்",
    maintenanceNeeded: "பராமரிப்பு தேவை",
    confirmAcknowledge: "எச்சரிக்கையை ஒப்புக்கொள்",
    confirmAcknowledgeDesc: "இந்த எச்சரிக்கையை ஒப்புக்கொள்ள விரும்புகிறீர்களா? இந்த செயல்பாட்டை செயல்தவிர்க்க முடியாது.",
    cancel: "ரத்து செய்",
    confirm: "உறுதிப்படுத்து"
  },
  te: {
    title: "క్రియాశీల హెచ్చరికలు",
    noAlerts: "క్రియాశీల హెచ్చరికలు లేవు",
    allGood: "అన్ని వ్యవస్థలు సాధారణంగా పని చేస్తున్నాయి",
    acknowledge: "అంగీకరించు",
    acknowledgeAll: "అన్నింటినీ అంగీకరించు",
    viewDetails: "వివరాలను చూడండి",
    suggestedAction: "సూచించిన చర్య",
    priority: "ప్రాధాన్యత",
    timestamp: "సమయం",
    dispatchMaintenance: "మెయింటెనెన్స్ పంపు",
    reviewSettings: "సెట్టింగ్‌లను సమీక్షించు",
    checkEquipment: "పరికరాలను తనిఖీ చేయి",
    high: "అధిక",
    medium: "మధ్యమ",
    low: "తక్కువ",
    critical: "క్లిష్టమైన",
    thresholdBreach: "థ్రెషోల్డ్ ఉల్లంఘన",
    efficiencyLow: "తక్కువ సామర్థ్యం",
    maintenanceNeeded: "మెయింటెనెన్స్ అవసరం",
    confirmAcknowledge: "హెచ్చరికను అంగీకరించు",
    confirmAcknowledgeDesc: "మీరు ఈ హెచ్చరికను అంగీకరించాలని అనుకుంటున్నారా? ఈ చర్యను రద్దు చేయలేరు.",
    cancel: "రద్దు చేయి",
    confirm: "నిర్ధారించు"
  },
  bn: {
    title: "সক্রিয় সতর্কতা",
    noAlerts: "কোন সক্রিয় সতর্কতা নেই",
    allGood: "সমস্ত সিস্টেম স্বাভাবিকভাবে কাজ করছে",
    acknowledge: "স্বীকার করুন",
    acknowledgeAll: "সব স্বীকার করুন",
    viewDetails: "বিস্তারিত দেখুন",
    suggestedAction: "প্রস্তাবিত পদক্ষেপ",
    priority: "অগ্রাধিকার",
    timestamp: "সময়",
    dispatchMaintenance: "রক্ষণাবেক্ষণ পাঠান",
    reviewSettings: "সেটিংস পর্যালোচনা করুন",
    checkEquipment: "যন্ত্রপাতি পরীক্ষা করুন",
    high: "উচ্চ",
    medium: "মাঝারি",
    low: "নিম্ন",
    critical: "সংকটজনক",
    thresholdBreach: "সীমা লঙ্ঘন",
    efficiencyLow: "কম দক্ষতা",
    maintenanceNeeded: "রক্ষণাবেক্ষণ প্রয়োজন",
    confirmAcknowledge: "সতর্কতা স্বীকার করুন",
    confirmAcknowledgeDesc: "আপনি কি এই সতর্কতা স্বীকার করতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।",
    cancel: "বাতিল",
    confirm: "নিশ্চিত করুন"
  }
};

// Mock alerts data
const mockAlerts: Alert[] = [
  {
    id: "alert-001",
    storeName: "Walmart Supercenter Mumbai",
    productName: "Industrial Chiller",
    block: "Cold Storage A",
    type: "threshold_breach",
    message: "Energy consumption exceeded threshold by 22%",
    suggestedAction: "Dispatch maintenance team to check door seals and compressor efficiency",
    priority: "critical",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    acknowledged: false
  },
  {
    id: "alert-002", 
    storeName: "Walmart Express Chennai",
    productName: "HVAC System",
    block: "Climate Control",
    type: "efficiency_low",
    message: "System efficiency dropped below 75%",
    suggestedAction: "Review thermostat settings and check air filters",
    priority: "high",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    acknowledged: false
  },
  {
    id: "alert-003",
    storeName: "Walmart Neighborhood Bangalore", 
    productName: "LED Lighting Panel",
    block: "Lighting Zone B",
    type: "maintenance_needed",
    message: "Multiple LED panels showing reduced brightness",
    suggestedAction: "Schedule LED panel replacement",
    priority: "medium",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    acknowledged: false
  }
];

export const AlertSystem: React.FC<AlertSystemProps> = ({
  selectedLanguage,
  onAcknowledge
}) => {
  const t = translations[selectedLanguage];
  const [alerts] = useState<Alert[]>(mockAlerts);
  const activeAlerts = alerts.filter(alert => !alert.acknowledged);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-500/10 text-red-600 border-red-500/20 animate-pulse";
      case "high": return "bg-orange-500/10 text-orange-600 border-orange-500/20";
      case "medium": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "low": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      default: return "bg-muted";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "threshold_breach": return <AlertTriangle className="w-4 h-4" />;
      case "efficiency_low": return <TrendingDown className="w-4 h-4" />;
      case "maintenance_needed": return <Clock className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffMins < 24 * 60) {
      return `${Math.floor(diffMins / 60)}h ago`;
    } else {
      return timestamp.toLocaleDateString();
    }
  };

  if (activeAlerts.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-600 mb-2">{t.noAlerts}</h3>
          <p className="text-muted-foreground">{t.allGood}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-orange-500" />
            <CardTitle>{t.title}</CardTitle>
            <Badge variant="outline" className="ml-2">
              {activeAlerts.length}
            </Badge>
          </div>
          
          {activeAlerts.length > 1 && (
            <Button variant="outline" size="sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              {t.acknowledgeAll}
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {activeAlerts.map((alert) => (
          <Card key={alert.id} className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(alert.type)}
                    <h4 className="font-semibold">{alert.storeName}</h4>
                    <Badge className={getPriorityColor(alert.priority)}>
                      {t[alert.priority as keyof typeof t]}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-muted-foreground">{alert.productName}</p>
                      <p className="text-xs text-muted-foreground">{alert.block}</p>
                    </div>
                    <div className="text-right md:text-left">
                      <p className="font-medium text-muted-foreground">{t.timestamp}</p>
                      <p className="text-xs text-muted-foreground">{formatTimestamp(alert.timestamp)}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm">{alert.message}</p>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-primary mb-1">{t.suggestedAction}:</p>
                      <p className="text-sm text-muted-foreground">{alert.suggestedAction}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {t.acknowledge}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{t.confirmAcknowledge}</AlertDialogTitle>
                        <AlertDialogDescription>
                          {t.confirmAcknowledgeDesc}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onAcknowledge(alert.id)}>
                          {t.confirm}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  
                  <Button variant="ghost" size="sm">
                    {t.viewDetails}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};