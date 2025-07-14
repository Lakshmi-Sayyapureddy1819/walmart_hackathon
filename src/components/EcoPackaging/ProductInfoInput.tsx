import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, Scan, Package, MapPin, Scale, Ruler } from 'lucide-react';
import { ProductInfo } from './EcoPackagingEngine';

type Language = "en" | "hi" | "ta" | "te" | "bn";

interface ProductInfoInputProps {
  selectedLanguage: Language;
  onSubmit: (productInfo: ProductInfo) => void;
}

const translations = {
  en: {
    title: "Product Information",
    subtitle: "Enter your product details to get optimal packaging recommendations",
    sku: "Product SKU",
    skuPlaceholder: "Enter or scan SKU",
    productType: "Product Type",
    dimensions: "Dimensions (cm)",
    length: "Length",
    width: "Width", 
    height: "Height",
    weight: "Weight (kg)",
    fragility: "Fragility Level",
    fragilityLow: "Low - Durable items",
    fragilityMedium: "Medium - Standard care",
    fragilityHigh: "High - Fragile items",
    deliveryRoute: "Delivery Route",
    routePlaceholder: "e.g., Mumbai to Delhi",
    quantity: "Quantity",
    scanSku: "Scan SKU",
    voiceInput: "Voice Input",
    getRecommendations: "Get Packaging Recommendations",
    requiredFields: "Please fill all required fields"
  },
  hi: {
    title: "उत्पाद जानकारी",
    subtitle: "इष्टतम पैकेजिंग सिफारिशें प्राप्त करने के लिए अपनी उत्पाद विवरण दर्ज करें",
    sku: "उत्पाद SKU",
    skuPlaceholder: "SKU दर्ज करें या स्कैन करें",
    productType: "उत्पाद प्रकार",
    dimensions: "आयाम (सेमी)",
    length: "लंबाई",
    width: "चौड़ाई",
    height: "ऊंचाई",
    weight: "वजन (किलो)",
    fragility: "नाजुकता स्तर",
    fragilityLow: "कम - टिकाऊ वस्तुएं",
    fragilityMedium: "मध्यम - मानक देखभाल",
    fragilityHigh: "उच्च - नाजुक वस्तुएं",
    deliveryRoute: "डिलीवरी रूट",
    routePlaceholder: "जैसे, मुंबई से दिल्ली",
    quantity: "मात्रा",
    scanSku: "SKU स्कैन करें",
    voiceInput: "आवाज इनपुट",
    getRecommendations: "पैकेजिंग सिफारिशें प्राप्त करें",
    requiredFields: "कृपया सभी आवश्यक फील्ड भरें"
  },
  ta: {
    title: "தயாரிப்பு தகவல்",
    subtitle: "உகந்த பொதியிடல் பரிந்துரைகளைப் பெற உங்கள் தயாரிப்பு விவரங்களை உள்ளிடவும்",
    sku: "தயாரிப்பு SKU",
    skuPlaceholder: "SKU ஐ உள்ளிடவும் அல்லது ஸ்கேன் செய்யவும்",
    productType: "தயாரிப்பு வகை",
    dimensions: "பரிமாணங்கள் (செமீ)",
    length: "நீளம்",
    width: "அகலம்",
    height: "உயரம்",
    weight: "எடை (கிலோ)",
    fragility: "உடையக்கூடிய நிலை",
    fragilityLow: "குறைந்த - நீடித்த பொருள்கள்",
    fragilityMedium: "நடுத்தர - நிலையான பராமரிப்பு",
    fragilityHigh: "அதிக - உடையக்கூடிய பொருள்கள்",
    deliveryRoute: "விநியோக பாதை",
    routePlaceholder: "எ.கா., மும்பை முதல் டெல்லி வரை",
    quantity: "அளவு",
    scanSku: "SKU ஸ்கேன் செய்யவும்",
    voiceInput: "குரல் உள்ளீடு",
    getRecommendations: "பொதியிடல் பரிந்துரைகளைப் பெறுங்கள்",
    requiredFields: "அனைத்து தேவையான புலங்களையும் நிரப்பவும்"
  },
  te: {
    title: "ఉత్పత్తి సమాచారం",
    subtitle: "సరైన ప్యాకేజింగ్ సిఫార్సులను పొందడానికి మీ ఉత్పత్తి వివరాలను నమోదు చేయండి",
    sku: "ఉత్పత్తి SKU",
    skuPlaceholder: "SKU ను నమోదు చేయండి లేదా స్కాన్ చేయండి",
    productType: "ఉత్పత్తి రకం",
    dimensions: "పరిమాణాలు (సెంమీ)",
    length: "పొడవు",
    width: "వెడల్పు",
    height: "ఎత్తు",
    weight: "బరువు (కిలో)",
    fragility: "పగుళ్లు స్థాయి",
    fragilityLow: "తక్కువ - మన్నికైన వస్తువులు",
    fragilityMedium: "మధ్యమ - ప్రామాణిక సంరక్షణ",
    fragilityHigh: "అధిక - పగిలే వస్తువులు",
    deliveryRoute: "డెలివరీ మార్గం",
    routePlaceholder: "ఉ.దా., ముంబై నుండి ఢిల్లీ వరకు",
    quantity: "పరిమాణం",
    scanSku: "SKU స్కాన్ చేయండి",
    voiceInput: "వాయిస్ ఇన్‌పుట్",
    getRecommendations: "ప్యాకేజింగ్ సిఫార్సులను పొందండి",
    requiredFields: "దయచేసి అన్ని అవసరమైన ఫీల్డ్‌లను పూర్తి చేయండి"
  },
  bn: {
    title: "পণ্যের তথ্য",
    subtitle: "সর্বোত্তম প্যাকেজিং সুপারিশ পেতে আপনার পণ্যের বিবরণ লিখুন",
    sku: "পণ্য SKU",
    skuPlaceholder: "SKU লিখুন বা স্ক্যান করুন",
    productType: "পণ্যের ধরন",
    dimensions: "মাত্রা (সেমি)",
    length: "দৈর্ঘ্য",
    width: "প্রস্থ",
    height: "উচ্চতা",
    weight: "ওজন (কেজি)",
    fragility: "ভঙ্গুরতার স্তর",
    fragilityLow: "কম - টেকসই আইটেম",
    fragilityMedium: "মধ্যম - মান যত্ন",
    fragilityHigh: "উচ্চ - ভঙ্গুর আইটেম",
    deliveryRoute: "ডেলিভারি রুট",
    routePlaceholder: "যেমন, মুম্বাই থেকে দিল্লি",
    quantity: "পরিমাণ",
    scanSku: "SKU স্ক্যান করুন",
    voiceInput: "ভয়েস ইনপুট",
    getRecommendations: "প্যাকেজিং সুপারিশ পান",
    requiredFields: "দয়া করে সব প্রয়োজনীয় ক্ষেত্র পূরণ করুন"
  }
};

