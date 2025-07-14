
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { FarmTask } from './SmartFarmAI';
import { Camera, Upload, FileText, Loader, Zap, MapPin, Calendar, Thermometer, Package, AlertTriangle } from 'lucide-react';

interface DataInputProps {
  task: FarmTask;
  onAnalyze: (data: any) => void;
  isAnalyzing: boolean;
  language: 'en' | 'hi' | 'ta' | 'te' | 'bn';
}

export const DataInput: React.FC<DataInputProps> = ({ 
  task, 
  onAnalyze, 
  isAnalyzing, 
  language 
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [textData, setTextData] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Advanced input states for different tasks
  const [farmLocation, setFarmLocation] = useState('');
  const [storeLocation, setStoreLocation] = useState('');
  const [produceType, setProduceType] = useState('');
  const [harvestDate, setHarvestDate] = useState('');
  const [estimatedArrival, setEstimatedArrival] = useState('');
  const [shelfLifeDays, setShelfLifeDays] = useState('');
  const [storageTemp, setStorageTemp] = useState('');
  const [transportType, setTransportType] = useState('');

  const translations = {
    en: {
      uploadImage: 'Upload Image',
      takePhoto: 'Take Photo',
      enterDetails: 'Enter Details',
      basicInfo: 'Basic Information',
      advancedSettings: 'Advanced Settings',
      farmLocation: 'Farm Location',
      storeLocation: 'Store/Destination Location',
      produceType: 'Produce Type',
      harvestDate: 'Harvest Date',
      estimatedArrival: 'Estimated Arrival Date',
      shelfLifeDays: 'Shelf Life (Days)',
      storageTemp: 'Storage Temperature (°C)',
      transportType: 'Transport Type',
      cropType: 'Crop type (e.g., tomatoes, wheat)',
      location: 'Location',
      plantingDate: 'Planting date',
      analyze: 'Analyze My Data',
      analyzing: 'Analyzing...',
      imageSelected: 'Image selected',
      fillRequired: 'Please fill in required fields',
      problemSolved: 'Problem Solved',
      freshnessDesc: 'Ensures products arrive with optimal quality, reducing spoilage',
      routeDesc: 'Optimizes delivery by identifying problematic routes',
      weatherDesc: 'Provides environmental context for planning operations',
      refrigerated: 'Refrigerated',
      standard: 'Standard',
      express: 'Express'
    },
    hi: {
      uploadImage: 'छवि अपलोड करें',
      takePhoto: 'फोटो लें',
      enterDetails: 'विवरण दर्ज करें',
      basicInfo: 'बुनियादी जानकारी',
      advancedSettings: 'उन्नत सेटिंग्स',
      farmLocation: 'खेत का स्थान',
      storeLocation: 'स्टोर/गंतव्य स्थान',
      produceType: 'उत्पाद प्रकार',
      harvestDate: 'फसल की तारीख',
      estimatedArrival: 'अनुमानित पहुंचने की तारीख',
      shelfLifeDays: 'शेल्फ लाइफ (दिन)',
      storageTemp: 'भंडारण तापमान (°C)',
      transportType: 'परिवहन प्रकार',
      cropType: 'फसल का प्रकार (जैसे: टमाटर, गेहूं)',
      location: 'स्थान',
      plantingDate: 'बुआई की तारीख',
      analyze: 'मेरे डेटा का विश्लेषण करें',
      analyzing: 'विश्लेषण हो रहा है...',
      imageSelected: 'छवि चुनी गई',
      fillRequired: 'कृपया आवश्यक फ़ील्ड भरें',
      problemSolved: 'समस्या हल',
      freshnessDesc: 'उत्पादों को इष्टतम गुणवत्ता के साथ पहुंचना सुनिश्चित करता है',
      routeDesc: 'समस्याग्रस्त मार्गों की पहचान करके डिलीवरी को अनुकूलित करता है',
      weatherDesc: 'योजना संचालन के लिए पर्यावरणीय संदर्भ प्रदान करता है',
      refrigerated: 'रेफ्रिजरेटेड',
      standard: 'मानक',
      express: 'एक्सप्रेस'
    },
    ta: {
      uploadImage: 'படத்தை பதிவேற்று',
      takePhoto: 'புகைப்படம் எடு',
      enterDetails: 'விவரங்களை உள்ளிடு',
      basicInfo: 'அடிப்படை தகவல்',
      advancedSettings: 'மேம்பட்ட அமைப்புகள்',
      farmLocation: 'பண்ணை இடம்',
      storeLocation: 'கடை/இலக்கு இடம்',
      produceType: 'உற்பத்தி வகை',
      harvestDate: 'அறுவடை தேதி',
      estimatedArrival: 'மதிப்பிடப்பட்ட வருகை தேதி',
      shelfLifeDays: 'அடுக்கு வாழ்க்கை (நாட்கள்)',
      storageTemp: 'சேமிப்பு வெப்பநிலை (°C)',
      transportType: 'போக்குவரத்து வகை',
      cropType: 'பயிர் வகை (எ.கா: தக்காளி, கோதுமை)',
      location: 'இடம்',
      plantingDate: 'விதைப்பு தேதி',
      analyze: 'என் தரவை பகுப்பாய்வு செய்',
      analyzing: 'பகுப்பாய்வு செய்கிறது...',
      imageSelected: 'படம் தேர்ந்தெடுக்கப்பட்டது',
      fillRequired: 'தேவையான புலங்களை நிரப்பவும்',
      problemSolved: 'பிரச்சனை தீர்க்கப்பட்டது',
      freshnessDesc: 'உற்பத்திகள் உகந்த தரத்துடன் வருவதை உறுதி செய்கிறது',
      routeDesc: 'சிக்கலான பாதைகளை அடையாளம் கண்டு விநியோகத்தை உகப்பாக்குகிறது',
      weatherDesc: 'திட்டமிடல் செயல்பாடுகளுக்கு சுற்றுச்சூழல் சூழலை வழங்குகிறது',
      refrigerated: 'குளிரூட்டப்பட்ட',
      standard: 'நிலையான',
      express: 'விரைவு'
    },
    te: {
      uploadImage: 'చిత్రాన్ని అప్‌లోడ్ చేయండి',
      takePhoto: 'ఫోటో తీయండి',
      enterDetails: 'వివరాలను నమోదు చేయండి',
      basicInfo: 'ప్రాథమిక సమాచారం',
      advancedSettings: 'అధునాతన సెట్టింగ్‌లు',
      farmLocation: 'వ్యవసాయ స్థానం',
      storeLocation: 'దుకాణం/గమ్యస్థానం',
      produceType: 'ఉత్పత్తి రకం',
      harvestDate: 'పంట తేదీ',
      estimatedArrival: 'అంచనా రాక తేదీ',
      shelfLifeDays: 'షెల్ఫ్ లైఫ్ (రోజులు)',
      storageTemp: 'నిల్వ ఉష్ణోగ్రత (°C)',
      transportType: 'రవాణా రకం',
      cropType: 'పంట రకం (ఉదా: టమాటోలు, గోధుమలు)',
      location: 'స్థానం',
      plantingDate: 'విత్తన తేదీ',
      analyze: 'నా డేటాను విశ్లేషించండి',
      analyzing: 'విశ్లేషిస్తోంది...',
      imageSelected: 'చిత్రం ఎంపిక చేయబడింది',
      fillRequired: 'దయచేసి అవసరమైన ఫీల్డ్‌లను పూరించండి',
      problemSolved: 'సమస్య పరిష్కరించబడింది',
      freshnessDesc: 'ఉత్పత్తులు సరైన నాణ్యతతో రావడాన్ని నిర్ధారిస్తుంది',
      routeDesc: 'సమస్యాత్మక మార్గాలను గుర్తించి డెలివరీని అనుకూలీకరిస్తుంది',
      weatherDesc: 'ప్రణాళిక కార్యకలాపాల కోసం పర్యావరణ సందర్భాన్ని అందిస్తుంది',
      refrigerated: 'రిఫ్రిజిరేటెడ్',
      standard: 'ప్రామాణిక',
      express: 'ఎక్స్‌ప్రెస్'
    },
    bn: {
      uploadImage: 'ছবি আপলোড করুন',
      takePhoto: 'ছবি তুলুন',
      enterDetails: 'বিস্তারিত লিখুন',
      basicInfo: 'মৌলিক তথ্য',
      advancedSettings: 'উন্নত সেটিংস',
      farmLocation: 'খামারের অবস্থান',
      storeLocation: 'দোকান/গন্তব্য অবস্থান',
      produceType: 'পণ্যের ধরন',
      harvestDate: 'ফসল কাটার তারিখ',
      estimatedArrival: 'আনুমানিক আগমনের তারিখ',
      shelfLifeDays: 'শেল্ফ লাইফ (দিন)',
      storageTemp: 'সংরক্ষণ তাপমাত্রা (°C)',
      transportType: 'পরিবহনের ধরন',
      cropType: 'ফসলের ধরন (যেমন: টমেটো, গম)',
      location: 'অবস্থান',
      plantingDate: 'রোপণের তারিখ',
      analyze: 'আমার ডেটা বিশ্লেষণ করুন',
      analyzing: 'বিশ্লেষণ করা হচ্ছে...',
      imageSelected: 'ছবি নির্বাচিত',
      fillRequired: 'দয়া করে প্রয়োজনীয় ক্ষেত্রগুলি পূরণ করুন',
      problemSolved: 'সমস্যা সমাধান',
      freshnessDesc: 'পণ্যগুলি সর্বোত্তম গুণমানের সাথে পৌঁছানো নিশ্চিত করে',
      routeDesc: 'সমস্যাযুক্ত রুট সনাক্ত করে ডেলিভারি অপ্টিমাইজ করে',
      weatherDesc: 'পরিকল্পনা কার্যক্রমের জন্য পরিবেশগত প্রসঙ্গ প্রদান করে',
      refrigerated: 'রেফ্রিজারেটেড',
      standard: 'স্ট্যান্ডার্ড',
      express: 'এক্সপ্রেস'
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', 'environment');
      fileInputRef.current.click();
    }
  };

  const handleAnalyze = () => {
    const data = {
      image: selectedImage,
      text: textData,
      task: task.id,
      // Advanced data for backend processing
      farmLocation,
      storeLocation,
      produceType,
      harvestDate,
      estimatedArrival,
      shelfLifeDays: parseInt(shelfLifeDays) || 0,
      storageTemp: parseFloat(storageTemp) || 0,
      transportType
    };
    onAnalyze(data);
  };

  const canAnalyze = () => {
    if (task.inputType === 'image') return selectedImage !== null;
    if (task.inputType === 'text') return textData.trim() !== '';
    if (task.inputType === 'both') return selectedImage !== null || textData.trim() !== '';
    return false;
  };

  const getProblemDescription = () => {
    switch (task.id) {
      case 'freshness':
        return translations[language].freshnessDesc;
      case 'route':
        return translations[language].routeDesc;
      case 'weather':
        return translations[language].weatherDesc;
      default:
        return 'Optimizes farming operations with AI-powered insights';
    }
  };

  const getTaskIcon = () => {
    switch (task.id) {
      case 'freshness':
        return <Package className="h-5 w-5" />;
      case 'route':
        return <MapPin className="h-5 w-5" />;
      case 'weather':
        return <Thermometer className="h-5 w-5" />;
      default:
        return <Zap className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Problem Statement */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            {getTaskIcon()}
            {translations[language].problemSolved}
          </CardTitle>
          <CardDescription className="text-green-700">
            {getProblemDescription()}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Image Input */}
      {(task.inputType === 'image' || task.inputType === 'both') && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              {translations[language].uploadImage}
            </CardTitle>
            <CardDescription>
              Upload a clear photo of your crop or field
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1"
              >
                <Upload className="h-4 w-4 mr-2" />
                {translations[language].uploadImage}
              </Button>
              <Button
                variant="outline"
                onClick={handleCameraCapture}
                className="flex-1 md:flex-none"
              >
                <Camera className="h-4 w-4 mr-2" />
                {translations[language].takePhoto}
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />

            {previewUrl && (
              <div className="relative">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-48 object-cover rounded-lg border"
                />
                <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
                  {translations[language].imageSelected}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {translations[language].basicInfo}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cropType">{translations[language].cropType}</Label>
              <Input 
                id="cropType"
                placeholder="e.g., Tomatoes, Strawberries"
                value={textData}
                onChange={(e) => setTextData(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">{translations[language].location}</Label>
              <Input 
                id="location"
                placeholder="e.g., Tamil Nadu, India"
                value={farmLocation}
                onChange={(e) => setFarmLocation(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings - Task Specific */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            {translations[language].advancedSettings}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Freshness Prediction Fields */}
          {task.id === 'freshness' && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="produceType">{translations[language].produceType}</Label>
                  <Select value={produceType} onValueChange={setProduceType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select produce type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="strawberries">Strawberries (7 days)</SelectItem>
                      <SelectItem value="tomatoes">Tomatoes (14 days)</SelectItem>
                      <SelectItem value="apples">Apples (30 days)</SelectItem>
                      <SelectItem value="lettuce">Lettuce (5 days)</SelectItem>
                      <SelectItem value="bananas">Bananas (7 days)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="harvestDate">{translations[language].harvestDate}</Label>
                  <Input 
                    id="harvestDate"
                    type="date"
                    value={harvestDate}
                    onChange={(e) => setHarvestDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="estimatedArrival">{translations[language].estimatedArrival}</Label>
                  <Input 
                    id="estimatedArrival"
                    type="date"
                    value={estimatedArrival}
                    onChange={(e) => setEstimatedArrival(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storageTemp">{translations[language].storageTemp}</Label>
                  <Input 
                    id="storageTemp"
                    type="number"
                    placeholder="4"
                    value={storageTemp}
                    onChange={(e) => setStorageTemp(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Route Optimization Fields */}
          {task.id === 'route' && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farmLoc">{translations[language].farmLocation}</Label>
                  <Input 
                    id="farmLoc"
                    placeholder="e.g., Coimbatore, Tamil Nadu"
                    value={farmLocation}
                    onChange={(e) => setFarmLocation(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeLoc">{translations[language].storeLocation}</Label>
                  <Input 
                    id="storeLoc"
                    placeholder="e.g., Chennai, Tamil Nadu"
                    value={storeLocation}
                    onChange={(e) => setStoreLocation(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="transport">{translations[language].transportType}</Label>
                  <Select value={transportType} onValueChange={setTransportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transport type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="refrigerated">{translations[language].refrigerated}</SelectItem>
                      <SelectItem value="standard">{translations[language].standard}</SelectItem>
                      <SelectItem value="express">{translations[language].express}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="produce">{translations[language].produceType}</Label>
                  <Input 
                    id="produce"
                    placeholder="e.g., Fresh vegetables"
                    value={produceType}
                    onChange={(e) => setProduceType(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Weather Impact Fields */}
          {task.id === 'weather' && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farmLocation">{translations[language].farmLocation}</Label>
                  <Input 
                    id="farmLocation"
                    placeholder="e.g., Bangalore, Karnataka"
                    value={farmLocation}
                    onChange={(e) => setFarmLocation(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cropType">{translations[language].produceType}</Label>
                  <Input 
                    id="cropType"
                    placeholder="e.g., Rice, Wheat"
                    value={produceType}
                    onChange={(e) => setProduceType(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="plantingDate">{translations[language].plantingDate}</Label>
                <Input 
                  id="plantingDate"
                  type="date"
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analyze Button */}
      <div className="text-center">
        <Button
          size="lg"
          onClick={handleAnalyze}
          disabled={!canAnalyze() || isAnalyzing}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg animate-pulse-glow"
        >
          {isAnalyzing ? (
            <>
              <Loader className="h-5 w-5 mr-2 animate-spin" />
              {translations[language].analyzing}
            </>
          ) : (
            <>
              <Zap className="h-5 w-5 mr-2" />
              {translations[language].analyze}
            </>
          )}
        </Button>

        {!canAnalyze() && !isAnalyzing && (
          <p className="text-sm text-gray-500 mt-2">
            {translations[language].fillRequired}
          </p>
        )}
      </div>
    </div>
  );
};
