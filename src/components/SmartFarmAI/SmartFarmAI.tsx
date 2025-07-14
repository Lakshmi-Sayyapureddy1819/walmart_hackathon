import React, { useState } from 'react';
import { EnhancedHero } from './EnhancedHero';
import { InteractiveTaskPanel } from './InteractiveTaskPanel';
import { LiveAIPanel } from './LiveAIPanel';
import { ProgressCards } from './ProgressCards';
import { DataInput } from './DataInput';
import { ResultsDisplay } from './ResultsDisplay';
import { BeforeAfterComparison } from './BeforeAfterComparison';
import { ScenarioSimulator } from './ScenarioSimulator';
import { CommunityWisdom } from './CommunityWisdom';
import { SmartTimeline } from './SmartTimeline';
import { QuickHelp } from './QuickHelp';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Zap } from 'lucide-react';

export interface FarmTask {
  id: string;
  title: string;
  icon: string;
  description: string;
  inputType: 'image' | 'text' | 'both';
}

export interface AIResult {
  task: string;
  confidence: number;
  result: {
    value: string;
    score?: number;
    recommendation: string;
    timeframe?: string;
  };
}

export const SmartFarmAI = () => {
  const [currentStep, setCurrentStep] = useState<'hero' | 'input' | 'results'>('hero');
  const [selectedTask, setSelectedTask] = useState<FarmTask | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AIResult | null>(null);
  const [language, setLanguage] = useState<'en' | 'hi' | 'ta' | 'te' | 'bn'>('en');

  const handleLanguageChange = (lang: 'en' | 'hi' | 'ta' | 'te' | 'bn') => {
    setLanguage(lang);
  };

  const handleGetStarted = () => {
    // Scroll to interactive section
    const element = document.getElementById('interactive-tasks');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTaskSelect = (task: any) => {
    setSelectedTask(task);
    setCurrentStep('input');
  };

  const handleAnalyze = async (inputData: any) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with backend logic
    setTimeout(() => {
      const mockResults: AIResult = {
        task: selectedTask?.title || '',
        confidence: Math.floor(Math.random() * 20) + 80, // 80-100%
        result: {
          value: getAdvancedResult(selectedTask?.id || '', inputData),
          score: Math.floor(Math.random() * 30) + 70, // 70-100
          recommendation: getAdvancedRecommendation(selectedTask?.id || '', inputData),
          timeframe: getMockTimeframe(selectedTask?.id || '')
        }
      };
      
      setResults(mockResults);
      setCurrentStep('results');
      setIsAnalyzing(false);
    }, 3000); // Longer processing time for advanced analysis
  };

  const getAdvancedResult = (taskId: string, inputData: any): string => {
    switch (taskId) {
      case 'freshness':
        return simulateFreshnessAnalysis(inputData);
      case 'route':
        return simulateRouteAnalysis(inputData);
      case 'weather':
        return simulateWeatherAnalysis(inputData);
      default:
        return getMockResult(taskId);
    }
  };

  const getAdvancedRecommendation = (taskId: string, inputData: any): string => {
    switch (taskId) {
      case 'freshness':
        return generateFreshnessRecommendation(inputData);
      case 'route':
        return generateRouteRecommendation(inputData);
      case 'weather':
        return generateWeatherRecommendation(inputData);
      default:
        return getMockRecommendation(taskId);
    }
  };

  const simulateFreshnessAnalysis = (inputData: any): string => {
    const shelfLifeDays = getShelfLifeForProduce(inputData.produceType);
    const harvestDate = new Date(inputData.harvestDate);
    const arrivalDate = new Date(inputData.estimatedArrival);
    
    const daysInTransit = Math.max(0, Math.ceil((arrivalDate.getTime() - harvestDate.getTime()) / (1000 * 60 * 60 * 24)));
    const remainingShelfLife = Math.max(0, shelfLifeDays - daysInTransit);
    const freshnessScore = Math.min(100, Math.round((remainingShelfLife / shelfLifeDays) * 100));
    
    return `${freshnessScore}% Fresh - ${remainingShelfLife} days remaining shelf life`;
  };

  const generateFreshnessRecommendation = (inputData: any): string => {
    const shelfLifeDays = getShelfLifeForProduce(inputData.produceType);
    const harvestDate = new Date(inputData.harvestDate);
    const arrivalDate = new Date(inputData.estimatedArrival);
    
    const daysInTransit = Math.max(0, Math.ceil((arrivalDate.getTime() - harvestDate.getTime()) / (1000 * 60 * 60 * 24)));
    const remainingShelfLife = Math.max(0, shelfLifeDays - daysInTransit);
    const freshnessScore = Math.min(100, Math.round((remainingShelfLife / shelfLifeDays) * 100));
    
    let recommendation = '';
    if (freshnessScore > 80) {
      recommendation = 'High freshness detected. Maintain optimal storage conditions and proceed with standard distribution timeline.';
    } else if (freshnessScore > 50) {
      recommendation = 'Good freshness level. Ensure rapid transfer to retail locations and prioritize quick turnover.';
    } else {
      recommendation = 'Lower freshness detected. Prioritize immediate sale, consider markdown pricing, or donate to food banks.';
    }
    
    return `${recommendation} Store at 4°C and transport within 48 hours for optimal quality.`;
  };

  const simulateRouteAnalysis = (inputData: any): string => {
    // Simulate route calculation
    const distance = Math.floor(Math.random() * 200) + 50; // 50-250 km
    const estimatedTime = Math.round((distance / 60) * 10) / 10; // Rough calculation
    
    // Simulate problem route detection
    const problemRoutes = ['Highway 12', 'Route 45', 'Main Street Bridge'];
    const hasProblems = Math.random() < 0.3; // 30% chance of problems
    
    if (hasProblems) {
      const problemRoute = problemRoutes[Math.floor(Math.random() * problemRoutes.length)];
      return `${distance} km route - ${estimatedTime} hrs (WARNING: ${problemRoute} has issues)`;
    }
    
    return `${distance} km route - ${estimatedTime} hrs delivery time`;
  };

  const generateRouteRecommendation = (inputData: any): string => {
    const problemRoutes = ['Highway 12', 'Route 45', 'Main Street Bridge'];
    const problems = ['construction', 'heavy traffic', 'road maintenance'];
    const hasProblems = Math.random() < 0.3;
    
    if (hasProblems) {
      const problemRoute = problemRoutes[Math.floor(Math.random() * problemRoutes.length)];
      const problem = problems[Math.floor(Math.random() * problems.length)];
      return `WARNING: Avoid ${problemRoute} due to ${problem}. Suggest alternative route via bypass roads. Use refrigerated transport for all fresh produce to maintain quality during extended transit time.`;
    }
    
    return 'Optimal route detected with no major obstacles. Monitor traffic conditions during peak hours. Use refrigerated transport for all fresh produce to ensure quality maintenance.';
  };

  const simulateWeatherAnalysis = (inputData: any): string => {
    const weatherConditions = ['Clear skies', 'Partly cloudy', 'Rain expected', 'Storm warning', 'High winds'];
    const condition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    
    const riskLevel = condition.includes('Rain') || condition.includes('Storm') || condition.includes('winds') ? 'Medium-High' : 'Low';
    
    return `${condition} - ${riskLevel} risk for operations`;
  };

  const generateWeatherRecommendation = (inputData: any): string => {
    const adverseConditions = ['rain', 'storm', 'high winds', 'extreme heat'];
    const hasAdverseWeather = Math.random() < 0.4; // 40% chance
    
    if (hasAdverseWeather) {
      const condition = adverseConditions[Math.floor(Math.random() * adverseConditions.length)];
      const location = inputData.farmLocation || 'your area';
      const date = new Date();
      date.setDate(date.getDate() + Math.floor(Math.random() * 5) + 1);
      
      return `WARNING: ${condition.charAt(0).toUpperCase() + condition.slice(1)} predicted for ${location} on ${date.toLocaleDateString()}. Expect potential delays in harvesting and transportation. Consider adjusting harvest schedule and ensure proper protection for crops and equipment.`;
    }
    
    return 'Ideal weather conditions forecasted for the next 5 days. Perfect opportunity for planned harvesting and transportation activities. Monitor conditions daily for any changes.';
  };

  const getShelfLifeForProduce = (produceType: string): number => {
    const shelfLives: Record<string, number> = {
      'strawberries': 7,
      'tomatoes': 14,
      'apples': 30,
      'lettuce': 5,
      'bananas': 7,
      'oranges': 21,
      'carrots': 14,
      'potatoes': 60
    };
    
    return shelfLives[produceType?.toLowerCase()] || 10; // Default 10 days
  };

  const getMockResult = (taskId: string): string => {
    const results = {
      'freshness': '85% Fresh',
      'route': '47 km - 2.5 hours',
      'weather': 'Favorable conditions'
    };
    return results[taskId as keyof typeof results] || 'Analysis complete';
  };

  const getMockRecommendation = (taskId: string): string => {
    const recommendations = {
        'freshness': 'Store at 4°C and transport within 48 hours for optimal quality.',
         'route': 'Avoid Route 12 due to construction. Use refrigerated transport.',
         'weather': 'Ideal conditions for next 5 days. Plan accordingly.'
    };
    return recommendations[taskId as keyof typeof recommendations] || 'Follow standard procedures';
  };

  const getMockTimeframe = (taskId: string): string => {
    const timeframes = {
      'freshness': '48-72 hours',
      'route': 'Today, 2:30 PM arrival',
      'weather': 'Next 5 days'
    };
    return timeframes[taskId as keyof typeof timeframes] || 'Ongoing';
  };

  const resetFlow = () => {
    setCurrentStep('hero');
    setSelectedTask(null);
    setResults(null);
    setIsAnalyzing(false);
  };

  const translations = {
    en: {
      backToTasks: 'Back to Tasks',
      analysisResults: 'Analysis Results',
      analyzeAnother: 'Analyze Another'
    },
    hi: {
      backToTasks: 'कार्यों पर वापस',
      analysisResults: 'विश्लेषण परिणाम',
      analyzeAnother: 'अन्य का विश्लेषण करें'
    },
    ta: {
      backToTasks: 'கார்யங்களுக்குத் திரும்பு',
      analysisResults: 'பकுப्पाই परिणाम',
      analyzeAnother: 'மருगै கाय விஶ்லேஷண கரேஂ'
    },
    te: {
      backToTasks: 'కార్యాలకు తిరిగి',
      analysisResults: 'విశ్లేషణ ఫలితాలు',
      analyzeAnother: 'మరొకటి విశ్లేషించండి'
    },
    bn: {
      backToTasks: 'কাজে ফিরে যান',
      analysisResults: 'বিশ্লেষণ ফলাফল',  
      analyzeAnother: 'অন্য বিশ্লেষণ করুন'
    }
  };

  if (currentStep === 'input' && selectedTask) {
    return (
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <span className="text-3xl">{selectedTask.icon}</span>
                {selectedTask.title}
              </h3>
              <Button variant="outline" onClick={resetFlow}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {translations[language].backToTasks}
              </Button>
            </div>
            <DataInput 
              task={selectedTask}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
              language={language}
            />
          </div>
        </div>
        <QuickHelp language={language} />
      </section>
    );
  }

  if (currentStep === 'results' && results && selectedTask) {
    return (
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Zap className="h-6 w-6 text-green-600" />
                {translations[language].analysisResults}
              </h3>
              <Button variant="outline" onClick={resetFlow}>
                {translations[language].analyzeAnother}
              </Button>
            </div>
            <ResultsDisplay 
              results={results}
              task={selectedTask}
              language={language}
            />
          </div>
        </div>
        <QuickHelp language={language} />
      </section>
    );
  }

  return (
    <div>
      {/* Enhanced Hero Section */}
      <EnhancedHero
        language={language}
        onLanguageChange={handleLanguageChange}
        onGetStarted={handleGetStarted}
      />

      {/* Interactive Task Panel */}
      <div id="interactive-tasks">
        <InteractiveTaskPanel
          language={language}
          onTaskSelect={handleTaskSelect}
        />
      </div>

      {/* Scenario Simulator */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ScenarioSimulator language={language} />
        </div>
      </section>

      {/* Community Wisdom */}
      <CommunityWisdom language={language} />

      {/* Smart Timeline */}
      <SmartTimeline language={language} />

      {/* Live AI Assistant Panel */}
      <LiveAIPanel language={language} />

      {/* Progress Cards */}
      <ProgressCards language={language} />

      {/* Before/After Comparison */}
      <BeforeAfterComparison language={language} />

      {/* Quick Help Floating Button */}
      <QuickHelp language={language} />
    </div>
  );
};
