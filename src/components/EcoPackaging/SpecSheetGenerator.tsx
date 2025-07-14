import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Share, Save, FileText, Package, Leaf, Recycle, MessageCircle } from 'lucide-react';
import { ProductInfo, PackagingOption } from './EcoPackagingEngine';

type Language = "en" | "hi" | "ta" | "te" | "bn";

interface SpecSheetGeneratorProps {
  productInfo: ProductInfo;
  selectedOption: PackagingOption;
  selectedLanguage: Language;
}

const translations = {
  en: {
    title: "Packaging Specification Sheet",
    subtitle: "Download or share your packaging configuration",
    productDetails: "Product Details",
    packagingSpec: "Packaging Specification",
    sustainabilityMetrics: "Sustainability Metrics",
    sku: "SKU",
    productType: "Product Type",
    dimensions: "Dimensions",
    weight: "Weight",
    fragility: "Fragility Level",
    quantity: "Quantity",
    materials: "Materials",
    totalCost: "Total Cost",
    co2Footprint: "CO₂ Footprint",
    recyclability: "Recyclability",
    compostable: "Compostable",
    ecoCoins: "Eco-Coins Earned",
    downloadPdf: "Download PDF",
    shareWhatsApp: "Share via WhatsApp",
    saveAsDefault: "Save as Default",
    needHelp: "Need Help?",
    reorderMaterials: "Reorder Materials",
    specSheet: "Spec Sheet",
    generatedOn: "Generated on",
    yes: "Yes",
    no: "No"
  },
  hi: {
    title: "पैकेजिंग विनिर्देश शीट",
    subtitle: "अपने पैकेजिंग कॉन्फ़िगरेशन को डाउनलोड या साझा करें",
    productDetails: "उत्पाद विवरण",
    packagingSpec: "पैकेजिंग विनिर्देश",
    sustainabilityMetrics: "स्थिरता मेट्रिक्स",
    sku: "SKU",
    productType: "उत्पाद प्रकार",
    dimensions: "आयाम",
    weight: "वजन",
    fragility: "नाजुकता स्तर",
    quantity: "मात्रा",
    materials: "सामग्री",
    totalCost: "कुल लागत",
    co2Footprint: "CO₂ फुटप्रिंट",
    recyclability: "पुनर्चक्रण",
    compostable: "कम्पोस्टेबल",
    ecoCoins: "अर्जित इको-कॉइन",
    downloadPdf: "PDF डाउनलोड करें",
    shareWhatsApp: "व्हाट्सऐप के माध्यम से साझा करें",
    saveAsDefault: "डिफ़ॉल्ट के रूप में सेव करें",
    needHelp: "सहायता चाहिए?",
    reorderMaterials: "सामग्री पुनः ऑर्डर करें",
    specSheet: "स्पेक शीट",
    generatedOn: "पर जेनरेट किया गया",
    yes: "हाँ",
    no: "नहीं"
  },
  ta: {
    title: "பொதியிடல் விவரக்குறிப்பு தாள்",
    subtitle: "உங்கள் பொதியிடல் உள்ளமைப்பைப் பதிவிறக்கம் செய்யுங்கள் அல்லது பகிர்ந்து கொள்ளுங்கள்",
    productDetails: "தயாரிப்பு விவரங்கள்",
    packagingSpec: "பொதியிடல் விவரக்குறிப்பு",
    sustainabilityMetrics: "நிலைத்தன்மை அளவீடுகள்",
    sku: "SKU",
    productType: "தயாரிப்பு வகை",
    dimensions: "பரிமாணங்கள்",
    weight: "எடை",
    fragility: "உடையக்கூடிய நிலை",
    quantity: "அளவு",
    materials: "பொருட்கள்",
    totalCost: "மொத்த செலவு",
    co2Footprint: "CO₂ தடம்",
    recyclability: "மறுசுழற்சி",
    compostable: "உரமாக்கக்கூடிய",
    ecoCoins: "சம்பாதித்த ஈகோ-நாணயங்கள்",
    downloadPdf: "PDF பதிவிறக்கம்",
    shareWhatsApp: "WhatsApp மூலம் பகிர்க",
    saveAsDefault: "இயல்புநிலையாக சேமிக்கவும்",
    needHelp: "உதவி தேவையா?",
    reorderMaterials: "பொருட்களை மீண்டும் ஆர்டர் செய்யுங்கள்",
    specSheet: "ஸ்பெக் ஷீட்",
    generatedOn: "உருவாக்கப்பட்டது",
    yes: "ஆம்",
    no: "இல்லை"
  },
  te: {
    title: "ప్యాకేజింగ్ స్పెసిఫికేషన్ షీట్",
    subtitle: "మీ ప్యాకేజింగ్ కాన్ఫిగరేషన్ను డౌన్‌లోడ్ చేయండి లేదా షేర్ చేయండి",
    productDetails: "ఉత్పత్తి వివరాలు",
    packagingSpec: "ప్యాకేజింగ్ స్పెసిఫికేషన్",
    sustainabilityMetrics: "స్థిరత్వ మెట్రిక్స్",
    sku: "SKU",
    productType: "ఉత్పత్తి రకం",
    dimensions: "పరిమాణాలు",
    weight: "బరువు",
    fragility: "పగుళ్లు స్థాయి",
    quantity: "పరిమాణం",
    materials: "మెటీరియల్స్",
    totalCost: "మొత్తం ఖర్చు",
    co2Footprint: "CO₂ పాదముద్ర",
    recyclability: "రీసైక్లింగ్",
    compostable: "కంపోస్ట్ చేయదగిన",
    ecoCoins: "సంపాదించిన ఎకో-కాయిన్లు",
    downloadPdf: "PDF డౌన్‌లోడ్",
    shareWhatsApp: "WhatsApp ద్వారా షేర్ చేయండి",
    saveAsDefault: "డిఫాల్ట్‌గా సేవ్ చేయండి",
    needHelp: "సహాయం కావాలా?",
    reorderMaterials: "మెటీరియల్స్ రీఆర్డర్ చేయండి",
    specSheet: "స్పెక్ షీట్",
    generatedOn: "జనరేట్ చేయబడింది",
    yes: "అవును",
    no: "లేదు"
  },
  bn: {
    title: "প্যাকেজিং স্পেসিফিকেশন শীট",
    subtitle: "আপনার প্যাকেজিং কনফিগারেশন ডাউনলোড বা শেয়ার করুন",
    productDetails: "পণ্যের বিবরণ",
    packagingSpec: "প্যাকেজিং স্পেসিফিকেশন",
    sustainabilityMetrics: "স্থায়িত্ব মেট্রিক্স",
    sku: "SKU",
    productType: "পণ্যের ধরন",
    dimensions: "মাত্রা",
    weight: "ওজন",
    fragility: "ভঙ্গুরতার স্তর",
    quantity: "পরিমাণ",
    materials: "উপকরণ",
    totalCost: "মোট খরচ",
    co2Footprint: "CO₂ পদচিহ্ন",
    recyclability: "পুনর্ব্যবহার",
    compostable: "কম্পোস্টযোগ্য",
    ecoCoins: "অর্জিত ইকো-কয়েন",
    downloadPdf: "PDF ডাউনলোড",
    shareWhatsApp: "WhatsApp এর মাধ্যমে শেয়ার করুন",
    saveAsDefault: "ডিফল্ট হিসাবে সংরক্ষণ করুন",
    needHelp: "সাহায্য প্রয়োজন?",
    reorderMaterials: "উপকরণ পুনরায় অর্ডার করুন",
    specSheet: "স্পেক শীট",
    generatedOn: "উৎপন্ন হয়েছে",
    yes: "হ্যাঁ",
    no: "না"
  }
};

