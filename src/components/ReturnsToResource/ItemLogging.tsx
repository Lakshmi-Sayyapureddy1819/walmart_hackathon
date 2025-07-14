
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Camera, Search, Mic, MicOff, CheckCircle, ArrowRight, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Language = "en" | "hi" | "ta" | "te" | "bn";

interface ItemLoggingProps {
  selectedLanguage: Language;
}

const translations = {
  en: {
    title: "Item Logging & Image Capture",
    stepWizard: "Step-by-Step Workflow",
    step1: "Scan Product",
    step2: "Capture Image", 
    step3: "Add Details",
    step4: "Submit",
    productId: "Product ID / Barcode",
    scanBarcode: "Scan Barcode",
    returnReason: "Return Reason",
    defective: "Defective",
    changedMind: "Changed Mind", 
    wrongSize: "Wrong Size",
    damaged: "Damaged in Transit",
    notAsDescribed: "Not as Described",
    notes: "Additional Notes",
    voiceInput: "Voice Input",
    takePhoto: "Take Photo",
    retakePhoto: "Retake Photo",
    submit: "Submit Return",
    success: "Return logged successfully!",
    processing: "Processing your return...",
    confidence: "Confidence",
    recommendation: "AI Recommendation"
  },
  hi: {
    title: "आइटम लॉगिंग और इमेज कैप्चर",
    stepWizard: "चरणबद्ध कार्यप्रवाह",
    step1: "उत्पाद स्कैन करें",
    step2: "छवि कैप्चर करें",
    step3: "विवरण जोड़ें", 
    step4: "सबमिट करें",
    productId: "प्रोडक्ट आईडी / बारकोड",
    scanBarcode: "बारकोड स्कैन करें",
    returnReason: "वापसी का कारण",
    defective: "दोषपूर्ण",
    changedMind: "मन बदल गया",
    wrongSize: "गलत साइज़",
    damaged: "ट्रांजिट में क्षतिग्रस्त",
    notAsDescribed: "वर्णन के अनुसार नहीं",
    notes: "अतिरिक्त टिप्पणियां",
    voiceInput: "आवाज इनपुट",
    takePhoto: "फोटो लें",
    retakePhoto: "फिर से फोटो लें",
    submit: "रिटर्न सबमिट करें",
    success: "रिटर्न सफलतापूर्वक लॉग किया गया!",
    processing: "आपका रिटर्न प्रोसेस कर रहे हैं...",
    confidence: "विश्वास",
    recommendation: "AI सिफारिश"
  },
  ta: {
    title: "பொருள் பதிவு மற்றும் படம் எடுத்தல்",
    stepWizard: "படிப்படியான பணி प்रவாহம்",
    step1: "தயாரிப்பை ஸ்கேன் செய்",
    step2: "படம் எடு",
    step3: "விவரங்களைச் சேர்",
    step4: "சமர்ப்பி",
    productId: "தயாரிப்பு ID / பார்கோட்",
    scanBarcode: "பார்கோடை ஸ்கேன் செய்",
    returnReason: "திரும்புவதற்கான காரணம்",
    defective: "குறைபாடுள்ள",
    changedMind: "மனம் மாறியது",
    wrongSize: "தவறான அளவு",
    damaged: "போக்குவரத்தில் சேதமடைந்தது",
    notAsDescribed: "விவரித்தபடி இல்லை",
    notes: "கூடுதல் குறிப்புகள்",
    voiceInput: "குரல் உள்ளீடு",
    takePhoto: "புகைப்படம் எடு",
    retakePhoto: "மீண்டும் புகைப்படம் எடு",
    submit: "திரும்பல் சமர்ப்பிக்க",
    success: "திரும்பல் வெற்றிகரமாக பதிவு செய்யப்பட்டது!",
    processing: "உங்கள் திரும்பலைச் செயல்படுத்துகிறது...",
    confidence: "நம்பிக்கை",
    recommendation: "AI பரிந்துரை"
  },
  te: {
    title: "వస్తువు లాగింగ్ మరియు చిత్రం తీయడం",
    stepWizard: "దశలవారీ పని ప్రవాహం",
    step1: "ఉత్పత్తిని స్కాన్ చేయండి",
    step2: "చిత్రం తీయండి",
    step3: "వివరాలు జోడించండి",
    step4: "సమర్పించండి",
    productId: "ప్రొడక్ట్ ID / బార్‌కోడ్",
    scanBarcode: "బార్‌కోడ్ స్కాన్ చేయండి",
    returnReason: "తిరిగి వచ్చే కారణం",
    defective: "లోపభూయిష్టమైన",
    changedMind: "మనసు మార్చుకున్నాను",
    wrongSize: "తప్పు సైజ్",
    damaged: "రవాణాలో దెబ్బతిన్నది",
    notAsDescribed: "వర్ణించినట్లు లేదు",
    notes: "అదనపు గమనికలు",
    voiceInput: "వాయిస్ ఇన్‌పుట్",
    takePhoto: "ఫోటో తీయండి",
    retakePhoto: "మళ్లీ ఫోటో తీయండి",
    submit: "రిటర్న్ సమర్పించండి",
    success: "రిటర్న్ విజయవంతంగా లాగ్ చేయబడింది!",
    processing: "మీ రిటర్న్‌ను ప్రాసెస్ చేస్తోంది...",
    confidence: "విశ్వాసం",
    recommendation: "AI సిఫార్సు"
  },
  bn: {
    title: "আইটেম লগিং এবং ছবি তোলা",
    stepWizard: "ধাপে ধাপে কর্মপ্রবাহ",
    step1: "পণ্য স্ক্যান করুন",
    step2: "ছবি তুলুন",
    step3: "বিবরণ যোগ করুন",
    step4: "জমা দিন",
    productId: "প্রোডাক্ট আইডি / বারকোড",
    scanBarcode: "বারকোড স্ক্যান করুন",
    returnReason: "ফেরত দেওয়ার কারণ",
    defective: "ত্রুটিপূর্ণ",
    changedMind: "মন পরিবর্তন",
    wrongSize: "ভুল সাইজ",
    damaged: "পরিবহনে ক্ষতিগ্রস্ত",
    notAsDescribed: "বর্ণনা অনুযায়ী নয়",
    notes: "অতিরিক্ত নোট",
    voiceInput: "ভয়েস ইনপুট",
    takePhoto: "ছবি তুলুন",
    retakePhoto: "আবার ছবি তুলুন",
    submit: "রিটার্ন জমা দিন",
    success: "রিটার্ন সফলভাবে লগ করা হয়েছে!",
    processing: "আপনার রিটার্ন প্রক্রিয়া করা হচ্ছে...",
    confidence: "আস্থা",
    recommendation: "AI সুপারিশ"
  }
};

