
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Wheat, 
  TrendingUp, 
  DollarSign, 
  Droplets, 
  Sun, 
  BarChart3,
  CheckCircle,
  Play,
  Calendar,
  MapPin,
  Users
} from 'lucide-react';
import Image from "../assests/img1.jpg"
import { Link } from 'react-router-dom';
import { SmartFarmAI } from '@/components/SmartFarmAI/SmartFarmAI';

const features = [
  {
    icon: Sun,
    title: 'Weather Integration',
    description: 'Real-time weather data analysis for optimal planting and harvesting schedules'
  },
  {
    icon: Droplets,
    title: 'Smart Irrigation',
    description: 'AI-powered water management reducing usage by up to 40%'
  },
  {
    icon: BarChart3,
    title: 'Yield Prediction',
    description: 'Machine learning models predicting crop yields with 94% accuracy'
  },
  {
    icon: TrendingUp,
    title: 'Market Analysis',
    description: 'Price forecasting and demand analysis for better crop selection'
  }
];

const benefits = [
  '48% reduction in operational costs',
  '23% increase in crop yields',
  '31% decrease in water usage',
  '67% improvement in harvest timing',
  '89% accuracy in yield predictions',
  '52% reduction in food waste'
];

const SmartFarming = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-walmart-green to-emerald-600 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="container mx-auto px-4 py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-green-100 text-green-800">
                AI-Powered Agriculture
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Smart Farm-to-Shelf
                <span className="block text-green-200">Scheduler</span>
              </h1>
              <p className="text-xl mb-8 text-green-100">
                Transform traditional farming with AI-driven insights that optimize every stage from seed to shelf, 
                reducing costs while maximizing yields and sustainability.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-walmart-green hover:bg-gray-100">
                  Request Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link to="/dashboard">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white text-walmart-green">
                    View Live Data
                    <BarChart3 className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
                <img src={Image} alt="Smart Farming" className="rounded-2xl shadow-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive AI Tool Section */}
      <SmartFarmAI />

      {/* Problem Breakdown */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                The Challenge in Modern Agriculture
              </h2>
              <div className="space-y-4 text-lg text-gray-600">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-3 flex-shrink-0" />
                  <p>Traditional farming methods waste 40% of water resources due to inefficient irrigation timing</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-3 flex-shrink-0" />
                  <p>Poor harvest timing leads to 25% crop loss and reduced market value</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-3 flex-shrink-0" />
                  <p>Unpredictable weather patterns cause $5B in annual agricultural losses</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-3 flex-shrink-0" />
                  <p>Manual crop monitoring is labor-intensive and prone to human error</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="/api/placeholder/600/400" 
                alt="Traditional farming challenges" 
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered Solution */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">AI-Powered Farm Intelligence</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced machine learning algorithms analyze weather patterns, soil conditions, 
              and market data to optimize every aspect of your farming operation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-walmart-green flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Impact */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Proven Results</h2>
            <p className="text-xl text-gray-600">Real outcomes from farms using our AI solutions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <div className="flex items-center mb-6">
                <img 
                  src="/api/placeholder/80/80" 
                  alt="Farm owner" 
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Sarah Martinez</h4>
                  <p className="text-gray-600">Organic Farm Owner, California</p>
                </div>
              </div>
              <blockquote className="text-lg text-gray-700 mb-4">
                "The AI system helped us reduce water usage by 35% while increasing our tomato yield by 28%. 
                The ROI was evident within the first season."
              </blockquote>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-walmart-green">35%</div>
                  <div className="text-sm text-gray-600">Water Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-walmart-green">28%</div>
                  <div className="text-sm text-gray-600">Yield Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-walmart-green">$45K</div>
                  <div className="text-sm text-gray-600">Annual Savings</div>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-bold mb-6">Key Benefits Achieved</h3>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-walmart-green flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-walmart-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Farm?</h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            Join leading farmers who are already saving costs and increasing yields with our AI solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-walmart-green hover:bg-gray-100">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-walmart-green">
                View Live Demo
                <Play className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SmartFarming;
