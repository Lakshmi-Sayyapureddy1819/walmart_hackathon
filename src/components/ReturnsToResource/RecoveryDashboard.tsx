
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

type Language = "en" | "hi" | "ta" | "te" | "bn";

interface RecoveryDashboardProps {
  selectedLanguage: Language;
}

const translations = {
  en: {
    title: "Recovery Analytics Dashboard",
    totalReturns: "Total Returns",
    recoveryRate: "Recovery Rate",
    valueRecovered: "Value Recovered",
    carbonSaved: "Carbon Saved",
    byCategory: "Returns by Category",
    byAction: "Recovery Actions",
    trends: "Recovery Trends",
    resold: "Resold",
    repaired: "Repaired", 
    donated: "Donated",
    recycled: "Recycled",
    disposed: "Disposed",
    electronics: "Electronics",
    clothing: "Clothing",
    homeGoods: "Home Goods",
    books: "Books",
    sports: "Sports"
  },
  hi: {
    title: "रिकवरी एनालिटिक्स डैशबोर्ड",
    totalReturns: "कुल रिटर्न",
    recoveryRate: "रिकवरी दर",
    valueRecovered: "मूल्य रिकवर",
    carbonSaved: "कार्बन बचाया",
    byCategory: "श्रेणी के अनुसार रिटर्न",
    byAction: "रिकवरी क्रियाएं",
    trends: "रिकवरी रुझान",
    resold: "फिर से बेचा",
    repaired: "मरम्मत की",
    donated: "दान किया",
    recycled: "रीसाइकिल किया",
    disposed: "निपटान किया",
    electronics: "इलेक्ट्रॉनिक्स",
    clothing: "कपड़े",
    homeGoods: "घरेलू सामान",
    books: "किताबें",
    sports: "खेल"
  },
  ta: {
    title: "மீட்பு பகுப்பாய்வு டாஷ்போர்டு",
    totalReturns: "மொத்த திரும்பல்கள்",
    recoveryRate: "மீட்பு விகிதம்",
    valueRecovered: "மீட்டெடுக்கப்பட்ட மதிப்பு",
    carbonSaved: "கார்பன் சேமிக்கப்பட்டது",
    byCategory: "வகையின் அடிப்படையில் திரும்பல்கள்",
    byAction: "மீட்பு நடவடிக்கைகள்",
    trends: "மீட்பு போக்குகள்",
    resold: "மீண்டும் விற்கப்பட்டது",
    repaired: "பழுதுபார்க்கப்பட்டது",
    donated: "தானம் செய்யப்பட்டது",
    recycled: "மறுசுழற்சி செய்யப்பட்டது",
    disposed: "அகற்றப்பட்டது",
    electronics: "மின்னணுவியல்",
    clothing: "ஆடை",
    homeGoods: "வீட்டுப் பொருட்கள்",
    books: "புத்தகங்கள்",
    sports: "விளையாட்டு"
  },
  te: {
    title: "రికవరీ అనలిటిక్స్ డాష్‌బోర్డ్",
    totalReturns: "మొత్తం రిటర్న్స్",
    recoveryRate: "రికవరీ రేట్",
    valueRecovered: "రికవర్ చేసిన విలువ",
    carbonSaved: "కార్బన్ సేవ్ చేయబడింది",
    byCategory: "వర్గం ఆధారంగా రిటర్న్స్",
    byAction: "రికవరీ చర్యలు",
    trends: "రికవరీ ట్రెండ్స్",
    resold: "మరలా అమ్మబడింది",
    repaired: "మరమ్మత్తు చేయబడింది",
    donated: "దానం చేయబడింది",
    recycled: "రీసైకిల్ చేయబడింది",
    disposed: "పారవేయబడింది",
    electronics: "ఎలక్ట్రానిక్స్",
    clothing: "దుస్తులు",
    homeGoods: "గృహోపకరణాలు",
    books: "పుస్తకాలు",
    sports: "క్రీడలు"
  },
  bn: {
    title: "পুনরুদ্ধার বিশ্লেষণ ড্যাশবোর্ড",
    totalReturns: "মোট রিটার্ন",
    recoveryRate: "পুনরুদ্ধারের হার",
    valueRecovered: "পুনরুদ্ধার করা মূল্য",
    carbonSaved: "কার্বন সাশ্রয়",
    byCategory: "বিভাগ অনুযায়ী রিটার্ন",
    byAction: "পুনরুদ্ধার কর্ম",
    trends: "পুনরুদ্ধার প্রবণতা",
    resold: "পুনরায় বিক্রিত",
    repaired: "মেরামত করা",
    donated: "দান করা",
    recycled: "পুনর্ব্যবহার করা",
    disposed: "নিষ্পত্তি করা",
    electronics: "ইলেকট্রনিক্স",
    clothing: "পোশাক",
    homeGoods: "গৃহস্থালীর জিনিস",
    books: "বই",
    sports: "খেলাধুলা"
  }
};

const mockData = {
  categoryData: [
    { name: 'electronics', value: 35, color: '#3B82F6' },
    { name: 'clothing', value: 28, color: '#10B981' },
    { name: 'homeGoods', value: 20, color: '#F59E0B' },
    { name: 'books', value: 12, color: '#8B5CF6' },
    { name: 'sports', value: 5, color: '#EF4444' }
  ],
  actionData: [
    { name: 'resold', value: 45, color: '#059669' },
    { name: 'donated', value: 25, color: '#7C3AED' },
    { name: 'repaired', value: 15, color: '#2563EB' },
    { name: 'recycled', value: 12, color: '#0891B2' },
    { name: 'disposed', value: 3, color: '#DC2626' }
  ],
};

export const RecoveryDashboard: React.FC<RecoveryDashboardProps> = ({ selectedLanguage }) => {
  const t = translations[selectedLanguage];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center">{t.title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">1,247</div>
            <div className="text-sm text-gray-600">{t.totalReturns}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">82%</div>
            <div className="text-sm text-gray-600">{t.recoveryRate}</div>
            <Progress value={87} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-600">₹1.3L</div>
            <div className="text-sm text-gray-600">{t.valueRecovered}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-teal-600">0.8T</div>
            <div className="text-sm text-gray-600">{t.carbonSaved}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t.byCategory}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockData.categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {mockData.categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-4">
              {mockData.categoryData.map((item) => (
                <Badge key={item.name} style={{ backgroundColor: item.color }}>
                  {t[item.name as keyof typeof t]} ({item.value}%)
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.byAction}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockData.actionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {mockData.actionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-4">
              {mockData.actionData.map((item) => (
                <Badge key={item.name} style={{ backgroundColor: item.color }}>
                  {t[item.name as keyof typeof t]} ({item.value}%)
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

    
    </div>
  );
};