export const SpecSheetGenerator: React.FC<SpecSheetGeneratorProps> = ({
  productInfo,
  selectedOption,
  selectedLanguage
}) => {
  const t = translations[selectedLanguage];
  const currentDate = new Date().toLocaleDateString();
  const totalCost = selectedOption.cost * productInfo.quantity;

  const handleDownloadPdf = () => {
    console.log('Generating PDF spec sheet...');
    // Implementation for PDF generation
  };

  const handleShareWhatsApp = () => {
    const message = `${t.specSheet} - ${selectedOption.name}\n${t.sku}: ${productInfo.sku}\n${t.totalCost}: ₹${totalCost}\n${t.co2Footprint}: ${selectedOption.co2Footprint}g`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSaveAsDefault = () => {
    console.log('Saving as default configuration...');
    // Implementation for saving default configuration
  };

  const handleReorderMaterials = () => {
    console.log('Redirecting to material suppliers...');
    // Implementation for material reordering
  };

  const handleNeedHelp = () => {
    console.log('Opening help chat...');
    // Implementation for help chat
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">{t.title}</h2>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* Spec Sheet Display */}
      <Card className="bg-white border-2">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="h-6 w-6 text-primary" />
                {selectedOption.name} - {t.specSheet}
              </CardTitle>
              <CardDescription>{t.generatedOn} {currentDate}</CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-700 text-lg px-4 py-2">
              <Leaf className="h-4 w-4 mr-1" />
              +{selectedOption.ecoCoins} {t.ecoCoins}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-8 p-8">
          {/* Product Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              {t.productDetails}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">{t.sku}:</span>
                <div className="font-mono text-lg">{productInfo.sku}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">{t.productType}:</span>
                <div>{productInfo.productType}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">{t.dimensions}:</span>
                <div>{productInfo.dimensions.length} × {productInfo.dimensions.width} × {productInfo.dimensions.height} cm</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">{t.weight}:</span>
                <div>{productInfo.dimensions.weight} kg</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">{t.fragility}:</span>
                <div className="capitalize">{productInfo.fragility}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">{t.quantity}:</span>
                <div>{productInfo.quantity} units</div>
              </div>
            </div>
          </div>

          {/* Packaging Specification */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-green-600" />
              {t.packagingSpec}
            </h3>
            <div className="space-y-4">
              <div>
                <span className="font-medium text-gray-600">{t.materials}:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedOption.materials.map((material, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-50">
                      {material}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">{t.totalCost}:</span>
                  <div className="text-xl font-bold text-green-600">₹{totalCost}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">{t.co2Footprint}:</span>
                  <div className="text-xl font-bold text-blue-600">{selectedOption.co2Footprint}g</div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">{t.recyclability}:</span>
                  <div className="text-xl font-bold text-teal-600">{selectedOption.recyclability}%</div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">{t.compostable}:</span>
                  <div className="text-xl font-bold text-yellow-600">
                    {selectedOption.compostable ? t.yes : t.no}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sustainability Metrics */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              {t.sustainabilityMetrics}
            </h3>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex flex-wrap gap-2">
                {selectedOption.badges.map((badge, index) => (
                  <Badge key={index} className="bg-green-100 text-green-700">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button onClick={handleDownloadPdf} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          {t.downloadPdf}
        </Button>
        
        <Button onClick={handleShareWhatsApp} variant="outline" className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          {t.shareWhatsApp}
        </Button>
        
        <Button onClick={handleSaveAsDefault} variant="outline" className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          {t.saveAsDefault}
        </Button>
        
        <Button onClick={handleNeedHelp} variant="ghost" className="flex items-center gap-2">
          <Share className="h-4 w-4" />
          {t.needHelp}
        </Button>
      </div>

      {/* Additional Actions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-blue-900 mb-1">{t.reorderMaterials}</h4>
              <p className="text-sm text-blue-700">Connect with local suppliers for sustainable materials</p>
            </div>
            <Button onClick={handleReorderMaterials} variant="outline" className="border-blue-300 text-blue-700">
              <Recycle className="h-4 w-4 mr-2" />
              Reorder
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};