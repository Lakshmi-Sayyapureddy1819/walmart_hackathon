import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Wheat,
  Truck,
  ShoppingCart,
  Shield,
  Calendar,
  Filter
} from 'lucide-react';

const solutionTabs = [
  { id: 'overview', name: 'Overview', icon: BarChart3 },
  { id: 'farming', name: 'Smart Farming', icon: Wheat },
  { id: 'supply', name: 'Supply Chain', icon: Truck },
  { id: 'demand', name: 'Demand Forecasting', icon: TrendingUp },
  { id: 'energy', name: 'Energy Management', icon: Zap },
  { id: 'customer', name: 'Customer Analytics', icon: Users },
  { id: 'inventory', name: 'Inventory', icon: ShoppingCart },
  { id: 'fraud', name: 'Fraud Detection', icon: Shield },
];

const overviewMetrics = [
  {
    title: 'Total Cost Savings',
    value: '$2.4M',
    change: '+23%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-green-600'
  },
  {
    title: 'Efficiency Improvement',
    value: '47%',
    change: '+12%',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-blue-600'
  },
  {
    title: 'Active Solutions',
    value: '7',
    change: '+2',
    trend: 'up',
    icon: Activity,
    color: 'text-purple-600'
  },
  {
    title: 'Monthly ROI',
    value: '189%',
    change: '+34%',
    trend: 'up',
    icon: BarChart3,
    color: 'text-orange-600'
  }
];

const recentAlerts = [
  {
    id: 1,
    type: 'success',
    title: 'Energy optimization completed',
    description: 'Reduced consumption by 15% in Store #482',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Inventory threshold reached',
    description: 'Frozen goods section needs restocking',
    time: '4 hours ago'
  },
  {
    id: 3,
    type: 'info',
    title: 'Demand forecast updated',
    description: 'Holiday season predictions refreshed',
    time: '1 day ago'
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('7d');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Control Center</h1>
            <p className="text-gray-600">Monitor and manage your AI-powered solutions in real-time</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <select 
                value={dateRange} 
                onChange={(e) => setDateRange(e.target.value)}
                className="border rounded px-3 py-2 text-sm"
              >
                <option value="1d">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overviewMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {metric.title}
                </CardTitle>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center text-sm">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {metric.change}
                  </span>
                  <span className="text-gray-500 ml-1">from last period</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Solution Performance</CardTitle>
                <CardDescription>
                  Detailed analytics for each AI solution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 lg:grid-cols-8 mb-6">
                    {solutionTabs.map((tab) => (
                      <TabsTrigger 
                        key={tab.id} 
                        value={tab.id}
                        className="flex flex-col items-center space-y-1 p-3"
                      >
                        <tab.icon className="h-4 w-4" />
                        <span className="text-xs hidden lg:block">{tab.name}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-green-800">Smart Farming</h3>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>
                        <p className="text-2xl font-bold text-green-600">48% cost reduction</p>
                        <p className="text-sm text-green-700">Optimizing 12 farm operations</p>
                      </div>
                      
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-blue-800">Supply Chain</h3>
                          <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">35% faster delivery</p>
                        <p className="text-sm text-blue-700">Managing 847 shipments</p>
                      </div>
                      
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-orange-800">Demand Forecasting</h3>
                          <Badge className="bg-orange-100 text-orange-800">Active</Badge>
                        </div>
                        <p className="text-2xl font-bold text-orange-600">89% accuracy</p>
                        <p className="text-sm text-orange-700">Predicting 200+ products</p>
                      </div>
                      
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-purple-800">Energy Management</h3>
                          <Badge className="bg-purple-100 text-purple-800">Active</Badge>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">42% energy savings</p>
                        <p className="text-sm text-purple-700">Monitoring 28 facilities</p>
                      </div>
                    </div>
                    
                    {/* Performance Chart Placeholder */}
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Performance Analytics Chart</p>
                        <p className="text-sm text-gray-400">Real-time data visualization</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="farming" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Crop Yield Optimization</h4>
                        <p className="text-2xl font-bold text-green-600">+23%</p>
                        <p className="text-sm text-gray-600">Average yield increase</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Water Usage Efficiency</h4>
                        <p className="text-2xl font-bold text-blue-600">-31%</p>
                        <p className="text-sm text-gray-600">Water consumption reduced</p>
                      </div>
                    </div>
                    <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Wheat className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Farm Analytics Dashboard</p>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Other tab contents would follow similar pattern */}
                  <TabsContent value="supply" className="space-y-4">
                    <div className="text-center py-8">
                      <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Supply Chain Analytics</h3>
                      <p className="text-gray-600">Detailed supply chain metrics and optimization data</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">AI Processing</span>
                  <Badge className="bg-green-100 text-green-800">Optimal</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Pipeline</span>
                  <Badge className="bg-green-100 text-green-800">Running</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Model Training</span>
                  <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Services</span>
                  <Badge className="bg-green-100 text-green-800">Online</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {alert.type === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {alert.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                      {alert.type === 'info' && <Clock className="h-4 w-4 text-blue-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                      <p className="text-sm text-gray-600">{alert.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Zap className="h-4 w-4 mr-2" />
                  Run Optimization
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
