
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Package, Wrench, Heart, Recycle, Trash2, RotateCcw, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Language = "en" | "hi" | "ta" | "te" | "bn";

interface ClassificationData {
  id: string;
  image: string;
  productName: string;
  storeId: string;
  storeName: string;
  returnCondition: string;
  classification: 'Like New' | 'Minor Damage' | 'Major Damage' | 'Functional';
  recommendation: 'Resell as New' | 'Sell as Open Box' | 'Send to Repair Center' | 'Donate to Charity' | 'Recycle' | 'Dispose';
  type: string;
  value: number;
  timestamp: Date;
}

interface ClassificationTableProps {
  selectedLanguage: Language;
}

const translations = {
  en: {
    title: "Returns Classification Dashboard",
    search: "Search by Store ID, Store Name, or Product...",
    filterByClassification: "Filter by Classification",
    filterByRecommendation: "Filter by Recommendation",
    filterByType: "Filter by Type",
    clearFilters: "Clear Filters",
    image: "Image",
    productName: "Product Name",
    storeId: "Store ID",
    storeName: "Store Name", 
    returnCondition: "Return Condition",
    classification: "Classification",
    recommendation: "Recommendation",
    actions: "Actions",
    process: "Process",
    override: "Override",
    processed: "Processed",
    allClassifications: "All Classifications",
    allRecommendations: "All Recommendations",
    allTypes: "All Types",
    itemProcessed: "Item Processed",
    itemProcessedDesc: "Item has been processed according to AI recommendation",
    overrideSuccess: "Override Applied",
    overrideDesc: "Custom recommendation has been applied"
  }
};

// Mock data generator
const generateMockData = (): ClassificationData[] => {
  const products = ['iPhone 14', 'Samsung TV 55"', 'Dell Laptop', 'Nike Shoes', 'Coffee Maker', 'Bluetooth Speaker'];
  const stores = [
    { id: 'ST001', name: 'Walmart Supercenter #1234' },
    { id: 'ST002', name: 'Walmart Neighborhood #5678' },
    { id: 'ST003', name: 'Walmart Express #9012' }
  ];
  const classifications: ClassificationData['classification'][] = ['Like New', 'Minor Damage', 'Major Damage', 'Functional'];
  const recommendations: ClassificationData['recommendation'][] = ['Resell as New', 'Sell as Open Box', 'Send to Repair Center', 'Donate to Charity', 'Recycle', 'Dispose'];
  const types = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Toys'];
  const conditions = ['Damaged Packaging', 'Customer Return', 'Display Model', 'Opened Box', 'Expired'];

  return Array.from({ length: 50 }, (_, i) => {
    const store = stores[Math.floor(Math.random() * stores.length)];
    const classification = classifications[Math.floor(Math.random() * classifications.length)];
    
    // Rules engine for recommendations based on classification
    let recommendation: ClassificationData['recommendation'];
    switch (classification) {
      case 'Like New':
        recommendation = Math.random() > 0.7 ? 'Resell as New' : 'Sell as Open Box';
        break;
      case 'Minor Damage':
        recommendation = Math.random() > 0.5 ? 'Sell as Open Box' : 'Send to Repair Center';
        break;
      case 'Functional':
        recommendation = Math.random() > 0.6 ? 'Sell as Open Box' : 'Donate to Charity';
        break;
      case 'Major Damage':
        recommendation = Math.random() > 0.4 ? 'Recycle' : 'Dispose';
        break;
      default:
        recommendation = 'Recycle';
    }

    return {
      id: `ITM${String(i + 1).padStart(3, '0')}`,
      image: `/api/placeholder/80/80`,
      productName: products[Math.floor(Math.random() * products.length)],
      storeId: store.id,
      storeName: store.name,
      returnCondition: conditions[Math.floor(Math.random() * conditions.length)],
      classification,
      recommendation,
      type: types[Math.floor(Math.random() * types.length)],
      value: Math.floor(Math.random() * 500) + 50,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
    };
  });
};

