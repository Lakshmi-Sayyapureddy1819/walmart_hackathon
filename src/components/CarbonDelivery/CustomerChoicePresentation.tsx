import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Leaf, Award, Sparkles, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CustomerChoicePresentationProps {
  selectedDelivery: any;
  onConfirmChoice: (choice: any) => void;
}

export const CustomerChoicePresentation: React.FC<CustomerChoicePresentationProps> = ({
  selectedDelivery,
  onConfirmChoice
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { toast } = useToast();

  if (!selectedDelivery) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <div className="text-gray-500 mb-4">
            <Leaf className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Select a delivery option to see your environmental impact</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleConfirmChoice = () => {
    setIsConfirmed(true);
    onConfirmChoice(selectedDelivery);
    
    // Calculate reward points and environmental impact
    const rewards = {
      pickup: { points: 15, message: "Great choice! Store pickup is the most eco-friendly option." },
      standard: { points: 8, message: "Good choice! Standard delivery helps consolidate trips." },
      express: { points: 2, message: "Thanks for choosing us! Consider greener options next time." },
      reusable: { points: 12, message: "Excellent! Reusable packaging supports our circular economy." }
    };

    const reward = rewards[selectedDelivery.type as keyof typeof rewards] || rewards.standard;

    toast({
      title: "🎉 Choice Confirmed!",
      description: `${reward.message} You earned ${reward.points} Green Points!`,
      duration: 5000,
    });
  };

  const getImpactMessage = (carbon: number) => {
    if (carbon <= 2) return {
      message: "🌟 Outstanding! You're making a real difference for our planet.",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    };
    if (carbon <= 8) return {
      message: "👍 Good choice! You're helping reduce our carbon footprint.",
      color: "text-blue-600", 
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    };
    return {
      message: "📦 We understand you need it fast. Consider greener options when possible!",
      color: "text-orange-600",
      bgColor: "bg-orange-50", 
      borderColor: "border-orange-200"
    };
  };

  const impact = getImpactMessage(selectedDelivery.carbon);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Confirm Your Choice</h3>
        <p className="text-gray-600">Review your delivery selection and environmental impact</p>
      </div>

      <Card className={`${impact.bgColor} ${impact.borderColor} border-2`}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              {selectedDelivery.name}
              {selectedDelivery.recommended && (
                <Badge className="bg-green-100 text-green-700">
                  <Award className="h-3 w-3 mr-1" />
                  Walmart Suggests
                </Badge>
              )}
            </span>
            <Badge className={`${impact.color} ${impact.bgColor}`}>
              {selectedDelivery.carbon} kg CO₂e
            </Badge>
          </CardTitle>
          <CardDescription className={impact.color}>
            {impact.message}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{selectedDelivery.eta}</div>
              <div className="text-sm text-gray-600">Estimated Time</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{selectedDelivery.cost}</div>
              <div className="text-sm text-gray-600">Delivery Cost</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {selectedDelivery.carbon <= 2 ? '🌟' : selectedDelivery.carbon <= 8 ? '🌱' : '📦'}
              </div>
              <div className="text-sm text-gray-600">Impact Level</div>
            </div>
          </div>

          {/* Environmental Impact Details */}
          <div className="bg-white rounded-lg p-4 space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Leaf className="h-4 w-4 text-green-600" />
              Your Environmental Impact
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">CO₂ Savings vs Express:</span>
                <span className="font-medium ml-2 text-green-600">
                  {(15 - selectedDelivery.carbon).toFixed(1)} kg
                </span>
              </div>
              <div>
                <span className="text-gray-600">Equivalent to:</span>
                <span className="font-medium ml-2">
                  {(selectedDelivery.carbon * 0.8).toFixed(1)} miles less driving
                </span>
              </div>
            </div>
          </div>

          {/* Walmart's Net-Zero Goal Progress */}
          <Alert className="bg-blue-50 border-blue-200">
            <Heart className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Help us reach net-zero!</strong> Your choice contributes to Walmart's goal of zero emissions by 2040. 
              Every eco-friendly delivery choice brings us closer to a sustainable future.
            </AlertDescription>
          </Alert>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            {!isConfirmed ? (
              <>
                <Button 
                  onClick={handleConfirmChoice}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirm Choice
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="flex-1"
                >
                  Change Option
                </Button>
              </>
            ) : (
              <div className="flex-1 text-center">
                <div className="flex items-center justify-center gap-2 text-green-600 font-medium mb-2">
                  <CheckCircle className="h-5 w-5" />
                  Choice Confirmed!
                </div>
                <p className="text-sm text-gray-600">
                  Your delivery is being processed. Check your email for tracking details.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Personalized Nudges */}
      {selectedDelivery.type === 'express' && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-yellow-600 mt-1" />
              <div>
                <h4 className="font-medium text-yellow-800 mb-1">💡 Future Suggestion</h4>
                <p className="text-sm text-yellow-700">
                  We noticed you often choose express delivery. Planning ahead for standard delivery 
                  could save up to 7 kg CO₂ per order. Every bit helps! 🌱
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedDelivery.type === 'pickup' && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Award className="h-5 w-5 text-green-600 mt-1" />
              <div>
                <h4 className="font-medium text-green-800 mb-1">🏆 Eco Champion!</h4>
                <p className="text-sm text-green-700">
                  Store pickup is our most sustainable option. Thank you for helping us reduce 
                  delivery emissions and supporting our climate goals!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};