const productTypes = [
  'Electronics', 'Clothing', 'Food', 'Books', 'Toys', 'Home & Garden',
  'Beauty', 'Sports', 'Automotive', 'Health', 'Baby Care', 'Pet Supplies',
  'Jewelry', 'Shoes', 'Furniture', 'Kitchen', 'Office Supplies'
];

export const ProductInfoInput: React.FC<ProductInfoInputProps> = ({
  selectedLanguage,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    sku: '',
    productType: '',
    length: '',
    width: '',
    height: '',
    weight: '',
    fragility: '' as 'low' | 'medium' | 'high' | '',
    deliveryRoute: '',
    quantity: ''
  });
  const [errors, setErrors] = useState<string[]>([]);

  const t = translations[selectedLanguage];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields = ['sku', 'productType', 'length', 'width', 'height', 'weight', 'fragility', 'quantity'];
    const emptyFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (emptyFields.length > 0) {
      setErrors([t.requiredFields]);
      return;
    }

    const productInfo: ProductInfo = {
      sku: formData.sku,
      productType: formData.productType,
      dimensions: {
        length: parseFloat(formData.length),
        width: parseFloat(formData.width),
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight)
      },
      fragility: formData.fragility as 'low' | 'medium' | 'high',
      deliveryRoute: formData.deliveryRoute,
      quantity: parseInt(formData.quantity)
    };

    setErrors([]);
    onSubmit(productInfo);
  };

  const handleVoiceInput = (field: string) => {
    // Placeholder for voice input functionality
    console.log(`Voice input for ${field}`);
  };

  const handleScanSku = () => {
    // Placeholder for SKU scanning functionality
    console.log('Scanning SKU...');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Package className="h-6 w-6 text-primary" />
          {t.title}
        </CardTitle>
        <CardDescription>{t.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SKU Input */}
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="sku">{t.sku}</Label>
              <Input
                id="sku"
                placeholder={t.skuPlaceholder}
                value={formData.sku}
                onChange={(e) => setFormData({...formData, sku: e.target.value})}
                className="mt-1"
              />
            </div>
            <div className="flex gap-2 items-end">
              <Button type="button" variant="outline" size="icon" onClick={handleScanSku}>
                <Scan className="h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" size="icon" onClick={() => handleVoiceInput('sku')}>
                <Mic className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Product Type */}
          <div>
            <Label htmlFor="productType">{t.productType}</Label>
            <Select value={formData.productType} onValueChange={(value) => setFormData({...formData, productType: value})}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {productTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dimensions */}
          <div>
            <Label className="flex items-center gap-2 mb-2">
              <Ruler className="h-4 w-4" />
              {t.dimensions}
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="length" className="text-sm">{t.length}</Label>
                <Input
                  id="length"
                  type="number"
                  value={formData.length}
                  onChange={(e) => setFormData({...formData, length: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="width" className="text-sm">{t.width}</Label>
                <Input
                  id="width"
                  type="number"
                  value={formData.width}
                  onChange={(e) => setFormData({...formData, width: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="height" className="text-sm">{t.height}</Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({...formData, height: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="weight" className="text-sm flex items-center gap-1">
                  <Scale className="h-3 w-3" />
                  {t.weight}
                </Label>
                <Input
                  id="weight"
                  type="number" 
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Fragility */}
          <div>
            <Label>{t.fragility}</Label>
            <Select value={formData.fragility} onValueChange={(value) => setFormData({...formData, fragility: value as 'low' | 'medium' | 'high'})}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">{t.fragilityLow}</SelectItem>
                <SelectItem value="medium">{t.fragilityMedium}</SelectItem>
                <SelectItem value="high">{t.fragilityHigh}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Delivery Route */}
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="deliveryRoute" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {t.deliveryRoute}
              </Label>
              <Input
                id="deliveryRoute"
                placeholder={t.routePlaceholder}
                value={formData.deliveryRoute}
                onChange={(e) => setFormData({...formData, deliveryRoute: e.target.value})}
                className="mt-1"
              />
            </div>
            <div className="flex items-end">
              <Button type="button" variant="outline" size="icon" onClick={() => handleVoiceInput('deliveryRoute')}>
                <Mic className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <Label htmlFor="quantity">{t.quantity}</Label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              className="mt-1"
            />
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="space-y-1">
              {errors.map((error, index) => (
                <Badge key={index} variant="destructive">{error}</Badge>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" size="lg" className="w-full">
            <Package className="mr-2 h-5 w-5" />
            {t.getRecommendations}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};