export const ClassificationTable: React.FC<ClassificationTableProps> = ({ selectedLanguage }) => {
  const [data, setData] = useState<ClassificationData[]>(() => generateMockData());
  const [searchTerm, setSearchTerm] = useState('');
  const [classificationFilter, setClassificationFilter] = useState<string>('all');
  const [recommendationFilter, setRecommendationFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [processedItems, setProcessedItems] = useState<Set<string>>(new Set());
  const tableRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const t = translations[selectedLanguage];

  // Auto-scroll to latest entry effect
  useEffect(() => {
    if (tableRef.current) {
      const lastRow = tableRef.current.querySelector('tbody tr:last-child');
      if (lastRow) {
        lastRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [data]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (data.length < 100) {
        const newItem = generateMockData()[0];
        newItem.id = `ITM${String(data.length + 1).padStart(3, '0')}`;
        newItem.timestamp = new Date();
        setData(prev => [...prev, newItem]);
      }
    }, 10000); // Add new item every 10 seconds

    return () => clearInterval(interval);
  }, [data.length]);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = !searchTerm || 
        item.storeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.productName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesClassification = classificationFilter === 'all' || item.classification === classificationFilter;
      const matchesRecommendation = recommendationFilter === 'all' || item.recommendation === recommendationFilter;
      const matchesType = typeFilter === 'all' || item.type === typeFilter;

      return matchesSearch && matchesClassification && matchesRecommendation && matchesType;
    });
  }, [data, searchTerm, classificationFilter, recommendationFilter, typeFilter]);

  const getClassificationBadgeColor = (classification: string) => {
    switch (classification) {
      case 'Like New': return 'bg-green-500 hover:bg-green-600';
      case 'Minor Damage': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'Functional': return 'bg-blue-500 hover:bg-blue-600';
      case 'Major Damage': return 'bg-red-500 hover:bg-red-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getRecommendationBadgeColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Resell as New': return 'bg-green-600 hover:bg-green-700';
      case 'Sell as Open Box': return 'bg-blue-600 hover:bg-blue-700';
      case 'Send to Repair Center': return 'bg-orange-600 hover:bg-orange-700';
      case 'Donate to Charity': return 'bg-purple-600 hover:bg-purple-700';
      case 'Recycle': return 'bg-teal-600 hover:bg-teal-700';
      case 'Dispose': return 'bg-gray-600 hover:bg-gray-700';
      default: return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'Resell as New':
      case 'Sell as Open Box':
        return Package;
      case 'Send to Repair Center':
        return Wrench;
      case 'Donate to Charity':
        return Heart;
      case 'Recycle':
        return Recycle;
      case 'Dispose':
        return Trash2;
      default:
        return Package;
    }
  };

  const handleProcessItem = (itemId: string) => {
    setProcessedItems(prev => new Set([...prev, itemId]));
    toast({
      title: t.itemProcessed,
      description: t.itemProcessedDesc,
    });
  };

  const handleOverride = (itemId: string) => {
    toast({
      title: t.overrideSuccess,
      description: t.overrideDesc,
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setClassificationFilter('all');
    setRecommendationFilter('all');
    setTypeFilter('all');
  };

  const uniqueClassifications = [...new Set(data.map(item => item.classification))];
  const uniqueRecommendations = [...new Set(data.map(item => item.recommendation))];
  const uniqueTypes = [...new Set(data.map(item => item.type))];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-blue-800">{t.title}</CardTitle>
        
        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={classificationFilter} onValueChange={setClassificationFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t.filterByClassification} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.allClassifications}</SelectItem>
                {uniqueClassifications.map(classification => (
                  <SelectItem key={classification} value={classification}>
                    {classification}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={recommendationFilter} onValueChange={setRecommendationFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t.filterByRecommendation} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.allRecommendations}</SelectItem>
                {uniqueRecommendations.map(recommendation => (
                  <SelectItem key={recommendation} value={recommendation}>
                    {recommendation}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t.filterByType} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.allTypes}</SelectItem>
                {uniqueTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={clearFilters} className="w-full">
              <RotateCcw className="mr-2 h-4 w-4" />
              {t.clearFilters}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div ref={tableRef} className="rounded-md border max-h-[600px] overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-background">
              <TableRow>
                <TableHead className="w-20">{t.image}</TableHead>
                <TableHead>{t.productName}</TableHead>
                <TableHead>{t.storeId}</TableHead>
                <TableHead>{t.storeName}</TableHead>
                <TableHead>{t.returnCondition}</TableHead>
                <TableHead>{t.classification}</TableHead>
                <TableHead>{t.recommendation}</TableHead>
                <TableHead className="w-32">{t.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => {
                const isProcessed = processedItems.has(item.id);
                const RecommendationIcon = getRecommendationIcon(item.recommendation);
                
                return (
                  <TableRow key={item.id} className={`hover:bg-muted/50 ${isProcessed ? 'opacity-60' : ''}`}>
                    <TableCell>
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-500" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{item.productName}</TableCell>
                    <TableCell className="font-mono text-sm">{item.storeId}</TableCell>
                    <TableCell>{item.storeName}</TableCell>
                    <TableCell>{item.returnCondition}</TableCell>
                    <TableCell>
                      <Badge className={`${getClassificationBadgeColor(item.classification)} text-white`}>
                        {item.classification}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getRecommendationBadgeColor(item.recommendation)} text-white flex items-center gap-1 w-fit`}>
                        <RecommendationIcon className="h-3 w-3" />
                        {item.recommendation}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleProcessItem(item.id)}
                          disabled={isProcessed}
                          className="h-8"
                        >
                          {isProcessed ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {t.processed}
                            </>
                          ) : (
                            t.process
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleOverride(item.id)}
                          className="h-8"
                          disabled={isProcessed}
                        >
                          {t.override}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <span>Showing {filteredData.length} of {data.length} items</span>
          <span>Auto-updating with new returns...</span>
        </div>
      </CardContent>
    </Card>
  );
};
