
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, X, CheckCircle } from 'lucide-react';

interface BeforeAfterComparisonProps {
  language: 'en' | 'hi' | 'ta' | 'te' | 'bn';
}

export const BeforeAfterComparison: React.FC<BeforeAfterComparisonProps> = ({ language }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const translations = {
    en: {
      title: 'See the Difference AI Makes',
      subtitle: 'Compare traditional farming vs AI-powered decisions',
      traditional: 'Traditional Method',
      aiPowered: 'AI-Powered Method',
      swipeToCompare: 'Tap to Compare',
      beforeScenarios: [
        {
          title: 'Harvest Too Early',
          description: 'Farmer guesses ripeness',
          outcome: '25% crop loss due to premature harvest',
          icon: '🌱'
        },
        {
          title: 'Poor Route Planning',
          description: 'Manual route selection',
          outcome: '40% longer delivery time',
          icon: '🚛'
        },
        {
          title: 'No Freshness Tracking',
          description: 'No monitoring during transport',
          outcome: '30% spoilage at destination',
          icon: '📦'
        }
      ],
      afterScenarios: [
        {
          title: 'Perfect Timing',
          description: 'AI predicts optimal harvest window',
          outcome: '92% harvest efficiency achieved',
          icon: '🌾'
        },
        {
          title: 'Smart Routing',
          description: 'AI optimizes delivery path',
          outcome: '35% faster delivery with freshness preserved',
          icon: '🎯'
        },
        {
          title: 'Real-time Monitoring',
          description: 'Continuous freshness tracking',
          outcome: '85% reduction in spoilage',
          icon: '📊'
        }
      ]
    },
    hi: {
      title: 'देखें एआई कैसे बदलाव लाता है',
      subtitle: 'पारंपरिक खेती बनाम एआई-संचालित निर्णयों की तुलना करें',
      traditional: 'पारंपरिक विधि',
      aiPowered: 'एआई-संचालित विधि',
      swipeToCompare: 'तुलना के लिए टैप करें',
      beforeScenarios: [
        {
          title: 'जल्दी कटाई',
          description: 'किसान पकने का अनुमान लगाता है',
          outcome: 'समय से पहले कटाई के कारण 25% फसल हानि',
          icon: '🌱'
        },
        {
          title: 'खराब मार्ग योजना',
          description: 'मैनुअल मार्ग चयन',
          outcome: '40% अधिक डिलीवरी समय',
          icon: '🚛'
        },
        {
          title: 'कोई ताजगी ट्रैकिंग नहीं',
          description: 'परिवहन के दौरान कोई निगरानी नहीं',
          outcome: 'गंतव्य पर 30% खराबी',
          icon: '📦'
        }
      ],
      afterScenarios: [
        {
          title: 'सही समय',
          description: 'एआई इष्टतम कटाई खिड़की की भविष्यवाणी करता है',
          outcome: '92% कटाई दक्षता प्राप्त',
          icon: '🌾'
        },
        {
          title: 'स्मार्ट रूटिंग',
          description: 'एआई डिलीवरी पथ का अनुकूलन करता है',
          outcome: 'ताजगी संरक्षित के साथ 35% तेज डिलीवरी',
          icon: '🎯'
        },
        {
          title: 'रियल-टाइम निगरानी',
          description: 'निरंतर ताजगी ट्रैकिंग',
          outcome: 'खराबी में 85% कमी',
          icon: '📊'
        }
      ]
    },
    ta: {
      title: 'AI எவ்வளவு வித்தியாசம் செய்கிறது என்பதைப் பாருங்கள்',
      subtitle: 'பாரம்பரிய விவசாயம் vs AI-இயங்கும் முடிவுகளை ஒப்பிடுங்கள்',
      traditional: 'பாரம்பரிய முறை',
      aiPowered: 'AI-இயங்கும் முறை',
      swipeToCompare: 'ஒப்பிட தட்டவும்',
      beforeScenarios: [
        {
          title: 'முன்கூட்டிய அறுவடை',
          description: 'விவசாயி பழுத்த நிலையை அனுமானிக்கிறார்',
          outcome: 'முன்கூட்டிய அறுவடையால் 25% பயிர் இழப்பு',
          icon: '🌱'
        },
        {
          title: 'மோசமான பாதை திட்டமிடல்',
          description: 'கைமுறை பாதை தேர்வு',
          outcome: '40% அதிக டெலிவரி நேரம்',
          icon: '🚛'
        },
        {
          title: 'புத்துணர்வு கண்காணிப்பு இல்லை',
          description: 'போக்குவரத்தின் போது கண்காணிப்பு இல்லை',
          outcome: 'இலக்கில் 30% கெட்டுப்போதல்',
          icon: '📦'
        }
      ],
      afterScenarios: [
        {
          title: 'சரியான நேரம்',
          description: 'AI சிறந்த அறுவடை சாளரத்தை முன்னறிவிக்கிறது',
          outcome: '92% அறுவடை திறன் அடைந்தது',
          icon: '🌾'
        },
        {
          title: 'புத்திசாலி வழியமைப்பு',
          description: 'AI டெலிவரி பாதையை மேம்படுத்துகிறது',
          outcome: 'புத்துணர்வு பாதுகாக்கப்பட்ட 35% வேகமான டெலிவரி',
          icon: '🎯'
        },
        {
          title: 'நிகழ்நேர கண்காணிப்பு',
          description: 'தொடர்ச்சியான புத்துணர்வு கண்காணிப்பு',
          outcome: 'கெட்டுப்போதலில் 85% குறைப்பு',
          icon: '📊'
        }
      ]
    },
    te: {
      title: 'AI ఎంత తేడా చేస్తుందో చూడండి',
      subtitle: 'సాంప్రదాయ వ్యవసాయం vs AI-శక్తితో కూడిన నిర్ణయాలను పోల్చండి',
      traditional: 'సాంప్రదాయ పద్ధతి',
      aiPowered: 'AI-శక్తితో కూడిన పద్ధతి',
      swipeToCompare: 'పోల్చడానికి నొక్కండి',
      beforeScenarios: [
        {
          title: 'ముందుగానే కోత',
          description: 'రైతు పక్వతను అంచనా వేస్తాడు',
          outcome: 'ముందస్తు కోత వల్ల 25% పంట నష్టం',
          icon: '🌱'
        },
        {
          title: 'చెడు మార్గ ప్లానింగ్',
          description: 'మాన్యువల్ మార్గ ఎంపిక',
          outcome: '40% ఎక్కువ డెలివరీ సమయం',
          icon: '🚛'
        },
        {
          title: 'తాజాదనం ట్రాకింగ్ లేదు',
          description: 'రవాణా సమయంలో పర్యవేక్షణ లేదు',
          outcome: 'గమ్యస్థానంలో 30% చెడిపోవడం',
          icon: '📦'
        }
      ],
      afterScenarios: [
        {
          title: 'పర్ఫెక్ట్ టైమింగ్',
          description: 'AI సరైన కోత కిటికీని అంచనా వేస్తుంది',
          outcome: '92% కోత సామర్థ్యం సాధించబడింది',
          icon: '🌾'
        },
        {
          title: 'స్మార్ట్ రూటింగ్',
          description: 'AI డెలివరీ మార్గాన్ని ఆప్టిమైజ్ చేస్తుంది',
          outcome: 'తాజాదనం భద్రపరచబడిన 35% వేగవంతమైన డెలివరీ',
          icon: '🎯'
        },
        {
          title: 'రియల్-టైమ్ మానిటరింగ్',
          description: 'నిరంతర తాజాదనం ట్రాకింగ్',
          outcome: 'చెడిపోవడంలో 85% తగ్గింపు',
          icon: '📊'
        }
      ]
    },
    bn: {
      title: 'AI কতটা পার্থক্য আনে তা দেখুন',
      subtitle: 'ঐতিহ্যবাহী কৃষি বনাম AI-চালিত সিদ্ধান্তের তুলনা করুন',
      traditional: 'ঐতিহ্যবাহী পদ্ধতি',
      aiPowered: 'AI-চালিত পদ্ধতি',
      swipeToCompare: 'তুলনার জন্য ট্যাপ করুন',
      beforeScenarios: [
        {
          title: 'তাড়াতাড়ি ফসল কাটা',
          description: 'কৃষক পাকার অনুমান করে',
          outcome: 'অকাল ফসল কাটার কারণে ২৫% ফসল ক্ষতি',
          icon: '🌱'
        },
        {
          title: 'খারাপ রুট পরিকল্পনা',
          description: 'ম্যানুয়াল রুট নির্বাচন',
          outcome: '৪০% বেশি ডেলিভারি সময়',
          icon: '🚛'
        },
        {
          title: 'তাজাত্ব ট্র্যাকিং নেই',
          description: 'পরিবহনের সময় কোনো নিরীক্ষণ নেই',
          outcome: 'গন্তব্যে ৩০% নষ্ট',
          icon: '📦'
        }
      ],
      afterScenarios: [
        {
          title: 'নিখুঁত সময়',
          description: 'AI সর্বোত্তম ফসল কাটার সময় পূর্বাভাস দেয়',
          outcome: '৯২% ফসল কাটার দক্ষতা অর্জিত',
          icon: '🌾'
        },
        {
          title: 'স্মার্ট রুটিং',
          description: 'AI ডেলিভারি পথ অপ্টিমাইজ করে',
          outcome: 'তাজাত্ব সংরক্ষিত ৩৫% দ্রুত ডেলিভারি',
          icon: '🎯'
        },
        {
          title: 'রিয়েল-টাইম মনিটরিং',
          description: 'ক্রমাগত তাজাত্ব ট্র্যাকিং',
          outcome: 'নষ্ট হওয়ায় ৮৫% হ্রাস',
          icon: '📊'
        }
      ]
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % translations[language].beforeScenarios.length);
  };

  return (
    <div className="text-center">
      <h3 className="text-3xl font-bold text-gray-900 mb-4">
        {translations[language].title}
      </h3>
      <p className="text-lg text-gray-600 mb-12">
        {translations[language].subtitle}
      </p>

      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Before (Traditional) */}
        <Card className="border-2 border-red-200 bg-red-50">
          <CardHeader>
            <div className="flex items-center justify-center gap-2 mb-4">
              <X className="h-6 w-6 text-red-600" />
              <CardTitle className="text-red-800">
                {translations[language].traditional}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-6xl mb-4">
                {translations[language].beforeScenarios[currentSlide].icon}
              </div>
              <h4 className="text-xl font-semibold text-red-800">
                {translations[language].beforeScenarios[currentSlide].title}
              </h4>
              <p className="text-red-700">
                {translations[language].beforeScenarios[currentSlide].description}
              </p>
              <Badge variant="destructive" className="text-sm">
                {translations[language].beforeScenarios[currentSlide].outcome}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* After (AI-Powered) */}
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex items-center justify-center gap-2 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <CardTitle className="text-green-800">
                {translations[language].aiPowered}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-6xl mb-4">
                {translations[language].afterScenarios[currentSlide].icon}
              </div>
              <h4 className="text-xl font-semibold text-green-800">
                {translations[language].afterScenarios[currentSlide].title}
              </h4>
              <p className="text-green-700">
                {translations[language].afterScenarios[currentSlide].description}
              </p>
              <Badge className="bg-green-100 text-green-800 text-sm">
                {translations[language].afterScenarios[currentSlide].outcome}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="mt-8">
        <Button onClick={nextSlide} className="bg-green-600 hover:bg-green-700">
          {translations[language].swipeToCompare}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
        
        <div className="flex justify-center gap-2 mt-4">
          {translations[language].beforeScenarios.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-green-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
