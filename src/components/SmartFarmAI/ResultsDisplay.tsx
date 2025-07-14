
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AIResult, FarmTask } from './SmartFarmAI';
import { CheckCircle, AlertTriangle, TrendingUp, Clock, Share2, Download } from 'lucide-react';

interface ResultsDisplayProps {
  results: AIResult;
  task: FarmTask;
  language: 'en' | 'hi' | 'ta' | 'te' | 'bn';
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ 
  results, 
  task, 
  language 
}) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-100 text-green-800';
    if (confidence >= 75) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getScoreColor = (score?: number) => {
    if (!score) return 'text-gray-600';
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const translations = {
    en: {
      confidence: 'Confidence',
      recommendation: 'Recommendation',
      timeframe: 'Timeframe',
      shareResult: 'Share Result',
      saveResult: 'Save Result',
      goodResult: 'Excellent Result',
      warningResult: 'Needs Attention',
      score: 'Score'
    },
    hi: {
      confidence: 'विश्वास',
      recommendation: 'सिफारिश',
      timeframe: 'समयसीमा',
      shareResult: 'परिणाम साझा करें',
      saveResult: 'परिणाम सहेजें',
      goodResult: 'उत्कृष्ट परिणाम',
      warningResult: 'ध्यान की आवश्यकता',
      score: 'स्कोर'
    },
    ta: {
      confidence: 'நம்பிக்கை',
      recommendation: 'பரிந்துரை',
      timeframe: 'கால அளவு',
      shareResult: 'முடிவை பகிரவும்',
      saveResult: 'முடிவை சேமிக்கவும்',
      goodResult: 'சிறந்த முடிவு',
      warningResult: 'கவனம் தேவை',
      score: 'மதிப்பெண்'
    },
    te: {
      confidence: 'విశ్వాసం',
      recommendation: 'సిఫార్సు',
      timeframe: 'కాలపరిమితి',
      shareResult: 'ఫలితాన్ని పంచుకోండి',
      saveResult: 'ఫలితాన్ని సేవ్ చేయండి',
      goodResult: 'అద్భుతమైన ఫలితం',
      warningResult: 'దృష్టి అవసరం',
      score: 'స్కోర్'
    },
    bn: {
      confidence: 'আস্থা',
      recommendation: 'সুপারিশ',
      timeframe: 'সময়সীমা',
      shareResult: 'ফলাফল শেয়ার করুন',
      saveResult: 'ফলাফল সংরক্ষণ করুন',
      goodResult: 'চমৎকার ফলাফল',
      warningResult: 'মনোযোগ প্রয়োজন',
      score: 'স্কোর'
    }
  };

  const isGoodResult = (results.result.score || 0) >= 75;

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <Card className="border-l-4 border-l-green-500 animate-fade-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <span className="text-3xl">{task.icon}</span>
              <div>
                <h3 className="text-xl">{results.task}</h3>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {results.result.value}
                </p>
              </div>
            </CardTitle>
            <div className="text-right">
              <Badge className={getConfidenceColor(results.confidence)}>
                {results.confidence}% {translations[language].confidence}
              </Badge>
              {results.result.score && (
                <div className={`text-lg font-semibold mt-2 ${getScoreColor(results.result.score)}`}>
                  {translations[language].score}: {results.result.score}/100
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Status Indicator */}
          <div className="flex items-center gap-2 mb-4">
            {isGoodResult ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-600">
                  {translations[language].goodResult}
                </span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-600">
                  {translations[language].warningResult}
                </span>
              </>
            )}
          </div>

          {/* Recommendation */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              {translations[language].recommendation}
            </h4>
            <p className="text-gray-700">{results.result.recommendation}</p>
          </div>

          {/* Timeframe */}
          {results.result.timeframe && (
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Clock className="h-4 w-4" />
              <span className="font-medium">{translations[language].timeframe}:</span>
              <span>{results.result.timeframe}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" size="sm" className="flex-1">
              <Share2 className="h-4 w-4 mr-2" />
              {translations[language].shareResult}
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              {translations[language].saveResult}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Additional Insights */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-600">Quick Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• Monitor conditions daily for best results</li>
              <li>• Weather conditions may affect accuracy</li>
              <li>• Contact local agriculture extension for advice</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-600">Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• Set reminders for recommended timeframe</li>
              <li>• Prepare necessary equipment</li>
              <li>• Track progress in dashboard</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
