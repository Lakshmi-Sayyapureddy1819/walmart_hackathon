import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { QrCode, MapPin, Clock, Award, Recycle, Scan, Gift, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReusablePackagingReturnProps {
  userGreenPoints: number;
  onPointsEarned: (points: number) => void;
}

const dropOffLocations = [
  {
    id: 1,
    name: 'Walmart #2034',
    address: '5th Ave, NYC',
    hours: '8am–9pm',
    status: 'Open',
    distance: '0.8 miles',
    accepting: true
  },
  {
    id: 2,
    name: 'Walmart #1177', 
    address: 'Queens Blvd',
    hours: '9am–10pm',
    status: 'Accepting Today',
    distance: '1.2 miles',
    accepting: true
  },
  {
    id: 3,
    name: 'Walmart #0543',
    address: 'Brooklyn Ave',
    hours: '7am–11pm',
    status: 'Full',
    distance: '2.1 miles',
    accepting: false
  }
];

const returnedPackages = [
  {
    id: 'PKG001',
    type: 'Reusable Box',
    returnDate: '2024-01-15',
    points: 10,
    status: 'Completed'
  },
  {
    id: 'PKG002', 
    type: 'Insulated Bag',
    returnDate: '2024-01-10',
    points: 15,
    status: 'Completed'
  }
];

export const ReusablePackagingReturn: React.FC<ReusablePackagingReturnProps> = ({
  userGreenPoints,
  onPointsEarned
}) => {
  const [qrCode, setQrCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();

  const handleQRScan = () => {
    setIsScanning(true);
    
    // Simulate QR code scan
    setTimeout(() => {
      const mockPackageId = 'PKG' + Math.floor(Math.random() * 9000 + 1000);
      setQrCode(mockPackageId);
      setIsScanning(false);
      
      // Award points
      const points = Math.floor(Math.random() * 10 + 10); // 10-20 points
      onPointsEarned(points);
      
      toast({
        title: "🎉 Return Completed!",
        description: `Package ${mockPackageId} returned successfully! You earned ${points} Green Points.`,
        duration: 5000,
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Reusable Packaging Return</h2>
        <p className="text-xl text-gray-600">
          Return your reusable packaging and earn Green Points while closing the loop
        </p>
      </div>

      {/* Main Return Card */}
      <HoverCard>
        <HoverCardTrigger asChild>
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Recycle className="h-6 w-6 text-green-600" />
                Reusable Delivery Packaging Return
                <Badge className="bg-green-100 text-green-700 ml-auto">
                  Available
                </Badge>
              </CardTitle>
              <CardDescription>
                Return your reusable delivery packaging and earn Green Points!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{userGreenPoints}</div>
                    <div className="text-sm text-gray-600">Your Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">+10-20</div>
                    <div className="text-sm text-gray-600">Points per Return</div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
              <Gift className="h-4 w-4 text-green-600" />
              Reuse + Reward
            </h4>
            <p className="text-sm text-gray-600">
              Return your reusable delivery packaging and earn Green Points! 
              Help us close the loop on sustainable packaging.
            </p>
            <div className="pt-2 space-y-1 text-xs text-gray-500">
              <p>• QR Code authentication</p>
              <p>• Multiple return options</p>
              <p>• Instant reward points</p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>

      {/* QR Code Scanner */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-blue-600" />
            Return Your Package
          </CardTitle>
          <CardDescription>
            Scan the QR code on your reusable packaging to process the return
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="qr-input">Package QR Code</Label>
                <Input
                  id="qr-input"
                  placeholder="Enter QR code or scan"
                  value={qrCode}
                  onChange={(e) => setQrCode(e.target.value)}
                />
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" variant="outline">
                    <Scan className="h-4 w-4 mr-2" />
                    Scan QR Code
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Scan Package QR Code</DialogTitle>
                    <DialogDescription>
                      Point your camera at the QR code on your reusable packaging
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                      {isScanning ? (
                        <div className="text-center">
                          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                          <p className="text-sm text-gray-600">Scanning...</p>
                        </div>
                      ) : (
                        <div className="text-center text-gray-500">
                          <QrCode className="h-12 w-12 mx-auto mb-2" />
                          <p className="text-sm">Camera viewfinder</p>
                        </div>
                      )}
                    </div>
                    <Button 
                      onClick={handleQRScan}
                      disabled={isScanning}
                      className="w-full"
                    >
                      {isScanning ? 'Scanning...' : 'Start Scan'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Return Options</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>🚚 Pickup during next delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>🏪 Drop-off at nearest Walmart</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>📦 Designated return bins</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Drop-off Locations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-red-600" />
            Drop-off Locations
          </CardTitle>
          <CardDescription>
            Find the nearest Walmart store accepting reusable packaging returns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dropOffLocations.map((location) => (
              <div 
                key={location.id}
                className={`p-4 rounded-lg border ${
                  location.accepting 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{location.name}</h4>
                    <p className="text-sm text-gray-600">{location.address}</p>
                  </div>
                  <Badge 
                    className={
                      location.accepting 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }
                  >
                    {location.status}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      {location.hours}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      {location.distance}
                    </span>
                  </div>
                  
                  {location.accepting && (
                    <Button size="sm" variant="outline">
                      Get Directions
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Return History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-600" />
            Your Return History
          </CardTitle>
          <CardDescription>
            Track your past returns and earned Green Points
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {returnedPackages.map((pkg) => (
              <div key={pkg.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{pkg.type}</div>
                  <div className="text-sm text-gray-600">
                    Returned {new Date(pkg.returnDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-purple-100 text-purple-700">
                    +{pkg.points} points
                  </Badge>
                  <div className="text-sm text-green-600 mt-1">✓ {pkg.status}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {returnedPackages.reduce((sum, pkg) => sum + pkg.points, 0)} Points
              </div>
              <div className="text-sm text-purple-700">Total Earned from Returns</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};