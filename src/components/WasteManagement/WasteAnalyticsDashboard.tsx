import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download, Filter, TrendingUp, Target } from 'lucide-react';

interface WasteAnalyticsDashboardProps {
  wasteData: {
    totalDiverted: number;
    composted: number;
    recycled: number;
    donated: number;
  };
}

export const WasteAnalyticsDashboard = ({ wasteData }: WasteAnalyticsDashboardProps) => {
  const [timeFilter, setTimeFilter] = useState('week');
  const [sourceFilter, setSourceFilter] = useState('all');

  const weeklyData = [
    { day: 'Mon', store: 45, home: 23, community: 12 },
    { day: 'Tue', store: 52, home: 28, community: 15 },
    { day: 'Wed', store: 38, home: 31, community: 18 },
    { day: 'Thu', store: 61, home: 26, community: 14 },
    { day: 'Fri', store: 74, home: 35, community: 22 },
    { day: 'Sat', store: 68, home: 42, community: 28 },
    { day: 'Sun', store: 29, home: 38, community: 31 }
  ];

  const wasteTypeData = [
    { name: 'Composted', value: wasteData.composted, color: '#10b981' },
    { name: 'Recycled', value: wasteData.recycled, color: '#3b82f6' },
    { name: 'Donated', value: wasteData.donated, color: '#8b5cf6' },
    { name: 'Landfill', value: 156, color: '#6b7280' }
  ];

  const impactMetrics = [
    { label: 'CO₂e Avoided', value: `${Math.round(wasteData.totalDiverted * 0.7)}`, unit: 'lbs' },
    { label: 'Landfill Diverted', value: `${wasteData.totalDiverted}`, unit: 'lbs' },
    { label: 'Green Points Issued', value: '2,847', unit: 'pts' },
    { label: 'Community Impact', value: '94', unit: '%' }
  ];

  const topStores = [
    { name: 'Store #2181', diverted: 847, efficiency: 96 },
    { name: 'Store #1459', diverted: 723, efficiency: 94 },
    { name: 'Store #3672', diverted: 698, efficiency: 92 },
    { name: 'Store #2847', diverted: 634, efficiency: 89 }
  ];

  const diversionRate = Math.round((wasteData.totalDiverted / (wasteData.totalDiverted + 156)) * 100);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold mb-2">Waste Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Comprehensive view across stores, homes, and community programs
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="store">Store Only</SelectItem>
              <SelectItem value="home">Home Only</SelectItem>
              <SelectItem value="community">Community</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        {impactMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold">
                    {metric.value} <span className="text-sm text-muted-foreground">{metric.unit}</span>
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Waste Diversion by Source */}
        <Card>
          <CardHeader>
            <CardTitle>Waste Diversion by Source</CardTitle>
            <CardDescription>Daily breakdown across all channels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="store" stackId="a" fill="#10b981" name="Store" />
                <Bar dataKey="home" stackId="a" fill="#3b82f6" name="Home" />
                <Bar dataKey="community" stackId="a" fill="#8b5cf6" name="Community" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Waste Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Waste Type Distribution</CardTitle>
            <CardDescription>How waste is being processed</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={wasteTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {wasteTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Diversion Rate Goals
            </CardTitle>
            <CardDescription>Progress toward sustainability targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Overall Diversion Rate</span>
                <span className="text-sm text-muted-foreground">{diversionRate}% / 95% goal</span>
              </div>
              <Progress value={diversionRate} className="h-3" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Composting Rate</span>
                <span className="text-sm text-muted-foreground">72% / 80% goal</span>
              </div>
              <Progress value={72} className="h-3" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Community Participation</span>
                <span className="text-sm text-muted-foreground">68% / 75% goal</span>
              </div>
              <Progress value={68} className="h-3" />
            </div>

            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950">
              <h4 className="font-medium mb-2 text-blue-700 dark:text-blue-300">
                This Month's Highlights:
              </h4>
              <ul className="text-sm space-y-1 text-blue-600 dark:text-blue-400">
                <li>• 23% increase in home composting participation</li>
                <li>• 5 new community pickup routes added</li>
                <li>• ZWIB system deployed to 12 additional stores</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Stores</CardTitle>
            <CardDescription>Highest waste diversion rates this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topStores.map((store, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      index === 0 ? 'bg-yellow-500 text-white' : 
                      index === 1 ? 'bg-gray-400 text-white' :
                      index === 2 ? 'bg-orange-500 text-white' : 'bg-gray-200'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{store.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {store.diverted} lbs diverted
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary">
                    {store.efficiency}% efficiency
                  </Badge>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                View All Stores
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};