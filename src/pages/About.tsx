
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Target, 
  Award, 
  Globe, 
  Brain,
  Lightbulb,
  Heart,
  Shield
} from 'lucide-react';

const values = [
  {
    icon: Brain,
    title: 'Innovation First',
    description: 'We push the boundaries of AI technology to solve real-world problems'
  },
  {
    icon: Heart,
    title: 'Human-Centered',
    description: 'Technology should empower people, not replace them'
  },
  {
    icon: Shield,
    title: 'Trust & Transparency',
    description: 'We build solutions you can understand and rely on'
  },
  {
    icon: Globe,
    title: 'Sustainable Impact',
    description: 'Creating solutions that benefit both business and environment'
  }
];

const stats = [
  { number: '7', label: 'AI Solutions', icon: Lightbulb },
  { number: '200+', label: 'Enterprise Clients', icon: Users },
  { number: '$50M+', label: 'Cost Savings Generated', icon: Target },
  { number: '99.2%', label: 'System Reliability', icon: Award }
];

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-walmart-blue to-walmart-blue/80 text-white">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-walmart-yellow text-walmart-blue">
              About Walmart AI Solutions
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Transforming Industries with
              <span className="block text-walmart-yellow">Intelligent AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              We're on a mission to make AI accessible, practical, and impactful for businesses 
              across retail, agriculture, logistics, and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <stat.icon className="h-8 w-8 text-walmart-blue mx-auto mb-4" />
                  <div className="text-4xl font-bold text-walmart-blue">{stat.number}</div>
                  <CardTitle className="text-lg">{stat.label}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                We believe that artificial intelligence should be a force for good—solving real problems, 
                creating value, and improving lives. Our mission is to democratize AI by making it 
                accessible to businesses of all sizes.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                From smart farming solutions that feed the world more sustainably to supply chain 
                optimizations that reduce waste and costs, we're building AI that matters.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-walmart-blue" />
                  <span className="text-gray-700">Practical AI solutions for real business challenges</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-walmart-blue" />
                  <span className="text-gray-700">Transparent, explainable AI that you can trust</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-walmart-blue" />
                  <span className="text-gray-700">Sustainable technology that benefits society</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="/api/placeholder/600/400" 
                alt="Team collaboration" 
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-walmart-blue flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg mb-2">{value.title}</CardTitle>
                  <p className="text-gray-600">{value.description}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="/api/placeholder/600/400" 
                alt="AI Technology" 
                className="rounded-2xl shadow-xl"
              />
            </div>
            
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Cutting-Edge Technology</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our AI solutions are built on the latest advances in machine learning, 
                deep learning, and data science. We combine proven algorithms with innovative 
                approaches to deliver results that matter.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-walmart-blue mb-2">Machine Learning</h4>
                  <p className="text-sm text-gray-600">Advanced ML models for prediction and optimization</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-walmart-green mb-2">Deep Learning</h4>
                  <p className="text-sm text-gray-600">Neural networks for complex pattern recognition</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-walmart-orange mb-2">Computer Vision</h4>
                  <p className="text-sm text-gray-600">Image analysis for quality control and monitoring</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-walmart-purple mb-2">NLP & Analytics</h4>
                  <p className="text-sm text-gray-600">Text analysis and predictive analytics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-walmart-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for using AI to solve real problems. 
            Whether you're a data scientist, engineer, or business leader, there's a place for you on our team.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-walmart-yellow" />
              <h3 className="text-xl font-semibold mb-2">Collaborative Culture</h3>
              <p className="text-blue-200">Work with brilliant minds from diverse backgrounds</p>
            </div>
            <div className="text-center">
              <Lightbulb className="h-12 w-12 mx-auto mb-4 text-walmart-yellow" />
              <h3 className="text-xl font-semibold mb-2">Innovation Focus</h3>
              <p className="text-blue-200">Push the boundaries of what's possible with AI</p>
            </div>
            <div className="text-center">
              <Globe className="h-12 w-12 mx-auto mb-4 text-walmart-yellow" />
              <h3 className="text-xl font-semibold mb-2">Global Impact</h3>
              <p className="text-blue-200">Make a difference that reaches around the world</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