export const ItemLogging: React.FC<ItemLoggingProps> = ({ selectedLanguage }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [productId, setProductId] = useState('');
  const [returnReason, setReturnReason] = useState('');
  const [notes, setNotes] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  const t = translations[selectedLanguage];
  const progress = (currentStep / 4) * 100;

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setCurrentStep(3);
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Simulate voice input
    if (!isListening) {
      setTimeout(() => {
        setNotes("Voice input: Product arrived with minor scratches on the packaging");
        setIsListening(false);
        toast({
          title: "Voice Input Complete",
          description: "Voice note has been added to your return details."
        });
      }, 3000);
    }
  };

  const handleSubmit = () => {
    if (!productId || !returnReason || !imageFile) {
      toast({
        title: "Missing Information",
        description: "Please complete all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call and AI processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Success",
        description: t.success
      });
      
      // Reset form
      setCurrentStep(1);
      setProductId('');
      setReturnReason('');
      setNotes('');
      setImageFile(null);
      setImagePreview(null);
    }, 3000);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-blue-800">{t.title}</CardTitle>
          <div className="text-center text-sm text-gray-600">{t.stepWizard}</div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={progress} className="w-full h-3" />
            <div className="flex justify-between text-sm">
              <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  {currentStep > 1 ? <CheckCircle className="h-4 w-4" /> : '1'}
                </div>
                {t.step1}
              </div>
              <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  {currentStep > 2 ? <CheckCircle className="h-4 w-4" /> : '2'}
                </div>
                {t.step2}
              </div>
              <div className={`flex items-center gap-2 ${currentStep >= 3 ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  {currentStep > 3 ? <CheckCircle className="h-4 w-4" /> : '3'}
                </div>
                {t.step3}
              </div>
              <div className={`flex items-center gap-2 ${currentStep >= 4 ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  {currentStep > 4 ? <CheckCircle className="h-4 w-4" /> : '4'}
                </div>
                {t.step4}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardContent className="p-8">
          {/* Step 1: Product Scan */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <Package className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">{t.step1}</h3>
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="productId">{t.productId} *</Label>
                <div className="flex gap-2">
                  <Input
                    id="productId"
                    type="text"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    placeholder="Enter product ID or scan barcode"
                    className="flex-1 h-12 text-lg"
                  />
                  <Button type="button" variant="outline" size="lg" className="px-6">
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={nextStep} 
                  disabled={!productId}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Image Capture */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <Camera className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">{t.step2}</h3>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col items-center gap-4">
                  {imagePreview ? (
                    <div className="relative">
                      <img src={imagePreview} alt="Preview" className="w-64 h-64 object-cover rounded-lg border-2 border-gray-200" />
                      <Button
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
                        }}
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2"
                      >
                        {t.retakePhoto}
                      </Button>
                    </div>
                  ) : (
                    <label htmlFor="image" className="cursor-pointer">
                      <div className="flex flex-col items-center gap-4 p-8 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400 transition-colors bg-blue-50">
                        <Camera className="h-12 w-12 text-blue-500" />
                        <span className="text-lg font-medium text-blue-700">{t.takePhoto}</span>
                        <span className="text-sm text-gray-600">Tap to open camera</span>
                      </div>
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleImageCapture}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <Button onClick={prevStep} variant="outline">
                  Previous
                </Button>
                {imageFile && (
                  <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">{t.step3}</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="returnReason">{t.returnReason} *</Label>
                    <Select value={returnReason} onValueChange={setReturnReason}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select return reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="defective">{t.defective}</SelectItem>
                        <SelectItem value="changed-mind">{t.changedMind}</SelectItem>
                        <SelectItem value="wrong-size">{t.wrongSize}</SelectItem>
                        <SelectItem value="damaged">{t.damaged}</SelectItem>
                        <SelectItem value="not-as-described">{t.notAsDescribed}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">{t.notes}</Label>
                    <div className="relative">
                      <Textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add any additional details..."
                        rows={4}
                        className="pr-12"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={handleVoiceInput}
                      >
                        {isListening ? <MicOff className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4 text-blue-500" />}
                      </Button>
                    </div>
                    {isListening && (
                      <div className="flex items-center gap-2 text-sm text-blue-600">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        Listening... Speak now
                      </div>
                    )}
                  </div>
                </div>

                {imagePreview && (
                  <div className="space-y-2">
                    <Label>Item Photo</Label>
                    <img src={imagePreview} alt="Item" className="w-full h-48 object-cover rounded-lg border" />
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <Button onClick={prevStep} variant="outline">
                  Previous
                </Button>
                <Button 
                  onClick={nextStep} 
                  disabled={!returnReason}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Submit */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">{t.step4}</h3>
                <p className="text-gray-600">Review your return details before submitting</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Product ID</div>
                    <div className="font-medium">{productId}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Return Reason</div>
                    <div className="font-medium">{returnReason}</div>
                  </div>
                </div>
                {notes && (
                  <div>
                    <div className="text-sm text-gray-600">Notes</div>
                    <div className="font-medium">{notes}</div>
                  </div>
                )}
              </div>

              {isProcessing && (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                  <div className="text-blue-600 font-medium">{t.processing}</div>
                </div>
              )}

              <div className="flex justify-between">
                <Button onClick={prevStep} variant="outline" disabled={isProcessing}>
                  Previous
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  disabled={isProcessing}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  {t.submit}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
