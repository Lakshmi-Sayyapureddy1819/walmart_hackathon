
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Brain, 
  TrendingUp, 
  Users, 
  BarChart3,
  Zap,
  Shield,
  Wheat,
  Truck,
  ShoppingCart,
  Building2,
  Target,
  Lightbulb,
  ChevronRight,Package,Repeat,
  Play,
  Star,
  Quote,
  Recycle,
} from 'lucide-react';

const solutions = [
  {
    id: 1,
    title: 'Returns to Resource',
    description: 'Circular economy & smart reverse logistics',
    icon: Repeat,
    color: 'bg-walmart-blue',
    path: '/returns-to-resource',
    metric: '45% resource recovery'
  },
  {
    id: 2,
    title: 'Eco Packaging',
    description: 'Sustainable materials & optimized packaging',
    icon: Package,
    color: 'bg-walmart-orange',
    path: '/eco-packaging',
    metric: '60% waste reduction'
  },
  {
    id: 3,
    title: 'Energy Management',
    description: 'Automated energy efficiency & optimization',
    icon: Zap,
    color: 'bg-walmart-yellow',
    path: '/energy-management',
    metric: '42% energy savings'
  },
  {
    id: 4,
    title: 'Consumer Sustainability',
    description: 'Empowering consumers to make green choices',
    icon: BarChart3,
    color: 'bg-walmart-purple',
    path: '/consumer-sustainability',
    metric: '75% eco adoption'
  },
  {
    id: 5,
    title: 'Carbon-Aware Delivery & Reusable Packaging',
    description: 'Eco-friendly delivery picker and reusable packaging return',
    icon: Truck,
    color: 'bg-walmart-teal',
    path: '/carbon-delivery',
    metric: '30% carbon reduction',
  },
  {
    id: 6,
    title: 'Smart Farm-to-Shelf Scheduler',
    description: 'AI-powered agricultural planning and supply chain optimization',
    icon: Wheat,
    color: 'bg-walmart-green',
    path: '/smart-farming',
    metric: '48% cost reduction'
  },
  {
    id: 7,
    title: 'ZWIB & Community Compost',
    description: 'Zero Waste Bins, household food AI, and compost pickup',
    icon: Recycle,
    color: 'bg-walmart-red',
    path: '/waste-management ',
    metric: '50% waste diverted',
  },
];

const workflowSteps = [
  {
    step: 1,
    title: 'Identify Problem',
    description: 'AI analyzes patterns and identifies operational inefficiencies',
    icon: Target
  },
  {
    step: 2,
    title: 'Generate Solution',
    description: 'Machine learning creates optimized strategies and recommendations',
    icon: Lightbulb
  },
  {
    step: 3,
    title: 'Deliver Outcome',
    description: 'Real-time implementation drives measurable business results',
    icon: TrendingUp
  }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Supply Chain Director',
    company: 'Regional Distributor',
    quote: 'The AI solutions reduced our logistics costs by 40% while improving delivery times.',
    rating: 5
  },
  {
    name: 'Michael Rodriguez',
    role: 'Operations Manager',
    company: 'Retail Chain',
    quote: 'Inventory optimization has been a game-changer for our bottom line.',
    rating: 5
  },
  {
    name: 'Emma Johnson',
    role: 'Sustainability Lead',
    company: 'Corporate Group',
    quote: 'Energy management AI helped us achieve our carbon reduction goals ahead of schedule.',
    rating: 5
  }
];

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-walmart-blue to-walmart-blue/80 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-walmart-yellow text-walmart-blue hover:bg-walmart-yellow/90">
              AI-Powered Solutions
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            SustainaX
              <span className="block text-walmart-yellow">Optimize. Reduce. Sustain</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fade-in">
              Explore innovative AI solutions designed to reshape industries and drive measurable impact across retail, agriculture, and logistics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link to="/smart-farming">
                <Button size="lg" className="bg-walmart-yellow text-walmart-blue hover:bg-walmart-yellow/90 font-semibold">
                  Explore Solutions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" className="border-white text-white hover:bg-white hover:text-walmart-blue">
                  Access Dashboard
                  <BarChart3 className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Solutions Overview Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">AI Solutions Portfolio</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Seven cutting-edge AI systems designed to optimize operations, reduce costs, and drive sustainable growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Card 
                key={solution.id} 
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${solution.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <solution.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-walmart-blue transition-colors">
                    {solution.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {solution.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-green-700 bg-green-100">
                      {solution.metric}
                    </Badge>
                    <Link to={solution.path}>
                      <Button variant="ghost" size="sm" className="group-hover:text-walmart-blue">
                        Learn More
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-driven approach transforms challenges into opportunities through intelligent automation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {workflowSteps.map((step, index) => (
              <div key={step.step} className="text-center relative">
                <div className="mb-6">
                  <div className="w-20 h-20 rounded-full bg-walmart-blue text-white flex items-center justify-center mx-auto mb-4 animate-float">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-walmart-yellow text-walmart-blue font-bold flex items-center justify-center mx-auto text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                
                {index < workflowSteps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full">
                    <ArrowRight className="h-6 w-6 text-walmart-blue mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Who We Serve</h2>
            <p className="text-xl text-gray-600">
              Empowering diverse industries with tailored AI solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Wheat, title: 'Farmers', desc: 'Smart agriculture and crop optimization' },
              { icon: Truck, title: 'Logistics Providers', desc: 'Supply chain and delivery optimization' },
              { icon: ShoppingCart, title: 'Retailers', desc: 'Inventory and customer insights' },
              { icon: Building2, title: 'Investors', desc: 'Data-driven growth opportunities' }
            ].map((audience, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <audience.icon className="h-12 w-12 text-walmart-blue mx-auto mb-4" />
                  <CardTitle className="text-lg">{audience.title}</CardTitle>
                  <CardDescription>{audience.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-walmart-blue to-walmart-blue/80 rounded-2xl p-12 text-white text-center">
            <h2 className="text-4xl font-bold mb-6">Track Live Impact</h2>
            <p className="text-xl mb-8 text-blue-100">
              Monitor real-time performance across all AI solutions in one unified dashboard
            </p>
            <div className="relative mb-8">
              <div className="bg-white/10 backdrop-blur rounded-lg p-8 border border-white/20">
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-walmart-yellow">$2.4M</div>
                    <div className="text-sm text-blue-200">Cost Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-walmart-yellow">47%</div>
                    <div className="text-sm text-blue-200">Efficiency Gain</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-walmart-yellow">12</div>
                    <div className="text-sm text-blue-200">Active Solutions</div>
                  </div>
                </div>
                <div className="h-32 bg-white/5 rounded border border-white/10 flex items-center justify-center">
                  <Play className="h-12 w-12 text-white/60" />
                </div>
              </div>
            </div>
            <Link to="/dashboard">
              <Button size="lg" className="bg-walmart-yellow text-walmart-blue hover:bg-walmart-yellow/90">
                View Full Dashboard
                <BarChart3 className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">
              Real results from industry leaders using our AI solutions
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <CardContent className="text-center">
                <Quote className="h-12 w-12 text-walmart-blue mx-auto mb-6" />
                <blockquote className="text-2xl font-medium text-gray-900 mb-6">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-walmart-yellow fill-current" />
                  ))}
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-gray-600">
                  {testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-walmart-blue' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-walmart-blue text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded bg-walmart-yellow flex items-center justify-center">
                  <span className="text-walmart-blue font-bold text-sm">W</span>
                </div>
                <span className="font-bold text-xl">AI Solutions</span>
              </div>
              <p className="text-blue-200 mb-4">
                Transforming industries through intelligent automation and data-driven insights.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2 text-blue-200">
                <li><Link to="/smart-farming" className="hover:text-white transition-colors">Smart Farming</Link></li>
                <li><Link to="/supply-chain" className="hover:text-white transition-colors">Supply Chain</Link></li>
                <li><Link to="/demand-forecasting" className="hover:text-white transition-colors">Demand Forecasting</Link></li>
                <li><Link to="/energy-management" className="hover:text-white transition-colors">Energy Management</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-blue-200">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
            <p>&copy; 2024 Walmart AI Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
